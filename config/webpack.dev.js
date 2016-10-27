var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  // webpack dev server keeps all bundles in memory; doesn't write to disk
  output: {
    path: helpers.root('dist'),
    // publicPath and filename used by HtmlWebpackPlugin to generate
    // appropriate <script> and <link> tags into index.html
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    // extracts CSS from bundles into external .css files that
    // the HtmlWebpackPlugin inscribes as <link> tags into the index.html
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
