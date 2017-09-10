'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanPlugin = require('./utils/clean-plugin');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanPlugin({
      files: ['dist/*']
    })
  ]
};
