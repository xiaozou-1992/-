<template>
  <div class="aid">
    <div class="base">
      <p class="fixed-top">
        {{ JSON.stringify(text) == '{}' ? '添加禁用' : '修改禁用' }}
        <a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
      </p>
      <div class="main" id="new_message">
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item label="禁用类型" prop="BorC">
            <a-radio-group name="radioGroup" v-model="form.BorC" @change="changeType">
              <a-radio :value="'building'">
                楼宇
              </a-radio>
              <a-radio :value="'classroom'">
                教室
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="楼宇" prop="BIDorCID" v-if="form.BorC === 'building'">
            <a-select v-model="form.BIDorCID" style="width:100%">
              <a-select-option v-for="(item, index) in buildingList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="教室" prop="BIDorCID" v-if="form.BorC === 'classroom'">
            <a-select v-model="form.BIDorCID" style="width:100%">
              <a-select-option v-for="(item, index) in classroomList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="日期" prop="date">
            <a-range-picker style="width: 100%;" v-model="form.date" @change="meetingTime" />
          </a-form-model-item>
          <a-form-model-item label="节次" prop="JC">
            <a-slider range v-model="form.JC" :min="JCMin" :max="JCMax" />
          </a-form-model-item>
          <a-form-model-item label="备注" prop="Remarks">
            <a-input v-model="form.Remarks" type="textarea" />
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
	import {
		DoAddForbbidenBorC,
		DoUpdateForbbidenBorC
	} from '@/api/follow'
	export default {
		props: {
			text: Object,
			buildingList: Array,
			classroomList: Array
		},
		watch: {
			text: function(text) {
				console.log(text)
				if (text.ID) {
					this.form.BorC = text.BorC
					this.form.ID = text.ID
					this.form.BIDorCID = text.BIDorCID
					this.form.Remarks = text.Remarks
					this.form.date = [moment(text.StartDate, 'YYYY-MM-DD'), moment(text.EndDate,
						'YYYY-MM-DD')]
					this.form.JC = [text.StartJC, text.EndJC]
				}
			}
		},
		data() {
			return {
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				DepartmenDropdowntList: [],
				JCMin: 1,
				JCMax: 12,
				form: {
					BorC: 'building',
					BIDorCID: '',
					Remarks: '',
					date: [],
					JC: [],
					StartDate: '',
					EndDate: '',
					StartJC: [],
					EndJC: []
				},
				rules: {
					BorC: [{
						required: true,
						message: '请选择禁用类型',
						trigger: 'change'
					}],
					BIDorCID: [{
						required: true,
						message: '请选择教室/楼宇',
						trigger: 'change'
					}],
					Remarks: [{
						required: true,
						message: '请输入备注',
						trigger: 'change'
					}],
					date: [{
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					JC: [{
						required: true,
						message: '请选择节次',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			moment,
			closeFunction(data) {
				this.$emit('closeFun', data)
				this.form = {}
				this.form.BorC = 'building'
				this.form.JC = []
			},
			changeType() {
				this.form.BIDorCID = ''
			},
			meetingTime(e) {
				console.log(e)
				this.form.StartDate = moment(e[0]._d).format('YYYY-MM-DD')
				this.form.EndDate = moment(e[1]._d).format('YYYY-MM-DD')
			},
			handleSubmit(e) {
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						let data = this.form
						data.EndJC = this.form.JC[1]
						data.StartJC = this.form.JC[0]
						delete data.JC
						delete data.date
						let res = {}
						if (!this.text.ID) {
							res = await DoAddForbbidenBorC(data)
						} else {
							res = await DoUpdateForbbidenBorC(data)
						}
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
		bottom: 0px;
		margin: 0px 0px 0px -82px !important;
		position: absolute;
		background-color: white;
		z-index: 999;
	}

	/deep/.ant-form {
		margin-top: 50px;
		padding-bottom: 50px;
	}
</style>
