<template>
	<a-layout id="components-layout-demo-top" class="layout"  v-loading="loading">
		<a-layout-content style="width: 100%;">
			<div :style="{  minHeight: '380px' }">
				<div class="c-content">
					<div class="content-left">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>
									<i class="iconfont icon-suoyouhuodong" style="color: white;background-color: #458994;border-radius: 50%;padding: 3px;margin-right: 15px;"></i>
									<span class="cradtitle">所有活动</span>
								</span>
								<!-- <a-button type="primary" style="margin-left: 10px;float: right;" slot="extra" @click="moreallactivity">
									更多
								</a-button> -->
								
							</div>
							<div class="text item">
								<div class="content-list" v-for="(item,index) in AllActivityList" :key="index">
									<div class="cimg">
									<a-avatar :src="requestUrl+item.Ico.split('|')[1]" />
									<span class="menbernum" title="成员人数" ><i class="iconfont icon-renshu" ><span style="color: deeppink;font-size: 14px!important;">{{item.MemberNum}}</span></i></span>
									</div>
									<div class="cdetail">
										<span class="cd-name" :title="item.Title">{{ item.Title }}</span>
										<span class="cd-time" :title="item.ClubName">所属：{{ item.ClubName }}</span>
										<span class="cd-time">开始：{{ item.StartTime }}</span>
										<span class="cd-time">结束：{{ item.EndTime }}</span>
										<span class="cd-time">
											<a-tag color="blue" @click="seedetail(item)">
												查看详情
											</a-tag>
											<template v-if="new Date().getTime()<new Date(item.EndTime.replace(/-/g,'/')).getTime()">
												<a-tag color="blue" v-if="item.State!=5" @click="AllJoinActivity(item)">
													加入活动
												</a-tag>
											</template>
											<!-- <a-tag color="blue" @click="ActivityApplyList(item)">
												申请人 </a-tag>
											<a-tag color="blue" @click="UserActivitySignRecord(item)">
												签到记录
											</a-tag> -->
											<!-- <a-tag color="blue" style="margin-top: 5px;" @click="UserCreditApply(item)">
												积分项申请
											</a-tag> -->
										</span>
									</div>
								</div>
								<div class="content-list" v-if="AllActivityList.length<=0" style="width: 100%;text-align: center;font-size: 16px;background-color: white;display: block;">暂无活动</div>
							</div>
						</el-card>
						
					</div>
				</div>
			</div>
		</a-layout-content>
		<addActivity v-if="showModal" @closeFun="closeFun(1)"></addActivity>
		<detailActivity v-if="detailshowModal" :text="text" @closeFun="closeFun(1)"></detailActivity>
		<applyActivity  :text="text" :time="time" v-show="applyshowModal" @closeFun="closeFun(1)"></applyActivity>
	</a-layout>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		GetActivityPageList,
		GetJoinClubList
	} from '@/api/follow'
	import addActivity from './addActivity.vue'
	import detailActivity from './detailActivity.vue'
	import applyActivity from '@/components/ApplyActivity'
	import Cache from '@/utils/cache'
	export default {
		components: {
			addActivity,
			detailActivity,
			applyActivity
		},
		data() {
			return {
				requestUrl:this.global.requestUrl,
				callback(key) {
				},
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
				ClubList: [],
				MClubList: [],
				AllActivityList: [],
				realdyActivityList: [],
				okActivityList:[],
				avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=757545797,2214471709&fm=11&gp=0.jpg',
				form: {
					UserName: '猪猪真的很好看',
					No: '174040312',
					Grade: '财务审计系 19财管2'
				},
				approvalList: '',
				showModal: false,
				loading:false,
				detailshowModal:false,
				applyshowModal:false,
				text:{},
				time:'',
				list:[]
			}
		},
		created() {
			this.getList()
		},
		computed: {

		},
		methods: {
			seedetail(t){
					this.text = t
					this.detailshowModal = !this.detailshowModal;
			},
			AllJoinActivity(t){
				this.text=t
				this.time=new Date()
				this.applyshowModal = !this.applyshowModal;
			},
			morejoinclub(){
				this.$router.push({
					name: 'MoreJoinClub',
				})
			},
			UserActivitySign(text) {
				this.$router.push({
					name: 'UserActivitySign',
					query: {
						ID: text.ID,
						ChairmanNo: text.ChargeUserNo
					}
				})
			},
			ActivityApplyList(text) {
				this.$router.push({
					name: 'UserActivityApplyList',
					query: {
						ID: text.ID
					}
				})
			},
			JoinActivity(text) {
				this.$router.push({
					name: 'UserJoinActivity',
					query: {
						ID: text.ID,
						ChairmanNo: text.ChargeUserNo
					}
				})
			},
			activitymembermanage(text) {
				this.$router.push({
					name: 'ActivityMembermanage',
					query: {
						ID: text.ID,
						ChairmanNo: text.ChargeUserNo,
						ClubID: text.ClubID
					}
				})
			},
			membermanage(text) {
				this.$router.push({
					name: 'Membermanage',
					query: {
						ID: text.ID,
						ChairmanNo: text.ChairmanNo
					}
				})
			},
			applicant(text) {
				this.$router.push({
					name: 'ApplyList',
					query: {
						ID: text.ID
					}
				})
			},
			activitymanage(text) {
				this.$router.push({
					name: 'UserActivitymanage',
					query: {
						ID: text.ID
					}
				})
			},
			async getList() {
				let data = {}
				this.loading=true
				let res1 = await GetJoinClubList(data)
				this.ClubList=res1.data.code==0?res1.data.data:[];
				let activeIDs = []
				for(let i=0;i<this.ClubList.length;i++){
					activeIDs.push(this.ClubList[i].ID)
				}
				let activeData={}
				console.log(activeIDs)
				activeData.clubID = activeIDs.join(',')
				data=activeData
				let res9 = await GetActivityPageList(data)
				this.AllActivityList = res9.data.code==0?res9.data.data:[]
				this.loading=false
			},
			closeFun(index) {
				this.showModal = false
				this.detailshowModal=false
				this.applyshowModal=false
				if (index === 1) {
					this.showModal != this.showModal
					this.getList()
				}
			},
			joinclub() {
				this.$router.push({
					name: 'ChooseClub'
				})
			},
			DoAddActivity() {
				this.showModal = !this.showModal
			}
		}
	}
