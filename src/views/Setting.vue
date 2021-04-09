<template>
  <div :class="animateClass">
    <Vhead title="设置" :showReturn="true" :searchButton="false"></Vhead>
    <van-cell-group class="m-t15">
      <van-cell title="账号" :value="info.telphone" />
      <van-cell title="昵称" :value="info.nickname" />
    </van-cell-group>
    <van-cell-group class="m-t15">
      <van-cell
        title="登录密码"
        value="修改"
        is-link
        @click="gotoModel('updatepwd')"
      />
      <van-cell title="安全密码" value="未设置" is-link />
    </van-cell-group>
    <van-cell-group class="m-t15">
      <van-cell title="软件版本" is-link />
      <van-cell title="隐私政策" is-link />
      <van-cell title="用户协议" is-link />
      <van-cell title="意见反馈" is-link @click="gotoModel('advise')" />
    </van-cell-group>
    <van-cell-group class="m-t15">
      <van-cell title="注销账号" is-link />
    </van-cell-group>
    <footer @click="show = true">退出登录</footer>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '20%', 'text-align': 'center' }"
    >
      <p>是否退出登录？</p>
      <div class="exit">
        <p class="border-b" @click="loginOut">退出</p>
        <p @click="show = false">取消</p>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { animate } from "@/utils/mixin.js";
export default {
  mixins: [animate],
  data() {
    return {
      info: {
        telphone: "",
        nickname: "",
      },
      show: false,
    };
  },
  methods: {
    gotoModel(name) {
      this.$router.push({ name });
    },
    loginOut() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push("/guide");
    },
  },
  mounted() {
    this.$axios.post("/vue/getuserinfo").then((res) => {
      // console.log(res);
      if (res.data.result) {
        this.info = res.data.result;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.m-t15 {
  margin-top: 10px;
}
footer {
  width: 100vw;
  height: 60px;
  background: #fff;
  color: #ff5f16;
  line-height: 60px;
  text-align: center;
  position: fixed;
  bottom: 0;
  font-size: 15px;
}
.exit {
  font-size: 15px;
  margin-top: 10px;
  p {
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
}
.border-b {
  border-bottom: 1px solid #f4f4f4;
  color: #ff5f16;
}
</style>