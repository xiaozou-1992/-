<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				{{ JSON.stringify(text) == '{}' ? '添加俱乐部' : '修改俱乐部' }}
				<a-icon class="icon-close" @click="closeFunction" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model ref="ruleForm" :model="form" :rules="rules">
					<a-form-model-item label="名称" prop="Name"><a-input v-model="form.Name" /></a-form-model-item>
					<a-form-model-item label="图标" prop="Ico">
						<a-upload accept="image/*" action="http://api.jlb.ac.acxk.net/Common/DoUploadFile?type=image" list-type="picture-card" :file-list="fileList" @preview="handlePreview" @change="handleChange">
							<div v-if="fileList.length < 1">
								<a-icon type="plus" />
								<div class="ant-upload-text">Upload</div>
							</div>
						</a-upload>
						<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel"><img alt="example" style="width: 100%" :src="previewImage" /></a-modal>
					</a-form-model-item>
					<a-form-model-item label="类型" prop="TypeID">
						<a-select v-model="form.TypeID" style="width:100%">
							<a-select-option v-for="(item, index) in TypeIDList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="所属项目" prop="ProjectID">
						<a-select v-model="form.ProjectID" showSearch optionFilterProp="children" style="width:100%">
							<a-select-option v-for="(item, index) in ProjectIDList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="所属部门" prop="DepartCode">
						<a-select v-model="form.DepartCode" showSearch optionFilterProp="children" style="width:100%" @change="DepartChange">
							<a-select-option v-for="(item, index) in DepartCodeList" :key="index" :value="item.Code">{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="学院俱乐部负责人" prop="ChairmanNo">
						<a-select showSearch optionFilterProp="children" style="width: 100%" v-model="form.ChairmanNo" 
						          @search="fetchUser" :filterOption="filterOption"
						>
						  <a-spin v-if="fetching" slot="notFoundContent" size="small" />
						  <a-select-option v-for="(item, index) in userList" :key="item.UserNo">{{ item.UserNo }}&nbsp;|&nbsp;{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="院审批人" prop="CollegeExamUserNo">
						<a-select showSearch optionFilterProp="children" style="width: 100%" v-model="form.CollegeExamUserNo" 
						          @search="fetchUserColleage" :filterOption="filterOption"
						>
						  <a-spin v-if="fetching" slot="notFoundContent" size="small" />
						  <a-select-option v-for="(item, index) in userListColleage" :key="item.UserNo">{{ item.UserNo }}&nbsp;|&nbsp;{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="俱乐部中心审批" prop="SchoolExamUserNo">
						<a-select showSearch optionFilterProp="children" style="width: 100%" v-model="form.SchoolExamUserNo" 
						          @search="fetchUserSchool" :filterOption="filterOption"
						>
						  <a-spin v-if="fetching" slot="notFoundContent" size="small" />
						  <a-select-option v-for="(item, index) in userListSchool" :key="item.UserNo">{{ item.UserNo }}&nbsp;|&nbsp;{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="描述"><a-input v-model="form.Desc" type="textarea" /></a-form-model-item>
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
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}
import { AddClub, UpdateClub, GetUserList } from '@/api/follow';
export default {
	props: {
		text: Object,
		DepartCodeList: Array,
		TypeIDList: Array,
		ProjectIDList: Array
	},
	watch: {
		text: function(text) {
			if (JSON.stringify(text) == '{}') {
			} else {
				this.userListSchool.push({'UserNo':text.SchoolExamUserNo,'Name':text.SchoolExamUserName})
				this.userListColleage.push({'UserNo':text.CollegeExamUserNo,'Name':text.CollegeExamUserName})
				this.userList.push({'UserNo':text.ChairmanNo,'Name':text.CairmanName})
				this.form = text;
				let obj = {
					uid: '-1',
					name: 'image.png',
					url: text.Ico
				}
				this.fileList.push(obj)
			}
		}
	},
	data() {
		return {
			loading: false,
			imageUrl: '',
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			fileList: [
				// {
				// 	uid: '-1',
				// 	name: 'image.png',
				// 	url: 'http://api.jlb.ac.acxk.net//Upload/Image/2020/10/21/dc3170cb1eb1412cbc06edb61af339ff.jpg'
					
				// }
			],
			previewVisible: false,
			previewImage: '',
			userList:[],
			userListColleage:[],
			userListSchool:[],
			fetching:false,
			form: {
				Name: '',
				Ico: '',
				TypeID: '',
				ProjectID:'',
				DepartCode: '',
				ChairmanNo: '',
				Desc: '',
				CollegeExamUserNo:'',
				SchoolExamUserNo:''
			},
			rules: {
				Name: [
					{
						required: true,
						message: '请输入俱乐部名称',
						trigger: 'change'
					}
				],
				TypeID: [
					{
						required: true,
						message: '请选择俱乐部类型',
						trigger: 'change'
					}
				],
				ProjectID: [
					{
						required: true,
						message: '请选择俱乐部所属项目',
						trigger: 'change'
					}
				],
				DepartCode: [
					{
						required: true,
						message: '请选择所属部门',
						trigger: 'change'
					}
				],
				ChairmanNo: [
					{
						required: true,
						message: '请输入学院俱乐部负责人',
						trigger: 'change'
					}
				],
				CollegeExamUserNo: [
					{
						required: true,
						message: '请选择院级审批人',
						trigger: 'change'
					}
				],
				SchoolExamUserNo: [
					{
						required: true,
						message: '请选择俱乐部中心审批',
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
		DepartChange(value){
			// this.form.CollegeExamUserNo=''
			// this.userListColleage=[]
		},
		async fetchUser(value) {
			this.fetching = true
			let myReg = /^[^a-zA-Z]+$/
			if (value && myReg.test(value) && value.length > 3) {
				let data = {}
				data.key = value
				data.type = 1
				data.top = 20
				let res = await GetUserList(data)
				this.fetching = false
				this.userList = res.data.data
			}
		},
		async fetchUserSchool(value) {
			this.fetching = true
			let myReg = /^[^a-zA-Z]+$/
			if (value && myReg.test(value) && value.length > 3) {
				let data = {}
				data.key = value
				data.type = 1
				data.top = 20
				let res = await GetUserList(data)
				this.fetching = false
				this.userListSchool = res.data.data
			}
		},
		async fetchUserColleage(value) {
			this.fetching = true
			let myReg = /^[^a-zA-Z]+$/
			if (value && myReg.test(value) && value.length > 3) {
				let data = {}
				data.key = value
				data.top = 20
				// data.departCode = this.form.DepartCode
				let res = await GetUserList(data)
				this.fetching = false
				this.userListColleage = res.data.data
			}
		},
		
		closeFunction(data) {
			this.$emit('closeFun', data);
			this.form = {};
			this.fileList = []
		},
		handleSubmit(e) {
			this.$refs.ruleForm.validate(async valid => {
				if (valid) {
					let data = this.form;
					let res = {};
					if (JSON.stringify(this.text) == '{}') {
						res = await AddClub(data);
					} else {
						res = await UpdateClub(data);
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
		handleCancel() {
			this.previewVisible = false;
		},
		async handlePreview(file) {
			if(this.text.Ico){
				this.previewImage = this.text.Ico;
			}else{
				this.previewImage = 'http://api.jlb.ac.acxk.net/' + file.response.url || this.text.Ico;
			}
			this.previewVisible = true;
		},
		handleChange({ fileList }) {
			
			this.fileList = fileList;
			if(this.fileList[0]&&this.fileList[0].status == 'done'){
				this.form.Ico = 'http://api.jlb.ac.acxk.net/'+this.fileList[0].response.url
			}
			
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
	height: 640px;
	border-radius: 14px;
	background: #fff;
	left: 50%;
	margin-left: -300px;
	top: 50%;
	margin-top: -320px;
	overflow-y: auto;
	.main {
		height: 90%;
		overflow-y: scroll;
	}
	/deep/.ant-form {
		margin-top: 50px;
		padding-bottom: 50px;
		.ant-upload-list-picture-card-container {
			width: 80px;
			height: 80px;
		}
	}
	/deep/.ant-form-item {
		margin: 20px 50px;
		/deep/.ant-form-item-label {
			width: 140px;
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
