<template>
  <el-tabs ref="tabs" v-model="activeName" type="card" height="100%" width="100%"  style="overflow-y: hidden">
    <el-tab-pane label="节点信息" name="first" style="overflow-y: hidden">
      <el-table ref="table" :data="value.nodes" :height="fixedHeight" style="width: 100%; overflow: auto; overflow-x: hidden !important;">
        <el-table-column prop="id" label="节点ID"></el-table-column>
        <el-table-column prop="type" label="节点类型">
          <template slot-scope="scope">
            {{scope.row.type == 'depot' ? '配送中心' : (scope.row.type == 'customer' ? '客户节点' : '其他节点') }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="节点名称"></el-table-column>
        <el-table-column v-if="!value.routeMode" prop="x" label="横坐标"></el-table-column>
        <el-table-column v-if="!value.routeMode" prop="y" label="纵坐标"></el-table-column>
        <el-table-column prop="demand" label="需求量"></el-table-column>
        <el-table-column prop="service_time" label="服务时间"></el-table-column>
        <el-table-column prop="tw_beg" label="最早时间"></el-table-column>
        <el-table-column prop="tw_end" label="最迟时间"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane v-if="value.routeMode" label="路线信息" name="second">
      <el-table :data="value.edges" :height="fixedHeight" style="width: 100%; overflow: auto; overflow-x: hidden !important;">
        <el-table-column prop="u" label="起始节点"></el-table-column>
        <el-table-column prop="v" label="目的节点"></el-table-column>
        <el-table-column prop="w" label="距离"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="车辆信息" name="third">
      <el-table :data="value.vehicles" :height="fixedHeight" style="width: 100%; overflow: auto; overflow-x: hidden !important;">
        <el-table-column prop="id" label="类型"></el-table-column>
        <el-table-column prop="load" label="车辆载重"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="mileage" label="最大往返里程"></el-table-column>
        <el-table-column prop="depot" label="配送中心"></el-table-column>
        <el-table-column prop="useCost" label="车辆使用成本"></el-table-column>
        <el-table-column prop="drivingCost" label="每公里行驶成本"></el-table-column>
        <el-table-column prop="waitingCost" label="空闲等待成本"></el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      activeName: "first",
      fixedHeight: 800
    };
  },
  mounted () {
    console.log('table-detail mounted');
      // 实现表头固定
      this.$nextTick(() => {
        // 初始化表格高度
        this.updateHeight();
        // 窗口大小改变时更新表格高度
        window.onresize = this.updateHeight;
      });
  },
  beforeDestroy () {
      // 离开该页面时删除onresize事件
      window.onresize = null;
  },
  methods: {
    updateHeight() {
      let windowHeight = window.innerHeight;
      let tableTop = this.$refs.table.$el.getBoundingClientRect().top;
      let padding = 30;
      console.log('tableTop = ' + tableTop);
      this.fixedHeight = windowHeight - tableTop - padding;
      console.log('fixedHeight=' + this.fixedHeight);
    }
  }
};
</script>

<style>
</style>
