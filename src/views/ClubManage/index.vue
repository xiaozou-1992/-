<template>
	<div>
		<div class="h2">俱乐部管理</div>
		<div id="components-form-demo-advanced-search">
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字"><a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" /></a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="类型">
							<a-select :allowClear="true" v-decorator="['typeID']" placeholder="全部" optionFilterProp="children" showSearch>
								<a-select-option v-for="(item, index) in TypeIDList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="项目">
							<a-select :allowClear="true" v-decorator="['projectID']" placeholder="全部" optionFilterProp="children" showSearch>
								<a-select-option v-for="(item, index) in ProjectIDList" :key="index" :value="item.ID">{{ item.Name }}</a-select-option>
							</a-select>
						</a-form-item>
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
				<el-table-column prop="Name" label="状态/名称" min-width="180" fixed="left">
					<template slot-scope="scope">
						<a-tag :color="scope.row.IsEnable ? 'red' : 'pink'">{{ scope.row.IsEnable ? '启用' : '停用' }}</a-tag>
						{{ scope.row.Name }}
					</template>
				</el-table-column>
				<el-table-column prop="Ico" label="图标" min-width="100">
					<template slot-scope="scope">
						<img style="width:60px;" :src="scope.row.Ico" />
					</template>
				</el-table-column>
				<el-table-column prop="TypeName" label="项目/类型" min-width="180">
					<template slot-scope="scope">
						<a-tag color="green">{{ scope.row.PorjectName }}</a-tag>
						{{ scope.row.TypeName }}
					</template>
				</el-table-column>
				<el-table-column prop="DpeartName" label="所属部门" min-width="200"></el-table-column>
				<el-table-column prop="ChairmanNo" label="学院俱乐部负责人" min-width="160">
					<template slot-scope="scope">
						<a-tag color="blue">{{ scope.row.ChairmanNo }}</a-tag>
						{{ scope.row.CairmanName }}
					</template>
				</el-table-column>
				<el-table-column prop="CollegeExamUserNo" label="院级审批人" min-width="160">
					<template slot-scope="scope">
						<a-tag color="blue">{{ scope.row.CollegeExamUserNo }}</a-tag>
						{{ scope.row.CollegeExamUserName }}
					</template>
				</el-table-column>
				<el-table-column prop="SchoolExamUserNo" label="俱乐部中心审批" min-width="160">
					<template slot-scope="scope">
						<a-tag color="blue">{{ scope.row.SchoolExamUserNo }}</a-tag>
						{{ scope.row.SchoolExamUserName }}
					</template>
				</el-table-column>
				<el-table-column prop="Desc" label="描述" min-width="80" show-overflow-tooltip=""></el-table-column>
				<el-table-column label="操作" width="190" fixed="right">
					<template slot-scope="scope">
						<i title="修改" class="iconfont icon-editor1" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
						<i title="停用/启用" class="iconfont icon-kidslock" style="color: green;" @click="enableList(scope.row)"></i>
						<i title="删除" class="iconfont icon-delete" style="color: red;" @click="deleteList(scope.row)"></i>
						<!-- <i title="管理者" class="iconfont icon-guanliyuan1" style="color: #1890FF;" @click="seeList(scope.row,'manage')"></i> -->
						<i title="老师" class="iconfont icon-laoshi" style="color: green;" @click="seeList(scope.row,'teacher')"></i>
						<i title="成员" class="iconfont icon-chengyuan" style="color: red;" @click="seeList(scope.row,'user')"></i>
						<i title="公告" class="iconfont icon-gonggao" style="color: #1890FF;" @click="seeList(scope.row,'notice')"></i>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pagination.currentPage"
				:page-sizes="pagination.pageSizeOptions"
				:page-size="pagination.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pagination.total"
			></el-pagination>
		</div>
		<add :text="text" :DepartCodeList="DepartCodeList" :TypeIDList="TypeIDList" :ProjectIDList="ProjectIDList" v-show="addIf" @closeFun="closeFun"></add>
		<!-- <a-upload :file-list="fileList" :before-upload="beforeUpload" @change="handleChange" >
		      <a-button> <a-icon type="upload" /> Select File </a-button>
		    </a-upload> -->
	</div>
</template>

<script>
	function getBase64(img, callback) {
	  const reader = new FileReader();
	  reader.addEventListener('load', () => callback(reader.result));
	  reader.readAsDataURL(img);
	}
import add from './add';
import Func from '@/utils/func';
import { getClubPageList, DeleteClub,EnableClub,GetClubTypeList,GetClubProjectList,GetDepartList ,UserDoUpdateBase64Image,UserDoSetHeadImage} from '@/api/follow';
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
				pageIndex: 2,
				pageSize: 20
			},
			tableHeight: parseFloat(window.innerHeight - 160),
			TypeIDList:[],
			DepartCodeList:[],
			ProjectIDList:[],
			fileList:[]
		};
	},
	computed: {},
	created() {
		this.getList();
		this.getOtherList()
	},
	mounted() {},
	methods: {
		beforeUpload(file) {
			console.log(file)
		      this.fileList = [...this.fileList, file];
		    },
		async handleChange(info) {
		      console.log(info)
					if(info.file.originFileObj){
						getBase64(info.file.originFileObj, imageUrl => {
						  this.imageUrl = imageUrl;
						  console.log(this.imageUrl)
							let data={}
							data.data = this.imageUrl.substr(22)
							Promise.resolve(UserDoUpdateBase64Image(data)).then((v) => {
							  let data1={}
								data1.headImage = v.data.url
								Promise.resolve(UserDoSetHeadImage(data1)).then((m) => {
								  console.log(m.data)
								})
								
							})
						});
					}else{
						return false
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
			let res = await getClubPageList(data);
			this.loading = false;
			this.data = res.data.data;
			const pagination = { ...this.pagination };
			pagination.total = res.data.pageInfo.TotalItemCount;
			this.pagination = pagination;
		},
		async getOtherList(){
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
			text = Object.assign(text, { time: new Date() });
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
					if(res.data.code==0){
						that.getList()
						that.$message.success(res.data.msg)
					}else{
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
					if(res.data.code==0){
						that.getList()
						that.$message.success(res.data.msg)
					}else{
						that.$message.error(res.data.msg)
					}
				}
			});
		},
		seeList(text,name){
			let path = ''
			if(name == 'teacher'){
				path='ClubTeacher'
			}else if(name=='manage'){
				path='ClubManagerList'
			}else if(name=='notice'){
				path='ANoticeJoin'
			}else{
				path='ClubMember'
			}
			this.$router.push({
				name: path,
				query: {
					ID: text.ID,
					Name:text.Name
				}
			});
		},
		closeFun() {
			this.addIf = false;
			this.getList()
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
