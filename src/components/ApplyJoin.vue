<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				<span>申请加入俱乐部</span>
				<a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model
				    ref="ruleForm"
				    :model="form"
				    :rules="rules"
				    :label-col="labelCol"
				    :wrapper-col="wrapperCol"
				  >
				  <a-form-model-item label="俱乐部名称" prop="Reason">
				    <a-input disabled v-model="text.Name" type="text" />
				  </a-form-model-item>
				    <a-form-model-item label="加入理由" prop="Reason">
				      <a-input v-model="form.Reason" type="textarea" />
				    </a-form-model-item>
				    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
				      <a-button type="primary" @click="onSubmit">
				        提交
				      </a-button>
				    </a-form-model-item>
				  </a-form-model>
			</div>
		</div>
	</div>
</template>

<script>
	import Cache from '@/utils/cache'
	import {
		GetApplyClubList
	} from '@/api/follow'
	export default {
		props: {
			text: Object,
			// time:null
		},
		// watch: {
		// 		time: {
		// 			handler(text) {
		// 				// this.getOtherList()
		// 				console.log(this.text)
		// 			},
		// 			immediate: true
		// 		},
		// 	},
		data() {
			return {
				  labelCol: { span: 4 },
				      wrapperCol: { span: 14 },
				form: {
				        Reason: '',
				      },
			 rules: {
			        // Reason: [{ required: true, message: '请输入加入该俱乐部理由', trigger: 'blur' }],
			      },
			}
		},
		async created() {
			// await this.GetConfirmState()
		},
		methods: {
			 onSubmit() {
				 let data = {}
			      this.$refs.ruleForm.validate(async valid => {
			        if (valid) {
			         data.clubID = this.text.ID
			         data.Reason = this.form.Reason
			         let res = await GetApplyClubList(data)
			         if (res.data.code === 0) {
			         	this.$message.success(res.data.msg)
			         	this.$emit('closeFun')
			         	 this.$refs.ruleForm.resetFields();
			         } else {
			         	this.$message.error(res.data.msg)
			         	 this.$refs.ruleForm.resetFields();
						this.$emit('closeFun')
			         }
			        } else {
			          console.log('error submit!!');
			          return false;
			        }
			      });
			    },
			radioOnChange(e) {
				this.selectvalue = e.target.value
			},
			filterOption(input, option) {
				return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			},
			closeFunction() {
				// this.selecttype = 0
				this.worklist = []
				this.$emit('closeFun')
			},
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
		// height: 540px;
		height: auto;
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

			/deep/textarea {
				height: 140px;
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
		padding-bottom: 80px;
	}
</style>
