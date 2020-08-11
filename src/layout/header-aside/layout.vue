<template>
  <el-container class="content-container">
    <el-aside
      :width="asideCollapse ? asideWidthCollapse : asideWidth"
      style="background-color: #f6f7fb;"
    >
      <el-container style="overflow: hidden; height: 100%">
        <el-header height="auto">
          <div class="user-info drag">
            <div class="avatar no-drag" style="margin: 20px;">
              <img
                :style="'width: ' + (asideCollapse ? '42px' : '72px' )+ '; height: ' + (asideCollapse ? '42px' : '72px' )"
                src="../../assets/images/small/1_bak.png"
              />
            </div>
            <img
              v-if="!asideCollapse"
              :style="'padding: 10px 40px; width: 160px;'"
              src="../../assets/images/small/app_name.png"
            />
          </div>
        </el-header>
        <el-main style="padding: 0; overflow: auto;">
          <el-menu
            style="overflow: hidden;"
            :default-active="this.$route.fullPath"
            :collapse="asideCollapse"
            router
          >
            <el-menu-item v-for="(item, index) in children" :key="index" :index="item.path">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-main>
      </el-container>
    </el-aside>
    <el-container>
      <el-header>
        <top-bar></top-bar>
      </el-header>
      <el-main style="padding: 0; overflow: hidden;">
        <transition :name="'fade-transverse'">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TopBar from "../../views/demo/topbar";
export default {
  name: "d2-layout-header-aside",
  components: {
    TopBar,
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      console.log(from.path);
      if (to.path != "/index") {
        this.asideCollapse = true;
      } else {
        this.asideCollapse = false;
      }
    },
  },
  mounted() {
    console.log("this.$route.path=" + this.$route.path);
    if (this.$route.path != "/index") {
      this.asideCollapse = true;
    } else {
      this.asideCollapse = false;
    }
  },
  data() {
    return {
      asideCollapse: false,
      // [侧边栏宽度] 正常状态
      asideWidth: "240px",
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: "65px",
      children: [
        { path: "/index", icon: "el-icon-s-home", title: "主页" },
        { path: "/page_coordinate", icon: "el-icon-s-data", title: "坐标查询" },
        { path: "/page_route", icon: "el-icon-position", title: "路线查询" },
        { path: "/page_map", icon: "el-icon-map-location", title: "地图选择" },
        { path: "/page_history", icon: "el-icon-time", title: "任务列表" },
        { path: "/about", icon: "el-icon-info", title: "关于我们" },
        { path: "/faq", icon: "el-icon-question", title: "常见问题" },
        { path: "/use", icon: "el-icon-s-management", title: "使用手册" },
        { path: "/version", icon: "el-icon-date", title: "历史版本" },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.user-info {
  // height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// // 过渡动画 横向渐变
// .fade-transverse-leave-active,
// .fade-transverse-enter-active {
//   transition: all 0.5s;
// }
// .fade-transverse-enter {
//   opacity: 0;
//   // transform: translateX(30px);
//   // transform: translateX(-30%);
// }
// .fade-transverse-leave-to {
//   opacity: 0;
//   // transform: translateX(-30px);
//   // transform: translateX(30%);
// }

// 注册主题
// @import "~@/assets/style/theme/register.scss";
</style>
