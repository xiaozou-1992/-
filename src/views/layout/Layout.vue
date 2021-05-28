<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout>
      <a-layout-header class="header">
        <div class="logo">
          <img src="../../assets/logo.png" />
          <span>后勤教室借用系统</span>
        </div>
        <div class="btn-con">
          <a-button class="trigger" type="primary" @click="goBack()">
            <a-icon type="rollback" />
          </a-button>
          <a-button class="trigger" type="primary" @click="reload()">
            <a-icon type="reload" />
          </a-button>
        </div>
        <div class="trigger-right" @click="logout()">
          退出登录
          <a-icon type="logout" />
        </div>
        <!-- <div class="trigger-right" @click="backhome()">
          返回首页
          <a-icon type="home" />
        </div> -->
        <!-- <div class="changePassword" @click="menu('changePassword')">修改密码</div> -->
        <div class="changePassword">
          {{ myInfo?myInfo.Name:'暂无' }}
        </div>
      </a-layout-header>
      <a-layout-content v-if="isRouterAlive" ref="layoutContent" :style="{position:'relative',display:'flex', background: '#fff', minHeight: '280px',margin:'20px 20px 0 20px',padding:'20px', height: layoutContentHeight, overflow: 'hidden' }">
        <a-layout style="padding: 11px 0; background: #fff;width: 201px;border-right: 1px solid #eee;">
          <a-layout-sider class="side-left" :trigger="null">
            <a-menu mode="inline" :default-selected-keys="keys">
              <a-menu-item :class="{'on': item.path=== routeOn?true:false}" v-for="(item,index) in menuList" @click="menu(item.id,item.path)" :key="item.id" v-if="menuListSub.find(d=>(d.id===item.id)) || (myInfo.Name === 'superadmin' && myInfo.ID === '1')">
                <a-icon :type="item.type" />
                <span class="nav-text">{{ item.title }}</span>
              </a-menu-item>
            </a-menu>
          </a-layout-sider>
        </a-layout>
        <keep-alive>
          <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view :key="$route.fullPath" v-if="!$route.meta.keepAlive"></router-view>
      </a-layout-content>
    </a-layout>
    <a-layout-footer style="text-align: center;padding:10px 0;">安财信科提供技术支持</a-layout-footer>
  </a-layout>
</template>
<script>
	import Cache from '@/utils/cache'
	import {
		comm
	} from '@/api/comm'
	import {
		GetUserInfo,
		GetUserAuthorityList
	} from '@/api/follow'
	export default {
		data() {
			return {
				keys: ['5'],
				showSubMenu: 0,
				columns: '',
				collapsed: false,
				layoutContentHeight: window.innerHeight - 129 + 'px',
				userType: Number,
				showKey: '1',
				loginIf: !Cache.get('token'),
				routerList: Cache.get('routerList'),
				detail: {},
				isRouterAlive: true,
				myInfo: {},
				menuList: [{
					title: '用户管理',
					path: 'user',
					type: 'team',
					id: 1
				}, {
					title: '部门管理',
					path: 'depart',
					type: 'layout',
					id: 2
				}, {
					title: '楼宇管理',
					path: 'building',
					type: 'hdd',
					id: 3
				}, {
					title: '教室管理',
					path: 'classroom',
					type: 'shop',
					id: 4
				}, {
					title: '学院审批人管理',
					path: 'college',
					type: 'user',
					id: 5
				}, {
					title: '楼宇教室禁用管理',
					path: 'disable',
					type: 'close-circle',
					id: 6
				}, {
					title: '后勤审批管理',
					path: 'procedure',
					type: 'safety-certificate',
					id: 7
				}, {
					title: '所有申请记录',
					path: 'logistics',
					type: 'check-circle',
					id: 8
				}, {
					title: '活动类型',
					path: 'actType',
					type: 'bell',
					id: 9
				}, {
					title: '管理员管理',
					path: 'supertube',
					type: 'user-add',
					id: 10
				}, {
					title: '角色管理',
					path: 'role',
					type: 'user-delete',
					id: 11
				}],
				menuListSub: Cache.get('menuListSub'),
				list: [],
				routeOn: ''
			}
		},
		watch: {
			$route(to, from) {
				this.routeOn = this.$route.name
			}
		},
		async beforeCreate() {
			if (!Cache.get('SYS_TOKEN') || comm('userToken').userToken) {
				let token = decodeURIComponent(comm('userToken').userToken)
				Cache.set('SYS_TOKEN', token)
			}
			if (!Cache.get('menuListSub') || comm('userToken').userToken) {
				let res = await GetUserAuthorityList()
				Cache.set('menuListSub', res.data.data)
				this.menuListSub = res.data.data
			}
		},
		created() {
			this.getUserInfo()
			let that = this
			setTimeout(() => {
				that.menuListSub = Cache.get('menuListSub')
			}, 300)
			this.routeOn = this.$route.name
		},
		methods: {
			backhome() {
				this.$router.push('/')
			},
			menu(type, path) {
				// let item = this.menuList.find(d => (d.id === type))
				this.$router.push({
					name: path,
					query: {
						type: type
					}
				})
			},
			async getUserInfo() {
				let res = await GetUserInfo()
				this.myInfo = res.data.data
			},
			goBack() {
				this.$router.back(-1)
			},
			reload() {
				this.isRouterAlive = false
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			},
			async logout() {
				Cache.remove('SYS_TOKEN')
				Cache.remove('menuListSub')
				window.location.href = 'http://api.jjx.hq.acxk.net/Home/LoginOut'
			}
		},
		mounted() {
			(window.onresize = () => {
				return (() => {
					return (this.layoutContentHeight = window.innerHeight - 116 + 'px')
				})()
			}),
			setInterval(function() {
				let list = JSON.parse(localStorage.getItem('hanginglistData')) || []
				if (list.length > 0) {
					for (var i = 0; i < list.length; i++) {
						if (Math.abs(new Date(list[i].time.replace(/-/g, '/')).getTime() - new Date().getTime()) / (24 * 3600 * 1000) >
							1) {
							list.splice(i, 1)
						}
					}
				}
				localStorage.setItem('hanginglistData', JSON.stringify(list))
			}, 300000)
		}
	}
