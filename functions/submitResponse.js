var Message = require("./message.js");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

module.exports = function(userId, Message) {
    admin.firestore().collection('{userId}')
        .add(Message.getSubmittableMessage())
        .then(writeResult => {
            console.log("Write completed: " + writeResult);
    });
};

