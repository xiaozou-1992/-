import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Print from '@/api/print1.js'
Vue.use(Print); //注册
//全局过滤器
import * as filters from './filters/index.js' 
Object.keys(filters).forEach(item => Vue.filter(item,filters[item]))
//工作流配置
import Node from 'workflow-ui/src/components/Generator/node'
Vue.component('Node', Node)
import Antd, {
	message,
	notification
} from 'ant-design-vue'
import "./assets/iconfont.css";
import Router from 'vue-router'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// 富文本配置
import './assets/UEditor/ueditor.config.js'
import './assets/UEditor/ueditor.all.min.js'
import './assets/UEditor/lang/zh-cn/zh-cn.js'
import './assets/UEditor/themes/default/css/ueditor.css'
// import './assets/UEditor/ueditor.parse.min.js'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
//公共参数
import global from './api/global.js'
Vue.prototype.global = global

// 将后台返回的 /Date(1603892082484)/ 这种时间数据格式化成时分秒
Vue.prototype.$praseDate = function(date){
 	 var dt = new Date(parseInt(date.replace(/.*Date\([^\d]*(\d+)[^\d]*\).*/, '$1')));
     return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
}

import {
	Table,
	Pagination,
	TableColumn,
	Button,
	ButtonGroup,
	Tag,
	Autocomplete,
	Loading,
	Input,
	Dialog,
	Select,
	Option,
	Upload,
	Avatar,
	InputNumber,
	Radio,
	Icon,
	Card
} from 'element-ui'
import 'ant-design-vue/dist/antd.less'
import './utils/filter'
import tool from './utils/tool'
import '@/styles/nprogress.css'
import './permission'

Vue.config.productionTip = false
Vue.use(Viewer);
Viewer.setDefaults({
	Options: {
		"inline": true,
		"button": true,
		"navbar": true,
		"title": true,
		"toolbar": true,
		"tooltip": true,
		"movable": true,
		"zoomable": true,
		"rotatable": true,
		"scalable": true,
		"transition": true,
		"fullscreen": true,
		"keyboard": true,
		"url": "data-source"
	}
});
Vue.use(tool)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Tag)
Vue.use(Autocomplete)
Vue.use(Dialog)
Vue.use(Loading.directive)
Vue.use(Antd)
Vue.use(Avatar)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(tool)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Icon)
Vue.use(Card)
message.config({
	 top: `80px`,
	maxCount: 1,
})
notification.config({
	placement: 'topRight',
	duration: 3
})



Vue.prototype.$ajax = Axios


// 根据路由设置标题
router.beforeEach((to, from, next) => {
	/*路由发生改变修改页面的title */
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})

function registerComponents() {
	const components = require.context('@/components/', true, /index\.(js|vue)$/)
	components.keys().forEach(key => {
		const name = key.match(/\w+/)[0]
		const component = process.env === 'production' ? components(key) : components(key).default
		Vue.component(name, component)
	})
}
window.Promise = Promise;
// 在开发环境中开启Devtools工具
Vue.config.devtools = process.env.NODE_ENV === 'development'
// 在浏览器开发工具的性能/时间线面板中启用性能追踪
Vue.config.performance = process.env.NODE_ENV === 'development'

registerComponents()
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

Vue.config.devtools = true
