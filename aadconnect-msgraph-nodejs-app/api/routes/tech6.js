// DXC Tech6 items updates being maintained via SP list

const express = require('express');
const router = express.Router();
const tokens = require('../tokens.js');
const graph = require('../graph.js');

/* GET users with filter condition. */
router.get('/getAllTech6Items', 
  async function(req, res, next) {

    if (!req.isAuthenticated()) {
      res.redirect('/auth/signin'); // if the request is unauthenticated, redirect to login page
    }
    else
    {
      var requestUrl = "https://graph.microsoft.com/v1.0/sites/d7b730f3-e885-4dbe-934a-f37dc254977b/lists/4ed562b8-7e69-4257-81a7-abea7440b78c/items";
      var accessToken;
      try
      {
        accessToken = await tokens.getAccessToken(req);
      } catch (err) {
        console.log("Could not get access token. Try signing out and signing  in again.");
        console.log(JSON.stringify(err));
      }

      if (accessToken && accessToken.length > 0)
      {
          try { 
            
            console.log(accessToken);
            // var items = await graph.getData(accessToken, requestUrl);
            graph.getDataV2(accessToken, requestUrl)
            .then(
                function (items)
                {
                    if (items)
                    {
                        res.json(items);
                    }
                },
                function (err)
                {
                    console.error('>>> Error getting tech6 items: ' + err);
                }
            );
          } catch (error) {
            console.log(JSON.stringify(error));
            res.json(error);
          }
      }
    }
  }
);

module.exports = router;