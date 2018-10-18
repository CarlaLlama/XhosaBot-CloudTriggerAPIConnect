 //On new message received make FAQ matcher request
 var FeersumNluApi = require("feersum_nlu_api");

 var defaultClient = FeersumNluApi.ApiClient.instance;

 // Configure API key authorization: APIKeyHeader
 var APIKeyHeader = defaultClient.authentications['APIKeyHeader'];
 APIKeyHeader.apiKey = "2707cee1-e4f9-4880-a99e-b9ed5303a176";
 // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
 //APIKeyHeader.apiKeyPrefix['AUTH_TOKEN'] = "Token"

 var api = new FeersumNluApi.Faq_matchersApi();

 instanceName = 'xhosabot_matcher';


 module.exports = {
     startRequest: function(messageText){
         return new Promise(function (resolve, reject) {
             var initCreatePromise = createModel();
             initCreatePromise.then(function (result) {
                 var initQueryPromise = queryModel(messageText);
                 initQueryPromise.then(function (result) {
                     if (result !== null) {
                         resolve(result);
                     }
                     reject(result);
                 }, function (err) {
                     console.log(err);
                     reject(err);
                 }).catch(function (err){
                     console.log(err);
                     reject(err);
                 })
             }, function (err) {
                 console.log(err);
                 reject(err);

             }).catch(function(err){
                 console.log(err);
                 reject(err);
             });

         });
     }
 };

function createModel(){
    return new Promise(function(resolve, reject) {
        let createDetails = new FeersumNluApi.CreateDetails(instanceName, true);
        api.faqMatcherCreate(createDetails)
            .then(function(data) {
                console.log('Model Create called successfully.');
                resolve(data);
            }, function(error) {
                console.error(error);
                reject(error);
            }).catch(function(err) {
            console.error(err);
            reject(err);
        })
    });
}


function queryModel(messageText){
    return new Promise(function(resolve, reject) {
        let textInput = new FeersumNluApi.TextInput(messageText);
        console.log("Attempt question match");
        api.faqMatcherRetrieve(instanceName, textInput)
            .then(function(data) {
                console.log('API called successfully. Returned data: ' + data[0].label);
                var label = data[0].label;
                resolve(label);
            }, function(error) {
                console.error("This is the error: " + error);
                reject(error);
            }).catch( function(alsoError){
                console.error("This is also the error: " + alsoError);
                reject(alsoError);
        });
    });
}


