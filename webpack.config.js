let path = require('path');

const HtmlWebpackPlugin  = require("html-webpack-plugin");  // 曹组 html

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");  // 抽离样式 css文件

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

//主机和端口
let host = '0.0.0.0';
let port = '7001';

module.exports = {
    entry:['./src/main.js'],   //项目入口文件
    output:{
        path:path.resolve(__dirname,'./dist'),//项目输出路径
        publicPath:"./",    //devServer访问路径
        filename:"app.[hash:8].js"    //打包后文件名
    },
    //启动一个服务器
    devServer:{
        contentBase:path.join(__dirname,"dist"),  // 服务器目录   
        publicPath:"/",
        historyApiFallback: true,   //遇到404重定向到index.html
        overlay: true,    //将错误显示在html之上
        host:host,
        port:port,
        hot:true,   //热刷新
        inline: true,   //内联模式
        noInfo: true,   //只保留错误警告
        //前端跨域代理解决
        proxy: {
            '/index': {
                target: 'http://localhost:8000',
                secure: false
            }
        }
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
        }
    },
    module:{
        rules:[
            {
                test:/\.(css|less)$/,
                // use:[
                //     "style-loader","css-loader","less-loader"
                // ]
                use:ExtractTextWebpackPlugin.extract({
                    fallback:"style-loader" ,    //  转成 node 风格代码
                    use:[
                        "css-loader","less-loader"
                    ]
                })
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    loaders: [
                        {"less":"style-loader!css-loader!less-loader"},
					    {"css":"stlye-loader!css-loader"}
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,       //exclude表示忽略node_modules文件夹下的文件，不用转码
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'./index.html',
            template:'./index.html',
            inject:true,         // 自动注入   js/css
            minify:{
                collapseWhitespace:true //折叠空白区域 也就是压缩代码
            },
        }),

        //引入vue-loader报错的解决方案
        new VueLoaderPlugin(),

        //抽离css样式
        new ExtractTextWebpackPlugin({
            filename:"app.[hash:8].css",
            allChunks:true,
            disable:false
        }),

        //输出控制台插件
        new FriendlyErrorsWebpackPlugin({
            //是否每次编译之间清除控制台
            //默认为true
            clearConsole:true,
            // 运行成功
            compilationSuccessInfo:{
                messages:[`Your application is running here: http://${host}:${port}`],
                // notes: ['Some additionnal notes to be displayed unpon successful compilation']
            },
            //添加格式化程序和变换器（见下文）
            additionalFormatters: [],
            additionalTransformers: []
        }),
    ]
}