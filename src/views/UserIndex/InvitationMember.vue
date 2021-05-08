<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				<span>邀请成员加入活动</span>
				<a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form :form="form" @submit="handleSubmit">
					<!-- <a-form-item label="选择成员" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						<a-select :allowClear="true" v-decorator="['userNo',{ rules: [{ required: true, message: '请选择俱乐部成员' }] }]">
							<a-select-option v-for="(item, index) in memberList" :key="index" :value="item.UserNo">{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-item> -->
					<a-form-item label="选择成员" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						<a-select showSearch optionFilterProp="children" style="width: 100%" placeholder="请输入学号进行搜索" v-decorator="['userNo',{ rules: [{ required: true, message: '请选择俱乐部成员' }] }]"
						          @search="fetchUser" :filterOption="filterOption"
						>
						  <a-spin v-if="fetching" slot="notFoundContent" size="small" />
						  <a-select-option v-for="(item, index) in userList" :key="item.UserNo">{{ item.UserNo }}&nbsp;|&nbsp;{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item class="fixed-bottom">
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
		DoInviteUserJoinActivity,
		GetUserClubMember,
		GetUserList
	} from '@/api/follow'
	export default {
		props: {
			ID: String,
			ClubID:String,
			time:null
		},
		watch: {
				time: {
					handler(text) {
						this.GetUserClubMemberList()
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
				memberList:[],
				fetching:false,
				userList:[]
			}
		},
		async created() {
			// await this.GetConfirmState()
		},
		methods: {
			async fetchUser(value) {
				this.fetching = true
				let myReg = /^[^a-zA-Z]+$/
				if (value && myReg.test(value) && value.length > 3) {
					let data = {}
					data.userNo = value
					// data.type = 1
					data.top = 1
					let res = await GetUserList(data)
					this.fetching = false
					this.userList = res.data.data
				}
			},
			async GetUserClubMemberList(){
				let data={}
				data.clubID=this.ClubID
				let res = await GetUserClubMember(data)
				this.memberList=res.data.data
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
				this.form.validateFields(async (err, values) => {
					if (!err) {
						data.activityID = this.ID
						data.UserNo = values.userNo
						let res = await DoInviteUserJoinActivity(data)
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
		margin:0px auto;
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
		// text-align: center;
	}

	/deep/.ant-form {
		margin-top: 50px;
		padding-bottom: 80px;
	}
</style>
