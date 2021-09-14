const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        build: ['core-js/stable', 'regenerator-runtime/runtime', './src/main.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name].[fullhash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    (process.env.NODE_ENV == 'production' ? MiniCssExtractPlugin.loader : 'style-loader'),
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    sources: false
                }
            },
            {
                test: /\.(gif|jpg|png|svg|ico|eot|woff|woff2|pdf|txt)$/,
                loader: 'file-loader',
                options: {
                    context: path.resolve(__dirname, './src'),
                    esModule: false,
                    name: '[path][name].[ext]?[contenthash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        extensions: ['.js', '.vue']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            favicon: './src/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[fullhash].css'
        }),
        new VueLoaderPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        }
                    ]
                }
            })
        ]
    },
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 'auto',
        static: {
            publicPath: '/',
            watch: {
                usePolling: true
            }
        },
        compress: true,
        https: false,
        historyApiFallback: {
            disableDotRule: true
        }
    },
    performance: {
        hints: false
    }
}
