module.exports = {

    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

    outputDir: 'dist',

    assetsDir: 'static',

    filenameHashing: true,

    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,

    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,

    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [],

    // 生产环境 sourceMap
    productionSourceMap: false,

    // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
    // corsUseCredentials: false,
    // webpack 配置，键值对象时会合并配置，为方法时会改写配置
    // https://cli.vuejs.org/guide/webpack.html#simple-configuration
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置

        } else {
            // 为开发环境修改配置

        }
    },

    // webpack 链接 API，用于生成和修改 webapck 配置
    // https://github.com/mozilla-neutrino/webpack-chain
    chainWebpack: (config) => {

    },

    // 配置高于chainWebpack中关于 css loader 的配置
    css: {
        // 是否开启支持 foo.module.css 样式
        modules: false,

        // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
        extract: false,

        // 是否构建样式地图，false 将提高构建速度
        sourceMap: false,

        // css预设器配置项
        loaderOptions: {
            // less: {
            //     // options here will be passed to css-loader
            //     modifyVars: {
            //         'primary-color': '#5130ab',   //主文本颜色
            //         'link-color': '#1DA57A',    //链接色
            //         'border-radius-base': '2px',  //组件、浮层圆角
            //         'font-size-base': '14px',  //主字号
            //         'success-color': '#52c41a',                         // 成功色
            //         'warning-color': '#faad14',                         // 警告色
            //         'error-color': '#f5222d',                           // 错误色
            //         'heading-color': 'rgba(0, 0, 0, .85)',              // 标题色
            //         'text-color': 'rgba(0, 0, 0, .65)',                 // 主文本色
            //         'text-color-secondary' : 'rgba(0, 0, 0, .45)',      // 次文本色
            //         'disabled-color' : 'rgba(0, 0, 0, .25)',            // 失效色
            //         'border-color-base': '#5130ab',                     // 边框色
            //         'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)',  // 浮层阴影
            //         'table-row-hover-bg': '#fbfbfe',
            //     },
            //     javascriptEnabled: true
            // },
            //
            // postcss: {
            //     // options here will be passed to postcss-loader
            // }
        }
    },

    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        hot: true,
        open: true,
        host: '127.0.0.1',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/app': {
                target: 'https://10.0.0.117',
                secure: false, //https
                changeOrigin: true,
                pathRewrite: {
                    '^/app': ''
                }
            }
        },
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,

    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // 第三方插件配置
    pluginOptions: {}
};