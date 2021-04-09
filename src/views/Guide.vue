<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        @click="gotoHome(i)"
        v-for="(item, i) in swiperList"
        :key="i"
      >
        {{ item }}
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperList: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    gotoHome(i) {
      if (i === this.swiperList.length - 1) {
        this.$router.push({ name: "hotplaying" });
      }
    },
  },
  mounted() {
    if (localStorage.visiteCount) {
      localStorage.visiteCount++;
      if (localStorage.visiteCount >= 3) {
        this.$router.push("/home/movie/hotplaying");
      }
    } else {
      localStorage.visiteCount = 1;
    }
  },
};
</script>
<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 100vh;
  width: 100vw;
  height: 100vh;
  text-align: center;
  background-color: #39a9ed;
}
</style>