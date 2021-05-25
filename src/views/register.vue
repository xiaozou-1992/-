<template>
  <div class="bg" v-loading="loading">
    <div class="bak" style="position:relative;">
      <div class="case" v-if="false">
        <div class="trao"><p>用户登录</p></div>
        <div class="line"></div>
        <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
          <div>
            <a-form-item>
              <a-input v-decorator="['userNo', { rules: [{ required: true, message: '此功能测试所有，请勿登录!' }] }]" placeholder="此功能测试所有，请勿登录!">
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25) margin-top: 20px margin-left: 20px;" />
              </a-input>
            </a-form-item>
          </div>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="btn">
              登录
              <!-- {{ $store.state.token }} -->
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="gif" v-if="false">
      <span>
        技术支持：
        <img src="@/assets/6 (3).png" alt="" />
      </span>
    </div>
  </div>
</template>

<script>
import { DoLogin, GetUserInfo } from '@/api/follow'
import { mapState, mapMutations } from 'vuex'
import Cache from '@/utils/cache'
export default {
	data() {
		return {
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			userShow: true,
			actice: 0,
			sendtext: '发送验证码',
			Phone: '',
			loading: false
		}
	},
	created() {
		this.autoLogin()
	},
	computed: {
		...mapState(['token'])
	},
	methods: {
		...mapMutations(['SET_TOKEN']),
		autoLogin() {
			let that = this
			let hrefUrl = window.location.href
			let ticket = ''
			if (hrefUrl.indexOf('=') > -1) {
				ticket = decodeURIComponent(hrefUrl.split('=')[1])
				Cache.set('token', ticket)
				this.SET_TOKEN(ticket)
				Cache.set('SYS_TOKEN', ticket)
				setTimeout(async function() {
					let res1 = await GetUserInfo()
					Cache.set('myInfo', res1.data)
					Cache.set('loginKey', 1)
					that.$router.push({
						name: 'index'
					})
				}, 300)
			} else {
				 window.location.href = 'http://api.jjx.hq.acxk.net/Home/Login'
			}
		},
		cheak(index) {
			if (index == 0) {
				this.userShow = true
				this.actice = 0
			} else {
				this.userShow = false
				this.actice = 1
			}
		},
		handleSubmit(e) {
			let that = this
			e.preventDefault()
			this.form.validateFields(async (err, values) => {
				if (!err) {
					this.loading = !this.loading
					let data = values
					let res = await DoLogin(data)
					if (res.data.code == 0) {
						this.$message.success(res.data.msg)
						Cache.set('token', res.data.ticket)
						this.SET_TOKEN(res.data.ticket)
						Cache.set('SYS_TOKEN', res.data.ticket)
						setTimeout(async function() {
							let res1 = await GetUserInfo()
							Cache.set('myInfo', res1.data)
							Cache.set('loginKey', 1)
							that.$router.push({
								name: 'index'
							})
						}, 300)
					} else {
						this.$message.error(res.data.msg)
					}
					this.loading = !this.loading
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.bg {
	position: fixed;
	background: url('../assets/newbg2.png') no-repeat;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-size:cover;
}
.bak {
	width: 100%;
}
.bak img {
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
	object-fit: cover;
}

.gif {
	display: flex;
	flex-direction: column;
	margin: 25px 0 15px 0;
}

.gif p {
	align-self: center;
	margin-bottom: 6px;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: rgba(102, 102, 102, 1);
}

.gif span {
	align-self: center;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: rgba(102, 102, 102, 1);
}

.case {
	position: absolute;
	z-index: 2;
	left: 50%;
	top: 300px;
	width: 280px;
	margin-left: -140px;
	// height: 280px;
	background: #ffffff;
	border-radius: 7px;
	padding: 0 20px;
}

.trao {
	width: 100%;
	font-size: 18px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
	overflow: hidden;
	margin: 20px auto;
	p {
		width: 100%;
		height: 40px;
		line-height: 40px;
		float: left;
		text-align: center;
		margin: 0;
	}
	.actice {
		border-bottom: 1px solid #1890ff;
	}
}

.line {
	width: 100%;
	border-top: 1px solid #f2f2f2;
	margin-bottom: 20px;
}

/deep/.ant-form-item-children {
	display: flex;
	.con-left {
		flex: 1;
	}
	.con-right {
		width: 80px;
		margin-left: 10px;
		background: #1890ff;
		text-align: center;
		color: #fff;
		border-radius: 6px;
		height: 32px;
		line-height: 32px;
	}
}
.btn {
	margin: 0 auto;
}
</style>
