const admin = require('firebase-admin');
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

module.exports = function(userId, message) {
    return new Promise(function(resolve, reject) {
        let messageObject = {
            "messageText": message,
            "messageFromBot": true,
            "messageSendTime": admin.firestore.Timestamp.now()
        };

        db.collection(userId)
            .add(messageObject)
            .then(writeResult => {
                console.log("Write completed: " + writeResult.id);
                resolve(writeResult);
            }).catch(error => {
                console.error(error);
                reject(error);
        });
    });
};


