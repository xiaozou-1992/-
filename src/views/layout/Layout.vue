<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout>
      <a-layout-header class="header">
        <div class="logo">
          <img src="../../assets/logo.png" />
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
            <a-menu style="width: 200px" :default-selected-keys="[0]">
              <a-menu-item @click="menu(item.id,item.path)" v-for="(item,index) in menuList" :key="index">
                <a-icon :type="item.type" />
                <span>{{ item.title }}</span>
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
		getTokenMarketInner,
		getTokenToUser,
		getCheckStore,
		doGetMenu,
		LoginOut
	} from '@/api/follow'
	export default {
		data() {
			return {
				keys: 0,
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
					}
				],
				menuListSub: [],
				list: []
			}
		},
		async created() {
			if (Cache.get('token')) {
				this.myInfo = Cache.get('myInfo')
				// this._getTokenToUser()
			}
			// let currentName = this.$router.history.current.name
			// let current1
			// for (let i = 0; i < this.menuList.length; i++) {
			// 	for (let m = 0; m < this.menuList[i].children.length; m++) {
			// 		for (let n = 0; n < this.menuList[i].children[m].children.length; n++) {
			// 			if (this.menuList[i].children[m].children[n].path == currentName) {
			// 				this.keys = i
			// 				this.showSubMenu = i
			// 			}
			// 		}
			// 	}
			// }
		},
		methods: {
			backhome() {
				this.$router.push('/index')
			},
			checkMenu(index) {
				this.showSubMenu = index
				this.keys = index
			},
			menuFunction() {
				let arr = []
				arr = this.menuList
				let obj = arr.filter(item => item.path == this.$route.name)
				this.showKey = obj[0].key
			},
			menu(type, s) {
				this.$router.push({
					name: s,
					query: {
						type: type
					}
				})
				this.keys = [type]
				this.isShow = parseInt(type)
			},
			goBack() {
				this.$router.back(-1)
				// this.reload()
				// this.$router.go(-1)
			},
			reload() {
				// this.$router.go(0)
				this.isRouterAlive = false
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			},
			async logout() {
				let res = await LoginOut()
				Cache.remove('token')
				Cache.remove('SYS_TOKEN')
				Cache.remove('listMenus')
				Cache.remove('DealerID')
				Cache.remove('Type')
				Cache.remove('info')
				// this.$router.push({
				// 	name: 'register'
				// });
				window.location.href = 'http://i.aufe.edu.cn/portal_main/toPortalPage'
			},
			async _getTokenToUser() {
				let res = await getTokenToUser()
				this.detail = res.data.data
				Cache.set('info', res.data.data)
				this.info = Cache.get('info')
				// Cache.set('DealerID', res.data.data.DealerID)
				// Cache.set('DealerName', res.data.data.DealerName)
				Cache.set('Type', 3)
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
		color: #fff;
		text-align: center;
		margin-right: 30px;
		margin-left: 10px;
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
		width: 95px !important;
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
	.ant-advanced-search-form .ant-form-item{
		.ant-form-item-label{
			width: 88px !important;
		}
	}
	.ant-form-item-label{
		width: 80px;
		text-overflow: ellipsis;
	}

	.ant-btn-primary {
		background-color: #40a9ff !important;
		border-color: #40a9ff !important;
	}
</style>
