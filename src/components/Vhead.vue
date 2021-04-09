<template>
  <div>
    <van-nav-bar
      fixed
      placeholder
      :title="title"
      :left-arrow="showReturn"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon
          v-show="searchButton"
          name="search"
          size="38"
          color="#ff5f16"
        />
        <span v-show="submitAdvise">提交</span>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    showReturn: {
      type: Boolean,
      default: true,
    },
    searchButton: {
      type: Boolean,
      default: true,
    },
    submitAdvise: {
      type: Boolean,
      default: false,
    },
    submitCon: {
      type: String,
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      if (this.searchButton) {
        this.$router.push({ name: "search" });
      }
      if (this.submitAdvise) {
        console.log(this.submitCon);
      }
    },
  },
};
</script>

<style lang="scss">
.van-nav-bar .van-icon {
  color: #ff5f16 !important;
}
</style>
