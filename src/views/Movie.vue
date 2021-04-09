<template>
  <div :class="animateClass">
    <Vhead title="电影" :show-return="show" />
    <van-swipe indicator-color="white" :autoplay="3000">
      <van-swipe-item v-for="(banner, i) in banner" :key="i">
        <img :src="banner.imageUrl" :alt="banner.name" />
      </van-swipe-item>
    </van-swipe>
    <div class="city-name">
      <van-button plain round type="default" size="small" @click="gotoCity"
        >{{ city }}<van-icon name="arrow-down"
      /></van-button>
    </div>

    <div class="movie-nav">
      <router-link :to="{ name: 'hotplaying' }">正在热映</router-link>
      <router-link :to="{ name: 'futureplaying' }">即将上映</router-link>
    </div>

    <router-view />
  </div>
</template>

<script>
import { animate } from "@/utils/mixin.js";
export default {
  mixins: [animate],
  data() {
    return {
      show: false,
      banner: [],
      city: "",
    };
  },
  methods: {
    gotoCity() {
      this.$router.push("/city");
    },
  },
  created() {
    if (localStorage.getItem("city")) {
      this.city = JSON.parse(localStorage.getItem("city")).name;
    } else {
      this.$router.push({ name: "city" });
    }
  },
  mounted() {
    this.$axios({
      url: "/yun/banner",
      // headers: {
      //   "X-Client-Info":
      //     '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606379539183691456282625","bc":"110100"}',
      //   "X-Host": "mall.cfg.common-banner",
      // },
    }).then((res) => {
      this.banner = res.data.banners;
    });
  },
};
</script>

<style lang="scss" scoped>
.van-swipe {
  height: 140px;
  img {
    width: 100vw;
    // vertical-align: middle;
    background: rgb(175, 168, 168);
  }
}
.city-name {
  position: fixed;
  top: 50px;
  left: 5px;
  z-index: 99999;
}
</style>