<template>
	<div>
		<div class="h2">
			活动修改
			
		</div>
		<div class="main" :style="{ height: layoutContentHeight }">
			<div class="h3">基础信息</div>
			<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit">
				<a-form-item label="活动标题"><a-input v-decorator="['Title', { rules: [{ required: true, message: '活动标题不能为空' }] }]" /></a-form-item>
				<a-form-item label="活动图标">
					<a-upload
						v-decorator="['Ico', { rules: [{ required: true, message: '活动图标不能为空' }] }]"
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
					<div class="titletip">Tip：请上传350*350格式的图片(宽高比例为1:1)</div>
				</a-form-item>
				<a-form-item label="类型">
					<a-select :allowClear="true" v-decorator="['TypeID']" placeholder="全部" optionFilterProp="children" showSearch>
						<a-select-option v-for="(item, index) in ActivityTypeList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="开始时间">
					<a-date-picker show-time @change="e => dataChange(e, 'StartTime', 'data')" v-decorator="['StartTime', { rules: [{ required: true, message: '活动开始时间不能为空' }] }]" />
				</a-form-item>
				<a-form-item label="结束时间">
					<a-date-picker show-time @change="e => dataChange(e, 'EndTime', 'data')" v-decorator="['EndTime', { rules: [{ required: true, message: '活动结束时间不能为空' }] }]" />
				</a-form-item>
				<a-form-item label="审核设置">
					<a-radio-group v-decorator="['ApplyIsNeedExam', { rules: [{ required: true, message: '审核设置不能为空' }] }]">
						<a-radio :value="true">需要审核</a-radio>
						<a-radio :value="false">不需要审核</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item v-for="item in data" :label="item.Name">
					<a-input
						v-if="item.FieldType == 1"
						v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]"
					/>
					<a-input
						v-if="item.FieldType == 2"
						type="textarea"
						v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]"
					/>
					<a-input
						v-if="item.FieldType == 3"
						type="number"
						v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]"
					/>
					<a-input
						v-if="item.FieldType == 4"
						type="number"
						v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]"
					/>
					<!-- {{ JSON.stringify(rules) }} -->
					<a-upload
						v-if="item.FieldType == 5 || item.FieldType == 6"
						v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
						:accept="item.FieldType == 5 ? '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'image/*'"
						:multiple="true"
						action="http://api.jlb.ac.acxk.net/Common/DoUploadFile?type=file"
						list-type="picture-card"
						:file-list="fileList[item.ID]"
						@preview="handlePreview"
						@change="e => handleChange(e, item.ID)"
					>
						<div>
							<a-icon type="plus" />
							<div class="ant-upload-text">Upload</div>
						</div>
					</a-upload>
					<a-date-picker
						v-if="item.FieldType == 7"
						@change="e => dataChange(e, item.ID, 'data')"
						v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
					/>
					<a-time-picker
						v-if="item.FieldType == 8"
						@change="e => dataChange(e, item.ID, 'time')"
						v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
					/>
				</a-form-item>
				<a-form-item class="fixed-bottom" :wrapper-col="{ span: 12, offset: 5 }"><a-button type="primary" html-type="submit">提交</a-button></a-form-item>
			</a-form>
		</div>
		<div class="main-apply">
			<div class="h3">俱乐部信息</div>
			<div class="message">
				<div class="con">
					<div class="tit">名　　称：</div>
					<div class="cell">{{ info.ClubName }}</div>
				</div>
				<div class="con">
					<div class="tit">成员数量：</div>
					<div class="cell">{{ info.MemberNum }}</div>
				</div>
				<div class="con">
					<div class="tit">主席姓名：</div>
					<div class="cell">{{ info.ChargeUserName }}</div>
				</div>
				<div class="con">
					<div class="tit">主席学号：</div>
					<div class="cell">{{ info.ChargeUserNo }}</div>
				</div>
				<div class="con">
					<div class="tit">添加时间：</div>
					<div class="cell">{{ info.AddTime }}</div>
				</div>
			</div>
			<div class="h3">审批信息</div>
			<a-steps class="apply-con" progress-dot v-if="flowData.length>0" :current="1" direction="vertical">
				<a-step v-for="(item, index) in flowData" :title="item.FlowTypeName+(item.IsAdopt?'通过':'驳回')" :description="item.AddTime" />
			</a-steps>
			<div v-if="flowData.length==0" class="nothing">暂无审批信息</div>
		</div>
		<apply :text="text" v-show="applyIf" @closeFun="closeFun"></apply>
		<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel"><img alt="example" style="width: 100%" :src="previewImage" /></a-modal>
	</div>
</template>

