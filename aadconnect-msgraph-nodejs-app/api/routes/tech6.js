// DXC Tech6 items updates being maintained via SP list

const express = require('express');
const router = express.Router();
const tokens = require('../tokens.js');
const graph = require('../graph.js');
const nextLink = "@odata.nextLink";

router.get('/getTech6ItemList',
  async function (req, res, next) {
    var itemList = [];
    if (!req.isAuthenticated()) {
      res.redirect('/auth/signin'); // if the request is unauthenticated, redirect to login page
    }
    else {
      //get access token
      var accessToken;
      try {
        accessToken = await tokens.getAccessToken(req);
      } catch (err) {
        console.log("Could not get access token. Try signing out and signing in again.");
        console.log(JSON.stringify(err));
      }

      if (accessToken && accessToken.length > 0) {
        var requestUrl = "https://graph.microsoft.com/v1.0/sites/d7b730f3-e885-4dbe-934a-f37dc254977b/lists/4ed562b8-7e69-4257-81a7-abea7440b78c/items?$expand=fields";
        try {
          do {
            var list = await graph.getTech6ItemList(accessToken, requestUrl);
            if (list) {
              (list.value).forEach(element => {
                itemList.push(element);
              });
            }
            if (list[nextLink]) {
              requestUrl = list[nextLink];
            }
          } while (list[nextLink]);
          console.log(itemList.length);
        } catch (error) {
          console.log(JSON.stringify(error));
          res.json(error);
        }
      }
      res.json(itemList);
    }
  }
);

// Get any Title of Item
router.get('/filterTech6ItemTitles/:title',
  async function (req, res, next) {
    var itemList = [];
    if (!req.isAuthenticated()) {
      res.redirect('/auth/signin'); // if the request is unauthenticated, redirect to login page
    }
    else {
      //get access token
      var accessToken;
      try {
        accessToken = await tokens.getAccessToken(req);
      } catch (err) {
        console.log("Could not get access token. Try signing out and signing in again.");
        console.log(JSON.stringify(err));
      }

      if (accessToken && accessToken.length > 0) {
        var filteredTitle = req.params.title;
        var requestUrl = "https://graph.microsoft.com/v1.0/sites/d7b730f3-e885-4dbe-934a-f37dc254977b/lists/4ed562b8-7e69-4257-81a7-abea7440b78c/items";
        try {
          do {
            var list = await graph.filterTech6ItemTitles(accessToken, requestUrl, filteredTitle);
            if (list) {
              (list.value).forEach(element => {
                itemList.push(element);
              });
            }
            if (list[nextLink]) {
              requestUrl = list[nextLink];
            }
          } while (list[nextLink]);
          console.log(itemList.length);
        } catch (error) {
          console.log(JSON.stringify(error));
          res.json(error);
        }
      }
      res.json(itemList);
    }
  }
);

module.exports = router;
