var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './js/main.js',
  devtool: "source-map",
  output: { path: __dirname + '/build', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
        include: __dirname + '/css'
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: __dirname + '/css'
      }
    ]
  },
}
