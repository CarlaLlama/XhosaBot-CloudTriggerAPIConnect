var Message = require("./message.js");
var pythonInit = require("./nodeInitiatePythonScript.js");

exports.triggerNewMessageWrite = functions.firestore
    .document('{userCollectionId}/{messageId}')
    .onCreate((snap, context) => {
        // TODO: get user id from snap?
        const userId = snap.name();
        const newMessage = snap.data();
        const messageFromBot = newMessage.messageFromBot;
        const messageSendTime = newMessage.messageSendTime;
        const messageText = newMessage.messageText;

        if(messageFromBot === False) {
            // new message object
            var userMessage = new Message(messageFromBot, messageSendTime, messageText);
            pythonInit(userId, messageText);
            console.log("Initiating Message transfer to APIConnect");
        }else {
            console.log("Ignore Message write from bot.");
        }
    });