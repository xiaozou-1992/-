import moment from 'moment'
import 'moment/locale/zh-cn'
export default {
    install(Vue) {
        Vue.prototype.$moment = moment
    }
}
