import { firestore } from 'firebase-admin';

var prototype = Message.prototype;

function Message(messageFromBot, messageSendTime, messageText) {
    this._messageFromBot = messageFromBot;
    this._messageSendTime = messageSendTime;
    this._messageText = messageText
}

function Message(messageText) {
    this._messageFromBot = True;
    this._messageSendTime = firestore.Timestamp.now();
    this._messageText = messageText
}

prototype.getMessageFromBot = function(){
    return this._messageFromBot;
};

prototype.getMessageSendTime = function(){
    return this._messageSendTime;
};

prototype.getMessageText = function(){
    return this._messageText;
};

prototype.getSubmittableMessage = function(){
    return {'messageFromBot': getMessageFromBot(),
            'messageSendTime': getMessageSendTime(),
            'messageText': getMessageText()};
}

module.exports = Message;