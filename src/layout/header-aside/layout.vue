<template>
  <div class="d2-layout-header-aside-group" :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:left">
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        <div style="height:50px;background-color:red;"></div>
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          :class="{'d2-theme-container-aside': true, 'd2-theme-container-transition': asideTransition}"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }"
        >
          <!-- <d2-menu-side /> -->
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
            <!-- <h3 v-if="!asideCollapse" class="mt-0 font-600 vertical-center" style="padding: 10px">川流配送</h3> -->
          </div>
          <el-menu :default-active="this.$route.fullPath" :collapse="asideCollapse" router>
            <!-- @open="handleOpen"
            @close="handleClose"-->
            <el-menu-item v-for="(item, index) in children" :key="index" :index="item.path">
              <!-- <i :class="'fa fa-' + item.icon"></i> -->
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </div>
        <!-- 主体 -->
        <div style="width: 100%" flex-box="1" flex>
          <div class="d2-theme-container-main" flex-box="1" flex>
            <!-- 搜索 -->
            <transition name="fade-scale">
              <div v-if="searchActive" class="d2-theme-container-main-layer" flex>
                <d2-panel-search ref="panelSearch" @close="searchPanelClose" />
              </div>
            </transition>
            <!-- 内容 -->
            <transition name="fade-scale">
              <div v-if="!searchActive" class="d2-theme-container-main-layer" flex="dir:top">
                <!-- tab -->
                <div class="d2-theme-container-main-header" flex-box="0">
                  <!-- <d2-tabs /> -->
                  <top-bar></top-bar>
                </div>
                <!-- 页面 -->
                <div class="d2-theme-container-main-body" flex-box="1">
                  <transition :name="transitionActive ? 'fade-transverse' : ''">
                    <!-- :include="keepAlive" -->
                    <keep-alive>
                      <router-view />
                    </keep-alive>
                  </transition>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../../views/demo/topbar";
// import d2MenuSide from "./components/menu-side";
import d2MenuHeader from "./components/menu-header";
// import d2Tabs from "./components/tabs";
// import d2HeaderFullscreen from './components/header-fullscreen'
// import d2HeaderLocales from './components/header-locales'

// import d2HeaderSize from './components/header-size'
import d2HeaderTheme from "./components/header-theme";
// import d2HeaderUser from './components/header-user'
// import d2HeaderLog from './components/header-log'
// import d2HeaderColor from './components/header-color'
import { mapState, mapGetters, mapActions } from "vuex";
import mixinSearch from "./mixins/search";
export default {
  name: "d2-layout-header-aside",
  mixins: [mixinSearch],
  components: {
    // d2MenuSide,
    // d2MenuHeader,
    TopBar,
    // d2Tabs,

    // d2HeaderFullscreen,
    // d2HeaderLocales,
    // d2HeaderSearch,
    // d2HeaderSize,
    // d2HeaderTheme
    // d2HeaderUser,
    // d2HeaderLog,
    // d2HeaderColor
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      console.log(from.path);
      // if (to.path == '/page_map' || to.path == '/page_result') {
      //   this.asideCollapse = true;
      // } else {
      //   this.asideCollapse = false;
      // }
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
  computed: {
    ...mapState("d2admin", {
      keepAlive: (state) => state.page.keepAlive,
      grayActive: (state) => state.gray.active,
      transitionActive: (state) => state.transition.active,
      // asideCollapse: (state) => state.menu.asideCollapse,
      asideTransition: (state) => state.menu.asideTransition,
    }),
    ...mapGetters("d2admin", {
      themeActiveSetting: "theme/activeSetting",
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return this.themeActiveSetting.backgroundImage
        ? {
            backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`,
          }
        : {};
    },
  },
  methods: {
    ...mapActions("d2admin/menu", ["asideCollapseToggle"]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle();
    },
  },
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
// 注册主题
@import "~@/assets/style/theme/register.scss";
</style>
