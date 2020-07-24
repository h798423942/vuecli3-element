const path = require("path");
module.exports = {

    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

    outputDir: 'dist',

    assetsDir: 'public',

    filenameHashing: true,

    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,

    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,

    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [],

    // 生产环境 sourceMap
    productionSourceMap: false,

    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置

        } else {
            // 为开发环境修改配置

        }
    },
    chainWebpack: (config) => {

    },

    // 配置高于chainWebpack中关于 css loader 的配置
    css: {
        // 是否开启支持 foo.module.css 样式
        modules: false,

        // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
        extract: true,

        // 是否构建样式地图，false 将提高构建速度
        sourceMap: false,

        // css预设器配置项
        loaderOptions: {
            sass: {
                additionalData: `@import "@/assets/skins/variables.scss";`
            }
        }
    },

    // All options for webpack-dev-server are supported
    devServer: {
        contentBase: './public',
        hot: true,
        open: true,
        host: '127.0.0.1',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://10.0.0.99:10080',
                // secure: false, //https
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,
    pwa: {},
    // 第三方插件配置
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [],
            // patterns: [path.resolve(__dirname, "@/assets/skins/variables.scss")] // 引入全局样式变量
        }
    }
};
