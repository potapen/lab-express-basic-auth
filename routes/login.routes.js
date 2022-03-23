const router = require("express").Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model.js");

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt')

//login
router.get("/", (req, res, next) => {
    console.log('get login');
    res.render('login');
})

router.post("/", async (req, res, next) => {
    try{
        console.log('post login');
        const {username, password} = req.body;
        console.log(req.body);
    
        
        // Search the database for a user with the username submitted in the form
        const searchedUser = await User.findOne({ username });
        console.log('searchedUser: ', searchedUser)
        if (!searchedUser){
            res.status(400).send('user not found')
        }
        else{
            // res.send('signup!');
            const isSamePwd = await bcrypt.compare(password, searchedUser.password)
            console.log('isSamePwd: ', isSamePwd)
            if(isSamePwd){
                console.log('req.session: ', req.session)
                req.session.user = searchedUser
                console.log('req.session: ', req.session)
                res.send('you can login')
            }else{
                res.send('wrong password')
            }
        }

    }
    catch(error){
        console.log('achtung!!!!!!!!!!!!!!!!');
        console.error(error);
    }

})

module.exports = router;
