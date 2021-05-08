import {getLogin} from '@/api/user'
import Cache from '@/utils/cache'

const user = {
    state: {
        user: void 0,
        token: null
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        }
    },

    actions: {
        setToken({commit}, token) {
            commit('SET_TOKEN', token)
        },
        setUser({commit}, user) {
            commit('SET_USER', user)
        },
        getUserInfo({commit}) {
			// console.log({commit})
			// debugger
   //          let judge
   //          let promise = new Promise((resolve, reject) => {
   //              judge = function (val) {
   //                  val ? resolve(val) : reject()
   //              }
   //          })
   //          let token = Cache.get('token')
   //          if (!token) {
   //              try {
   //                  let i = location.href.indexOf('=')
   //                  if (process.env.NODE_ENV === 'production') {
   //                      console.log('1')
   //                      // token = decodeURIComponent(location.href.slice(i + 1))
   //                      // token = Comm.urlParam("userToken").userToken?Comm.urlParam("userToken").userToken:decodeURIComponent('gxvXD+urlPx=')
   //                  } else {
   //                      // token = decodeURIComponent('gxvXD+urlPx=')
   //                  }
   //                  // Cache.set('token', token)
   //              } catch (e) {

   //              }
   //          }
   //          if (token) {
   //              commit('SET_TOKEN', token)
   //              getLogin({userToken: token, isNprogress: true}).then(res => {
   //                  commit('SET_USER', res.data)
   //                  judge(true)
   //              }).catch(err => {
   //                  console.log(err)
   //                  judge(false)
   //              })
   //          } else {
   //              judge(false)
   //          }
   //          return promise
        }
    }
}

var Comm = Comm || {};
		Comm.isIE6 = !window.XMLHttpRequest;	//ie6
		Comm.urlParam = function () {
			let param, url = location.href, theRequest = {};
			if (url.indexOf("?") != -1) {
        let _index = url.indexOf("?")+1
				let str = url.substr(_index);
				let strs = str.split("&");
				for (let i = 0, len = strs.length; i < len; i++) {
					param = strs[i].split("=");
					theRequest[param[0]] = decodeURIComponent(param[1]);
				}
			}
			return theRequest;
		};

export default user
