<template>
	<div class="content">
		<div class="h2">楼宇管理</div>
		<div id="components-form-demo-advanced-search">
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字">
							<a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" />
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="年级">
							<!-- <a-input class="field-right" placeholder="请选择年级" v-decorator="[`grade`]" /> -->
							<a-date-picker mode="year" placeholder="请选择年级" format="YYYY" :value="gradeYear" :open="yearPickShow"
							 @panelChange="handlePanelChange" @openChange="handleOpenChange" @change="yearChange" style="width: 100%;"/>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="班级">
							<a-select :allowClear="true" v-decorator="[`classID`]" placeholder="全部" optionFilterProp="children" showSearch>
								<a-select-option v-for="(item, index) in ClassList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="部门">
							<a-select :allowClear="true" v-decorator="[`departCode`]" placeholder="全部" optionFilterProp="children"
							 showSearch>
								<a-select-option v-for="(item, index) in DepartCodeList" :key="index" :value="item.Code">{{ item.Name }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="8" style="margin-top:4px;">
						<a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
						<a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">重置</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<el-button-group>
			<el-button type="primary" size="small" icon="el-icon-plus" @click="addList">新增</el-button>
			<el-button type="info" size="small" icon="el-icon-upload2" @click="importData">导入</el-button>
			<el-button type="success" size="small" icon="el-icon-check" @click="updataList">同步学生信息</el-button>
		</el-button-group>
		<div style="margin-top: 20px;">
			<el-table :data="data" v-loading="loading" border :max-height="tableHeight" highlight-current-row style="width: 100%;"
			 :height="layoutHeight">
				<el-table-column prop="Name" label="名称" min-width="100" fixed="left">
					<template slot-scope="scope">
						<i :title="scope.row.Sex==1?'男':'女'" :class="{'iconfont':true, 'icon-xingbienan':scope.row.Sex==1,'icon-xingbienv':scope.row.Sex==2}"
						 :style="{'color': scope.row.Sex==1?'blue':'red'}" @click="deleteList(scope.row)"></i>{{ scope.row.Name }}
					</template>
				</el-table-column>
				<el-table-column prop="UserNo" label="校区" min-width="100"></el-table-column>
				<!-- <el-table-column prop="ClassName" label="年级/班级" min-width="140">
					<template slot-scope="scope">
						<a-tag color="cyan">{{ scope.row.Grade }}</a-tag>
						<a-tag color="green">{{ scope.row.ClassName }}</a-tag>
					</template>
				</el-table-column> -->
				<el-table-column prop="DepartName" label="时间" min-width="120"></el-table-column>
				<el-table-column prop="IsEnable" label="状态">
					<template slot-scope="scope">
						<a-tag :color="scope.row.IsEnable ? 'green' : 'pink'">{{ scope.row.IsEnable ? '启用' : '停用' }}</a-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="110" fixed="right">
					<template slot-scope="scope">
						<a-popover title="修改">
							<i class="el-font el-icon-edit-outline" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
						</a-popover>
						<a-popover title="删除">
							<i class="el-font el-icon-delete" style="color: red;" @click="deleteList(scope.row)"></i>
						</a-popover>
						<a-popover title="禁用">
							<i class="el-font el-icon-switch-button" style="color: #909399" @click="deleteList(scope.row)"></i>
						</a-popover>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
			 :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total"></el-pagination>
		</div>
		<add :text="text" :DepartCodeList="DepartCodeList" :ClassList="ClassList" v-show="addIf" @closeFun="closeFun"></add>
		<a-modal title="提示" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
			<a-form :form="updateForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
				<a-form-item label="学号">
					<a-input v-decorator="['userNo', { rules: [{ required: true, message: '请输入输入学生学号' }] }]" />
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
	import add from './add';
	import Func from '@/utils/func';
	import moment from 'moment'
	import {
		GetStudentListManage,
		DeleteStudent,
		GetDepartList,
		GetClassList,
		CoreUpdateStudent
	} from '@/api/follow';
	const data = [];
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
				pages: {
					pageIndex: 1,
					pageSize: 20
				},
				tableHeight: parseFloat(window.innerHeight - 160),
				ClassList: [],
				DepartCodeList: [],
				layoutHeight: window.innerHeight - 460 + 'px',
			};
		},
		computed: {},
		created() {
			this.getList();
			this.getOtherList()
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
				e.preventDefault();
				this.form.validateFields((error, values) => {
					this.pagination.currentPage = 1;
					this.values = values;
					if (this.gradeYear) {
						this.values.grade = this.gradeYear
					}
					this.getList();
				});
			},
			handleReset() {
				this.form.resetFields();
				this.values = {};
				this.gradeYear = null
				this.getList();
			},
			handleSizeChange(val) {
				this.pagination.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.pagination.currentPage = val;
				this.getList();
			},
			async getList() {
				this.loading = true;
				let data = {};
				if (this.values) {
					data = this.values;
				}
				data.pageIndex = this.pagination.currentPage;
				data.pageSize = this.pagination.pageSize;
				let res = await GetStudentListManage(data);
				this.loading = false;
				this.data = res.data.data;
				const pagination = { ...this.pagination
				};
				pagination.total = res.data.pageInfo.TotalItemCount;
				this.pagination = pagination;
			},
			async getOtherList() {
				let res = await GetClassList()
				this.ClassList = res.data.data
				let res1 = await GetDepartList()
				this.DepartCodeList = res1.data.data

			},
			addList() {
				this.text = {};
				this.addIf = !this.addIf;
			},
			updataList() {
				this.visible = true
			},
			async importData() {
				// let res = await uploadFun(data)
				// this.$message.success(res.data.msg)
			},
			async handleOk(e) {
				e.preventDefault();
				this.updateForm.validateFields(async (err, values) => {
					if (!err) {
						this.confirmLoading = true;
						console.log(values)
						let data = {}
						data = values
						let res = await CoreUpdateStudent(data);
						if (res.code == 1) {
							this.$message.success(res.data.msg);
							this.visible = false;
							this.confirmLoading = false;
						} else {
							this.$message.error(res.data.msg);
							this.visible = false;
							this.confirmLoading = false;
						}
					}
				});
			},
			handleCancel(e) {
				this.visible = false;
			},
			modifyList(text) {
				text = Object.assign(text, {
					time: new Date()
				});
				this.addIf = !this.addIf;
				this.text = text;
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
						let res = await DeleteStudent(data);
						if (res.data.code == 0) {
							that.getList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				});
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
				});
			},
			closeFun() {
				this.addIf = false;
				this.getList()
			}
		}
	};
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
