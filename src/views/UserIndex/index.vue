<template>
	<a-layout id="components-layout-demo-top" class="layout">
		<div style="background-color: #1890ff;" class="topmenu">
			<a-layout-header>
				<div class="logo"><img src="../../assets/logo.png" />

				</div>
				<!-- <div class="hovermenu" @mouseover='menu()'>菜单
					<a-icon type="down" />
				</div> -->
				<a-menu theme="dark" mode="horizontal" :default-selected-keys="['2']">
					<a-menu-item @click="goHome">
						<a-icon type="home" />
					</a-menu-item>
					<a-menu-item @click="goBack">
						<a-icon type="rollback" />
					</a-menu-item>
					<a-menu-item @click="reload">
						<a-icon type="reload" />
					</a-menu-item>
					<a-menu-item @mouseover='menu()'>
						<span style="margin-right: 5px;">菜单</span>
						<a-icon type="menu" />
					</a-menu-item>
					<a-menu-item @click="logout">
						<a-icon type="logout" /><span class="menufont">退出登录</span></a-menu-item>
					<a-menu-item v-if="form.IsAdmin" @click="Managementbackstage()">
						<a-icon type="user" /><span class="menufont">管理后台</span></a-menu-item>
				</a-menu>
			</a-layout-header>
			<!-- <div class="xuanfu" v-if="menushow">
				caidan
			</div> -->
			<a-drawer width="100" height="100" placement="top" :closable="false" :visible="visible" v-if="visible" @close="onClose">
				<ul class="menulist" @click="visible=false" @mouseleave="onClose()">
					<li @click="zhidaolaoshidaishenpi()">
						<div class="menucontent">
							<div><i title="" style="color: white;background-color: #FE4365;border-radius: 50%;" class="iconfont icon-zhidaolaoshidaishenpi"></i></div><span>指导老师待审批</span>
						</div>
					</li>
					<li @click="zhidaolaoshiyishenpi()">
						<div class="menucontent">
							<div><i title="" style="color: white;background-color: hotpink;border-radius: 50%;" class="iconfont icon-zhidaolaoshiyishenpi"></i></div><span>指导老师已审批</span>
						</div>
					</li>
					<li @click="xueyuandaishenpi()">
						<div class="menucontent">
							<div><i title="" style="color: white;background-color: #FC9D9A;border-radius: 50%;" class="iconfont icon-xueyuandaishenpi"></i></div><span>学院待审批</span>
						</div>
					</li>
					<li @click="xueyuanyishenpi()">
						<div class="menucontent">
							<div><i title="" style="color: white;background-color: #F9CDAD;border-radius: 50%;" class="iconfont icon-xueyuanyishenpi"></i></div><span>学院已审批</span>
						</div>
					</li>
					<li @click="xuexiaodaishenpi()">
						<div class="menucontent">
							<div><i title="" style="color: white;background-color: #C8C8A9;border-radius: 50%;" class="iconfont icon-xuexiaodaishenpi"></i></div><span>学校待审批</span>
						</div>
					</li>
					<li @click="xuexiaoyishenpi()">
						<div class="menucontent">
							<div><i title="" style="color: white;background-color: #8ABEB2;border-radius: 50%;" class="iconfont icon-xuexiaoyishenpi"></i></div><span>学校已审批</span>
						</div>
					</li>
					<li @click="clubapplyrecord()">
						<div class="menucontent">
							<div><i title="" style="color: white;background-color: #83AF9B;border-radius: 50%;" class="iconfont icon-huodong1"></i></div><span>俱乐部申请记录</span>
						</div>
					</li>
					<li @click="activityapplyrecord()">
						<div class="menucontent">
							<div><i title="" style="color: white;background-color: #458994;border-radius: 50%;" class="iconfont icon-huodong"></i></div><span>活动申请记录</span>
						</div>
					</li>
					<!-- <li></li> -->
				</ul>
			</a-drawer>
		</div>
		<a-layout-content style="width: 100%;">
			<div :style="{  minHeight: '380px' }">
				<div class="information">
					<div class="c-header">
						<div class="c-l">
							<a-avatar :src="form.HeadImage?'http://api.jlb.ac.acxk.net'+form.HeadImage:avatar" />
							<span class="uptouxiang" @click="updatetouxiang"><i title="" style="color: #1890FF;font-weight: 600;" class="iconfont icon-shangchuantouxiang "></i></span>
						</div>
						<div class="c-c">
							<span class="c-c-t">
								{{ form.Name }}
								<a-icon v-if="form.Sex==2" style="color: deeppink;" type="woman" />
								<a-icon v-else style="color: #1890FF;" type="man" />
							</span>
							<span class="c-c-c" v-if="form.Type==1">
								学号：{{ form.UserNo }} | 班级：{{ form.ClassName }} | 届别：{{ form.Grade }} | 学院：{{ form.DepartName }}
							</span>
							<span v-else class="c-c-c">
								工号：{{ form.UserNo }} | 类型：教师 | 部门：{{ form.DepartName }}
							</span>
						</div>
						<div class="c-r">
						</div>
					</div>
				</div>
				<div class="c-content">
					<keep-alive>
						<router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
					</keep-alive>
					<router-view :key="$route.fullPath" v-if="!$route.meta.keepAlive"></router-view>
				</div>
			</div>
		</a-layout-content>
		<a-layout-footer style="text-align: center">
			Copyright 2019-2029 © 安财信科 <a style="color:#fff;" href="http://www.acthink.net/">ACThink.net</a>
		</a-layout-footer>
		<uploadHeadImg v-show="showModal" @closeFun="closeFun(data)"></uploadHeadImg>
	</a-layout>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		GetJoinClubList,
		GetNewsTypeListManage,
		GetAdminMenu,
		DoLoginOut,
		UserDoUpdateBase64Image,
		UserDoSetHeadImage,
		LoginOut
	} from '@/api/follow'
	import uploadHeadImg from './UploadHeadImg'
	import Cache from '@/utils/cache'
	export default {
		components: {
			uploadHeadImg
		},
		data() {
			return {
				menuList: [{
					title: '基础信息',
					path: '111',
					type: 'appstore',
					id: '9',
				}, {
					title: '测试信息',
					path: '111',
					type: 'appstore',
					id: '8',
				}],
				ClubList: [{
						Url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247156841,1768518733&fm=11&gp=0.jpg',
						ClubName: '街舞俱乐部',
						AddTime: '2020-02-09'
					},
					{
						Url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
						ClubName: '街舞俱乐部',
						AddTime: '2020-02-09'
					},
					{
						Url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
						ClubName: '街舞俱乐部',
						AddTime: '2020-02-09'
					},
					{
						Url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
						ClubName: '街舞俱乐部',
						AddTime: '2020-02-09'
					},
					{
						Url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
						ClubName: '街舞俱乐部',
						AddTime: '2020-02-09'
					},
				],
				avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
				approvalList: '',
				showModal: false,
				form: Cache.get('myInfo'),
				newsList: [],
				loadshow: false,
				menushow: false,
				visible: false
			}
		},
		created() {
			if (Cache.get('token')) {} else {
				this.$router.push({
					name: 'register'
				});
			}
			if (Cache.get('loginKey') == 1) {
				this.loadshow = true
				this.$router.go(0);
				Cache.remove('loginKey');
				this.loadshow = false
			}
			// if(Cache.get('routestate')==2){
			// 	this.$router.go(0);
			// 	Cache.remove('routestate');
			// }
		},
		mounted() {
			this._GetAdminMenu()
		},
		computed: {

		},
		methods: {
			async updatetouxiang() {
				// let data = {}
				// let res = await UserDoUpdateBase64Image(data)
				this.showModal=true
			},
			async _GetAdminMenu() {
				let OneMenu = []
				let TwoMenu = []
				let ThreeMenu = []
				let AdminMenuList = []
				let res = await GetAdminMenu()
				let list = res.data.data
				for (let i = 0; i < list.length; i++) {
					OneMenu.push(list[i])
					for (let m = 0; m < list[i].GroupData.length; m++) {
						TwoMenu.push(list[i].GroupData[m])
						for (let n = 0; n < list[i].GroupData[m].FunctionGroupData.length; n++) {
							ThreeMenu.push(list[i].GroupData[m].FunctionGroupData[n])
							for (let p = 0; p < list[i].GroupData[m].FunctionGroupData[n].FunctionData.length; p++) {
								AdminMenuList.push(list[i].GroupData[m].FunctionGroupData[n].FunctionData[p])
							}
						}
					}
				}
				Cache.set('OneMenu', OneMenu)
				Cache.set('TwoMenu', TwoMenu)
				Cache.set('ThreeMenu', ThreeMenu)
				Cache.set('AdminMenuList', AdminMenuList)
			},
			goHome() {
				this.$router.push('/index');
			},
			clubapplyrecord() {
				this.$router.push({
					name: 'UserApplyClubRecord'
				});
			},
			activityapplyrecord() {
				this.$router.push({
					name: 'UserApplyActivityRecord'
				});
			},
			zhidaolaoshidaishenpi() {
				this.$router.push({
					name: 'UserTeacherNoApply'
				});
			},
			zhidaolaoshiyishenpi() {
				this.$router.push({
					name: 'UserTeacherOkApply'
				});
			},
			xueyuandaishenpi() {
				this.$router.push({
					name: 'UserCollegeNoApply'
				});
			},
			xueyuanyishenpi() {
				this.$router.push({
					name: 'UserCollegeOkApply'
				});
			},
			xuexiaoyishenpi() {
				this.$router.push({
					name: 'UserSchoolOkApply'
				});
			},
			xuexiaodaishenpi() {
				this.$router.push({
					name: 'UserSchoolNoApply'
				});
			},
			timeonClose() {
				setTimeout(this.onClose(), 3000);
			},
			onClose() {
				this.visible = false;
			},
			menu() {
				this.visible = true
			},
			openmenu() {
				this.visible = true
			},
			closemenu() {
				this.menushow = false
			},
			Managementbackstage() {
				this.$router.push({
					name: 'Home',
				})
			},
			async logout() {
				let res = await LoginOut();
				Cache.remove('token');
				Cache.remove('SYS_TOKEN');
				Cache.remove('listMenus');
				Cache.remove('DealerID');
				Cache.remove('Type');
				Cache.remove('info');
				window.location.href = "http://i.aufe.edu.cn/portal_main/toPortalPage"
			},
			async getList() {
				let data = {}
				let res = await GetNewsTypeListManage(data)
				this.newsList = res.data.data
			},
			closeFun(index) {
					this.form=Cache.get('myInfo')
				// if (index === 1) {
					this.showModal=false
					// this.GetJoinClubList()
				// }
				
			},
			// joinclub() {
			// 	this.showModal = true
			// },
			goBack() {
				this.$router.back(-1);
				// this.reload()
				// this.$router.go(-1)
			},
			reload() {
				// this.$router.go(0)
				// this.isRouterAlive = false;
				// this.$nextTick(function() {
				// 	this.isRouterAlive = true;
				// });
				this.$router.go(0)
			},
		}
	}
