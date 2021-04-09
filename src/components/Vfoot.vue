<template>
  <div>
    <!-- vantui提供的tabbar -->
    <van-tabbar v-model="active" :route="true" active-color="#ff5f16">
      <!-- <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item> -->
      <van-tabbar-item
        v-for="(foot, i) in footer"
        :key="i"
        :icon="foot.icon"
        :to="{ name: foot.name }"
      >
        <span>{{ foot.text }}</span>
        <template #icon="props">
          <i class="iconfont" v-html="foot.icon"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { footerList } from "@/utils/footer.js";
export default {
  data() {
    return {
      active: 0,
      footer: footerList,
    };
  },
  //   watch: {
  //     active: function (newVal) {
  //       this.active = newVal;
  //       this.$router.push(this.footer[this.active].path);
  //     },
  //   },
  //   mounted() {
  //     //   初始化路由
  //     this.footer.forEach((item, i) => {
  //       if (item.name == this.$route.name) {
  //         this.active = i;
  //       }
  //     });
  //   },
};
</script>
