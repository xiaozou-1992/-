<template>
	<div>
		<!-- GetEndExamPageList，GetEndAlreadyExamPageList -->
		<div class="h2">活动审批</div>
		<a-tabs default-active-key="3" @change="tabChange">
			<a-tab-pane key="3" tab="学校待审批"><ActivityFlow3 ref="ActivityFlow3" @applyHander="applyHander"></ActivityFlow3></a-tab-pane>
			<a-tab-pane key="4" tab="学校已审批"><ActivityFlow4 ref="ActivityFlow4"></ActivityFlow4></a-tab-pane>
			
		</a-tabs>
		<apply :text="text" v-show="applyIf" @closeFun="closeFun"></apply>
	</div>
</template>

<script>
import ActivityFlow3 from '../../components/ActivityFlow/ActivityFlow3.vue';
import ActivityFlow4 from '../../components/ActivityFlow/ActivityFlow4.vue';
import moment from 'moment';
import apply from './apply';
import Func from '@/utils/func';
import {
	GetCollegeExamPageList,
	GetCollegeAlreadyExamPageList,
	GetSchoolExamPageList,
	GetSchoolAlreadyExamPageList,
	GetEndExamPageList,
	GetEndAlreadyExamPageList,
	DeleteActivity,
	GetActivityStateList,
	GetClubPageListCommon
} from '@/api/follow';
export default {
	components: {
		apply,
		ActivityFlow3,
		ActivityFlow4,
	},
	data() {
		return {
			applyIf: false,
			form: this.$form.createForm(this, {
				name: 'advanced_search'
			}),
			addIf: false,
			text: {},
			visible: false,
			confirmLoading: false,
			itemId: '',
			departmentList: [],
			worklist: [],
			tableHeight: parseFloat(window.innerHeight - 160),
			ActivityStateList: [],
			ClubList: [],
			tabkey: 3
		};
	},
	computed: {},
	created() {
	},
	mounted() {},
	methods: {
		moment,
		tabChange(key) {
			this.tabkey = key;
		},
		filterOption(input, option) {
			return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
		},
		async fetchClub(value) {
			let myReg = /^[^a-zA-Z]+$/;
			if (value && myReg.test(value)) {
				let data = {};
				data.key = value;
				let res = await GetClubPageListCommon(data);
				this.ClubList = res.data.data;
			}
		},
		addList() {
			this.text = {};
			this.addIf = !this.addIf;
		},
		seeList(text, name) {
			let path = 'ActivityFlowDetail';
			this.$router.push({
				name: path,
				query: {
					ID: text.ID
				}
			});
		},
		applyHander(item) {
			this.text = item;
			this.applyIf = true;
		},
		closeFun() {
			this.applyIf = false;
			console.log(this.tabkey)
			if (this.tabkey == 3) {
				this.$refs.ActivityFlow3.getList2();
			}
			if (this.tabkey == 4) {
				this.$refs.ActivityFlow4.getList3();
			}
		}
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
