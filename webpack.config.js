const HtmlWebpackPlugin = require('html-webpack-plugin');/*处理html*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');/!*处理js中的css 生成css文件*!/
const clearWebpackPlugin = require('clean-webpack-plugin');
/*const MiniCssExtractPlugin = require('mini-css-extract-plugin');*/
const path = require("path");
const webpack =require("webpack")

const apiMocker = require('webpack-api-mocker');
/*const mocker = require('./mocker/mocker')*/

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';


module.exports = {
    mode: 'development',
    entry: {
        "app":__dirname+"/src/app.js"
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'js/[name].js', /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        publicPath: "/"
    },
    /*导入的时候可以忽略文件后缀*/
    resolve: {
        extensions: [".js", ".jsx"],
    },
    devtool:  'cheap-module-eval-source-map',
    module:{
        rules:[
            /*将图片输出到指定的文件夹下*/
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: '[name].[ext]',
                            limit: 10000, // size <= 20KB
                            outputPath: "images/",
                            /*publicPath: "./images"*/
                        }
                    },

                ]
            },
            {
              test:/\.css$/,
              use:['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                // css处理为style标签
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            // 这两行是处理 react 相关的内容
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            /*{
                test:/\.jsx$/,
                loader:'babel-loader',
                exclude:path.resolve(__dirname,'node_modules'),
                include:path.resolve(__dirname,'src'),
                query:{
                    presets:['env', 'react'],

                }
            }*/
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/template/index.html',
            filename: 'index.html',/*dist（public）文件输出的html的文件名*/
            minify: {
                collapseWhitespace: false,/*是否去除html中的空格*/
            },
            hash: true,/*是否在js或者css引入的时候加上hash值*/
        }),

        new ExtractTextPlugin({}),

      /*  new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),*/
        new clearWebpackPlugin(['./public']),
       /* new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(ENV)
            }
        }),*/
    ],

    devServer: {
        port: 8080,/*端口*/
        historyApiFallback: true,
       /* contentBase: path.join(__dirname, "./public"),//设置localhost默认打开的文件夹*/
        /* historyApiFallback: true,
         inline: true,*/
       /* hot:true,*//*启用热加载*/
        /*代理*/
        proxy: {
            "/comments": {
                target: "https://m.weibo.cn",
                changeOrigin: true,
                logLevel: "debug",
                headers: {
                    Cookie: ""
                }
            }
        },
        /*mork*/
        before(app){
            apiMocker(app,path.resolve('./mock/mock.js')),{
                /* changeHost: true,*/
            }
        }


    },

}