<template>
  <div>
    <h2>正在热映</h2>
    <p>混入的 {{ count }}</p>
  </div>
</template>
<script>
//引入混入
import { myMixin } from "../utils/mixin";
export default {
  mixins: [myMixin],
};
</script>