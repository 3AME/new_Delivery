<template>
  <el-container class="content-container" style="overflow:auto;overflow-x: hidden !important;">
    <el-header height="auto" style="padding: 20px">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-center">
            <strong style="color: #5673ff; font-size: 24px">版本更新</strong>
            <p class="text-muted">川流配送的成长史</p>
          </div>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="col-lg-12">
        <div>
          <!-- class="card" -->
          <div class="card-body mt-5">
            <section id="cd-timeline" class="cd-container">
              <div class="row">
                <div class="col-md-12">
                  <div class="main-timeline">
                    <div class="timeline" v-for="(item, index) in reverseVersion" :key="index">
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
  computed: {
        reverseVersion() {
          return Array.prototype.reverse.call(this.versions);
        }
  },
  data() {
    return {
      versions: [
        {
          versionName: "1.0.0",
          timestamp: "2020/3/5",
          contents: [
            "1. 项目初始化",
          ],
        },
        {
          versionName: "1.0.1",
          timestamp: "2020/3/12",
          contents: ["1. 实现路线查询UI", "2. 实现坐标查询UI"],
        },
        {
          versionName: "1.0.2",
          timestamp: "2020/3/18",
          contents: [
            "1. 实现历史记录UI", 
            "2. 支持地图查看"
          ],
        },
        {
          versionName: "1.0.3",
          timestamp: "2020/3/24",
          contents: [
            "1. 对接算法",
            "2. 坐标查询显示路线描述",
            "3. 路线查询显示路线描述",
          ],
        },
        {
          versionName: "1.0.4",
          timestamp: "2020/4/1",
          contents: [
            "1. 实现历史任务持久化"
          ],
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
            "1. 算法更新，支持多配送点，支持多线程运行",
            "2. 查询结果界面以图表的形式显示结果，支持查看路线详情",
            "3. 优化地图查询",
            "4. 优化主题配色",
          ],
        },
        {
          versionName: "2.0.1",
          timestamp: "2020/4/20",
          contents: [
            "1. 支持页面刷新", 
            "2. 添加团队介绍"
          ],
        },
        {
          versionName: "2.0.2",
          timestamp: "2020/4/26",
          contents: [
            "1. 新增常见问题界面", 
            "2. 新增使用手册"
          ],
        },
        {
          versionName: "2.0.3",
          timestamp: "2020/5/1",
          contents: [
            "1. 新增测试数据",
            "2. 支持配置算法参数",
            "3. 解决少量bug",
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
          contents: ["1. 新增历史版本界面", "2. 更新产品图标"],
        },
        {
          versionName: "2.0.6",
          timestamp: "2020/5/25",
          contents: [
            "1. 首页图标和文字布局优化",
            "2. 地图选择细节优化",
            "3. 优化软件体验",
          ],
        },

        {
          versionName: "2.1.0",
          timestamp: "2020/6/10",
          contents: [
            "1. 侧边栏完全展开",
            "2. 首页美化",
            "3. 更新团队介绍",
          ],
        },
        {
          versionName: "2.1.1",
          timestamp: "2020/6/26",
          contents: [
            "1. 算法更新，增加成本预算功能",
            "2. 修改配色",
            "3. 更改为圆角窗体",
            "4. 首页自适应、顶部的菜单栏一体化",
          ],
        },
        {
          versionName: "2.1.2",
          timestamp: "2020/7/5",
          contents: [
            "1. 优化地图查询车辆、节点信息修改方式",
            "2. 按钮美化",
          ],
        },
        {
          versionName: "2.2.0",
          timestamp: "2020/7/10",
          contents: [
            "1. 成本预算可视化",
            "2. 地图实时选择地点",
            "3. 任务列表分页浏览",
            "4. 使用手册更新",
          ],
        },
        {
          versionName: "2.2.1",
          timestamp: "2020/7/15",
          contents: [
            "1. 地图、坐标、路线统一输入风格",
            "2. 地图查询支持添加车辆，坐标",
          ],
        },
        {
          versionName: "2.2.2",
          timestamp: "2020/7/20",
          contents: [
            "1. 路线查询支持添加车辆、节点",
            "2. 解决常见问题窗口滑动",
          ],
        },
        {
          versionName: "2.2.3",
          timestamp: "2020/7/25",
          contents: [
            "1. 查询时判断配送中心和运输中心不匹配问题",
            "2. 抽取相同代码，组件复用",
            "3. 修复少量错误",
          ],
        },
        {
          versionName: "2.2.4",
          timestamp: "2020/7/28",
          contents: [
            "1. 自动判断文件内容并跳转界面",
            "2. 界面优化",
            "3. 修复标签不匹配的错误",
          ],
        },
        {
          versionName: "2.3.0",
          timestamp: "2020/8/1",
          contents: [
            "1. 导入数据可视化（坐标图和力导向图）",
            "2. 查询数据动态修改",
            "3. 支持文件拖动上传",
          ],
        },
        {
          versionName: "2.3.1",
          timestamp: "2020/8/3",
          contents: [
            "1. 坐标查询导入格式优化",
            "2. 查询数据动态修改体验优化",
            "3. 导入数据加载等待",
          ],
        },
        {
          versionName: "2.3.2",
          timestamp: "2020/8/7",
          contents: [
            "1. 添加最小宽度和最小高度",
            "2. 地图查询结果显示优化",
            "3. 优化数据导出",
            "4. 模块分离与精简",
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
