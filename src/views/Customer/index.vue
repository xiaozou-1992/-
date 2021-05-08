<template>
  <div>
    <div id="components-form-demo-advanced-search">
      <div class="head">
        <p>搜索条件</p>
      </div>
      <a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="关键字">
              <a-input class="field-right" placeholder="请输入客户名称、手机号、单位、职务、地址搜索" v-decorator="[`key`]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="客户类型">
              <a-select :allowClear="true" v-decorator="['TypeID']" placeholder="全部" optionFilterProp="children" showSearch>
                <a-select-option v-for="(item, index) in departmentList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="8" style="margin-top:4px;">
            <a-button type="primary" html-type="submit" class="btn1">
              搜索
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">
              重置
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="option">
      <a-button type="primary" class="btn" @click="addWorker">新增</a-button>
    </div>
    <div>
      <el-table :data="data" v-loading="loading" border :max-height="tableHeight" highlight-current-row
                style="width: 100%;"
      >
        <el-table-column prop="Name" label="客户名称" min-width="100"></el-table-column>
        <el-table-column prop="TypeName" label="客户类型" min-width="100"></el-table-column>
        <el-table-column prop="Salesman" label="业务员" min-width="100"></el-table-column>
        <el-table-column prop="Phone" label="手机号" min-width="120"></el-table-column>
        <el-table-column prop="Company" label="单位" min-width="100"></el-table-column>
        <el-table-column prop="Job" label="职务" min-width="80"></el-table-column>
        <el-table-column prop="Address" label="地址" ></el-table-column>
        <el-table-column prop="Email" label="邮箱" min-width="100"></el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <i title="修改" class="iconfont icon-editor1" style="color: #1890FF;" @click="modifyWorker(scope.row,'modify')"></i>
            <!-- <a-icon title="修改" @click="modifyWorker(scope.row)" style="color: #1890FF;font-size: 1.2rem;" type="form" /> -->
            <i title="删除" class="iconfont icon-delete" style="color: red;" @click="deleteWorker(scope.row)" ></i>
            <!-- <a-icon title="删除" :style="{ marginRight:'5px',marginLeft:'10px',color:'red','font-size':'1.2rem' }" @click="deleteWorker(scope.row)" type="delete" /> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
                     :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.total"
      ></el-pagination>
    </div>
    <!-- <div class="foot">
			<p>Copyright 2019-2029 © 安财信科 ACThink.net</p>
		</div> -->
    <a-modal title="提示" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
      <p>确定删除这条记录吗?</p>
    </a-modal>
    <add :text="text" :departmentList="departmentList" :worklist="worklist" v-show="addIf" @closeFun="closeFun"></add>
  </div>
</template>

