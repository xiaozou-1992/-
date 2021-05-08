<template>
	<div>
		<div class="h2">
			俱乐部成员管理
			<span class="count">（{{ count }}人）</span>
		</div>
		<div id="components-form-demo-advanced-search">
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字"><a-input class="field-right" placeholder="请输入姓名或学号搜索" v-decorator="[`key`]" /></a-form-item>
					</a-col>
					<a-col :span="8" style="margin-top:4px;">
						<a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
						<a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">重置</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<div class="option">
			<a-button type="primary" class="btn" @click="addList">新增</a-button>
			<a-button type="primary" class="btn" @click="exportMember">批量导入</a-button>
			<a-button type="primary" class="btn" @click="deleteMember">批量删除</a-button>
		</div>
		<div>
			<el-table :data="data" v-loading="loading" border :max-height="tableHeight" @selection-change="handleSelectionChange" highlight-current-row style="width: 100%;">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="Name" label="成员姓名" min-width="100"></el-table-column>
				<el-table-column prop="UserNo" label="学号/工号" min-width="100"></el-table-column>
				<el-table-column prop="UserNo" label="类型" min-width="100">
					<template slot-scope="scope">
						<a-tag :color="scope.row.IsManager ? 'red' : 'green'">{{ scope.row.IsManager ? '管理者' : '成员' }}</a-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="140" fixed="right">
					<template slot-scope="scope">
						<i v-if="!scope.row.IsManager" title="设为管理者" class="iconfont icon-guanliyuan1" style="color: red;" @click="setManageList(scope.row, 1)"></i>
						<i v-if="scope.row.IsManager" title="取消管理者身份" class="iconfont icon-assist-cancel" style="color: green;" @click="deleteList(scope.row, 1)"></i>
						<i v-if="scope.row.IsManager" title="修改管理者权限" class="iconfont icon-guanliyuan1" style="color: green;" @click="setManageList(scope.row, 2)"></i>
						<!-- <i title="修改" class="iconfont icon-editor1" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i> -->
						<i title="删除" class="iconfont icon-delete" style="color: red;" @click="deleteList(scope.row, 2)"></i>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<add :text="text" v-if="addIf" @closeFun="closeFun"></add>
		<setManage :text="text" v-if="setManageIf" :setType="setType" @closeFun="closeFun"></setManage>
		<a-modal
			title="批量导入"
			:visible="eaportVisible"
			style="top: 32px;"
			:width="768"
			:keyboard="false"
			destroyOnClose
			:maskClosable="false"
			:confirmLoading="exportLoading"
			@ok="exportSubmitHandler"
			@cancel="exportCloseHandler"
		>
			<a-form :form="exportform">
				<a-row :gutter="4">
					<a-col :span="24">
						<a-form-item label="学号" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
							<a-textarea
								placeholder="请输入学号，多个学号之间请换行"
								:autosize="{ minRows: 10, maxRows: 20 }"
								v-decorator="['userNo', { rules: [{ required: true }], validateFirst: true }]"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
import add from './add';
import setManage from './setManage';
import Func from '@/utils/func';
import { GetClubMemberListManage, DeleteClubMember, DeleteClubManager, AddClubMember } from '@/api/follow';
const data = [];
export default {
	components: {
		add,
		setManage
	},
	data() {
		return {
			data,
			ClubID: '',
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
			setManageIf: false,
			text: {},
			eaportVisible: false,
			exportLoading: false,
			exportform: this.$form.createForm(this, { name: 'coordinated' }),
			itemId: '',
			departmentList: [],
			worklist: [],
			loading: false,
			values: {},
			pages: {
				pageIndex: 1,
				pageSize: 20
			},
			setType: 0,
			tableHeight: parseFloat(window.innerHeight - 160),
			TeacherTypeList: this.global.TeacherTypeList,
			count: 0,
			multipleSelection:[]
		};
	},
	computed: {},
	created() {
		this.getList();
	},
	mounted() {},
	methods: {
		handleSearch(e) {
			e.preventDefault();
			this.form.validateFields((error, values) => {
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
			data.clubID = this.$route.query.ID;
			let res = await GetClubMemberListManage(data);
			this.loading = false;
			this.data = res.data.data;
			this.count = res.data.data.length;
		},
		addList() {
			this.text = {};
			this.addIf = !this.addIf;
		},
		exportMember() {
			this.eaportVisible = true;
		},
		exportSubmitHandler(e) {
			let that = this;
			e.preventDefault();
			this.exportform.validateFields(async (err, values) => {
				if (!err) {
					let list = values.userNo.split('\n');
					let data = {};
					data.ClubID = this.$route.query.ID;
					for (let i = 0, len = list.length; i < len; i++) {
						console.log(i);
						data.UserNo = list[i];
						let res = await AddClubMember(data);
						if (res.data.code == 0) {
							that.$message.success('正在导入第' + i + '条数据，请勿进行其他操作！');
						} else {
							that.$message.error(res.data.msg);
						}
					}
					that.$message.success('导入成功！');
					that.getList();
					that.eaportVisible = false;
				}
			});
		},
		handleSelectionChange(val) {
		        this.multipleSelection = val;
						console.log(this.multipleSelection)
		      },
		exportCloseHandler() {
			this.eaportVisible = false;
		},
		deleteMember(){
			if(this.multipleSelection.length==0){
				this.$message.error("请先选择要删除的成员！")
			}else{
				let that = this;
				this.$confirm({
					title: '提示',
					content: "确定要删除选中的成员吗？",
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let list = that.multipleSelection
						for (let i = 0, len = list.length; i < len; i++) {
							console.log(i);
							let data = {};
							data.id = list[i].ID;
							let res = await DeleteClubMember(data);
						}
						that.getList();
					}
				});
			}
			
		},
		modifyList(text) {
			text = Object.assign(text, { time: new Date() });
			this.addIf = !this.addIf;
			this.text = text;
		},
		setManageList(text, type) {
			text = Object.assign(text, { time: new Date() });
			this.setManageIf = !this.setManageIf;
			this.setType = type;
			this.text = text;
		},
		deleteList(text, type) {
			let content = '';
			if (type == 1) {
				content = '确定取消该成员的管理者身份吗？';
			} else {
				content = '确定删除该成员吗？';
			}
			let that = this;
			this.$confirm({
				title: '提示',
				content: content,
				okText: '确认',
				cancelText: '取消',
				async onOk() {
					let res = {};
					let data = {};

					if (type == 1) {
						data.id = text.ManagerID;
						res = await DeleteClubManager(data);
					} else {
						data.id = text.ID;
						res = await DeleteClubMember(data);
					}
					if (res.data.code == 0) {
						that.getList();
						that.$message.success(res.data.msg);
					} else {
						that.$message.error(res.data.msg);
					}
				}
			});
		},
		closeFun() {
			this.addIf = false;
			this.setManageIf = false;
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
