<template>
  <div :class="animateClass">
    <Vhead
      title="意见反馈"
      :searchButton="false"
      :submitAdvise="true"
      :submitCon="adviseMsg"
    ></Vhead>
    <van-field
      class="m-t10"
      v-model="adviseMsg"
      rows="8"
      autosize
      type="textarea"
      maxlength="500"
      placeholder="请留下您宝贵的意见，我们将努力改进"
      show-word-limit
    />
  </div>
</template>
<script>
import { animate } from "@/utils/mixin.js";
export default {
  mixins: [animate],
  data() {
    return {
      adviseMsg: "",
    };
  },
};
</script>