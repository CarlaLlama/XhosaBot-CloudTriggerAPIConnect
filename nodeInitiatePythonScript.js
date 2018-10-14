const spawn = require("child_process").spawn;

module.exports = function(messageText) {
    // Spawn Python script with Message as argument
    const pythonProcess = spawn('python',["controller.py"], userId, messageText);
    pythonProcess.stdout.on('data', (data) => {
        // Do something with the data returned from python script
    });
};

