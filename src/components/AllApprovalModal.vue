<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				待初审
				<a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form :form="form" @submit="handleSubmit">
					<a-form-item label="审核状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						<a-select :allowClear="true" v-decorator="['selectvalue', { rules: [{ required: true, message: '请选择审核状态' }] }]">
							<a-select-option v-for="(item, index) in TypeList" :key="index" :value="item.Key">{{ menuTypeList.filter(items => items.ID == item.Key)?menuTypeList.filter(items => items.ID == item.Key)[0].Name:'暂无' }}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="内容" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
						<a-textarea placeholder="请输入内容" v-decorator="['content']"></a-textarea>
					</a-form-item>
					<a-form-item label="审核人" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">{{ Name }}</a-form-item>
					<a-form-item class="fixed-bottom"><a-button type="primary" html-type="submit" class="btn2">提交</a-button></a-form-item>
				</a-form>
			</div>
		</div>
	</div>
</template>

<script>
import Cache from '@/utils/cache';
import { DoSubmitConfirm, GetConfirmState } from '@/api/follow';
export default {
	props: {
		approvalList: '',
		approvalType: ''
	},
	data() {
		return {
			formLayout: 'horizontal',
			form: this.$form.createForm(this, { name: 'coordinated' }),
			salesmansourcelist: [{ ID: 1, Name: '经销商端' }, { ID: 2, Name: '办事处端' }],
			salesmanlist: [],
			worklist: [],
			TypeList: [],
			selecttype: 1,
			type: ['待初审'],
			Name: Cache.get('info').Name,
			selectvalue: 1,
			content: '',
			menuTypeList: [
				{ ID: '1', Name: '初审通过，提交至厂家审核' },
				{ ID: '2', Name: '不通过' },
				{ ID: '3', Name: '待复审' },
				{ ID: '4', Name: '待复审审核' },
				{ ID: '5', Name: '通过' },
				{ ID: '6', Name: '待初审' },
				{ ID: '7', Name: '初审退回' }
			]
		};
	},
	async created() {
		await this.GetConfirmState();
	},
	methods: {
		async GetConfirmState() {
			let res = await GetConfirmState();
			this.TypeList = res.data.data;
		},
		radioOnChange(e) {
			this.selectvalue = e.target.value;
		},
		filterOption(input, option) {
			return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
		},
		closeFunction() {
			// this.selecttype = 0;
			this.worklist = [];
			this.$emit('closeFun');
		},
		roleChange(value) {},
		departmentChange(value) {},
		handleSubmit(e) {
			let data = {};
			data.ID = this.approvalList.ID;
			data.Type = this.approvalType;
			data.Content = this.content;
			this.form.validateFields(async (err, values) => {
				if (!err) {
					data.ConfirmState = Number(values.selectvalue);
					data.Content = values.content;
					let res = await DoSubmitConfirm(data);
					if (res.data.code === 1) {
						this.$message.success(res.data.msg);
						let that = this
						setTimeout(function(){
							that.$emit('closeFun');
							that.form.resetFields();
						},1000)
					} else {
						this.$message.error(res.data.msg);
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
	// height: 540px;
	height: auto;
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
		}
		/deep/textarea {
			height: 140px;
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

.btn2 {
	display: -moz-box;
	-moz-box-pack: center;
	-moz-box-align: center;

	/* Safari、Opera 以及 Chrome */
	display: -webkit-box;
	-webkit-box-pack: center;
	-webkit-box-align: center;

	/* W3C */
	display: box;
	box-pack: center;
	box-align: center;
	width: 137px;
	height: 35px;
	border-radius: 3px;
	outline: none;
	border: none;
	margin: 20px auto;
	color: #fff;
}
.fixed-top {
	width: inherit;
	position: absolute;
	line-height: 30px;
	top: 0px;
	background-color: white;
	z-index: 999;
}
.fixed-bottom {
	width: 600px;
	left: -50px;
	bottom: 0px;
	position: absolute;
	background-color: white;
	z-index: 999;
}
/deep/.ant-form {
	margin-top: 50px;
	padding-bottom: 80px;
}
</style>
