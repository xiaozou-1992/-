<template>
	<div class="all"  v-loading="loading">
		<div id="components-form-demo-advanced-search" >
			<div class="h2">加入俱乐部活动</div>
			<div class="head">
			</div>
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字">
							<a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" />
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
			<!-- <a-button type="primary" class="btn" @click="addActivity(1,1)">新增活动</a-button> -->
		</div>
		<div>
			      <el-table ref="singleTable" :data="data" border highlight-current-row style="width: 100%">
			      	<el-table-column prop="Title" label="名称" min-width="100" fixed="left"></el-table-column>
					<el-table-column prop="Ico" label="图标" min-width="140">
						<template slot-scope="scope">
							<img style="width:100px;" :src="'http://api.jlb.ac.acxk.net'+scope.row.Ico.split('|')[1]" />
						</template>
					</el-table-column>
					<el-table-column prop="ChargeUserName" label="主席" min-width="140"></el-table-column>
			      	<el-table-column prop="ChargeUserNo" label="学号" min-width="140"></el-table-column>
			      	<el-table-column prop="AddTime" label="活动时间" min-width="120">
						<template slot-scope="scope">
							<div>始：{{scope.row.StartTime}}</div>
							<div>终：{{scope.row.EndTime}}</div>
							
						</template>
					</el-table-column>
			      	<el-table-column prop="IsEnable" label="操作" min-width="60">
			      		<template v-if="new Date().getTime()<new Date(scope.row.EndTime.replace(/-/g,'/')).getTime()" slot-scope="scope">
			      		<i title="申请加入活动" v-if="scope.row.State!=5" class="iconfont icon-activity" style="color: #1890FF;" @click="JoinActivity(scope.row)"></i>
			      		</template>
			      	</el-table-column>
			      </el-table>
			     
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
			 :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total"></el-pagination>
		</div>
		<applyActivity :approvalType="4" :text="text" :time="time" v-show="showModal" @closeFun="closeFun(1)"></applyActivity>
	</div>
</template>

<script>
	import Func from '@/utils/func';
	import {
	GetActivityPageList,
	GetActivityStateList
	} from '@/api/follow';
	import applyActivity from '@/components/ApplyActivity'
	const data = [];
	export default {
		components: {
			applyActivity
		},
		props: {
			text: Object,
			type:Number
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
				TypeList: [
					{
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
				ClubID:this.$route.query.ID,
				ActivityStateList:[],
				time:''
			};
		},
		computed: {},
		created() {
			this.getList();
			this.ActivityState()
		},
		mounted() {},
		methods: {
			async ActivityState(){
				let res = await GetActivityStateList();
				this.ActivityStateList=res.data.data
			},
			applydelete(text) {
				// this.visible = true
				// this.deletelist = text
				let that=this
				this.$confirm({
					title: '提示',
					content: `您确定删除该申请吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await UserdeleteActivity(data);
						if(res.data.code==0){
							that.getList()
							that.$message.success(res.data.msg)
						}else{
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			sumbitapply(text){
				let that=this
				this.$confirm({
					title: '提示',
					content: `您确定提交活动审批吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await UserSubmitActivity(data);
						if(res.data.code==0){
							that.getList()
							that.$message.success(res.data.msg)
						}else{
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			 callback(key) {
					this.getList(key)
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
			async getList(key) {
				this.loading = true;
				let data = {};
				if (this.values) {
					data = this.values;
				}
				
				data.pageIndex = this.pagination.currentPage;
				data.pageSize = this.pagination.pageSize;
				data.clubID = this.$route.query.ID
				let res = await GetActivityPageList(data);
				
				
				this.data = res.data.data;
				this.loading = false;
				const pagination = { ...this.pagination
				};
				pagination.total = res.data.pageInfo.TotalItemCount;
				this.pagination = pagination;	
			
			},
			addActivity(t,type) {
				this.type=type
				this.showModal = !this.showModal;
			},
			JoinActivity(t){
				this.text=t
				this.time=new Date()
				this.showModal = !this.showModal;
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
			closeFun(index) {
				this.showModal = false
				this.detailshowModal = false
				this.updateshowModal = false
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
