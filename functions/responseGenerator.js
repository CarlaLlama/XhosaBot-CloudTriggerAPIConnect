const dataset = require("./datasetTextSamples.js");

module.exports = function(label) {
    for (var response in dataset.labelledResponseList) {
        if (label === dataset.labelledResponseList[response][0]) {
            return dataset.labelledResponseList[response][1];
        }
    }
    return "I don't know what you are saying message";
};
