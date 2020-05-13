<template>
  <d2-container type="card">
    <template slot="header">
      <el-button @click="inquery">
        <d2-icon name="search" />查询
      </el-button>
      <el-button @click="handleDownload">下载表头示例</el-button>
      <el-collapse @change="handleChange">
        <el-collapse-item title="坐标形式查询文件表头要求" name="1">
          <span>
            进入坐标形式的查询，你需要按照要求调整文件格式，以下字段必须在文件的第一行出现，字段的顺序随意：
            <br />
            <table border="1px" style="border-collapse:collapse">
              <tr>
                <th>type</th>
                <th>name</th>
                <th>x</th>
                <th>y</th>
                <th>demand</th>
                <th>Vehicle_load</th>
                <th>Vehicle_number</th>
                <th>Vehicle_mileage</th>
                <th>Vehicle_id</th>
              </tr>
            </table>type：点的类型，depot——配送中心，customer——配送点，other——其他类型的点
            <br />name：点的名字或者编号
            <br />x：点的横坐标（单位默认：km)
            <br />y: 点的纵坐标（单位默认：km)
            <br />demand：点的需求量，配送中心也可以写，这不影响路线的计算
            <br />Vehicle_load：车辆载重量
            <br />Vehicle_number：该车辆的数量
            <br />Vehicle_mileage：车辆里程
            <br />Vehicle_id：车辆所在配送中心的名字或者编号，对应type=depot的name值
          </span>
        </el-collapse-item>
      </el-collapse>
    </template>
    <div class="d2-mb">
      <el-upload :before-upload="handleUpload" action="default">
        <el-button type="success">
          <d2-icon name="file-o" />导入 .xlsx/.xls
        </el-button>
      </el-upload>
    </div>
    <div contenteditable="true">
    <el-table v-bind="table">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
    </el-table>
    </div>
  </d2-container>
</template>

<script>
import Vue from "vue";
import pluginImport from "@d2-projects/vue-table-import";
Vue.use(pluginImport);
var outdata;
export default {
  data() {
    return {
      table: {
        columns: [],
        data: [],
        size: "mini",
        stripe: true,
        border: true
      }
    };
  },
  methods: {
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
        console.log(outdata);
      });
      return false;
    },
    inquery() {
      if (outdata == null) {
        alert("请先上传文件");
      } else {
        console.log("未处理的outdata:");
        console.log(outdata);
        let problem = [];
        outdata.map(v => {
          let obj = {};
          // obj.nodes={type:v["type"],id:v["name"],x:v["X"],y:v["Y"],demand:v["demand"]};
          // obj.edges = "euc2d";
          obj.nodes = {
            type: v["type"],
            id: v["name"],
            demand: v["demand"]
          };
          obj.edges = { x: v["X"], y: v["Y"] };
          obj.vehicles = {
            id: v["name"],
            depot: v["Vehicle_id"],
            load: v["Vehicle_load"],
            count: v["Vehicle_number"]
          };
          obj.distancePrior = 5;
          obj.timePrior = 1;
          obj.loadPrior = 4;
          problem.push(obj);
        });
        console.log(problem);
        let new_nodes = problem.map(obj => {
          return obj.nodes;
        });
        // let newproblem_edges = {
        //   edges: "euc2d"
        // };
        let newproblem_edges = problem.map(obj => {
          return obj.edges;
        });
        let new_vehicles = problem.map(obj => {
          if (obj.vehicles !== undefined) {
            return obj.vehicles;
          } else {
            console.log("value is undefined");
          }
        });
        // new_vehicles.splice(0);
        console.log(new_vehicles);
        for (var i = new_vehicles.length - 1; i >= 0; i--) {
          if (
            new_vehicles[i].load == undefined ||
            new_vehicles[i].count == undefined
          ) {
            new_vehicles.splice(i, 2); // 删除excel数据中出现的undefined
          }
        }
        console.log(new_vehicles);
        let new_test = {
          distancePrior: 5, // 路程加权
          timePrior: 1, // 用时加权
          loadPrior: 4 // 满载率加权
        };
        console.log(new_test);
        newproblem_edges = {
          routeMode: false,
          nodes: new_nodes,
          edges: newproblem_edges,
          vehicles: new_vehicles,
          distancePrior: new_test.distancePrior,
          timePrior: new_test.timePrior,
          loadPrior: new_test.loadPrior
        };
        // newproblem_edges=newproblem_edges.filter( res=> {return res!="undefined"});
        // newproblem_edges.filter(Boolean);
        console.log(newproblem_edges);
        this.$router.push({
          name: "page_result",
          query: {
            problem: newproblem_edges
          }
        });
      }
    },
    handleChange(val) {
      console.log(val);
    },
    handleDownload() {
      alert("下载");
    }
  }
};
</script>
