<template>
  <div class="aid">
    <div class="base">
      <p class="fixed-top">
        {{ JSON.stringify(text) == '{}' ? '添加学生' : '修改学生' }}
        <a-icon class="icon-close" @click="closeFunction" type="close-circle" />
      </p>
      <div class="main" id="new_message">
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item label="部门" prop="id">
            <a-select placeholder="请输入部门" showSearch @change="departChange" v-model="form.id" optionFilterProp="children"
                      :filterOption="filterOption"
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option v-for="(item, index) in departList" :key="item.ID">{{ item.Name }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="姓名" prop="charger">
            <a-select mode="multiple" placeholder="请输入姓名" showSearch v-model="form.charger" optionFilterProp="children"
                      :filterOption="filterOption"
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option v-for="(item, index) in userList" :key="item.ID">{{ item.Name }} - {{ item.DepartName }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="" class="fixed-bottom">
            <a-button type="primary" @click="handleSubmit">{{ JSON.stringify(text) == '{}' ? '确认添加' : '确认修改' }}</a-button>
            <a-button style="margin-left: 10px;" @click="closeFunction">取消</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
	import moment from 'moment'
	import {
		DoAddDepartCharger,
		UpdateStudent,
		GetDepartAllList,
		GetUserAllList
	} from '@/api/follow'
	export default {
		props: {
			text: Object,
			departList: Array
		},
		watch: {
			text: function(text) {

			}
		},
		data() {
			return {
				fetching: false,
				gradeYear: null,
				yearPickShow: false,
				loading: false,
				userList: [],
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				form: {
					charger: [],
					id: ''
				},
				rules: {
					charger: [{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}],
					id: [{
						required: true,
						message: '请输入部门名称',
						trigger: 'change'
					}]
				}
			}
		},
		created() {
		},
		methods: {
			filterOption(input, option) {
				return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			},
			moment,
			closeFunction(data) {
				this.$emit('closeFun', data)
				this.$refs['ruleForm'].resetFields()
				this.userList = []
			},
			filterOption(input, option) {
				return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			},
			async departChange(e) {
				this.form.charger = []
				let res = await GetUserAllList({departID: e})
				this.userList = res.data.data || []
			},
			async fetchUser(value) {
				this.fetching = true
				if (value) {
					let data = {}
					data.name = value
					let res = await GetUserAllList(data)
					this.fetching = false
					this.userList = res.data.data || []
				}
			},
			handleSubmit(e) {
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						let data = this.form
						data.charger = this.form.charger.toString()
						let res = {}
						if (!this.text.ID) {
							res = await DoAddDepartCharger(data)
						} else {
							res = await UpdateStudent(data)
						}
						if (res.data.code === 0) {
							this.$message.success(res.data.msg)
							this.closeFunction('1')
						} else {
							this.$message.error(res.data.msg)
						}
					} else {
						return false
					}
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
		width: 620px;
		height: 340px;
		border-radius: 14px;
		background: #fff;
		left: 50%;
		margin-left: -310px;
		top: 50%;
		margin-top: -170px;
		overflow-y: auto;

		.main {
			height: 90%;
			overflow-y: scroll;
		}

		/deep/.ant-form {
			margin-top: 50px;
			padding-bottom: 50px;

			/deep/.ant-calendar-picker {
				width: 100%
			}

			.ant-upload-list-picture-card-container {
				width: 80px;
				height: 80px;
			}
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

	.fixed-top {
		width: inherit;
		position: absolute;
		line-height: 30px;
		top: 0px;
		background-color: white;
		z-index: 999;
		padding: 10px 0 5px 10px;

		.icon-close {
			font-size: 20px;
			float: right;
			margin: 5px 10px;
		}
	}

	.fixed-bottom {
		width: 164px;
		left: 50%;
		bottom: 0px;
		margin: 0px 0px 0px -82px !important;
		position: absolute;
		background-color: white;
		z-index: 999;
	}
</style>
