const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production', // Modo de producción
    entry: './src/index.js', // Archivo de entrada
    output: {
        path: __dirname + '/dist', // Carpeta de salida
        filename: 'index.js', // Nombre del archivo generado
    },
    module: {
        rules: [
            {
                test: /\.css$/i, // Procesar archivos CSS
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    externals: {
        jquery: 'jQuery', // No incluir jQuery en el bundle, tomarlo como global o externo
    },
    plugins: [
        // Permitir el uso de jQuery como $ y jQuery
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        // Plugin para inyectar tu bundle en el archivo HTML
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
    ],
};