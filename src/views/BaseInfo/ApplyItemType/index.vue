<template>
	<div>
		<div class="h2">积分申请类型管理</div>
		<div id="components-form-demo-advanced-search">
			<a-form class="ant-advanced-search-form home-form" :form="form" @submit="handleSearch">
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="关键字"><a-input class="field-right" placeholder="请输入关键字搜索" v-decorator="[`key`]" /></a-form-item>
					</a-col>
					<a-col :span="8" style="margin-top:4px;">
						<a-button type="primary" html-type="submit" class="btn1">搜索</a-button>
						<a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="btn2">重置</a-button>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<div class="option">
			<a-button type="primary" class="btn" @click="addList(0)">新增申请类型</a-button>
			<a-button type="primary" class="btn" @click="addList(1)">新增申请项</a-button>
			<!-- <a-button type="primary" class="btn" @click="applyItem">申请项管理</a-button> -->
		</div>
		<div>
			<el-table :data="data" style="width: 100%;margin-bottom: 20px;" row-key="ID" border default-expand-all highlight-current-row @row-click="rowClick" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
				<el-table-column prop="Name" label="名称" min-width="360"></el-table-column>
				<el-table-column prop="TypeName" label="类型" min-width="120"></el-table-column>
				<el-table-column prop="Score" label="分值" min-width="100">
					<template slot-scope="scope">
						<a-tag color="green" v-if="scope.row.Score">{{ scope.row.Score }}</a-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="100" fixed="right">
					<template slot-scope="scope">
						<i title="修改" class="iconfont icon-editor1" style="color: #1890FF;" @click="modifyList(scope.row, 'modify')"></i>
						<i title="删除" class="iconfont icon-delete" style="color: red;" @click="deleteList(scope.row)"></i>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<add :text="text" :ParentList="ParentList" v-show="addIf" @closeFun="closeFun"></add>
		<addNode :text="text" v-show="addNodeIf" @closeFun="closeFun"></addNode>
	</div>
</template>


<script>
import add from './add';
import addNode from './addNode';
import Func from '@/utils/func';
import { GetApplyItemTypeListManage, DeleteApplyItemType,GetApplyItemNodeListManage,DeleteApplyItemNode } from '@/api/follow';
const data = [];
export default {
	components: {
		add,
		addNode
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
			addNodeIf:false,
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
			ParentList: [],
			clickItem:{}
		};
	},
	computed: {},
	created() {
		this.getList();
	},
	mounted() {},
	methods: {
		rowClick(row, column, event){
			console.log(row)
			this.clickItem = row
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
			this.data = [];
			this.loading = true;
			let data = {};
			if (this.values) {
				data = this.values;
			}
			let arr1=[],arr2=[],arr3=[],arr4=[]
			let res = await GetApplyItemTypeListManage(data);
			this.ParentList = res.data.data
			arr1 = res.data.data
			let res1 = await GetApplyItemNodeListManage(data);
			arr2 = res1.data.data
			arr2.map((value, index, arry) => {
			  arr3.push({
			    'ID': value.ID,
			    'Name': value.Name,
			    'Score': value.Score,
			    'ParentID': value.TypeID,
					'TypeID': value.TypeID,
			    'TypeName': value.TypeName
			  })
			})
			arr4 = arr1.concat(arr3)
			this.data = this.toTree(arr4);
			this.loading = false;
		},
		toTree(data) {
			let result = [];
			let map = {};
			if (!Array.isArray(data)) {
				//验证data是不是数组类型
				return [];
			}
			data.forEach(item => {
				//建立每个数组元素id和该对象的关系
				map[item.ID] = item; //这里可以理解为浅拷贝，共享引用
			});
			data.forEach(item => {
				let parent = map[item.ParentID]; //找到data中每一项item的爸爸
				if (parent) {
					//说明元素有爸爸，把元素放在爸爸的children下面
					(parent.children || (parent.children = [])).push(item);
				} else {
					//说明元素没有爸爸，是根节点，把节点push到最终结果中
					result.push(item); //item是对象的引用
				}
			});
			return result; //数组里的对象和data是共享的
		},
		addList(type) {
			if(type==0){
				this.text = {};
				this.addIf = !this.addIf;
			}else{
				this.text = {};
				this.addNodeIf = !this.addNodeIf;
			}
		},
		applyItem(){
			let path = ''
			path='ApplyItemNode'
			this.$router.push({
				name: path,
				// query: {
				// 	ID: text.ID
				// }
			});
		},
		modifyList(text) {
			if(text.TypeID){
				text = Object.assign(text, { time: new Date() });
				this.addNodeIf = !this.addNodeIf;
				this.text = text;
			}else{
				text = Object.assign(text, { time: new Date() });
				this.addIf = !this.addIf;
				this.text = text;
			}
		},
		deleteList(text) {
			let that = this;
			this.$confirm({
				title: '提示',
				content: text.Score?`您确定删除该申请项吗？`:`您确定删除该申请类型吗？`,
				okText: '确认',
				cancelText: '取消',
				async onOk() {
					let data = {};
					data.id = text.ID;
					let res = text.Score?await DeleteApplyItemNode(data):await DeleteApplyItemType(data);
					if (res.data.code == 0) {
						that.getList();
						that.$message.success(res.data.msg);
					} else {
						that.$message.error(res.data.msg);
					}
				}
			});
		},
		handleCancel(e) {
			this.visible = false;
		},
		closeFun() {
			this.addIf = false;
			this.addNodeIf = false
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
