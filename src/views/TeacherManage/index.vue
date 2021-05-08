<template>
	<div>
		<div class="h2">教师管理</div>
		<div id="components-form-demo-advanced-search">
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字"><a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" /></a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="部门">
							<a-select :allowClear="true" v-decorator="['departCode']" placeholder="全部" optionFilterProp="children" showSearch>
								<a-select-option v-for="(item, index) in DepartCodeList" :key="index" :value="item.Code">{{ item.Name }}</a-select-option>
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
		<div class="option"><a-button type="primary" class="btn" @click="addList">新增</a-button></div>
		<div>
			<el-table :data="data" v-loading="loading" border :max-height="tableHeight" highlight-current-row style="width: 100%;">
				<el-table-column prop="Name" label="名称" min-width="100" fixed="left">
					<template slot-scope="scope">
						<i :title="scope.row.Sex==1?'男':'女'" :class="{'iconfont':true, 'icon-xingbienan':scope.row.Sex==1,'icon-xingbienv':scope.row.Sex==2}" :style="{'color': scope.row.Sex==1?'blue':'red'}" @click="deleteList(scope.row)"></i>{{ scope.row.Name }}
					</template>
				</el-table-column>
				<el-table-column prop="UserNo" label="工号" min-width="100"></el-table-column>
				<el-table-column prop="DepartName" label="所属部门" min-width="120"></el-table-column>
				<el-table-column prop="IsEnable" label="状态">
					<template slot-scope="scope">
						<a-tag :color="scope.row.IsEnable ? 'green' : 'pink'">{{ scope.row.IsEnable ? '启用' : '停用' }}</a-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="100" fixed="right">
					<template slot-scope="scope">
						<i title="修改" class="iconfont icon-editor1" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
						<i title="删除" class="iconfont icon-delete" style="color: red;" @click="deleteList(scope.row)"></i>
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
		<add :text="text" :DepartCodeList="DepartCodeList" :ClassList="ClassList" v-show="addIf" @closeFun="closeFun"></add>
	</div>
</template>

<script>
import add from './add';
import Func from '@/utils/func';
import moment from 'moment'
import { GetTeacherListManage, DeleteTeacher,GetDepartList,GetClassList } from '@/api/follow';
const data = [];
export default {
	components: {
		add
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
			visible: false,
			confirmLoading: false,
			itemId: '',
			gradeYear:null,
			yearPickShow:false,
			departmentList: [],
			worklist: [],
			loading: false,
			values: {},
			pages: {
				pageIndex: 1,
				pageSize: 20
			},
			tableHeight: parseFloat(window.innerHeight - 160),
			ClassList:[],
			DepartCodeList:[],
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
		handleOpenChange(status){
			this.yearPickShow = status
		},
		handlePanelChange(value, mode){
			this.gradeYear = moment(value).format('YYYY')
			this.yearPickShow = false
		},
		yearChange(date, dateString){
			if(!date){
				this.gradeYear = null
			}
		},
		handleSearch(e) {
			e.preventDefault();
			this.form.validateFields((error, values) => {
				this.pagination.currentPage = 1;
				this.values = values;
				if(this.gradeYear){
					this.values.grade = this.gradeYear
				}
				this.getList();
			});
		},
		handleReset() {
			this.form.resetFields();
			this.values = {};
			this.gradeYear = null
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
			let res = await GetTeacherListManage(data);
			this.loading = false;
			this.data = res.data.data;
			const pagination = { ...this.pagination };
			pagination.total = res.data.pageInfo.TotalItemCount;
			this.pagination = pagination;
		},
		async getOtherList(){
			let res = await GetClassList()
			this.ClassList = res.data.data
			let res1 = await GetDepartList()
			this.DepartCodeList = res1.data.data
			
		},
		addList() {
			this.text = {};
			this.addIf = !this.addIf;
		},
		modifyList(text) {
			text = Object.assign(text, { time: new Date() });
			this.addIf = !this.addIf;
			this.text = text;
		},
		deleteList(text) {
			let that = this
			this.$confirm({
				title: '提示',
				content: `您确定删除该教师吗？`,
				okText: '确认',
				cancelText: '取消',
				async onOk() {
					let data = {}
					data.id = text.ID
					let res = await DeleteTeacher(data);
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
			if(name == 'teacher'){
				path='ClubTeacher'
			}else if(name=='manage'){
				path='ClubManagerList'
			}else{
				path='ClubMember'
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
		/deep/.ant-calendar-picker{
			width:100%
		}
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
