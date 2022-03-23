const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require("../middleware/isLogged")

//main
router.get("/", isLoggedOut, (req, res, next) => {
    console.log('get /main')
    res.render('main')
});

module.exports = router;
