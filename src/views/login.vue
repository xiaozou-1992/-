<template>
  <div style="position: fixed;
        background: #F8F8F8;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        " v-loading="loading"
  >
    <div class="bak" style="position:relative;">

      <img src="@/assets/6 (1).jpg" alt="">
      <div class="case">
        <div class="trao">
          <p @click="cheak(0)" :class="{ actice:actice==0?true:false }">用户登录</p>
        </div>
        <div class="line"></div>
        <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
          <div>
            <a-form-item>
              <a-input v-decorator="[
                'userNo',
                { rules: [{ required: true, message: '请输入用户学号!' }] },
              ]" placeholder="用户学号"
              >
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
    <div class="gif">
      <span>技术支持： <img src="@/assets/6 (3).png" alt=""></span>
    </div>
  </div>
</template>

<script>
  import {
    DoLogin,
	sendCode,
	getTokenToUser,
	GetUserInfo
  } from '@/api/follow'
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

	},
	computed: {
		...mapState(['token'])
	},
    methods: {
		...mapMutations(['SET_TOKEN']),
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
        e.preventDefault()
        this.form.validateFields(async (err, values) => {
          if (!err) {
			  console.log(values)
			this.loading = !this.loading
            let data = values
			let res = await DoLogin(data)
			if (res.data.code == 0) {
				this.$message.success(res.data.msg)
				Cache.set('token', res.data.ticket)
				let res1 = await GetUserInfo()
				Cache.set('UserInfo', res1.data)
				this.SET_TOKEN(res.data.ticket)
				Cache.set('SYS_TOKEN', res.data.ticket)
				this.$router.push({
					name: 'index'
				})
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
	.bak{
		width: 100%;
	}
  .bak img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit:cover;
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
    top: 30%;
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
	overflow:hidden;
	margin:20px auto;
	p{
		width:100%;
		height:40px;
		line-height:40px;
		float:left;
		text-align:center;
		margin:0;
	}
	.actice{
		border-bottom:1px solid #1890ff;
	}
  }

  .line {
    width: 100%;
    border-top: 1px solid #f2f2f2;
	margin-bottom:20px;
  }

  /deep/.ant-form-item-children{
	  display:flex;
	  .con-left{
		  flex:1;
	  }
	  .con-right{
	  		  width:80px;
			  margin-left:10px;
			  background:#1890FF;
			  text-align:center;
			  color:#fff;
			  border-radius:6px;
			  height:32px;
			  line-height:32px;
	  }
  }
  .btn{
	  margin:0 auto;
  }

</style>
