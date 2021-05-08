<template>
	<div class="all" v-loading="loading">
		<div id="components-form-demo-advanced-search" >
			<div class="h2">加入俱乐部</div>
			<div class="head">
				<p></p>
			</div>
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字">
							<a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" />
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="类型">
							<a-select :allowClear="true" v-decorator="['typeID']" placeholder="全部" optionFilterProp="children" showSearch>
								<a-select-option v-for="(item, index) in TypeIDList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="挂靠部门">
							<a-select :allowClear="true" v-decorator="['departCode']" placeholder="全部" optionFilterProp="children"
							 showSearch>
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
		<div class="option">
			<!-- <a-button type="primary" class="btn" @click="addList">新增</a-button> -->
		</div>
		<div>
			<el-table ref="singleTable" :data="data" border highlight-current-row  style="width: 100%">
				<el-table-column prop="Name" label="名称" min-width="100" fixed="left"></el-table-column>
				<el-table-column prop="Ico" label="图标" min-width="140">
					<template slot-scope="scope">
						<img style="width:100px;" :src="scope.row.Ico" />
					</template>
				</el-table-column>
				<!-- <el-table-column prop="TypeName" label="类型" min-width="100"></el-table-column> -->
				<el-table-column prop="DpeartName" label="类型/挂靠部门" min-width="120">
					<template slot-scope="scope">
						<div>{{scope.row.TypeName}}</div>
						<div>{{scope.row.DpeartName}}</div>
						</template>
				</el-table-column>
				<el-table-column prop="ChairmanNo" label="会长/学号" min-width="100">
					<template slot-scope="scope">
						<div>{{scope.row.ChairmanNo | testno}}</div>
						<div>{{scope.row.CairmanName | testname}}</div>
						</template>
				</el-table-column>
				<el-table-column prop="DpeartName" label="是否加入" min-width="50">
					<template slot-scope="scope">
						<div v-if="scope.row.IsJoin"><a-tag color="green"> 已加入 </a-tag> </div>
						<div v-else><a-tag color="red"> 未加入 </a-tag> </div>
						</template>
				</el-table-column>
				<!-- <el-table-column prop="CairmanName" label="会长" min-width="100"></el-table-column> -->
				<el-table-column prop="Desc" label="描述" min-width="80" show-overflow-tooltip=""></el-table-column>
				<!-- <el-table-column prop="IsEnable" label="状态">
					<template slot-scope="scope">
						<a-tag :color="scope.row.IsEnable ? 'green' : 'pink'">{{ scope.row.IsEnable ? '启用' : '停用' }}</a-tag>
					</template>
				</el-table-column> -->
				<el-table-column prop="IsEnable" label="操作" width="70">
					<template slot-scope="scope">
						<!-- <a-button type="primary"  @click="joinok(scope.row)" class="btn1">加入</a-button> -->
						<i v-if="!scope.row.IsJoin" title="加入俱乐部" class="iconfont icon-jiarujulebu" style="color: #1890FF;font-size: 28px;"
						 @click="joinok(scope.row)"></i>
					</template>
				</el-table-column>
			</el-table>
			<!-- <div class="joinok">
				<a-button type="primary" :class="{ disabled:ishaveid }" @click="joinok" class="btn1">确定加入</a-button>
			</div> -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
			 :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total"></el-pagination>
		</div>
		<applyJoin :approvalType="4" :text="text" :time="time" v-show="showModal" @closeFun="closeFun(1)"></applyJoin>
	</div>
</template>

<script>
	import Func from '@/utils/func';
	import {
		GetClubPageList,
		DeleteClub,
		EnableClub,
		GetClubTypeList,
		GetClubProjectList,
		GetDepartList
	} from '@/api/follow';
	import applyJoin from '@/components/ApplyJoin'
	const data = [];
	export default {
		components: {
			applyJoin
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
				TypeIDList: [],
				DepartCodeList: [],
				ProjectIDList: [],
				ishaveid: true,
				selectList: {},
				showModal: false,
				time:''
			};
		},
		computed: {},
		created() {
			this.getList();
			this.getOtherList()
		},
		mounted() {},
		methods: {
			joinok(text) {
				this.time=new Date()
				this.text=text
				this.showModal=true
			},
			handleChange(val) {
				this.currentRow = val;
				if (val.ID) {
					this.ishaveid = false
					this.selectList = val
				} else {
					this.ishaveid = true
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
				let res = await GetClubPageList(data);
				this.loading = false;
				this.data = res.data.data;
				const pagination = { ...this.pagination
				};
				pagination.total = res.data.pageInfo.TotalItemCount;
				this.pagination = pagination;
			},
			async getOtherList() {
				let res = await GetClubTypeList()
				let res1 = await GetClubProjectList()
				let res2 = await GetDepartList()
				this.TypeIDList = res.data.data
				this.ProjectIDList = res1.data.data
				this.DepartCodeList = res2.data.data
			},
			addList() {
				this.text = {};
				this.addIf = !this.addIf;
			},
			modifyList(text) {
				text = Object.assign(text, {
					time: new Date()
				});
				this.addIf = !this.addIf;
				this.text = text;
			},
			enableList(text) {
				let that = this
				this.$confirm({
					title: '提示',
					content: `您确定要${text.IsEnable ? '停用' : '启用'}该俱乐部吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await EnableClub(data);
						if (res.data.code == 0) {
							that.getList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				});
			},
			deleteList(text) {
				let that = this
				this.$confirm({
					title: '提示',
					content: `您确定删除该俱乐部吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await DeleteClub(data);
						if (res.data.code == 0) {
							that.getList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				});
			},
			seeList(text, name) {
				let path = ''
				if (name == 'teacher') {
					path = 'ClubTeacher'
				} else if (name == 'manage') {
					path = 'ClubManagerList'
				} else {
					path = 'ClubMember'
				}
				this.$router.push({
					name: path,
					query: {
						ID: text.ID
					}
				});
			},
			closeFun(index) {
				this.showModal = false
			},
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

	/deep/.ant-table-thead>tr>th,
	/deep/.ant-table-tbody>tr>td {
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

	.all {
		background-color: white;
		padding: 20px;
	}

	// /deep/.el-table tr.current-row td {
	// 	background-color: #E1F3D8;
	// }

	.joinok {
		width: 100%;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 40px;
	}
	/deep/.ant-form-item-control-wrapper{
	min-width: 150px;	
	}
</style>
