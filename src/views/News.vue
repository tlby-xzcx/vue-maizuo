<template>
  <div :class="animateClass">
    <div v-html="page"></div>
  </div>
</template>
<script>
import { animate } from "@/utils/mixin.js";
export default {
  mixins: [animate],
  data() {
    return {
      page: "",
    };
  },
  mounted() {
    this.$axios({
      url: "/maizuo/gateway?actId=ElzMZU125260",
      headers: {
        "X-Host": "mall.act.static-page.info",
      },
    }).then((res) => {
      // console.log(res);
      this.page = res.data.data.data.content;
    });
  },
};
</script>