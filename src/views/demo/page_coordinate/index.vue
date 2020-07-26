<template>
  <d2-container type="card" style="background: #fff;">
    <template slot="header">
      <el-button-group>
        <el-col :span="3.2">
          <el-upload :before-upload="handleUpload" action="default">
            <el-button
              class="btn-upload"
              style="border-top-right-radius: 0px;border-bottom-right-radius: 0px;background-color:#005C97;"
            >
              打开
              <!-- <i class="el-icon-upload el-icon--right"></i> -->
            </el-button>
          </el-upload>
        </el-col>
        <el-button @click="inquery" class="btn-success">
          查询
          <!-- <i class="fa fa-search" aria-hidden="true"></i> -->
        </el-button>
        <el-button class="btn-danger" @click="clear">
          清除数据
          <!-- <i class="fa fa-close" aria-hidden="true"></i> -->
        </el-button>
        <el-button @click="handleDownload"  style="background-color:#99cbf9">
          格式模板
          <!-- <i class="el-icon-download el-icon--right"></i> -->
        </el-button>
        <!-- <el-button @click="refresh" class="btn-dark">刷新</el-button> -->
        <el-button @click="drawerValue.drawerShow = true" style="background-color:#fdae9f">设置算法参数</el-button>
      </el-button-group>
      <el-collapse @change="handleChange" class="yaoqiu">
        <el-collapse-item name="1">
          <template slot="title">
            <div style="background-image:linear-gradient(to right,#667db6, #0082c8,#0082c8,#667db6);width:100%;text-align:center;color:white;">
              <b>坐标查询文件内容要求</b>
              </div>
          </template>
           <el-divider></el-divider>
          <span class="s">
            <div style="color:red;text-align:center;"><b>坐标形式的查询，你需要按照要求调整文件格式，以下字段必须在文件的第一行出现，字段的顺序可任意：</b></div>
            <br />
            <table border="1px" style="border-collapse:collapse;margin-left:1%">
              <tr>
                <th>type</th>
                <th>name</th>
                <th>X</th>
                <th>Y</th>
                <th>demand</th>
                <th>serviceTime</th>
                <th>beginTime</th>
                <th>endTime</th>
                <th>Vehicle_type</th>
                <th>Vehicle_load</th>
                <th>Vehicle_number</th>
                <th>Vehicle_mileage</th>
                <th>Center_name</th>
              </tr>
            </table>
            <div class="s">
              <br><b>type</b>：点的类型，depot——配送中心，customer——客户点，other——其他类型的点
              <br /><b>name</b>：点的名字或者编号
              <br /><b>X</b>：点的横坐标（单位默认：km)
              <br /><b>Y</b>：点的纵坐标（单位默认：km)
              <br /><b>demand</b>：点的需求量，配送中心也可以写，这不影响路线的计算
              <br /><b>serviceTime</b>：自定义该点的服务时间（默认：5min)
              <br /><b>beginTime</b>：客户点接受配送到达的最早时间（单位默认：min)
              <br /><b>endTime</b>：客户点接受配送到达的最迟时间（单位默认：min)
              <br /><b>Vehicle_type</b>：车辆类型
              <br /><b>Vehicle_load</b>：车辆载重
              <br /><b>Vehicle_number</b>：该车辆类型的数量
              <br /><b>Vehicle_mileage</b>：车辆里程
             <br /><b>Use_cost</b>：车辆每次使用成本 （默认：200元每次) 
              <br /><b>Driving_cost</b>：车辆每小时行驶成本  （默认：100元每小时) 
              <br /><b>Waiting_cost</b>：车辆每小时空闲等待成本 （默认：24元每小时) 
              <br /><b>Center_name</b>：车辆所在配送中心的名字，对应type=depot的name值
            </div>
          </span>
        </el-collapse-item>
      </el-collapse>
    </template>
    <el-table :header-cell-style="{background:'#e4e5e6'}" v-bind="table" height="550">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
    </el-table>
    <drawer v-model="drawerValue" />
    <query-dialog v-model="queryValue"></query-dialog>
  </d2-container>
</template>

