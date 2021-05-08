<template>
	<div>
		<a-form-model ref="ruleForm" :model="form" :rules="rules" >
			<a-form-model-item v-for="item in data" :label="item.Name" :prop="item.obj">
				<!-- 单行文本 -->
				<a-input v-if="item.FieldType==1" type="text" v-model="form[item.obj]" />
				<!-- 多行文本 -->
				<a-input v-if="item.FieldType==2" type="textarea" v-model="form[item.obj]" />
				<!-- 整数 -->
				<a-input v-if="item.FieldType==3" type="number" v-model="form[item.obj]" />
				<!-- 小数 -->
				<a-input v-if="item.FieldType==4" type="number" />
				<div>
					<!-- 文件 -->
					<a-input v-if="item.FieldType==5" type="textarea" />
				</div>
				<div>
					<!-- 图片 -->
					<a-upload v-if="item.FieldType==6" accept="image/*" :multiple="true" action="http://api.jlb.ac.acxk.net/Common/DoUploadFile?type=image" list-type="picture-card" :file-list="fileList" @preview="handlePreview" @change="handleChange">
						<div v-if="fileList.length < 8">
							<a-icon type="plus" />
							<div class="ant-upload-text">Upload</div>
						</div>
					</a-upload>
					<a-modal v-if="item.FieldType==6" :visible="previewVisible" :footer="null" @cancel="handleCancel"><img alt="example" style="width: 100%" :src="previewImage" /></a-modal>
				</div>
				<div>
					<!-- 日期 -->
					<a-date-picker v-if="item.FieldType==7" />
				</div>
				<div>
					<!-- 时间 -->
					<a-time-picker v-if="item.FieldType==8" />
				</div>
			</a-form-model-item>
			<a-form-model-item label="" class="fixed-bottom">
				<a-button type="primary" @click="handleSubmit">确认添加</a-button>
			</a-form-model-item>
		</a-form-model>
	</div>
</template>

<script>
import add from './add';
import Func from '@/utils/func';
import { GetApplyActivityFormListManage,DeleteApplyActivityForm,GetApplyFormFieldTypeList,DoSortApplyActivityForm } from '@/api/follow';
const data = [];
export default {
	components: {
		add
	},
	data() {
		return {
			fileList:[],
			previewVisible: false,
			previewImage: '',
			data,
			pagination: {
				currentPage: 1,
				pageSize: this.global.pageSize,
				pageSizeOptions: this.global.pageSizeOptions, // 每页中显示的数据
				showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
			},
			addIf: false,
			text: {},
			visible: false,
			confirmLoading: false,
			itemId: '',
			departmentList: [],
			worklist: [],
			loading: false,
			values: {},
			pages: {
				pageIndex: 1,
				pageSize: 20
			},
			tableHeight: parseFloat(window.innerHeight - 160),
			TeacherTypeList:this.global.TeacherTypeList,
			FieldTypeList:[],
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			form: {},
			rules: {}
		};
	},
	computed: {},
	created() {
		this.getList()
		this.getOtherList()
	},
	mounted() {},
	methods: {
		onChange(e) {
		    },
				onChange1(e) {
				    },
		handleCancel() {
			this.previewVisible = false;
			this.previewImage = ''
		},
		async handlePreview(file) {
			// if (!file.url && !file.preview) {
			// 	file.preview = await getBase64(file.originFileObj);
			// }
			this.previewImage = 'http://api.jlb.ac.acxk.net/'+file.response.url;
			this.previewVisible = true;
		},
		handleChange({ fileList }) {
			this.fileList = fileList;
		},
		handleSubmit(e) {
			this.$refs.ruleForm.validate(async valid => {
				if (valid) {
					
					// console.log(this.form)
				} else {
					return false;
				}
			})
		},
		async getOtherList(){
			let res = await GetApplyFormFieldTypeList()
			this.FieldTypeList = res.data.data
		},
		async getList() {
			this.loading = true;
			let data = {};
			if (this.values) {
				data = this.values;
			}
			data.clubID = this.$route.query.ID
			let res = await GetApplyActivityFormListManage(data);
			this.loading = false;
			this.data = res.data.data;
			this.data.forEach((item,index,arr) => {
			    item.obj = 'a' + index;
			})
			for(var i=0;i<this.data.length;i++){
				for (var m in this.data[i]) {
					if(m == 'obj'){
						this.form = Object.assign(this.form,{[this.data[i][m]]:''})
						this.rules = Object.assign(this.rules,{[this.data[i][m]]: [
				          { required: this.data[i].IsMust, message:this.data[i].ErroeMsg?this.data[i].ErroeMsg:this.data[i].Name+'不能为空' , trigger: 'blur' }
				        ]})
					}
				 }
			  }
		},
		
		
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
