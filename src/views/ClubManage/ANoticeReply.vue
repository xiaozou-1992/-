<template>
	<div class="all" v-loading="loading">
		<div id="components-form-demo-advanced-search">
			<div class="h2">{{ Title }}</div>
		</div>
		<div class="option">
			<!-- <a-button v-if="IsManager||ChairmanNo==thisChairmanNo" type="primary" class="btn" @click="addList">上传</a-button> -->
			<!-- <a-button type="primary" class="btn" @click="addList">回复</a-button> -->
		</div>
		<div>
			<el-table ref="singleTable" :data="data" border highlight-current-row style="width: 100%">
				<el-table-column prop="Content" label="内容" min-width="180">
					<template slot-scope="scope">
						<div>{{ scope.row.Content }}</div>
					</template>
				</el-table-column>
				<el-table-column prop="Content" label="回复" min-width="180">
					<template slot-scope="scope">
						<!-- <div style="height: 30px;" v-for="item in scope.row.Child">{{ item.Content }}    {{ item.AddTime }}
						</div> -->
						<a-timeline v-for="item in scope.row.Child">
							<a-timeline-item>{{ item.Content }} {{ item.AddTime }}</a-timeline-item>
						</a-timeline>

					</template>
				</el-table-column>
				<!-- <el-table-column prop="AddUserName" label="回复人" min-width="80"></el-table-column> -->
				<el-table-column prop="AddTime" label="回复时间" min-width="80"></el-table-column>
				<el-table-column prop="IsEnable" label="操作" min-width="60" fixed="right">
					<template slot-scope="scope">
						<!-- <i title="回复" class="iconfont icon-liaotian" @click="reply(scope.row)"></i> -->
						<i title="删除" class="iconfont icon-delete1" style="color: red;"
							@click="deletemember(scope.row)"></i>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pagination.currentPage" :page-sizes="pagination.pageSizeOptions"
				:page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="pagination.total"></el-pagination>
		</div>
		<a-modal title="回复" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk"
			@cancel="applyhandleCancel">
			<a-form-model ref="ruleForm" :model="form1" :rules="rules1" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="公告内容" prop="Content">
					<a-input v-model="form1.Content" type="textarea" />
				</a-form-model-item>
			</a-form-model>
		</a-modal>
		<a-modal title="回复" :visible="visible1" :confirm-loading="confirmLoading1" @ok="handleOk1"
			@cancel="applyhandleCancel">
			<a-form-model ref="ruleForm" :model="form2" :rules="rules1" :label-col="labelCol" :wrapper-col="wrapperCol">
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
		MClubNewsReplyList,
		AddClubNewsReplyList,
		DoDeleteMClubNewsReply,
		UserGetClubDetail
	} from '@/api/follow';
	const data = [];
	export default {
		components: {

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
		},
		mounted() {},
		methods: {
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
				let res = await MClubNewsReplyList(data);

				this.data = res.data.data
				const pagination = {
					...this.pagination
				};
				pagination.total = res.data.pageInfo.TotalItemCount;
				this.pagination = pagination;
				let data1={}
				data1.id=this.ClubID
				let res1=await UserGetClubDetail(data1)
				this.IsManager=res1.data.isManager
				this.ChairmanNo=res1.data.data.ChairmanNo
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
						let res = await DoDeleteMClubNewsReply(data);
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
			async look(text) {
				let data = {};
				data.id = text.ID
				let res = await DownUserActivityFile(data);
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

	/deep/.ant-timeline {
		line-height: none;
	}

	/deep/.ant-timeline-item {
		padding: 0;
		height: 25px;
		line-height: 25px;
	}
</style>
