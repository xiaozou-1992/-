<template>
  <div class="aid">
    <div class="base">
      <p class="fixed-top">
        后勤审批审核
        <a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
      </p>
      <div class="main" id="new_message">
        <div style="margin: 50px;">
          <a-timeline>
            <a-timeline-item>
              <h2 class="title">修改记录</h2>
              <div class="conten">
                <p><span>校区：</span>{{ data.SchoolName }}</p>
                <p><span>教学楼：</span>{{ data.BuildingName }}</p>
                <p><span>教室：</span>{{ data.ClassName }}</p>
                <p><span>节次：</span>{{ data.StartJC }} ~ {{ data.EndJC }}</p>
                <p><span>活动类型：</span>{{ data.ActName }}</p>
                <p><span>活动内容：</span>{{ data.ActContent }}</p>
                <p><span>举办单位：</span>{{ data.Unity }}</p>
                <p><span>申请人：</span>{{ data.StudentName }}</p>
                <p><span>手机号：</span>{{ data.Phone }}</p>
                <p><span>申请日期：</span>{{ data.ApplyTime }}</p>
                <p><span>学院审批人：</span>{{ data.SchoolName }}</p>
                <p><span>学院审批意见：</span>{{ data.SchoolReviewContent }}</p>
                <p><span>后勤审批意见：</span>{{ data.BackReviewContent }}</p>
              </div>
            </a-timeline-item>
            <a-timeline-item>
              <h2 class="title">后勤审批</h2>
              <a-form-model ref="ruleForm" :model="form" :rules="rules">
                <a-form-model-item label="审核" prop="State">
                  <a-radio-group name="radioGroup" v-model="form.State">
                    <a-radio :value="'3'">
                      通过
                    </a-radio>
                    <a-radio :value="'4'">
                      不通过
                    </a-radio>
                  </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="内容" v-if="form.State === '3'">
                  <a-input v-model="form.BackReviewContent" type="textarea" />
                </a-form-model-item>
                <a-form-model-item label="内容" prop="BackReviewContent" v-else>
                  <a-input v-model="form.BackReviewContent" type="textarea" />
                </a-form-model-item>
                <a-form-model-item label="" class="fixed-bottom">
                  <a-button type="primary" @click="handleSubmit">{{ JSON.stringify(text) == '{}' ? '确认添加' : '确认修改' }}</a-button>
                  <a-button style="margin-left: 10px;" @click="closeFunction">取消</a-button>
                </a-form-model-item>
              </a-form-model>
            </a-timeline-item>
          </a-timeline>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
	import moment from 'moment'
	import {
		ReviewAdminApply2,
		GetAdminDetail
	} from '@/api/follow'
	export default {
		props: {
			text: Object,
			nowTime: String
		},
		watch: {
			nowTime: function(text) {
				if (this.text.ID) {
					this.getDetail(this.text.ID)
				}
			}
		},
		data() {
			return {
				formLayout: 'horizontal',
				targetOffset: undefined,
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				data: {},
				form: {
					State: '3',
					BackReviewContent: ''
				},
				rules: {
					State: [{
						required: true,
						message: '请选择审核状态',
						trigger: 'change'
					}],
					BackReviewContent: [{
						required: true,
						message: '请输入审核内容',
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {
			this.targetOffset = window.innerHeight / 2
		},
		created() {},
		methods: {
			moment,
			closeFunction(data) {
				this.$emit('closeFun', data)
				this.form = {}
			},
			async getDetail(ID) {
				let res = await GetAdminDetail({
					ID: ID
				})
				this.data = res.data.data
			},
			handleSubmit(e) {
				if (this.form.State === '4' && !this.form.BackReviewContent) {
					this.$message.error('审核内容不能为空！')
					return false
				}
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						let data = this.form
						data.ID = this.text.ID
						let res = await ReviewAdminApply2(data)
						if (res.data.code === 0) {
							this.$message.success(res.data.msg)
							this.closeFunction('1')
						} else {
							this.$message.error(res.data.msg)
						}
					} else {
						return false
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.title{
		font-size: 16px;
		font-weight: bold;
	}
	.conten{
		span{
			color: #333;
		}
	}
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
		border-radius: 12px;
		width: 600px;
		height: 540px;
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

			/deep/.ant-form-item-control-wrapper {
				flex: 1;
			}
		}
	}
	/deep/.ant-form-item-label {
		width: 55px !important;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: right;
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
		margin: 0 !important;
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
		width: 164px;
		left: 50%;
		bottom: -66px;
		margin: 0px 0px 0px -82px !important;
		position: absolute;
		background-color: white;
		z-index: 999;
	}

</style>
