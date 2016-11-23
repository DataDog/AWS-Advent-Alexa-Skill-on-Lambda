var path = require('path');
var fs = require("fs");
var nodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'items',
  entry: './src/items',
  output: {
    path: path.join(__dirname, 'dist'),
    library: 'items',
    libraryTarget: 'commonjs2',
    filename: 'items.js',
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  externals: ['aws-sdk', nodeExternals()]
};
