<template>
  <div class="aid">
    <div class="base">
      <p class="fixed-top">
        添加管理员
        <a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
      </p>
      <div class="main" id="new_message">
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item label="姓名" prop="userID">
            <a-select placeholder="请输入姓名" showSearch v-model="form.userID" optionFilterProp="children"
                      @search="fetchUser" :filterOption="filterOption"
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option v-for="(item, index) in userList" :key="item.ID">{{ item.Name }} - {{ item.DepartName }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="" class="fixed-bottom">
            <a-button type="primary" @click="handleSubmit" :loading="loading">{{ JSON.stringify(text) == '{}' ? '确认添加' : '确认修改' }}</a-button>
            <a-button style="margin-left: 10px;" @click="closeFunction">取消</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>

    </div>
  </div>
</template>

<script>
	import {
		DoAddAdminUser,
		GetUserAllList
	} from '@/api/follow'
	export default {
		props: {
			text: Object
		},
		watch: {
			text: function(text) {
				if (text.ID) {
					this.form.charger = []
					if (text.Type === 0) {
						text.ChargerList.forEach(item => {
							this.form.charger.push(item.ID)
						})
						this.userList = text.ChargerList
					}
				}
			}
		},
		data() {
			return {
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				userList: [],
				fetching: false,
				loading: false,
				form: {
					userID: ''
				},
				rules: {
					userID: [{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			closeFunction(data) {
				this.$emit('closeFun', data)
				this.$refs['ruleForm'].resetFields()
			},
			filterOption(input, option) {
				return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
			userChange(item) {
				this.form.charger = []
				this.form.charger.push(item)
			},
			handleSubmit(e) {
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						this.loading = true
						let res = await DoAddAdminUser(this.form)
						if (res.data.code === 0) {
							this.$message.success(res.data.msg)
							this.closeFunction('1')
						} else {
							this.$message.error(res.data.msg)
						}
						this.loading = false
					} else {
						return false
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.ant-tag{
		margin-right: 8px !important;
	}
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
		border-radius: 12px;
		width: 620px;
		height: 340px;
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
		width: 164px;
		left: 50%;
		bottom: 0px;
		margin: 0px 0px 0px -82px !important;
		position: absolute;
		background-color: white;
		z-index: 999;
	}

	/deep/.ant-form {
		margin-top: 50px;
		padding-bottom: 50px;
	}
</style>
