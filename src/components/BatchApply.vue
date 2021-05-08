<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				<span>批量审核</span>
				<a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
					<!-- <a-form-model-item label="申请人" prop="Reason">
						<a-input disabled :value="text" type="text" />
					</a-form-model-item> -->
					<a-form-model-item label="审核状态" prop="isAgree">
						<a-select :allowClear="true" v-model="form.isAgree">
							<a-select-option v-for="(item, index) in TypeList" :key="index" :value="item.ID">{{ item.Name}}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="审核意见" prop="comment">
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
		<div class="mbzz" v-if="stepvisable">
			<div @click.stop class="steping">
				<div style="margin-top: 10px;">正在审批中....</div>
				<a-progress :percent="percent" style="width: 70%;" />
			</div>
		</div>
	</div>
</template>

<script>
	import Cache from '@/utils/cache'
	import {
		GetUserJoinDoExam,
		DoExamApplyUserJoinActivity
	} from '@/api/follow'
	export default {
		props: {
			text: Array,
			approvalType: Number
		},
		data() {
			return {
				labelCol: {
					span: 4
				},
				wrapperCol: {
					span: 14
				},
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
					isAgree: ''
				},
				rules: {
					comment: [{
						required: true,
						message: '请输入审核意见',
						trigger: 'blur'
					}],
					isAgree: [{
						required: true,
						message: '请选择审核状态',
						trigger: 'blur'
					}],
				},
				stepvisable:false,
				percent:0
			}
		},
		async created() {},
		methods: {
			onSubmit() {
				this.stepvisable=true
				let data = {}
				data.isAgree = this.form.isAgree
				data.comment = this.form.comment
				let scount=0
				let ecount=0
				let allcount=this.text.length
				let that=this
				that.$refs.ruleForm.validate( valid => {
					 for(let i = 1; i < that.text.length+1; i++){
					     setTimeout(async function () {
							 	data.id = that.text[i-1].ID
								console.log(i)
								let res={}
							 	if(that.approvalType==1){
									res = await GetUserJoinDoExam(data)
								}else{
									 res = await DoExamApplyUserJoinActivity(data)
								}
							 	if (res.data.code === 0) {
							 		that.$message.success(res.data.msg)
							 		scount=scount+1
							 	} else if(res.data.code ==1 || !res) {
							 		ecount=ecount+1
							 		that.$message.error(res.data.msg)
							 	}
								that.percent=(i/that.text.length).toFixed(2)*100
								console.log(i)
							 if(i==that.text.length){
								 that.stepvisable=false
								 setTimeout( that.$emit('closeFun',2,scount,ecount), 1000);
							 }
					     }, 500 * i);
					 }
					 // setTimeout( that.$emit('closeFun',2,scount,ecount), 1000);
				})
			},
			closeFunction() {
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
	.mbzz {
		position: fixed;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		background: rgba(0, 0, 0, 0.5);
		z-index: 99999;
	}
	.steping {
		width: 39%;
		text-align: center;
		border: 1px solid gray;
		position: absolute;
		top: 50%;
		left: 30.5%;
		background: #ffffff;
		height: 6rem;
		z-index: 999;
		margin-top: -6rem; 
	}
</style>
