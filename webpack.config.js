var webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            './src/index.jsx'
        ]
    },
    output: {
        path: './dist',
        filename: 'index.js'
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loader: 'file?name=[path][name].[ext]&context=./src'
        }]
    }
};
