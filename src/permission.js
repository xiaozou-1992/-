import store from './store/index'
import router from './router'
import enquire from 'enquire.js'
import Cache from '@/utils/cache'
import moment from 'moment';
router.beforeEach((to, from, next) => {
	if (store.state.token == null) {
		store.dispatch('getUserInfo').then(() => {
			// next({path: '/'})
			next()
		}).catch(function() {
			next({
				path: '/register'
			})
		})
	} else {
		let startTime = moment(Cache.get('loginTime')).format('YYYY/MM/DD HH:mm:ss');
		let nowTime = moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
		let dateSpan = Math.abs(Date.parse(nowTime) - Date.parse(startTime))
		if (dateSpan > 3600000 && to.name != 'register' && to.name != 'adminLogin' && to.name != 'agencyLogin') {
			next({
				path: '/register'
			})
		} else {
			next()
		}
		next()
	}
})


enquire.register('screen and (max-width:575.98px)', {
	match() {
		store.dispatch('changeWidth', {
			screenMaxWidth575: true
		})
	},
	unmatch() {
		store.dispatch('changeWidth', {
			screenMaxWidth575: false
		})
	}
})
enquire.register('screen and (min-width:576px) and (max-width:767.98px)', {
	match() {
		store.dispatch('changeWidth', {
			screenMinWidth576MaxWidth767: true
		})
	},
	unmatch() {
		store.dispatch('changeWidth', {
			screenMinWidth576MaxWidth767: false
		})
	}
})
enquire.register('screen and (min-width:768px) and (max-width:991.98px)', {
	match() {
		store.dispatch('changeWidth', {
			screenMinWidth768MaxWidth991: true
		})
	},
	unmatch() {
		store.dispatch('changeWidth', {
			screenMinWidth768MaxWidth991: false
		})
	}
})
enquire.register('screen and (min-width:992px) and (max-width:1199.98px)', {
	match() {
		store.dispatch('changeWidth', {
			screenMinWidth992MaxWidth1199: true
		})
	},
	unmatch() {
		store.dispatch('changeWidth', {
			screenMinWidth992MaxWidth1199: false
		})
	}
})
enquire.register('screen and (min-width: 1200px)', {
	match() {
		store.dispatch('changeWidth', {
			screenMinWidth1200: true
		})
	},
	unmatch() {
		store.dispatch('changeWidth', {
			screenMinWidth1200: false
		})
	}
})
