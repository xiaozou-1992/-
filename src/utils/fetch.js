import axios from 'axios'
import qs from 'qs'
import md5 from 'crypto-js/md5'
import {message, notification} from 'ant-design-vue'
import store from '@/store/index'
import Cache from '@/utils/cache'
import NProgress from 'nprogress' // Progress 进度条
NProgress.configure({
    easing: 'ease',
    speed: '500',
    trickleSpeed: 200
})
message.config({
    maxCount: 1
})
const duration = 3 // 持续时间

/**
 * 根据key值排序对象
 * @param unordered
 */
function ksort(unordered) {
    if (unordered) {
        const ordered = {}
        Object.keys(unordered).sort().forEach(function (key) {
            ordered[key] = unordered[key]
        })
        return ordered
    }
    return ''
}

let timeout = 30000
// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout, // 请求超时时间
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		'Content-type': 'application/json; charset=UTF-8'
    },
    withCredentials: false, // 跨域请求时是否需要使用凭证
    maxContentLength: 2000, // 响应内容的最大尺寸
    responseType: 'json'
})

// request拦截器
service.interceptors.request.use(config => {
    if ((config.params || config.data || {}).isNprogress) {
        NProgress.inc(0.2)
    }
    try {
        delete config.params.isNprogress
        delete config.data.isNprogress
    } catch (e) {

    }
    let sign = ''
    // config.headers['timestamp'] = new Date().getTime()
    if (store.getters.token || Cache.get('SYS_TOKEN')) { // 抑制store可能未实例化时的异常
				//config.headers['Authorization'] = Cache.get('SYS_TOKEN')
				config.headers['Authorization'] = '9W0/FTnx++a+HLtfa3iW+h=='
				
    }
    if (/^(post|put|delete)$/.test(config.method.toLowerCase())) {
        if (config.data && config.data['ContentType'] && config.data['ContentType'].indexOf('json') > -1) {
            // config.headers['Content-Type'] = 'application/json; charset=UTF-8'
			config.headers['Content-Type'] = 'application/json'
            delete config.data['ContentType']
        } else {
            if (config.headers['isFormData']) {
                delete config.headers['isFormData']
            } else {
                // config.data = qs.stringify(config.data, {arrayFormat: 'indices', allowDots: true})
            }
        }
        sign = md5(config.url + JSON.stringify(ksort(config.data))).words.join('')
    } else {
        sign = md5(config.url + JSON.stringify(ksort(config.params))).words.join('')
    }
    if (service[sign]) {
        service[sign].c()
        delete service[sign]
        if ((config.params || config.data || {}).isNprogress) {
            setTimeout(() => {
                NProgress.remove()
                NProgress.inc(0.2)
            })
        }
    }
    config.cancelToken = new axios.CancelToken(c => {
        service[sign] = {
            c
        }
    })
    config._sign = sign
    config._service = service
    return config
}, error => {
    message.warn(`异常信息:${error.message}`, duration)
    Promise.reject(error)
})
// response拦截器
service.interceptors.response.use(function (response) {
    NProgress.done()
    return response
}, function (error) {
    NProgress.done()
    if (error.response) {
        let {response: {status}} = error
        switch (true) {
            case status === 400:
                message.warn(`错误请求`, duration)
                break
            case status === 401 && location.href.indexOf('/login') === -1:
                message.warn('未授权，请重新登录', duration)
                store.dispatch('logOut').then(() => {
                    location.reload()// 为了重新实例化vue-router对象 避免bug
                })
                break
            case status === 403:
                message.warn('拒绝访问', duration)
                break
            case status === 404:
                message.warn('请求错误,未找到该资源', duration)
                break
            // case status === 405:
            //     message.warn('请求方法未允许', duration)
            //     break
            case status === 408:
                message.warn('请求超时', duration)
                break
            // case status === 500:
            //     message.warn('服务器端出错', duration)
            //     break
            // case status === 501:
            //     message.warn('网络未实现', duration)
            //     break
            // case status === 502:
            //     message.warn('网络错误', duration)
            //     break
            // case status === 503:
            //     message.warn('服务不可用', duration)
            //     break
            // case status === 504:
            //     message.warn('网络超时', duration)
            //     break
            // case status === 505:
            //     message.warn('http版本不支持该请求', duration)
            //     break
            default:
                notification.error({
                    message: error.response['status'],
                    description: error.response.data['message'],
                    duration: 30
                })
        }
    } else {
        switch (error['message']) {
            case `timeout of ${timeout}ms exceeded`:
                message.warn('请求超时,请检测您的网络', duration)
                break
            case 'Network Error':
                message.warn('网络错误,请检测您的网络', duration)
                break
            case void 0:
                // 取消上一次相同请求
                break
            default:
                message.warn(error['message'].toString(), duration)
                break
        }
    }
    return Promise.reject(error)
})


// const fetch = async function (query = {}) {
//     let res
//     try {
//         res = await service(query)
//         let {config: {_service, _sign}} = res
//         delete _service[_sign]
//         delete res.config._service
//         return res
//     } catch (e) {
//         console.error(e)
//     }
// }

const fetch = async function (query = {}) {
	// Cache.set('loginTime', new Date())
    let res
    try {
			res = await service(query)
			let {config: {_service, _sign}} = res
			delete _service[_sign]
			delete res.config._service
			return res
        
    } catch (e) {
        console.log(e)
    }
}

export default fetch
