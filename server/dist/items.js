module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(1);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _awsSdk = __webpack_require__(2);

	var _awsSdk2 = _interopRequireDefault(_awsSdk);

	var _chance = __webpack_require__(3);

	var _chance2 = _interopRequireDefault(_chance);

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var db = new _awsSdk2.default.DynamoDB();
	var chance = new _chance2.default();

	var mapItem = function mapItem(item) {
	  return {
	    id: item.itemId,
	    name: item.itemName,
	    description: item.itemDescription,
	    url: item.itemUrl,
	    picture: item.itemPicture,
	    createdUtc: item.dateAdded
	  };
	};

	var createResponse = function createResponse(statusCode, body) {
	  return {
	    statusCode: statusCode,
	    headers: { 'Access-Control-Allow-Origin': '*' },
	    body: (0, _stringify2.default)(body)
	  };
	};

	module.exports.getAllItems = function (event, context, callback) {
	  console.log('getAllItems', (0, _stringify2.default)(event));
	  var params = {
	    TableName: 'giftListrItem'
	  };

	  try {
	    db.scan(params, function (err, data) {
	      if (err) {
	        callback(createResponse(500, { message: err.message || 'Internal Server Error' }));
	      } else {
	        callback(null, createResponse(200, { items: data.Items.map(mapItem) }));
	      }
	    });
	  } catch (err) {
	    callback(null, createResponse(500, { message: err.message || 'Internal server error' }));
	  }
	};

	module.exports.addItem = function (event, context, callback) {
	  console.log('addItem', (0, _stringify2.default)(event));
	  console.log('Still trying');
	  console.log(event.body);
	  var body = JSON.parse(event.body);
	  console.log(body);
	  var params = {
	    Item: {
	      itemId: { S: chance.guid() },
	      itemName: { S: body.itemname },
	      itemDescription: {
	        S: body.itemdescription
	      },
	      itemUrl: {
	        S: body.itemurl
	      },
	      createdUtc: {
	        S: (0, _moment2.default)().utc().toISOString()
	      }
	    },
	    TableName: 'giftListrItem',
	    ConditionExpression: 'attribute_not_exists(itemId)'
	  };
	  console.log('about to try in add');
	  try {
	    db.putItem(params, function (err) {
	      if (err) {
	        callback(createResponse(500, { message: err.message || 'Internal server error 1' }));
	      } else {
	        callback(null, createResponse(200, mapItem(params.Item)));
	      }
	    });
	  } catch (err) {
	    callback(createResponse(500, { message: err.message || 'Internal server error' }));
	  }
	};

	// module.exports.updateItem = (event, context, cb) => {
	//     items.update(itemId);
	// }

	module.exports.deleteItem = function (event, context, callback) {
	  var itemId = event.pathParameters.itemId;
	  console.log('deleteItem', itemId);
	  var params = {
	    Key: {
	      itemId: {
	        S: itemId
	      }
	    },
	    TableName: 'giftListrItem'
	  };
	  try {
	    db.deleteItem(params, function (err) {
	      if (err) {
	        callback(createResponse(500, { message: err.message || 'Internal server error 1' }));
	      } else {
	        console.log('got to success in db.delete');
	        callback(null, createResponse(200, { message: 'deleted' }));
	      }
	    });
	  } catch (err) {
	    callback(createResponse(500, { message: err.message || 'Internal server error' }));
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("aws-sdk");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("chance");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ }
/******/ ]);