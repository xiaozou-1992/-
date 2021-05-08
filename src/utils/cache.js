const Cache = {
    get(key, isSession = false) {
        if (!isSession) {
            try {
                return JSON.parse(localStorage.getItem(key))
            } catch (e) {
                return localStorage.getItem(key)
            }
        } else {
            try {
                return JSON.parse(sessionStorage.getItem(key))
            } catch (e) {
                return sessionStorage.getItem(key)
            }
        }
    },
    set(key, data, isSession = false) {
        if (!isSession) {
            if (data) {
                if (typeof data === 'object') {
                    data = JSON.stringify(data)
                }
                localStorage.setItem(key, data)
            }
        } else {
            if (data) {
                if (typeof data === 'object') {
                    data = JSON.stringify(data)
                }
                sessionStorage.setItem(key, data)
            }
        }
    },
    remove(key, isSession = false) {
        if (!isSession) {
            localStorage.removeItem(key)
        } else {
            sessionStorage.removeItem(key)
        }
    },
    clear(isSession = false) {
        if (!isSession) {
            localStorage.clear()
        } else {
            sessionStorage.clear()
        }
    }
}
export default Cache
