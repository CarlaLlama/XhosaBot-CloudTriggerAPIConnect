var Message = require("./message.js");
const spawn = require("child_process").spawn;
var submitResponse = require("./submitResponse.js");

module.exports = function(userId, messageText) {
    // Spawn Python script with Message as argument
    const pythonProcess = spawn('python',["./APIConnect/controller.py"], userId, messageText);
    pythonProcess.stdout.on('data', (data) => {
        if(data.startsWith("Data:")){
            // Remove message header
            let response = data.split(':')[1].trim();
            var responseMessage = new Message(response);
            submitResponse(userId, responseMessage);
        }
    });
};

