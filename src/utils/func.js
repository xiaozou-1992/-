
const Func = {
    /**
     * 生成唯一标识
     * */
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1)
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4()
    },
    /**
     * 解析时间
     * @param time 时间
     * @param cFormat 格式
     * */
    parseTime(time, cFormat) {
        if (arguments.length === 0) {
            return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
            date = time
        } else {
            if (('' + time).length === 10) time = parseInt(time) * 1000
            date = new Date(time)
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            let value = formatObj[key]
            if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
            if (result.length > 0 && value < 10) {
                value = '0' + value
            }
            return value || 0
        })
        return time_str
    },
    /**
     * 格式化时间
     * @param filterVal 过滤数据
     * @param jsonData 数据源
     * */
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
            if (j === 'timestamp') {
                return Func.parseTime(v[j])
            } else {
                return v[j]
            }
        }))
    },
    timeFix(d) {
        const time = d || new Date()
        let hour = time.getHours()
        return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
    },
    /**
     *判断类型
     *@param aim 目标
     * */
    judgeType(aim) {
        let type
        switch (Object.prototype.toString.call(aim)) {
            case '[object Date]':
                type = 'date'
                break
            case '[object String]':
                type = 'string'
                break
            case '[object Math]':
                type = 'math'
                break
            case '[object Undefined]':
                type = 'undefined'
                break
            case '[object Null]':
                type = 'null'
                break
            case '[object Object]':
                type = 'object'
                break
            case '[object Array]':
                type = 'array'
                break
            case '[object Number]':
                type = 'number'
                break
            case '[object Boolean]':
                type = 'boolean'
                break
            case '[object Function]':
                type = 'function'
                break
        }
        return type
    }
}

export default Func
