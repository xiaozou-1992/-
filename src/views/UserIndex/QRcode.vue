<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				<span>活动签到二维码</span>
				<a-icon @click="closeFunction" :style="{ float: 'right', margin: '10px' }" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<img class="codeimg" :src="imgurl" alt="">
				<div style="margin-top: 10px;">倒计时结束后刷新</div>
			</div>
			<div class="djs">
				<p :class="[second < 10 && second > 0 ? 'large' : '', second == 0 ? 'zero' : '']">{{second < 10 ? '0' + second : second}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	import Cache from '@/utils/cache'
	import {
		GetUserActivitySignQRImage,
		UserDoGetQRexpireTime
	} from '@/api/follow'
	export default {
		props: {
			codeID: String,
			time: null
		},
		watch: {
			time: {
				handler(text) {
					this.id = this.codeID
					this.QRexpireTime()
					if (this.codeID) {
						this.getlist(this.codeID)
						this.GetConfirmState(this.codeID)
						this.sendCode()
					}
				},
				immediate: true
			},
		},
		data() {
			return {
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				imgurl: '',
				timer: '',
				id: '',
				second: 10,
				seconds:10,
				timer1: '',
				loading:false
			}
		},
		async created() {
			// await this.GetConfirmState()
		},
		mounted() {

		},
		methods: {
			sendCode(){
				 clearInterval(this.timer1);
				 this.second=this.seconds
			            this.loading1();  //启动定时器
			            this.timer1 = setInterval(() =>{
			                 //创建定时器
			                if(this.second === 0){
			                    this.clearTimer();  //关闭定时器
			                    // this.skipStep();
			                }else{
			                    this.loading1();
			                }
			            },1000);
			        },
			        loading1(){
			          //启动定时器
			          this.second--;  //定时器减1
			        },
			        clearTimer(){
			           //清除定时器
			           clearInterval(this.timer1);
			           // this.timer1 = null;
			        },
			getlist(id) {
				this.seconds=this.seconds
				let seconds=this.seconds*1000
				let that = this
				that.timer = setInterval(function() {
					that.GetConfirmState(id)
					that.sendCode()
					 that.second==that.seconds
				}, seconds)
			},
			async GetConfirmState(id) {
				let data = {}
				data.id = id
				data.headTicket = Cache.get('token')
				let res = await GetUserActivitySignQRImage(data)
				this.imgurl = 'data:image/png;base64,' + btoa(
					new Uint8Array(res.data)
					.reduce((data, byte) => data + String.fromCharCode(byte), '')
				);
			},
			async QRexpireTime() {
				let data = {}
				this.loading=true
				let res = await UserDoGetQRexpireTime(data)
				if(res.data.code==0){
					this.second=res.data.QRexpireTime
					this.seconds=res.data.QRexpireTime
					this.loading=false
				}
			},
			closeFunction() {
				// this.selecttype = 0
				this.worklist = []
				this.$emit('closeFun')
				clearInterval(this.timer);
				clearInterval(this.timer1);
			},
		},
		beforeDestroy() {
			clearInterval(this.timer);
			clearInterval(this.timer1);
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
		position: absolute;
		width: 300px;
		// height: 540px;
		height: 300px;
		background: #fff;
		left: 50%;
		margin-left: -200px;
		top: 50%;
		margin-top: -270px;
		overflow-y: hidden;
		.main {
			height: 250px;
			// overflow-y: scroll;
			text-align: center;
		}

		.codeimg {
			width: 150px;
			height: 150px;
			margin-top: 50px;
		}

		/deep/.ant-form-item {
			margin: 20px 50px;

			/deep/.ant-form-item-label {
				width: 100px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: right;
			}

			/deep/.ant-form-item-control-wrapper {
				flex: 1;
			}

			/deep/textarea {
				height: 140px;
			}
		}
	}

	.base p {
		padding: 10px 0 0 10px;
	}

	.subnav {
		margin-left: 60px;
		height: 46px;
		display: flex;
	}

	.subnav p {
		width: 100px;
		text-align: right;
	}

	.subnav input {
		width: 300px;
		height: 30px;
		border: 1px solid #dad9dc;
		margin-left: 20px;
	}

	.ant-form-item {
		margin-bottom: 10px;
	}

	.btn2 {
		display: -moz-box;
		-moz-box-pack: center;
		-moz-box-align: center;

		/* Safari、Opera 以及 Chrome */
		display: -webkit-box;
		-webkit-box-pack: center;
		-webkit-box-align: center;

		/* W3C */
		display: box;
		box-pack: center;
		box-align: center;
		width: 137px;
		height: 35px;
		border-radius: 3px;
		outline: none;
		border: none;
		margin: 20px auto;
		color: #fff;
	}

	.fixed-top {
		width: inherit;
		position: absolute;
		line-height: 30px;
		top: 0px;
		background-color: white;
		z-index: 999;
	}

	.fixed-bottom {
		width: 600px;
		left: -50px;
		bottom: 0px;
		position: absolute;
		background-color: white;
		z-index: 999;
	}

	/deep/.ant-form {
		margin-top: 50px;
		padding-bottom: 80px;
	}

	.djs {
		width: 100%;
		height: 50px;
		text-align: center;
	}

	.djs p {
		font-size: 16px;
		transition: all 1s ease;
		display: inline;
	}

	.djs p.large {
		animation: changeSize 1s infinite;
		-webkit-animation: changeSize 1s infinite;
		/* Safari 与 Chrome */
	}

	.djs p.zero {
		font-size: 22px;
	}

	@keyframes changeSize {
		0% {
			font-size: 16px;
		}

		50% {
			font-size: 22px;
		}

		100% {
			font-size: 16px;
		}
	}

	@-webkit-keyframes changeSize {
		0% {
			font-size: 16px;
		}

		50% {
			font-size: 22px;
		}

		100% {
			font-size: 16px;
		}
	}
</style>
