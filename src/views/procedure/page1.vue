<template>
  <div class="content">
    <div id="components-form-demo-advanced-search">
      <a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="申请人">
              <a-input class="field-right" placeholder="请输入申请人名称" v-decorator="[`name`]" autocomplete="off" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="校区">
              <a-select :allowClear="true" v-decorator="['schoolID']" placeholder="请选择校区" optionFilterProp="children" showSearch
                        @change="getAllBuildingList"
              >
                <a-select-option v-for="(item, index) in schoolList" :key="index" :value="item.ID">{{ item.XQM }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="教学楼">
              <a-select :allowClear="true" v-decorator="['buildingID']" placeholder="请选择教学楼" optionFilterProp="children" showSearch
                        @change="getAllClassRoomList"
              >
                <a-select-option v-for="(item, index) in buildingList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="教室">
              <a-select :allowClear="true" v-decorator="['classID']" placeholder="请选择教室" optionFilterProp="children" showSearch>
                <a-select-option v-for="(item, index) in classroomList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="申请日期">
              <a-range-picker style="width: 100%;" v-decorator="[`date`]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="节次">
              <a-input-number :min="JCMin" :max="JCMax" v-decorator="[`StartJC`]" @blur="numberChange(1)" style="width: 45.5%;"/> ~  <a-input-number style="width: 45.5%;" :min="JCMin" :max="JCMax" v-decorator="[`EndJC`]" @blur="numberChange(2)"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" style="margin-top: 4px;">
            <a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div style="margin-top: 20px;">
      <el-table ref="tableForm" :data="data" v-loading="loading" border :max-height="tableHeight" highlight-current-row
                style="width: 100%;"
      >
        <el-table-column prop="ActName" label="活动类型" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ActContent" label="活动内容" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Unity" label="举办单位" min-width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="StudentName" label="申请人" min-width="120"></el-table-column>
        <el-table-column prop="Phone" label="手机号" min-width="120"></el-table-column>
        <el-table-column prop="ApplyTime" label="申请日期" min-width="168"></el-table-column>
        <el-table-column prop="IsEnable" label="节次" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.StartJC }} ~ {{ scope.row.EndJC }} 节
          </template>
        </el-table-column>
        <el-table-column label="操作" width="88" fixed="right">
          <template slot-scope="scope">
            <a-popover title="审批">
              <i class="el-font el-icon-coordinate" style="color: #E6A23C;" @click="examine(scope.row)"></i>
            </a-popover>
            <a-popover title="修改">
              <i class="el-font el-icon-edit-outline" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
            </a-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
                     :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.total"
      ></el-pagination>
    </div>
    <add :text="text" :schoolList="schoolList" :nowTime="nowTime" v-show="addIf" @closeFun="closeFun"></add>
    <examine :text="text" v-show="visible" :nowTime="nowTime" @closeFun="closeFun"></examine>
  </div>
</template>

<script>
	import add from '../../components/examine/index.vue'
	import examine from '../../components/examine/examine.vue'
	import moment from 'moment'
	import {
		GetAdminApplyPageList2,
		DeleteStudent,
		GetAllSchoolList,
		GetAllBuildingList,
		GetAllClassRoomList
	} from '@/api/follow'
	const data = []
	export default {
		components: {
			add,
			examine
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
				JCMin: this.global.JCList[0],
				JCMax: this.global.JCList[1],
				pages: {
					pageIndex: 1,
					pageSize: 20
				},
				tableHeight: parseFloat(window.innerHeight - 530),
				ClassList: [],
				DepartCodeList: [],
				layoutHeight: window.innerHeight - 460 + 'px',
				examineID: '',
				buildingList: [],
				classroomList: [],
				schoolList: [],
				nowTime: ''
			}
		},
		computed: {},
		created() {
			this.getList()
			this.getAllSchoolList()
		},
		mounted() {},
		methods: {
			moment,
			handleSearch(e) {
				e.preventDefault()
				this.form.validateFields((error, values) => {
					this.pagination.currentPage = 1
					this.values = values
					if (values.date !== undefined && values.date.length > 0) {
						values.applyStartDate = moment(values.date[0]._d).format('YYYY-MM-DD') + 'T00:00:00.000Z'
						values.applyEndDate = moment(values.date[1]._d).format('YYYY-MM-DD') + 'T00:00:00.000Z'
					}
					delete values.date
					this.getList()
				})
			},
			numberChange(type) {
				this.form.validateFields((error, values) => {
					if (values.StartJC > values.EndJC) {
						this.form.setFieldsValue({EndJC: this.JCMax})
					}
				})
			},
			handleReset() {
				this.form.resetFields()
				this.values = {}
				this.getList()
				this.buildingList = []
				this.classroomList = []
				this.schoolList = []
			},
			handleSizeChange(val) {
				this.pagination.pageSize = val
				this.getList()
			},
			handleCurrentChange(val) {
				this.pagination.currentPage = val
				this.$refs.tableForm.bodyWrapper.scrollTop = 0
				this.getList()
			},
			async getAllSchoolList() {
				let res = await GetAllSchoolList()
				this.schoolList = res.data.data
			},
			async getAllBuildingList(e) {
				if(e){
					let res = await GetAllBuildingList({xqID: e})
					this.buildingList = res.data.data
				}else{
					this.form.setFieldsValue({buildingID: ''})
					this.buildingList = []
					this.form.setFieldsValue({classID: ''})
					this.classroomList = []
				}
			},
			async getAllClassRoomList(e) {
				if(e){
					let res = await GetAllClassRoomList({buildingID: e})
					this.classroomList = res.data.data
				}else{
					this.form.setFieldsValue({classID: ''})
					this.classroomList = []
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
				data.state = '1'
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
				this.nowTime = ''
				this.addIf = !this.addIf
			},
			examine(text) {
				this.text = text
				this.nowTime = moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
				this.visible = true
			},
			handleCancel(e) {
				this.visible = false
			},
			modifyList(text) {
				text = Object.assign(text, {
					time: new Date()
				})
				this.nowTime = moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
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
			closeFun(type) {
				this.addIf = false
				this.visible = false
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
		background: #fff;
		overflow-y: hidden;
		margin-left: 0 !important;
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