<script>
	import add from './add'
	import Func from '@/utils/func'
	import Cache from '@/utils/cache'
	import {
		getCustomerType,
		getCustomerList,
		deleteCustomer,
		getWorker
	} from '@/api/follow'

	const columns = [
	  {
	    title: 'ID',
	    dataIndex: 'ID',
	    key: '0'
	  },
	  {
	    title: '客户名称',
	    dataIndex: 'Name',
	    key: '1'
	  },
	  {
	    title: '客户类型',
	    dataIndex: 'TypeName',
		scopedSlots: {
		  customRender: 'TypeName'
		},
	    key: '2'
	  },
	  {
	    title: '手机号',
	    dataIndex: 'Phone',
	  		scopedSlots: {
	  		  customRender: 'Phone'
	  		},
	    key: '3'
	  },
	  {
	    title: '单位',
	    dataIndex: 'Company',
		scopedSlots: {
		  customRender: 'Company'
		},
	    key: '4'
	  },
	  {
	    title: '职务',
	    dataIndex: 'Job',
		scopedSlots: {
		  customRender: 'Job'
		},
	    key: '5'
	  },
	  {
	    title: '地址',
	    dataIndex: 'Address',
		scopedSlots: {
		  customRender: 'Address'
		},
	    key: '6'
	  },
	  {
	    title: '邮箱',
	    dataIndex: 'Email',
		scopedSlots: {
		  customRender: 'Email'
		},
	    key: '7'
	  },
	  {
	    title: '操作',
	    key: 'action',
	    scopedSlots: { customRender: 'action' }
	  }
	]
	const data = []
	export default {
		components: {
		  add
		},
		data() {
			return {
				data,
				columns,
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
				tableHeight: parseFloat(window.innerHeight - 160)
			}
		},
		computed: {

		},
		created() {
			// this._getCustomerType()
			// this._getWorker()
			// this._getWorkerList()
		},
		mounted() {

		},
		methods: {
			// async _getWorkerList() {
			// 	let res = await getWorker()
			// 	// this.worklist = res.data.data;
			// 	res.data.data.map((value, index, arry) => {
			// 		this.worklist.push({
			// 			'ID': value.worker.ID,
			// 			'Name': value.worker.Name
			// 		})
			// 	})
			// },
			handleSearch(e) {
			  e.preventDefault()
			  this.form.validateFields((error, values) => {
				this.pagination.currentPage = 1
				this.values = values
				this._getWorker()
			  })
			},
			handleReset() {
			  this.form.resetFields()
			  this.values = {}
			  this._getWorker()
			},
			handleSizeChange(val) {
				this.pagination.pageSize = val
				this._getWorker()
			},
			handleCurrentChange(val) {
				this.pagination.currentPage = val
				this._getWorker()
			},
			async _getCustomerType() {
				
				let res1 = await getCustomerType()
				this.departmentList = res1.data.data
			},
			async _getWorker() {
				this.loading = true
				let data = { }
				if (this.values) {
					data = this.values
				}
				data.pageIndex = this.pagination.currentPage
				data.pageSize = this.pagination.pageSize
				let res = await getCustomerList(data)
				this.loading = false
				this.data = res.data.data
				const pagination = { ...this.pagination
				}
				pagination.total = res.data.totalCount
				this.pagination = pagination
			},
			addWorker() {
				this.text = {}
				this.addIf = !this.addIf
			},
			modifyWorker(text) {
				text = Object.assign(text, {time: new Date()})
				this.addIf = !this.addIf
				this.text = text
			},
			deleteWorker(text) {
				this.visible = true
				this.itemId = text.ID
			},
			async handleOk(e) {
			  this.confirmLoading = true
			  let id = this.itemId
			  let res = await deleteCustomer(id)
			  if (res.data.code === 1) {
			    this.visible = false
			    this.confirmLoading = false
			    this.$message.success(res.data.msg)
			    this._getWorker()
			  } else {
			    this.$message.error(res.data.msg)
			  }
			},
			handleCancel(e) {
			  this.visible = false
			},
			closeFun() {
				this.addIf = false
				this._getWorker()
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.ant-form-item {
	  display: flex;
	  margin-bottom: 10px!important;

	  /deep/.ant-form-item-label {
	    width: 80px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
		text-align:right;
	  }
	  /deep/.ant-form-item-control-wrapper{
		  flex:1;
	  }
	}
	/deep/.ant-table-thead>tr>th,
	/deep/.ant-table-tbody>tr>td {
		padding: 5px;
	}
	/deep/.ant-table-pagination.ant-pagination{
		float:left;
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
	/deep/.ant-table-tbody .ant-table-row-cell-break-word:nth-child(2){
		position:relative;
		.con{
			position:absolute;
			top:40px;
			left:0px;
			z-index:999;
			background:#fff;
			width:96%;
			padding:1% 2%;
		}
	}
	.option{
		margin-top:10px;
		margin-bottom:20px;
		overflow:hidden;
	}
	.option .btn{
		height:36px;
		line-height:36px;
		padding:0 10px;
		float:left;
		background:#1890FF;
		color:#fff;
		margin-right:10px;
		border-radius:3px;
		cursor:pointer;
		border:none;
	}
	.foot{
		text-align:center;
		margin-top:100px;
	}
	.el-pagination {
		margin-top: 10px;
	}

</style>
