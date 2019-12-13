const express = require('express');
const router = express.Router();
const tokens = require('../tokens.js');
const graph = require('../graph.js');

const nextLink = "@odata.nextLink";
const value = "value";

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

router.get('/getAllUsersV2', 
  async function(req, res) {
    var allUsers = [];
    if (!req.isAuthenticated()) {
      res.redirect('/auth/signin'); // if the request is unauthenticated, redirect to login page
    }
    else
    {
        
        var requestUrl = "https://graph.microsoft.com/v1.0/users?$top=999";
        while(requestUrl)
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
                  var users = await graph.getUsersV2(accessToken, requestUrl);
                  // res.json(users);
                  if (users)
                  {
                      usersVal = users[value];
                      if (allUsers.length === 0)
                      {
                          allUsers = usersVal;
                      }
                      else
                      {
                          var nextUserList = usersVal;
                          allUsers = allUsers.concat(nextUserList);
                      }
                      var nextLinkVal = users[nextLink];
                      if (nextLinkVal)
                      {
                        requestUrl = nextLinkVal;
                        // continue;
                      }
                      else
                      {
                        console.log(MESSAGE + "There is no next page..")  
                        break;
                      }
                  }

                } catch (error) {
                  console.log(JSON.stringify(error));
                  res.json(error);
                }
            }
        } //end While block
    }
    res.json(allUsers);
  }
);

module.exports = router;
