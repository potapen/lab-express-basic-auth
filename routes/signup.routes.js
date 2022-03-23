const router = require("express").Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model.js");

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt')
// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10



//signup
router.get("/", (req, res, next) => {
    console.log('get signup');
    res.render('signup');
})


router.post("/", async (req, res, next) => {
    try{
        console.log('post signup');
        const {username, password} = req.body;
        console.log(req.body);
    
        
        // Search the database for a user with the username submitted in the form
        const searchedUser = await User.findOne({ username });
        console.log('searchedUser: ', searchedUser)
        if (searchedUser){
            res.status(400).send('user already exists')
        }
        else{
            // res.send('signup!');
            const salt = await bcrypt.genSalt(saltRounds)
            console.log('salt: ', salt)
            const hashedPassword = await bcrypt.hash(password, salt)
            console.log('hashedPassword: ', hashedPassword)
            User.create(
                {
                    username,
                    password : hashedPassword,
                }
            )
            res.send('user created')
        }

    }
    catch(error){
        console.log('achtung!!!!!!!!!!!!!!!!');
        console.error(error);
    }

})

module.exports = router;