</script>

<style lang="less" scoped>
	#components-layout-demo-top .logo {
		width: 220px;
		height: 64px;
		line-height: 42px;
		background: #1890ff;
		padding-top: 12px;
		float: left;
		color: #fff;
		text-align: center;
	}

	.ant-layout-content {
		margin-bottom: 50px;
	}

	#components-layout-demo-top {
		width: 100%;
		margin: 0 auto;
	}

	#components-layout-demo-top .logo img {
		width: 300px;
	}

	.ant-layout-header {
		background-color: #1890FF;
		// padding: 0px;
		margin: 0 auto;
		width: 70%;
		padding: 0px;
		min-width: 1200px;
		border-bottom: 50px solid transparent;

	}

	.ant-menu-dark {
		background-color: #1890FF;
		// line-height: 45px;
		float: right;
	}

	/deep/.ant-menu-root {
		line-height: 45px;
	}

	.spin-content {
		border: 1px solid #91d5ff;
		background-color: #e6f7ff;
		padding: 30px;
	}

	.ant-menu-dark.ant-menu-horizontal>.ant-menu-item {
		background-color: #f6f6f6;
		color: black;
		line-height: 30px;
		height: 30px;
		margin-left: 20px;
		color: #1890FF;
	}

	.ant-menu.ant-menu-dark .ant-menu-item-selected {
		background-color: white;
		color: #1890FF;

		.anticon {
			color: #1890FF;
		}
	}

	.ant-menu.ant-menu-item:hover {
		background-color: #72B3F3;
		color: white;
	}

	.ant-menu.ant-menu-dark {
		line-height: none;
	}

	.ant-layout-header ul {
		line-height: 47.5px;
	}

	.ant-menu-item {
		border-radius: 5px;
		color: #1890FF;

		/deep/.anticon {
			margin-right: 0px;
		}
	}

	.c-header {
		width: 100%;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		// padding: 0 24px;
		height: 8rem;
		width: 70%;
		margin-left: 15%;
	}

	.ant-avatar {
		width: 4rem;
		height: 4rem;
	}

	.c-c-t {
		font-size: 20px;
		color: white;
		font-weight: 600;
	}

	.c-l {
		position: relative;
		width: 70px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.c-c {
		width: 70%;
		// height: 64px;
		margin-left: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.anticon:hover {
		cursor: pointer;
	}

	.c-r {
		width: 25%;
		color: #1890FF;
		display: flex;
		justify-content: flex-end;
	}

	.c-r-b {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.anticon {
		line-height: 50px;
		margin-right: 5px;
		margin-right: 0px;
		color: #1890ff;
	}

	.c-content {
		width: 70%;
		margin: 0 auto;
		min-height: 596px;
		min-width: 1200px;
	}

	.cimg .ant-avatar {
		width: 3.125rem;
		height: 3.125rem;
		margin-left: 20px;
	}

	.cimg {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.cdetail {
		margin-left: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}


	.content-list {

		height: 5rem;
		width: 31.8%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		background-color: #F0EEEF;
		border-radius: 5px;
		// margin-left: 1.3%;
		margin-top: 20px;
		margin-left: 20px;
	}

	/deep/.ant-card-body {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: start;
		flex-wrap: wrap;
		// padding-bottom: 40px;
		padding-left: 0px;
	}

	.cd-name {
		font-size: 16px;
		font-weight: 600;
	}

	/deep/.ant-card-head-title {
		// padding: 20px;
		font-size: 20px;
	}

	.c-c-c {
		line-height: 35px;
	}

	.ant-layout-footer {
		width: 100%;
		margin-top: 40px;
		background-color: #1890ff;
		color: white;
		// position: absolute;
		// bottom: 0px;
		// z-index: 999;
	}

	.information {
		color: white;
		width: 100%;
		background-image: url(../../assets/1126.jpg);
		background-size: 100% 100%;
		margin-top: 64px;
		min-width: 1200px;
	}

	.joinclub {
		color: #1890ff;
		border: 1px solid #1890ff;
		padding: 5px;
	}

	.joinclub:hover {
		cursor: pointer;
	}

	.topbutton {
		margin-top: 10px;
	}

	.xuanfu {
		width: 30%;
		height: 80px;
		background-color: red;
		position: fixed;
		top: 70px;
		right: 290px;
		z-index: 1999;
	}

	/deep/.ant-drawer-wrapper-body {
		overflow: hidden;
	}

	/deep/.ant-drawer-body {
		overflow: hidden;
		padding: 5px;
	}

	.ant-drawer {
		/deep/.ant-drawer-content {
			position: fixed;
			top: 69px;
			width: 50%;
			min-width: 820px;
			height: 90px;
			right: 15%;
			overflow: hidden;
			border-radius: 5px;
			box-shadow: 2px 2px 2px 2px whitesmoke;
		}

		/deep/.ant-drawer-open {
			opacity: 0;

			/deep/.ant-drawer-mask {
				opacity: 0;
			}
		}
	}

	.menulist {
		height: 90px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		overflow: hidden;
		padding: 0px;
	}

	.menulist li {
		text-align: center;
		list-style: none;
	}

	.menulist li:hover {
		color: #1890FF;
		background-color: ghostwhite;
	}

	.menucontent {
		width: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.menulist li i {
		font-size: 40px;
	}

	.hovermenu {
		float: left;
		margin-left: 100px;
		text-align: center;
		color: white;
		font-size: 16px;
	}

	.hovermenu:hover {
		cursor: pointer;
	}

	.anticon {
		line-height: 30px;
	}

	.menufont {
		margin-left: 5px;
	}

	.topmenu {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 9999;
	}

	.uptouxiang {
		width: 26px;
		height: 26px;
		position: absolute;
		right: -10px;
		top: 28px;
		background-color: white;
		border-radius: 50%;

		i {
			font-size: 20px;
			margin-left: 2.5px;
		}
	}

	.uptouxiang:hover {
		cursor: pointer;

	}
	/deep/.ant-select-selection-selected-value{
	min-width: 200px;	
	}
</style>
