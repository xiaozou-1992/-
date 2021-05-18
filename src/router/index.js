import Vue from 'vue';
import Router from 'vue-router';
/* login */
import register from '@/views/register.vue';
/* layout */
import Layout from '@/views/layout/Layout';
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router);
export const constantRouterMap = [
	{
		path: '/register',
		name: 'register',
		component: _import('register')
	},
	// {
	// 	path: '/login',
	// 	name: 'login',
	// 	component: _import('login')
	// },
	{
		path: '/',
		component: Layout,
		children: [{
				path: '/',
				name: 'Home',
				component: _import('Home'),
			},
			{
				path: 'building',
				name: 'building',
				component: _import('building/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'role',
				name: 'role',
				component: _import('role/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'user',
				name: 'user',
				component: _import('user/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'depart',
				name: 'depart',
				component: _import('depart/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'classroom',
				name: 'classroom',
				component: _import('classroom/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'college',
				name: 'college',
				component: _import('college/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'disable',
				name: 'disable',
				component: _import('disable/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'logistics',
				name: 'logistics',
				component: _import('logistics/index'),
				meta: {
					keepAlive: true,
				}
			},
			{
				path: 'procedure',
				name: 'procedure',
				component: _import('procedure/index')
			},
			{
				path: 'actType',
				name: 'actType',
				component: _import('actType/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'supertube',
				name: 'supertube',
				component: _import('supertube/index'),
				meta: {
					keepAlive: true,
				},
			}
		]
	}
]
const router = new Router({
	mode: 'hash', // history 需要开启伪静态
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})
export default router
