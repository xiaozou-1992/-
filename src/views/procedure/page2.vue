<template>
	<div class="content">
		<div id="components-form-demo-advanced-search">
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="日期">
							<a-range-picker style="width: 100%;" v-decorator="[`date`]" />
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="节次">
							<a-slider range :min="JCMin" :max="JCMax" v-decorator="[`JC`]" />
						</a-form-item>
					</a-col>
					<a-col :span="8" style="margin-top:4px;">
						<a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
						<a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">重置</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<div style="margin-top: 20px;">
			<el-table :data="data" v-loading="loading" border :max-height="tableHeight" highlight-current-row style="width: 100%;">
				<el-table-column prop="ActName" label="活动类型" min-width="100"></el-table-column>
				<el-table-column prop="ActContent" label="活动内容" min-width="100"></el-table-column>
				<el-table-column prop="Unity" label="举办单位" min-width="120"></el-table-column>
				<el-table-column prop="StudentName" label="申请人" min-width="120"></el-table-column>
				<el-table-column prop="Phone" label="手机号" min-width="120"></el-table-column>
				<el-table-column prop="ApplyTime" label="申请日期" min-width="168"></el-table-column>
				<el-table-column prop="IsEnable" label="节次" min-width="120">
					<template slot-scope="scope">
						{{ scope.row.StartJC }} ~ {{ scope.row.EndJC }} 节
					</template>
				</el-table-column>
				<!-- <el-table-column prop="IsEnable" label="状态" min-width="150">
					<template slot-scope="scope">
						<a-tag color="red" v-if="scope.row.State === '2' || scope.row.State === '4'">
							{{ scope.row.State === '2'?'学院审核不通过':'后勤审核不通过' }}
						</a-tag>
						<a-tag color="green" v-if="scope.row.State === '1' || scope.row.State === '3'">
							{{ scope.row.State === '2'?'学院审核通过':'后勤审核通过' }}
						</a-tag>
						<a-tag color="blue" v-if="scope.row.State === '0'">
							待审核
						</a-tag>
					</template>
				</el-table-column> -->
				<!-- <el-table-column label="操作" width="88" fixed="right">
					<template slot-scope="scope">
						<a-popover title="审批" v-if="scope.row.State === '1'">
							<i class="el-font el-icon-coordinate" style="color: #E6A23C;" @click="examine(scope.row)"></i>
						</a-popover>
						<a-popover title="修改">
							<i class="el-font el-icon-edit-outline" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
						</a-popover>
					</template>
				</el-table-column> -->
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
			 :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total"></el-pagination>
		</div>
		<add :text="text" :DepartCodeList="DepartCodeList" :ClassList="ClassList" v-show="addIf" @closeFun="closeFun"></add>
		<a-modal title="后勤审批审核" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
			<a-form :form="updateForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
				<a-form-item label="审核">
					<a-radio-group name="radioGroup" v-decorator="['State', { rules: [{ required: true, message: '请输入输入学生学号' }] }]">
						<a-radio :value="'3'">
							通过
						</a-radio>
						<a-radio :value="'4'">
							不通过
						</a-radio>
					</a-radio-group>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
	import add from '../../components/examine/index.vue'
	import moment from 'moment'
	import {
		GetAdminApplyPageList2,
		DeleteStudent,
		ReviewAdminApply2,
		GetClassList,
		CoreUpdateStudent
	} from '@/api/follow'
	const data = []
	export default {
		components: {
			add
		},
		data() {
			return {
				data,
				form: this.$form.createForm(this, {
					name: 'advanced_search'
				}),
				updateForm: this.$form.createForm(this, {
					name: 'form12345'
				}),
				pagination: {
					currentPage: 1,
					pageSize: this.global.pageSize,
					pageSizeOptions: this.global.pageSizeOptions, // 每页中显示的数据
					showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
				},
				addIf: false,
				text: {},
				visible: false,
				confirmLoading: false,
				itemId: '',
				gradeYear: null,
				yearPickShow: false,
				departmentList: [],
				worklist: [],
				loading: false,
				values: {},
				JCMin: 1,
				JCMax: 12,
				pages: {
					pageIndex: 1,
					pageSize: 20
				},
				tableHeight: parseFloat(window.innerHeight - 160),
				ClassList: [],
				DepartCodeList: [],
				layoutHeight: window.innerHeight - 460 + 'px',
				examineID: ''
			}
		},
		computed: {},
		created() {
			this.getList()
		},
		mounted() {},
		methods: {
			moment,
			handleOpenChange(status) {
				this.yearPickShow = status
			},
			handlePanelChange(value, mode) {
				this.gradeYear = moment(value).format('YYYY')
				this.yearPickShow = false
			},
			yearChange(date, dateString) {
				if (!date) {
					this.gradeYear = null
				}
			},
			handleSearch(e) {
				e.preventDefault()
				this.form.validateFields((error, values) => {
					this.pagination.currentPage = 1
					this.values = values
					if (values.date) {
						values.applyStartDate = moment(values.date[0]._d).format('YYYY-MM-DD')
						values.applyEndDate = moment(values.date[1]._d).format('YYYY-MM-DD')
					}
					if (values.JC) {
						values.startJC = values.JC[0]
						values.endJC = values.JC[1]
					}
					delete values.date
					delete values.JC
					this.getList()
				})
			},
			handleReset() {
				this.form.resetFields()
				this.values = {}
				this.gradeYear = null
				this.getList()
			},
			handleSizeChange(val) {
				this.pagination.pageSize = val
				this.getList()
			},
			handleCurrentChange(val) {
				this.pagination.currentPage = val
				this.getList()
			},
			async getList() {
				this.loading = true
				let data = {}
				if (this.values) {
					data = this.values
				}
				data.pageIndex = this.pagination.currentPage
				data.pageSize = this.pagination.pageSize
				data.state = '3'
				let res = await GetAdminApplyPageList2(data)
				this.loading = false
				this.data = res.data.data
				const pagination = { ...this.pagination
				}
				pagination.total = res.data.totalCount
				this.pagination = pagination
			},
			addList() {
				this.text = {}
				this.addIf = !this.addIf
			},
			examine(text) {
				console.log(text)
				this.examineID = text.ID
				this.visible = true
			},
			async importData() {
				// let res = await uploadFun(data)
				// this.$message.success(res.data.msg)
			},
			async handleOk(e) {
				e.preventDefault()
				this.updateForm.validateFields(async (err, values) => {
					if (!err) {
						this.confirmLoading = true
						let data = {}
						data = values
						data.ID = this.examineID
						let res = await ReviewAdminApply2(data)
						if (res.data.code === 0) {
							this.$message.success(res.data.msg)
						} else {
							this.$message.error(res.data.msg)
						}
						this.visible = false
						this.confirmLoading = false
					}
				})
			},
			handleCancel(e) {
				this.visible = false
			},
			modifyList(text) {
				text = Object.assign(text, {
					time: new Date()
				})
				this.addIf = !this.addIf
				this.text = text
			},
			deleteList(text) {
				let that = this
				this.$confirm({
					title: '提示',
					content: `您确定删除该学生吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await DeleteStudent(data)
						if (res.data.code == 0) {
							that.getList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			seeList(text, name) {
				let path = ''
				if (name == 'teacher') {
					path = 'ClubTeacher'
				} else if (name == 'manage') {
					path = 'ClubManagerList'
				} else {
					path = 'ClubMember'
				}
				this.$router.push({
					name: path,
					query: {
						ID: text.ID
					}
				})
			},
			closeFun() {
				this.addIf = false
				this.getList()
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.el-table__row {
		position: relative;

		.el-table__expand-icon {
			position: absolute;
			left: 10px;
			top: 10px;
			font-size: 16px;
		}
	}

	.ant-breadcrumb {
		padding: 0 10px;
		line-height: 40px;
		background: #f4f4f5 !important;
		margin-bottom: 20px;
		font-size: 14px;

		.ant-breadcrumb-link {
			color: #fff !important;
			font-weight: bold;
		}
	}

	.content {
		min-height: 100%;
		padding: 15px 0;
		margin-left: 20px;
		background: #fff;
		overflow-y: hidden;
	}

	.btn1 {
		margin-left: 15px;
	}

	.el-pagination {
		text-align: right;
	}

	.home-form {
		margin: 0 0 20px 0;
		padding-bottom: 8px;
		border-bottom: 1px solid #EBEEF5;

	}

	#return {
		padding: 10px 15px;
		margin-bottom: 15px;
		color: #000;
		background: rgb(245, 246, 247);

		span {
			cursor: pointer;

			&:hover {
				color: #075DB3;
			}
		}

	}

	/deep/ .el-table th {
		background-color: #f4f4f5 !important;
		padding: 8px 5px !important;
	}

	/deep/.cell {
		.el-tag {
			cursor: pointer;
			margin-right: 10px;
			padding: 0 4px !important;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	[class^=el-icon-] {
		margin-right: 5px;
		font-size: 16px;
	}

	/deep/.ant-form-item {
		display: flex;
		margin-bottom: 10px !important;

		/deep/.ant-form-item-label {
			width: 80px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-align: left;
		}

		/deep/.ant-form-item-control-wrapper {
			flex: 1;
		}
	}

	/deep/.el-table td,
	/deep/.el-table th {
		padding: 5px;
	}

	/deep/.el-table th.is-leaf {
		background: #fafafa;
	}

	.el-pagination {
		margin-top: 10px;
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

	.el-font {
		font-size: 22px;
		margin-right: 5px;

		&:last-child {
			margin-right: 0;
		}
	}

	.el-button {
		padding: 10px 12px !important;
	}

	.pointer {
		cursor: pointer;
	}
</style>
