<template>
  <div :class="animateClass">
    <Vhead title="城市" :search-button="searchButton"></Vhead>
    <div class="search-input">
      <van-search
        v-model="valueCity"
        placeholder="输入城市名或者拼音"
        @cancel="onCancel"
        :show-action="!showCity"
        @input="changeValue"
      />
    </div>
    <div class="city-index" v-show="showCity">
      <van-index-bar :index-list="pylist" :sticky="false">
        <div v-for="(py, i) in pylist" :key="i">
          <van-index-anchor :index="py" />
          <van-cell
            @click="getCity(city)"
            v-for="(city, index) in cityList.filter(
              (item) => item.pinyin.indexOf(py.toLowerCase()) == '0'
            )"
            :key="index"
            :title="city.name"
          />
        </div>
      </van-index-bar>
    </div>
    <div class="city-search" v-show="!showCity">
      <van-cell
        @click="getCity(item)"
        v-show="!emptySearchList"
        v-for="(item, i) in searchList"
        :key="i"
        :title="item.name"
      />
      <van-empty
        v-show="emptySearchList"
        image="search"
        description="没有找到匹配的城市"
      />
    </div>
  </div>
</template>
<script>
import { animate } from "@/utils/mixin.js";
export default {
  mixins: [animate],
  data() {
    return {
      emptySearchList: false,
      searchList: [],
      showCity: true,
      valueCity: "",
      searchButton: false,
      cityList: [],
      pylist: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        // "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        // "U",
        // "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  methods: {
    onCancel() {
      this.showCity = true;
    },
    changeValue() {
      this.showCity = false;
      this.emptySearchList = false;
      this.searchList = [];
      this.searchList = this.cityList.filter((item) => {
        return (
          item.pinyin.match(this.valueCity) || item.name.match(this.valueCity)
        );
      });
      if (this.valueCity == "") {
        this.emptySearchList = true;
      }
    },
    getCity(city) {
      // console.log(item);
      localStorage.setItem("city", JSON.stringify(city));
      this.$router.push({ name: "hotplaying" });
    },
  },
  mounted() {
    this.$axios({
      url: "/vue/gateway",
    }).then((res) => {
      console.log(res);
      this.cityList = res.data.cities;
    });
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  z-index: 2000;
  height: 49px;
  width: 100vw;
  // padding: 9.5px 15px;
  background-color: #f4f4f4;
  position: fixed;
  top: 44px;
}
.city-index,
.city-search {
  padding-top: 1.2rem;
}

.van-cell {
  padding-left: 20px;
}
</style>