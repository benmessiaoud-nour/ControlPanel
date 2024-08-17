const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Use this instead of OptimizeCSSAssetsPlugin

module.exports = {
    entry:{
        'app': './index.js',
        'assets/js/banner': './src/assets/js/banner.js',
    },

    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'app'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(sass|css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },

            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                exclude: /images/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "assets/fonts",
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks:['app']
        }),

        new HtmlWebpackPlugin({
            filename: "components/button.html",
            template: "./src/components/button.html",
            chunks:['app']
        }),

        new HtmlWebpackPlugin({
            filename: "components/textfield.html",
            template: "./src/components/textfield.html",
            chunks:['app']
        }),

        new HtmlWebpackPlugin({
            filename: "components/card.html",
            template: "./src/components/card.html",
            chunks:['app']
        }),

        new HtmlWebpackPlugin({
            filename: "components/banner.html",
            template: "./src/components/banner.html",
            chunks:['app', 'assets/js/banner']
        }),

        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/style.css',
        }),
    ],
    optimization: {
        minimizer: [
            `...`, // This keeps the existing minimizers (like TerserPlugin)
            new CssMinimizerPlugin(), // Minimize CSS using css-minimizer-webpack-plugin
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'app'),
        },
        compress: true,
        port: 8081,
        open: true,
    },
};
