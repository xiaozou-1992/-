const requestUrl = 'http://192.168.2.118:8034/'
const pageSizeOptions = ["30", "50", "100", "200", "500"]
const pageSize = 30
const JCList = [1,10]
const outStorageTypeList = [{
		ID: 1,
		label: "正常入库"
	},
	{
		ID: 4,
		label: "调仓入库"
	},
	{
		ID: 6,
		label: "退货入库"
	}
]
const collectionlist = [{
	ID: '1',
	label: '现金收款'
}, {
	ID: '2',
	label: '账期收款'
}, {
	ID: '3',
	label: '银行转账'
}]
const TeacherTypeList = [{
	"Key": 1,
	"Value": "普通教师"
}, {
	"Key": 2,
	"Value": "实习助教"
}]
const fileTypeList = [{
	"Key": 1,
	"Value": "单行文本"
}, {
	"Key": 2,
	"Value": "多行文本"
}, {
	"Key": 3,
	"Value": "整数"
}, {
	"Key": 4,
	"Value": "小数"
}, {
	"Key": 5,
	"Value": "文件"
}, {
	"Key": 6,
	"Value": "图片"
}, {
	"Key": 7,
	"Value": "日期"
}, {
	"Key": 8,
	"Value": "时间"
}]
export default {
	pageSizeOptions,
	pageSize,
	JCList,
	outStorageTypeList,
	collectionlist,
	TeacherTypeList,
	requestUrl
}
