const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

require('dotenv').config()

const assistant = new AssistantV2({
  version: '2020-02-05',
  authenticator: new IamAuthenticator({
    apikey: 'OjOd9KDEku2VSvd7t-M62SF3Ms1KRcLiBLoHgpH0nSEC',
  }),
  url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/40bdabd3-8ff9-42cb-aeba-f71801d67ebc',
  disableSslVerification: true,
});



module.exports = assistant;
