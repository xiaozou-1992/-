<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				{{ JSON.stringify(text) == '{}' ? '添加管理员' : '修改管理员' }}
				<a-icon @click="closeFunction" :style="{ fontSize: '20px', float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model ref="ruleForm" :model="form" :rules="rules">
					<a-form-model-item label="用户学号/工号" prop="UserNo">
						<a-select showSearch optionFilterProp="children" style="width: 100%" v-model="form.UserNo" @search="fetchUser" :filterOption="filterOption">
							<a-select-option v-for="(item, index) in userList" :key="item.UserNo">{{ item.UserNo }}&nbsp;|&nbsp;{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="角色" prop="RoleID1">
						<a-select optionFilterProp="children" mode="multiple" showSearch v-model="form.RoleID1" @change="selectChange">
							<template v-for="(item, index) in RoleList">
								<a-select-option :key="item.ID">{{ item.Name }}</a-select-option>
							</template>
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
import { AddAdmin, UpdateAdmin, GetUserList } from '@/api/follow';
export default {
	props: {
		text: Object,
		RoleList: Array
	},
	watch: {
		text: function(text) {
			if (JSON.stringify(text) == '{}') {
			} else {
				this.form = text;
				this.form.RoleID1 = text.RoleID
				this.form.RoleID = text.RoleID.join(',')
			}
		}
	},
	data() {
		return {
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			userList: [],
			form: {
				UserNo: '',
				RoleID1: [],
				RoleID: ''
			},
			rules: {
				UserNo: [
					{
						required: true,
						message: '请选择用户',
						trigger: 'change'
					}
				],
				RoleID1: [
					{
						required: true,
						message: '请选择权限',
						trigger: 'change'
					}
				]
			}
		};
	},
	created() {},
	methods: {
		filterOption(input, option) {
			return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
		},
		selectChange(value) {
			this.form.RoleID = value.join(',');
		},
		async fetchUser(value) {
			let myReg = /^[^a-zA-Z]+$/;
			if (value && myReg.test(value) && value.length > 3) {
				let data = {};
				data.key = value;
				data.type = 1;
				data.top = 20;
				let res = await GetUserList(data);
				this.userList = res.data.data;
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
					let res = {};
					if (JSON.stringify(this.text) == '{}') {
						res = await AddAdmin(data);
					} else {
						res = await UpdateAdmin(data);
					}
					if (res.data.code === 0) {
						this.$message.success(res.data.msg);
						this.closeFunction('1');
					} else {
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
</style>
