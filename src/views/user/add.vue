<template>
  <div class="aid">
    <div class="base">
      <p class="fixed-top">
        同步用户信息
        <a-icon @click="closeFunction()" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
      </p>
      <div class="main">
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item label="用户类型" prop="type">
            <a-radio-group name="radioGroup" v-model="form.type">
              <a-radio :value="'js'">
                教师
              </a-radio>
              <a-radio :value="'xs'">
                学生
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="工号 / 学号" prop="userNo">
            <a-input v-model="form.userNo" :allowClear="true" placeholder="请输入工号 / 学号" />
          </a-form-model-item>
          <a-form-item class="fixed-bottom" :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit" @click="handleSubmit">确认同步</a-button>
          </a-form-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
	import {
		SynchronizationUser
	} from '@/api/follow'
	export default {
		components: {

		},
		props: {

		},
		watch: {

		},
		data() {
			return {
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				form: {
					userNo: '',
					type: ''
				},
				rules: {
					type: [{
						required: true,
						message: '请选择用户类型',
						trigger: 'blur'
					}],
					userNo: [{
						required: true,
						message: '请输入工号 / 学号',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {},
		methods: {
			closeFunction(flag) {
				this.$refs.ruleForm.resetFields()
				this.$emit('closeFun', flag)
			},
			handleSubmit(e) {
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						let res = await SynchronizationUser(this.form)
						if (res.data.code === 0) {
							this.$message.success(res.data.msg)
							this.closeFunction('1')
						} else {
							this.$message.error(res.data.msg)
						}
					} else {
						console.log('error submit!!')
						return false
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.mustIcon {
		/deep/.ant-form-item-label {
			label {
				&::before {
					display: inline-block;
					margin-right: 4px;
					color: #f5222d;
					font-size: 14px;
					font-family: SimSun, sans-serif;
					line-height: 1;
					content: '*';
				}
			}
		}
	}

	.row {
		display: flex;
		justify-content: space-around;
		margin-top: 15px;
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

	.lef {
		/deep/.ant-input {
			border-radius: 0 4px 4px 0 !important;
		}

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
		width: 620px;
		height: 340px;
		background: #fff;
		left: 50%;
		margin-left: -310px;
		top: 50%;
		margin-top: -170px;
		overflow-y: auto;
		border-radius: 10px;

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

				/deep/.ant-calendar-picker,
				/deep/.ant-time-picker {
					width: 100%;
				}
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
		padding: 10px 0 0 10px;
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

	/deep/.ant-form {
		margin-top: 50px;
		padding-bottom: 50px;
	}
</style>
