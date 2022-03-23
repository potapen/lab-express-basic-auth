const isLoggedIn = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    if (!req.session.user) {
        console.log('you are not logged in');
        res.redirect('/login');
    }
    else{
        console.log('you shall pass');
        next();
    }
  };

const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        console.log('you are logged in, go to private');
        res.redirect('/private');
    }
    else{
        console.log('you shall pass');
        next();
    }
  };
  
module.exports={isLoggedIn, isLoggedOut}