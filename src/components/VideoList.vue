<template>
  <section class="video_list">
      <div class="video_list_header">
        <h3>{{ types }}<span>({{ allLength }})</span></h3>
        <router-link :to="redirectTo">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
      </div>
      <ul>
        <li :key="list.id" v-for="(list, index) in list" v-if="index < 10">
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
</template>

<script>
export default {
  name: 'videolist',
  data () {
    return {
      baseUrl: 'http://vue.wclimb.site/images/'
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    types: {
      type: String,
      default: ''
    },
    redirectTo: {
      type: String,
      default: ''
    }
  },
  mounted () {
  },
  computed: {
    allLength () {
      return this.list.length
    }
  }
}
</script>

<style lang="scss">

</style>
