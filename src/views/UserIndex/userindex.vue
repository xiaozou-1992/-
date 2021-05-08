<template>
	<a-layout id="components-layout-demo-top" class="layout" v-loading="loading">
		<a-layout-content style="width: 100%;">
			<div :style="{  minHeight: '380px' }">
				<div class="c-content">
					<div class="content-left">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>
									<i class="iconfont icon-suoyouhuodong"
										style="color: white;background-color: #458994;border-radius: 50%;padding: 3px;margin-right: 15px;"></i>
									<span class="cradtitle">所有活动</span>
								</span>
								<a-button type="primary" style="margin-left: 10px;float: right;" slot="extra"
									@click="moreallactivity">
									更多
								</a-button>

							</div>
							<div class="text item">
								<div class="content-list" v-for="(item,index) in AllActivityList" :key="index"
									v-if="index<4">
									<div class="cimg">
										<a-avatar :src="item.Ico?requestUrl+item.Ico.split('|')[1]:''" />
										<span class="menbernum" title="成员人数"><i class="iconfont icon-renshu"><span
													style="color: deeppink;font-size: 14px!important;">{{item.MemberNum}}</span></i></span>
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
											<template
												v-if="new Date().getTime()<new Date(item.EndTime.replace(/-/g,'/')).getTime()">
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
												学分项申请
											</a-tag> -->
										</span>
									</div>
								</div>
								<div class="content-list" v-if="AllActivityList.length<=0"
									style="width: 100%;text-align: center;font-size: 16px;background-color: white;display: block;">
									暂无活动</div>
							</div>
						</el-card>

						<el-card class="box-card" style="margin-top: 20px;">
							<div slot="header" class="clearfix">
								<span>
									<span></span>
									<span class="cradtitle"><i class="iconfont icon-huodong1"
											style="color: white;background-color: #458994;border-radius: 50%;padding: 3px;margin-right: 15px;"></i>已加入的俱乐部</span>
								</span>
								<a-button style="float: right;" type="primary" slot="extra" @click="morejoinclub">
									更多
								</a-button>
								<a-button style="float: right; margin-right: 10px;" type="primary" slot="extra"
									@click="joinclub">
									加入俱乐部
								</a-button>
							</div>
							<div class="text item">
								<div class="content-list" v-for="(item,index) in ClubList" :key="index" v-if="index<4">
									<div class="cimg">
										<a-avatar :src="item.Ico?item.Ico:''" />
									</div>
									<div class="cdetail">
										<span class="cd-name" :title="item.Name"> {{ item.Name }} </span>
										<span class="cd-time" :title="item.PorjectName">项目：{{ item.PorjectName }}</span>
										<span class="cd-time" :title="item.TypeName">类型：{{ item.TypeName }}</span>
										<span class="cd-time" :title="item.DpeartName">学院：{{ item.DpeartName }}</span>
										<span class="cd-time">
											<a-tag color="blue" @click="JoinActivity(item)">加入活动</a-tag>
											<a-tag color="blue" @click="Notice(item)">
												公告 </a-tag>
											<a-tag color="pink" @click="ExitClub(item)">退出</a-tag>
										</span>
									</div>
								</div>
								<div class="content-list" v-if="ClubList.length<=0"
									style="width: 100%;text-align: center;font-size: 16px;background-color: white;display: block;">
									暂无已加入的俱乐部</div>
							</div>
						</el-card>
						<el-card class="box-card" style="margin-top: 20px;" v-if="MClubList.length>0">
							<div slot="header" class="clearfix">
								<span>
									<i class="iconfont icon-julebu1"
										style="color: white;background-color: #458994;border-radius: 50%;padding: 3px;margin-right: 15px;"></i>
									<span class="cradtitle">我管理的俱乐部</span>
								</span>
								<a-button type="primary" style="margin-left: 10px;float: right;" slot="extra"
									@click="moremanageclub">
									更多
								</a-button>

							</div>
							<div class="text item">
								<div class="content-list" v-for="(item,index) in MClubList" :key="index">
									<div class="cimg">
										<a-avatar :src="item.Ico==null?'':requestUrl+item.Ico" />
									</div>
									<div class="cdetail">
										<span class="cd-name" :title="item.Name"> {{ item.Name }} </span>
										<span class="cd-time" :title="item.PorjectName">项目：{{ item.PorjectName }}</span>
										<span class="cd-time" :title="item.TypeName">类型：{{ item.TypeName }}</span>
										<span class="cd-time" :title="item.DpeartName">学院：{{ item.DpeartName }}</span>
										<span class="cd-time">
											<a-tag color="blue" @click="membermanage(item)">
												成员管理
											</a-tag>
											<a-tag color="blue" @click="applicant(item)">
												申请人
											</a-tag>
											<a-tag color="blue" @click="activitymanage(item)">
												活动管理
											</a-tag>
											<a-tag color="blue" @click="Notice(item)">
												公告 </a-tag>
										</span>
									</div>
								</div>
								<div class="content-list" v-if="MClubList.length<=0"
									style="width: 100%;text-align: center;font-size: 16px;background-color: white;display: block;">
									暂无我管理的俱乐部</div>
							</div>
						</el-card>
						<el-card class="box-card" style="margin-top: 20px;">
							<div slot="header" class="clearfix">
								<span>
									<i class="iconfont icon-huodong"
										style="color: white;background-color: #458994;border-radius: 50%;padding: 3px;margin-right: 15px;"></i>
									<span class="cradtitle">我参加的活动</span>
								</span>
								<a-button type="primary" style="margin-left: 10px;float: right;" slot="extra"
									@click="morejoinactivity">
									更多
								</a-button>

							</div>
							<div class="text item">
								<div class="content-list" v-for="(item,index) in MJActivityList" :key="index"
									v-if="index<4">
									<div class="cimg">
										<a-avatar :src="item.Ico?requestUrl+item.Ico.split('|')[1]:''" />
										<span class="menbernum" title="成员人数"><i class="iconfont icon-renshu"><span
													style="color: deeppink;font-size: 14px!important;">{{item.MemberNum}}</span></i></span>
									</div>
									<div class="cdetail">
										<span class="cd-name" :title="item.Title">{{ item.Title }}</span>
										<span class="cd-time" :title="item.ClubName">所属：{{ item.ClubName }}</span>
										<span class="cd-time">开始：{{ item.StartTime }}</span>
										<span class="cd-time">结束：{{ item.EndTime }}</span>
										<span class="cd-time">
											<!-- <a-tag color="blue" @click="activitymembermanage(item)">
												成员管理
											</a-tag>
											<a-tag color="blue" @click="ActivityApplyList(item)">
												申请人 </a-tag> -->
											<a-tag color="blue" @click="AddFile(item)">
												附件 </a-tag>
											<a-tag color="blue" @click="UserActivitySignRecord(item)">
												签到记录
											</a-tag>
											<a-tag color="blue" @click="seedetail(item)">
												查看详情
											</a-tag>
											
											<!-- <a-tag color="blue" style="margin-top: 5px;" @click="UserCreditApply(item)">
												学分项申请
											</a-tag> -->
										</span>
									</div>
								</div>
								<div class="content-list" v-if="MJActivityList.length<=0"
									style="width: 100%;text-align: center;font-size: 16px;background-color: white;display: block;">
									暂无我参加的活动</div>
							</div>
						</el-card>

						<el-card class="box-card" style="margin-top: 20px;" v-if="MActivityList.length>0">
							<div slot="header" class="clearfix">
								<span>
									<i class="iconfont icon-shezhi"
										style="color: white;background-color: #458994;border-radius: 50%;padding: 3px;margin-right: 15px;"></i>
									<span class="cradtitle">我管理的活动</span>
								</span>
								<a-button type="primary" style="margin-left: 10px;float: right;" slot="extra"
									@click="moremanageactivity">
									更多
								</a-button>

							</div>
							<div class="text item">
								<div class="content-list" v-for="(item,index) in MActivityList" :key="index"
									v-if="index<4">
									<div class="cimg">
										<a-avatar :src="item.Ico?requestUrl+item.Ico.split('|')[1]:''" />
										<span title="成员人数" class="menbernum"><i class="iconfont icon-renshu"><span
													style="color: deeppink;font-size: 14px!important;">{{item.MemberNum}}</span></i></span>
									</div>
									<div class="cdetail">
										<span class="cd-name" :title="item.Title">{{ item.Title }}</span>
										<span class="cd-time" :title="item.ClubName">所属：{{ item.ClubName }}</span>
										<span class="cd-time">开始：{{ item.StartTime }}</span>
										<span class="cd-time">结束：{{ item.EndTime }}</span>
										<span class="cd-time">
											<a-tag color="blue" @click="activitymembermanage(item)">
												成员管理
											</a-tag>
											<a-tag color="blue" @click="ActivityApplyList(item)">
												申请人 </a-tag>
											<a-tag color="blue" @click="UserActivitySign(item)">
												签到管理
											</a-tag>
											<a-tag color="blue" @click="seedetail(item)">
												查看详情
											</a-tag>
										</span>
									</div>
								</div>
								<div class="content-list" v-if="MActivityList.length<=0"
									style="width: 100%;text-align: center;font-size: 16px;background-color: white;display: block;">
									暂无我管理的活动</div>
							</div>
						</el-card>
					</div>
					<div class="content-right">
						<!-- <div style="text-align: center;font-size: 20px;margin-top: 10px;">俱乐部新闻</div>
						<ul v-for="item in newsList">
							<li class="newsli">
								{{ item.Title }}
							</li>
						</ul> -->
						<div class="sportsblock">
							<div style="height: 253px;">
								<div class="step">
									<div>
										<a-progress :stroke-color="{'0%': '#1691E2','100%': '#79C1F2', }"
											:strokeWidth="10" type="dashboard"
											:percent="Sex == 1 ?  Math.round(((MonthNum * 0.79) / 1000/150).toFixed(2)*100) :  Math.round(((MonthNum * 0.74) / 1000/130).toFixed(2)*100)" />
										<a-tag @click="historyisshow()" class="history" color="orange">
											{{ historyshow?'隐藏历史数据':'查看历史数据' }}
										</a-tag>
									</div>
									<div style="font-size: 16px;font-weight: 600;">完成度</div>
									<div>{{ nowdate }}</div>
								</div>
								<div>
									<div class="stepdetail">
										<div class="stepname">步数：
											<a-statistic suffix="步" :value="SportsList.Num"
												style="margin-right: 50px" />
										</div>
										<div class="stepname">公里：
											<a-statistic suffix="KM" valueStyle="color:red" :precision="2"
												:value="Sex == 1 ? ((SportsList.Num * 0.79) / 1000).toFixed(2) : ((SportsList.Num * 0.74) / 1000).toFixed(2)" />
										</div>
									</div>
								</div>
							</div>
							<div style="height: 283px;overflow: auto;overflow-x: hidden;border-top: 20px solid #F0EEEF;padding: 10px;border-radius: 4px;"
								v-if="historyshow">
								<div
									style="color: black;font-size: 16px;text-align: center;margin: 15px;color: #1691E2;">
									历史运动数据</div>
								<div v-for="item in historysports">
									<div
										style="display: flex;flex-direction: row;justify-content: space-between;border-bottom: 1px  dashed gray;overflow-x: hidden;">
										<span style="width: 33%;">步数：<span
												style="font-size: 16px;font-weight: 600;color: #1890FF;">{{item.Num}}</span></span>
										<span style="width: 33%;">公里：<span
												style="font-size: 16px;font-weight: 600;color: red;">{{ Sex == 1 ? ((item.Num * 0.79) / 1000).toFixed(2) : ((item.Num * 0.74) / 1000).toFixed(2) }}</span></span>
										<span style="width: 33%;color: #1890FF;">{{item.Data}}</span>
									</div>
								</div>
								<div v-if="historysports.length<=0" style="text-align: center;font-size: 16px;">暂无历史数据
								</div>
							</div>
						</div>

						<div class="menusblock">
							<!-- <a-tag color="orange" @click='UserCreditApply()'>
								积分项申请
							</a-tag> -->
							<div class="nowscore">
								<div style="font-size: 20px;margin: 15px;">我的积分</div>
								<div style="font-size: 24px;margin: 15px;font-weight: 600;margin: 0 auto;">
									<div class="ciclecore">
										<div id="app">

											<div class="card">
												<!--  <div class="circle"></div>
											   <div class="circle"></div>
											   <div class="circle"></div>
											   <div class="circle"></div> -->
												<svg viewBox="0 0 4000 350" class="wave wave--back">
													<path :d="d3" fill-opacity="0.3" />
												</svg>
												<svg viewBox="0 0 4000 350" class="wave wave--middle">
													<path :d="d2" fill-opacity="0.5" />
												</svg>
												<svg viewBox="0 0 4000 350" class="wave wave--front">
													<path :d="d1" />
												</svg>
												<span style="z-index: 9999;"> {{score.toFixed(2)}}</span>
												<!-- <svg>
											<text>{{score.toFixed(2)}}</text>
											</svg> -->
											</div>
										</div>
									</div>
								</div>
								<div style="margin-top: 15px;">
									<a-tag color="orange" @click='UserCreditApply()'>
										积分申请记录
									</a-tag>
									<a-tag color="orange" @click='UserScoreRecord()'>
										积分
									</a-tag>
									<a-tag color="orange" @click='morejoinactivity()'>
										参加活动记录
									</a-tag>
								</div>
							</div>
						</div>
						<div class="clubnews">
							<div style="text-align: center;font-size: 20px;margin-top: 10px;">新闻通告</div>
							<div style="margin-bottom: 5px;width: 100%;overflow:hidden;padding:0 10px;">
								<a-tag color="blue" style="float: right;" @click='moreNews()'>更多</a-tag>
							</div>
							<ul v-for="(item,index) in newsList" v-if="index<10">
								<li class="newsli" @click="newsdetail(item)">
									<span class="newslititle">{{ item.Title }}</span>
									<span
										style="width: 25%;float: right;color: #595959;min-width: 75px;font-size: 12px;">{{item.AddTime.slice(0,11)}}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</a-layout-content>
		<addActivity v-if="showModal" @closeFun="closeFun(1)"></addActivity>
		<detailActivity v-if="detailshowModal" :text="text" @closeFun="closeFun(1)"></detailActivity>
		<applyActivity :text="text" :time="time" v-show="applyshowModal" @closeFun="closeFun(1)"></applyActivity>
	</a-layout>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import moment from 'moment'
	import {
		GetJoinClubList,
		GetUserManagClubList,
		GetManageActivityPageList,
		DoGetTeacherExamPageList,
		DoGetTeacherAlreadyExamPageList,
		UserDoGetNewsPageList,
		DoGetSportsList,
		GetJoinActivityPageList,
		UserDoGetScoreList,
		DoOutClub,
		GetActivityPageList
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
				callback(key) {},
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
				name: 'www.ele.me',
				d1: '',
				d2: '',
				d3: '',
				ClubList: [],
				MClubList: [],
				MActivityList: [],
				realdyActivityList: [],
				okActivityList: [],
				MJActivityList: [],
				historysports: [],
				AllActivityList: [],
				avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=757545797,2214471709&fm=11&gp=0.jpg',
				form: {
					UserName: '猪猪真的很好看',
					No: '174040312',
					Grade: '财务审计系 19财管2'
				},
				approvalList: '',
				showModal: false,
				newsList: [],
				nowdate: moment().format('YYYY-MM-DD'),
				SportsList: {
					Num: 0
				},
				Sex: Cache.get('myInfo').Sex,
				MonthNum: Cache.get('myInfo').MonthNum,
				historyshow: false,
				scoreList: [],
				requestUrl: this.global.requestUrl,
				loading: false,
				detailshowModal: false,
				applyshowModal: false,
				time: '',
				text: {},
				list: []
			}
		},
		created() {
			this.getList()
			const dotsFront = this.dotsCalc(5)
			const dotsMiddle = this.dotsCalc(5, 100, 250)
			const dotsBack = this.dotsCalc(5, 170, 230)

			this.d1 = this.pathCalc(dotsFront)
			this.d2 = this.pathCalc(dotsMiddle)
			this.d3 = this.pathCalc(dotsBack)
		},
		computed: {
			score: function() {
				let scoreList = this.scoreList;
				let scoreAll = 0;
				for (let i = 0; i < scoreList.length; i++) {
					if (scoreList[i].Score) {
						scoreAll = scoreAll + scoreList[i].Score;
					}
				}
				return scoreAll;
			}
		},
		methods: {
			seedetail(t) {
				this.text = t
				this.detailshowModal = !this.detailshowModal;
			},
			AllJoinActivity(t) {
				this.text = t
				this.time = new Date()
				this.applyshowModal = !this.applyshowModal;
			},
			moreallactivity() {
				this.$router.push({
					name: 'MoreAllActivity',
				})
			},
			historyisshow() {
				this.historyshow = !this.historyshow
			},
			newsdetail(item) {
				this.$router.push({
					name: 'UserNewsDetail',
					query: {
						ID: item.ID,
					}
				})
			},
			UserScoreRecord() {
				this.$router.push({
					name: 'UserScoreRecord',
				})
			},
			moreNews() {
				this.$router.push({
					name: 'UserNewList',
				})
			},
			moremanageclub() {
				this.$router.push({
					name: 'MoreManageClub',
				})
			},
			moremanageactivity() {
				this.$router.push({
					name: 'MoreManageActivity',
				})
			},
			morejoinactivity() {
				this.$router.push({
					name: 'MoreJoinActivity',
				})
			},
			morejoinclub() {
				this.$router.push({
					name: 'MoreJoinClub',
				})
			},
			UserCreditApply() {
				this.$router.push({
					name: 'UserCreditApply',
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
			Notice(text){
				this.$router.push({
					name: 'NoticeJoin',
					query: {
						Name:text.Name,
						ID: text.ID,
						ChairmanNo: text.ChargeUserNo
					}
				})
			},
			AddFile(text){
				this.$router.push({
					name: 'Enclosure',
					query: {
						ID: text.ID,
						ChairmanNo: text.ChargeUserNo
					}
				})
			},
			UserActivitySignRecord(text) {
				this.$router.push({
					name: 'ActivitySignRecord',
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
						ID: text.ID,
						State: text.IsAgreeApplyActivity,
					}
				})
			},
			async getList() {
				let data = {}
				this.loading = true
				let res = await GetJoinClubList(data)
				let res1 = await GetUserManagClubList(data)
				let res2 = await GetManageActivityPageList(data)
				let res3 = await DoGetTeacherExamPageList(data)
				let res4 = await DoGetTeacherAlreadyExamPageList(data)
				let res5 = await UserDoGetNewsPageList(data)
				let res6 = await DoGetSportsList(data)
				let res7 = await GetJoinActivityPageList(data)
				let res8 = await UserDoGetScoreList(data)

				if (res6.data.data[0]) {
					this.SportsList = res6.data.data[0]
				}
				this.list = res.data.data;
				this.historysports = res6.data.data
				this.newsList = res5.data.data
				this.ClubList = res.data.code == 0 ? res.data.data.filter((v, i) => i < 4) : [];
				let activeIDs = []
				for (let i = 0; i < this.ClubList.length; i++) {
					activeIDs.push(this.ClubList[i].ID)
				}
				let activeData = {}
				console.log(activeIDs)
				activeData.clubID = activeIDs.join(',')
				data = activeData
				let res9 = await GetActivityPageList(data)
				this.AllActivityList = res9.data.code == 0 ? res9.data.data.filter((v, i) => i < 4) : []
				// this.ClubList = res.data.data
				this.MClubList = res1.data.data
				this.MActivityList = res2.data.data
				this.realdyActivityList = res3.data.data
				this.okActivityList = res4.data.data
				this.MJActivityList = res7.data.data
				this.scoreList = res8.data.data
				// this.AllActivityList= res9.data.data
				this.loading = false
			},
			closeFun(index) {
				this.showModal = false
				this.detailshowModal = false
				this.applyshowModal = false
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
			},
			ExitClub(text) {
				let that = this
				this.$confirm({
					title: '提示',
					content: `您确定退出该俱乐部吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await DoOutClub(data);
						if (res.data.code == 0) {
							that.getList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			curveCalc(sx, sy, fx, ex, ey) {
				// 死点
				if (fx === 0) return `C${sx} ${sy}, ${sx} ${sy}, ${sx} ${sy} `
				// 加入随机数左右曲率
				const xGap = (ex - sx) * 0.02

				const x1 = Number(sx + fx + _pm() * xGap)
				const y1 = sy

				const x2 = Number(x1 + _pm() * xGap).toFixed(2)
				const y2 = ey.toFixed(2)

				return `C${x1.toFixed(2)} ${y1}, ${x2} ${y2}, ${ex} ${ey} `
			},

			/**
			 * @summary 路径 d 属性生成器
			 * @param {array} dots 各关键点坐标
			 */
			pathCalc(dots) {
				let d = ''

				const sx = dots[0].x
				const sy = dots[0].y
				const dotsCount = dots.length

				d += `M${sx} ${sy} `

				dots.forEach((dot, index) => {
					const isLast = index + 1 === dotsCount ? 'last' : 'default'

					const pathActions = {
						last: $ => {
							// 最后一个点进行封闭图形
							d += `V350 H${sx} z`
						},
						default: $ => {
							// 非结束点进行曲线绘制
							const {
								x: sx,
								y: sy,
								c
							} = dot
							const {
								x: ex,
								y: ey
							} = dots[index + 1]
							const fx = (ex - sx) * (c || 0)

							const curveto = this.curveCalc(sx, sy, fx, ex, ey)

							d += curveto
						}
					}

					pathActions[isLast]()
				})

				return d
			},

			/**
			 * @summary 波峰波谷间隔计算
			 */
			blocksCalc(count = 7) {
				const aver = 2000 / (count - 1)
				const big = aver * 1.15
				const small = aver * 0.85

				const blocks = Array(count - 3)
					.fill(aver)
					.concat([big, small])

				let m = blocks.length

				while (m) {
					const i = Math.floor(Math.random() * m--)
					const seed = _random(50) * _pm()

					blocks[m] += seed
					blocks[i] += -1 * seed;
					[blocks[m], blocks[i]] = [blocks[i], blocks[m]]
				}

				return blocks
			},

			/**
			 * @summary 坐标生成
			 * @return {array} dots: [{ x: x 坐标, y: y 坐标, c: 曲率 }]
			 */
			dotsCalc(count = 7, minY = 0, maxY = 300) {
				let dots = []

				// 起点 y
				const sy = _random(300, minY)

				const originCurve = _random(0.65, 0.35)
				const blocks = this.blocksCalc(count)

				const dotActions = {
					start: _ => {
						dots.push({
							x: 0,
							y: sy,
							c: originCurve
						})
					},

					default: currentIndex => {
						const lastDot = dots[currentIndex - 1]
						const y = lastDot.y > 175 ? _random(170, minY - 10) : _random(maxY - 10, 180)

						const x = blocks[currentIndex - 1] + lastDot.x

						dots.push({
							x,
							y,
							c: 1 - lastDot.c
						})
					},

					end: _ => {
						dots.push({
							x: 2000,
							y: sy
						})
					}
				}

				Array(count)
					.fill('')
					.forEach((_, index) => {
						const indexMap = {
							0: 'start',
							[count - 1]: 'end'
						}
						// 点生成
						dotActions[indexMap[index] || 'default'](index)
					})

				const repeat = dots
					.map(dot => {
						const {
							x,
							y,
							c
						} = dot
						return {
							x: x + 2000,
							y,
							c
						}
					})
					.slice(0, -1)

				return dots.concat(repeat)
			}
		}
	}

	function _random(max = 1, min = 0, offset = 0) {
		const r = (Math.random() * (max - min) + min).toFixed(2)
		return Number(r) + offset
	}

	// 随机正负
	function _pm() {
		return Math.random() > 0.5 ? 1 : -1
	}

	function shuffle([...arr]) {
		let m = arr.length
		while (m) {
			const i = ~~(Math.random() * m--);
			[arr[m], arr[i]] = [arr[i], arr[m]]
		}

		return arr
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
		width: 70%;
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
		width: 70%;
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

	.menbernum {
		width: 100%;
		height: 26px;
		line-height: 26px;
		text-align: center;
		position: absolute;
		bottom: 0px;

		i {
			font-size: 16px;
		}
	}

	.cdetail {
		width: 75%;
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.content-list {
		position: relative;
		height: 7.2rem;
		width: 47.5%;
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
		font-size: 14px;
		font-weight: 600;
		// overflow: hidden;
		// text-overflow:ellipsis;
		// white-space: nowrap;
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
		width: 73%;
		float: left;
		min-width: 850px;
	}

	.content-right {
		float: right;
		width: 25.5%;
		background-color: white;
		min-width: 260px;
		border-radius: 4px;
	}

	.cd-time {
		// overflow: hidden;
		// text-overflow:ellipsis;
		// white-space: nowrap;
	}

	.joinactivity {
		position: absolute;
		right: 0px;
		top: 5px;

	}

	.ant-tag:hover {
		cursor: pointer;
	}

	.ant-tabs-tabpane {
		display: flex;
		flex-direction: row;
		justify-content: start;
		flex-wrap: wrap;
		padding-bottom: 40px;
		padding-left: 0px;
		width: 100%;
	}

	.newsli {
		color: #1890FF;
		// margin-left: 5px;
		border-bottom: 1px dashed #dee0e2;
		margin-right: 25px;
		margin-left: 20px;
		list-style: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}

	.newsli:hover {
		cursor: pointer;
	}

	.sportsblock {
		min-height: 15.8125rem;
		border-radius: 4px;
	}

	.step {
		text-align: center;
		margin-top: 10px;
		position: relative;
	}

	.stepdetail {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.stepname {
		color: #1890FF;
		font-size: 20px;
	}

	.menusblock {
		border-radius: 4px;
		padding: 20px;
		min-height: 283px;
		border-top: 20px solid #F0F2F5;
	}

	.clubnews {
		border-top: 20px solid #F0F2F5;
		height: 567px;
		border-radius: 4px;
	}

	.clubnews ul {
		margin-top: 25px;
		padding-left: 0px;
	}

	.newslititle {
		width: 70%;
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #007BEA;
	}

	.history {
		position: absolute;
		right: 0px;
	}

	.nowscore {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	/deep/.el-card__body {
		.item {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: start;
			flex-wrap: wrap;
		}

		padding-left: 0;
	}

	.el-card {
		min-height: 263px;
	}

	.cradtitle {
		font-size: 20px;
	}

	.ciclecore {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		// background-color: #FFC118;
		margin-left: calc(50%-50px);
		line-height: 100px;
		color: white;
	}

	#app {
		width: 100px;
		height: 100px;
		background: #f0f0f0;
		display: flex;
		border-radius: 50%;
	}

	.card {
		--to: rgb(247, 151, 30);
		--from: rgb(255, 210, 0);
		--center: rgb(251, 181, 15);
		--shadow: rgba(251, 181, 15, 0.5);

		// --to: rgb(94, 197, 250);
		// --from: rgb(115, 206, 255);
		// --center: rgb(95,203,253);
		// --shadow: rgba(167,223,247, 0.5);

		position: relative;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: auto;
		overflow: hidden;
		background: linear-gradient(130deg, var(--from), var(--to));
		box-shadow: 0 53px 67px -26px var(--shadow);
	}

	svg {
		position: absolute;
		width: 400%;
		height: 100%;
		top: 32px;
		left: 0;
	}

	.wave {
		--cubic-bezier: cubic-bezier(0.68, 0.35, 0.37, 0.65);
		fill: #fff;

		&--front {

			animation: move 4.5s var(--cubic-bezier) infinite;
		}

		&--middle {
			animation: move 3.5s var(--cubic-bezier) infinite;
		}

		&--back {
			animation: move 3s var(--cubic-bezier) infinite;
		}
	}

	@keyframes move {
		0% {
			transform: translate3d(0, 0, 0);
		}

		100% {
			transform: translate3d(-50%, 0, 0);
		}
	}

	.nowscore .circle {
		position: absolute;
		margin: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-radius: 50%;
		background: rgba(138, 43, 226, 0.02);
	}

	.nowscore .circle:nth-of-type(1) {
		width: 100px;
		height: 80px;
		animation: rt 6s infinite linear;
		box-shadow: 0 0 1px 0 blueviolet, inset 0 0 10px 0 blueviolet;
	}

	.nowscore .circle:nth-of-type(2) {
		width: 80px;
		height: 100px;
		animation: rt 10s infinite linear;
		box-shadow: 0 0 1px 0 darkviolet, inset 0 0 10px 0 darkviolet;
	}

	.nowscore .circle:nth-of-type(3) {
		width: 110px;
		height: 90px;
		animation: rt 5s infinite linear;
		box-shadow: 0 0 1px 0 darkmagenta, inset 0 0 10px 0 darkmagenta;
	}

	.nowscore .circle:nth-of-type(4) {
		width: 90px;
		height: 110px;
		animation: rt 15s infinite linear;
		box-shadow: 0 0 1px 0 magenta, inset 0 0 10px 0 magenta;
	}

	@keyframes rt {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
