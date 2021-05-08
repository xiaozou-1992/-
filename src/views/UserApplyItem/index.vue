<template>
	<div>
		<div class="h2">积分申请列表</div>
		<div id="components-form-demo-advanced-search">
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字"><a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" /></a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="申请项">
							<a-select :allowClear="true" v-decorator="['applyItemNodeID']" placeholder="全部" optionFilterProp="children" showSearch>
								<a-select-option v-for="(item, index) in applyItemNodeList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="申请人">
							<template>
								<a-select v-decorator="['applyUserNo']" showSearch optionFilterProp="children" style="width: 100%" 
								          @search="fetchUser" :filterOption="filterOption" allowClear
								>
								  <a-spin v-if="fetching" slot="notFoundContent" size="small" />
								  <a-select-option v-for="(item, index) in UserList" :key="item.UserNo">{{ item.UserNo }}&nbsp;|&nbsp;{{ item.Name }}</a-select-option>
								</a-select>
							</template>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="状态">
							<a-select :allowClear="true" v-decorator="['state']" placeholder="全部" optionFilterProp="children" showSearch>
								<a-select-option v-for="(item, index) in stateList" :key="index" :value="item.Key">{{ item.Value }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="8" style="margin-top:4px;">
						<a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
						<a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">重置</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<!-- <div class="option"><a-button type="primary" class="btn" @click="addList">新增</a-button></div> -->
		<div>
			<el-table :data="data" v-loading="loading" border :max-height="tableHeight" highlight-current-row style="width: 100%;">
				<!-- <el-table-column prop="Title" label="标题" min-width="230" fixed="left"></el-table-column> -->
				<el-table-column prop="Title" label="标题" min-width="230"></el-table-column>
				<el-table-column prop="StateName" label="状态" min-width="100">
					<template slot-scope="scope">
						<a-tag :color="colorFun(scope.row.State)">{{ scope.row.StateName }}</a-tag>
					</template>
				</el-table-column>
				<el-table-column prop="ChargeUserNo" label="申请人" min-width="160">
					<template slot-scope="scope">
						<a-tag color="blue">{{ scope.row.AddUserNo }}</a-tag>
						{{ scope.row.AddUserName }}
					</template>
				</el-table-column>
				<el-table-column prop="AddTime" label="申请时间" min-width="200"></el-table-column>
				<el-table-column label="操作" width="120">
					<template slot-scope="scope">
						<i title="修改" class="iconfont icon-editor1" style="color: #1890FF;" @click="seeList(scope.row, 'modify')"></i>
						<i title="删除" class="iconfont icon-delete" style="color: red;" @click="deleteList(scope.row)"></i>
						<i title="详情" class="iconfont icon-xiangqing" style="color: green;" @click="seeList(scope.row,'detail')"></i>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pagination.currentPage"
				:page-sizes="pagination.pageSizeOptions"
				:page-size="pagination.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pagination.total"
			></el-pagination>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
import Func from '@/utils/func';
import { GetUserApplyItemPageList, DeleteUserApplyItemPageList,GetApplyItemNodeList,GetUserApplyItemStateList,GetUserList } from '@/api/follow';
const data = [];
export default {
	components: {
	},
	data() {
		return {
			data,
			form: this.$form.createForm(this, {
				name: 'advanced_search'
			}),
			pagination: {
				currentPage: 1,
				pageSize: this.global.pageSize,
				pageSizeOptions: this.global.pageSizeOptions, // 每页中显示的数据
				showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
			},
			addIf: false,
			text: {},
			fetching:false,
			visible: false,
			confirmLoading: false,
			departmentList: [],
			loading: false,
			values: {},
			pages: {
				pageIndex: 1,
				pageSize: 20
			},
			tableHeight: parseFloat(window.innerHeight - 160),
			applyItemNodeList:[],
			UserList:[],
			stateList:[],
			time:new Date(),
			ids:''
		};
	},
	computed: {},
	created() {
		this.getList();
		this.getOtherList()
	},
	mounted() {},
	methods: {
		moment,
		filterOption(input, option) {
			return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
		},
		colorFun(type){
			let color = 'pink'
			switch(type){
				case 0:
					color = 'pink'
					break;
				case 1:
					color = 'red'
					break;
				case 2:
					color = 'orange'
					break;
				case 3:
					color = 'green'
					break;
				case 4:
					color = 'cyan'
					break;
			}
			return color
		},
		async fetchUser(value) {
			this.fetching = true
			let myReg = /^[^a-zA-Z]+$/
			if (value && myReg.test(value) && value.length > 1) {
				let data = {}
				data.key = value
				data.type = 1
				data.top = 10
				let res = await GetUserList(data)
				this.fetching = false
				this.UserList = res.data.data
			}
		},
		handleSearch(e) {
			e.preventDefault();
			this.form.validateFields((error, values) => {
				this.pagination.currentPage = 1;
				this.values = values;
				this.getList();
			});
		},
		handleReset() {
			this.form.resetFields();
			this.values = {};
			this.getList();
		},
		handleSizeChange(val) {
			this.pagination.pageSize = val;
			this.getList();
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
			this.getList();
		},
		async getList() {
			this.loading = true;
			let data = {};
			if (this.values) {
				data = this.values;
			}
			data.pageIndex = this.pagination.currentPage;
			data.pageSize = this.pagination.pageSize;
			let res = await GetUserApplyItemPageList(data);
			this.loading = false;
			this.data = res.data.data;
			const pagination = { ...this.pagination };
			pagination.total = res.data.pageInfo.TotalItemCount;
			this.pagination = pagination;
		},
		async getOtherList(){
			let res = await GetApplyItemNodeList()
			this.applyItemNodeList = res.data.data
			let res1 = await GetUserApplyItemStateList()
			this.stateList = res1.data.data
			
		},
		deleteList(text) {
			let that = this
			this.$confirm({
				title: '提示',
				content: `您确定删除该积分申请吗？`,
				okText: '确认',
				cancelText: '取消',
				async onOk() {
					let data = {}
					data.id = text.ID
					let res = await DeleteUserApplyItemPageList(data);
					if(res.data.code==0){
						that.getList()
						that.$message.success(res.data.msg)
					}else{
						that.$message.error(res.data.msg)
					}
				}
			});
		},
		seeList(text,name){
			let path = ''
			if(name == 'detail'){
				path='UserApplyItemDetail'
			}else if(name=='modify'){
				path='UserApplyItemUpdate'
			}
			this.$router.push({
				name: path,
				query: {
					ID: text.ID
				}
			});
		},
		closeFun() {
			this.addIf = false;
			this.getList()
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
