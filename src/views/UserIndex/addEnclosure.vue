<template>
	<div>
		<div class="aid">
			<div class="base">
				<p class="fixed-top">
					上传附件
					<a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
				</p>
				<div class="main">
					<a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }" @submit="handleSubmit">
						<a-form-item label="附件名称">
							<a-input
								v-decorator="[
									'FileName',
									{ rules: [{ required: true, message: '附件名称不能为空' }] }
								]"
							/>
						</a-form-item>
						
						
						<a-form-item label="附件">
							<a-upload
								v-decorator="['Ico', { rules: [{ required: true, message: '附件不能为空' }] }]"
								action="http://api.jlb.ac.acxk.net/Common/DoUploadFile?type=file"
								:file-list="icofileList"
								@change="e => icohandleChange(e, 'Ico')"
							>
								<div v-if="icofileList.length < 1" :disabled="showstate">
									<!-- <a-icon type="plus" /> -->
									<!-- <div class="ant-upload-text">Upload</div> -->
									<a-button> <a-icon type="upload" /> 上传 </a-button>
								</div>
							</a-upload>
							</a-form-item>
							<a-form-item class="fixed-bottom" :wrapper-col="{ span: 12, offset: 5 }">
								<!-- <a-popconfirm
								    title="暂存后不会提交,在列表页点击提交按钮提交!"
								    ok-text="好的"
								    cancel-text="取消"
								    @confirm="confirm"
								    @cancel="cancel"
								  >
								</a-popconfirm> -->
								<a-button type="primary" html-type="submit">确定</a-button>
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
import { AddUserActivityFile } from '@/api/follow';
const data = [];
export default {
	components: {
	},
	props: {
		ID:String,
	},
	watch: {
			time: {
				handler(ID) {

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
			ActivityTypeList:[],
		};
	},
	computed: {},
	created() {
	},
	mounted() {},
	methods: {
		moment,
		
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
					let data = {}
					let arr1=[]
					// data = Object.assign(data,this.formValue,this.dataValue)
					data.ActivityID = this.ID
					for(let m=0;m<this.icofileList.length;m++){
						if(this.icofileList[m].url){
							if(this.icofileList[m].url.indexOf('http://api.jlb.ac.acxk.net')>-1){
								this.icofileList[m].url = (this.icofileList[m].url).substring('http://api.jlb.ac.acxk.net'.length)
							}
							arr1.push(this.icofileList[m].url)
						}else{
							arr1.push(this.icofileList[m].response.url)
						}
					}
					data.FilePath = arr1.join(',')
					data.FileName=values.FileName
					// for(let i in this.fileList){
					// 	let arr=[]
					// 	for(let m=0;m<this.fileList[i].length;m++){
					// 		if(this.fileList[i][m].url){
					// 			if(this.fileList[i][m].url.indexOf('http://api.jlb.ac.acxk.net')>-1){
					// 				this.fileList[i][m].url = (this.fileList[i][m].url).substring('http://api.jlb.ac.acxk.net'.length)
					// 			}
					// 			arr.push(this.fileList[i][m].name+'|'+this.fileList[i][m].url)
					// 		}else{
					// 			arr.push(this.fileList[i][m].response.fileName+'|'+this.fileList[i][m].response.url)
					// 		}
					// 	}
					// 	data[i] = arr.join(',')
					// }
					// for(let n in data){
					// 	if(data[n]==undefined){
					// 		data[n] = ''
					// 	}
					// }
					let res = await AddUserActivityFile(data);
					if (res.data.code == 0) {
						this.$emit('closeFun')
						that.$message.success(res.data.msg)
					} else {
						that.$message.error(res.data.msg)
					}
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
	height: 340px;
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
