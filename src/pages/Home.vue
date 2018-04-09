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
    <section class="video_list">
      <div class="video_list_header">
        <h3>全部<span>({{ allLength }})</span></h3>
        <router-link to="/all">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
      </div>
      <ul>
        <li :key="list.id" v-for="(list, index) in lists[3]" v-if="index < 10">
          <router-link :to="'/video/' + list.id">
            <div><img v-lazy="baseUrl + list.img" alt=""></div>
            <h3>{{ list.name }}</h3>
            <div>
              <div class="starList" :style="{'background-position-y': -15 * (10 - list.star).toFixed(0) + 'px'}"></div>
              <span>{{ list.star }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
import vfooter from '../components/common/vfooter.vue'
import { initHome } from '../data/fetchData'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    vfooter
  },
  data () {
    return {
      lists: '',
      allLength: 0,
      loading: false,
      baseUrl: 'http://vue.wclimb.site/images/'
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
        this.allLength = this.lists[3].length
        this.$store.dispatch('initVideoData', {
          initVideoData: data
        })
      }).catch(e => console.log('error', e))
    }
  }
}
</script>
<style lang="scss" scoped>
@import './src/style/home';
</style>
