/*
* 是否为360极速模式
* */
function is360BrowserTopSpeed() {
    function a() {
        let is360 = _mime('type', 'application/vnd.chromium.remoting-viewer')
        return !!(isChrome() && is360)
    }

    // 检测是否是谷歌内核(可排除360及谷歌以外的浏览器)
    function isChrome() {
        let ua = navigator.userAgent.toLowerCase()
        return ua.indexOf('chrome') > 1
    }

    // 测试mime
    function _mime(option, value) {
        var mimeTypes = navigator.mimeTypes
        for (let mt in mimeTypes) {
            if (mimeTypes[mt][option] === value) {
                return true
            }
        }
        return false
    }

    return a()
}

/*
* 是否IE
* */
function isIE() {
    return !!window.ActiveXObject || 'ActiveXObject' in window
}

const size = {
    state: {
        // 屏幕监控
        screen: {
            screenMinWidth1200: false,
            screenMinWidth992MaxWidth1199: false,
            screenMinWidth768MaxWidth991: false,
            screenMinWidth576MaxWidth767: false,
            screenMaxWidth575: false
        },
        clientMaxVisibleHeight: window.screen.availHeight - (window.outerHeight - window.innerHeight + (is360BrowserTopSpeed() ? 12 : 0)),
        is360BrowserTopSpeed: is360BrowserTopSpeed(),
        isIE: isIE(),
        resizeCode: '' // 值改变说明了窗口大小变化
    },
    mutations: {
        SET_WIDTH(state, currentWidth) {
            state.screen = {
                ...state.screen,
                ...currentWidth
            }
        },
        SET_RESIZE_CODE(state, code) {
            state.resizeCode = code
        },
        SET_CLIENT_MAX_VISIBLE_HEIGHT(state, val) {
            state.clientMaxVisibleHeight = val
        }
    },
    actions: {
        /*
        * 窗口宽度改变
        * */
        changeWidth({commit}, currentWidth) {
            commit('SET_WIDTH', currentWidth)
        },
        /*
        * 窗口大小改变
        * */
        changeResizeCode({commit}, code) {
            commit('SET_RESIZE_CODE', code)
            commit('SET_CLIENT_MAX_VISIBLE_HEIGHT', window.screen.availHeight - (window.outerHeight - window.innerHeight + (is360BrowserTopSpeed() ? 12 : 0)))
        }
    }
}
export default size
