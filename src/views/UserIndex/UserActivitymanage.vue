<template>
	<div class="all"  v-loading="loading">
		<div id="components-form-demo-advanced-search">
			<div class="h2">活动管理</div>
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
			<a-button type="primary" v-if="State=='true'||State==true" class="btn" @click="addActivity(1,1)">新增活动</a-button>
		</div>
		<div>
			<a-tabs default-active-key="1" @change="callback">
				<a-tab-pane key="1" tab="我申请的">
					<el-table ref="singleTable" :data="data" border highlight-current-row style="width: 100%">
						<el-table-column prop="Title" label="名称" min-width="100" fixed="left"></el-table-column>
						<el-table-column prop="Ico" label="图标" min-width="140">
							<template slot-scope="scope">
								<img style="width:80px;" :src="'http://api.jlb.ac.acxk.net'+(scope.row.Ico).split('|')[1]" />
							</template>
						</el-table-column>
						<el-table-column prop="ChargeUserNo" label="学号" min-width="140">
							<template slot-scope="scope">
								{{ scope.row.ChargeUserNo | testno }}
								</template>
						</el-table-column>
						<el-table-column prop="Reason" label="状态" min-width="100">
							<template slot-scope="scope">
								<!-- {{ scope.row.isAgree==null?'待审核':(scope.row.isAgree==true?'审核通过':'审核未通过') }} -->
								<span>
									<a-tag color="orange">{{ ActivityStateList.filter(data => data.Key== scope.row.State).length>0?ActivityStateList.filter(data => data.Key== scope.row.State)[0].Value:'暂无' }}</a-tag>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="AddTime" label="活动时间" min-width="120">
							<template slot-scope="scope">
								<div>始：{{scope.row.StartTime}}</div>
								<div>终：{{scope.row.EndTime}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="IsEnable" label="操作" min-width="120">
							<template slot-scope="scope">
								<i title="查看" class="iconfont icon-chakan" style="color: #1890FF;" @click="detailActivity(scope.row)"></i>
								<i title="修改" class="iconfont icon-editor1" v-if="scope.row.State == 1" style="color: #1890FF;" @click="updateActivity(scope.row,3)"></i>
								<i title="提交审批" class="iconfont icon-tijiao" v-if="scope.row.State == 1" style="color: #1890FF;" @click="sumbitapply(scope.row,'manage')"></i>
								<!-- <template v-if="showbutton"><i title="申请完结" class="iconfont icon-wanjie" v-if="scope.row.State == 3&&Date.parse(scope.row.EndTime.replace(/-/g,'/')) <Date.parse(new Date())" style="color: #1890FF;" @click="sumbitapplyend(scope.row,'manage')"></i></template> -->
								<i title="删除" class="iconfont icon-delete1" v-if="scope.row.State == 1" style="color: red;" @click="applydelete(scope.row)"></i>
							</template>
						</el-table-column>
					</el-table>
				</a-tab-pane>
				<a-tab-pane key="2" tab="我管理的" force-render>
					<el-table ref="singleTable" :data="admindata" border highlight-current-row style="width: 100%">
						<el-table-column prop="Title" label="名称" min-width="100" fixed="left"></el-table-column>
						<el-table-column prop="Ico" label="图标" min-width="140">
							<template slot-scope="scope">
								<img style="width:80px;" :src="'http://api.jlb.ac.acxk.net'+(scope.row.Ico).split('|')[1]" />
							</template>
						</el-table-column>
						<el-table-column prop="ChargeUserNo" label="学号" min-width="140"></el-table-column>
						<el-table-column prop="Reason" label="状态" min-width="100">
							<template slot-scope="scope">
								<!-- {{ scope.row.isAgree==null?'待审核':(scope.row.isAgree==true?'审核通过':'审核未通过') }} -->
								<span>
									<a-tag color="orange">{{ ActivityStateList.filter(data => data.Key== scope.row.State).length>0?ActivityStateList.filter(data => data.Key== scope.row.State)[0].Value:'暂无' }}</a-tag>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="AddTime" label="活动时间" min-width="120">
							<template slot-scope="scope">
								<div>始：{{scope.row.StartTime}}</div>
								<div>终：{{scope.row.EndTime}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="IsEnable" label="操作">
							<template slot-scope="scope">
								<i title="查看" class="iconfont icon-chakan" style="color: #1890FF;" @click="detailActivity(scope.row)"></i>
								<i title="修改" class="iconfont icon-editor1" v-if="scope.row.State == 1" style="color: #1890FF;" @click="updateActivity(scope.row,3)"></i>
								<i title="提交审批" class="iconfont icon-tijiao" v-if="scope.row.State == 1" style="color: #1890FF;" @click="sumbitapply(scope.row,'manage')"></i>
								<i title="申请完结" class="iconfont icon-wanjie" v-if="scope.row.State == 3&&Date.parse(scope.row.EndTime.replace(/-/g,'/')) <Date.parse(new Date())" style="color: #1890FF;" @click="sumbitapplyend(scope.row,'manage')"></i>
								<i title="删除" class="iconfont icon-delete1" v-if="scope.row.State == 1" style="color: red;" @click="applydelete(scope.row)"></i>
							</template>
						</el-table-column>
					</el-table>
				</a-tab-pane>
				<a-tab-pane key="3" tab="我参与的">
					<el-table ref="singleTable" :data="joindata" border highlight-current-row style="width: 100%">
						<el-table-column prop="Title" label="名称" min-width="100" fixed="left"></el-table-column>
						<el-table-column prop="Ico" label="图标" min-width="140">
							<template slot-scope="scope">
								<img style="width:80px;" :src="'http://api.jlb.ac.acxk.net'+(scope.row.Ico).split('|')[1]" />
							</template>
						</el-table-column>
						<el-table-column prop="ChargeUserNo" label="学号" min-width="140"></el-table-column>
						<el-table-column prop="Reason" label="状态" min-width="100">
							<template slot-scope="scope">
								<!-- {{ scope.row.isAgree==null?'待审核':(scope.row.isAgree==true?'审核通过':'审核未通过') }} -->
								<span>
									<a-tag color="orange">{{ ActivityStateList.filter(data => data.Key== scope.row.State).length>0?ActivityStateList.filter(data => data.Key== scope.row.State)[0].Value:'暂无' }}</a-tag>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="AddTime" label="活动时间" min-width="120">
							<template slot-scope="scope">
								<div>始：{{scope.row.StartTime}}</div>
								<div>终：{{scope.row.EndTime}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="IsEnable" label="操作">
							<template slot-scope="scope">
								<i title="查看" class="iconfont icon-chakan" style="color: #1890FF;" @click="detailActivity(scope.row)"></i>
								<i title="修改" class="iconfont icon-editor1" v-if="scope.row.State == 1" style="color: #1890FF;" @click="updateActivity(scope.row,3)"></i>
								<i title="提交审批" class="iconfont icon-tijiao" v-if="scope.row.State == 1" style="color: #1890FF;" @click="sumbitapply(scope.row,'manage')"></i>
								<!-- <i title="申请完结" class="iconfont icon-wanjie" v-if="scope.row.State == 3&&Date.parse(scope.row.EndTime.replace(/-/g,'/')) <Date.parse(new Date())" style="color: #1890FF;" @click="sumbitapplyend(scope.row,'manage')"></i> -->
								<i title="删除" class="iconfont icon-delete1" v-if="scope.row.State == 1" style="color: red;" @click="applydelete(scope.row)"></i>
							</template>
						</el-table-column>
					</el-table>
				</a-tab-pane>
			</a-tabs>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
			 :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total"></el-pagination>
		</div>
		<addActivity v-if="showModal" :ClubID="ClubID" :text="text" @closeFun="closeFun(1)"></addActivity>
		<detailActivity v-if="detailshowModal" :ClubID="ClubID" :text="text" @closeFun="closeFun(1)"></detailActivity>
		<!-- <updateActivity style="z-index: 999;" v-if="updateshowModal" :ClubID="ClubID" :text="text" @closeFun="closeFun(1)"></updateActivity> -->
	</div>
</template>

<script>
	import addActivity from './addActivity.vue'
	import detailActivity from './detailActivity.vue'
	// import updateActivity from './updateActivity.vue'
	import Func from '@/utils/func';
	import {
		GetActivityPageList,
		GetApplyActivityPageList,
		GetManageActivityPageList,
		GetJoinActivityPageList,
		UserSubmitActivity,
		GetFormList,
		UserdeleteActivity,
		GetActivityStateList,
		UserDoSubmitEndActivity,
		UserGetClubDetail
	} from '@/api/follow';
	import applyJoin from '@/components/Apply'
	import Cache from '@/utils/cache'
	const data = [];
	const admindata = [];
	const joindata = [];
	export default {
		components: {
			addActivity,
			detailActivity,
			// updateActivity
		},
		// filters: {
		// 	testno(value) {
		// 		let str = value.toString()
		// 		return `${str.substring(0,2)}**${str.substring(str.length-2)}`
		// 	},
		// 	testname(value) {
		// 		let str = value.toString()
		// 		if (str.length < 3) {
		// 			return `${str.substring(0,1)}**`
		// 		} else {
		// 			return `${str.substring(0,1)}*${str.substring(str.length-1)}`
		// 		}
		// 	}
		// },
		props: {
			text: Object,
			type: Number
		},
		data() {
			return {
				data,
				admindata,
				joindata,
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
				showModal: false,
				updateshowModal: false,
				detailshowModal: false,
				ClubID: this.$route.query.ID,
				State: this.$route.query.State,
				ActivityStateList: [],
				ChairmanNo:'',
				thisChairmanNo:Cache.get('myInfo').UserNo,
				showbutton:false
			};
		},
		computed: {},
		created() {
			this.getList();
			this.ActivityState()
			this.State=this.$route.query.State
		},
		mounted() {},
		methods: {
			async ActivityState() {
				let res = await GetActivityStateList();
				this.ActivityStateList = res.data.data
				// let data={}
				// data.id=this.$route.query.ID
				// let res3 =await UserGetClubDetail(data)
				// this.managerPower = res3.data.managerPower
				// this.ChairmanNo=res3.data.data.ChairmanNo
				// if(this.managerPower!=null){
				// 	if(this.managerPower.IsAgreeApplyActivity==true){
				// 		this.showbutton=true
				// 	}else{
				// 		this.showbutton=false
				// 	}
				// }else{
				// 	this.showbutton=false
				// }
			},
			applydelete(text) {
				// this.visible = true
				// this.deletelist = text
				let that = this
				this.$confirm({
					title: '提示',
					content: `您确定删除该申请吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await UserdeleteActivity(data);
						if (res.data.code == 0) {
							that.getList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			sumbitapplyend(text){
				let that = this
				this.$confirm({
					title: '提示',
					content: `您确定提交完结审批吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await UserDoSubmitEndActivity(data);
						if (res.data.code == 0) {
							that.getList()
							that.$message.success(res.data.msg)
						} else {
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			sumbitapply(text) {
				let that = this
				this.$confirm({
					title: '提示',
					content: `您确定提交活动审批吗？`,
					okText: '确认',
					cancelText: '取消',
					async onOk() {
						let data = {}
						data.id = text.ID
						let res = await UserSubmitActivity(data);
						if (res.data.code == 0) {
							that.getList()
							that.$message.success(res.data.msg)
						} else {
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
				let res = await GetApplyActivityPageList(data);
				let res1 = await GetManageActivityPageList(data);
				let res2 = await GetJoinActivityPageList(data);
				this.loading = false;
				this.data = res.data.data;
				this.admindata = res1.data.data;
				this.joindata = res2.data.data;
				if (key == 2) {
					const pagination = { ...this.pagination
					};
					pagination.total = res1.data.pageInfo.TotalItemCount;
					this.pagination = pagination;
				} else if (key == 3) {
					const pagination = { ...this.pagination
					};
					pagination.total = res2.data.pageInfo.TotalItemCount;
					this.pagination = pagination;
				} else {
					const pagination = { ...this.pagination
					};
					pagination.total = res.data.pageInfo.TotalItemCount;
					this.pagination = pagination;
				}

			},
			addActivity(t, type) {
				this.type = type
				this.showModal = !this.showModal;
			},
			updateActivity(t){
				this.$router.push({
					name: 'UserUpdateActivity',
					query: {
						ID: t.ID
					}
				});
			},
			detailActivity(t) {
				this.text = t
				this.detailshowModal = !this.detailshowModal;
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
