<template>
  <div>
    <footer>
      <div v-for="(foot, i) in foots" :key="i">
        <router-link :to="foot.path">
          <!-- 需要用指令将图标代码转换为图标 -->
          <i class="iconfont" v-html="foot.icon"></i>
          <span>{{ foot.text }}</span>
        </router-link>
      </div>
    </footer>
  </div>
</template>
<script>
import { footerList } from "@/utils/footer";
export default {
  data() {
    return {
      foots: footerList,
    };
  },
};
</script>

<style lang="scss" scoped>
footer {
  background: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #eee;
  // box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.05);
  div {
    flex: 1;
    // height: 45px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 3px 0;
      text-align: center;
      font-family: "微软雅黑";
      color: #999;
      position: relative;
      i {
        width: 100%;
        height: 23px;
        line-height: 23px;
        font-size: 20px !important;
      }
      span {
        width: 100%;
        height: 19px;
        line-height: 19px;
        font-size: 14px;
      }
      .hot {
        position: absolute;
        top: 0;
        left: 60%;
        display: inline-block;
        width: 10px;
        height: 10px;
        font-size: 10px;
        line-height: 10px;
        border-radius: 50%;
      }
    }
    .nav-active,
    .router-link-exact-active,
    .router-link-active {
      color: #ff5f16;
    }
  }
}
</style>