const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

const isProduction = false; // Modo de ejecución


module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  externals: isProduction
    ? {
      jquery: "jQuery", // Solo excluye jQuery en producción
    }
    : {},
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({ filename: "style.css" }),
    !isProduction &&
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: "body",
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  devServer: {
    static: {
      directory: __dirname + "/dist",
    },
    devMiddleware: {
      writeToDisk: true,  // ✅ escribe los archivos a /dist en cada cambio
    },
    port: 3000,
    open: true,
    hot: true,
    watchFiles: ["src/**/*"],
  },
};
