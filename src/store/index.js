import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import browser from './modules/browser'
import routerQueue from './modules/routerQueue'
import getters from './getters'
import Cache from '@/utils/cache'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    browser,
    routerQueue
  },
  getters,
  state:{
	  token:Cache.get('token'),
	  Type:Cache.get('Type'),
	  info:Cache.get('info')
  },
  mutations: {
	  login(provider) {
	  	state.token = provider;
	  	Cache.set('token', state.token)
	  },
	  logout(provider) {
	  	state.token = provider;
	  	Cache.set('token', state.token)
	  }
  }
  
})

export default store
