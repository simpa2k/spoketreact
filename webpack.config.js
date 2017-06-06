var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module:{
        rules:[

            {
                test: /\.jsx?$/,
                include:[path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname,"node_modules")],
                loader: "babel-loader"
            },

            /*
             * For requiring images.
             * From https://stackoverflow.com/questions/34582405/react-wont-load-local-images
             */

            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        port:9876
    }
};