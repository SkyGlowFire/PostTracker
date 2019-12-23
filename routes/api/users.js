const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

//@route        POST api/users
//description   Register new user
//access        Public

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', "Please enter password with 6 or more characters").isLength({min:6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        user = new User({
            email, password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 36000},
            (error, token) => {
                if(error) throw error;
                res.json({token});
            }
            );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
    }
);

module.exports = router;