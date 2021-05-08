<template>
	<div class="all" v-loading="loading">
		<div id="components-form-demo-advanced-search">
			<div class="h2">{{ Title }}</div>
		</div>
		<div>
			<div class="all-notice">
				<div class="notice">
					<div class="notice-title">{{ Item.Title }}
						<div style="font-size: 15px;color: #8590a6;">发布于：{{Item.AddTime}} · {{Item.AddUserName}}</div>
					</div>
					<div class="notice-content">
						<p>{{Item.Content}}</p>
					</div>
					<div class="notice-tool">
						<!-- <i title="讨论" class="iconfont icon-liaotian" style="color:#8590a6" @click="talk(item)"><span
								class="i-span">回复</span></i> -->
						<!-- <i v-if="IsManager||ChairmanNo==thisChairmanNo" title="修改" class="iconfont icon-editor1"
							style="font-size: 24px;color:#8590a6" @click="update(item)"><span
								class="i-span">修改</span></i> -->
						<!-- <i v-if="IsManager||ChairmanNo==thisChairmanNo" title="删除" class="iconfont icon-delete1"
							style="font-size: 24px;color:#8590a6" @click="deletemember(item)"><span
								class="i-span">删除</span></i> -->
					</div>
					<div class="reply" style="margin-bottom: 50px;">
						<a-form-model ref="ruleForm1" :model="form1" :rules="rules1" :label-col="labelCol" :wrapper-col="wrapperCol">
							<a-form-model-item label="" prop="Content">
								<a-input placeholder="输入回复......" v-model="form1.Content" type="textarea" allow-clear />
							</a-form-model-item>
						</a-form-model>
						<div style="width: 100%;text-align: right;">
							<a-button type="primary" class="btn1" @click="addList">发布</a-button>
						</div>
						<div class="reply-body">
							<div v-for="(ite,i) in data" :key="i" style="border: 1px solid #efefef;margin-top: 5px;">

								<div class="reply-all">
									<div class="reply-l">
										<div><span class="addusername">{{ite.AddUserName}}：</span>{{ite.Content}}</div>
										<div class="addtime">{{ ite.AddTime }}</div>
									</div>
									<div class="reply-r"><i title="讨论" class="iconfont icon-liaotian"
											style="color:#8590a6" @click="reply(ite)"><span
												class="i-span">回复</span></i><i
											v-if="IsManager||ChairmanNo==thisChairmanNo" title="删除"
											class="iconfont icon-delete1" style="font-size: 24px;color:#8590a6"
											@click="deletemember(ite)"><span class="i-span">删除</span></i></div>
								</div>
								<div class="reply-reply" v-for="(it,y) in ite.Child" :key="y">
									<span class="addusername">{{ it.AddUserName }}</span>：{{ it.Content }}<span
										class="addtime" style="float: right;">{{it.AddTime}}</span>
								</div>
							</div>

						</div>
					</div>

				</div>
			</div>

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pagination.currentPage" :page-sizes="pagination.pageSizeOptions"
				:page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="pagination.total"></el-pagination>
		</div>
		<a-modal title="回复" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk"
			@cancel="applyhandleCancel">
			<a-form-model ref="ruleForm" :model="form1" :rules="rules1" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="内容" prop="Content">
					<a-input v-model="form1.Content" type="textarea" />
				</a-form-model-item>
			</a-form-model>
		</a-modal>
		<a-modal title="回复" :visible="visible1" :confirm-loading="confirmLoading1" @ok="handleOk1"
			@cancel="applyhandleCancel">
			<a-form-model ref="ruleForm" :model="form2" :rules="rules1" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="内容" prop="Content">
					<a-input v-model="form2.Content" type="textarea" />
				</a-form-model-item>
			</a-form-model>
		</a-modal>
	</div>
</template>

