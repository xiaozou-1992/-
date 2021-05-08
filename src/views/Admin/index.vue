<template>
	<div>
		<div class="h2">管理员管理</div>
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
				<el-table-column prop="UserName" label="姓名" min-width="100"></el-table-column>
				<el-table-column prop="UserNo" label="学号/工号" min-width="100"></el-table-column>
				<el-table-column prop="IsEnable" label="状态">
					<template slot-scope="scope">
						<a-tag :color="scope.row.IsEnable ? 'green' : 'pink'">{{ scope.row.IsEnable ? '启用' : '停用' }}</a-tag>
					</template>
				</el-table-column>
				<el-table-column prop="AddUserName" label="添加人" min-width="100"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<i title="修改" class="iconfont icon-editor1" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
						<i title="停用/启用" class="iconfont icon-kidslock" style="color: green;" @click="enableList(scope.row)"></i>
						<i title="删除" class="iconfont icon-delete" style="color: red;" @click="deleteList(scope.row)"></i>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<add :text="text" v-show="addIf" :RoleList="RoleList" @closeFun="closeFun"></add>
	</div>
</template>

<script>
import add from './add';
import Func from '@/utils/func';
import { GetAdminPageList, DeleteAdmin, GetDepartList,EnableAdmin,GetRolePageList } from '@/api/follow';
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
			TeacherTypeList: this.global.TeacherTypeList,
			DepartCodeList:[],
			RoleList:[]
		};
	},
	computed: {},
	created() {
		this.getList();
		this.getOtherList();
	},
	mounted() {},
	methods: {
		async getOtherList(){
			let data={}
			data.pageIndex = 1
			data.pageSize = 999
			let res1 = await GetRolePageList(data)
			this.RoleList = res1.data.data
			let res2 = await GetDepartList()
			this.DepartCodeList = res2.data.data
			
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
			data.clubTypeID = this.$route.query.clubTypeID;
			let res = await GetAdminPageList(data);
			this.loading = false;
			this.data = res.data.data;
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
			let that = this;
			this.$confirm({
				title: '提示',
				content: `您确定删除该管理员吗？`,
				okText: '确认',
				cancelText: '取消',
				async onOk() {
					let data = {};
					data.id = text.ID;
					let res = await DeleteAdmin(data);
					if (res.data.code == 0) {
						that.getList();
						that.$message.success(res.data.msg);
					} else {
						that.$message.error(res.data.msg);
					}
				}
			});
		},
		enableList(text) {
			let that = this
			this.$confirm({
				title: '提示',
				content: `您确定要${text.IsEnable ? '停用' : '启用'}该管理员吗？`,
				okText: '确认',
				cancelText: '取消',
				async onOk() {
					let data = {}
					data.id = text.ID
					let res = await EnableAdmin(data);
					if(res.data.code==0){
						that.getList()
						that.$message.success(res.data.msg)
					}else{
						that.$message.error(res.data.msg)
					}
				}
			});
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
