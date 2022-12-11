const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: {
      index:"./src/Home/index.js",
      storage:"./src/Storage/storage.js",
    },
    output: {
        filename:"[name].js",
        path:path.resolve(__dirname,"./dist")
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
        ],
      },
      optimization : {
        runtimeChunk : 'single',
        splitChunks: {
          chunks: "all",
        }
       },
       resolve: {
        alias: {
        bootstrap: path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
         }
         },
    mode:"development",
    plugins: [
      new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: "./src/Home/index.html",
          filename: "index.html",
          chunks: ["index"],
        }),
        new HtmlWebpackPlugin({
          template: "./src/Storage/storage.html",
          filename: "storage.html",
          chunks: ["storage"],
        }),
        new MiniCssExtractPlugin({
          filename : "[name].css",
        })
    ]
}