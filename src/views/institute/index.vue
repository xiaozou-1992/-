<template>
  <div class="content">
    <div class="h2">学院审批管理</div>
    <div id="components-form-demo-advanced-search">
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
    <div style="margin-top: 20px;">
      <el-table :data="data" style="width: 100%;margin-bottom: 20px;" row-key="Code" border default-expand-all
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="Name" label="部门名称" min-width="360"></el-table-column>
        <el-table-column prop="Code" label="编号" min-width="200">
          <template slot-scope="scope">
            <a-tag color="green">{{ scope.row.Code }}</a-tag>
          </template>
        </el-table-column>
        <el-table-column prop="IsJoin" label="上级编号" min-width="200">
          <template slot-scope="scope">
            <a-tag color="pink">{{ scope.row.ParentCode ? scope.row.ParentCode : '暂无' }}</a-tag>
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

          </template>
        </el-table-column>
      </el-table>
    </div>
    <add :text="text" :ParentList="ParentList" v-show="addIf" @closeFun="closeFun"></add>
    <synchro :text="text" :isFlag="2" v-show="visible" @closeFun="closeFun"></synchro>
  </div>
</template>

<script>
	import add from './add'
	import Func from '@/utils/func'
	import synchro from '../../components/synchro/index.vue'
	import {
		GetDepartList,
		GetDepartListManage,
		DeleteDepart
	} from '@/api/follow'
	const data = []
	export default {
		components: {
			add,
			synchro
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
				tableHeight: parseFloat(window.innerHeight - 160),
				ParentList: []
			}
		},
		computed: {},
		created() {
			this.getList()
			this.getOtherList()
		},
		mounted() {},
		methods: {
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
				this.data = []
				this.loading = true
				let data = {}
				if (this.values) {
					data = this.values
				}
				let res = await GetDepartListManage(data)
				this.loading = false
				// this.data = res.data.data;
				this.data = this.toTree(res.data.data)
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
			async getOtherList() {
				let res = await GetDepartList(data)
				this.ParentList = res.data.data
			},
			addList() {
				this.text = {}
				this.addIf = !this.addIf
			},
			async importData() {
				// let res = await uploadFun(data)
				// this.$message.success(res.data.msg)
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
					content: `您确定删除该部门吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await DeleteDepart(data)
						if (res.data.code == 0) {
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
			updataList() {
				this.visible = true
			},
			closeFun(type) {
				this.addIf = false
				this.visible = false
				if (type === '1') {
					this.getList()
					this.getOtherList()
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
