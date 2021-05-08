<template>
	<div>
		<div class="h2">
			{{ pageTitle }}积分申请详情
			
		</div>
		<div class="main" :style="{ height: layoutContentHeight }">
			<div class="h3">基础信息</div>
			<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit">
				<a-form-item label="申请项"><a-input disabled v-decorator="['ApplyItemNodeName', { rules: [{ required: true, message: '活动标题不能为空' }] }]" /></a-form-item>
				<a-form-item label="标题"><a-input disabled v-decorator="['Title', { rules: [{ required: true, message: '活动标题不能为空' }] }]" /></a-form-item>
				<a-form-item label="附件">
					<a-upload
					disabled
						v-decorator="['Files', { rules: [{ required: true, message: '活动图标不能为空' }] }]"
						accept="image/*"
						action="http://api.jlb.ac.acxk.net/Common/DoUploadFile?type=file"
						list-type="picture-card"
						:file-list="icofileList"
						@preview="handlePreview"
						@change="e => icohandleChange(e, 'Ico')"
					>
						<div v-if="icofileList.length < 1">
							<a-icon type="plus" />
							<div class="ant-upload-text">Upload</div>
						</div>
					</a-upload>
				</a-form-item>
				<a-form-item v-for="item in data" :label="item.Name">
					<a-input
						v-if="item.FieldType == 1"
						disabled
						v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]"
					/>
					<a-input
						v-if="item.FieldType == 2"
						disabled
						type="textarea"
						v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]"
					/>
					<a-input
						v-if="item.FieldType == 3"
						disabled
						type="number"
						v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]"
					/>
					<a-input
						v-if="item.FieldType == 4"
						disabled
						type="number"
						v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]"
					/>
					<!-- {{ JSON.stringify(rules) }} -->
					<a-upload
					disabled
						v-if="item.FieldType == 5 || item.FieldType == 6"
						v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
						:accept="item.FieldType == 5 ? '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'image/*'"
						:multiple="true"
						action="http://api.jlb.ac.acxk.net/Common/DoUploadFile?type=file"
						list-type="picture-card"
						:file-list="fileList[item.ID]"
						@preview="handlePreview"
						@change="e => handleChange(e, item.ID)"
					></a-upload>
					<a-date-picker
					disabled
						v-if="item.FieldType == 7"
						@change="e => dataChange(e, item.ID, 'data')"
						v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
					/>
					<a-time-picker
					disabled
						v-if="item.FieldType == 8"
						@change="e => dataChange(e, item.ID, 'time')"
						v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
					/>
				</a-form-item>
				<!-- <a-form-item class="fixed-bottom" :wrapper-col="{ span: 12, offset: 5 }"><a-button type="primary" html-type="submit">提交</a-button></a-form-item> -->
			</a-form>
		</div>
		<div class="main-apply">
			<div class="h3">审批信息</div>
			<a-steps class="apply-con" progress-dot v-if="flowData.length>0" :current="999" direction="vertical">
				<a-step v-for="(item, index) in flowData" 
				:title="item.FlowTypeName + (item.ExamUserName ? ' | '+item.ExamUserName+' | ': '') + (item.IsAdopt==null ? ' | 未审核':item.IsAdopt?'通过' : '驳回')" 
				:description="item.AddTime" />
			</a-steps>
			<div class="nothing" v-if="flowData.length==0">暂无审批信息</div>
			<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel"><img alt="example" style="width: 100%" :src="previewImage" /></a-modal>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import Func from '@/utils/func';
