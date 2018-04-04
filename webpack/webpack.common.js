const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index.js'),
        vendor: [
                'lodash'
            ]
    },
    plugins: [
        new CleanWebpackPlugin(
            ['dist'],
            { root: path.resolve(__dirname, '../')}),
        new HtmlWebpackPlugin({
            title: 'Caching',
            template: path.resolve(__dirname, '../public/index.html')
        })
    ],
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        },
    },
    module: {
        rules: [
            // This enables you to import './style.css' into the file that depends on that styling.
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // For images
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // For fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            // For CSVs and TSVs
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            // For XML
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
};