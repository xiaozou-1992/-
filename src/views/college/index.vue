<template>
  <div class="content">
    <div class="h2">学院审批人管理</div>
    <div id="components-form-demo-advanced-search">
      <a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="姓名">
              <a-input class="field-right" placeholder="请输入姓名" v-decorator="[`name`]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="工号/学号">
              <a-input class="field-right" placeholder="请输入工号 / 学号" v-decorator="[`userNo`]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="所属部门">
              <a-select placeholder="请输入部门" showSearch v-decorator="[`departID`]" optionFilterProp="children" @search="fetchDepart"
                        :filterOption="filterOption"
              >
                <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                <a-select-option v-for="(item, index) in departList" :key="item.ID">{{ item.Name }}</a-select-option>
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
      <!-- <el-button type="info" size="small" icon="el-icon-upload2" @click="importData">导入</el-button>
			<el-button type="success" size="small" icon="el-icon-check" @click="updataList">同步学生信息</el-button> -->
    </el-button-group>
    <div style="margin-top: 20px;">
      <el-table :data="data" v-loading="loading" border :max-height="tableHeight" highlight-current-row
                style="width: 100%;"
      >
        <el-table-column prop="Name" label="姓名" min-width="130"></el-table-column>
        <el-table-column prop="UserNo" label="工号 / 学号" min-width="130"></el-table-column>
        <el-table-column prop="Sfzh" label="身份证后六位" min-width="130"></el-table-column>
        <el-table-column prop="DepartName" label="所属部门" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Phone" label="电话" min-width="130"></el-table-column>
        <el-table-column prop="AddTime" label="用户类型" min-width="100">
          <template slot-scope="scope">
            <a-tag color="pink">{{ scope.row.Type === 1?'老师':'学生' }}</a-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="62" fixed="right">
          <template slot-scope="scope">
            <!-- <a-popover title="修改">
              <i class="el-font el-icon-edit-outline" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
            </a-popover> -->
            <a-popover title="删除">
              <i class="el-font el-icon-delete" style="color: red;" @click="deleteList(scope.row)"></i>
            </a-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
                     :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.total"
      ></el-pagination>
    </div>
    <add :text="text" v-show="addIf" @closeFun="closeFun"></add>
  </div>
</template>

<script>
	import add from './add'
	import moment from 'moment'
	import {
		GetDepartChargerPageList,
		DeleteDepartCharger,
		GetDepartAllList
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
				fetching: false,
				values: {},
				pages: {
					pageIndex: 1,
					pageSize: 20
				},
				tableHeight: parseFloat(window.innerHeight - 160),
				ClassList: [],
				DepartCodeList: [],
				departList: [],
				layoutHeight: window.innerHeight - 460 + 'px'
			}
		},
		computed: {},
		created() {
			this.getList()
		},
		mounted() {},
		methods: {
			moment,
			handleSearch(e) {
				e.preventDefault()
				this.form.validateFields((error, values) => {
					this.pagination.currentPage = 1
					this.values = values
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
			filterOption(input, option) {
				return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			},
			async fetchDepart(value) {
				this.fetching = true
				if (value) {
					let data = {}
					data.name = value
					let res = await GetDepartAllList(data)
					this.fetching = false
					this.departList = res.data.data || []
				}
			},
			async getList() {
				this.loading = true
				let data = {}
				if (this.values) {
					data = this.values
				}
				data.pageIndex = this.pagination.currentPage
				data.pageSize = this.pagination.pageSize
				let res = await GetDepartChargerPageList(data)
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
			async importData() {
				// let res = await uploadFun(data)
				// this.$message.success(res.data.msg)
			},
			handleCancel(e) {
				this.visible = false
			},
			deleteList(text) {
				let that = this
				this.$confirm({
					title: '提示',
					content: `您确定删除该审批人吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ChargerDepart
						data.charger = text.ID
						let res = await DeleteDepartCharger(data)
						if (res.data.code === 0) {
							that.getList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			closeFun(type) {
				this.addIf = false
				if (type === '1') {
					this.getList()
				}
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
