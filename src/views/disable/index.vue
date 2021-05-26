<template>
  <div class="content">
    <div class="h2">楼宇教室禁用管理</div>
    <div id="components-form-demo-advanced-search">
      <a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="禁用类型">
              <a-select :allowClear="true" v-decorator="['type']" placeholder="请选择禁用类型" optionFilterProp="children" showSearch>
                <a-select-option v-for="(item, index) in typeList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="教学楼">
              <a-select :allowClear="true" v-decorator="['buildingID']" placeholder="请选择教学楼" optionFilterProp="children"
                        showSearch
              >
                <a-select-option v-for="(item, index) in buildingList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="教室">
              <a-select :allowClear="true" v-decorator="['classID']" placeholder="请选择教室" optionFilterProp="children"
                        showSearch
              >
                <a-select-option v-for="(item, index) in classroomList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="日期">
              <a-range-picker style="width: 100%;" v-decorator="[`date`]" />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="8">
            <a-form-item label="节次">
              <a-slider range :min="JCMin" :max="JCMax" v-decorator="[`JC`]" />
            </a-form-item>
          </a-col> -->
          <a-col :span="8" style="margin-top:4px;">
            <a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
            <a-button @click="handleReset" class="btn1">重置</a-button>
						<a-button type="primary" icon="plus" @click="addList">新增</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- <el-button-group>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addList">新增</el-button>
    </el-button-group> -->
    <div style="margin-top: 20px;">
      <el-table ref="tableForm" :data="data" v-loading="loading" style="width: 100%;margin-bottom: 20px;" border :max-height="tableHeight"
                highlight-current-row
      >
        <el-table-column prop="Name" label="名称" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Code" label="编号" min-width="120"></el-table-column>
        <el-table-column prop="AddTime" label="禁用类型" min-width="100">
          <template slot-scope="scope">
						<a-tag color="red" v-if="scope.row.BorC === 'building'">楼宇</a-tag>
						<a-tag color="orange" v-else>教室</a-tag>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="日期" min-width="260">
          <template slot-scope="scope">
            {{ scope.row.StartDate }} ~ {{ scope.row.EndDate }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="Name" label="节次" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.StartJC }} ~ {{ scope.row.EndJC }}节
          </template>
        </el-table-column> -->
        <el-table-column prop="Remarks" label="备注" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="82" fixed="right">
          <template slot-scope="scope">
            <a-popover title="修改">
              <i class="el-font el-icon-edit-outline" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
            </a-popover>
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
    <add :text="text" :nowTime="nowTime" :buildingList="buildingList" :classroomList="classroomList" v-show="addIf"
         @closeFun="closeFun"
    ></add>
  </div>
</template>

<script>
	import moment from 'moment'
	import add from './add'
	import {
		GetForbbidenBorCPageList,
		DoDeleteForbbidenBorC,
		GetAllBuildingList,
		GetAllClassRoomList
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
				departmentList: [],
				worklist: [],
				loading: false,
				values: {},
				pages: {
					pageIndex: 1,
					pageSize: 20
				},
				tableHeight: parseFloat(window.innerHeight - 530),
				buildingList: [],
				classroomList: [],
				typeList: [{
					Name: '教室',
					ID: 'classroom'
				}, {
					Name: '楼宇',
					ID: 'building'
				}],
				JCMin: this.global.JCList[0],
				JCMax: this.global.JCList[1],
				nowTime: ''
			}
		},
		computed: {},
		created() {
			this.getDataInfo()
			if (this.$route.query.buildingID) {
				this.$nextTick(() => {
				   this.form.setFieldsValue({buildingID: this.$route.query.buildingID})
				})
				this.values.buildingID = this.$route.query.buildingID
			}
			if (this.$route.query.classID) {
				this.$nextTick(() => {
				   this.form.setFieldsValue({classID: this.$route.query.classID})
				})
				this.values.classID = this.$route.query.classID
			}
			this.getList()
		},
		mounted() {},
		methods: {
			moment,
			handleSearch(e) {
				e.preventDefault()
				this.form.validateFields((error, values) => {
					this.pagination.currentPage = 1
					if (values.date.length > 0) {
						values.StartDate = moment(values.date[0]._d).format('YYYY-MM-DD') + 'T00:00:00.000Z'
						values.EndDate = moment(values.date[1]._d).format('YYYY-MM-DD') + 'T00:00:00.000Z'
					}
					// if (values.JC) {
					// 	values.StartJC = values.JC[0]
					// 	values.EndJC = values.JC[1]
					// }
					delete values.date
					// delete values.JC
					this.values = values
					this.getList()
				})
			},
			async getDataInfo() {
				let building = await await GetAllBuildingList({
					name: ''
				})
				this.buildingList = building.data.data
				let classroom = await GetAllClassRoomList({
					name: ''
				})
				this.classroomList = classroom.data.data
			},
			handleReset() {
				this.form.resetFields()
				// this.$nextTick(() => {
				//    this.form.setFieldsValue({JC: [1, null]})
				// })
				this.values = {}
				this.getList()
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
			async getList() {
				this.data = []
				this.loading = true
				let data = {}
				if (this.values) {
					data = this.values
				}
				data.pageIndex = this.pagination.currentPage
				data.pageSize = this.pagination.pageSize
				let res = await GetForbbidenBorCPageList(data)
				this.loading = false
				this.data = res.data.data
				const pagination = { ...this.pagination
				}
				pagination.total = res.data.totalCount
				this.pagination = pagination
			},
			toTree(data) {
				let result = []
				let map = {}
				if (!Array.isArray(data)) {
					// 验证data是不是数组类型
					return []
				}
				data.forEach(item => {
					// 建立每个数组元素id和该对象的关系
					map[item.Code] = item // 这里可以理解为浅拷贝，共享引用
				})
				data.forEach(item => {
					let parent = map[item.ParentCode] // 找到data中每一项item的爸爸
					if (parent) {
						// 说明元素有爸爸，把元素放在爸爸的children下面
						(parent.children || (parent.children = [])).push(item)
					} else {
						// 说明元素没有爸爸，是根节点，把节点push到最终结果中
						result.push(item) // item是对象的引用
					}
				})
				return result // 数组里的对象和data是共享的
			},
			addList() {
				this.text = {}
				this.addIf = !this.addIf
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
					content: `您确定删除该禁用数据吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await DoDeleteForbbidenBorC(data)
						if (res.data.code === 0) {
							that.getList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			handleCancel(e) {
				this.visible = false
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
		margin-right: 8px;
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