</script>

<style lang="less" scoped>
	#components-layout-demo-top .logo {
		width: 200px;
		height: 64px;
		line-height: 22px;
		background: rgba(255, 255, 255, 0.92);
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
	}

	#components-layout-demo-top .logo img {
		width: 200px;
	}

	.ant-layout-header {
		background-color: white;
		// padding: 0px;
		margin-left: 15%;
		width: 100%;
		padding: 0px;
	}

	.ant-menu-dark {
		background-color: white;
		// line-height: 45px;
		float: right;
	}

	/deep/.ant-menu-root {
		line-height: 45px;
	}

	.ant-menu-dark.ant-menu-horizontal>.ant-menu-item {
		background-color: #F0EEEF;
		color: black;
		line-height: 30px;
		height: 30px;
		width: 96px;
		margin-left: 20px;
	}

	.ant-menu.ant-menu-dark .ant-menu-item-selected {
		background-color: #1890ff;
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
	}

	.c-header {
		width: 100%;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		// padding: 0 24px;
		height: 8rem;
		width: 100%;
		margin-left: 15%;
	}

	.ant-avatar {
		width: 4rem;
		height: 4rem;
	}

	.c-c-t {
		font-size: 20px;
		color: #1890ff;
		font-weight: 600;
	}

	.c-l {
		width: 5%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.c-c {
		width: 100%;
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
		line-height: 45px;
		display: flex;
		justify-content: flex-end;
	}

	.anticon {
		line-height: 50px;
		margin-right: 5px;
	}

	.c-content {
		margin-top: 30px;
		// width: 70%;
		// margin-left: 15%;
		min-height: 100%;
	}

	.cimg .ant-avatar {
		width: 4.3rem;
		height: 4.3rem;
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
		position: relative;
		height: 7.2rem;
		width: 46.8%;
		min-width: 297px;
		display: flex;
		// flex: 1 1 31.2%;
		flex-direction: row;
		justify-content: flex-start;
		background-color: #e5f3ff;
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
		padding-bottom: 40px;
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
		margin-top: 40px;
		background-color: #1890ff;
		color: white;
		margin-bottom: -50px;
	}

	.information {
		color: white;
		width: 100%;
		background-image: url(https://i.alipayobjects.com/e/201309/17KjauGTqn.jpg);
		background-size: 100% 100%;
	}

	.joinclub {
		color: #1890ff;
		border: 1px solid #1890ff;
		padding: 5px;
	}

	.joinclub:hover {
		cursor: pointer;
	}

	.content-left {
		width: 100%;
		float: left;
	}

	.content-right {
		float: right;
		width: 25.5%;
		background-color: white;
		height: 475px;
	}

	.cd-time {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.joinactivity {
		position: absolute;
		right: 0px;
		top: 5px;

	}

	.ant-tag:hover {
		cursor: pointer;
	}
	.ant-tabs-tabpane{
		display: flex;
		flex-direction: row;
		justify-content: start;
		flex-wrap: wrap;
		padding-bottom: 40px;
		padding-left: 0px;
		width: 100%;
	}
	/deep/.el-card__body{
		.item{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: start;
			flex-wrap: wrap;
		}
		padding-left: 0;
	}
	.el-card{
		min-height: 263px;
	}
	.menbernum{
		width: 100%;
		height: 26px;
		line-height: 26px;
		text-align: center;
		position: absolute;
		bottom: 0px;
		i{
			font-size: 16px;
		}
	}
	.cimg .ant-avatar {
		width: 4.3rem;
		height: 4.3rem;
		margin-left: 10px;
	}
	
	.cimg {
		width: 20%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		position: relative;
	}
	.cdetail {
		width: 75%;
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.cradtitle{
		font-size: 20px;
	}
</style>
