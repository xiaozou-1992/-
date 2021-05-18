<template>
  <div class="aid">
    <div class="base">
      <p class="fixed-top">
        审批详情
        <a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
      </p>
      <div class="main" id="new_message">
        <a-form-model ref="ruleForm" :model="form">
          <a-form-model-item label="校区">
            <a-input v-model="form.SchoolName" disabled />
          </a-form-model-item>
          <a-form-model-item label="教学楼">
            <a-input v-model="form.BuildingName" disabled />
          </a-form-model-item>
          <a-form-model-item label="教室">
            <a-input v-model="form.ClassName" disabled />
          </a-form-model-item>
          <a-form-model-item label="节次" prop="JC">
            <a-slider range v-model="form.JC" :min="JCMin" :max="JCMax" disabled />
          </a-form-model-item>
          <a-form-model-item label="活动类型">
            <a-input v-model="form.ActName" disabled />
          </a-form-model-item>
          <a-form-model-item label="活动内容">
            <a-input v-model="form.ActContent" disabled />
          </a-form-model-item>
          <a-form-model-item label="举办单位">
            <a-input v-model="form.Unity" disabled />
          </a-form-model-item>
          <a-form-model-item label="申请人">
            <a-input v-model="form.StudentName" disabled />
          </a-form-model-item>
          <a-form-model-item label="手机号">
            <a-input v-model="form.Phone" disabled />
          </a-form-model-item>
          <a-form-model-item label="申请日期">
            <a-input v-model="form.ApplyTime" disabled />
          </a-form-model-item>
          <a-form-model-item label="学院审批人">
            <a-input v-model="form.ChargerName" disabled/>
          </a-form-model-item>
          <a-form-model-item label="学院审批意见">
            <a-input v-model="form.SchoolReviewContent" disabled type="textarea"/>
          </a-form-model-item>
          <a-form-model-item label="后勤审批意见" v-if="form.State !== '2'">
            <a-input v-model="form.BackReviewContent" disabled type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="状态">
            <a-tag color="red" v-if="form.State === '2' || form.State === '4'">
              {{ form.State === '2'?'学院审核不通过':'后勤审核不通过' }}
            </a-tag>
            <a-tag color="green" v-if="form.State === '1' || form.State === '3'">
              {{ form.State === '1'?'学院审核通过':'后勤审核通过' }}
            </a-tag>
            <a-tag color="blue" v-if="form.State === '0'">
              待审核
            </a-tag>
          </a-form-model-item>
        </a-form-model>
      </div>

    </div>
  </div>
</template>

<script>
	import moment from 'moment'
	import {
		GetAdminDetail
	} from '@/api/follow'
	export default {
		props: {
			text: Object,
			schoolList: Array,
			detail: Boolean,
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
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				DepartmenDropdowntList: [],
				buildingList: [],
				classroomList: [],
				JCMin: this.global.JCList[0],
				JCMax: this.global.JCList[1],
				form: {
					ApplyTime: '',
					SchoolName: '',
					BuildingName: '',
					ClassName: '',
					ActName: '',
					ActContent: '',
					Unity: '',
					StudentName: '',
					Phone: '',
					BackReviewContent: '',
					State: '',
					JC: []
				}
			}
		},
		created() {},
		methods: {
			moment,
			closeFunction(data) {
				this.$emit('closeFun', data)
				this.$refs['ruleForm'].resetFields()
			},
			async getDetail(ID) {
				let res = await GetAdminDetail({
					ID: ID
				})
				let text = res.data.data
				this.form = text
				this.form.JC = [text.StartJC, text.EndJC]
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.ant-select-disabled .ant-select-selection {
		background-color: white !important;
		color: black;
	}

	/deep/.ant-input[disabled] {
		background-color: white;
		color: black;
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
