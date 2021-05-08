<template>
	<div class="aid">
		<div class="base">
			<p>
				头像上传
				<a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="选择图片">
					<a-upload :file-list="fileList" :remove="handleRemove"  @preview="handlePreview" list-type="picture-card"
					 v-decorator="['headImage', { rules: [{ required: true, message: '请先上传一张图片' }] }]" accept="image/*" :before-upload="beforeUpload"
					 @change="handleChange">
						<a-button v-if="fileList.length < 1">
							<a-icon type="upload" /> 上传头像</a-button>
					</a-upload>
					<span class="titletip">Tip：请上传350*350格式的图片(宽高比例为1:1)</span>
				</a-form-model-item>
				<div class="btn">
					<a-button type="primary" class="btn2" @click="handleSubmit">确定</a-button>
					<a-button style="margin-left: 10px;" @click="closeFunction">取消</a-button>
				</div>
			</a-form-model>
		</div>
		<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
			<img alt="example" style="width: 100%" :src="previewImage" />
		</a-modal>
	</div>
</template>

<script>
	function getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}
	import {
		UserDoSetHeadImage,
		UserDoUpdateBase64Image,
		GetUserInfo
	} from '@/api/follow';
	import Cache from '@/utils/cache'
	export default {
		props: {
			// num:Number
		},
		watch: {
			text: function(text) {
				this.form.linkurl = '';
				this.fileList = [];
			}
		},
		data() {
			return {
				labelCol: {
					span: 4
				},
				wrapperCol: {
					span: 14
				},
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				headImage: '',
				fileList: [],
				formLayout: 'horizontal',
				form: {
					linkurl: '',
					ImageTypeID: '',
					Name: '',
					Url: ''
				},
				typedata: [],
				addshow: false,
				typename: '',
				loading: false,
				imageUrl: '',
				ticket: Cache.get('token'),
				rules: {
					ImageTypeID: [{
						required: true,
						message: '请选择类别',
						trigger: 'change'
					}]
				},
				previewVisible: false,
				previewImage: '',
			};
		},
		async created() {},
		methods: {
			handleCancel() {
				this.previewVisible = false;
			},
			async handlePreview(file) {
				console.log(file)
			      if (!file.url && !file.preview) {
			        file.preview = await getBase64(file.originFileObj);
			      }
			      this.previewImage = file.url || file.preview;
			      this.previewVisible = true;
			    },
			handleRemove(file) {
				console.log(file)
				const index = this.fileList.indexOf(file);
				const newFileList = this.fileList.slice();
				newFileList.splice(index, 1);
				this.fileList = newFileList;
			},
			async handleSubmit(e) {
				e.preventDefault();
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						let data1 = {}
						data1.headImage = this.headImage
						Promise.resolve(UserDoSetHeadImage(data1)).then((m) => {
							if (m.data.code == 0) {
								this.$message.success(m.data.msg)
								let session = Cache.get('myInfo')
								session.HeadImage = this.headImage
								Cache.set('myInfo', session);
								this.$emit('closeFun', 2);
							}
						})
						// let res=UserDoSetHeadImage(data1)
						// console.log(res.data)
						// if(res.data.code==0){
						// 		that.$message.success(res.data.msg)
						// 		this.$emit('closeFun');
						// 	}

					} else {
						return false;
					}
				});
			},
			closeFunction(data) {
				this.$emit('closeFun');
				this.form = {}
				this.imageUrl = ''
				this.fileList = []
			},
			beforeUpload(file) {
				this.fileList = [...this.fileList, file];
				
				console.log(this.fileList)
			},
			async handleChange(info) {
				console.log(info)
				if (info.file.originFileObj) {
					getBase64(info.file.originFileObj, imageUrl => {
						this.imageUrl = imageUrl;
						let data = {}
						let newbase = this.imageUrl
						let base = newbase.lastIndexOf("\,")
						newbase = newbase.substring(base + 1, newbase.length)
						data.data = newbase
						Promise.resolve(UserDoUpdateBase64Image(data)).then((v) => {

							this.headImage = v.data.url
							let list= [{
								uid:-1,
								name:this.fileList[0].name,
								status:'done',
								url:'http://api.jlb.ac.acxk.net'+this.headImage
							}]
							this.fileList=list
							// let data1 = {}
							// data1.headImage = 'http://api.jlb.ac.acxk.net'+v.data.url
							// Promise.resolve(UserDoSetHeadImage(data1)).then((m) => {
							// 	console.log(m.data)
							// })

						})
					});
				} else {
					return false
				}

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
		position: relative;
		width: 600px;
		height: 300px;
		background: #fff;
		left: 50%;
		top: 50%;
		margin-left: -300px;
		margin-top: -150px;
		overflow-y: auto;

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

	.titletip {
		padding-left: 10px;
		font-size: 12px;
		color: red;
	}

	.btn {
		margin-top: 10px;
		text-align: center;
	}

	.addtype {
		color: #1890ff;
	}

	.addtype:hover {
		cursor: pointer;
	}

	.mbzz {
		position: fixed;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.addimgtype {
		width: 30rem;
		text-align: center;
		border: 1px solid gray;
		position: absolute;
		top: 50%;
		left: 50%;
		background: #ffffff;
		height: 14rem;
		z-index: 999;
		margin-top: -7rem;
		margin-left: -15rem;

		p {
			padding: 10px 0 0 10px;
		}
	}

	.titletip {
		padding-left: 10px;
		font-size: 12px;
		color: red;
	}
</style>
