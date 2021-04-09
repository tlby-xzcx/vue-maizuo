<template>
  <div :class="animateClass">
    <Vhead title="注册&登录" :search-button="searchButton"></Vhead>
    <van-tabs v-model="active" color="#ff5f16">
      <van-tab title="注册">
        <van-form @submit="onSubmit">
          <van-field
            v-model="login.telphone"
            name="telphone"
            label="手机号码"
            placeholder="手机号码"
            :rules="phoneRules"
          />
          <van-field
            v-model="login.nickname"
            name="nickname"
            label="昵称"
            placeholder="昵称"
          />
          <van-field
            v-model="login.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="passwordRules"
          />
          <van-field
            v-model="login.repassword"
            type="password"
            name="repassword"
            label="确认密码"
            placeholder="确认密码"
            :rules="repasswordRules"
          />
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit"
              >注册</van-button
            >
          </div>
        </van-form>
      </van-tab>
      <van-tab title="登录">
        <van-form @submit="onLogin">
          <van-field
            v-model="telphoneAgain"
            name="telphoneAgain"
            label="手机号码"
            placeholder="手机号码"
            :rules="[{ required: true, message: '请填写手机号码' }]"
          />
          <van-field
            v-model="passwordAgain"
            type="password"
            name="passwordAgain"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >登录</van-button
            >
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { animate } from "@/utils/mixin.js";
export default {
  mixins: [animate],
  data() {
    return {
      searchButton: false,
      active: "0",
      login: {},
      telphoneAgain: "",
      passwordAgain: "",
      phoneRules: [
        { require: true, message: "手机号码不能为空" },
        {
          validator: (value) => {
            return /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
              value
            );
          },
          trigger: "onChange",
          message: "请输入正确的手机号码",
        },
      ],
      passwordRules: [
        { require: true, message: "密码不能为空" },
        {
          validator: (val) => {
            return /^[a-zA-Z]\w{5,17}$/.test(val);
          },
          trigger: "onChange",
          message:
            "密码必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
        },
        {
          validator: (val) => {
            return this.login.repassword == val;
          },
          trigger: "onChange",
          message: "两次密码输入不一致",
        },
      ],
      repasswordRules: [
        { require: true, message: "请再次输入密码" },
        {
          validator: (val) => {
            return this.login.password == val;
          },
          trigger: "onChange",
          message: "两次输入密码不一致",
        },
      ],
    };
  },
  methods: {
    onSubmit(val) {
      this.$axios.post("/vue/register", val).then((res) => {
        // console.log(res);
        if (res.data.type) {
          this.active = 1;
          this.telphoneAgain = res.data.result[0].telphone;
        }
      });
    },
    onLogin(val) {
      // 登录的逻辑需要用到token
      this.$axios.post("/vue/login", val).then((res) => {
        console.log(res);
        if (res.data.type) {
          localStorage.loginInfo = JSON.stringify(res.data.data);
          sessionStorage.token = res.data.token;
          this.$router.push({ name: "mine" });
        }
      });
    },
  },
};
</script>