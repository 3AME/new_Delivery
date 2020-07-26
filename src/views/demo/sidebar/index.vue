<template>
  <div class="side-bar" style="padding: 10dp">
    <div class="user-info drag">
      <div class="avatar no-drag" style="margin: 20px;">
        <img
          :style="'width: ' + (asideCollapse ? '42px' : '72px' )+ '; height: ' + (asideCollapse ? '42px' : '72px' )"
          src="../../../assets/images/small/1_bak.png"
        />
      </div>
      <img
        v-if="!asideCollapse"
        :style="'padding: 10px 40px; width: 160px;'"
        src="../../../assets/images/small/app_name.png"
      />
    </div>
    <el-menu
      :default-active="this.$route.fullPath"
      class="el-menu-vertical-demo"
      :collapse="asideCollapse"
      router
    >
      <el-menu-item v-for="(item, index) in children" :key="index" :index="item.path">
        <i :class="'fa fa-' + item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      children: [
        { path: "/index", icon: "home", title: "主页" },
        { path: "/page_coordinate", icon: "object-ungroup", title: "坐标查询" },
        { path: "/page_route", icon: "road", title: "路线查询" },
        { path: "/page_map", icon: "crosshairs", title: "地图选择" },
        { path: "/page_history", icon: "history", title: "任务列表" },
        { path: "/about", icon: "users", title: "关于我们" },
        { path: "/faq", icon: "question", title: "常见问题" },
        { path: "/use", icon: "book", title: "使用手册" },
        { path: "/version", icon: "cube", title: "历史版本" },
      ],
    };
  },
  methods: {},
};
</script>

<style>
.side-bar el-menu-item {
}

.user-info {
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-info .avatar {
  width: 50px;
  height: 50px;
}

.user-info .avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
}
</style>
