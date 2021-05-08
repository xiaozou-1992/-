import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'

// 全局过滤器

// 数字三位加逗号
Vue.filter('numberFormat', function (value) {
    if (!value) {
        return '0'
    }
    return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
})
// 日期格式化
Vue.filter('dataFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})
