var webpack = require('webpack');

module.exports = {
  context: __dirname + '/',
  entry: {
    app: ['whatwg-fetch','./client/app.jsx'],
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/assets/js',
    publicPath: '/' // So Hot Module Reload uses webpack dev server URL not Express app URL
  },

  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets: ['react', 'es2015']},
      }
    ],
  },

  // PRODUCTION:
  // - switch devtools to cheap-module-source-map
  // - change 'output.publicPath' prop above from webpackdev server url to production app url ('/')
  // - uncomment plugins below

  // DEV:
  // - switch devtools to source-map
  // - set output.publicPath url to webpack dev server URL
  // - comment out plugins

  // devtool: 'source-map',
  devtool: 'cheap-module-source-map',

  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ],

}
