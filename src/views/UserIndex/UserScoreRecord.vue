<template>
	<div class="all" v-loading="loading">
		<div id="components-form-demo-advanced-search">
			<div class="h2">积分</div>
			<!-- <a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字">
							<a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" />
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="状态">
							<a-select :allowClear="true" v-decorator="['state']" placeholder="全部" optionFilterProp="children" showSearch>
								<a-select-option v-for="(item, index) in TypeList" :key="index" :value="item.Key">{{ item.Value }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="8" style="margin-top:4px;">
						<a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
						<a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">重置</a-button>
					</a-col>
				</a-row>
			</a-form> -->
		</div>
		<div class="option">
			<!-- <a-button type="primary" class="btn" @click="addList()">新增</a-button> -->
		</div>
		<div>
			<el-table ref="singleTable" :data="data" border highlight-current-row style="width: 100%">
				<el-table-column prop="ActivityName" label="积分来源" min-width="100" fixed="left">
					<template slot-scope="scope">
						{{ scope.row.ActivityName?'参加活动 | '+scope.row.ActivityName:'积分申请 | '+scope.row.UserApplyItemName }}
					</template>	
				</el-table-column>
				<el-table-column prop="Score" label="积分" min-width="100" ></el-table-column>
				<el-table-column prop="AddTime" label="时间" min-width="100">
					<template slot-scope="scope">
						{{ scope.row.AddTime }}
						</template>
				</el-table-column>
			</el-table>
			<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
			 :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total"></el-pagination> -->
		</div>
		<add :time="time" :type="loadingtype" v-if="addIf" @closeFun="closeFun"></add> 
		<update :text="updatetext"  v-if="updateIf" :time="time" @closeFun="closeFun"></update>
		<detail :text="detailtext"  v-if="detailIf"  :time="time" @closeFun="closeFun"></detail>
	</div>
</template>

<script>
	import Func from '@/utils/func';
	import Cache from '@/utils/cache'
	import {
		UserDoGetScoreList,
		DoDeleteUserApplyItem,
		DoSubmitUserApplyItem,
		GetUserApplyItemStateList
	} from '@/api/follow';
	import add from './addCredit'
	import update from './UpdateCredit.vue'
	import detail from './UserCreditApplyDetail.vue'
	const data = [];
	export default {
		components: {
			add,
			update,
			detail
		},
		data() {
			return {
				data,
				form: this.$form.createForm(this, {
					name: 'advanced_search'
				}),
				loadingtype:0,
				pagination: {
					currentPage: 1,
					pageSize: this.global.pageSize,
					pageSizeOptions: this.global.pageSizeOptions, // 每页中显示的数据
					showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
				},
				addIf: false,
				text: {},
				detailtext:{},
				codeID:'',
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
				TypeList:[],
				tableHeight: parseFloat(window.innerHeight - 160),
				TypeIDList: [],
				DepartCodeList: [],
				ProjectIDList: [],
				ishaveid: true,
				selectList: {},
				showModal: false,
				UserInfo: Cache.get('myInfo'),
				ChairmanNo: this.$route.query.ChairmanNo,
				linktype: 1,
				ID: this.$route.query.ID,
				visible: false,
				deletelist: {},
				time:'',
				codeIf:false,
				detailIf:false,
				updateIf:false,
				updatetext:{}
			};
		},
		computed: {},
		created() {
			this.getList();
			this.getOtherList()
		},
		mounted() {},
		methods: {
			sumbitapply(text) {
				let that = this
				this.$confirm({
					title: '提示',
					content: `您确定提交审批吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await DoSubmitUserApplyItem(data);
						if (res.data.code == 0) {
							that.$message.success(res.data.msg)
							that.getList()
						} else {
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			handleCancel(e) {
				this.visible = false
				this.getList()
			},
			deletemember(text) {
				// this.visible = true
				// this.deletelist = text
				let that=this
				this.$confirm({
					title: '提示',
					content: `您确定删除此条记录吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await DoDeleteUserApplyItem(data);
						if(res.data.code==0){
							that.getList()
							that.$message.success(res.data.msg)
						}else{
							
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			update(text) {
				this.updatetext = text
				this.time=new Date()
				this.updateIf = true
			},
			look(text) {
				this.detailtext = text
				this.time=new Date()
				this.detailIf = true
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
				let res = await UserDoGetScoreList(data);
				this.loading = false;
				this.data = res.data.data;
				// const pagination = { ...this.pagination
				// };
				// pagination.total = res.data.pageInfo.TotalItemCount;
				// this.pagination = pagination;
			},
			async getOtherList() {
				let res = await GetUserApplyItemStateList()
				this.TypeList = res.data.data
			},
			addList() {
				this.loadingtype=1
				this.time=new Date()
				this.addIf = !this.addIf;
			},
			modifyList(text) {
				text = Object.assign(text, {
					time: new Date()
				});
				this.addIf = !this.addIf;
				this.text = text;
			},
			closeFun(index) {
				this.showModal = false
				this.addIf=false
				this.detailIf=false
				this.updateIf=false
				this.getList()
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

	.joinok {
		width: 100%;
		text-align: center;
		margin-top: 20px;
	}

	i:hover {
		cursor: pointer;
	}
</style>