<script>
import * as xlsx from "xlsx";
import { ipcRenderer } from "electron";
import Vue from "vue";
import pluginImport from "@d2-projects/vue-table-import";
import pluginExport from "@d2-projects/vue-table-export";
import drawer from "../drawer/";
import QueryDialog from "../dialog/query-dialog";
Vue.use(pluginExport);
Vue.use(pluginImport);
var outdata;
export default {
  inject: ["reload"], //注入依赖
  components: {
    drawer,
    QueryDialog
  },
  data() {
    return {
      drawerValue: {
        drawerShow: false,
        distancePrior: 5, //距离优先
        timePrior: 1, //时间优先
        loadPrior: 4, //满载率优先
        speedValue: 10,
        maxIter: 200,
      },
      queryValue: {
        show: false,
        name: '', //距离优先
        problem: {},
        time: '',
        isHistory: false,
        type: 'coordinate'
      },
      table: {
        columns: [],
        data: [],
        size: "mini",
        stripe: true,
        border: true
      },
      stdcolumns: []
    };
  },
  mounted() {
    console.log("mounted");
    this.stdcolumns = [
      { label: "type", prop: "type" },
      { label: "name", prop: "name" },
      { label: "X", prop: "X" },
      { label: "Y", prop: "Y" },
      { label: "demand", prop: "demand" },
      { label: "serviceTime", prop: "serviceTime" },
      { label: "beginTime", prop: "beginTime" },
      { label: "endTime", prop: "endTime" },
      { label: "Vehicle_type", prop: "Vehicle_type" },
      { label: "Vehicle_load", prop: "Vehicle_load" },
      { label: "Vehicle_number", prop: "Vehicle_number" },
      { label: "Vehicle_mileage", prop: "Vehicle_mileage" },
      // { label: "Use_cost", prop: "Use_cost" },
      // { label: "Driving_cost", prop: "Driving_cost" },
      // { label: "Waiting_cost", prop: "Waiting_cost" },
      { label: "Center_name", prop: "Center_name" }
    ];
  },
  methods: {
    refresh() {
      this.reload();
      // this.$router.replace( this.$router)
      // Object.assign(this.$data, this.$options.data())
    },
    clear() {
      this.table = {
        columns: [],
        data: [],
        size: "mini",
        stripe: true,
        border: true
      };
    },
    handleUpload(file) {
      this.$import.xlsx(file).then(({ header, results }) => {
        this.table.columns = header.map(e => {
          return {
            label: e,
            prop: e
          };
        });
        this.table.data = results;
        outdata = results;
        for (var i in this.stdcolumns) {
          console.log(this.stdcolumns[i].label);
          if (!header.includes(this.stdcolumns[i].label)) {
            var me = this;
            this.$confirm(
              "表头缺少字段" + me.stdcolumns[i].label + ",请检查格式",
              "格式错误",
              {
                confirmButtonText: "确定",
                showCancelButton: false,
                type: "error"
              }
            );
            return false;
          }
        }
      });
      return false;
    },
    inquery() {
      if (outdata == null) {
        this.$confirm("还未选择文件打开哦", "温馨提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        }).catch(() => {
          this.$notify.info({
            title: "消息",
            message: "未选择文件打开"
          });
        });
        return false;
      } else {
        let problem = [];
        var costModeFlag = false;
        outdata.map(v => {
          let obj = {};
          obj.nodes = {
            type: v["type"],
            id: v["name"],
            demand: v["demand"],
            service_time: v["serviceTime"],
            tw_beg: v["beginTime"],
            tw_end: v["endTime"],
            x: v["X"],
            y: v["Y"]
          };
          // obj.edges = { x: v['X'], y: v['Y'] }
          obj.vehicles = {
            id: v["Vehicle_type"],
            depot: v["Center_name"],
            load: v["Vehicle_load"],
            count: v["Vehicle_number"],
            mileage: v["Vehicle_mileage"],
            useCost: v["Use_cost"],
            drivingCost: v["Driving_cost"],
            waitingCost: v["Waiting_cost"]
          };
          if (v["Use_cost"] || v["Driving_cost"] ||v["Waiting_cost"]) {
            costModeFlag =true;
          }
          problem.push(obj);
        });
        // eslint-disable-next-line camelcase
        let new_nodes = problem.map(obj => {
          return obj.nodes;
        });
        let newproblem_edges = "euc2d";

        // eslint-disable-next-line camelcase
        let new_vehicles = problem.map(obj => {
          if (obj.vehicles !== undefined) {
            return obj.vehicles;
          } else {
            console.log("value is undefined");
          }
        });
        for (let i = new_vehicles.length - 1; i >= 0; i--) {
          if (
            new_vehicles[i].load === undefined ||
            new_vehicles[i].id === undefined
          ) {
            new_vehicles.splice(i, 2); // 删除excel数据中出现的undefined
          }
        }
        // eslint-disable-next-line camelcase
        let new_test = {
          distancePrior: 5, // 路程加权
          timePrior: 1, // 用时加权
          loadPrior: 4 // 满载率加权
        };
        // eslint-disable-next-line camelcase

        newproblem_edges = {
          routeMode: false,
          costMode: costModeFlag,
          nodes: new_nodes,
          edges: newproblem_edges,
          vehicles: new_vehicles,
          distancePrior: this.drawerValue.distancePrior,
          timePrior: this.drawerValue.timePrior,
          loadPrior: this.drawerValue.loadPrior,
          speed: this.drawerValue.speedValue,
          maxiter: this.drawerValue.maxIter
        };

        console.log("problem:" + JSON.stringify(newproblem_edges));
        // this.$router.push({
        //   name: "page_result",
        //   query: {
        //     problem: newproblem_edges
        //   }
        // });
        this.queryValue.problem = newproblem_edges;
        this.queryValue.show = true;
        //刷新四个参数的值
        // this.distancePrior = "";
        // this.timePrior = "";
        // this.loadPrior = "";
        // this.speed_value = "";
        // this.speed_value = "";
        // console.log(this.distancePrior);
      }
    },
    handleChange(val) {
      console.log(val);
    },
    handleDownload() {
      var table = [];
      table.push(
        this.stdcolumns.map(item => {
          return item.label;
        })
      );

      // 创建book
      var wb = xlsx.utils.book_new();
      // json转sheet
      var ws = xlsx.utils.aoa_to_sheet(table);
      // sheet写入book
      xlsx.utils.book_append_sheet(wb, ws, "query");
      // 输出
      ipcRenderer.send("open-save-dialog", "坐标查询文件");
      ipcRenderer.once("selectedItem", function(e, path) {
        if (path != null) {
          xlsx.writeFile(wb, path);
        }
      });
    }
  }
};
</script>
<style>
.d2-layout-header-aside-group
  .d2-layout-header-aside-content
  .d2-theme-container
  .d2-theme-container-main
  .d2-theme-container-main-body
  .container-component
  .d2-container-card
  .d2-container-card__header {
  padding: 20px;
  background: #fff;
}
.d2-layout-header-aside-group
  .d2-layout-header-aside-content
  .d2-theme-container
  .d2-theme-container-main
  .d2-theme-container-main-body
  .container-component
  .d2-container-card
  .d2-container-card__body
  .d2-container-card__body-card {
  position: relative;
  margin-bottom: 20px;
  padding: 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: #fff;
}
</style>
<style src="../../../assets/btn.css" scoped></style>
