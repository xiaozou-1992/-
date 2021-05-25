<template>
  <div class="aid">
    <div class="base">
      <p class="fixed-top">
        {{ !text.ID ? '添加角色' : '修改角色' }}
        <a-icon class="icon-close" @click="closeFunction" type="close-circle" />
      </p>
      <div class="main" id="new_message">
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item label="名称" prop="Name">
            <a-input v-model="form.Name" />
          </a-form-model-item>
          <a-form-model-item label="权限" prop="Authority">
            <tree :treeDate="treeDate" :treeValue="treeValue" @func="getMsgFormSon"></tree>
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
	import Cache from '@/utils/cache'
	import tree from '@/components/tree/tree.vue'
	import {
		DoAddRole,
		DoUpdateRole,
		GetUserAuthorityList
	} from '@/api/follow'
	export default {
		components: {
			tree
		},
		props: {
			text: Object,
			treeDate: Array,
			nowTime: String
		},
		watch: {
			nowTime: function(text) {
				if (!this.text.ID) {
					let that = this
					that.treeValue = []
				} else {
					let that = this
					this.form.Name = this.text.Name
					this.form.ID = this.text.ID
					that.form.Authority = this.text.Authority.substring(1, this.text.Authority.length - 1).replace(/"/g, '')
					that.treeValue = that.form.Authority.split(',')
				}
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
				power: [],
				form: {
					Name: '',
					Authority: ''
				},
				rules: {
					Name: [{
						required: true,
						message: '请输入角色名称',
						trigger: 'change'
					}],
					Authority: [{
						required: true,
						message: '请选择权限',
						trigger: 'change'
					}]
				}
			}
		},
		created() {

		},
		methods: {
			getMsgFormSon(data) {
				this.form.Authority = data.join(',')
			},
			closeFunction(data) {
				this.$emit('closeFun', data)
				this.$refs['ruleForm'].resetFields()
				this.treeValue = []
			},
			handleSubmit(e) {
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						let data = this.form
						let res = {}
						if (JSON.stringify(this.text) === '{}') {
							res = await DoAddRole(data)
						} else {
							res = await DoUpdateRole(data)
						}
						if (res.data.code === 0) {
							this.$message.success(res.data.msg)
							this.getInfo()
							this.closeFunction('1')
							setTimeout(()=>{
								window.location.reload();
							},300)
						} else {
							this.$message.error(res.data.msg)
						}
					} else {
						return false
					}
				})
			},
			async getInfo(){
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
		width: 600px;
		height: 540px;
		border-radius: 14px;
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
