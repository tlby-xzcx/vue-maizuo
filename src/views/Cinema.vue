<template>
  <div :class="animateClass">
    <Vhead title="影院" />
    <!-- <h2>cinema-cinema-cinema</h2> -->
    <div class="wrapper">
      <!-- <router-link
        :to="{ name: 'cinemadetail', params: cinema.cinemaId }"
        v-for="(cinema, index) in cinemaList"
        :key="index"
      > -->
      <van-cell
        v-for="(cinema, index) in cinemaList"
        :key="index"
        :title="cinema.name"
        :value="'￥' + cinema.lowPrice / 100.0 + ' 起'"
        :label="cinema.address"
        label-class="label-class"
        value-class="value-class"
        @click="gotoCinemaDetail(cinema.cinemaId)"
      />
      <!-- </router-link> -->
      <br />
      <br /><br />
      <br /><br />
      <!-- <van-divider>我是有底线的</van-divider> -->
      <br />
    </div>
  </div>
</template>
<script>
import { myMixin, animate } from "@/utils/mixin";
export default {
  mixins: [myMixin, animate],
  data() {
    return {
      cinemaList: [],
    };
  },
  methods: {
    gotoCinemaDetail(cinemaId) {
      this.$router.push({ name: "cinemadetail", params: { cinemaId } });
    },
  },
  mounted() {
    this.$axios
      .get("/maizuo/gateway?ticketFlag=1&k=421250", {
        params: {
          cityId: this.city.cityId,
        },
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606379539183691456282625"}',
          "X-Host": "mall.film-ticket.cinema.list",
        },
      })
      .then((res) => {
        // console.log(res);
        this.cinemaList = res.data.data.cinemas;
      });
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 100px;
}
.label-class {
  width: 212px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.value-class {
  color: #ff5f16;
}
</style>