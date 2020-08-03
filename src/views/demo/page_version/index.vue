<template>
  <el-container class="content-container">
    <el-header height="auto" style="padding: 20px">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-center">
            <strong style="color: #5673ff; font-size: 24px">版本更新</strong>
            <p class="text-muted">川流系统的辛酸成长史</p>
          </div>
        </div>
      </div>
    </el-header>
    <el-main style="overflow:scroll;overflow-x: hidden !important;">
      <div class="col-lg-12">
        <div>
          <!-- class="card" -->
          <div class="card-body mt-5">
            <section id="cd-timeline" class="cd-container">
              <div class="row">
                <div class="col-md-12">
                  <div class="main-timeline">
                    <div class="timeline" v-for="(item, index) in versions" :key="index">
                      <span class="timeline-icon"></span>
                      <span class="year">{{ item.timestamp }}</span>
                      <div class="timeline-content" style="background-color:#f0f4f7">
                      <!-- </div><h3 class="title">Version {{ item.versionName }}</h3></div> -->
                        <!-- <p class="description text-muted">微逻辑</p> -->
                        <h3 class="title">Version {{ item.versionName }}</h3>
                        <p
                          class="description"
                          v-for="(content, i) in item.contents"
                          :key="i"
                          style="color: black"
                        >{{ content }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      versions: [
        {
          versionName: "1.0.0",
          timestamp: "2020/3/5",
          contents: ["1. 初始化项目模板"],
        },
        {
          versionName: "1.0.1",
          timestamp: "2020/3/12",
          contents: ["1. 实现路线查询UI", "2. 实现坐标查询UI"],
        },
        {
          versionName: "1.0.2",
          timestamp: "2020/3/18",
          contents: ["1. 实现历史记录UI", "2. 支持地图查看"],
        },
        {
          versionName: "1.0.3",
          timestamp: "2020/3/24",
          contents: [
            "1. 对接后端算法",
            "2. 坐标形式查询出文字结果",
            "3. 路线形式查询可出文字",
          ],
        },
        {
          versionName: "1.0.4",
          timestamp: "2020/4/1",
          contents: ["1. 实现历史记录持久化"],
        },
        {
          versionName: "1.0.5",
          timestamp: "2020/4/7",
          contents: [
            "1. 支持地图地点选择",
            "2. 完善路线查询和坐标查询",
            "3. 实现查询结果UI",
          ],
        },
        {
          versionName: "2.0.0",
          timestamp: "2020/4/14",
          contents: [
            "1. 查询结果界面以图表的形式显示结果，支持查看路线详情",
            "2. 优化地图查询",
            "3. 优化主题配色",
            "4. 算法更新，支持多配送点，支持多线程运行",
          ],
        },
        {
          versionName: "2.0.1",
          timestamp: "2020/4/20",
          contents: ["1. 新增页面刷新功能", "2. 添加关于我们界面"],
        },
        {
          versionName: "2.0.2",
          timestamp: "2020/4/26",
          contents: ["1. 新增常见问题界面", "2. 新增使用手册界面"],
        },
        {
          versionName: "2.0.3",
          timestamp: "2020/5/1",
          contents: [
            "1. 新增测试数据",
            "2. 解决一些bug",
            "3. 支持配置算法参数",
          ],
        },
        {
          versionName: "2.0.4",
          timestamp: "2020/5/10",
          contents: [
            "1. 新增显示算法收敛曲线",
            "2. 新增显示车辆载重柱状图和车辆路程柱状图",
          ],
        },
        {
          versionName: "2.0.5",
          timestamp: "2020/5/18",
          contents: ["1. 新增历史版本界面", "2. 更新软件图标"],
        },
        {
          versionName: "2.0.6",
          timestamp: "2020/5/25",
          contents: [
            "1. 首页图标和文字垂直居中",
            "2. 地图选择细节优化",
            "3. 优化软件体验",
          ],
        },
      ],
    };
  },
};
</script>
<style src="../../../assets/style/bootstrap/css/metismenu.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/bootstrap.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/icons.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/style.css" scoped></style>
