<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				<span>审批</span>
				<a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<!-- <a-form :form="form" @submit="handleSubmit">
					<a-form-item label="申请人" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						{{ text.Name }}
					</a-form-item>
					<a-form-item label="审核状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						<a-select :allowClear="true" v-decorator="['isAgree', { rules: [{ required: true, message: '请选择审核状态' }] }]">
							<a-select-option v-for="(item, index) in TypeList" :key="index" :value="item.ID">{{ item.Name}}</a-select-option>
						</a-select>
					</a-form-item>
					
					<a-form-item label="批复" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						<a-textarea placeholder="请输入批复"  v-decorator="['comment', { rules: [{ required: true, message: '请输入批复' }] }]"></a-textarea>
					</a-form-item>
					<a-form-item class="fixed-bottom">
						<a-button type="primary" html-type="submit" class="btn2">提交</a-button>
					</a-form-item>
				</a-form> -->
				<a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
					<!-- <a-form-model-item label="申请人" prop="Reason">
						<a-input disabled v-model="text.Name" type="text" />
					</a-form-model-item> -->
					<a-form-model-item label="是否通过" prop="isAdopt">
						<a-select :allowClear="true" v-model="form.isAdopt">
							<a-select-option v-for="(item, index) in TypeList" :key="index" :value="item.ID">{{ item.Name}}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="批复" prop="comment">
						<a-input v-model="form.comment" type="textarea" />
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
		GetUserJoinDoExam,
		DoGetUserActivityFlowDoExamPageList
	} from '@/api/follow'
	export default {
		props: {
			text: Object,
			// approvalType: Number
			time:null
		},
		watch: {
			time: {
				handler(text) {
				},
				immediate: true
			},
		},
		data() {
			return {
				// formLayout: 'horizontal',
				// form: this.$form.createForm(this, { name: 'coordinated' }),
				labelCol: { span: 4 },
				    wrapperCol: { span: 14 },
				TypeList: [{
						ID: 'true',
						Name: '通过'
					},
					{
						ID: 'false',
						Name: '不通过'
					}
				],
				form: {
					comment: '',
					isAdopt: ''
				},
				rules: {
					comment: [{
						required: true,
						message: '请输入批复内容',
						trigger: 'blur'
					}],
					isAdopt: [{
						required: true,
						message: '请选择状态',
						trigger: 'blur'
					}],
				},
			}
		},
		async created() {
			// await this.GetConfirmState()
		},
		methods: {
			// async GetConfirmState(){
			// 	let res = await GetConfirmState()
			// 	this.TypeList=res.data.data
			// },
			onSubmit() {
				let data = {}
				
				if (this.approvalType == 1) {
					 this.$refs.ruleForm.validate(async valid => {
						 data.id = this.text.ID
						 data.isAdopt = this.form.isAdopt
						 data.comment = this.form.comment
						 let res = await DoGetUserActivityFlowDoExamPageList(data)
						 if (res.data.code === 0) {
						 	this.$message.success(res.data.msg)
						 	this.$emit('closeFun')
						 	this.$refs.ruleForm.resetFields();
						 } else {
						 	this.$message.error(res.data.msg)
						 	this.$refs.ruleForm.resetFields();
						 }
					 })
					
				}else{
					this.$refs.ruleForm.validate(async valid => {
						data.id = this.text.ID
					data.isAdopt = this.form.isAdopt
					data.comment = this.form.comment
						let res = await DoGetUserActivityFlowDoExamPageList(data)
						if (res.data.code === 0) {
							this.$message.success(res.data.msg)
							this.$emit('closeFun')
							this.$refs.ruleForm.resetFields();
						} else {
							this.$message.error(res.data.msg)
							this.$refs.ruleForm.resetFields();
						}
					})
					
				}
				

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
			roleChange(value) {},
			departmentChange(value) {},

			handleSubmit(e) {
				let data = {}
				// data.ID = this.approvalList.ID
				// data.Type = this.approvalType
				// data.Content = this.Reason
				if (this.approvalType == 1) {
					this.form.validateFields(async (err, values) => {
						if (!err) {
							data.id = this.text.ID
							data.isAgree = values.isAgree
							data.comment = values.comment
							let res = await GetUserJoinDoExam(data)
							if (res.data.code === 0) {
								this.$message.success(res.data.msg)
								this.$emit('closeFun')
								this.form.resetFields();
							} else {
								this.$message.error(res.data.msg)
							}
						}
					});
				} else if (this.approvalType == 2) {
					this.form.validateFields(async (err, values) => {
						if (!err) {
							data.id = this.text.ID
							data.isAgree = values.isAgree
							data.comment = values.comment
							let res = await DoExamApplyUserJoinActivity(data)
							if (res.data.code === 0) {
								this.$message.success(res.data.msg)
								this.$emit('closeFun')
								this.form.resetFields();
							} else {
								this.$message.error(res.data.msg)
							}
						}
					});
				}

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
