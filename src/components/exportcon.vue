<template>
  <div class="aid">
    <div class="base">
      <p>图片上传
        <a-icon @click="closeFunction" :style="{ float:'right',margin:'10px' }" type="close-circle" />
      </p>
      <a-form-model class="left" ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item label="图片">
          <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
            <a-button v-if="fileList.length==0">
              <a-icon type="upload" /> 选择文件 </a-button>
            <!-- <span class="titletip">Tip：请上传700*350格式的图片(宽高比例为2:1)</span> -->
          </a-upload>
        </a-form-model-item>
		<a-form-model-item label="">
         <template @click="tablerow">
         	
         		<div class="btn">
         			<a-button type="primary" class="btn2" @click="handleSubmit">
         			  确定
         			</a-button>
         			<a-button style="margin-left: 10px;" @click="closeFunction">
         			  取消
         			</a-button>
         		</div>
         </template>
        </a-form-model-item>
      </a-form-model>
	
	  
    </div>
  </div>
</template>

<script>
	import {
		UploadFile
	} from '@/api/follow'
	export default {
		props: {
			text: Object,
			customerSourse: Array,
			typeString: String
		},
		watch: {
			text: function (text) {
			  this.form.linkurl = ''
				this.fileList = []
			}
		},
		data() {
			return {
				fileList: [],
				pagination: {
					currentPage: 1,
					pageSize: this.global.pageSize,
					pageSizeOptions: this.global.pageSizeOptions, //每页中显示的数据
					showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
				},
				data:[
					{linkurl:'/pagesIndex/localStore/shopIndex',Name:'本店'},
					{linkurl:'/pagesIndex/localStore/vr',Name:'VR'},
					{linkurl:'/pagesIndex/localStore/detail',Name:'详情'}
				],
				tableData:[],
				loading:false,
				uploading: false,
				radio:'',
				radio1:'',
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				form: {
					linkurl: ''
				},
				rules: {
					linkurl: [{
						required: true,
						message: '请輸入链接',
						trigger: 'blur'
					}]
				}
			}
		},
		async created() {
				await this._getList()
		},
		methods: {
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
				　　this.$set(item,'linkurl','/pagesIndex/product/product?id='+item.ID)
				})
				this.data.forEach(item =>{
					this.tableData.unshift(item)
				})
				this.loading = false;
				const pagination = { ...this.pagination };
				pagination.total = res.data.pagedList.TotalItemCount+3;
				this.pagination = pagination;
			},
			handleCurrentChange(val) {
				this.pagination.currentPage = val
				this._getList()
			},
			handleSizeChange(val) {
				this.pagination.pageSize = val
				this._getList()
			},
			tableRowClassName({row, rowIndex}){
				row.index = rowIndex
			},
			rowClick(row, column, event){
				this.checkedItem = row
				this.radio = row.index
				this.form.linkurl=row.linkurl
			},
			tableRowClassNameproduct({row, rowIndex}){
				row.index = rowIndex
			},
			closeFunction(data) {
				this.$emit('closeFun', data, this.text)
			},
			handleRemove(file) {
				const index = this.fileList.indexOf(file)
				const newFileList = this.fileList.slice()
				newFileList.splice(index, 1)
				this.fileList = newFileList
			},
			beforeUpload(file) {
				this.fileList = [...this.fileList, file]
				return false
			},
			handleSubmit(e) {
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						const {
							fileList
						} = this
						const formData = new FormData()
						fileList.forEach(file => {
							formData.append('file', file)
						})
						let data = {}
						data.linkurl = this.form.linkurl
						data.linkurl = data.linkurl.replace(/#/g, '|')
						data.type = this.text.type
						// console.log(data)
						// data.isPurpose = this.form.IsPurpose==1?true:false
						data.formData = formData
						this.uploading = true
						let res = await UploadFile(data)
						if (res) {
							this.$message.success(res.data.msg)
							if (res.data.code === 0) {
								this.closeFunction(res.data)
							}
						}
					} else {
						console.log('error submit!!')
						return false
					}
				})
			}
		}
	}
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
		height:640px;
		background: #fff;
		left: 50%;
		top: 50%;
		margin-left: -450px;
		margin-top: -320px;
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
		border: 1px solid #DAD9DC;
		margin-left: 20px;
	}

	.ant-form-item {
		margin-bottom: 10px;
	}
	.titletip{
		padding-left: 10px;
		font-size: 12px;
		color: red;
	}
	.btn{
		margin-top: 10px;
		text-align: center;
	}
</style>
