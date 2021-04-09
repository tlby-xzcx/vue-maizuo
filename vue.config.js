module.exports = {
    lintOnSave: false,
    devServer: {
        host: "localhost",
        port: 8080,
        // open: true,
        proxy: {
            "/yun": {
                target: "http://47.104.209.44:3333",
                pathRewrite: {
                    "^/yun": ""
                }
            },
            "/vue": {
                target: "http://localhost:3000"
            },
            "/maizuo": {
                target: "https://m.maizuo.com",
                pathRewrite: {
                    "^/maizuo": ""
                }
            },
            "/public": {
                target: "http://localhost:3000",
                pathRewrite: {
                    "^/public": ""
                }
            }
        }
    },
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require("postcss-px2rem")({
                        remUnit: 37.5
                    })
                ]
            }
        }
    }
}