</script>

<style lang="less">
	.side-left{
		.ant-menu-item-selected{
				background-color: #fff!important;
				color: rgba(0,0,0,.65);
				&::after{
					border-right: 1px solid rgb(238, 238, 238) !important;
				}
			}
		.on{
			background-color: #e6f7ff !important;
			color: #1890ff;
			border-right: 3px solid #1890ff;
		}
	}

	.ant-menu {
		border-right: 0 !important;
	}

	.ant-layout {
		flex: none !important;
	}

	.ant-layout-sider {
		background-color: #fff !important;
	}

	#components-layout-demo-top-side-2 .trigger {
		font-size: 14px;
		line-height: 30px;
		height: 30px;
		padding: 0 14px;
		margin-left: 10px;
		cursor: pointer;
		-webkit-transition: color 0.3s;
		transition: color 0.3s;
		border-radius: 4px;
		color: #1890ff;
		background: #fff;
		border: none;
	}

	#components-layout-demo-top-side-2 .header {
		padding: 0;
		background: #1890ff;

		.btn-con {
			display: inline-block;
		}

		.trigger-right {
			font-size: 14px;
			line-height: 30px;
			float: right;
			padding: 0 10px;
			margin-right: 10px;
			cursor: pointer;
			-webkit-transition: color 0.3s;
			transition: color 0.3s;
			border-radius: 4px;
			margin-top: 18px;
			background: #fff;
			color: #1890ff;
		}

		.changePassword {
			font-size: 14px;
			line-height: 30px;
			float: right;
			padding: 0 10px;
			margin-right: 10px;
			cursor: pointer;
			-webkit-transition: color 0.3s;
			transition: color 0.3s;
			border-radius: 4px;
			margin-top: 18px;
			color: #fff;
		}
	}

	.oneList {
		display: inline-block;
		margin: 0px;
		padding: 0px;
		background: #fff;
		width: 100%;
		margin-bottom: 6px;

		.oneListMenu {
			height: 64px;
			display: inline-block;
			width: 100px;
			line-height: 60px;
			border-bottom: 4px solid #fff;
			text-align: center;

			&:hover {
				color: #1890ff;
				border-bottom: 4px solid #1890ff;
			}

			&.selected {
				color: #1890ff;
				border-bottom: 4px solid #1890ff;
			}
		}
	}

	#components-layout-demo-top-side-2 .logo {
		height: 64px;
		line-height: 22px;
		background: #1890ff;
		padding: 10px 0px 0 0px;
		float: left;
		color: #EFEFEF;
		text-align: center;
		margin-right: 10px;
		margin-left: 10px;
		font-size: 20px;
		font-weight: bold;
	}

	#menutop2 .ant-menu-item-selected {
		border-bottom: none;
		background-color: #1890ff;
		color: white;
	}

	#menutop .ant-menu-item-selected,
	#menutop .ant-menu-item-active {
		background: #1890ff;

		/deep/.toplist {
			color: #fff;
		}
	}

	#menutop2 .ant-menu-sub {
		background-color: #ededed;
	}

	#menutop2 .ant-menu-item {
		margin: 0;
		padding: 0;
	}

	.toplist {
		// background-color: #F0EEEF;
		// padding: 0.3125rem;
		// border-radius: 5px;
		// padding-left: 0.9375rem;
		// padding-right: 0.9375rem;
	}

	.h2 {
		background: #f6f8f8;
		color: #000;
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		margin-bottom: 10px;
		font-weight: 600;

		.count {
			color: #1890ff;
		}
	}

	/deep/.ant-select-selection-selected-value {
		min-width: 200px;
	}

	/deep/.ant-select-selection__rendered {
		min-width: 200px;
	}

	.ant-form-item-control-wrapper {
		min-width: 200px;
	}

	.ant-form-item-label {
		width: 98px !important;
	}

	.trigger {
		font-size: 16px !important;
		color: #fff !important;
		font-weight: bold !important;
		line-height: 30px;
		height: 30px;
		padding: 0 14px;
		margin-left: 10px;
		cursor: pointer;
		-webkit-transition: color 0.3s;
		transition: color 0.3s;
		border-radius: 4px;

	}

	.content {
		width: 100%;
		overflow-x: hidden;
	}

	.ant-form-item-control-wrapper {
		flex: 1;
	}

	.ant-advanced-search-form .ant-form-item {
		.ant-form-item-label {
			width: 88px !important;
		}
	}

	.ant-form-item-label {
		width: 80px;
		text-overflow: ellipsis;
	}

	.ant-btn-primary {
		background-color: #40a9ff !important;
		border-color: #40a9ff !important;
	}
</style>
