<template>
  <div class="aid">
    <div class="base">
      <p class="fixed-top">
        {{ JSON.stringify(text) == '{}' ? '新增客户' : '修改客户' }}
        <a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
      </p>
      <div class="main" id="new_message">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="客户姓名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input placeholder="请输入客户姓名" v-decorator="['Name', { rules: [{ required: true, message: '请填写用户名' }] }]" />
          </a-form-item>
          <a-form-item label="客户分类" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select
              placeholder="请选择客户分类"
              v-decorator="['TypeID', { rules: [{ required: true, message: '请选择分类' }] }]"
              optionFilterProp="children"
              showSearch
            >
              <a-select-option v-for="(item, index) in departmentList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="业务员来源" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-radio-group name="radioGroup" @change="radioOnChange" v-decorator="['SalesmanType', { rules: [{ required: true, message: '请选择业务员来源' }] }]">
              <a-radio :value="1">经销商端</a-radio>
              <a-radio :value="2">办事处端</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="业务员" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select
              placeholder="请选择业务员"
              v-decorator="['Salesman', { rules: [{ required: true, message: '请选择业务员' }] }]"
              optionFilterProp="children"
              showSearch
            >
              <a-select-option v-for="(item, index) in salesmanlist" :key="index" :value="item.Name">{{ item.Name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="手机号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input
              placeholder="请输入手机号"
              v-decorator="['Phone', { rules: [{ required: true, pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号' }] }]"
            />
          </a-form-item>
          <a-form-item label="单位" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"><a-input placeholder="请输入单位信息" v-decorator="['Company']" /></a-form-item>
          <a-form-item label="职位" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"><a-input placeholder="请输入职位信息" v-decorator="['Job']" /></a-form-item>
          <a-form-item label="地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"><a-input placeholder="请输入地址信息" v-decorator="['Address']" /></a-form-item>
          <a-form-item label="邮箱" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"><a-input placeholder="请输入邮箱" v-decorator="['Email']" /></a-form-item>
          <a-form-item class="fixed-bottom"><a-button type="primary" html-type="submit" class="btn2">确定</a-button></a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import Cache from '@/utils/cache'
import { DoAddCustomer, UpdateCustomer, getWorker, GetUserByDepart } from '@/api/follow'
export default {
	props: {
		text: Object,
		departmentList: Array
		// worklist: Array
	},
	watch: {
		text: function(text) {
			// this._getWorkerList()
			if (!text) {
				text = {}
			}
			let roleList = []
			if (JSON.stringify(text) != '{}') {
				this.$nextTick(() => {
					this.form.setFieldsValue({
						Name: text.Name,
						Company: text.Company,
						Job: text.Job,
						Phone: text.Phone,
						Email: text.Email,
						Address: text.Address,
						Roles: roleList,
						ID: text.ID,
						TypeID: text.TypeID,
						SalesmanType: text.SalesmanType,
						Salesman: text.Salesman
					})
				})
				for (let i = 0; i < text.length; i++) {
					roleList.push(text[i].ID)
				}
			} else {
				this.$nextTick(() => {
					this.form.setFieldsValue({
						Name: text.Name,
						Company: text.Company,
						Job: text.Job,
						Phone: text.Phone,
						Email: text.Email,
						Address: text.Address,
						Roles: roleList,
						ID: text.ID,
						TypeID: text.TypeID,
						SalesmanType: 1,
						Salesman: Cache.get('info').Name
					})
				})
			}
			let departmentList = []
			if (text.departmentList) {
				for (let i = 0; i < text.departmentList.length; i++) {
					departmentList.push(text.departmentList[i].ID)
				}
			}
		}
	},
	async created() {
		// await this._getWorkerList()
	},
	data() {
		return {
			formLayout: 'horizontal',
			form: this.$form.createForm(this, { name: 'coordinated' }),
			salesmansourcelist: [{ ID: 1, Name: '经销商端' }, { ID: 2, Name: '办事处端' }],
			salesmanlist: [],
			worklist: [],
			departlist: [],
			selecttype: 1
		}
	},
	methods: {
		// async _getWorkerList() {
		// 	let res = await getWorker()
		// 	// this.worklist = res.data.data;
		// 	if (this.worklist.length == 0) {
		// 		res.data.data.map((value, index, arry) => {
		// 			this.worklist.push({
		// 				ID: value.worker.ID,
		// 				Name: value.worker.Name
		// 			})
		// 		})
		// 		let Dealer = { ID: Cache.get('info').DealerID, Name: '管理员' }
		// 		this.worklist.unshift(Dealer)
		// 	}
		// 	if (this.selecttype != 2) {
		// 		this.salesmanlist = this.worklist
		// 	} else {
		// 		let data = {}
		// 		data.dealerID = Cache.get('info').DealerID
		// 		let res1 = await GetUserByDepart(data)
		// 		this.salesmanlist = res1.data.data
		// 	}
		// },
		radioOnChange(e) {
			this._getWorkerList()
			this.selecttype = e.target.value
			this.$nextTick(() => {
				this.form.setFieldsValue({
					Salesman: ''
				})
			})
			if (this.selecttype == 1) {
				this.salesmanlist = this.worklist
			} else if (this.selecttype == 2) {
				this._getWorkerList()
				this.salesmanlist = this.departlist
			} else {
				this.salesmanlist = []
			}
		},
		filterOption(input, option) {
			return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
		},
		closeFunction() {
			this.selecttype = 0
			this.worklist = []
			this.$emit('closeFun')
		},
		roleChange(value) {},
		departmentChange(value) {},
		handleSubmit(e) {
			this.$nextTick(() => {
				var container = this.$el.querySelector('#new_message')
				container.scrollTop = 300
			})
			e.preventDefault()
			this.form.validateFields(async (err, values) => {
				if (!err) {
					let data = values
					let res = {}
					if (JSON.stringify(this.text) == '{}') {
						// 新增接口
						res = await DoAddCustomer(data)
						if (res.data.code === 1) {
							this.$message.success('新增成功')
							this.closeFunction()
						} else {
							this.$message.error('新增失败')
						}
					} else {
						// 修改接口
						data.ID = this.text.ID
						res = await UpdateCustomer(data)
						if (res.data.code === 1) {
							this.$message.success('修改成功')
							this.closeFunction()
						} else {
							this.$message.error('修改失败')
						}
					}
					// 修改接口
				}
			})
			this.$nextTick(() => {
				var container = this.$el.querySelector('#new_message')
				container.scrollTop = 300
			})
		}
	}
}
</script>

<style lang="less" scoped>
.aid {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	top: 0px;
	left: 0px;
	z-index: 999;
}

.base {
	position: absolute;
	width: 600px;
	height: 540px;
	background: #fff;
	left: 50%;
	margin-left: -300px;
	top: 50%;
	margin-top: -270px;
	overflow-y: auto;
	.main {
		height: 90%;
		overflow-y: scroll;
	}
	/deep/.ant-form-item {
		margin: 20px 50px;
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
	border: 1px solid #dad9dc;
	margin-left: 20px;
}

.ant-form-item {
	margin-bottom: 10px;
}

.btn2 {
	display: -moz-box;
	-moz-box-pack: center;
	-moz-box-align: center;

	/* Safari、Opera 以及 Chrome */
	display: -webkit-box;
	-webkit-box-pack: center;
	-webkit-box-align: center;

	/* W3C */
	display: box;
	box-pack: center;
	box-align: center;
	width: 137px;
	height: 35px;
	border-radius: 3px;
	outline: none;
	border: none;
	margin: 20px auto;
	color: #fff;
}
.fixed-top {
	width: inherit;
	position: absolute;
	line-height: 30px;
	top: 0px;
	background-color: white;
	z-index: 999;
}
.fixed-bottom {
	width: 600px;
	left: -50px;
	bottom: 0px;
	position: absolute;
	background-color: white;
	z-index: 999;
}
/deep/.ant-form {
	margin-top: 50px;
	padding-bottom: 50px;
}
</style>
