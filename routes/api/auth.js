const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../../models/User');

//@route        GET api/auth
//description   Load user
//access        Public

router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//@route        POST api/auth
//description   Authenticate user and get token
//access        Public

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Please enter password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({errors:[{msg: 'Invalid credentials'}] })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg: 'Invalid credentials'}] })
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 36000},
            (error, token) => {
                if(error) {throw error}
                res.json({token})
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
    }
);

module.exports = router;