<template>
  <section class="home">
    <vfooter></vfooter>
    <transition name="fade">
      <div class="loading" v-if="this.loading">
        <div class="loading_dialog">
          <img src="../components/common/loading.svg" alt="">
        </div>
      </div>
    </transition>
    <div id="search">
      <router-link to="/home/search">
        <div class="search_input">
          <i class="iconfont icon-sousou1"></i>搜索
        </div>
      </router-link>
    </div>
    <videolist types="全部" :list="lists[3]" redirectTo="/all"></videolist>
    <videolist types="电影" :list="lists[0]" redirectTo="/movie"></videolist>
    <videolist types="电视剧" :list="lists[1]" redirectTo="/tv"></videolist>
    <videolist types="综艺" :list="lists[2]" redirectTo="/zy"></videolist>
    <transition name="router-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import vfooter from '../components/common/vfooter.vue'
import videolist from '../components/VideoList.vue'
import { initHome, getAvator } from '../data/fetchData'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    vfooter,
    videolist
  },
  data () {
    return {
      lists: '',
      loading: false,
      baseUrl: 'http://vue.wclimb.site/images/',
      dialogShow: false,
      dialogTxt: '',
      tips: true,
      aniDialog: ''
    }
  },
  computed: {
    ...mapState([
      'videoData'
    ])
  },
  created () {
    if (this.videoData != null) {
      this.lists = this.videoData
    } else {
      this.initData()
    }
  },
  methods: {
    initData () {
      this.loading = true
      initHome().then(data => {
        setTimeout(() => {
          this.loading = false
        }, 500)
        console.log(data)
        this.lists = data
        this.$store.dispatch('initVideoData', {
          initVideoData: data
        })
      }).catch(e => console.log('error', e))

      let name = localStorage.getItem('user') ? localStorage.getItem('user') : ''
      getAvator(name).then(data => {
        let res = data !== 'none' ? data : ''
        localStorage.setItem('avator', res)
      }).catch(err => {
        console.log(err)
        localStorage.removeItem('user')
        this.dialogChange(false, '用户信息变化，请重新登录')
        setTimeout(() => {
          this.$router.push({path: '/login'})
        }, 2000)
      })
    },
    dialogChange (tips, dialogTxt) {
      this.aniDialog = 'aniDialog'
      this.dialogShow = true
      this.tips = tips
      this.dialogTxt = dialogTxt
      setTimeout(() => {
        this.dialogShow = false
      }, 1500)
    }
  }
}
</script>
<style lang="scss">
@import './src/style/home';
</style>
