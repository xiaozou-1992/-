const requestUrl = 'http://192.168.2.112:8034/'
const pageSizeOptions = ["10", "50", "100"]
const pageSize = 10
const ChannelList = [{
		ID: 1,
		Name: '团购'
	},
	{
		ID: 2,
		Name: '餐饮',
		Label: '可选填其他费用项'
	},
	{
		ID: 3,
		Name: '流通'
	}
]
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
	ChannelList,
	outStorageTypeList,
	collectionlist,
	TeacherTypeList,
	requestUrl
}
