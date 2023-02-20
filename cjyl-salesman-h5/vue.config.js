const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost', // 主机地址
    port: '8080', // 端口
    proxy: {
      '/': {
        target: 'https://app.changenhealth.cn/', // 生产
        // target: 'http://test.changenhealth.cn/salesman', // 测试
        // target: 'http://10.10.5.6:15808', // 本地
        changeOrigin: true,
        ws:false,
        pathRewrite: {
          '/': ''//请求的时候使用这个api就可以
        }
      },
      // '/': {
      //   ws:false,
      //   target: 'https://changenhealth.cn/', // 生产
      //   changeOrigin: true,
      // }
    },
  },
  configureWebpack:{
	module: {
		rules: [
			{
				test: /\.(woff|woff2|eot|ttf|ttc|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
  }
})