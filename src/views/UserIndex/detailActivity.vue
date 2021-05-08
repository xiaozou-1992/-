<template>
	<div>
		<div class="aid">
			<div class="base">
				<p class="fixed-top">
					活动详情
					<a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
				</p>
				<div class="main" :style="{ height: layoutContentHeight }">
					<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit">
						<a-form-item label="活动标题"><a-input disabled v-decorator="['Title', { rules: [{ required: true, message: '活动标题不能为空' }]}]" /></a-form-item>
						<a-form-item label="活动类型">
						<a-input disabled v-decorator="['TypeName', { rules: [{ required: true, message: '活动标题不能为空' }] }]" />
						</a-form-item>
						<a-form-item label="是否审批">
						 <a-radio-group disabled  v-decorator="['ApplyIsNeedExam',{ rules: [{ required: true, message: '请选择是否需要审批' }] }]">
						        <a-radio :value="true">
						          是
						        </a-radio>
						        <a-radio :value="false">
						          否
						        </a-radio>
						      </a-radio-group>
						</a-form-item>
						<a-form-item label="活动图标">
							<a-upload
							disabled
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
						</a-form-item>
						<a-form-item label="开始时间">
							<a-date-picker disabled format="YYYY-MM-DD HH:mm:ss" @change="e => dataChange(e, 'StartTime', 'data')" v-decorator="['StartTime', { rules: [{ required: true, message: '活动开始时间不能为空' }] }]" />
						</a-form-item>
						<a-form-item label="结束时间">
							<a-date-picker disabled format="YYYY-MM-DD HH:mm:ss" @change="e => dataChange(e, 'EndTime', 'data')" v-decorator="['EndTime', { rules: [{ required: true, message: '活动结束时间不能为空' }] }]" />
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
							disabled
								v-if="item.FieldType == 2"
								type="textarea"
								v-decorator="[
									item.ID,
									{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
								]"
							/>
							<a-input
							disabled
								v-if="item.FieldType == 3"
								type="number"
								v-decorator="[
									item.ID,
									{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
								]"
							/>
							<a-input
							disabled
								v-if="item.FieldType == 4"
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
							>
								<div>
									<a-icon type="plus" />
									<div class="ant-upload-text">Upload</div>
								</div>
							</a-upload>
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
				<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel"><img alt="example" style="width: 100%"
					 :src="previewImage" /></a-modal>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import Func from '@/utils/func';
	import {
		UserActivityDetail,UserUpdateActivity 
	} from '@/api/follow';
	const data = [];
	export default {
		components: {},
		props: {
			text: Object,
			ClubID: String,
		},
		watch: {
			time: {
				handler(text) {
					// this.GetdetailList()
				},
				immediate: true
			},
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
			isapply:'',
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
			data.id = this.text.ID;
			let res = await UserActivityDetail(data);
			this.detail = res.data.data
			this.data = res.data.formData;
			this.flowData = res.data.flowData;
			this.form.setFieldsValue({
				Title: res.data.data.Title,
				StartTime: res.data.data.StartTime,
				EndTime: res.data.data.EndTime,
				Ico: res.data.data.Ico,
				TypeName:res.data.data.TypeName,
				ApplyIsNeedExam:res.data.data.ApplyIsNeedExam
			});
			this.isapply=res.data.data.ApplyIsNeedExam
			this.icofileList = [
				{
					uid: '-1',
					name: ' ',
					status: 'done',
					 url: 'http://api.jlb.ac.acxk.net'+(res.data.data.Ico).split('|')[1]
				}
			];
			setTimeout(function() {
				let list = res.data.formData;
				// console.log(this.data.length)
				for (var i = 0; i < list.length; i++) {
					if (list[i].FieldType == 8) {
						that.form.setFieldsValue({
							[list[i].ID]: '2020-10-10 ' + list[i].Value
						});
					} else {
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
									that.fileList[i].push({ uid: m, url: arr[m].indexOf("http")>=0? arr[m]:'http://api.jlb.ac.acxk.net'+ arr[m], name: ' ', status: 'done' });
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
		},
		dataChange(e, name, type) {
			if (type == 'data') {
				let time = moment(e._d).format('YYYY-MM-DD HH:mm:ss');
				this.dataValue = Object.assign(this.dataValue, { [name]: time });
			} else {
				let time = moment(e._d).format('HH:mm:ss');
				this.dataValue = Object.assign(this.dataValue, { [name]: time });
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
							arr1.push(this.icofileList[m].url)
						}else{
							arr1.push(this.icofileList[m].response.url)
						}
					}
					data.Ico = arr1.join(',')
					for(let i in this.fileList){
						let arr=[]
						for(let m=0;m<this.fileList[i].length;m++){
							if(this.fileList[i][m].url){
								arr.push(this.fileList[i][m].url)
							}else{
								arr.push(this.fileList[i][m].response.url)
							}
						}
						data[i] = arr.join(',')
					}
					data = Object.assign(data, this.formValue, this.dataValue);
					let res = await UserUpdateActivity(data);
					if(res.data.code==0){
						this.$message.success(res.data.msg)
						 this.$router.go(-1);
					}
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
			// height: 90%;
			// overflow-y: scroll;
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

				/deep/.ant-calendar-picker,
				/deep/.ant-time-picker {
					width: 100%;
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
		left: 50%;
		margin: 0px 0px 0px -82px !important;
		background-color: white;
		z-index: 999;
	}

	/deep/.ant-form {
		margin-top: 50px;
		padding-bottom: 50px;
	}
</style>
