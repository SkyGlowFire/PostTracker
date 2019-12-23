const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const request = require('request');
const config = require('config');
const postKey = config.get('postKey');
const Track = require('../../models/Track');

//@route        POST api/main
//description   Get trackId data
//@access       public

router.post('/',
    [check('trackNumber', 'Please, enter track number').not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }
        const {trackNumber, isAuthenticated, userId} = req.body;
        const options = {
            uri: encodeURI(`https://api.track24.ru/tracking.json.php?apiKey=${postKey}&domain=demo.com&code=${trackNumber}`),
            method: 'GET'
        };
        try {
            request(options, async (error, response, body) => {
                if(error) {console.error(error)}
                if(response.statusCode !== 200) {
                    return res.status(404).json({msg: 'No post found'});
                }
                const trackData = JSON.parse(body);
                res.json(trackData);
                const {status, data} = trackData;
                if (isAuthenticated && status === 'ok' && data.events.length > 1){
                    let track = await Track.findOne({trackNumber});
                    if(!track){
                        track = new Track({
                            trackNumber, user:userId
                        });

                        await track.save()
                    }
                }
            })
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;