<template>
  <div class="background-white" :class="animateClass">
    <!-- <h2>影院详情{{ cinemaId }}</h2> -->
    <Vhead title="影院详情" :searchButton="false" />
    <p class="name m-t15 m-b5">{{ cinemaInfo.name }}</p>
    <p class="default-color text-center">
      <span
        @click="show = !show"
        v-for="(service, index) in cinemaService"
        :key="index"
        >{{ service.name }} |
      </span>
    </p>
    <van-cell
      :title="cinemaInfo.address"
      icon="location-o"
      title-class="text-ellipsis"
      @click="showPhone = !showPhone"
    >
      <template #right-icon>
        <van-icon name="phone-o" class="phone-o" />
      </template>
    </van-cell>
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      class="p-t50 p-l15 p-r15"
    >
      <p class="text-center m-b5">{{ cinemaInfo.name }}</p>
      <p v-for="(service, index) in cinemaService" :key="index" class="m-b5">
        <van-tag plain type="warning">{{ service.name }}</van-tag
        >{{ service.description }}
      </p>
    </van-popup>
    <van-popup
      v-model="showPhone"
      position="top"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      class="p-t50 p-l15 p-r15"
    >
      <p class="text-center m-b5">{{ cinemaInfo.address }}</p>
      <p class="text-center m-b5">{{ cinemaInfo.phone }}</p>
    </van-popup>

    <van-swipe
      :loop="false"
      :show-indicators="false"
      class="swipe-wrapper"
      @change="changeDesc"
    >
      <van-swipe-item v-for="(film, i) in films" :key="i">
        <div class="img swiper-zoom-container">
          <img :src="film.poster" :alt="film.name" class="p-r15" />
        </div>
      </van-swipe-item>
    </van-swipe>

    <div
      class="text-center m-t15"
      v-for="(film, i) in films"
      :key="i"
      v-show="filmsIndex == i"
      @click="filmDetail(film.filmId)"
    >
      <div>
        <p class="text-m">
          {{ film.name }} <span class="default-color">{{ film.grade }} 分</span>
        </p>
        <p class="text-ellipsis box-center">
          {{ film.category }} | {{ film.runtime }} | {{ film.director }} |
          <span v-for="(actor, index) in film.actors" :key="index"
            >{{ actor.name }}
          </span>
        </p>
      </div>
      <div class="float-right position">
        <van-icon name="arrow" />
      </div>
    </div>

    <van-popup
      v-model="filmsDetailShow"
      position="top"
      :style="{ height: '100%', background: '#f4f4f4' }"
      closeable
      close-icon="close"
      close-icon-position="top-left"
    >
      <div class="poster">
        <img :src="filmsDetail.poster" alt="" />
      </div>
      <van-cell
        :title="filmsDetail.name"
        :value="filmsDetail.grade + '分'"
        :label="
          filmsDetail.category +
          ' ' +
          filmsDetail.nation +
          ' ' +
          filmsDetail.runtime
        "
        size="large"
        value-class="default-color"
      >
      </van-cell>
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="电影简介" name="1">
          <span>{{ filmsDetail.synopsis }}</span>
        </van-collapse-item>
      </van-collapse>

      <div class="actors-wrapper-color p-b15">
        <p class="text-m p-l16 m-b5 m-t5 p-t10">演职人员</p>
        <van-swipe
          :loop="false"
          :show-indicators="false"
          :width="300"
          class="p-l16 text-center"
        >
          <van-swipe-item v-for="(actor, i) in filmsDetail.actors" :key="i">
            <p class="flex-center">
              <img :src="actor.avatarAddress" :alt="actor.name" />
            </p>
            <p>{{ actor.name }}</p>
            <p>{{ actor.role }}</p>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="actors-wrapper-color m-b90 p-b15">
        <p class="text-m p-l16 m-b5 m-t5 p-t10">剧照</p>
        <van-swipe
          :loop="false"
          :show-indicators="false"
          :width="200"
          class="p-l16 text-center"
        >
          <van-swipe-item v-for="(photo, i) in filmsDetail.photos" :key="i">
            <p class="photo-wrapper flex-center">
              <img :src="photo" />
            </p>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="button-fixed">
        <van-button color="#ff5f16" block>购票</van-button>
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
      cinemaId: this.$route.params.cinemaId,
      cinemaInfo: {},
      cinemaService: [],
      show: false,
      showPhone: false,
      films: [],
      filmsIndex: 0,
      filmsDetailShow: false,
      filmsDetail: {
        poster:
          "https://assets.maizuo.com/h5/v5/public/app/img/maizuo_padding.7c6a7f11.png",
      },
      activeNames: ["1"],
    };
  },
  methods: {
    changeDesc(index) {
      // console.log(index);
      this.filmsIndex = index;
    },
    filmDetail(filmId) {
      this.$axios
        .get("/maizuo/gateway", {
          params: {
            filmId,
          },
          headers: {
            "X-Host": "mall.film-ticket.film.info",
          },
        })
        .then((res) => {
          // console.log(res);
          this.filmsDetail = res.data.data.film;
          this.filmsDetailShow = !this.filmsDetailShow;
        });
    },
  },
  mounted() {
    // console.log(this.$route.params.cinemaId);
    this.$axios
      .get("/maizuo/gateway", {
        params: {
          cinemaId: this.cinemaId,
        },
        headers: {
          "X-Host": "mall.film-ticket.cinema.info",
        },
      })
      .then((res) => {
        // console.log(res);
        this.cinemaInfo = res.data.data.cinema;
        this.cinemaService = res.data.data.cinema.services;
      });

    this.$axios
      .get("/maizuo/gateway", {
        params: {
          cinemaId: this.cinemaId,
        },
        headers: {
          "X-Host": "mall.film-ticket.film.cinema-show-film",
        },
      })
      .then((res) => {
        // console.log(res);
        this.films = res.data.data.films;
      });
  },
};
</script>
<style lang="scss" scoped>
.button-fixed {
  width: 100vw;
  position: fixed;
  bottom: 0;
}
.background-white {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.name {
  text-align: center;
  font-size: 15px;
}
.text-ellipsis {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.phone-o {
  font-size: 16px;
  line-height: inherit;
}
.swipe-wrapper {
  height: 200px;
  padding-top: 25px;
  background: #efefef url("../assets/rowup.png") no-repeat bottom center;
}
.swiper-zoom-container {
  display: flex;
  justify-content: center;
}
.position {
  position: relative;
  top: -22px;
  right: 5px;
}
.poster {
  width: 100%;
  height: 35%;
  background: rgb(249, 249, 249);
  opacity: 1;
  // position: absolute;
  overflow: hidden;
  // top: 0;
  img {
    // height: 100%;
    width: 100%;
    position: relative;
    top: -50%;
  }
}
.default-color {
  color: #ff5f16;
}
.actors-wrapper-color {
  background: #fff;
}
.photo-wrapper {
  width: 75px;
  img {
    width: 100%;
  }
}
</style>