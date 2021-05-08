<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				{{ JSON.stringify(text) == '{}' ? '添加新闻类型' : '修改新闻类型' }}
				<a-icon class="icon-close" @click="closeFunction" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model ref="ruleForm" :model="form" :rules="rules">
					<a-form-model-item label="名称" prop="Name"><a-input v-model="form.Name" /></a-form-model-item>
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
import { AddNewsType, UpdateNewsType } from '@/api/follow';
export default {
	props: {
		text: Object,
		ClassList: Array,
	},
	watch: {
		text: function(text) {
			if (JSON.stringify(text) == '{}') {
				
			} else {
				// this.GetDetailStudent(text)
				this.form = text
			}
		}
	},
	data() {
		return {
			loading: false,
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			form: {
				Name: '',
			},
			rules: {
				Name: [
					{
						required: true,
						message: '请输入学生姓名',
						trigger: 'change'
					}
				]
			}
		};
	},
	created() {
		
	},
	methods: {
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
						res = await AddNewsType(data);
					} else {
						res = await UpdateNewsType(data);
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
	width: 600px;
	height: 540px;
	border-radius: 14px;
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
	width: inherit;
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
</style>
