<template>
  <d2-container type="card" style="background: #fff;">
    <template slot="header" style="background: #fff;">
      <el-button-group class="btn-circle">
        <el-col :span="3.2">
          <el-upload :before-upload="handleUpload" action="default">
            <el-button
              class="btn-upload"
              style="border-top-right-radius: 0px;border-bottom-right-radius: 0px;"
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
        <el-button @click="handleDownload" class="btn-warning">
          格式模板
          <!-- <i class="el-icon-download el-icon--right"></i> -->
        </el-button>
        <el-button @click="refresh" class="btn-dark">刷新</el-button>
        <el-button class="btn-blue-grey" @click="drawerValue.drawerShow = true">设置算法参数</el-button>
      </el-button-group>
      <el-collapse @change="handleChange" class="yaoqiu">
        <el-collapse-item name="1">
          <template slot="title">
            <div style="background-image:linear-gradient(to right,#667db6, #0082c8,#0082c8,#667db6);width:100%;text-align:center;color:white;">
              <b>路线查询文件内容要求</b>
              </div>
          </template>
          <span class="s">
             <div style="color:red;text-align:center;">
               <b>进入路线形式的查询，你需要按照要求调整文件格式，以下字段必须在文件的第一行出现，字段的顺序可任意：</b>
             </div>
            <br />
            <table border="1px" style="border-collapse:collapse;margin-left:1%">
              <tr>
                <th>type</th>
                <th>name_a</th>
                <th>demand</th>
                <th>serviceTime</th>
                <th>beginTime</th>
                <th>endTime</th>
                <th>Vehicle_type</th>
                <th>Vehicles_id</th>
                <th>Vehicle_load</th>
                <th>Vehicle_number</th>
                <th>Vehicle_mileage</th>
                <th>Center_name</th>
                <th>0</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>...</th>
              </tr>
            </table>
            <div class="s">
              <b>type</b>：点的类型，depot——配送中心，customer——客户点，other——其他类型的点
              <br /><b>name_a</b>：点的数字编号
              <br /><b>demand</b>：客户的需求量，配送中心也可以写，这不影响路线的计算
              <br /><b>serviceTime</b>：自定义该点的服务时间（默认：5min)
              <br /><b>beginTime</b>：客户点接受配送到达的最早时间（单位默认：min)
              <br /><b>endTime</b>：客户点接受配送到达的最迟时间（单位默认：min)
              <br /><b>Vehicle_load</b>：车辆载重（单位默认：t)
              <br /><b>Vehicle_number</b>：该车辆类型的数量，可不做配置
              <br /><b>Vehicle_mileage</b>：车辆里程，（默认：35km)
              <br /><b>Center_name</b>：车辆所在配送中心的名字，对应type="depot"类型点的的编号
              <br /><b>0、1、2对应的字段为name_a</b>
            </div>
          </span>
        </el-collapse-item>
      </el-collapse>
    </template>
    <!-- <div class="d2-mb"> -->
    <!-- <el-upload :before-upload="handleUpload" action="default">
        <el-button type="success">
          <d2-icon name="file-o" />导入.xlsx/.xls
        </el-button>
    </el-upload>-->
    <!-- </div> -->
    <div contenteditable="true">
      <el-table :header-cell-style="{background:'#e4e5e6'}" v-bind="table" height="550">
        <el-table-column
          v-for="(item, index) in table.columns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </el-table>
    </div>
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
        maxIter: 200
      },
      queryValue: {
        show: false,
        name: "", //距离优先
        problem: {},
        time: "",
        isHistory: false,
        type: "route"
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
      { label: "name_a", prop: "name_a" },
      { label: "demand", prop: "demand" },
      { label: "serviceTime", prop: "serviceTime" },
      { label: "beginTime", prop: "beginTime" },
      { label: "endTime", prop: "endTime" },
      { label: "Vehicle_type", prop: "Vehicle_type" },
      { label: "Vehicle_load", prop: "Vehicle_load" },
      { label: "Vehicle_number", prop: "Vehicle_number" },
      { label: "Vehicle_mileage", prop: "Vehicle_mileage" },
      { label: "Center_name", prop: "Center_name" }
    ];
  },
  methods: {
    refresh() {
      this.reload();
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
          // console.log(this.stdcolumns[i].label)
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
        console.log("outdata:", outdata);
      });
      return false;
    },

    inquery() {
      // eslint-disable-next-line camelcase
      // var num_node = this.input;
      // console.log(num_node);
      if (outdata == null) {
        this.$confirm("还未选择文件打开哦", "温馨提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        }).catch(() => {
          this.$notify.info({
            title: "消息",
            message: "未选择文件打开",
            type: "warning"
          });
        });
        return false;
      } else {
        console.log(outdata);
        let problem = [];
        outdata.map(v => {
          // let i = num_node
          let obj = {};
          obj.nodes = {
            type: v["type"],
            id: v["name_a"],
            demand: v["demand"],
            service_time: v["serviceTime"],
            tw_beg: v["beginTime"],
            tw_end: v["endTime"]
          };
          // obj.edge = { u: v['begin'], v: v['end'], w: v['load_length'] }
          obj.list = { list_num: v["name_a"] };
          obj.vehicles = {
            id: v["Vehicle_type"],
            depot: v["Center_name"],
            load: v["Vehicle_load"],
            count: v["Vehicle_number"],
            mileage: v["Vehicle_mileage"]
            // count: 5
          };
          obj.distancePrior = 5;
          obj.timePrior = 1;
          obj.loadPrior = 4;
          problem.push(obj);
        });
        console.log(problem);
        // eslint-disable-next-line camelcase
        let new_outdata = [];
        for (var i = 0; i < outdata.length; i++) {
          outdata.map(v => {
            let obj = {};
            obj = { u: v["name_a"], v: i, w: v[i] };
            if (obj.w == undefined || obj.w < 0 || obj.u == obj.v) {
            } else {
              new_outdata.push(obj);
            }
          });
        }
        console.log(new_outdata);
        // eslint-disable-next-line camelcase
        let new_list = problem.map(obj => {
          return obj.list;
        });
        console.log(new_list);
        let new_nodes = problem.map(obj => {
          return obj.nodes;
        });
        console.log("nodes:");
        console.log(new_nodes);
        for (let i = new_nodes.length - 1; i >= 0; i--) {
          if (
            new_nodes[i].type === undefined ||
            new_nodes[i].id === undefined
          ) {
            new_nodes.splice(i, 2); // 删除excel数据中出现的undefined
          }
        }
        console.log(new_nodes);
        // let new_edges = problem.map(obj => {
        //   return obj.edge
        // })
        // eslint-disable-next-line camelcase
        let new_vehicles = problem.map(obj => {
          if (obj.vehicles !== undefined) {
            return obj.vehicles;
          } else {
            console.log("value is undefined");
          }
        });
        // new_vehicles.splice(0);
        console.log(new_vehicles);
        for (let i = new_vehicles.length - 1; i >= 0; i--) {
          if (
            new_vehicles[i].load === undefined
            // ||new_vehicles[i].count === undefined
          ) {
            new_vehicles.splice(i, 2); // 删除excel数据中出现的undefined
          }
        }
        console.log(new_vehicles);
        // eslint-disable-next-line camelcase
        let new_test = {
          distancePrior: 5, // 路程加权
          timePrior: 1, // 用时加权
          loadPrior: 4 // 满载率加权
        };
        console.log(new_test);
        // eslint-disable-next-line camelcase
        // var new_problem;
        var new_problem = {
          routeMode: true,
          nodes: new_nodes,
          edges: new_outdata,
          vehicles: new_vehicles,
          distancePrior: this.drawerValue.distancePrior,
          timePrior: this.drawerValue.timePrior,
          loadPrior: this.drawerValue.loadPrior,
          speed: this.drawerValue.speedValue,
          maxiter: this.drawerValue.maxIter
        };
        console.log(new_problem);
        // this.$router.push({
        //   name: "page_result",
        //   query: {
        //     problem: new_problem
        //   }
        // });
        this.queryValue.problem = new_problem;
        this.queryValue.show = true;
        //刷新四个参数的值
        this.distancePrior = "";
        this.timePrior = "";
        this.loadPrior = "";
        this.speed_value = "";
        console.log(this.distancePrior);
      }
    },
    handleChange(val) {
      console.log(val);
    },
    handleDownload() {
      // var columns = [];
      // for (var i in this.stdcolumns) {
      //   columns.push({
      //     label: this.stdcolumns[i].label,
      //     prop: this.stdcolumns[i].prop
      //   });
      // }
      // columns.push({ label: "0", prop: "0" });
      // columns.push({ label: "1", prop: "1" });
      // columns.push({ label: "...", prop: "..." });
      // console.log("columns:", columns);
      // this.$export.excel({
      //   title: "路线查询文件",
      //   columns
      // });

      var table = [];
      let row = this.stdcolumns.map(item => {
        return item.label;
      });
      row.push("0");
      row.push("1");
      row.push("...");
      table.push(row);

      // 创建book
      var wb = xlsx.utils.book_new();
      // json转sheet
      var ws = xlsx.utils.aoa_to_sheet(table);
      // sheet写入book
      xlsx.utils.book_append_sheet(wb, ws, "query");
      // 输出
      ipcRenderer.send("open-save-dialog", "路线查询文件");
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
