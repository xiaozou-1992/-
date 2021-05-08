<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				<span>{{ linktype==1?'详情':(linktype==2?'修改权限':(linktype==3?'设为管理员':'取消管理员')) }}</span>
				<a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form :form="form" @submit="handleSubmit">
					<a-form-item label="学号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						{{ text.UserNo }}
					</a-form-item>
					<a-form-item label="发起活动权限" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						<a-radio-group name="radioGroup" @change="radioOnChange" :disabled="linktype==1" v-decorator="['IsAgreeApplyActivity',{ initialValue:true }]">
							<a-radio :value="true">是</a-radio>
							<a-radio :value="false">否</a-radio>
						</a-radio-group>
					</a-form-item>
					<a-form-item label="管理成员权限" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						<a-radio-group name="radioGroup" @change="radioOnChange" :disabled="linktype==1"  v-decorator="['IsAgreeManageMember',{ initialValue:true }]">
							<a-radio :value="true">是</a-radio>
							<a-radio :value="false">否</a-radio>
						</a-radio-group>
					</a-form-item>
					<a-form-item class="fixed-bottom" v-if="linktype!=1">
						<a-button type="primary" html-type="submit" class="btn2">提交</a-button>
					</a-form-item>
				</a-form>
			</div>
		</div>
	</div>
</template>
<script>
	import Cache from '@/utils/cache'
	import {
		DoUpdateUserClubMember,
		DoGetDetailUserClubMember,
		DoAddUserClubMember
	} from '@/api/follow'
	export default {
		props: {
			text: Object,
			linktype: Number,
			ID:String,
			time:null
		},
		watch: {
				time: {
					handler(text) {
						if(this.linktype == 1 || this.linktype == 2){
							this.GetConfirmState()
						}else{
							this.form.resetFields();
						}
					},
					immediate: true
				},
			},
		data() {
			return {
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),

			}
		},
		async created() {
			// await this.GetConfirmState()
		},
		methods: {
			async GetConfirmState(){
				if(this.linktype==1||this.linktype==2){
					let data={}
					data.clubID=this.ID
					data.userNo=this.text.UserNo
					let res = await DoGetDetailUserClubMember(data)
					// this.form=res.data.data
					this.form.setFieldsValue({
						IsAgreeApplyActivity:res.data.data.IsAgreeApplyActivity,
						IsAgreeManageMember:res.data.data.IsAgreeManageMember
					})
				}
			},
			radioOnChange(e) {
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
				if(this.linktype==2){
					this.form.validateFields(async (err, values) => {
						if (!err) {
							data.ID = this.text.ManagerID
							data.ClubID = this.ID
							data.UserNo = this.text.UserNo
							data.IsAgreeApplyActivity = values.IsAgreeApplyActivity
							data.IsAgreeManageMember = values.IsAgreeManageMember
							let res = await DoUpdateUserClubMember(data)
							if (res.data.code === 0) {
								this.$message.success(res.data.msg)
								this.$emit('closeFun')
								this.form.resetFields();
							} else {
								this.$message.error(res.data.msg)
							}
						}
					});
				}else if(this.linktype==3){
					this.form.validateFields(async (err, values) => {
						if (!err) {
							data.ID = this.text.ID
							data.ClubID = this.ID
							data.UserNo = this.text.UserNo
							data.IsAgreeApplyActivity = values.IsAgreeApplyActivity
							data.IsAgreeManageMember = values.IsAgreeManageMember
							let res = await DoAddUserClubMember(data)
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
