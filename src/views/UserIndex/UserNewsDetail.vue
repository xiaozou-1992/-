<template>
	<a-layout id="components-layout-demo-top" class="layout" v-loading="loading">
		<a-layout-content style="width: 100%;">
			<div :style="{  minHeight: '380px' }">
				<div class="c-content">
					<div class="content-left">
						<a-card headStyle="text-align:center;" :title="NewsDetail.Title" :bordered="false" style="width: 100%" class="acard">
							<div style="text-align: center;width: 100%;margin-bottom: 20px;">
								<div>发布时间：{{NewsDetail.AddTime}} <span style="margin-left: 15px;">发布人：{{NewsDetail.AddUserName}}</span><span style="margin-left: 15px;">分类：{{NewsDetail.TypeName}}</span></div>
							</div>
							<div class="newscontent" style="width: 100%;overflow: hidden;" v-html='NewsDetail.Content'>
								
							</div>
						</a-card>
					</div>
				</div>
			</div>
		</a-layout-content>
		<addActivity v-if="showModal" @closeFun="closeFun(1)"></addActivity>
	</a-layout>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		UserDoGetNewsDetail
	} from '@/api/follow'
	import addActivity from './addActivity.vue'
	import Cache from '@/utils/cache'
	export default {
		components: {
			addActivity
		},
		data() {
			return {
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
				NewsDetail: {},
				MClubList: [],
				MActivityList: [],
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
				loading:false
			}
		},
		created() {
			this.getList()
		},
		computed: {

		},
		methods: {
			async getList() {
				this.loading=true
				let data = {}
				data.id=this.$route.query.ID
				let res = await UserDoGetNewsDetail(data)
				res.data.data.Content = res.data.data.Content.replace(/\<img/gi, '<img class="rich_text_img" width="100%" ');
				this.NewsDetail = res.data.data
				// this.NewsDetail.Content=this.NewsDetail.Content.replace(/\<img/gi, '<img class="rich_text_img" ');
				this.loading=false
			},
			closeFun(index) {
				this.showModal = false
				if (index === 1) {
					this.showModal != this.showModal
					this.getList()
				}
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

	.rich_text_img{
			width:100%!important;
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
		position: relative;
		height: 5rem;
		width: 31.2%;
		min-width: 297px;
		display: flex;
		// flex: 1 1 31.2%;
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
		padding-bottom: 40px;
		padding-left: 24px;
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
		// padding: 20px;
		width: 900px!important;
		margin: 0 auto;
		box-shadow: 2px 2px 10px #909090;
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
	.newscontent{
		// text-align: center;
		
	}
	.newscontent{
		p{
			max-width: 700px!important;
		}
		span{
			max-width: 700px!important;
		}
		img{
			max-width: 700px!important;
		}
	}
</style>
