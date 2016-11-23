import AWS from 'aws-sdk';
import Chance from 'chance';
import moment from 'moment';

const db = new AWS.DynamoDB();
const chance = new Chance();

const mapItem = item => (
  {
    id: item.itemId,
    name: item.itemName,
    description: item.itemDescription,
    url: item.itemUrl,
    picture: item.itemPicture,
    createdUtc: item.dateAdded,
  }
);

const createResponse = (statusCode, body) => (
  {
    statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body),
  }
);

module.exports.getAllItems = (event, context, callback) => {
  console.log('getAllItems', JSON.stringify(event));
  const params = {
    TableName: 'giftListrItem',
  };

  try {
    db.scan(params, (err, data) => {
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


module.exports.addItem = (event, context, callback) => {
  console.log('addItem', JSON.stringify(event));
  console.log('Still trying');
  console.log(event.body);
  const body = JSON.parse(event.body);
  console.log(body);
  const params = {
    Item: {
      itemId: { S: chance.guid() },
      itemName: { S: body.itemname },
      itemDescription: {
        S: body.itemdescription,
      },
      itemUrl: {
        S: body.itemurl,
      },
      createdUtc: {
        S: moment().utc().toISOString(),
      },
    },
    TableName: 'giftListrItem',
    ConditionExpression: 'attribute_not_exists(itemId)',
  };
  console.log('about to try in add');
  try {
    db.putItem(params, (err) => {
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

module.exports.deleteItem = (event, context, callback) => {
  const itemId = event.pathParameters.itemId;
  console.log('deleteItem', itemId);
  const params = {
    Key: {
      itemId: {
        S: itemId,
      },
    },
    TableName: 'giftListrItem',
  };
  try {
    db.deleteItem(params, (err) => {
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
