 var FeersumNluApi = require("feersum_nlu_api");
 var submitResponse = require("./submitResponse.js");
 let responseGenerator = require("./responseGenerator.js");

 var defaultClient = FeersumNluApi.ApiClient.instance;

 var api = new FeersumNluApi.Faq_matchersApi();

 instanceName = process.env.INSTANCE_NAME;


 /**
  * API Request Process Generator
  * @class
  * @param {String} userId for collection key to upload
  * @param {String} message text to upload as messageText field
  * Message JSON:
  *      messageText: String
  *      messageSendTime: Timestamp
  *      messageFromBot: Boolean
  */
 module.exports = {
     startRequest: function(userId, messageText){
         return createModel(userId, messageText);
     }
 };

 /**
  * Create local FAQ NLU model for querying.
  * @param {String} userId for message processing
  * @param {String} messageText input query
  * @return {Promise} Call to message queryModel()
  */
 function createModel(userId, messageText){
     defaultClient = FeersumNluApi.ApiClient.instance;

     var APIKeyHeader = defaultClient.authentications['APIKeyHeader'];
     APIKeyHeader.apiKey = process.env.FEERSUM_NLU_API_KEY;
     api = new FeersumNluApi.Faq_matchersApi(defaultClient);
     let createDetails = new FeersumNluApi.CreateDetails(instanceName, true);
     return api.faqMatcherCreate(createDetails)
         .then(function(data) {
             // Successful authentication and model fetch
             console.log('Model Create called successfully.');
             return queryModel(userId, messageText);
         }, function(error) {
             console.error("FAQ Matcher error thrown: " + error);
         }).catch(function(err) {
             console.error("Error in FAQ Process: " + err);
         })
 }

 /**
  * Submit query to model, receive label
  * @param {String} userId for message processing
  * @param {String} messageText input query
  * @return {Promise} Call to message submitResponse()
  */
 function queryModel(userId, messageText){
     let textInput = new FeersumNluApi.TextInput(messageText);
     console.log("Attempt question match " + textInput.text);
     return api.faqMatcherRetrieve(instanceName, textInput)
         .then(function(data) {
             // Highest probability response contained in: data[0].label
             console.log('API called successfully. Returned data: ' + data[0].label);
             // Find response corresponding to label
             let outputText = responseGenerator(data[0].label);
             console.log("Data: " + outputText);
             // Promise to submit
             return submitResponse(userId, outputText);
         }, function(error) {
             console.error("FAQ Matcher error thrown: " + error);
         }).catch(function(alsoError){
             console.error("Error in FAQ Process: " + alsoError);
         });
 }


