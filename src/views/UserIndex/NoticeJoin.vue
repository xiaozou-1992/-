<template>
	<div class="all" v-loading="loading">
		<div id="components-form-demo-advanced-search">
			<div class="h2">{{ ClubName }}俱乐部公告</div>
		</div>
		<div>
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字">
							<a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" />
						</a-form-item>
					</a-col>
					<a-col :span="8" style="margin-top:4px;">
						<a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
						<a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">重置</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<div class="option">
			<a-button v-if="IsManager||ChairmanNo==thisChairmanNo" type="primary" class="btn" @click="addList">发起公告
			</a-button>
		</div>
		<div class="all-notice" >
			<div class="notice" v-for="(item,index) in data" :key="index">
				<div class="notice-title">{{ item.Title }}
					<!-- <div style="font-size: 15px;color: #8590a6;">发布于：{{item.AddTime}} · {{item.AddUserName}}</div> -->
				</div>
				<div class="notice-content">
					<foldText :showContent="item.Content"></foldText>
				</div>
				<div class="notice-tool">
					<span>{{item.AddUserName}}</span>
					<span>{{item.AddTime}}</span>
					<span>
						<i title="讨论" class="iconfont icon-liaotian" style="color:#8590a6" @click="talk(item)"><span
								class="i-span">回复</span></i>
						<i v-if="IsManager||ChairmanNo==thisChairmanNo" title="修改" class="iconfont icon-editor1"
							style="font-size: 24px;color:#8590a6" @click="update(item)"><span class="i-span">修改</span></i>
						<i v-if="IsManager||ChairmanNo==thisChairmanNo" title="删除" class="iconfont icon-delete1"
							style="font-size: 24px;color:#8590a6" @click="deletemember(item)"><span
								class="i-span">删除</span></i>
					</span>
				</div>
				<!-- <div class="reply" style="margin-bottom: 50px;">
					<a-textarea placeholder="输入回复......" allow-clear @change="onChange" />
					<div style="width: 100%;margin-top: 5px;text-align: right;">
						<a-button type="primary" class="btn1">发表</a-button>
					</div>
					<div class="reply-body" >
						<div  v-for="(ite,i) in replydata" :key="i">
							
							<div class="reply-all">
								<div class="reply-l">
									<div><span class="addusername">{{ite.AddUserName}}：</span>{{ite.Content}}</div>
									<div class="addtime">{{ ite.AddTime }}</div>
								</div>
								<div class="reply-r"><i title="讨论" class="iconfont icon-liaotian" style="color:#8590a6"
										@click="talk(item)"><span class="i-span">回复</span></i><i
										v-if="IsManager||ChairmanNo==thisChairmanNo" title="删除"
										class="iconfont icon-delete1" style="font-size: 24px;color:#8590a6"
										@click="deletemember(item)"><span class="i-span">删除</span></i></div>
							</div>
							<div class="reply-reply" v-for="(it,y) in ite.Child" :key="y">
								<span class="addusername">{{ it.AddUserName }}</span>:<span class="addtime">{{it.AddTime}}</span>  ·  {{ it.Content }}
							</div>
						</div>
						
					</div>
				</div> -->

			</div>
		</div>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="pagination.currentPage" :page-sizes="pagination.pageSizeOptions"
			:page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
		</el-pagination>
		<a-modal title="新增公告" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk"
			@cancel="applyhandleCancel">
			<a-form-model ref="ruleForm" :model="form1" :rules="rules1" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="公告标题" prop="Title">
					<a-input v-model="form1.Title" type="text" />
				</a-form-model-item>
				<a-form-model-item label="公告内容" prop="Content">
					<a-input v-model="form1.Content" type="textarea" />
				</a-form-model-item>
			</a-form-model>
		</a-modal>
		<a-modal title="修改公告" :visible="visible1" :confirm-loading="confirmLoading1" @ok="handleOk1"
			@cancel="applyhandleCancel">
			<a-form-model ref="ruleForm" :model="form2" :rules="rules1" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="公告标题" prop="Title">
					<a-input v-model="form2.Title" type="text" />
				</a-form-model-item>
				<a-form-model-item label="公告内容" prop="Content">
					<a-input v-model="form2.Content" type="textarea" />
				</a-form-model-item>
			</a-form-model>
		</a-modal>
	</div>
</template>

