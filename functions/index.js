const functions = require("firebase-functions");
let apiRequestGenerator = require("./apiRequestGenerator.js");

/**
 * Initiated on Document write to Firestore.
 * @alias module:functions
 * @class
 * @param {JSON} snap contains the JSON data uploaded onCreate()
 * @param {JSON} context contains project and trigger info
 * Initiate message processing.
 * Message JSON:
 *      messageText: String
 *      messageSendTime: Timestamp
 *      messageFromBot: Boolean
 */
exports.triggerNewMessageWrite = functions.firestore
    .document('{userCollectionId}/{messageId}')
    .onCreate((snap, context) => {
        const userId = getUserId(context.resource.name);
        // Content of trigger is snap.data()
        const newMessage = snap.data();
        const messageFromBot = newMessage.messageFromBot;
        const messageText = newMessage.messageText;
        if (messageFromBot === false) {
            // New message received from user
            console.log("Initiating Message processing: " + messageText + " from user: " + userId);
            return apiRequestGenerator.startRequest(userId, messageText);
        } else {
            // Triggered by message from bot, ignore.
            console.log("Ignore Message write from bot.");
            return false;
        }
    });

/**
 * Find User Id in context path string.
 * @param {String} resourceName found in context.resource.name
 * @return {String} userId corresponds to userCollectionId
 * UserCollectionId is found in the resource name path:
 * projects/PROJECT_NAME/databases/(default)/documents
 * /{USER_COLLECTION_ID}/MESSAGE_ID
 */
function getUserId(resourceName) {
    let resources = resourceName.split('/');
    return resources[5];
}
