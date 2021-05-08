<template>
	<div>
		<!-- GetEndExamPageList，GetEndAlreadyExamPageList -->
		<div class="h2">活动审批</div>
		<a-tabs default-active-key="5" @change="tabChange">
			<a-tab-pane key="5" tab="完结待审批"><ActivityFlow5 ref="ActivityFlow5" @applyHander="applyHander"></ActivityFlow5></a-tab-pane>
			<a-tab-pane key="6" tab="完结已审批"><ActivityFlow6 ref="ActivityFlow6"></ActivityFlow6></a-tab-pane>
		</a-tabs>
		<apply :text="text" v-show="applyIf" @closeFun="closeFun"></apply>
	</div>
</template>

<script>
import ActivityFlow5 from '../../components/ActivityFlow/ActivityFlow5.vue';
import ActivityFlow6 from '../../components/ActivityFlow/ActivityFlow6.vue';
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
		ActivityFlow5,
		ActivityFlow6
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
			tabkey: 5
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
			if (this.tabkey == 5) {
				this.$refs.ActivityFlow5.getList();
			}
			if (this.tabkey == 6) {
				this.$refs.ActivityFlow6.getList();
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
