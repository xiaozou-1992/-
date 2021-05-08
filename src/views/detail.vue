<template>
  <div class="aid">
    <div class="base">
      <div class="option">
        <div class="btn" @click="closeFunction">返回</div>
        <a-button type="primary" class="btn" @click="print()">打印</a-button>
      </div>
      <div id="detail" :class="{ detail: isActive }" ref="detail">
        <div class="head">
          <a-row>
            <a-col :span="8" class="con">
              <div class="tit">{{ text.type=='in'?'入库单号：':'出库单号：' }}</div>
              <div class="cell">{{ detail.No }}</div>
            </a-col>
            <a-col :span="8" class="con">
              <div class="tit">{{ text.type=='in'?'入库时间：':'出库时间：' }}</div>
              <div class="cell">{{ detail.AddTime }}</div>
            </a-col>
            <a-col :span="8" class="con">
              <div class="tit">添加人：</div>
              <div class="cell">{{ detail.AddUserName }}</div>
            </a-col>
          <!-- <a-col :span="8" class="con">
						<div class="tit">备注：</div>
						<div class="cell">{{ detail.Remark }}</div>
					</a-col> -->
          </a-row>
        </div>
        <el-table :data="tableData" border show-summary :summary-method="getSummaries" style="width: 100%">
          <el-table-column prop="ProductName" label="产品名称">
          </el-table-column>
          <el-table-column prop="WarehouseName" label="仓库名称" width="160">
          </el-table-column>
          <el-table-column prop="IsBulk" label="规格" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.IsBulk?'单瓶':'整件' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Num" label="数量" width="100">
          </el-table-column>
          <el-table-column prop="UnitPrice" label="单价" width="100">
          </el-table-column>
          <el-table-column prop="SubTotal" label="小计" width="100">
          </el-table-column>
        </el-table>
        <div class="head">
          <a-row>
            <a-col :span="24" class="con">
              <div class="tit">备注：</div>
              <div class="cell">{{ detail.Remark }}</div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
  </div></template>

<script>
	import Func from '@/utils/func'
	import Cache from '@/utils/cache'
	import {
		getInStorageByID,
		getOutStorageByID
	} from '@/api/follow'
	const data = []
	export default {
		props: {
			text: Object
		},
		watch: {
		  text: async function (text) {
				if (text.type == 'in') {
					let res = await getInStorageByID(text.id)
					this.detail = res.data.data.InStorage
					this.tableData = res.data.data.InStorageItems
				}
				if (text.type == 'out') {
					let res = await getOutStorageByID(text.id)
					this.detail = res.data.data.InStorage
					this.tableData = res.data.data.InStorageItems
				}
			}
		},
		data() {
			return {
				detail: {},
				tableData: [],
				form: this.$form.createForm(this, {
					name: 'advanced_search'
				}),
				visible: false,
				confirmLoading: false,
				loading: false,
				isActive: false
			}
		},
		computed: {

		},
		created() {
			// this._getInStorageByID()
		},
		mounted() {

		},
		methods: {
			print() {
				let that = this
				this.isActive = true
				setTimeout(function() {
					window.print()
					that.isActive = false
				}, 500)
			},
			closeFunction() {
			  this.$emit('closeFun')
			},
			getSummaries(param) {
				const {
					columns,
					data
				} = param
				const sums = []
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '合计'
						return
					}
					if (index === 3 || index === 4 || index === 5) {
						const values = data.map(item => Number(item[column.property]))
						if (!values.every(value => isNaN(value))) {
							sums[index] = values.reduce((prev, curr) => {
								const value = Number(curr)
								if (!isNaN(value)) {
									return prev + curr
								} else {
									return prev
								}
							}, 0)
							// sums[index] += ' 元';
						} else {
							// sums[index] = 'N/A';
						}
					}
				})

				return sums
			},
			async _getInStorageByID(values) {
				let id = this.$route.params.id
				this.loading = true
				let res = await getInStorageByID(id)
				this.loading = false
				this.tableData = res.data.data.datas
			},
			closeFun() {
				this.addIf = false
			},
			seeInvoice(item) {
				// this.addIf = !this.addIf
				// this.text = Object.assign({},{id:item.InStorageID,time:new Date()})
				this.$router.push({
					name: 'detail',
					params: {
						id: item.InStorageID
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.aid {
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  background: white;
	  top: 0px;
	  left: 0px;
	  right:0px;
	  bottom:0px;
	  z-index: 999;
	}

	.base {
	  background:#fff;
	  min-height:100%;
	  overflow-y: auto;
	  padding:10px;
	  .head{
		  margin-bottom:20px;
		  margin-top:20px;
		  border:1px solid #EBEEF5;
			background-color: white;
		  .con{
			  height:50px;
			  line-height:30px;
			  border-right:1px solid #EBEEF5;
			  padding:10px;
			  overflow:hidden;
			  .tit{
				  float:left;
				  width:70px;
			  }
			  .cell{
			  	  float:left;
				  margin-left:10px;
			  }
		  }
		  .con:last-child{
			  border-bottom:none;
		  }
	  }
	  /deep/.ant-table-pagination.ant-pagination{
	  	float:left;
	  	display:none;
	  }
	  /deep/.ant-form-item{
		  margin:20px 50px;
		  /deep/.ant-form-item-label {
		    width: 100px;
		    overflow: hidden;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		  		text-align:left;
		  }
		  /deep/.ant-form-item-control-wrapper{
		  		  flex:1;
		  }
	  }
	}
	.option{
		// float:right;
		margin-top:10px;
		margin-bottom:10px;
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
	.base p {
	  padding: 10px 0 0 10px;
	}

	.subnav {
	  margin-left: 60px;
	  height: 46px;
	  display: flex;
	}

	.subnav p {
	  width: 100px;
	  text-align: right;
	}

	.subnav input {
	  width: 300px;
	  height: 30px;
	  border: 1px solid #DAD9DC;
	  margin-left: 20px;
	}

	.ant-form-item {
	  margin-bottom: 10px;
	}

	.btn2 {
		display:-moz-box;
		-moz-box-pack:center;
		-moz-box-align:center;

		/* Safari、Opera 以及 Chrome */
		display:-webkit-box;
		-webkit-box-pack:center;
		-webkit-box-align:center;

		/* W3C */
		display:box;
		box-pack:center;
		box-align:center;
	  width: 137px;
	  height: 35px;
	  border-radius: 3px;
	  outline: none;
	  border: none;
	  margin: 20px auto;
	  color: #fff;
	}
	.detail {
		width: 100%s;
		position: fixed;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		background: white;
		z-index: 999;
	}
</style>
