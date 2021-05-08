<template>
	<div>
		<div id="components-form-demo-advanced-search">
		  	<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch3">
		  		<a-row :gutter="24">
		  			<a-col :span="8">
		  				<a-form-item label="关键字"><a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" /></a-form-item>
		  			</a-col>
		  			<a-col :span="8">
		  				<a-form-item label="俱乐部">
		  					<template>
		  						<a-select
		  							v-decorator="['clubID']"
		  							showSearch
		  							optionFilterProp="children"
		  							style="width: 100%"
		  							:showArrow="false"
		  							@search="fetchClub"
		  							:filterOption="filterOption"
		  							 placeholder="请输入关键字进行搜索" 
		  							 allowClear
		  						>
		  							<a-select-option v-for="(item, index) in ClubList" :key="item.ID">{{ item.Name }}</a-select-option>
		  						</a-select>
		  					</template>
		  				</a-form-item>
		  			</a-col>
		  			<a-col :span="8" style="margin-top:4px;">
		  				<a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
		  				<a-button :style="{ marginLeft: '8px' }" @click="handleReset3" class="btn2">重置</a-button>
		  			</a-col>
		  		</a-row>
		  	</a-form>
		  </div>
		  <div>
		  	<el-table :data="data3" v-loading="loading3" border :max-height="tableHeight" highlight-current-row style="width: 100%;">
		  		<el-table-column prop="ActivityTitle" label="标题" min-width="130" fixed="left"></el-table-column>
					<el-table-column prop="AddUserNo" label="申请人" min-width="160">
						<template slot-scope="scope">
							<a-tag color="blue">{{ scope.row.AddUserNo }}</a-tag>
							{{ scope.row.AddUserName }}
						</template>
					</el-table-column>
		  		<el-table-column prop="AddTime" label="时间" min-width="200"></el-table-column>
		  		<el-table-column prop="ChargeUserNo" label="审批节点" min-width="160">
		  			<template slot-scope="scope">
		  				<a-tag color="blue">{{ scope.row.FlowTypeName }}</a-tag>
		  			</template>
		  		</el-table-column>
		  		<el-table-column label="操作" width="120" fixed="right">
		  			<template slot-scope="scope">
		  				<i title="详情" class="iconfont icon-xiangqing" style="color: #1890FF;" @click="seeList(scope.row, 'detail',2)"></i>
		  			</template>
		  		</el-table-column>
		  	</el-table>
		  	<el-pagination
		  		@size-change="handleSizeChange3"
		  		@current-change="handleCurrentChange3"
		  		:current-page="pagination3.currentPage"
		  		:page-sizes="pagination3.pageSizeOptions"
		  		:page-size="pagination3.pageSize"
		  		layout="total, sizes, prev, pager, next, jumper"
		  		:total="pagination3.total"
		  	></el-pagination>
		  </div>
		
	</div>
</template>

<script>
	import moment from 'moment';
import Func from '@/utils/func';
import { GetSchoolAlreadyExamPageList, GetEndExamPageList,GetEndAlreadyExamPageList,DeleteActivity,GetActivityStateList,GetClubPageListCommon } from '@/api/follow';
const data3 = [];
export default {
	components: {
	},
	data() {
		return {
			applyIf:false,
			data3,
			form: this.$form.createForm(this, {
				name: 'advanced_search'
			}),
			pagination3: {
				currentPage: 1,
				pageSize: this.global.pageSize,
				pageSizeOptions: this.global.pageSizeOptions, // 每页中显示的数据
				showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
			},
			addIf: false,
			text: {},
			visible: false,
			confirmLoading: false,
			itemId: '',
			departmentList: [],
			worklist: [],
			loading3: false,
			values3: {},
			pages3: {
				pageIndex: 1,
				pageSize: 20
			},
			tableHeight: parseFloat(window.innerHeight - 160),
			ActivityStateList:[],
			ClubList:[],
			tabkey:1
		};
	},
	computed: {},
	created() {
		this.getList3();
		this.getOtherList()
	},
	mounted() {},
	methods: {
		moment,
		tabChange(key) {
			this.tabkey = key
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
				this.ClubList = res.data.data
			}
		},
		handleSearch3(e) {
			e.preventDefault();
			this.form.validateFields((error, values) => {
				this.pagination3.currentPage = 1;
				this.values3 = values;
				this.getList3();
			});
		},
		handleReset3() {
			this.form.resetFields();
			this.values3 = {};
			this.getList3();
		},
		handleSizeChange3(val) {
			this.pagination.pageSize = val;
			this.getList();
		},
		handleCurrentChange3(val) {
			this.pagination.currentPage = val;
			this.getList();
		},
		async getList3() {
			this.loading3 = true;
			let data = {};
			if (this.values3) {
				data = this.values3;
			}
			data.pageIndex = this.pagination3.currentPage;
			data.pageSize = this.pagination3.pageSize;
			let res = await GetSchoolAlreadyExamPageList(data);
			this.loading3 = false;
			this.data3 = res.data.data;
			const pagination = { ...this.pagination3 };
			pagination.total = res.data.pageInfo.TotalItemCount;
			this.pagination3 = pagination;
		},
		async getOtherList(){
			let res = await GetActivityStateList()
			this.ActivityStateList = res.data.data
		},
		addList() {
			this.text = {};
			this.addIf = !this.addIf;
		},
		
		seeList(text,name,type){
			let path = 'ActivityFlowDetail'
			this.$router.push({
				name: path,
				query: {
					ID: text.ID,
					type: type
				}
			});
		},
		applyHander(item){
			this.text = item
			this.applyIf = true
		},
		closeFun() {
			this.applyIf = false;
			this.getList3()
			
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
