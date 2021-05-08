<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				审核记录
				<a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="con-main">
				<div>
					<template>
						<el-table　highlight-current-row :data="detailList" v-loading="loading" tooltip-effect="dark" border style="width: 100%">
							<el-table-column prop="status" label="状态">
								<template slot-scope="scope">
									{{ scope.row.StateValue }}
								</template>
							</el-table-column>
							<el-table-column prop="content" label="内容">
								<template slot-scope="scope">
									{{ (scope.row.IsDealer?scope.row.DealerContent:scope.row.Content) }}
								</template>
							</el-table-column>
							<el-table-column prop="name" label="审核人">
								<template slot-scope="scope">
									{{ scope.row.AddUserName }}
								</template>
							</el-table-column>
							<el-table-column prop="time" label="时间"> 
								<template slot-scope="scope">
									{{ scope.row.AddTime }}
								</template>
							</el-table-column>
						</el-table>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Func from '@/utils/func'
	import Cache from '@/utils/cache'
	import {
	} from '@/api/follow';
	export default {
		props: {
			detailList: Array,
		},
		components: {},
		data() {
			return {
				loading: false,
			};
		},
		computed: {

		},
		created() {
			
		},
		mounted() {

		},
		methods: {
			closeFunction() {
				this.$emit('closeFun')
			},
		}
	}
</script>

<style lang="less" scoped>
	.aid {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		top: 0px;
		left: 0px;
		z-index: 999;
	}

	.base {
		position: fixed;
		width: 80%;
		height: auto;
		max-height: 80%;
		background: #fff;
		left: 50%;
		top: 40%;
		transform: translate(-50%,-50%);
		padding: 10px;
		padding-bottom:50px;
		overflow-y: auto;
		overflow-x:hidden;
	}
	.fixed-top {
		height: 30px;
		line-height: 30px;
	}
	.con-main{
		height:90%;
		overflow-y:scroll;
		width:100%;
		overflow-x:hidden;
	}
	/deep/.ant-radio-button-wrapper{
		width:200px;
	}
	
	/deep/.el-table td,
	/deep/.el-table th {
		padding: 5px;
	}
	
	/deep/.el-table th.is-leaf {
		background: #fafafa;
	}

	/deep/.ant-form-item {
		display: flex;
		margin-bottom: 10px !important;

		/deep/.ant-form-item-label {
			width: 80px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-align: left;
		}

		/deep/.ant-form-item-control-wrapper {
			flex: 1;
		}
	}

	/deep/.ant-table-thead>tr>th,
	/deep/.ant-table-tbody>tr>td {
		padding: 5px;
	}
	

	/deep/.ant-table-body tr th:first-child {
		display: none;
	}

	/deep/.ant-table-body tr td:first-child {
		display: none;
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
		background: #1890FF;
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
</style>
