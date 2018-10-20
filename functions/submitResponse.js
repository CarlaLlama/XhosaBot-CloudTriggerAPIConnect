const admin = require('firebase-admin');
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

/**
 * Submit message response to Firestore.
 * @class
 * @param {String} userId for collection key to upload
 * @param {String} message text to upload as messageText field
 * Message JSON:
 *      messageText: String
 *      messageSendTime: Timestamp
 *      messageFromBot: Boolean
 */
module.exports = function(userId, message) {
    const db = admin.firestore();
    // Return asynch promise to Function call
    return new Promise(function(resolve, reject) {
        let messageObject = {
            "messageText": message,
            "messageFromBot": true,
            "messageSendTime": admin.firestore.Timestamp.now()
        };

        // Snapshot Write of messageObject to Firestore.
        db.collection(userId)
            .add(messageObject)
            .then(writeResult => {
                // Log key of new message object uploaded
                console.log("Write completed: " + writeResult.id);
                resolve(writeResult);
            }).catch(error => {
                console.error(error);
                reject(error);
        });
    });
};
