<template>
	<div class="main">
		<a-row :gutter="[16, 16]" style="margin:0px;">
			<h2 class="title">&nbsp;</h2>
		</a-row>
	</div>
</template>

<script>
// import AMap from 'AMap'
import { getTokenToUser, GetTipsList, doGetMenu } from '@/api/follow';
import Cache from '@/utils/cache';
export default {
	data() {
		return {
			detail: {},
			menuList: [],
			list: [],
			colorList: [
				'#125cf3',
				'#4ccab7',
				'#4e8cee',
				'#12cfd1',
				'#949dff',
				'#bb9af5',
				'#705dff',
				'#40a3ff',
				'#7fc972',
				'#0dc3de',
				'#bcd62e',
				'#78b6ef',
				'#80bb19',
				'#804fd7',
				'#f573a6',
				'#f5a526',
				'#0dc79f',
				'#b844b2',
				'#1819b8',
				'#ff988e',
				'#f28a9f',
				'#6b2dc2'
			],
			tableData: [],
			pagination: {
				currentPage: 1,
				pageSize: this.global.pageSize,
				pageSizeOptions: this.global.pageSizeOptions, //每页中显示的数据
				showTotal: total => `共有 ${total} 条数据` //分页中显示总的数据
			}
		};
	},
	computed: {},
	async created() {

	},
	async mounted() {
		// await this.GaodeMap()
	},
	methods: {
		handleSizeChange(val) {
			this.pagination.pageSize = val;
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
		},
		menuListFun(data) {
			for (let i = 0; i < data.length; i++) {
				if (data[i].children.length > 0) {
					this.list = this.list.concat(data[i].children);
				}
			}
		},
		iconFun(item) {
			switch (item) {
				case 'role':
					return 'iconfont icon-yonghuguanli';
					break;
				case 'Department':
					return 'iconfont icon-liuchengguanliqi';
					break;
				case 'Worker':
					return 'iconfont icon-zaixianyonghu';
					break;
				case 'Warehouse':
					return 'iconfont icon-cangkucunchu';
					break;
				case 'WarehouseStock':
					return 'iconfont icon-gonggongmokuai';
					break;
				case 'inStock':
					return 'iconfont icon-rukuguanli ';
					break;
				case 'getInStock':
					return 'iconfont icon-wenben';
					break;
				case 'outStock':
					return 'iconfont icon-chukuguanli';
					break;
				case 'getOutStock':
					return 'iconfont icon-wenben';
					break;
				case 'salePrice':
					return 'iconfont icon-shujuguanli';
					break;
				case 'product':
					return 'iconfont icon-face';
					break;
				case 'cashDesktop':
					return 'iconfont icon-jiemianfangan';
					break;
				case 'seleOrder':
					return 'iconfont icon-shujuguanli';
					break;
				case 'getSaleValue':
					return 'iconfont icon-jiaoyirizhi';
					break;
				case 'gGetProfitValue':
					return 'iconfont icon-wenben';
					break;
				case 'Survey':
					return 'iconfont icon-mubiaoguanli';
					break;
				case 'Visit':
					return 'iconfont icon-jishitongxun';
					break;
				case 'SurveyReport':
					return 'iconfont icon-changguishujutongji';
					break;
				case 'VisitDealer':
					return 'iconfont icon-wodeweituo';
					break;
				case 'WinePresentation':
					return 'iconfont icon-jiubeihongjiu';
					break;
				case 'WeddingBanquet':
					return 'iconfont icon-haofangtuo400iconfont2meishi';
					break;
				case 'Judge':
					return 'iconfont icon-huiyiguanli';
					break;
				case 'GetPageList':
					return 'iconfont icon-zaixianyonghu';
					break;
				default:
					return 'iconfont icon-evitarehighway';
					break;
			}
		},
		menu(s) {
			this.$router.push({
				name: s
			});
		},
		radomColor() {
			//    let r = Math.floor(Math.random()*255);
			//    let g = Math.floor(Math.random()*255);
			//    let b = Math.floor(Math.random()*255);
			// return 'rgba('+ r +','+ g +','+ b +',0.8)'

			let i = Math.floor(Math.random() * 21 + 1);
			return this.colorList[i];
		},
		GaodeMap() {
			var map = new AMap.Map('all-map', {
				center: [116.397428, 39.90923], // [纬度，经度]
				resizeEnable: true,
				zoom: 10
			});
			AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
				map.addControl(new AMap.ToolBar());
				map.addControl(new AMap.Scale());
			});
		},
		async _getTokenToUser() {
			let res = await getTokenToUser();
			this.detail = res.data.data;
			Cache.set('info', res.data.data);
			// Cache.set('DealerID', res.data.data.DealerID)
			// Cache.set('DealerName', res.data.data.DealerName)
			Cache.set('Type', 3);
		}
	}
};
</script>

<style lang="less" scoped>
/deep/#weather-view-he {
	width: 90% !important;
	margin: 0 5% !important;
}

.map {
	width: 600px;
	height: 600px;
}
.main {
	padding: 14px;
	min-height: calc(~'100% + 28px');
	width: 100%;
	margin-left: 15px;
	background: #4568d5;
	.title {
		background: url(../assets/title.png) no-repeat center;
		text-align: center;
		line-height: 40px;
		margin: 20px auto;
	}
}
/deep/.weight {
	font-weight: 600;
	color: #f00;
}
.main-con {
	background: #fff;
	border: 0.1em solid rgb(213, 213, 213);
	padding: 10px;
	border-radius: 5px;

	.list {
		display: flex;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #ccc;

		.tit {
			width: 70px;
			text-align: right;
			margin-right: 10px;
		}

		.cell {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.main-btn {
		float: left;
		width: 23%;
		// padding-bottom:23%;
		// height:0;
		// background:#ccc;
		text-align: center;
		line-height: 40px;
		margin: 10px 1%;
		border-radius: 5px;
		color: #fff;
		cursor: pointer;
		white-space: nowrap; /*强制在一行显示*/
		text-overflow: ellipsis; /*设置超出内容显示...*/
		overflow: hidden; /*一定不能少 超出的内容进行隐藏*/
		&:hover {
			transform: scale(1.05);
		}
	}
}
.main-con-warning {
	overflow-y: scroll;
}
.foot {
	text-align: center;
	margin-top: 100px;
}
</style>
