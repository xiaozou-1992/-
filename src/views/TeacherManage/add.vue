<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				{{ JSON.stringify(text) == '{}' ? '添加教师' : '修改教师' }}
				<a-icon class="icon-close" @click="closeFunction" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model ref="ruleForm" :model="form" :rules="rules">
					<a-form-model-item label="姓名" prop="Name"><a-input v-model="form.Name" /></a-form-model-item>
					<a-form-model-item label="工号" prop="UserNo"><a-input v-model="form.UserNo" /></a-form-model-item>
					<a-form-model-item label="手机号" prop="Phone"><a-input v-model="form.Phone" /></a-form-model-item>
					<a-form-model-item label="身份证后六位" prop="Sfzh"><a-input v-model="form.Sfzh" /></a-form-model-item>
					<a-form-model-item label="性别" prop="Sex">
						<a-radio-group name="radioGroup" v-model="form.Sex">
							<a-radio :value="1">
								男
							</a-radio>
							<a-radio :value="2">
								女
							</a-radio>
						</a-radio-group>
					</a-form-model-item>
					<a-form-model-item label="部门" prop="DepartCode">
						<a-select v-model="form.DepartCode" optionFilterProp="children" showSearch style="width:100%">
							<a-select-option v-for="(item, index) in DepartCodeList" :key="index" :value="item.Code">{{ item.Name }}</a-select-option>
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
import moment from 'moment'
import { AddTeacher, UpdateTeacher,DoGetDetailStudent } from '@/api/follow';
export default {
	props: {
		text: Object,
		ClassList: Array,
		DepartCodeList:Array
	},
	watch: {
		text: function(text) {
			if (JSON.stringify(text) == '{}') {
				
			} else {
				// this.GetDetailStudent(text)
				this.form = text
				this.gradeYear = text.Grade
			}
		}
	},
	data() {
		return {
			gradeYear:null,
			yearPickShow:false,
			loading: false,
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			form: {
				Name: '',
				UserNo: '',
				Phone:'',
				Sfzh: '',
				Sex:'',
				DepartCode:''
			},
			rules: {
				Name: [
					{
						required: true,
						message: '请输入教师姓名',
						trigger: 'change'
					}
				],
				UserNo: [
					{
						required: true,
						message: '请输入工号',
						trigger: 'change'
					}
				],
				Sfzh: [
					{
						required: true,
						message: '请输入身份证号后六位',
						trigger: 'change'
					}
				],
				Sex: [
					{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}
				],
				Phone: [
					{
						required: true,
						message: '请收入手机号',
						trigger: 'change'
					}
				],
				DepartCode: [
					{
						required: true,
						message: '请选择部门',
						trigger: 'change'
					}
				]
			}
		};
	},
	created() {
		
	},
	methods: {
		filterOption(input, option) {
			return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
		},
		moment,
		handleOpenChange(status){
			this.yearPickShow = status
		},
		handlePanelChange(value, mode){
			this.gradeYear = moment(value).format('YYYY')
			this.form.Grade = this.gradeYear
			this.yearPickShow = false
		},
		yearChange(date, dateString){
			if(!date){
				this.gradeYear = null
				this.form.Grade = this.gradeYear
			}
		},
		closeFunction(data) {
			this.$emit('closeFun', data);
			this.form = {};
			this.gradeYear = null
			this.fileList = []
		},
		handleSubmit(e) {
			this.$refs.ruleForm.validate(async valid => {
				if (valid) {
					let data = this.form;
					let res = {};
					if (JSON.stringify(this.text) == '{}') {
						res = await AddTeacher(data);
					} else {
						res = await UpdateTeacher(data);
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
		},
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
		/deep/.ant-calendar-picker{
			width:100%
		}
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
