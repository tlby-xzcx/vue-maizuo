<template>
  <!-- 47.104.209.44:3333 -->
  <div class="wrapper" :class="animateClass">
    <div class="logo">
      <!-- <img
        src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png"
        alt="movie logo"
      /> -->
    </div>
    <div class="form">
      <van-form ref="loginValidator">
        <van-field
          v-model="phone"
          name="phone"
          placeholder="手机号码"
          :rules="phoneRules"
          clearable
        >
          <template #extra>
            <span
              :class="lightHeightText ? 'lignt-height-text' : 'sms-text'"
              @click="sendSms"
              >发送验证码</span
            >
          </template></van-field
        >
        <van-field
          v-model="sms"
          center
          clearable
          placeholder="请输入短信验证码"
          :rules="[{ validator, message: '请输入正确的短信验证码' }]"
        >
        </van-field>
        <div class="login-button">
          <van-button block color="#ff5f16" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
      <p class="m-t30" @click="gotoMoreLogin">更多登录方式-></p>
    </div>
  </div>
</template>
<script>
import { animate } from "@/utils/mixin.js";
export default {
  mixins: [animate],
  data() {
    return {
      phone: "",
      pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
      sms: "",
      loginPass: true, //验证通过才能点击
      lightHeightText: false,
      phoneRules: [
        { require: true, message: "手机号码不能为空" },
        {
          validator: (value) => {
            return this.pattern.test(value);
          },
          message: "请输入正确的手机号码",
        },
      ],
    };
  },
  watch: {
    phone: {
      deep: true,
      handler(val) {
        this.$refs.loginValidator
          .validate("phone")
          .then(() => {
            this.lightHeightText = true;
          })
          .catch(() => {
            this.lightHeightText = false;
          });
      },
    },
  },
  methods: {
    validator(val) {
      return /^\d{6}$/.test(val);
    },
    sendSms() {
      this.$refs.loginValidator.validate("phone").then(() => {
        console.log(111);
        this.$axios.get("/yun/banner").then((res) => {
          console.log(res);
        });
      });
    },
    gotoMoreLogin() {
      this.$router.push({ name: "morelogin" });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.logo {
  width: 100vw;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 60px;
  }
}
.form {
  padding: 0 15px;
  .sms-text {
    color: #bdc0c5;
  }
  .light-height-text {
    color: #000;
  }
  .login-button {
    margin: 70px 15px 0;
  }
}
</style>