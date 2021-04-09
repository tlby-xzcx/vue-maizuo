<template>
  <div :class="animateClass">
    <van-search
      v-model="value"
      :placeholder="recentlyHot"
      show-action
      @cancel="onCancel"
      @search="onSearch"
    />
  </div>
</template>
<script>
import { animate } from "@/utils/mixin.js";
export default {
  mixins: [animate],
  data() {
    return {
      value: "",
      recentlyHot: "你好！李焕英",
    };
  },
  methods: {
    onCancel() {
      this.$router.go(-1);
    },
    onSearch(val) {
      console.log(val);
    },
  },
};
</script>