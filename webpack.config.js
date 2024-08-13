const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Use this instead of OptimizeCSSAssetsPlugin

module.exports = {
    entry: './index.js',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'app'),
        filename: 'app.js',
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
