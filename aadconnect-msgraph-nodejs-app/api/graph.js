const graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

module.exports = {
  getUserDetails: async function(accessToken) {

    var client = getAuthenticatedClient(accessToken);

    var user = await client.api('/me').get();
    return user;
  },

  getEvents: async function(accessToken) {

    var client = getAuthenticatedClient(accessToken);

    var events = await client
      .api('/me/events')
      .select('subject,organizer,start,end')
      .orderby('createdDateTime DESC')
      .get();

    return events;
  },

  getUsers: async function(accessToken) {

    var client = getAuthenticatedClient(accessToken);
    var users = await client.api('/users?$top=999').get();
    return users;
  },

  getUsersV2: async function(accessToken, requestUrl) {

    var client = getAuthenticatedClient(accessToken);
    var responsedBlog = await client.api(requestUrl).get();
    return responsedBlog;
  }

};

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    defaultVersion: "v1.0",
    debugLogging: true,
    // Use the provided access token to authenticate requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}