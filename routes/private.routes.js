const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require("../middleware/isLogged")

//main
router.get("/", isLoggedIn, (req, res, next) => {
    console.log('get /private')
    res.render('private')
});

module.exports = router;
