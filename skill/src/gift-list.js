import { Skill, Launch, Intent } from 'alexa-annotations';
import { say, ask } from 'alexa-response';
import ssml from 'alexa-ssml-jsx';
const unirest = require('unirest');

@Skill
export default class Giftlist {

  @Launch
  launch() {
    return say('Giftlist launched!');
  }

  @Intent('getList')
  giftList() {
    const url = 'https://a25avadb82.execute-api.us-east-1.amazonaws.com/dev/items/';
    let outstring;
    unirest.get(url).end((response) => {
      for (const item of response.body.items) {
        this.outstring += item.name.S + '. ';
      }
      console.log(this.outstring);
      return say(`Hello, here is what folks really want.${this.outstring}`).card({ title: 'Giftlist', content: 'Hello' });
    });
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return ask('I say hello to people. Who should I say hello to?').reprompt('Who should I say hello to?');
  }

  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
  stop() {
    return say(<speak>Goodbye!</speak>);
  }

  getUrl = (response) => {
    const options = {
      host: 'https://a25avadb82.execute-api.us-east-1.amazonaws.com',
      port: 80,
      path: '/dev/items/',
      agent: false
    };
    http.get(options, (res) => {
      console.log(`Response: ${res.statusCode}`);
      response(res.statusCode);
    }).on('error', (e) => {
      console.log(`Error: ${e.message}`)
    });
  };
}
