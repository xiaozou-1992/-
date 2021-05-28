<template>
  <div class="aid">
    <div class="base">
      <p class="fixed-top">
        分配角色
        <a-icon class="icon-close" @click="closeFunction" type="close-circle" />
      </p>
      <div class="main" id="new_message">
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item label="角色" prop="Name">
            <a-select mode="multiple" placeholder="请输入角色名称" showSearch v-model="form.roleIDList" optionFilterProp="children"
                      :filterOption="filterOption"
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option v-for="(item, index) in roleList" :key="item.ID">{{ item.Name }}</a-select-option>
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
		DoUpdateAdminUserRole,
		GetRoleAllList,
		GetAdminRoleList,
		GetUserAuthorityList
	} from '@/api/follow'
	import Cache from '@/utils/cache'
	export default {
		components: {

		},
		props: {
			text: Object,
			nowTime: String
		},
		watch: {
			nowTime: function(text) {
				this.form.id = this.text.ID
				this.getDetail(this.text.ID)
			}
		},
		data() {
			return {
				loading: false,
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				treeValue: [],
				roleList: [],
				fetching: false,
				loading: false,
				form: {
					id: '',
					roleIDList: []
				},
				rules: {
					roleIDList: [{
						required: true,
						message: '请输入角色名称',
						trigger: 'change'
					}]
				}
			}
		},
		created() {
			this.fetchRole()
		},
		methods: {
			filterOption(input, option) {
				return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			},
			async fetchRole(value) {
				let res = await GetRoleAllList({name: ''})
				this.roleList = res.data.data || []
			},
			async getDetail(value) {
				if (value) {
					let data = {}
					data.id = value
					let res = await GetAdminRoleList(data)
					if (res.data.data.length > 0) {
						res.data.data.forEach(item => {
							this.form.roleIDList.push(item.ID)
						})
					}
				}
			},
			closeFunction(data) {
				this.$emit('closeFun', data)
				this.$refs['ruleForm'].resetFields()
				this.form.roleIDList = []
			},
			handleSubmit(e) {
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						this.loading = true
						let data = this.form
						let res = await DoUpdateAdminUserRole(data)
						if (res.data.code === 0) {
							this.$message.success(res.data.msg)
							this.getInfo()
							this.closeFunction('1')
							setTimeout(() => {
								window.location.reload()
							}, 300)
						} else {
							this.$message.error(res.data.msg)
						}
						this.loading = false
					} else {
						return false
					}
				})
			},
			async getInfo() {
				let res = await GetUserAuthorityList()
				Cache.set('menuListSub', res.data.data)
			},
			handleCancel() {
				this.previewVisible = false
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
