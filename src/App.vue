<template>
  <div id="app">
    <!-- <router-view/> -->
    <!-- <keep-alive> -->
    <router-view v-if="isRouterAlive"></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import util from "@/libs/util";
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  watch: {
    "$i18n.locale": "i18nHandle",
  },
  created() {
    this.i18nHandle(this.$i18n.locale);
  },
  methods: {
    i18nHandle(val, oldVal) {
      util.cookies.set("lang", val);
      document.querySelector("html").setAttribute("lang", val);
    },
    reload() {
      this.isRouterAlive = false; //控制router-view的显示或隐藏
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";

// body {
//   background-color: rgba(0, 0, 0, 0);
// }

// #app {
//   text-align: center;
//   background-color: #000;
//   border-radius: 30px;
//   box-shadow: 8px 8px 10px grey;
//   -webkit-app-region: drag;
// }

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  border-radius: 4px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background: #ffff;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: #d9d9d9;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #919191;
}

.theme-line
  .d2-theme-container
  .d2-theme-container-main
  .d2-theme-container-main-header
  .d2-multiple-page-control
  .el-tabs__nav
  .el-tabs__item {
  color: black;
  background-color: #fff;
}
</style>
