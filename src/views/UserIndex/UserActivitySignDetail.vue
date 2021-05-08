<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				活动签到详情
				<a-icon class="icon-close" @click="closeFunction" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model ref="ruleForm" :model="form" :rules="rules">
					<a-form-model-item label="添加人">
						<a-input disabled :value="form.AddUserName | testname"></a-input>
					</a-form-model-item>
					<a-form-model-item label="编号">
						<a-input disabled :value="form.AddUserNo | testno" ></a-input>
					</a-form-model-item>
					<a-form-model-item label="开始时间" prop="StartTime">
						<a-date-picker disabled format="YYYY-MM-DD HH:mm:ss" v-model="form.StartTime" :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }" />
					</a-form-model-item>
					<a-form-model-item label="结束时间" prop="EndTime">
						<a-date-picker disabled format="YYYY-MM-DD HH:mm:ss" v-model="form.EndTime" :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }" />
					</a-form-model-item>
					<a-form-model-item label="类型">
						<a-input disabled v-model="form.TypeName"></a-input>
					</a-form-model-item>
				</a-form-model>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import {
		GetUserActivitySignDoGetDetail
	} from '@/api/follow';
	export default {
		props: {
			text: Object
		},
		watch: {
			text: function(text) {
				if (JSON.stringify(text) == '{}') {
					
				} else {
					this.GetList()
					this.form = text
				}
			}
		},
		data() {
			return {
				gradeYear: null,
				yearPickShow: false,
				loading: false,
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				TypeList: [

				],
				form: {
					StartTime: '',
					EndTime: '',
					Type: '',
					AddUserName: '',
					AddUserNo: '',
					TypeName:''
				},
				rules: {
					StartTime: [{
						required: true,
						message: '请输入开始时间',
						trigger: 'change'
					}],
					EndTime: [{
						required: true,
						message: '请输入结束时间',
						trigger: 'change'
					}],
					Type: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}],
				}
			};
		},
		created() {

		},
		methods: {
			moment,
			async GetList() {
				let res = {}
				let data = {}
				data.id = this.text.ID
				res = await GetUserActivitySignDoGetDetail(data)
				this.form = res.data.data
			},
			closeFunction() {
				this.$emit('closeFun');
				this.form = {};
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

			/deep/.ant-calendar-picker {
				width: 100%
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
