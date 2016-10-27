var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

// webpack traverses application code, looking for import statements
// builds a dependency graph of assets
// creates a bundle
module.exports = {
  // separate volatile app code from stable vendor code and polyfills
  entry: {
    // polyfill allows functionality you expect the browser to provide natively
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  // resolve module file requests with empty extension string or .ts or .js
  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      // transpile Typescript to ES5 (configured in tsconfig.json)
      // load angular components' templates and styles
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      // for component templates
      {
        test: /\.html$/,
        loader: 'html'
      },
      // bundle images and fonts
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      // matches application-wide styles
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      // handles component-scoped styles and loads them as strings via the raw loader
      // (specified in a component's styleUrls metadata property)
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    // webpack is not smart enough to keep vendor code out of the app.js bundle
    // CommonsChunkPlugin does that
    // identifies the hierarcy among three chunks: app -> vendor -> polyfills
    // where webpack finds that app has shared dependencies with vendor, it removes them from app
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    // inject js and css files into index.html instead of manually
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
