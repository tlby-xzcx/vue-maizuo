<template>
  <div>
    <!-- <h2>mine-mine-mine</h2> -->
    <div class="avatar-wrapper" :class="animateClass">
      <div>
        <!-- <div class="upload">
          <van-uploader :after-read="afterRead" />
        </div> -->
        <div class="right-content">
          <p @click="gotoLogin" v-if="token == ''">立即登录</p>
          <div v-else>
            <p>{{ nickname }}</p>
            <Uploadimg />
          </div>
        </div>
      </div>
    </div>
    <div class="order">
      <div>电影订单</div>
      <div>商品订单</div>
    </div>
    <div>
      <van-cell title="卖座券" is-link />
      <van-cell title="余额" is-link :value="'￥' + money" />
      <van-cell title="设置" is-link @click="gotoSetting" />
      <!-- <router-link to="/home/mine/setting">设置</router-link> -->
      <!-- </van-cell> -->
    </div>
  </div>
</template>
<script>
import { animate } from "@/utils/mixin.js";
export default {
  mixins: [animate],
  data() {
    return {
      nickname: "",
      token: sessionStorage.token || "",
      money: 123,
    };
  },
  methods: {
    afterRead(file) {
      console.log(file);
    },
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    gotoSetting() {
      this.$router.push("/setting");
    },
  },
  mounted() {
    // 如果不用反向代理的话，每一次的请求过后都会断开连接，再次请求，又会断开，那么req.session.token就会一直为空，也就是服务端的token为空
    //session会重置，而反向代理的话会让服务端以为一直在服务端请求
    this.$axios.post("/vue/getuserinfo").then((res) => {
      // console.log(res);
      if (res.data.result) {
        this.nickname = res.data.result.nickname;
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.avatar-wrapper {
  // position: relative;
  width: 100vw;
  height: 200px;
  background: url("https://assets.maizuo.com/h5/v5/public/app/img/bg.a5bdd690.png");
  margin-top: -44px;
  z-index: -1;
  .right-content {
    position: relative;
    top: 50px;
    // left: 109px;
    color: #fff;
    font-size: 16px;
  }
  .upload {
    position: relative;
    top: 95px;
    left: 22px;
    width: 67px;
    height: 67px;
    border-radius: 50%;
    overflow: hidden;
  }
}
.order {
  background: #fff;
  height: 100px;
  line-height: 100px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  color: #797d82;
  div {
    width: 50%;
    text-align: center;
  }
}
</style>