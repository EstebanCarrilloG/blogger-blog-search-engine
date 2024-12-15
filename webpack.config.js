const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const isProduction = true; // Modo de ejecución

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: isProduction
    ? {
        jquery: "jQuery", // Solo excluye jQuery en producción
      }
    : {},
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  devServer: {
    static: "./dist",
    port: 3000,
    open: true,
  },
};
