import { Meteor } from 'meteor/meteor';

Meteor.methods({
    /**
     * OAUTH FLOW - Step C1.1
     * While you are not required to implement client addition in the same way, clients will have
     * to be available for the oauth2 process to work properly. That may mean running code on
     * Meteor.startup() to populate the db.
     * @param client
     */
    'oauth.addClient': function (client){
        console.log('addClient', client);
        oAuth2Server.collections.client.upsert(
          {
            clientId: client.clientId
          },
          {
            $set: client
          }
        );
    },

    'oauth.updateClient': function (client){
        console.log('updateClient', client);
        oAuth2Server.collections.client.update(
          {
            _id: client._id
          },
          {
            $set: client
          }
        );
    },

    /**
     * Exists purely for testing purposes.
     * @returns {any}
     */
    'oauth.clientCount': function() {
        return oAuth2Server.collections.client.find({ status: 'a' }).count();
    },

    'oauth.findClients': function() {
        return oAuth2Server.collections.client.find({ status: 'a' }).fetch();
    },

    'oauth.findOneClient': function(clientId) {
      console.log("find one", clientId);
      return oAuth2Server.collections.client.findOne({ _id: clientId });
    },

    'oauth.deleteClient': function(clientId) {
      console.log("deleting ", clientId);
        oAuth2Server.collections.client.update({ _id: clientId }, {
          $set: {
            status: 'x'
          }
        });
    },

    'oauth.deleteAllClients': function() {
        oAuth2Server.collections.client.update({}, {
          $set: {
            status: 'x'
          }
        }, { multi: true });
    }
});
