<template>
	<div>
		<div class="aid">
			<div class="base">
				<p class="fixed-top">
					申请活动
					<a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
				</p>
				<div class="main">
					<a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }" @submit="handleSubmit">
						<a-form-item label="活动标题">
							<a-input
								v-decorator="[
									'Title',
									{ rules: [{ required: true, message: '活动标题不能为空' }] }
								]"
							/>
						</a-form-item>
						<a-form-item label="活动类型">
						<a-select :allowClear="true" v-decorator="['TypeID',{ rules: [{ required: true, message: '请选择活动类型' }] }]" placeholder="全部" optionFilterProp="children" showSearch>
							<a-select-option v-for="(item, index) in ActivityTypeList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
						</a-select>
						</a-form-item>
						<a-form-item label="是否审批">
						 <a-radio-group v-decorator="['ApplyIsNeedExam',{ rules: [{ required: true, message: '请选择是否需要审批' }] }]">
						        <a-radio value="true">
						          是
						        </a-radio>
						        <a-radio value="false">
						          否
						        </a-radio>
						      </a-radio-group>
						</a-form-item>
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
								<div v-if="icofileList.length < 1" :disabled="showstate">
									<a-icon type="plus" />
									<div class="ant-upload-text">Upload</div>
								</div>
							</a-upload>
							<span class="titletip">Tip：请上传350*350格式的图片(宽高比例为1:1)</span>
							</a-form-item>
						<a-form-item label="开始时间">
							<a-date-picker
							format="YYYY-MM-DD HH:mm:ss"
							:show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
							@change="e => dataChange(e, 'StartTime','data')"
								v-decorator="['StartTime', { rules: [{ required: true, message: '活动开始时间不能为空' }] }]"
							/>
						</a-form-item>
						<a-form-item label="结束时间">
							<a-date-picker
							format="YYYY-MM-DD HH:mm:ss"
							:show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
							@change="e => dataChange(e, 'EndTime','data')"
								v-decorator="['EndTime', { rules: [{ required: true, message: '活动结束时间不能为空' }] }]"
							/>
						</a-form-item>
							<a-form-item v-for="item in data" :label="item.Name">
								<a-input
									v-if="item.FieldType == 1"
									v-decorator="[
										item.ID,
										{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' },{validator: rules[item.ID]?rules[item.ID].validator:''}] }
									]"
								/>
								<a-input
									v-if="item.FieldType == 2"
									type="textarea"
									v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' },{validator: rules[item.ID]?rules[item.ID].validator:''}] }]"
								/>
								<a-input
									v-if="item.FieldType == 3"
									type="number"
									v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' },{validator: rules[item.ID]?rules[item.ID].validator:''}] }]"
								/>
								<a-input
									v-if="item.FieldType == 4"
									type="number"
									:step="0.1"
									v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' },{validator: rules[item.ID]?rules[item.ID].validator:''}] }]"
								/>
								<!-- {{ JSON.stringify(rules) }} -->
								<a-upload
									v-if="item.FieldType == 5 || item.FieldType == 6"
									v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
									:accept="item.FieldType == 5?'.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document':'image/*'"
									:multiple="true"
									action="http://api.jlb.ac.acxk.net/Common/DoUploadFile?type=file"
									list-type="picture-card"
									:file-list="fileList[item.ID]"
									@preview="handlePreview"
									@change="e => handleChange(e, item.ID)"
								>
									<div v-if="fileList[item.ID].length < 8">
										<a-icon type="plus" />
										<div class="ant-upload-text">Upload</div>
									</div>
								</a-upload>
								<!-- <a-input
									v-if="item.FieldType == 5"
									type="number"
									v-decorator="[item.ID]"
								/> -->
								<a-date-picker
									v-if="item.FieldType == 7"
									@change="e => dataChange(e, item.ID,'data')"
									v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
								/>
								<a-time-picker
									v-if="item.FieldType == 8"
									@change="e => dataChange(e, item.ID,'time')"
									v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
								/>
							</a-form-item>
							<a-form-item class="fixed-bottom" :wrapper-col="{ span: 12, offset: 5 }">
								<a-popconfirm
								    title="暂存后不会提交,在列表页点击提交按钮提交!"
								    ok-text="好的"
								    cancel-text="取消"
								    @confirm="confirm"
								    @cancel="cancel"
								  >
								<a-button type="primary" html-type="submit">暂存</a-button>
								</a-popconfirm>
								</a-form-item>
						</a-form>
				</div>
				<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel"><img alt="example" style="width: 100%" :src="previewImage" /></a-modal>
			</div>
		</div>
		</div>
</template>

<script>
	import moment from 'moment'
