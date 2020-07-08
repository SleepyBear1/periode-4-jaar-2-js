const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ["./src/main.js", 
    "./src/main.scss"],
    output: {
        path: path.resolve(__dirname, "public/assets"),
        filename: "main.js",
        publicPath: "/public"
    },
    watch:true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.s?css$/,
                use: [{
                    
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                      publicPath: "/css/"
                  },
                },
                  "css-loader",
                  "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
    ]
}