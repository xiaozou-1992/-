<template>
	<div>
		<div class="h2">俱乐部老师管理</div>
		<!-- <div id="components-form-demo-advanced-search">
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字"><a-input class="field-right" placeholder="请输入客户名称、手机号、单位、职务、地址搜索" v-decorator="[`key`]" /></a-form-item>
					</a-col>
					<a-col :span="8" style="margin-top:4px;">
						<a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
						<a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">重置</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div> -->
		<div class="option"><a-button type="primary" class="btn" @click="addList">新增</a-button></div>
		<div>
			<el-table :data="data" v-loading="loading" border :max-height="tableHeight" highlight-current-row style="width: 100%;">
				<el-table-column prop="Name" label="老师姓名" min-width="100"></el-table-column>
				<el-table-column prop="UserNo" label="学号/工号" min-width="100"></el-table-column>
				<el-table-column prop="Type" label="类型" min-width="100">
					<template slot-scope="scope">
						<a-tag :color="scope.row.Type == 1 ? 'green' : 'pink'">{{ TeacherTypeList.filter(item => item.Key == scope.row.Type).length>0?TeacherTypeList.filter(item => item.Key == scope.row.Type)[0].Value:'暂无' }}</a-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="100" fixed="right">
					<template slot-scope="scope">
						<i title="修改" class="iconfont icon-editor1" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
						<i title="删除" class="iconfont icon-delete" style="color: red;" @click="deleteList(scope.row)"></i>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<add :text="text" v-show="addIf" @closeFun="closeFun"></add>
	</div>
</template>

<script>
import add from './add';
import Func from '@/utils/func';
import { GetClubTeacherListManage,DeleteClubTeacher } from '@/api/follow';
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
			departmentList: [],
			worklist: [],
			loading: false,
			values: {},
			pages: {
				pageIndex: 1,
				pageSize: 20
			},
			tableHeight: parseFloat(window.innerHeight - 160),
			TeacherTypeList:this.global.TeacherTypeList
		};
	},
	computed: {},
	created() {
		this.getList()
	},
	mounted() {},
	methods: {
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
			data.clubID = this.$route.query.ID
			// data.pageIndex = this.pagination.currentPage;
			// data.pageSize = this.pagination.pageSize;
			let res = await GetClubTeacherListManage(data);
			this.loading = false;
			this.data = res.data.data;
			// const pagination = { ...this.pagination };
			// pagination.total = res.data.totalCount;
			// this.pagination = pagination;
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
				content: `您确定删除该老师吗？`,
				okText: '确认',
				cancelText: '取消',
				async onOk() {
					let data = {}
					data.id = text.ID
					let res = await DeleteClubTeacher(data);
					if(res.data.code==0){
						that.getList()
						that.$message.success(res.data.msg)
					}else{
						that.$message.error(res.data.msg)
					}
				}
			})
		},
		handleCancel(e) {
			this.visible = false;
		},
		closeFun() {
			this.addIf = false;
			this.getList();
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