import Func from '@/utils/func';
import { GetFormList,userAddActivity,UserUpdateActivity , UserDoGetActivityTypeList, } from '@/api/follow';
const data = [];
export default {
	components: {
	},
	props: {
		text: Object,
		ClubID:String,
		type:Number
	},
	watch: {
			time: {
				handler(text) {
				},
				immediate: true
			},
		},
	data() {
		return {
			icofileList:[],
			fileList: {},
			previewVisible: false,
			previewImage: '',
			fileList1: [],
			previewVisible1: false,
			previewImage1: '',
			data,
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			showstate:true,
			formValue:{},
			dataValue:{},
			rules: {
			},
			ActivityTypeList:[]
		};
	},
	computed: {},
	created() {
		this.getList();
	},
	mounted() {},
	methods: {
		moment,
		confirm(e) {
		      console.log(e);
			  this.handleSubmit(e)
		    },
		    cancel(e) {
		      // console.log(e);
		      // this.$message.error('Click on No');
		    },
		closeFunction(data) {
			this.$emit('closeFun', data);
		},
		handleCancel() {
			this.previewVisible = false;
			this.previewImage = '';
		},
		async handlePreview(file) {
			this.previewImage = 'http://api.jlb.ac.acxk.net/' + file.response.url;
			this.previewVisible = true;
		},
		icohandleChange({ fileList },name){
			this.icofileList = fileList;
			// if(fileList.length==0){
			// 	this[name] = {}
			// }else{
			// 	if(fileList[0].status == 'done'){
			// 		this[name] = 'http://api.jlb.ac.acxk.net/'+fileList[0].response.url
			// 		let url = 'http://api.jlb.ac.acxk.net/'+fileList[0].response.url
			// 		this.formValue = Object.assign(this.formValue,{[name]:url})
			// 		console.log(this.formValue)
			// 	}
			// }
		},
		handleChange({ fileList },name) {
			this.fileList[name] = fileList;
			// console.log(this.fileList)
			// if(fileList.length==0){
			// 	this[name] = {}
			// }else{
			// 	if(fileList[0].status == 'done'){
			// 		this[name] = 'http://api.jlb.ac.acxk.net/'+fileList[0].response.url
			// 		let url = 'http://api.jlb.ac.acxk.net/'+fileList[0].response.url
			// 		// this.formValue[name] = 'http://api.jlb.ac.acxk.net/'+fileList[0].response.url
			// 		this.formValue = Object.assign(this.formValue,{[name]:url})
			// 	}
			// }
		},
		dataChange(e,name,type){
			if(type=='data'){
				let time = moment(e._d).format('YYYY-MM-DD HH:mm:ss')
				this.dataValue = Object.assign(this.dataValue,{[name]:time})
			}else{
				let time = moment(e._d).format('HH:mm:ss')
				this.dataValue = Object.assign(this.dataValue,{[name]:time})
			}
		},
		handleSubmit(e) {
			let that = this
			e.preventDefault();
			this.form.validateFields( async (err, values) => {
				if (!err) {
					let data = values
					let arr1=[]
					data = Object.assign(data,this.formValue,this.dataValue)
					data.ClubID = this.ClubID
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
					for(let n in data){
						if(data[n]==undefined){
							data[n] = ''
						}
					}
					let res = await userAddActivity(data);
					if (res.data.code == 0) {
						this.$emit('closeFun')
						that.$message.success(res.data.msg)
					} else {
						that.$message.error(res.data.msg)
					}
				}
			});
		},
		async getOtherList() {
			let res = await GetApplyFormFieldTypeList();
			this.FieldTypeList = res.data.data;
		},
		async getList() {
			this.loading = true;
			let data = {};
			let  res2 = await UserDoGetActivityTypeList(data)
			this.ActivityTypeList = res2.data.data
			if (this.values) {
				data = this.values;
			}
			data.ClubID = this.ClubID;
			let res = await GetFormList(data);
			this.loading = false;
			this.data = res.data.data;
			// this.data.forEach((item, index, arr) => {
			// 	item.obj = 'a' + index;
			// });
			for (var i = 0; i < this.data.length; i++) {
				if(this.data[i].FieldType == 5||this.data[i].FieldType == 6){
					this.fileList = Object.assign(this.fileList,{[this.data[i].ID]:[]})
				}
				// if(this.data[i].FieldType == 5||this.data[i].FieldType == 6 ||this.data[i].FieldType == 7 ||this.data[i].FieldType == 8){
				// 	this.formValue = Object.assign(this.formValue,{[this.data[i].ID]:''})
				// }
				
				// this.rules = Object.assign(this.rules, {
				// 	[this.data[i].ID]: {
				// 		validator: (rule, val, callback) => {
				// 			// var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
				// 			let pattern = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
				// 			if (!pattern.test(val)) {
				// 				callback('请输入正确手机号');
				// 			} else {
				// 				callback();
				// 			}
				// 			callback();
				// 		}
				// 	}
				// });
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
			/deep/.ant-calendar-picker,/deep/.ant-time-picker{
				width:100%;
			}
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
.titletip{
		padding-left: 10px;
		font-size: 12px;
		color: red;
	}
</style>
