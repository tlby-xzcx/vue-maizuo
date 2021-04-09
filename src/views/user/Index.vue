<template>
  <div :class="animateClass">
    <router-view />
  </div>
</template>
<script>
import { animate } from "@/utils/mixin.js";
export default {
  mixins: [animate],
};
</script>