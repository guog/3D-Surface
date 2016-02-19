var webpack = require('webpack');

module.exports = {
  entry: {
    app: [
      './src/scripts/main.jsx'
    ]
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
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
