var express = require('express');
var router = express.Router();
var tokens = require('../tokens.js');
var graph = require('../graph.js');

/* GET users listing. */
router.get('/getAllUsers', 
  async function(req, res) {

    if (!req.isAuthenticated()) {
      res.redirect('/auth/signin'); // if the request is unauthenticated, redirect to login page
    }
    else
    {
        //get access token
        var accessToken;
        try
        {

          accessToken = await tokens.getAccessToken(req);
          console.log(accessToken);
        } catch (err) {
          console.log("Could not get access token. Try signing out and signing in again.");
          console.log(JSON.stringify(err));
        }

        if (accessToken && accessToken.length > 0)
        {
            try {
              
              console.log(accessToken);
              var users = await graph.getUsers(accessToken);
              res.json(users);

            } catch (error) {
              console.log(JSON.stringify(error));
              res.json(error);
            }
        }
    }
  }
);



module.exports = router;
