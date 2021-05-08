<template>
	<div class="aid">
		<div class="base"  @click="refresh">
			<p>
				图片上传
				<a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="选择图片">
					<a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" @change="imghandleChange">
						<a-button v-if="fileList.length == 0">
							<a-icon type="upload" />
							选择文件
						</a-button>
					</a-upload>
				</a-form-model-item>
				<a-form-model-item ref="name" label="名称" prop="Name"><a-input placeholder="请输入图片名称" v-model="form.Name" /></a-form-model-item>
				<a-form-model-item label="类别" prop="ImageTypeID">
					<a-select style="width: 80%" @change="handleChange" v-model="form.TypeName" placeholder="请选择类别">
						<a-select-option v-for="item in typedata" :value="item.ID">{{ item.TypeName }}</a-select-option>
					</a-select>
					<span class="addtype" @click="goadd">未找到合适分类？去新增</span>
				</a-form-model-item>
				<div class="btn">
					<a-button type="primary" class="btn2" @click="handleSubmit">确定</a-button>
					<a-button style="margin-left: 10px;" @click="closeFunction">取消</a-button>
				</div>
			</a-form-model>
		</div>
		<div class="mbzz" v-if="addshow" @click="closeaddshow">
			<div @click.stop class="addimgtype">
				<p>
					<span  style="float: left;">新增相册类别</span>
					<a-icon @click.stop="closeaddshow" :style="{ float: 'right', margin: '10px', 'font-size': '1.2rem' }" type="close-circle" />
				</p>

				<a-form-model ref="ruleForm1" :model="form1" :rules="rules1" :label-col="labelCol" :wrapper-col="wrapperCol" style="padding: 20px;">
					<a-form-model-item ref="name" label="名称" prop="name"><a-input v-model="form1.name" placeholder="请输入类别名称" /></a-form-model-item>
				</a-form-model>
				<div class="btn">
					<a-button type="primary" class="btn2" @click="imgtypeSubmit">确定</a-button>
					<a-button style="margin-left: 10px;" @click="closeaddshow">取消</a-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { uploadFun, addStoreImage, getStoreImageType, addStoreImageType } from '@/api/follow';
export default {
	props: {
		text: Object,
		customerSourse: Array,
		typeString: String
	},
	watch: {
		text: function(text) {
			this.form.linkurl = '';
			this.fileList = [];
		}
	},
	data() {
		return {
			labelCol: { span: 4 },
			wrapperCol: { span: 14 },
			form1: {
				name: ''
			},
			rules1: {
				name: [{ required: true, message: '请输入名称', trigger: 'change' }]
			},
			fileList: [],
			pagination: {
				currentPage: 1,
				pageSize: this.global.pageSize,
				pageSizeOptions: this.global.pageSizeOptions, //每页中显示的数据
				showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
			},
			data: [
				{ linkurl: '/pagesIndex/localStore/shopIndex', Name: '本店' },
				{ linkurl: '/pagesIndex/localStore/vr', Name: 'VR' },
				{ linkurl: '/pagesIndex/localStore/detail', Name: '详情' }
			],
			tableData: [],
			loading: false,
			uploading: false,
			radio: '',
			radio1: '',
			formLayout: 'horizontal',
			form: {
				linkurl: '',
				ImageTypeID: '',
				Name: '',
				Url: ''
			},
			rules: {
				ImageTypeID: [
					{
						required: true,
						message: '请选择类别',
						trigger: 'change'
					}
				],
				Name: [{ required: true, message: '请输入名称', trigger: 'change' }]
			},
			typedata: [],
			addshow: false,
			typename: ''
		};
	},
	async created() {
		// await this._getList();
		await this._getTypeList();
	},
	methods: {
		refresh(){
			this._getTypeList()
		},
		async imgtypeSubmit() {
			this.$refs.ruleForm1.validate(async valid => {
				if (valid) {
					let data = {};
					data.TypeName = this.form1.name;
					let res = await addStoreImageType(data);
					this.$message.success(res.data.msg);
					this.addshow = false;
					this._getTypeList()
				} else {
					return false;
				}
			});
		},
		async imghandleChange(info) {
			const { fileList } = this;
			const formData = new FormData();
			fileList.forEach(file => {
				formData.append('file', file);
			});
			if (info.fileList.length > 0) {
				let data = {};
				data.linkurl = this.form.linkurl;
				data.linkurl = data.linkurl.replace(/#/g, '|');
				// data.name=this.form.name
				// data.type = this.form.type
				data.type = 1;
				// data.isPurpose = this.form.IsPurpose==1?true:false
				data.formData = formData;
				this.uploading = true;
				let res = await uploadFun(data);
				if (res) {
					this.$message.success(res.data.msg);
					if (res.data.code === 0) {
						this.form.Url = res.data.imageUrl;
					}
				}
			}
		},
		async _getTypeList() {
			let res = await getStoreImageType();
			this.typedata = res.data.data;
		},
		goadd() {
			this.addshow = true;
		},
		closeaddshow() {
			this.addshow = false;
			this.form1={}
		},
		handleChange(value) {
			this.form.ImageTypeID = value;
		},
		async _getList(values) {
			let data = {};
			this.loading = true;
			data.pageIndex = this.pagination.currentPage;
			data.pageSize = this.pagination.pageSize;
			if (this.values) {
				data = Object.assign(data, this.values);
			}
			let res = await commodityGetList(data);
			this.tableData = res.data.data;
			this.tableData.forEach(item => {
				this.$set(item, 'linkurl', '/pagesIndex/product/product?id=' + item.ID);
			});
			this.data.forEach(item => {
				this.tableData.unshift(item);
			});
			this.loading = false;
			const pagination = { ...this.pagination };
			pagination.total = res.data.pagedList.TotalItemCount + 3;
			this.pagination = pagination;
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
			this._getList();
		},
		handleSizeChange(val) {
			this.pagination.pageSize = val;
			this._getList();
		},
		tableRowClassName({ row, rowIndex }) {
			row.index = rowIndex;
		},
		rowClick(row, column, event) {
			this.checkedItem = row;
			this.radio = row.index;
			this.form.linkurl = row.linkurl;
		},
		tableRowClassNameproduct({ row, rowIndex }) {
			row.index = rowIndex;
		},
		closeFunction(data) {
			this.$emit('closeFun', data, this.text);
			this.form={}
		},
		handleRemove(file) {
			const index = this.fileList.indexOf(file);
			const newFileList = this.fileList.slice();
			newFileList.splice(index, 1);
			this.fileList = newFileList;
		},
		beforeUpload(file) {
			this.fileList = [...this.fileList, file];
			return false;
		},
		async handleSubmit(e) {
			this.$refs.ruleForm.validate(async valid => {
				if (valid) {
					if(this.fileList.length>0){
						let data = {};
						data = this.form;
						let res = await addStoreImage(data);
						if (res.data.code === 0) {
							this.closeFunction('Refresh');
						}
					}else{
						this.$message.error('请上传图片');
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
	position: relative;
	width: 1000px;
	height: 340px;
	background: #fff;
	left: 50%;
	top: 50%;
	margin-left: -450px;
	margin-top: -170px;
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
</style>
