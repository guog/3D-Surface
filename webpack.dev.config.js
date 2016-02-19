var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      './src/scripts/main.jsx'
    ]
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'react-hot!babel',
        exclude: /node_modules/
      },
      {
        test: /\.json?$/,
        loader: 'json',
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        loader: 'style!css!sass?indentedSyntax=true&outputStyle=expanded'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[path][name].[ext]&context=./src'
      }
    ]
  }
};
