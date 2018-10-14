const functions = require("firebase-functions")
let Message = require("./message.js");
const pythonInit = require("./nodeInitiatePythonScript.js");

exports.triggerNewMessageWrite = functions.firestore
    .document('{userCollectionId}/{messageId}')
    .onCreate((snap, context) => {
        const userId = snap.id;
        const newMessage = snap.data();
        const messageFromBot = newMessage.messageFromBot;
        const messageSendTime = newMessage.messageSendTime;
        const messageText = newMessage.messageText;

        if(messageFromBot === false) {
            // new message object
            let userMessage = new Message(messageFromBot, messageSendTime, messageText);
            pythonInit(userId, messageText);
            console.log("Initiating Message transfer to APIConnect");
        }else {
            console.log("Ignore Message write from bot.");
        }
    });