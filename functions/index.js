const functions = require("firebase-functions");
let apiRequestGenerator = require("./apiRequestGenerator.js");
var submitResponse = require("./submitResponse.js");
let responseGenerator = require("./responseGenerator.js");



exports.triggerNewMessageWrite = functions.firestore
    .document('{userCollectionId}/{messageId}')
    .onCreate((snap, context) => {
        const userId = getUserId(context.resource.name);
        const newMessage = snap.data();
        const messageFromBot = newMessage.messageFromBot;
        const messageText = newMessage.messageText;
        if (messageFromBot === false) {
            // new message object
            console.log("Initiating Message transfer: " + messageText + " from user: " + userId);

            var requestPromise = apiRequestGenerator.startRequest(messageText);
            requestPromise.then(function (result) {
                console.log(result);
                let outputText = responseGenerator(result);
                console.log("Data: " + outputText);

                var submission = submitResponse(userId, outputText);
                submission.then(function (result){
                    console.log("Submit complete!");
                    return true;
                }, function (err) {
                    console.log("Submission failed: " + err);
                }).catch( function (err){
                    console.log("Error occurred during submission: " + err);
                });

                return true;
            }, function (err) {
                console.log(err);
                return false;
            }).catch(function (err){
                console.log(err);
                return false;
            });
        } else {
            console.log("Ignore Message write from bot.");
            return false;
        }
    });

    function getUserId(resourceName) {
        let resources = resourceName.split('/');
        return resources[5];
    }
