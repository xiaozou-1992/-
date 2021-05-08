<template>
	<div class="all" v-loading="loading">
		<div id="components-form-demo-advanced-search">
			<div class="h2">申请列表</div>
			<div class="head">
			</div>
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<!-- <a-col :span="8">
						<a-form-item label="关键字">
							<a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" />
						</a-form-item>
					</a-col> -->
					<a-col :span="8">
						<a-form-item label="状态">
							<a-select :allowClear="true"  @change="handleChange" v-decorator="['isAgree',{initialValue:'null'}]" placeholder="全部" optionFilterProp="children" showSearch>
								<a-select-option v-for="(item, index) in TypeList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<!-- <a-col :span="8">
						<a-form-item label="部门编码">
							<a-select :allowClear="true" v-decorator="['departCode']" placeholder="全部" optionFilterProp="children"
							 showSearch>
								<a-select-option v-for="(item, index) in DepartCodeList" :key="index" :value="item.Code">{{ item.Name }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col> -->
					<a-col :span="8" style="margin-top:4px;">
						<a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
						<a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">重置</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<div class="option">
			<template v-if="showbutton">
			<a-button type="primary" :disabled="multipleSelection.length==0"  v-if="showbtn" @click="addList">
			      批量审核({{multipleSelection.length}})
			    </a-button>
				</template>
		</div>
		<div>
			<el-table ref="singleTable" :data="data" border highlight-current-row  style="width: 100%" tooltip-effect="dark"  @selection-change="handleSelectionChange">
				<el-table-column
				    type="selection"
				    width="55">
				  </el-table-column>
				<el-table-column prop="Name" label="姓名" min-width="100" fixed="left">
					<template slot-scope="scope">
						{{ scope.row.Name | testname }}
					</template>
				</el-table-column>
				<el-table-column prop="UserNo" label="学号" min-width="140">
					<template slot-scope="scope">
						{{ scope.row.UserNo | testno }}
					</template>
				</el-table-column>
				<el-table-column prop="Reason" label="原因" min-width="100"></el-table-column>
				<el-table-column prop="Reason" label="状态" min-width="100">
					<template slot-scope="scope">
					<!-- {{ scope.row.isAgree==null?'待审核':(scope.row.isAgree==true?'审核通过':'审核未通过') }} -->
					<span v-if="scope.row.IsAgree==null">
						  <a-tag color="orange">待审核</a-tag>
					</span>
					<span v-if="scope.row.IsAgree==true">
						  <a-tag color="green">通过</a-tag>
					</span>
					<span v-if="scope.row.IsAgree==false">
						  <a-tag color="pink">未通过</a-tag>
					</span>
					</template>
				</el-table-column>
				<el-table-column prop="AddTime" label="申请时间" min-width="120"></el-table-column>
				<el-table-column prop="IsEnable" label="操作" v-if="showbutton">
					<template slot-scope="scope">
						<!-- <i title="查看" class="iconfont icon-chakan" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
						<i title="修改权限" class="iconfont icon-editor1" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
						<i title="取消管理员" class="iconfont icon-guanliyuan1" style="color: red;" @click="seeList(scope.row,'manage')"></i> -->
						<i title="审核" v-if="scope.row.IsAgree==null" class="iconfont icon-shenpi" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
			 :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total"></el-pagination>
		</div>
		<applyJoin :approvalType="2" :text="text" v-show="showModal" @closeFun="closeFun(1)"></applyJoin>
		<batchApply :approvalType="2" :text="batchtext" v-show="batchshowModal" @closeFun="closeFun"></batchApply>
		<a-modal
		      title="审核结果"
		      :visible="visible"
		      :confirm-loading="confirmLoading"
		       @cancel="handleCancel"
			  :footer="null"
		    >
		      <div style="font-size: 16px;">
				  <div>审核成功：<span style="color:green">{{sunum}}</span>条</div>
				  <div>审核失败：<span style="color:red">{{errnum}}</span>条</div>
			  </div>
		    </a-modal>
	</div>
</template>

<script>
	import Func from '@/utils/func';
	import {
		ApplyUserActivityManager,
		UserActivityDetail
	} from '@/api/follow';
	import Cache from '@/utils/cache'
	import applyJoin from '@/components/Apply'
	import batchApply from '@/components/BatchApply'
	const data = [];
	export default {
		components: {
			applyJoin,
			batchApply
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
				TypeList:[
					{ID:'null',Name:'待审核'},
					{ID:'true',Name:'审核通过'},
					{ID:'false',Name:'审核未通过'}
				],
				multipleSelection: [],
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
				batchshowModal:false,
				sunum:0,
				errnum:0,
				batchtext:[],
				showbtn:true,
				managerPower:'',
				ChairmanNo:'',
				thisChairmanNo:Cache.get('myInfo').UserNo,
				showbutton:false
			};
		},
		computed: {},
		created() {
			this.getList();
			this.getOtherList()
		},
		mounted() {},
		methods: {
			handleCancel(e) {
			       this.visible = false;
			       this.confirmLoading = false;
			   },
			 handleSelectionChange(val) {
			       this.multipleSelection = val;
								console.log(val)
			     },
			joinok() {
				this.text=this.selectList
				this.showModal=true
			},
			handleChange(val) {
				// this.currentRow = val;
				if(val=='null'){
					this.showbtn=true
				}else{
					this.showbtn=false
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
				data.activityID=this.$route.query.ID
				let res = await ApplyUserActivityManager(data);
				this.loading = false;
				this.data = res.data.data;
				const pagination = { ...this.pagination
				};
				pagination.total = res.data.pageInfo.TotalItemCount;
				this.pagination = pagination;
			},
			async getOtherList() {
				// let res = await GetClubTypeList()
				// let res1 = await GetClubProjectList()
				// let res2 = await GetDepartList()
				let data={}
				data.id=this.$route.query.ID
				let res3 = await UserActivityDetail(data)
				this.showbutton=res3.data.data.IsManager
			},
			addList() {
				this.batchtext = this.multipleSelection;
				this.batchshowModal = !this.batchshowModal;
			},
			modifyList(text) {
				// text = Object.assign(text, {
				// 	time: new Date()
				// });
				this.showModal = !this.showModal;
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
			closeFun(index,scount,ecount) {
				if(index==2){
					this.sunum=scount
					this.errnum=ecount
					this.visible = true;
				}
				this.batchshowModal=false
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
