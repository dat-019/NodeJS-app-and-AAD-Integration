// DXC Tech6 items updates being maintained via SP list

const express = require('express');
const router = express.Router();
const tokens = require('../tokens.js');
const graph = require('../graph.js');

router.get('/getTech6AllItems', 
  async function(req, res, next) {

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
        } catch (err) {
          console.log("Could not get access token. Try signing out and signing in again.");
          console.log(JSON.stringify(err));
        }

        if (accessToken && accessToken.length > 0)
        {
            try {
              console.log(accessToken);
              var users = await graph.getEvents(accessToken);
              res.json(users);

            } catch (error) {
              console.log(JSON.stringify(error));
              res.json(error);
            }
        }
    }
  }
);