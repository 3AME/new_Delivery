<template>
  <d2-container style="padding: 0px 0px; background: #fff;">
    <div style="background: #fff;">
      <el-timeline style="padding: 60px;">
        <el-timeline-item v-for="(item, index) in versions" :key="index" :timestamp="item.timestamp" placement="top">
          <el-card>
            <div slot="header" class="clearfix">
              <span style="font-size: 16px; color:black">Version {{ item.versionName }}</span>
            </div>

            <p v-for="(content, i) in item.contents" :key="i" style="color: black">{{ content }}</p>
          </el-card>
        </el-timeline-item>
        <!-- <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item> -->
      </el-timeline>
    </div>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      versions: [
        {
          versionName: '1.0.0',
          timestamp: '2020/5/1',
          contents: [
            '1. 初始化项目模板'
          ]
        },
        {
          versionName: '1.0.1',
          timestamp: '2020/5/6',
          contents: [
            '1. 实现路线查询和坐标查询UI',
            '2. 实现历史记录UI'
          ]
        },
        {
          versionName: '1.0.2',
          timestamp: '2020/5/12',
          contents: [
            '1. 对接后端算法',
            '2. 支持地图查看',
            '3. 实现历史记录持久化'
          ]
        },

        {
          versionName: '1.0.3',
          timestamp: '2020/5/16',
          contents: [
            '1. 支持地图地点选择',
            '2. 完善路线查询和坐标查询',
            '3. 实现查询结果UI'
          ]
        },
        {
          versionName: '1.0.4',
          timestamp: '2020/5/18',
          contents: [
            '1. 查询结果界面以图表的形式显示结果，支持查看路线详情',
            '2. 优化地图查询',
            '3. 优化主题配色',
            '4. 算法更新，支持多配送点，支持多线程运行'
          ]
        },
        {
          versionName: '1.0.5',
          timestamp: '2020/5/20',
          contents: [
            '1. 新增页面刷新功能',
            '2. 添加关于我们界面',
            '3. 新增常见问题界面',
            '4. 新增使用手册界面'
          ]
        },
        {
          versionName: '1.0.6',
          timestamp: '2020/5/25',
          contents: [
            '1. 新增测试数据',
            '2. 解决一些bug',
            '3. 支持配置算法参数'
          ]
        },
        {
          versionName: '1.0.7',
          timestamp: '2020/5/30',
          contents: [
            '1. 新增历史版本界面',
            '2. 新增显示算法收敛曲线',
            '3. 新增显示车辆载重柱状图和车辆路程柱状图',
            '4. 更新软件图标'
          ]
        }
      ]
    };
  }
};
</script>

<style>
.theme-line
  .d2-theme-container
  .d2-theme-container-main
  .d2-theme-container-main-body
  .container-component
  .d2-container-full {
  border: 0px solid #cfd7e5;
  border-top: none;
  border-bottom: none;
}

.theme-line .d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .container-component .d2-container-full .d2-container-full__body {
    background: #ffffff;
}

/* .el-card {
    border: 1px solid #EBEEF5;
    background-color: #E4F3FB;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
} */

</style>
