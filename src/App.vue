<template>
  <div id="app">
    <!-- style="padding: 8px" -->
    <!-- <router-view/> -->
    <!-- <keep-alive> -->
    <!-- <router-view v-if="isRouterAlive"></router-view> -->
    <!-- </keep-alive> -->

    <el-container class="content-container" style="background-color: transparent;">
      <el-main
        class="card"
        style="padding: 0px; margin: 0px; background-color: #f6f7fb;border: 1px solid grey;"
      >
        <router-view v-if="isRouterAlive"></router-view>
      </el-main>
    </el-container>
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

body {
  background-color: rgba(0, 0, 0, 0);
  overflow: hidden;
}

#app {
  // text-align: center;
  // background-color: #f6f7fb;
  background-color: transparent;
  // border-radius: 12px;
  // box-shadow: 0 2px 12px 0 grey;
  // border: 1px solid grey;
  // padding: 8px;
  // margin: 8px;
  // -webkit-app-region: drag;
}

#app .content-container {
  background: #fff;
  // position: absolute;
  border-bottom-right-radius: 12px;
  // top: 0px;
  // right: 0px;
  // bottom: 0px;
  // left: 0px;
  padding: 0;
  margin: 0;
  display: flex;
  // flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

#app .el-menu {
  border-right: solid 0px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: transparent;
}

#app .btn-action {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 14px;
  color: #666f7f;
}

#app .card {
  border-radius: 12px;
  /* box-shadow: 2px 2px 2px 2px grey; */
  box-shadow: 0 2px 12px 0 #eeeeee;
  // padding: 10px;
}

#app .vertical-center {
  text-align: center;
  // margin-left: -10%;
  // margin-top: 5%;
  display: table-cell;
  vertical-align: middle;
}

#app .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  border-radius: 8px;
}
#app .el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}

// 覆盖el-collapse-item的css
#app .el-collapse-item__wrap {
  will-change: height;
  background-color: #fff;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 0px solid #ebeef5;
}
#app .el-collapse-item__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  color: #303133;
  cursor: pointer;
  border-bottom: 0px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  -webkit-transition: border-bottom-color 0.3s;
  transition: border-bottom-color 0.3s;
  outline: 0;
}

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
