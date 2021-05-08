<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				{{ JSON.stringify(text) == '{}' ? '添加新闻' : '修改新闻' }}
				<a-icon class="icon-close" @click="closeFunction" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model ref="ruleForm" :model="form" :rules="rules">
					<a-form-model-item label="标题" prop="Title"><a-input v-model="form.Title" :maxLength="50" /></a-form-model-item>
					<a-form-model-item label="类型" prop="TypeID">
						<a-select v-model="form.TypeID" optionFilterProp="children" showSearch style="width:100%">
							<a-select-option v-for="(item, index) in NewsTypeList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="内容" prop="Content">
						<quill-editor
							v-model="form.Content"
							ref="myQuillEditor"
							:options="editorOption"
							@focus="onEditorFocus($event)"
							@blur="onEditorBlur($event)"
							@change="onEditorChange($event)"
						></quill-editor>
					</a-form-model-item>
					<a-form-model-item label="" class="fixed-bottom">
						<a-button type="primary" @click="handleSubmit">{{ JSON.stringify(text) == '{}' ? '确认添加' : '确认修改' }}</a-button>
						<a-button style="margin-left: 10px;" @click="closeFunction">取消</a-button>
					</a-form-model-item>
				</a-form-model>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment'
import { AddNews, UpdateNews,DoGetDetailNews } from '@/api/follow';
import Quill from 'quill'; // 富文本基于quill
import { quillEditor } from 'vue-quill-editor'; // 调用富文本编辑器
import 'quill/dist/quill.snow.css'; // 富文本编辑器外部引用样式  三种样式三选一引入即可
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
// quill图片可拖拽改变大小
import imageResize from 'quill-image-resize-module'; // 添加
Quill.register('modules/imageResize', imageResize); // 添加
export default {
	components: {
		quillEditor
	},
	props: {
		text: Object,
		NewsTypeList: Array,
	},
	watch: {
		text: function(text) {
			if (JSON.stringify(text) == '{}') {
				
			} else {
				this.getDetail(text)
				// this.form = text
			}
		}
	},
	data() {
		return {
			gradeYear:null,
			yearPickShow:false,
			loading: false,
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			editor: null, // 富文本编辑器对象
				content: `<p></p><p></p><ol></ol>`, // 富文本编辑器默认内容
				editorOption: {
					//  富文本编辑器配置
					modules: {
						imageResize: {
							displayStyles: {
								backgroundColor: 'black',
								border: 'none',
								color: 'white'
							},
							modules: ['Resize', 'DisplaySize', 'Toolbar']
						},
						toolbar: [
							['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
							['blockquote', 'code-block'], // 引用，代码块
							[
								{
									header: 1
								},
								{
									header: 2
								}
							], // 标题，键值对的形式；1、2表示字体大小
							[
								{
									list: 'ordered'
								},
								{
									list: 'bullet'
								}
							], // 列表
							[
								{
									script: 'sub'
								},
								{
									script: 'super'
								}
							], // 上下标
							[
								{
									indent: '-1'
								},
								{
									indent: '+1'
								}
							], // 缩进
							[
								{
									direction: 'rtl'
								}
							], // 文本方向
							[
								{
									size: ['small', false, 'large', 'huge']
								}
							], // 字体大小
							[
								{
									header: [1, 2, 3, 4, 5, 6, false]
								}
							], // 几级标题
							[
								{
									color: []
								},
								{
									background: []
								}
							], // 字体颜色，字体背景颜色
							[
								{
									font: []
								}
							], // 字体
							[
								{
									align: []
								}
							], // 对齐方式
							['clean'], // 清除字体样式
							// ['image', 'video'] //上传图片、上传视频
							['image'] // 上传图片、上传视频
						]
					},
					theme: 'snow',
					placeholder: '请输入新闻内容'
				},
			
			form: {
				Title: '',
				TypeID: '',
				Content: '',
			},
			rules: {
				Title: [
					{
						required: true,
						message: '请输入标题',
						trigger: 'change'
					}
				],
				TypeID: [
					{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}
				],
				Content: [
					{
						required: true,
						message: '请输入新闻内容',
						trigger: 'change'
					}
				]
			}
		};
	},
	created() {
		
	},
	mounted() {
		this.editor = this.$refs.myQuillEditor.quill;
	},
	beforeDestroy() {
		// this.content= `<p></p><p></p><ol></ol>`
		this.editor = null;
		delete this.editor;
	},
	methods: {
		// 准备富文本编辑器
		onEditorReady(editor) {},
		// 富文本编辑器 失去焦点事件
		onEditorBlur(editor) {},
		// 富文本编辑器 获得焦点事件
		onEditorFocus(editor) {},
		// 富文本编辑器 内容改变事件
		onEditorChange(editor) {},
		filterOption(input, option) {
			return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
		},
		async getDetail(text){
			let data = {}
			data.id = text.ID
			let res = await DoGetDetailNews(data)
			console.log(res.data)
			this.form = res.data.data
		},
		closeFunction(data) {
			this.$emit('closeFun', data);
			this.form = {};
			this.gradeYear = null
			this.fileList = []
		},
		handleSubmit(e) {
			this.$refs.ruleForm.validate(async valid => {
				if (valid) {
					let data = this.form;
					let res = {};
					if (JSON.stringify(this.text) == '{}') {
						res = await AddNews(data);
					} else {
						res = await UpdateNews(data);
					}
					if (res.data.code === 0) {
						this.$message.success(res.data.msg);
						this.closeFunction('1');
					} else {
						this.$message.error(res.data.msg);
					}
				} else {
					return false;
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
	width: 80%;
	height: 80%;
	border-radius: 14px;
	background: #fff;
	left: 50%;
	margin-left: -40%;
	top: 10%;
	// margin-top: -40%;
	overflow-y: auto;
	.main {
		height: 90%;
		overflow-y: scroll;
	}
	/deep/.ant-form {
		margin-top: 50px;
		padding-bottom: 50px;
		/deep/.ant-calendar-picker{
			width:100%
		}
		.ant-upload-list-picture-card-container {
			width: 80px;
			height: 80px;
		}
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
		}
	}
}
.fixed-top {
	width: 100%;
	position: absolute;
	line-height: 30px;
	top: 0px;
	background-color: white;
	z-index: 999;
	padding: 10px 0 5px 10px;
	.icon-close {
		font-size: 20px;
		float: right;
		margin: 5px 10px;
	}
}
.fixed-bottom {
	width: 164px;
	left: 50%;
	bottom: 0px;
	margin: 0px 0px 0px -82px !important;
	position: absolute;
	background-color: white;
	z-index: 999;
}
/deep/.ql-snow .ql-picker {
	height: auto !important;
}

/deep/.ql-toolbar {
	background: #f5f5f5;
}

/deep/.ql-editor {
	min-height: 200px;
}
</style>
