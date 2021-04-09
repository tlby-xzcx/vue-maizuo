<template>
  <div>
    <input
      type="file"
      name=""
      id=""
      class="file-none"
      ref="file"
      @change="uploadImg"
    />
    <img :src="img" alt="" class="avatar" @click="handlerClick" />
  </div>
</template>

<script>
import img from "../assets/defaultimg.png";
import { baseURL } from "@/utils/axios";
export default {
  data() {
    return {
      img,
    };
  },
  methods: {
    handlerClick() {
      this.$refs.file.click();
    },
    uploadImg() {
      console.log("开始上传头像");
      // console.log(this.$refs.file.files[0]);
      let file = this.$refs.file.files[0]; //可以上传多个图片
      let formdata = new FormData();
      formdata.append("avatar", file); //formdata必须是post请求
      this.$axios.post("/vue/uploadimg", formdata).then((res) => {
        // console.log(res);
        // this.img = res.data.path.replace(/public/, baseURL);
        this.img = "/" + res.data.path;
        let users = {
          avatar: res.data.path.replace(/public/, baseURL),
          telphone: res.data.telphone,
        };
        localStorage.setItem("users", JSON.stringify(users));
      });
    },
    getAvatar() {
      this.$axios.post("/vue/getavatar").then((res) => {
        // console.log(res);
        //如果没有上传头像，就是用默认的图片
        if (res.data.type) {
          this.img = res.data.result.avatar.replace(/public/, baseURL);
        } else {
          this.img = img;
        }
      });
    },
  },
  mounted() {
    if (localStorage.users) {
      /**
       * 判断本地是否有头像信息
       * 判断本地的头像信息手机号码和登录时存储的手机号码是否一致
       * 不一致，就请求
       * 一致，就不请求
       *
       * 另一种办法是请求个人信息时，将值传递过来
       * 也就是Mine中请求的数据，传递到子组件Uploading.vue中，或者直接用this.$refs修改子组件的img值
       * 如果还没有上传，传递过来的img为默认图片
       */
      var usersInfo = JSON.parse(localStorage.users);
      var loginInfo = JSON.parse(localStorage.loginInfo);
      if (usersInfo.telphone == loginInfo.telphone) {
        this.img = usersInfo.avatar;
      } else {
        this.getAvatar();
      }
    } else {
      this.getAvatar();
    }
  },
};
</script>

<style lang="scss" scoped>
.file-none {
  display: none;
}
.avatar {
  display: block;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
</style>