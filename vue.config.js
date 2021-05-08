const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
	
	// devServer:{
	// 	host:"localhost",
	// 	port:8080,
	// 	proxy:{
	// 		"server":{
	// 			targert:"http://api.jlb.ac.acxk.net:80",
	// 			ws:true,
	// 			changeOrigin:true,
	// 			pathRewrite:{
	// 				'^/server':''
	// 			}
	// 		}
	// 	}
	// },
	
	// baseUrl:"/",
	// devServer:{
	// 	proxy:{
	// 		"/":{
	// 			targert:"http://api.jlb.ac.acxk.net",
	// 			ws:true,
	// 			changeOrigin:true,
	// 			pathRewrite:{
	// 				'^/':''
	// 			}
	// 		}
	// 	}
	// },

	
    publicPath: './',
    devServer: {
        disableHostCheck: true
    },
    css: {
        // sourceMap: true,
				loaderOptions: {
					      less: {
					        import: resolve("src/common/stylus/mixin.less")
					      },
					    }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@router', resolve('src/router'))
            .set('@store', resolve('src/store'))
            .set('@utils', resolve('src/utils'))
    },
    configureWebpack: {
        plugins: [
            // new BundleAnalyzerPlugin(),
            new webpack.IgnorePlugin(/\.\/locale/, /moment/),
			
			new webpack.ProvidePlugin({
			      'window.Quill': 'quill/dist/quill.js',
			      'Quill': 'quill/dist/quill.js'
			    })
        ],
        // externals: {
        // },
		externals: {
		  AMap: "AMap" // 高德地图配置
		}
		// resolve: {
		//   alias: {
		//     vue$: "vue/dist/vue.esm.js"
		//   }
		// }
    }
}
