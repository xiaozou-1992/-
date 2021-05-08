<template>
	<div>
		<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
			<a-form-item v-for="item in data" :label="item.Name">
				<a-input
					v-if="item.FieldType == 1"
					v-decorator="[
						item.obj,
						{ rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }
					]"
				/>
				<a-input
					v-if="item.FieldType == 2"
					type="textarea"
					v-decorator="[item.obj, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
				/>
				<a-input
					v-if="item.FieldType == 3"
					type="number"
					v-decorator="[item.obj, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
				/>
				<a-input
					v-if="item.FieldType == 4"
					type="number"
					v-decorator="[item.obj, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
				/>
				<a-upload
					v-if="item.FieldType == 5 || item.FieldType == 6"
					v-decorator="[item.obj, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
					:accept="item.FieldType == 5?'.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document':'image/*'"
					:multiple="true"
					action="http://api.jlb.ac.acxk.net/Common/DoUploadFile?type=file"
					list-type="picture-card"
					:file-list="fileList[item.obj]"
					@preview="handlePreview"
					@change="e => handleChange(e, item.obj)"
				>
					<div v-if="fileList[item.obj].length < 8">
						<a-icon type="plus" />
						<div class="ant-upload-text">Upload</div>
					</div>
				</a-upload>
				<a-modal v-if="item.FieldType == 5 || item.FieldType == 6" :visible="previewVisible" :footer="null" @cancel="handleCancel"><img alt="example" style="width: 100%" :src="previewImage" /></a-modal>
				<a-date-picker
					v-if="item.FieldType == 7"
					v-decorator="[item.obj, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
				/>
				<a-time-picker
					v-if="item.FieldType == 8"
					v-decorator="[item.obj, { rules: [{ required: item.IsMust, message: item.ErroeMsg ? item.ErroeMsg : item.Name + '不能为空' }] }]"
				/>
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 12, offset: 5 }"><a-button type="primary" html-type="submit">Submit</a-button></a-form-item>
		</a-form>
	</div>
</template>

<script>
import add from './add';
import Func from '@/utils/func';
import { GetApplyActivityFormListManage, DeleteApplyActivityForm, GetApplyFormFieldTypeList, DoSortApplyActivityForm } from '@/api/follow';
const data = [];
export default {
	components: {
		add
	},
	data() {
		return {
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
			rules: {}
		};
	},
	computed: {},
	created() {
		this.getList();
		this.getOtherList();
	},
	mounted() {},
	methods: {
		handleCancel() {
			this.previewVisible = false;
			this.previewImage = '';
		},
		async handlePreview(file) {
			this.previewImage = 'http://api.jlb.ac.acxk.net/' + file.response.url;
			this.previewVisible = true;
		},
		handleChange({ fileList },name) {
			this.fileList[name] = fileList;
			if(fileList.length==0){
				this[name] = {}
			}else{
				if(fileList[0].status == 'done'){
					this[name] = 'http://api.jlb.ac.acxk.net/'+fileList[0].response.url
				}
			}
		},
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
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
			if (this.values) {
				data = this.values;
			}
			data.clubID = this.$route.query.ID;
			let res = await GetApplyActivityFormListManage(data);
			this.loading = false;
			this.data = res.data.data;
			this.data.forEach((item, index, arr) => {
				item.obj = 'a' + index;
			});
			for (var i = 0; i < this.data.length; i++) {
				for (var m in this.data[i]) {
					if (m == 'obj') {
						this.rules = Object.assign(this.rules, {
							[this.data[i][m]]: {
								validator: (rule, val, callback) => {
									// var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
									let pattern = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
									if (!pattern.test(val)) {
										callback('请输入正确手机号');
									} else {
										callback();
									}
									callback();
								}
							}
						});
					}
				}
				if(this.data[i].FieldType == 5||this.data[i].FieldType == 6){
					for (let n in this.data[i]) {
						if (n == 'obj') {
							this.fileList = Object.assign(this.fileList,{[this.data[i][n]]:[]})
						}
					}
				}
			}
		}
	}
};
</script>

<style lang="less" scoped>
/deep/.ant-form-item {
	display: flex;
	margin-bottom: 10px !important;

	/deep/.ant-form-item-label {
		width: 80px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: right;
	}
	/deep/.ant-form-item-control-wrapper {
		flex: 1;
	}
}
/deep/.ant-table-thead > tr > th,
/deep/.ant-table-tbody > tr > td {
	padding: 5px;
}
/deep/.ant-table-pagination.ant-pagination {
	float: left;
	// display:none;
}
/deep/.ant-table-body tr th:first-child {
	display: none;
}
/deep/.ant-table-body tr td:first-child {
	display: none;
}
/deep/.el-table th.is-leaf {
	background: #fafafa;
}
/deep/.el-table td,
/deep/.el-table th {
	padding: 5px;
}
/deep/.ant-table-tbody .ant-table-row-cell-break-word:nth-child(2) {
	position: relative;
	.con {
		position: absolute;
		top: 40px;
		left: 0px;
		z-index: 999;
		background: #fff;
		width: 96%;
		padding: 1% 2%;
	}
}
.option {
	margin-top: 10px;
	margin-bottom: 20px;
	overflow: hidden;
}
.option .btn {
	height: 36px;
	line-height: 36px;
	padding: 0 10px;
	float: left;
	background: #1890ff;
	color: #fff;
	margin-right: 10px;
	border-radius: 3px;
	cursor: pointer;
	border: none;
}
.foot {
	text-align: center;
	margin-top: 100px;
}
.el-pagination {
	margin-top: 10px;
}
</style>
