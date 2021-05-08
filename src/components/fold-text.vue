<template>
	<div class="wrap">
		<div :class="!btnFold ? 'inner over' : 'inner'" ref="divRef">
			<span class="content" ref="spanRef">{{ showContent }}</span>
		</div>
		<span class="btn" v-if="textOver" @click="btnFold = !btnFold">{{
      btnFold ? "收起 ∧" : "展开 ∨"
    }}</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				textOver: false, //文本是否超出3行
				btnFold: false, //按钮默认显示展开
			};
		},
		props: {
			showContent: {
				type: String,
				default: false,
			},
		},
		created() {},
		mounted() {
			this.$nextTick(() => {
				this.textOver =
					this.$refs.spanRef.offsetHeight > this.$refs.divRef.offsetHeight;
			});
		},
		methods: {},
	};
</script>

<style scoped>
	.wrap {
		/* padding-bottom: 30px; */
	}

	.over {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.btn {
		font-size: 14px;
		color: #06f;
		float: right;
		cursor: pointer;
		margin-top: 10px;
		width: 100%;
		text-align: right;
	}
</style>
