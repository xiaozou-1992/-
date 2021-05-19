<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <!-- <keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive> -->
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>
<script>
	import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

	export default {
		data() {
			return {
				columns: '',
				locale: zhCN
			}
		}
	}
</script>
<style>
	.el-tooltip__popper {
		max-width: 300px;
	}

	.ant-col-8 .ant-form-item-label {
		width: 70px !important;
	}

	.ant-popover-inner-content {
		display: none !important;
	}

	.ant-popover-title {
		background-color: rgba(0, 0, 0, 1);
		color: #fff !important;
		border-radius: 5px;
		min-width: 40px !important;
	}

	.ant-popover-arrow {
		border-color: rgba(0, 0, 0, 1) !important;
	}
</style>
<style lang="scss" scoped>
	#app {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
		background-color: #f6f6f6;

		.el-dialog {
			border-radius: 4px;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

			.el-dialog__header {
				border-bottom: 1px solid #e8e8e8;
				padding: 16px 24px;
			}

			.el-dialog__title {
				font-size: 16px;
				color: rgba(0, 0, 0, 0.85);
				font-weight: 500;
				line-height: 22px;
			}

			.el-dialog__footer {
				padding: 10px 16px;
				border-top: 1px solid #e8e8e8;
			}
		}
	}
</style>
