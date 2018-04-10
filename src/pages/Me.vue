<template>
  <section class="me">
    <vfooter></vfooter>
    <transition name="fade">
      <div class="loading" v-if="loading">
        <div class="loading_dialog">
          <img src="../components/common/loading.svg" alt="">
        </div>
      </div>
    </transition>
    <section class="me_detail">
      <section class="avator">
        <template v-if=" nowUploadAvator != '' ">
          <input @click="upload" id="upload" type="file">
          <div class="avator_border">
              <img v-lazy="baseUrl+'/avator/'+ nowUploadAvator +'.png' " alt="">
          </div>
        </template>
        <template v-else-if=" avator == '' ">
          <input @click="upload" id="upload" type="file">
          <div class="avator_border">上传头像</div>
        </template>
        <template v-else>
          <input @click="upload" id="upload" type="file">
          <div class="avator_border">
              <img v-lazy="baseUrl+'/avator/'+ avator +'.png' " alt="">
            </div>
        </template>
        <div class="name" @click.stop="editUserName">
            <template v-if="defaultName">
              {{ userName }} <i class="iconfont icon-bianji"></i>
            </template>
            <template v-else>
              <input type="text" v-focus v-model="userNameModel" @keyup.enter="submitEditName" >
              <i class="iconfont icon-submit"  @click.stop="submitEditName" ></i>
            </template>
        </div>
        <div @click="logout" class="logout">
            <i class="iconfont icon-logout23"></i>
            退出
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import vfooter from '../components/common/vfooter.vue'
export default {
  name: 'me',
  components: {
    vfooter
  },
  data () {
    return {
      nowUploadAvator: ''
    }
  },
  computed: {
    avator () {
      return localStorage.getItem('avator') ? localStorage.getItem('avator') : ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import './src/style/me';
</style>