<script>
import moment from 'moment';
import Func from '@/utils/func';
import { getActivityDetail,UpdateActivity,GetActivityTypeList } from '@/api/follow';
import apply from './apply';
const data = [];
export default {
	components: {
		apply
	},
	data() {
		return {
			detail:{},
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
			info:{},
			time:moment(),
			ActivityTypeList:[],
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
			text: {}
		};
	},
	computed: {},
	created() {
		this.getOtherList()
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
		async getOtherList(){
			let res = await GetActivityTypeList(data);
			this.ActivityTypeList = res.data.data
		},
		async getList() {
			let that = this;
			let data = {};
			data.id = this.$route.query.ID;
			let res = await getActivityDetail(data);
			this.detail = res.data.data
			this.info = res.data.data
			this.data = res.data.formData;
			this.flowData = res.data.flowData;
			this.form.setFieldsValue({
				Title: res.data.data.Title,
				StartTime: res.data.data.StartTime,
				EndTime: res.data.data.EndTime,
				Ico:res.data.data.Ico,
				TypeID: res.data.data.TypeID,
				ApplyIsNeedExam:res.data.data.ApplyIsNeedExam
			});
			this.icofileList = res.data.data.Ico?[
				{
					uid: 0,
					name: (res.data.data.Ico).split('|')[0],
					status: 'done',
					url: 'http://api.jlb.ac.acxk.net'+(res.data.data.Ico).split('|')[1]
				}
			]:[];
			setTimeout(function() {
				let list = res.data.formData;
				for (var i = 0; i < list.length; i++) {
					if(list[i].FieldType == 8){
						that.form.setFieldsValue({
							[list[i].ID]: '2020-10-10 '+list[i].Value
						});
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
							for (let m = 0; m < arr.length; m++) {
								if (arr[m]) {
									that.fileList[i].push({ uid: m, url: 'http://api.jlb.ac.acxk.net'+arr[m].split('|')[1], name: arr[m].split('|')[0], status: 'done' });
								}
							}
						}
					}
				}
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
			this.previewImage = file.url;
			this.previewVisible = true;
		},
		icohandleChange({ fileList }, name) {
			this.icofileList = fileList;
			// if (fileList.length == 0) {
			// 	this[name] = {};
			// } else {
			// 	if (fileList[0].status == 'done') {
			// 		this[name] = 'http://api.jlb.ac.acxk.net/' + fileList[0].response.url;
			// 		let url = 'http://api.jlb.ac.acxk.net/' + fileList[0].response.url;
			// 		this.formValue = Object.assign(this.formValue, { [name]: url });
			// 		console.log(this.formValue);
			// 	}
			// }
		},
		handleChange({ fileList }, name) {
			this.fileList[name] = fileList;
			// if (fileList.length == 0) {
			// 	this[name] = {};
			// } else {
			// 	if (fileList[0].status == 'done') {
			// 		this[name] = 'http://api.jlb.ac.acxk.net/' + fileList[0].response.url;
			// 		let url = 'http://api.jlb.ac.acxk.net/' + fileList[0].response.url;
			// 		// this.formValue[name] = 'http://api.jlb.ac.acxk.net/'+fileList[0].response.url
			// 		this.formValue = Object.assign(this.formValue, { [name]: url });
			// 	}
			// }
			console.log(this.fileList);
		},
		dataChange(e, name, type) {
			if (type == 'data') {
				if(e){
					let time = moment(e._d).format('YYYY-MM-DD HH:mm:ss');
					this.dataValue = Object.assign(this.dataValue, { [name]: time });
				}else{
					let time = ''
					this.dataValue = Object.assign(this.dataValue, { [name]: time });
				}
			} else {
				if(e){
					let time = moment(e._d).format('HH:mm:ss');
					this.dataValue = Object.assign(this.dataValue, { [name]: time });
				}else{
					let time = '';
					this.dataValue = Object.assign(this.dataValue, { [name]: time });
				}
			}
		},
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields(async (err, values) => {
				if (!err) {
					let data = values;
					data.ID = this.detail.ID
					data.ClubID = this.detail.ClubID
					let arr1=[]
					for(let m=0;m<this.icofileList.length;m++){
						if(this.icofileList[m].url){
							if(this.icofileList[m].url.indexOf('http://api.jlb.ac.acxk.net')>-1){
								this.icofileList[m].url = (this.icofileList[m].url).substring('http://api.jlb.ac.acxk.net'.length)
							}
							arr1.push(this.icofileList[m].name+'|'+this.icofileList[m].url)
						}else{
							arr1.push(this.icofileList[m].response.fileName+'|'+this.icofileList[m].response.url)
						}
					}
					data.Ico = arr1.join(',')
					for(let i in this.fileList){
						let arr=[]
						for(let m=0;m<this.fileList[i].length;m++){
							if(this.fileList[i][m].url){
								if(this.fileList[i][m].url.indexOf('http://api.jlb.ac.acxk.net')>-1){
									this.fileList[i][m].url = (this.fileList[i][m].url).substring('http://api.jlb.ac.acxk.net'.length)
								}
								arr.push(this.fileList[i][m].name+'|'+this.fileList[i][m].url)
							}else{
								arr.push(this.fileList[i][m].response.fileName+'|'+this.fileList[i][m].response.url)
							}
						}
						data[i] = arr.join(',')
					}
					data = Object.assign(data, this.formValue, this.dataValue);
					let res = await UpdateActivity(data);
					if(res.data.code==0){
						this.$message.success(res.data.msg)
						this.icofileList=[]
						this.fileList= {}
						this.getList()
					}
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
.titletip{
		padding-left: 10px;
		font-size: 14px;
		color: red;
		margin-top:-20px;
	}
.main-apply {
	width: 36%;
	float: right;
	.apply-con {
		margin-top: 20px;
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
	.message{
		padding:10px;
		.con{
			width:100%;
			line-height:40px;
			height:40px;
			border-bottom:1px dashed #eee;
			padding:0 10px;
			overflow: hidden;
			.tit{
				float:left;
				width:90px;
			}
			.cell{
				float:left;
			}
		}
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
