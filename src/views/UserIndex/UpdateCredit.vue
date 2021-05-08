<template>
	<div>
		<div class="aid">
			<div class="base">
				<p class="fixed-top">
					修改申请积分项
					<a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
				</p>
				<div class="main" :style="{ height: layoutContentHeight }">

					<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit">
						<a-form-item label="申请项">
							<a-tree-select
							    v-decorator="['ApplyItemNodeID', { rules: [{ required: true, message: '活动标题不能为空' }] }]"
							    style="width: 100%"
							    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
							    :tree-data="applyItemNodeList"
							    tree-default-expand-all
									:replace-fields="replaceFields"
									allowClear
							  >
							  </a-tree-select>
						</a-form-item>
						<a-form-item label="标题">
							<a-input v-decorator="['Title', { rules: [{ required: true, message: '活动标题不能为空' }] }]" />
						</a-form-item>
						<a-form-item label="附件">
							<a-upload v-decorator="['Files', { rules: [{ required: true, message: '活动图标不能为空' }] }]" accept="image/*" action="http://api.jlb.ac.acxk.net/Common/DoUploadFile?type=file"
							 list-type="picture-card" :file-list="icofileList" @preview="handlePreview" @change="e => icohandleChange(e, 'Ico')">
								<div>
									<a-icon type="plus" />
									<div class="ant-upload-text">Upload</div>
								</div>
							</a-upload>
						</a-form-item>
						<a-form-item v-for="item in data" :label="item.Name">
							<a-input v-if="item.FieldType == 1" v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]" />
							<a-input v-if="item.FieldType == 2" type="textarea" v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]" />
							<a-input v-if="item.FieldType == 3" type="number" v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]" />
							<a-input v-if="item.FieldType == 4" type="number" v-decorator="[
							item.ID,
							{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }, { validator: rules[item.ID] ? rules[item.ID].validator : '' }] }
						]" />
							<!-- {{ JSON.stringify(rules) }} -->
							<a-upload v-if="item.FieldType == 5 || item.FieldType == 6" v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
							 :accept="item.FieldType == 5 ? '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'image/*'"
							 :multiple="true" action="http://api.jlb.ac.acxk.net/Common/DoUploadFile?type=file" list-type="picture-card"
							 :file-list="fileList[item.ID]" @preview="handlePreview" @change="e => handleChange(e, item.ID)">
								<div>
									<a-icon type="plus" />
									<div class="ant-upload-text">Upload</div>
								</div>
							</a-upload>
							<a-date-picker v-if="item.FieldType == 7" @change="e => dataChange(e, item.ID, 'data')" v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]" />
							<a-time-picker v-if="item.FieldType == 8" @change="e => dataChange(e, item.ID, 'time')" v-decorator="[item.ID, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]" />
						</a-form-item>
						<a-form-item class="fixed-bottom" :wrapper-col="{ span: 12, offset: 5 }">
							<a-button type="primary" html-type="submit">提交</a-button>
						</a-form-item>
					</a-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import Func from '@/utils/func';
	import {
		DetailUserApplyItem,
		DoUpdateUserApplyItem,
		DoGetFormListUserApplyItem,
		GetApplyItemNodeList,
		GetApplyItemTypeList
	} from '@/api/follow';
	const data = [];
	export default {
		components: {},
		props: {
			text: Object,
			ClubID: String,
			type: Number,
			time: null
		},
		watch: {
			time: {
				handler(text) {
					if (this.text) {
						this.getOtherList()
						this.getList();
					}
				},
				immediate: true
			},
		},
		data() {
			return {
				detail: {},
				layoutContentHeight: window.innerHeight - 268 + 'px',
				icofileList: [],
				fileList: {},
				previewVisible: false,
				previewImage: '',
				fileList1: [],
				previewVisible1: false,
				previewImage1: '',
				data: [],
				flowData: [],
				applyIf: false,
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				replaceFields:{
					children:'children', title:'Name', key:'ID', value: 'ID' 
				},
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
				// text: {},
				applyItemNodeList: [
					// {
					// 	ID: "9a551bb5a71b48f19f547c49a0d955dd",
					// 	Name: "申请积分",
					// 	Score: 244,
					// 	TypeID: "45cac92980654e58ac75c65a92c7f227",
					// 	TypeName: "类型2"
					// }
				]
			};
		},
		computed: {},
		created() {
			// this.getOtherList()
			// this.getList();
		},
		mounted() {

		},
		methods: {
			moment,
			async getOtherList(){
				this.data = [];
				this.loading = true;
				let data = {};
				let arr1=[],arr2=[],arr3=[],arr4=[]
				let res = await GetApplyItemTypeList(data);
				arr1 = res.data.data
				let res1 = await GetApplyItemNodeList(data);
				arr2 = res1.data.data
				arr2.map((value, index, arry) => {
				  arr3.push({
				    'ID': value.ID,
				    'Name': value.Name+'('+ value.Score +'分)',
				    'Score': value.Score,
				    'ParentID': value.TypeID,
						'TypeID': value.TypeID,
				    'TypeName': value.TypeName
				  })
				})
				arr4 = arr1.concat(arr3)
				this.applyItemNodeList = this.toTree(arr4);
			},
			toTree(data) {
				let result = [];
				let map = {};
				if (!Array.isArray(data)) {
					//验证data是不是数组类型
					return [];
				}
				data.forEach(item => {
					//建立每个数组元素id和该对象的关系
					map[item.ID] = item; //这里可以理解为浅拷贝，共享引用
				});
				data.forEach(item => {
					let parent = map[item.ParentID]; //找到data中每一项item的爸爸
					item = Object.assign(item,{'selectable':item.Score?true:false})
					if (parent) {
						//说明元素有爸爸，把元素放在爸爸的children下面
						(parent.children || (parent.children = [])).push(item);
					} else {
						//说明元素没有爸爸，是根节点，把节点push到最终结果中
						result.push(item); //item是对象的引用
					}
				});
				return result; //数组里的对象和data是共享的
			},
			applyHander() {
				// let item={id:this.$route.query.ID}
				// this.text = { ID: this.$route.query.ID };
				this.applyIf = true;
			},
			async getList() {
				let that = this;
				let data = {};
				data.id = this.text.ID
				let res = await DetailUserApplyItem(data);
				this.detail = res.data.data

				this.data = res.data.formData;
				// this.flowData = res.data.flowData;
				this.form.setFieldsValue({
					Title: res.data.data.Title,
					ApplyItemNodeID: res.data.data.ApplyItemNodeID,
					Files: 1
				});
				let fileArr = []
				fileArr = res.data.fileData
				for (let i = 0; i < fileArr.length; i++) {
					this.icofileList.push({
						uid: i,
						name: fileArr[i].FileName,
						status: 'done',
						url: 'http://api.jlb.ac.acxk.net' + fileArr[i].FilePath
					})
				}
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
							that.fileList = Object.assign(that.fileList, {
								[list[i].ID]: []
							});
						}
					}
					for (let i in that.fileList) {
						for (let n = 0; n < list.length; n++) {
							if (list[n].ID == i) {
								let arr = list[n].Value.split(',');
								for (let m = 0; m < arr.length; m++) {
									if (arr[m]) {
										that.fileList[i].push({
											uid: m,
											url: 'http://api.jlb.ac.acxk.net' + arr[m].split('|')[1],
											name: arr[m].split('|')[0],
											status: 'done'
										});
									}
								}
							}
						}
					}
				}, 500);
			},
			closeFunction(data) {
				this.icofileList = []
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
			icohandleChange({
				fileList
			}, name) {
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
			handleChange({
				fileList
			}, name) {
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
					if (e) {
						let time = moment(e._d).format('YYYY-MM-DD HH:mm:ss');
						this.dataValue = Object.assign(this.dataValue, {
							[name]: time
						});
					} else {
						let time = ''
						this.dataValue = Object.assign(this.dataValue, {
							[name]: time
						});
					}
				} else {
					if (e) {
						let time = moment(e._d).format('HH:mm:ss');
						this.dataValue = Object.assign(this.dataValue, {
							[name]: time
						});
					} else {
						let time = '';
						this.dataValue = Object.assign(this.dataValue, {
							[name]: time
						});
					}
				}
			},
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields(async (err, values) => {

					if (!err) {

						let data = values;
						data.ID = this.detail.ID
						let arr1 = []
						console.log(this.icofileList)
						for (let m = 0; m < this.icofileList.length; m++) {
							if (this.icofileList[m].url) {
								if (this.icofileList[m].url.indexOf('http://api.jlb.ac.acxk.net') > -1) {
									this.icofileList[m].url = (this.icofileList[m].url).substring('http://api.jlb.ac.acxk.net'.length)
								}
								arr1.push(this.icofileList[m].name + '|' + this.icofileList[m].url)
							} else {
								arr1.push(this.icofileList[m].response.fileName + '|' + this.icofileList[m].response.url)
							}
						}
						data.Files = arr1.join(',')
						for (let i in this.fileList) {
							let arr = []
							for (let m = 0; m < this.fileList[i].length; m++) {
								if (this.fileList[i][m].url) {
									if (this.fileList[i][m].url.indexOf('http://api.jlb.ac.acxk.net') > -1) {
										this.fileList[i][m].url = (this.fileList[i][m].url).substring('http://api.jlb.ac.acxk.net'.length)
									}
									arr.push(this.fileList[i][m].name + '|' + this.fileList[i][m].url)
								} else {
									arr.push(this.fileList[i][m].response.fileName + '|' + this.fileList[i][m].response.url)
								}
							}
							data[i] = arr.join(',')
						}
						data = Object.assign(data, this.formValue, this.dataValue);
						for (let n in data) {
							if (data[n] == undefined) {
								data[n] = ''
							}
						}
						let res = await DoUpdateUserApplyItem(data);
						if (res.data.code == 0) {
							this.$message.success(res.data.msg)
							this.$emit('closeFun', data);
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
		overflow-y: scroll;

		.main {
			padding-top: 50px;
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

	.main-apply {
		width: 36%;
		float: right;

		.apply-con {
			margin-top: 20px;
		}

		.nothing {
			text-align: center;
			margin: 50px auto;
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