<script>
	import Func from '@/utils/func';
	import Cache from '@/utils/cache'
	import foldText from '../../components/fold-text.vue'
	import {
		ClubNewsReplyList,
		AddClubNewsReplyList,
		DoDeleteClubNewsReply,
		UserGetClubDetail
	} from '@/api/follow';
	const data = [];
	export default {
		components: {
			foldText
		},
		data() {
			return {
				data,
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
				ClubID: this.$route.query.ClubID,
				Title: this.$route.query.Title,
				Item: JSON.parse(this.$route.query.Item),
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
					Content: ''
				},
				visible1: false,
				confirmLoading1: false,
				form2: {
					Content: ''
				},
				labelCol: {
					span: 8
				},
				wrapperCol: {
					span: 14
				},
				rules1: {
					Content: [{
						required: true,
						message: '请输入',
						trigger: 'change'
					}],
				},
			};
		},
		computed: {},
		created() {
			// this.getList();
			this.GetOtherList()
		},
		mounted() {},
		methods: {
			onChange(e) {
				console.log(e);
			},
			reply(text) {
				this.visible1 = true
				this.ReplyID = text.ID
			},
			handleOk1(e) {
				let data = {}
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						data.ReplyID = this.ReplyID
						data.Content = this.form2.Content
						let res = await AddClubNewsReplyList(data)
						if (res.data.code === 0) {
							this.GetOtherList()
							this.$message.success(res.data.msg)
							this.$emit('closeFun')
							this.$refs.ruleForm.resetFields();
							this.visible1 = false
						} else {
							this.$message.error(res.data.msg)
							this.$refs.ruleForm.resetFields();
						}
					}
				})

			},
			handleOk(e) {
				let data = {}
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						data.NewsID = this.ID
						data.Content = this.form1.Content
						let res = await AddClubNewsReplyList(data)
						if (res.data.code === 0) {
							this.GetOtherList()
							this.$message.success(res.data.msg)
							this.$emit('closeFun')
							this.$refs.ruleForm.resetFields();
							this.visible = false
						} else {
							this.$message.error(res.data.msg)
							this.$refs.ruleForm.resetFields();
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
				data.clubNewsID = this.ID
				let res = await ClubNewsReplyList(data);

				this.data = res.data.data
				const pagination = {
					...this.pagination
				};
				pagination.total = res.data.pageInfo.TotalItemCount;
				this.pagination = pagination;
				let data1 = {}
				data1.id = this.ClubID
				let res1 = await UserGetClubDetail(data1)
				this.IsManager = res1.data.isManager
				this.ChairmanNo = res1.data.data.ChairmanNo
			},
			handleCancel(e) {
				this.visible = false
				this.visible1 = false
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
						let res = await DoDeleteClubNewsReply(data);
						if (res.data.code == 0) {
							that.GetOtherList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				})
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
			addList(e) {
				// this.visible = true
				let data = {}
				this.$refs.ruleForm1.validate(async valid => {
					if (valid) {
						data.NewsID = this.ID
						data.Content = this.form1.Content
						let res = await AddClubNewsReplyList(data)
						if (res.data.code === 0) {
							this.GetOtherList()
							this.$message.success(res.data.msg)
							this.$emit('closeFun')
							this.$refs.ruleForm1.resetFields();
							// this.visible = false
						} else {
							this.$message.error(res.data.msg)
							this.$refs.ruleForm1.resetFields();
						}
					}
				})
			},
			closeFun(index) {
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
		margin-bottom: -8px !important;

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

	/deep/.ant-timeline {
		line-height: none;
	}

	/deep/.ant-timeline-item {
		padding: 0;
		height: 25px;
		line-height: 25px;
	}

	.notice {
		width: 100%;
		border-top: 1px solid #f0f2f7;
		border-bottom: 1px solid #f0f2f7;
		padding: 15px;
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
		margin-top: 20px;

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
	/deep/.reply-r i:hover {
		color: #06f !important;
	}
</style>
