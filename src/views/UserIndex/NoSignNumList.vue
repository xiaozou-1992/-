<template>
	<div class="all" v-loading="loading">
		<div id="components-form-demo-advanced-search">
			<div class="h2">未签到人员</div>
			<div class="head">
			</div>
			<!-- <a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="状态">
							<a-select :allowClear="true" v-decorator="['isAgree',{initialValue:'null'}]" placeholder="全部" optionFilterProp="children"
							 showSearch>
								<a-select-option v-for="(item, index) in TypeList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
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
		</div>
		<div>
			<el-table ref="singleTable" :data="data" border highlight-current-row style="width: 100%">
				<el-table-column prop="Name" label="姓名" min-width="100" fixed="left">
					<template slot-scope="scope">
						<div>
							{{ scope.row.Name | testname }}
							<a-icon v-if="scope.row.Sex==2" style="color: deeppink;" type="woman" />
							<a-icon v-else style="color: #1890FF;" type="man" />
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="UserNo" label="学号" min-width="140">
					<template slot-scope="scope">
						{{ scope.row.UserNo | testno }}
					</template>
				</el-table-column>
				<el-table-column prop="AddTime" label="加入时间" min-width="120"></el-table-column>
			</el-table>
			<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
			 :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total"></el-pagination> -->
		</div>
	</div>
</template>

<script>
	import Func from '@/utils/func';
	import {
		UserNoSignUserPageList
	} from '@/api/follow';
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
				TypeList: [{
						ID: 'null',
						Name: '待审核'
					},
					{
						ID: 'true',
						Name: '审核通过'
					},
					{
						ID: 'false',
						Name: '审核未通过'
					}
				],
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
				showModal: false
			};
		},
		computed: {},
		created() {
			this.getList();
		},
		mounted() {},
		methods: {
			async getList() {
				this.loading = true;
				let data = {};
				if (this.values) {
					data = this.values;
				}
				// data.pageIndex = this.pagination.currentPage;
				// data.pageSize = this.pagination.pageSize;
				data.id = this.$route.query.ID
				let res = await UserNoSignUserPageList(data);
				this.loading = false;
				this.data = res.data.data;
				// const pagination = { ...this.pagination
				// };
				// pagination.total = res.data.pageInfo.TotalItemCount;
				// this.pagination = pagination;
			},
			closeFun(index) {
				this.showModal = false
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
</style>
