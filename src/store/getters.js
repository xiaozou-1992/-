const getters = {
    user: state => state.user.user,
    token: state => state.user.token,
    cache: state => state.routerQueue.cache,
    screen: state => state.browser.screen,
    clientMaxVisibleHeight: state => state.browser.clientMaxVisibleHeight,
    is360BrowserTopSpeed: state => state.browser.is360BrowserTopSpeed,
    resizeCode: state => state.browser.resizeCode,
    isIE: state => state.browser.isIE
}

export default getters