import { GetDetailUserApplyItemPageList } from '@/api/follow';
const data = [];
export default {
	components: {
	},
	data() {
		return {
			layoutContentHeight: window.innerHeight - 268 + 'px',
			icofileList: [],
			fileList: {},
			previewVisible: false,
			previewImage: '',
			fileList1: [],
			previewVisible1: false,
			previewImage1: '',
			data,
			flowData: [],
			applyIf: false,
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			formValue: {},
			dataValue: {},
			rules: {
				// validator: (rule, val, callback) => {
				// 			// var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
				// 			let pattern = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
				// 			if (!pattern.test(val)) {
				// 				callback('请输入正确手机号');
				// 			} else {
				// 				callback();
				// 			}
				// 			callback();
				// 		}
			},
			text: {},
			pageTitle:''
		};
	},
	computed: {},
	created() {
		this.getList();
	},
	mounted() {},
	methods: {
		moment,
		applyHander() {
			// let item={id:this.$route.query.ID}
			this.text = { ID: this.$route.query.ID };
			this.applyIf = true;
		},
		async getList() {
			let that = this;
			let data = {};
			data.id = this.$route.query.ID;
			let res = await GetDetailUserApplyItemPageList(data);
			this.data = res.data.formData;
			this.flowData = res.data.flowData?res.data.flowData:[];
			this.form.setFieldsValue({
				Title: res.data.data.Title,
				StartTime: res.data.data.StartTime,
				EndTime: res.data.data.EndTime,
				ApplyItemNodeName:res.data.data.ApplyItemNodeName+'（'+res.data.data.Score+'分）'
			});
			this.pageTitle = res.data.data.AddUserName +'( ' +res.data.data.AddUserNo +' )的'
			let fileArr=[]
			fileArr = res.data.fileData
			for(let i=0;i<fileArr.length;i++){
				this.icofileList.push(
				{
					uid: i,
					name: fileArr[i].FileName,
					status: 'done',
					url: 'http://api.jlb.ac.acxk.net'+fileArr[i].FilePath
				}
				)
			}
			setTimeout(function() {
				let list = res.data.formData;
				console.log(list.length);
				// console.log(this.data.length)
				for (var i = 0; i < list.length; i++) {
					console.log(list[i].ID);
					if(list[i].FieldType == 8){
						if(list[i].Value.indexOf('2020-10-10')>-1){
							that.form.setFieldsValue({
								[list[i].ID]: list[i].Value
							});
						}else{
							that.form.setFieldsValue({
								[list[i].ID]: '2020-10-10 '+list[i].Value
							});
						}
						
					}else{
						that.form.setFieldsValue({
							[list[i].ID]: list[i].Value
						});
					}
					if (list[i].FieldType == 5 || list[i].FieldType == 6) {
						that.fileList = Object.assign(that.fileList, { [list[i].ID]: [] });
					}
				}
				for (let i in that.fileList) {
					for (let n = 0; n < list.length; n++) {
						if (list[n].ID == i) {
							let arr = list[n].Value.split(',');
							console.log(arr);
							for (let m = 0; m < arr.length; m++) {
								if (arr[m]) {
									that.fileList[i].push({ uid: m, url: 'http://api.jlb.ac.acxk.net'+arr[m].split('|')[1], name: arr[m].split('|')[0], status: 'done' });
								}
							}
						}
					}
				}
				console.log(that.fileList);
			}, 500);
		},
		closeFunction(data) {
			this.$emit('closeFun', data);
		},
		closeFun() {
			this.applyIf = false;
		},
		handleCancel() {
			this.previewVisible = false;
			this.previewImage = '';
		},
		async handlePreview(file) {
			console.log(file);
			this.previewImage = file.url;
			this.previewVisible = true;
		},
		icohandleChange({ fileList }, name) {
			this.icofileList = fileList;
			if (fileList.length == 0) {
				this[name] = {};
			} else {
				if (fileList[0].status == 'done') {
					this[name] = 'http://api.jlb.ac.acxk.net/' + fileList[0].response.url;
					let url = 'http://api.jlb.ac.acxk.net/' + fileList[0].response.url;
					this.formValue = Object.assign(this.formValue, { [name]: url });
					console.log(this.formValue);
				}
			}
		},
		handleChange({ fileList }, name) {
			console.log('2');
			this.fileList[name] = fileList;
			console.log(this.fileList);
			if (fileList.length == 0) {
				this[name] = {};
			} else {
				if (fileList[0].status == 'done') {
					this[name] = 'http://api.jlb.ac.acxk.net/' + fileList[0].response.url;
					let url = 'http://api.jlb.ac.acxk.net/' + fileList[0].response.url;
					// this.formValue[name] = 'http://api.jlb.ac.acxk.net/'+fileList[0].response.url
					this.formValue = Object.assign(this.formValue, { [name]: url });
				}
			}
			console.log(this.fileList);
		},
		dataChange(e, name, type) {
			if (type == 'data') {
				let time = moment(e._d).format('YYYY-MM-DD HH:mm:ss');
				this.dataValue = Object.assign(this.dataValue, { [name]: time });
			} else {
				let time = moment(e._d).format('HH:mm:ss');
				this.dataValue = Object.assign(this.dataValue, { [name]: time });
			}
			console.log(this.dataValue);
		},
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields(async (err, values) => {
				if (!err) {
					let data = values;
					data = Object.assign(data, this.formValue, this.dataValue);
					data.ClubID = '63e6e20243d04c0094fe3cb27b244720';
					console.log(data);
					let res = await UpdateActivity(data);
					console.log(res);
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.main {
	height: 90%;
	width: 60%;
	overflow-y: scroll;
	float: left;
}
.main-apply {
	width: 36%;
	float: right;
	.apply-con{
		margin-top:20px;
		/deep/.ant-steps-item-content {
			width: 70%;
		}
		/deep/.ant-steps-item-subtitle{
			display:block;
			margin-left:0px;
		}
	}
	.nothing{
		text-align:center;
		margin:50px auto;
	}
}
.h3 {
	font-size: 14px;
	background: #f6f8f8;
	color: #1890ff;
	padding: 4px 10px;
}
/deep/.ant-form-item {
	margin: 4px 50px;
	/deep/.ant-form-item-label {
		width: 100px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: right;
	}
	/deep/.ant-form-item-control-wrapper {
		flex: 1;
		/deep/.ant-calendar-picker,
		/deep/.ant-time-picker {
			width: 100%;
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
	padding: 10px 0 0 10px;
}
.fixed-bottom {
	width: 164px;
	left: 50%;
	bottom: 0px;
	margin: 0px 0px 0px -82px !important;
	background-color: white;
	z-index: 999;
}
/deep/.ant-form {
	margin-top: 10px;
	padding-bottom: 10px;
}
.ant-calendar-picker,
.ant-time-picker {
	width: 100%;
}
</style>
