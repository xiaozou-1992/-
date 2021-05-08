<template>
	<div class="all"  v-loading="loading">
		<div id="components-form-demo-advanced-search">
			<div class="h2">活动签到管理</div>
			<div class="head">
				<!-- <p>搜索条件</p> -->
			</div>
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
							<a-col :span="8">
								<a-form-item label="状态">
									<a-select :allowClear="true" @click="qingqiu" v-decorator="['type']" placeholder="全部" optionFilterProp="children" >
										<a-select-option v-for="(item, index) in TypeList" :key="index" :value="item.Key">{{ item.Value }}</a-select-option>
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
			<a-button type="primary" class="btn" @click="addList">新增</a-button>
		</div>
		<div>
			<el-table ref="singleTable" :data="data" border highlight-current-row style="width: 100%">
				<el-table-column prop="AddUserName" label="姓名" min-width="100" fixed="left">
					<template slot-scope="scope">
						{{ scope.row.AddUserName | testname }}
					</template>
				</el-table-column>
				<el-table-column prop="AddUserNo" label="编号" min-width="100" >
					<template slot-scope="scope">
						{{ scope.row.AddUserNo | testno }}
					</template>
				</el-table-column>
				<el-table-column prop="TypeName" label="类型" min-width="120"></el-table-column>
				<el-table-column prop="IsManager" label="职责" min-width="50">
					<template slot-scope="scope">
						<!-- {{ scope.row.IsManager==true?'管理员':'成员' }} -->
						<a-tag color="pink" v-if="scope.row.IsManager==true"> 管理员 </a-tag>
						<a-tag color="green" v-else> 成员 </a-tag> 
					</template>
				</el-table-column>
				<el-table-column prop="SignNum" label="签到人数" min-width="100">
					<template slot-scope="scope">
						<div>已签到人数：<a-tag class="tagcursor" color="green" @click="SignNumDetail(scope.row)"> {{ scope.row.SignNum }}</a-tag></div>
						<div>未签到人数：<a-tag class="tagcursor" color="red" @click="NoSignNumDetail(scope.row)"> {{ scope.row.NoSignNum }} </a-tag></div>
						</template>
				</el-table-column>
				<el-table-column prop="AddTime" label="时间" min-width="100">
					<template slot-scope="scope">
						<div>始：{{ scope.row.StartTime }}</div>
						<div>终：{{ scope.row.EndTime }}</div>
						</template>
				</el-table-column>
				<el-table-column prop="IsEnable" label="操作" min-width="100" fixed="right">
					<template slot-scope="scope">
						<i title="查看" v-if="!scope.row.IsManager" class="iconfont icon-chakan" style="color: #1890FF;" @click="look(scope.row)"></i>
						<i title="修改" v-if="ChairmanNo == UserInfo.UserNo" class="iconfont icon-editor1" style="color: #1890FF;"
						 @click="detail(scope.row)"></i>
						 <i title="二维码"  class="iconfont icon-two-dimensional-code" style="color: green;"
						  @click="codeimg(scope.row)"></i>
						 <i title="删除" v-if="!scope.row.IsManager" class="iconfont icon-delete1" style="color: red;" @click="deletemember(scope.row)"></i>
					</template>
				</el-table-column>
			</el-table>
			<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
			 :page-sizes="pagination.pageSizeOptions" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pagination.total"></el-pagination> -->
		</div>
		<add :text="text"  :ID="ID"  v-show="addIf" @closeFun="closeFun"></add>
		<imgcode :codeID="codeID" :time="time" v-show="codeIf" @closeFun="closeFun"></imgcode>
		<detail :text="detailtext"  v-show="detailIf" @closeFun="closeFun"></detail>
	</div>
</template>

<script>
	import Func from '@/utils/func';
	import Cache from '@/utils/cache'
	import {
		UserActivitySignList,
		DeleteUserActivitySign,
		DoGetActivitySignTypeList
	} from '@/api/follow';
	import add from './AddActivitySign'
	import imgcode from './QRcode'
	import detail from './UserActivitySignDetail'
	const data = [];
	export default {
		components: {
			add,
			detail,
			imgcode
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
				TypeList:[]
			};
		},
		computed: {},
		created() {
			this.GetTypeList()
			this.getList();
		},
		mounted() {},
		methods: {
			NoSignNumDetail(row){
				this.$router.push({
					name: 'NoSignNumList',
					query: {
						ID: row.ID
					}
				})
			},
			SignNumDetail(row){
				this.$router.push({
					name: 'SignNumList',
					query: {
						ID: row.ID
					}
				})
			},
			qingqiu(){
				this.GetTypeList()
			},
			 codeimg(text){
				// let data={}
				// data.id=text.ID
				// let res= await GetUserActivitySignQRImage(data)
				this.time=new Date()
				this.codeID=text.ID
				this.codeIf=true
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
						let res = await DeleteUserActivitySign(data);
						if(res.data.code==0){
							that.getList()
							that.$message.success(res.data.msg)
						}else{
							that.$message.error(res.data.msg)
						}
					}
				})
			},
			detail(text) {
				this.text = text
				this.time=new Date()
				this.addIf = true
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
				data.activityID = this.$route.query.ID
				// data.type=1
				data.pageIndex = this.pagination.currentPage;
				data.pageSize = this.pagination.pageSize;
				let res = await UserActivitySignList(data);
				this.loading = false;
				this.data = res.data.data;
				// const pagination = { ...this.pagination
				// };
				// pagination.total = res.data.pageInfo.TotalItemCount;
				// this.pagination = pagination;
				let res1= await DoGetActivitySignTypeList()
				this.TypeList=res1.data.data
			},
			async GetTypeList(){
				let res ={}
				let data={}
				res = await DoGetActivitySignTypeList(data)
				this.TypeList=res.data.data
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
				this.addIf=false
				this.detailIf=false
				this.codeIf=false
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

	.tagcursor,i:hover {
		cursor: pointer;
	}
	
</style>
