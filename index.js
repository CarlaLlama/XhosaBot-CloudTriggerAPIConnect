exports.triggerNewMessageWrite = functions.firestore
    .document('{userCollectionId}/{messageId}')
    .onCreate((snap, context) => {
        const newMessage = snap.data();
        const messageFromBot = newMessage.messageFromBot;
        const messageSendTime = newMessage.messageSendTime;
        const messageText = newMessage.messageText;

        if(messageFromBot === False):
            retrieve_message_triggered(newValue.name);
        else:
            print("Ignore Message write from bot.");
    });