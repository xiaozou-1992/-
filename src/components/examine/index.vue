<template>
  <div class="aid">
    <div class="base">
      <p class="fixed-top">
        修改后勤审批
        <a-icon @click="closeFunction" :style="{ fontSize: '20px',float: 'right', margin: '10px' }" type="close-circle" />
      </p>
      <div class="main" id="new_message">
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item label="校区" prop="SchoolID">
            <a-select v-model="form.SchoolID" style="width:100%" @change="getAllBuildingList">
              <a-select-option v-for="(item, index) in schoolList" :key="index" :value="item.ID">{{ item.XQM }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="教学楼" prop="BuildingID">
            <a-select v-model="form.BuildingID" style="width:100%" @change="getAllClassRoomList">
              <a-select-option v-for="(item, index) in buildingList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="教室" prop="ClassID">
            <a-select v-model="form.ClassID" style="width:100%">
              <a-select-option v-for="(item, index) in classroomList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="日期" prop="date">
            <a-date-picker style="width: 100%;" v-model="form.date" @change="changes"/>
          </a-form-model-item>
          <a-form-model-item label="节次" prop="JC">
            <a-input-number :min="JCMin" :max="JCMax" v-model="form.StartJC" @blur="numberChange(1)" style="width: 47%;"/> ~  <a-input-number style="width: 47%;" :min="JCMin" :max="JCMax" v-model="form.EndJC" @blur="numberChange(2)"/>
            <!-- <a-slider range v-model="form.JC" :min="JCMin" :max="JCMax"/> -->
          </a-form-model-item>
          <a-form-model-item label="" class="fixed-bottom">
            <a-button type="primary" @click="handleSubmit" :loading="loading">{{ JSON.stringify(text) == '{}' ? '确认添加' : '确认修改' }}</a-button>
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
		DoUpdateAdmin,
		GetAllBuildingList,
		GetAllClassRoomList,
		GetAdminDetail
	} from '@/api/follow'
	export default {
		props: {
			text: Object,
			schoolList: Array,
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
				loading: false,
				form: {
					date: '',
					StartJC: 1,
					EndJC: 1,
					SchoolID: '',
					BuildingID: '',
					ClassID: ''
				},
				rules: {
					ClassID: [{
						required: true,
						message: '请选择班级',
						trigger: 'change'
					}],
					SchoolID: [{
						required: true,
						message: '请选择教学楼',
						trigger: 'change'
					}],
					date: [{
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					BuildingID: [{
						required: true,
						message: '请选择节次',
						trigger: 'change'
					}]
				}
			}
		},
		created() {
		},
		methods: {
			moment,
			closeFunction(data) {
				this.$emit('closeFun', data)
				this.$refs['ruleForm'].resetFields()
			},
			numberChange(type) {
				if (this.form.StartJC > this.form.EndJC) {
					this.form.EndJC = 10
				}
			},
			changes(date, dateString) {
				console.log(date)
				console.log(dateString)
			},
			async getDetail(ID) {
				let res = await GetAdminDetail({ID: ID})
				this.getAllBuildingList(res.data.data.SchoolID)
				this.getAllClassRoomList(res.data.data.BuildingID)
				let text = res.data.data
				this.form = Object.assign(this.form, text, {date: moment(text.ApplyTime, 'YYYY-MM-DD')})
				console.log(this.form)
			},
			async getAllBuildingList(e) {
				let res = await GetAllBuildingList({xqID: e})
				this.buildingList = res.data.data
			},
			async getAllClassRoomList(e) {
				let res = await GetAllClassRoomList({buildingID: e})
				this.classroomList = res.data.data
			},
			handleSubmit(e) {
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						this.loading = true
						let data = this.form
						data.ApplyTime = moment(data.date._d).format('YYYY-MM-DD') + 'T00:00:00.000Z'
						// delete data.date
						delete data.BuildingID
						delete data.SchoolID
						let res = await DoUpdateAdmin(data)
						this.loading = false
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
