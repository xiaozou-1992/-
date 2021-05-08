<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				{{ JSON.stringify(text) == '{}' ? '添加俱乐部指导老师' : '修改俱乐部指导老师' }}
				<a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model ref="ruleForm" :model="form" :rules="rules">
					<a-form-model-item label="项目" prop="ProjectID">
						<a-select optionFilterProp="children" showSearch v-model="form.ProjectID" disabled>
						  <template v-for="(item, index) in ProjectIDList">
						    <a-select-option :key="item.ID">{{ item.Name }}</a-select-option>
						  </template>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="学号/工号" prop="UserNo">
						<a-select showSearch optionFilterProp="children" style="width: 100%" v-model="form.UserNo"
						          @search="fetchUser" :filterOption="filterOption"
						>
						  <a-spin v-if="fetching" slot="notFoundContent" size="small" />
						  <a-select-option v-for="(item, index) in userList" :key="item.UserNo">{{ item.UserNo }}&nbsp;|&nbsp;{{ item.Name }}</a-select-option>
						</a-select>
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
import { AddClubProjectTeacher,UpdateClubProjectTeacher,GetUserList,GetClubProjectList } from '@/api/follow';
export default {
	props: {
		text: Object
	},
	watch: {
		text: function(text) {
			if (JSON.stringify(text) == '{}') {
				this.form.ProjectID = this.$route.query.ID
			} else {
				this.form = text;
				this.form.ProjectID = this.$route.query.ID
			}
		}
	},
	data() {
		return {
			ProjectIDList:[],
			userList:[],
			fetching:false,
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			form: {
				ProjectID: '',
				UserNo: '',
			},
			rules: {
				ProjectID: [
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
			}
		};
	},
	created() {
		this.getOtherList();
	},
	methods: {
		async getOtherList(){
			let res = await GetClubProjectList()
			this.ProjectIDList = res.data.data
		},
		filterOption(input, option) {
			return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
		},
		async fetchUser(value) {
			this.fetching = true
			let myReg = /^[^a-zA-Z]+$/
			if (value && myReg.test(value) && value.length > 1) {
				let data = {}
				data.key = value
				data.type = 2
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
					if (JSON.stringify(this.text) == '{}') {
						res = await AddClubProjectTeacher(data);
					} else {
						res = await UpdateClubProjectTeacher(data);
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
