// 该文件在cli 4.0 版本中进行深度封装，如需更改配置需要手动创建更改
const path = require('path')
const { url } = require('inspector')
const api = process.env.VUE_APP_API_URL
module.exports = {
    publicPath: '/', // 基本路径
    outputDir: process.env.outputDir, // 输出文件目录
    // lintOnSave: true, // eslint-loader 是否在保存的时候检查
    // runtimeCompiler: false, // 是否使用包含运行时编译器的Vue核心的构建
    // transpileDependencies: [], // transpileDependencies: []
    // productionSourceMap: true, //生产环境sourceMap
    // css相关配置
    // css: {
    //     // 启用 CSS modules
    //     // modules: false,
    //     // 开启 CSS source maps?
    //     sourceMap: false,
    //     // css预设器配置项
    //     loaderOptions: {},
    // },
    // webpack-dev-server 相关配置
    devServer: {
        // port: 8080,
        // https: false,
        // hotOnly: false,
        // 开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:3000
        // proxy: 'http://localhost:3000'  // 配置单个代理配置多个代理
        proxy: {
            '/goods': {
                target: 'http://localhost:3000', //代理地址，这里设置的地址会代替axios中设置的baseURL
                changeOrigin: true, // 设置是否跨域
                ws: true, // 是否代理websockets
                //pathRewrite方法重写url
                pathRewrite: {
                    // '^/goods': '/'
                    //pathRewrite: {'^/api': '/'} // 重写之后url为 http://localhost:3000/xxxx
                    //pathRewrite: {'^/api': '/api'} 重写之后url为 http://localhost:3000/api/xxxx
                }
            },
            '/users': {
                target: 'http://localhost:3000', //代理地址，这里设置的地址会代替axios中设置的baseURL
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                ws: true, // proxy websockets
            }
        }
    },
    // webpack配置
    configureWebpack: () => {},
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '橙狐'
                return args
            })
    },
    // PWA 插件相关配置
    pwa: {},
    // 第三方插件配置
    // plugins: []
}