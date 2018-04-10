<template>
  <main>
    <vfooter></vfooter>
    <alert-dialog v-if="dialogShow" :icon="tipsImg" :aniDialog="aniDialog"  :dialogTxt="dialogTxt"></alert-dialog>
    <section class="main_wrap">
      <section class="user_title">
        <i class="iconfont icon-denglu"></i>
        <h3>登录/注册</h3>
      </section>
      <section class="user">
        <el-form ref="form" :model="form" >
            <el-input
              placeholder="请输入用户名"
              v-model="form.name"
              clearable>
            </el-input>
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="form.password"
              clearable>
            </el-input>
            <el-input
              placeholder="请输入验证码"
              v-model="form.yzm"
              clearable>
            </el-input>
            <img @click="changeYzm" :src="url" alt="">
            <el-form-item>
              <el-button type="primary" @click="signin">立即注册</el-button>
              <el-button>取消</el-button>
            </el-form-item>
        </el-form>
      </section>
    </section>
  </main>
</template>

<script>
import vfooter from '../components/common/vfooter.vue'
import alertDialog from '../components/common/alertDialog.vue'
import { mapState } from 'vuex'
import { signin, yzmChange, checkUser } from '../data/fetchData.js'
export default {
  name: 'login',
  components: {
    vfooter,
    alertDialog
  },
  data () {
    return {
      form: {
        name: '',
        password: '',
        yzm: ''
      },
      yzmTest: '',
      url: '',
      dialogShow: false,
      aniDialog: '',
      tips: true,
      dialogTxt: ''
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    tipsImg () {
      return this.tips ? 'icon-chenggong' : 'icon-shibai'
    }
  },
  mounted () {
    checkUser(localStorage.getItem('user'), localStorage.getItem('token')).then(data => {
      if (data === 'success') {
        this.$router.push({path: '/me'})
      }
    })
    this.url = 'http://vue.wclimb.site/images/yzm.jpg'
    this.changeYzm()
  },
  methods: {
    // 弹窗
    dialogChange (tips, dialogTxt) {
      this.aniDialog = 'aniDialog'
      this.dialogShow = true
      this.tips = tips
      this.dialogTxt = dialogTxt
      setTimeout(() => {
        this.dialogShow = false
      }, 1500)
    },
    signin () {
      if (this.form.yzm !== this.yzmTest) {
        this.dialogChange(false, '验证码错误')
        return false
      }
      if (this.form.name === '' || this.form.password === '') {
        this.dialogChange(false, '用户名/密码不能为空')
        return false
      }
      signin(this.form.name, this.password).then(data => {
        let res = JSON.parse(data)
        if (res.msg === 'allTrue') {
          this.dialogChange(true, '登录成功')
          this.$store.dispatch('createUser', {
            userName: this.form.name
          })
          localStorage.setItem('user', this.form.name)
          localStorage.setItem('avator', res.avator)
          localStorage.setItem('token', res.token)
          let _that = this
          setTimeout(() => {
            _that.$router.push({path: '/me'})
          }, 1000)
        } else if (res.msg === 'passwordFalse') {
          // 密码错误
          this.dialogChange(false, '密码错误')
        } else if (res.msg === 'newUser') {
          // 新用户
          console.log(res)
          this.dialogChange(true, '注册成功')
          localStorage.setItem('user', this.form.name)
          localStorage.setItem('token', res.token)
          let _that = this
          setTimeout(() => {
            _that.$router.push({path: '/me'})
          }, 1000)
        }
      }).catch(err => console.log(err))
    },
    changeYzm () {
      let d = new Date()
      this.url = 'http://vue.wclimb.site/images/yzm.jpg?v=' + d.getTime()
      yzmChange().then(data => {
        this.yzmTest = data
        console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main_wrap{
    position: absolute;
    top: 40%;
    width: 100%;
    transform: translateY(-55%)
}
.user{
  padding: 0 1rem;
  margin-top: 1rem;
}
.el-input{
  margin-top: 0.5rem;
}
.user_title{
    display:flex;
    flex-direction: column;
    align-items: center;
    i{
        color: #1ABC9C;
        font-size: 60px;
    }
    h3{
        font-size: 18px;
        color: #1ABC9C;
    }
}
</style>
