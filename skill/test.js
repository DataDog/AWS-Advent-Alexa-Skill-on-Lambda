'use strict';
var _ = require('lodash');
var giftHelper = require('./giftlist-helper');

module.change_code = 1;


var giftHelper = new giftHelper();

giftHelper.requestGiftList().then(function (giftlist) {

  console.log(giftHelper.formatGiftList(giftlist));

}).catch(function (err) {
  console.log(err.statusCode);
});

