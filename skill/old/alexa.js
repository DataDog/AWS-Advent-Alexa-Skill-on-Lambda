// import Alexa from 'alexa-sdk';
import { Skill, Launch, Intent } from 'alexa-annotations';
import Response from 'alexa-response';


// const lambda = require('aws-lambda-invoke');

// const skillName = 'GiftLister';

@Skill
export default class alexaGift {

  constructor(attributes = {}) {
    this.result = attributes.result;
    this.index = attributes.index;
  }

  @Launch
  launch(event) {
    return Response.say('hello world launched');
  }

  @Intent('GetList')
  GetList({ name = 'world' }) {
    return Response.say(`Hello ${name}`).card({ title: 'HelloWorld', content: `Hello ${name}` });
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return Response.ask('I say hello to people. Who should I say hello to?').reprompt('Who should I say hello to?');
  }

  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
  stop() {
    return Response.say('Goodbye');
  }

}

// const handlers = {
//   GetList: () => {
//     lambda.invoke('giftlister-dev-getAllItems', {}).then((result) => {
//       console.log(result);
//     });
//     console.log('done');
//     return Response.say('There are many items');
//   },
//   AboutIntent: () => {
//     const speechOutput = 'This skill was made by Matt Williams from Datadog';
//     this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
//   },

//   'AMAZON.HelpIntent': () => {
//     let speechOutput = '';
//     speechOutput += 'Here are some things you can say: ';
//     speechOutput += 'Tell me something interesting about Java. ';
//     speechOutput += 'Tell me about the skill developer. ';
//     speechOutput += 'You can also say stop if you are done. ';
//     speechOutput += 'So how can I help?';
//     this.emit(':ask', speechOutput, speechOutput);
//   },

//   'AMAZON.StopIntent': () => {
//     const speechOutput = 'Goodbye';
//     this.emit(':tell', speechOutput);
//   },

//   'AMAZON.CancelIntent': () => {
//     const speechOutput = 'Goodbye';
//     this.emit(':tell', speechOutput);
//   },

//   LaunchRequest: () => {
//     let speechText = '';
//     speechText += `Welcome to ${skillName}.  `;
//     speechText += 'You can ask a question like, tell me something interesting about Java.  ';
//     const repromptText = 'For instructions on what you can say, please say help me.';
//     this.emit(':ask', speechText, repromptText);
//   },
// };

// exports.handler = (event, context) => {
//   const alexa = Alexa.handler(event, context);
//   alexa.appId = 'amzn1.ask.skill.8c042be3-3717-4013-bddd-35030fb7dde4';
//   alexa.registerHandlers(handlers);
//   alexa.execute();
// };