<script>
	import Func from '@/utils/func';
	import Cache from '@/utils/cache'
	import {
		GetClubNewsList,
		DoAddClubNews,
		DoDeleteClubNews,
		DoUpdateClubNews,
		UserGetClubDetail,
		ClubNewsReplyList
	} from '@/api/follow';
	import foldText from '../../components/fold-text.vue'
	const data = [];
	export default {
		components: {
			foldText
		},
		data() {
			return {
				data,
				replydata:[],
				form: this.$form.createForm(this, {
					name: 'advanced_search'
				}),
				pagination: {
					currentPage: 1,
					pageSize: this.global.pageSize,
					pageSizeOptions: this.global.pageSizeOptions, // 每页中显示的数据
					showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
				},
				addIf: false,
				text: {},
				detailtext: {},
				codeID: '',
				visible: false,
				confirmLoading: false,
				itemId: '',
				departmentList: [],
				worklist: [],
				loading: false,
				values: {},
				pages: {
					pageIndex: 1,
					pageSize: 20
				},
				tableHeight: parseFloat(window.innerHeight - 160),
				TypeIDList: [],
				DepartCodeList: [],
				ProjectIDList: [],
				ishaveid: true,
				selectList: {},
				showModal: false,
				UserInfo: Cache.get('myInfo'),
				ChairmanNo: '',
				ClubName: this.$route.query.Name,
				thisChairmanNo: Cache.get('myInfo').UserNo,
				linktype: 1,
				ID: this.$route.query.ID,
				visible: false,
				deletelist: {},
				time: '',
				codeIf: false,
				detailIf: false,
				IsManager: false,
				visible: false,
				confirmLoading: false,
				form1: {
					Title: '',
					Content: ''
				},
				visible1: false,
				confirmLoading1: false,
				form2: {
					Title: '',
					Content: ''
				},
				labelCol: {
					span: 8
				},
				wrapperCol: {
					span: 14
				},
				rules1: {
					Title: [{
						required: true,
						message: '请输入公告标题',
						trigger: 'blur'
					}],
					Content: [{
						required: true,
						message: '请输入公告内容',
						trigger: 'blur'
					}],
				},
			};
		},
		computed: {},
		created() {
			// this.getList();
			this.GetOtherList()
			this.GetReply()
		},
		mounted() {},
		methods: {
			async GetReply(){
				let data = {}
				data.clubNewsID = 'ee82adafec974eb38bfd7d78334c4b5e'
				let res = await ClubNewsReplyList(data);
				this.replydata = res.data.data
			},
			onChange(e) {
				console.log(e);
			},
			update(text) {
				this.visible1 = true
				this.form2.Title = text.Title
				this.form2.Content = text.Content
				this.form2.ID = text.ID
			},
			talk(text) {
				this.$router.push({
					name: 'NoticeReply',
					query: {
						ID: text.ID,
						ChairmanNo: this.ChairmanNo,
						Title: text.Title,
						ClubID: this.ID,
						Item:JSON.stringify(text)
					}
				})
			},
			handleOk(e) {
				let data = {}
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						data.ClubID = this.ID
						data.Title = this.form1.Title
						data.Content = this.form1.Content
						let res = await DoAddClubNews(data)
						if (res.data.code === 0) {
							this.$message.success(res.data.msg)
							this.$emit('closeFun')
							this.$refs.ruleForm.resetFields();
							this.GetOtherList()
							this.visible = false
						} else {
							this.$message.error(res.data.msg)
							this.$refs.ruleForm.resetFields();
						}
					}
				})

			},
			handleOk1(e) {
				let data = {}
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						data.ID = this.form2.ID
						data.Title = this.form2.Title
						data.Content = this.form2.Content
						let res = await DoUpdateClubNews(data)
						if (res.data.code === 0) {
							this.$message.success(res.data.msg)
							this.$emit('closeFun')
							this.visible1 = false
							this.$refs.ruleForm.resetFields();
							this.GetOtherList()
						} else {
							this.$message.error(res.data.msg)
						}
					}
				})

			},
			applyhandleCancel(e) {
				this.visible = false;
				this.visible1 = false
				this.$refs.ruleForm.resetFields();
			},
			async GetOtherList() {
				let data = {}
				if (this.values) {
					data = this.values;
				}
				data.clubID = this.ID
				// debugger
				let res = await GetClubNewsList(data);
				this.data = res.data.data
				const pagination = {
					...this.pagination
				};
				pagination.total = res.data.pageInfo.TotalItemCount;
				this.pagination = pagination;
				let data1 = {}
				data1.id = this.ID
				let res1 = await UserGetClubDetail(data1)
				this.IsManager = res1.data.isManager
				this.ChairmanNo = res1.data.data.ChairmanNo
			},
			codeimg(text) {
				// let data={}
				// data.id=text.ID
				// let res= await GetUserActivitySignQRImage(data)
				this.time = new Date()
				this.codeID = text.ID
				this.codeIf = true
			},
			handleCancel(e) {
				this.visible = false
				this.GetOtherList()
			},
			deletemember(text) {
				// this.visible = true
				// this.deletelist = text
				let that = this
				this.$confirm({
					title: '提示',
					content: `您确定删除此条记录吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await DoDeleteClubNews(data);
						if (res.data.code == 0) {
							that.GetOtherList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			detail(text) {
				this.text = text
				this.time = new Date()
				this.addIf = true
			},
			handleChange(val) {
				this.currentRow = val;
				if (val.ID) {
					this.ishaveid = false
					this.selectList = val
				} else {
					this.ishaveid = true
				}
			},
			handleSearch(e) {
				e.preventDefault();
				this.form.validateFields((error, values) => {
					this.pagination.currentPage = 1;
					this.values = values;
					this.GetOtherList()
				});
			},
			handleReset() {
				this.form.resetFields();
				this.values = {};
				this.GetOtherList()
			},
			handleSizeChange(val) {
				this.pagination.pageSize = val;
				this.GetOtherList()
			},
			handleCurrentChange(val) {
				this.pagination.currentPage = val;
				this.GetOtherList()
			},
			async getList() {
				this.loading = true;
				let data = {};
				if (this.values) {
					data = this.values;
				}
				data.activityID = this.$route.query.ID
				data.pageIndex = this.pagination.currentPage;
				data.pageSize = this.pagination.pageSize;
				let res = await UserActivityFile(data);
				this.loading = false;
				this.data = res.data.data;
				// const pagination = { ...this.pagination
				// };
				// pagination.total = res.data.pageInfo.TotalItemCount;
				// this.pagination = pagination;
			},
			// async getOtherList() {
			// 	let res = await UserUpdateActivity()
			// 	this.TypeIDList = res.data.data
			// },
			addList() {
				this.visible = true
			},
			modifyList(text) {
				text = Object.assign(text, {
					time: new Date()
				});
				this.addIf = !this.addIf;
				this.text = text;
			},
			closeFun(index) {
				this.visible2 = false
				this.showModal = false
				this.addIf = false
				this.detailIf = false
				this.codeIf = false
				this.getList()
			},
		}
	};
</script>

<style lang="less" scoped>
	/deep/.ant-form-item {
		display: flex;
		margin-bottom: 10px !important;

		/deep/.ant-form-item-label {
			width: 100px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-align: right;
		}

		/deep/.ant-form-item-control-wrapper {
			flex: 1;
		}
	}

	/deep/.ant-table-thead>tr>th,
	/deep/.ant-table-tbody>tr>td {
		padding: 5px;
	}

	/deep/.ant-table-pagination.ant-pagination {
		float: left;
		// display:none;
	}

	/deep/.ant-table-body tr th:first-child {
		display: none;
	}

	/deep/.ant-table-body tr td:first-child {
		display: none;
	}

	/deep/.el-table th.is-leaf {
		background: #fafafa;
	}

	/deep/.el-table td,
	/deep/.el-table th {
		padding: 5px;
	}

	/deep/.ant-table-tbody .ant-table-row-cell-break-word:nth-child(2) {
		position: relative;

		.con {
			position: absolute;
			top: 40px;
			left: 0px;
			z-index: 999;
			background: #fff;
			width: 96%;
			padding: 1% 2%;
		}
	}

	.option {
		margin-top: 10px;
		margin-bottom: 20px;
		overflow: hidden;
	}

	.option .btn {
		height: 36px;
		line-height: 36px;
		padding: 0 10px;
		float: left;
		background: #1890ff;
		color: #fff;
		margin-right: 10px;
		border-radius: 3px;
		cursor: pointer;
		border: none;
	}

	.foot {
		text-align: center;
		margin-top: 100px;
	}

	.el-pagination {
		margin-top: 10px;
	}

	.all {
		background-color: white;
		padding: 20px;
	}

	.joinok {
		width: 100%;
		text-align: center;
		margin-top: 20px;
	}

	i:hover {
		cursor: pointer;
	}

	.notice {
		width: 100%;
		border-bottom: 10px solid #f0f2f7;
		padding: 15px;
	}
	.all-notice .notice:first-child {
		border-top: 10px solid #f0f2f7;
	}
	.notice-title {
		color: #121212;
		font-size: 20px;
		margin-bottom: 15px;
		font-weight: 600px;
	}

	.notice-content {
		width: 100%;
		line-height: 24px;
		font-size: 15px;

		a {
			width: 100%;
			text-align: right;
		}
	}

	.notice-tool {
		text-align: right;
		line-height: 30px;
		margin-top: 25px;
		display: flex;
		flex-direction: row;
		color: #8590a6;
		justify-content: space-between;
		    width: 100%;
		i {
			margin-left: 20px;
			color: gray;
		}

		span {
			// font-size: 12px;
		}
	}

	/deep/.notice-tool i:hover {
		color: #06f !important;
	}

	.txttype {
		letter-spacing: 0.5px;
		line-height: 20px;
		position: relative;
	}

	.hidetext {
		position: relative;
		height: 20px;
		overflow: hidden;

		span {
			display: block;
			width: 100%;
		}
	}

	.all-notice {
		width: 100%;
	}

	.more {
		color: #1890ff;
		width: 100%;
		text-align: right;
	}

	.i-span {
		font-size: 12px;
		position: relative;
		top: -5px;
	}

	.reply-all {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #f8f8f8;
		padding: 5px 30px 5px 30px;
		margin-top: 5px;
		border-radius: 5px 5px 0 0;
	}

	.reply-reply {
		width: 100%;
		padding: 5px 60px 5px 60px;
		background-color: #fdfdfd;
	}

	.reply-l {
		width: 80%;
	}

	.reply-r {
		width: 20%;
		text-align: right;

		i {
			margin-left: 20px;
		}
	}

	.reply-body {
		// border-top: 1px solid #f0f2f7;
		// border-bottom: 1px solid #f0f2f7;
	}
	.addtime{
		color: #8590a6;
	}
	.addusername{
		color: #06f;
	}
</style>
