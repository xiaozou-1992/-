<template>
	<div class="all"  v-loading="loading">
		<div id="components-form-demo-advanced-search">
			<div class="h2">活动成员管理</div>
			<!-- <div class="head">
				<p>搜索条件</p>
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
			</a-form> -->
		</div>
		<div class="option">
			<template v-if="ifbtn">
				<a-button type="primary" v-if="State!=5" class="btn" @click="invitation">邀请成员</a-button>
			</template>
		</div>
		<div>
			<el-table ref="singleTable" :data="data" border highlight-current-row style="width: 100%">
				<el-table-column prop="Name" label="姓名" min-width="100" fixed="left">
					<template slot-scope="scope">
						{{ scope.row.Name | testname }}
					</template>	
				</el-table-column>
				<el-table-column prop="UserNo" label="学号" min-width="120">
					<template slot-scope="scope">
						{{ scope.row.UserNo | testno }}
					</template>
				</el-table-column>
				<el-table-column prop="IsManager" label="职责" min-width="100">
					<template slot-scope="scope">
						<!-- {{ scope.row.IsManager==true?'管理员':'成员' }} -->
						<a-tag color="pink" v-if="scope.row.IsManager==true"> 管理员 </a-tag>
						<a-tag color="green" v-else> 成员 </a-tag> 
					</template>
				</el-table-column>
				<el-table-column prop="AddTime" label="加入时间" min-width="100"></el-table-column>
				<el-table-column prop="IsEnable" label="操作" min-width="100" fixed="right">
					<template slot-scope="scope">
						<i title="删除" v-if="!scope.row.IsManager&&State!=5" class="iconfont icon-delete1" style="color: red;" @click="deletemember(scope.row)"></i>
						<!-- <i title="详情" v-if="scope.row.IsManager && ChairmanNo == UserInfo.UserNo" class="iconfont icon-chakan" style="color: #1890FF;"
						 @click="detail(scope.row,1)"></i> -->
						<!-- <i title="修改权限" v-if="scope.row.IsManager && ChairmanNo == UserInfo.UserNo" class="iconfont icon-editor1" style="color: #1890FF;"
						 @click="detail(scope.row,2)"></i> -->
						<i title="设为管理员" v-if="!scope.row.IsManager && ChairmanNo == UserInfo.UserNo&&State!=5" class="iconfont icon-guanliyuan1"
						 style="color: deeppink;" @click="setadmin(scope.row,3)"></i>
						<i title="取消管理员" v-if="scope.row.IsManager && ChairmanNo == UserInfo.UserNo&&State!=5" class="iconfont icon-assist-cancel"
						 style="color: red;" @click="canceladmin(scope.row,4)"></i>
						 <!-- <i title="邀请成员加入活动" v-if="!scope.row.IsManager" class="iconfont icon-yaoqingchengyuan" style="color: #1890FF;"
						  @click="invitation(scope.row,1)"></i> -->
					</template>
				</el-table-column>
			</el-table>
			<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
			 :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total"></el-pagination> -->
		</div>
		<!-- <detail :approvalType="4" :time="time" :text="text" :ID="ClubID" :linktype="linktype" v-show="showModal" @closeFun="closeFun(1)"></detail> -->
		<invitation :ID="ID" :ClubID="ClubID" :time="time" v-show="invitationShow" @closeFun="closeFun(1)"></invitation>
	</div>
</template>

<script>
	import Func from '@/utils/func';
	import Cache from '@/utils/cache'
	import {
		GetUserActivityMember,
		DeleteUserActivityMember,
		UserUpdateActivity,
		SetUserActivityMember,
		CancelUserActivityMember,
		DoInviteUserJoinActivity,
		UserActivityDetail
	} from '@/api/follow';
	import detail from './detail'
	import invitation  from './InvitationMember'
	const data = [];
	export default {
		components: {
			detail,
			invitation
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
				UserInfo: Cache.get('myInfo'),
				ChairmanNo: this.$route.query.ChairmanNo,
				linktype: 1,
				ID: this.$route.query.ID,
				ClubID:this.$route.query.ClubID,
				visible: false,
				deletelist: {},
				time:'',
				invitationShow:false,
				invitiondata:{},
				State:'',
				ifbtn:false
			};
		},
		computed: {},
		created() {
			this.getList();
			this.getOtherList()
		},
		mounted() {},
		methods: {
			invitation(){
				this.time=new Date()
				this.invitationShow=true
			},
			setadmin(text){
				let that=this
				this.$confirm({
					title: '提示',
					content: `您确定设定该用户为管理员吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.userNo=text.UserNo
						data.ActivityID = that.ID
						let res = await SetUserActivityMember(data);
						if(res.data.code==0){
							that.getList()
							that.$message.success(res.data.msg)
						}else{
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			canceladmin(text){
				let that=this
				this.$confirm({
					title: '提示',
					content: `您确定取消该用户的管理员权限吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.userNo=text.UserNo
						data.ActivityID = that.ID
						let res = await CancelUserActivityMember(data);
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
				this.visible = false
				this.getList()
			},
			deletemember(text) {
				// this.visible = true
				// this.deletelist = text
				let that=this
				this.$confirm({
					title: '提示',
					content: `您确定删除该用户吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await DeleteUserActivityMember(data);
						if(res.data.code==0){
							that.getList()
							that.$message.success(res.data.msg)
						}else{
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			detail(text, type) {
				this.linktype = type
				this.text = text
				this.time=new Date()
				this.showModal = true
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
				data.activityID = this.$route.query.ID
				data.pageIndex = this.pagination.currentPage;
				data.pageSize = this.pagination.pageSize;
				let res = await GetUserActivityMember(data);
				this.loading = false;
				this.data = res.data.data;
				// const pagination = { ...this.pagination
				// };
				// pagination.total = res.data.pageInfo.TotalItemCount;
				// this.pagination = pagination;
			},
			async getOtherList() {
				let data={}
				data.id=this.$route.query.ID
				let res3 =await UserActivityDetail(data)
				let num1=Date.parse(new Date())
				this.State=res3.data.data.State
				let num2=Date.parse(res3.data.data.EndTime.replace(/-/g,'/'))
				if(num1 < num2){
					this.ifbtn=true
				}else{
					this.ifbtn=false
				}
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
			closeFun(index) {
				this.showModal = false
				this.invitationShow=false
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
