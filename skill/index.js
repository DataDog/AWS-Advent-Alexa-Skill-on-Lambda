'use strict';
var _ = require('lodash');
var alexa = require('alexa-app');
var App = new alexa.app('giftlister');
var GiftHelper = require('./giftlist-helper');

module.change_code = 1;


App.launch (function(req, res) {
  var prompt = 'Let me read your gift lists';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

App.intent('getListIntent', {
  'utterances': ['get {my|the} {|gift|shopping|presents} list']
},
  function (req, res) {
    var reprompt = 'Let me read your gift lists';
    var giftHelper = new GiftHelper();
    giftHelper.requestGiftList().then(function (giftlist) {
      res.say(giftHelper.formatGiftList(giftlist)).send();
    }).catch(function (err) {
      console.log(err.statusCode);
      res.say('i can\'t find the gift list').reprompt(reprompt).shouldEndSession(false).send();
      });
    return false;
  }
);

module.exports = App;
