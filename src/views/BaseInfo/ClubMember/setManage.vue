<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				{{ setType == 1 ? '设为管理者' : '修改俱乐部管理者权限' }}
				<a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model ref="ruleForm" :model="form" :rules="rules">
					<a-form-model-item label="俱乐部" prop="ClubID">
						<a-select optionFilterProp="children" showSearch v-model="form.ClubID" disabled>
						  <template v-for="(item, index) in ClubIDList">
						    <a-select-option :key="item.ID">{{ item.Name }}</a-select-option>
						  </template>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="学号/工号" prop="UserNo">
						<a-select showSearch optionFilterProp="children" style="width: 100%" v-model="form.UserNo" disabled
						          @search="fetchUser" :filterOption="filterOption"
						>
						  <a-spin v-if="fetching" slot="notFoundContent" size="small" />
						  <a-select-option v-for="(item, index) in userList" :key="item.UserNo">{{ item.UserNo }}&nbsp;|&nbsp;{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="发起活动权限" prop="IsAgreeApplyActivity">
						<a-radio-group name="radioGroup" v-model="form.IsAgreeApplyActivity">
							<a-radio :value="true">
								有权限
							</a-radio>
							<a-radio :value="false">
								无权限
							</a-radio>
						</a-radio-group>
					</a-form-model-item>
					<a-form-model-item label="管理成员权限" prop="IsAgreeManageMember">
						<a-radio-group name="radioGroup" v-model="form.IsAgreeManageMember">
							<a-radio :value="true">
								有权限
							</a-radio>
							<a-radio :value="false">
								无权限
							</a-radio>
						</a-radio-group>
					</a-form-model-item>
					<a-form-model-item label="" class="fixed-bottom">
						<a-button type="primary" @click="handleSubmit">{{ setType == 1 ? '确认添加' : '确认修改' }}</a-button>
						<a-button style="margin-left: 10px;" @click="closeFunction">取消</a-button>
					</a-form-model-item>
				</a-form-model>
			</div>
		</div>
	</div>
</template>

<script>
import { AddClubManager,UpdateClubManager,getClubPageList,GetUserList,GetDetailClubManager } from '@/api/follow';
export default {
	props: {
		text: Object,
		setType:Number
	},
	watch: {
		text: function(text) {
			console.log(this.setType)
			if (this.setType == 1) {
				// this.form.ClubID = this.$route.query.ID
				this.form.UserNo = text.UserNo
			} else {
				// this.form = text;
				this.form.ID = text.ManagerID
				// this.form.UserNo = text.UserNo
				// this.form.ClubID = this.$route.query.ID
				// this.GetDetail()
			}
		}
	},
	data() {
		return {
			ClubIDList:[],
			userList:[],
			TypeList:[],
			fetching:false,
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			DepartmenDropdowntList: [],
			form: {
				ClubID: '',
				UserNo: '',
				IsAgreeApplyActivity:'',
				IsAgreeManageMember: ''
			},
			rules: {
				ClubID: [
					{
						required: true,
						message: '请选择俱乐部',
						trigger: 'change'
					}
				],
				UserNo: [
					{
						required: true,
						message: '请选择人员',
						trigger: 'change'
					}
				],
				IsAgreeApplyActivity: [
					{
						required: true,
						message: '请选择是否有发起活动权限',
						trigger: 'change'
					}
				],
				IsAgreeManageMember: [
					{
						required: true,
						message: '请选择是否有管理成员权限',
						trigger: 'change'
					}
				]
			}
		};
	},
	created() {
		// this.GetDetail()
		this.getOtherList();
	},
	methods: {
		async getOtherList(){
			let data={}
			data.pageIndex = 1
			data.pageSize = 999
			let res = await getClubPageList(data)
			this.ClubIDList = res.data.data
			this.form.ClubID = this.$route.query.ID
			this.form.UserNo = this.text.UserNo
			console.log(this.form)
			console.log(this.text)
			if(this.text.ManagerID){
				this.GetDetail(this.text.ManagerID)
			}
		},
		async GetDetail(id){
			let data={}
			data.id = id
			let res = await GetDetailClubManager(data)
			this.form.IsAgreeApplyActivity = res.data.data.IsAgreeApplyActivity
			this.form.IsAgreeManageMember = res.data.data.IsAgreeManageMember
		},
		filterOption(input, option) {
			return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
		},
		async fetchUser(value) {
			this.fetching = true
			let myReg = /^[^a-zA-Z]+$/
			if (value && myReg.test(value) && value.length > 3) {
				let data = {}
				data.key = value
				data.top = 20
				let res = await GetUserList(data)
				this.fetching = false
				this.userList = res.data.data
			}
		},
		closeFunction(data) {
			this.$emit('closeFun', data);
			this.form = {};
		},
		handleSubmit(e) {
			this.$refs.ruleForm.validate(async valid => {
				if (valid) {
					let data = this.form;
					let res = {}
					if (this.setType == 1) {
						res = await AddClubManager(data);
					} else {
						data.ID = this.text.ManagerID
						res = await UpdateClubManager(data);
					}
					if (res.data.code === 0) {
						this.$message.success(res.data.msg);
						this.closeFunction('1');
					}else{
						this.$message.error(res.data.msg);
					}
				} else {
					return false;
				}
			});
		}
	}
};
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
			width: 110px;
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
	left:50%;
	bottom: 0px;
	margin:0px 0px 0px -82px!important;
	position: absolute;
	background-color: white;
	z-index: 999;
}
/deep/.ant-form {
	margin-top: 50px;
	padding-bottom: 50px;
}
</style>
