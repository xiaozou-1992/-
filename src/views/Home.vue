<template>
  <div class="main">
    <a-row :gutter="[16, 16]" style="margin:0px;">
      <!-- <h2 class="title">欢迎使用安徽财经大学后勤教室借用系统</h2> -->
    </a-row>
  </div>
</template>

<script>
	import {
		comm
	} from '@/api/comm'
	import Cache from '@/utils/cache'
	import {
		GetUserAuthorityList
	} from '@/api/follow'
	export default {
		data() {
			return {
				menuListSub: []
			}
		},
		computed: {},
		async beforeCreate() {
			let res = await GetUserAuthorityList()
			Cache.set('menuListSub', res.data.data)
		},
		created() {
			if (!Cache.get('SYS_TOKEN')) {
				let token = decodeURIComponent(comm('userToken').userToken)
				Cache.set('SYS_TOKEN', token)
			}
		},
		methods: {
			menu(s) {
				this.$router.push({
					name: s
				})
			}
		}
	}
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
		padding: 0;
		min-height: calc(~'100% - 12px');
		width: 100%;
		margin-left:18px;
		background: url('../assets/newbg2.png') no-repeat;
		background-size:cover;
		.title {
			background-color: rgba(255,255,255,.6);
			padding: 90px 0;
			text-align: center;
			font-weight: 600;
			font-size: 36px;
			margin-bottom: 0px;
			color: firebrick;
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
			white-space: nowrap;
			/*强制在一行显示*/
			text-overflow: ellipsis;
			/*设置超出内容显示...*/
			overflow: hidden;

			/*一定不能少 超出的内容进行隐藏*/
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
