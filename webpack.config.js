const htmlWebpackPluging = require('html-webpack-plugin');
const { template } = require('webpack');

module.exports = {


    mode: 'production',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
       
    },
    plugins: [
        new htmlWebpackPluging({
            filename:'index.html',
            template: './src/index.html'
        })
    ],
}