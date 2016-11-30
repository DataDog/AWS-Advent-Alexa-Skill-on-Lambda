'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'https://a25avadb82.execute-api.us-east-1.amazonaws.com/dev/items/';

function GiftListHelper() {}

GiftListHelper.prototype.requestGiftList = function () {
  return this.getGiftList().then(
    function (response) {
      console.log('success - received items');
      return response.body.items;
    }
  );
};

GiftListHelper.prototype.getGiftList = function () {
  var options = {
    method: 'GET',
    uri: ENDPOINT,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

GiftListHelper.prototype.formatGiftList = function (giftList) {
  var itemArray = [];
  console.log('the list: %j', giftList);
  for (var i = 0; i < giftList.length; i++) {
    var itemnum = i+1
    var item = 'Item '+ itemnum +' : '+ giftList[i].name.S + ' because '+ giftList[i].description.S +'.';
    itemArray.push(item);
    console.log('*******'+item);

  }
  console.log(itemArray);

  return 'Here is your gift list. ' + itemArray.join(', ');

}
module.exports = GiftListHelper;