const dataset = require("./datasetTextSamples.js");

/**
 * Find corresponding response in datasetTextSamples
 * @class
 * @param {String} label for response
 * @return {String} response
 */
module.exports = function(label) {
    if (null !== label) {
        for (var response in dataset.labelledResponseList) {
            if (label === dataset.labelledResponseList[response][0]) {
                return dataset.labelledResponseList[response][1];
            }
        }
    }

    /*
        If label not found, Default response:
        "I don't understand your question, would you like to speak to a consultant?"
     */
    return "Andiyi kuwubuza umbuzo wakho. Ungathanda ukuthetha nomcebisi?";
};
