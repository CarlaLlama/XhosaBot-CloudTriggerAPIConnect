
var prototype = Message.prototype;

function Message(messageFromBot, messageSendTime, messageText) {
    this._messageFromBot = messageFromBot;
    this._messageSendTime = messageSendTime;
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

module.exports = Message;