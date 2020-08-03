<template>
  <el-container class="content-container" style="overflow:auto;overflow-x: hidden !important;">
    <el-header height="auto" style="padding: 20px">
      <div>
        <strong style="width: 140px; color: #5673ff; padding: 10px; font-size: 24px">坐标查询</strong>
      </div>
      <div style="margin-top: 20px">
        <el-button-group class="card">
          <el-col :span="3.2">
            <el-upload :before-upload="handleUpload" action="default">
              <el-button
                class="btn-action"
                type="text"
                icon="el-icon-document-add"
                style="color: #409eff"
              >打开</el-button>
            </el-upload>
          </el-col>
          <el-button
            class="btn-action"
            @click="inquery"
            type="text"
            icon="el-icon-search"
            style="color: #02c58d"
            :disabled="queryValue.problem.nodes == undefined"
          >查询</el-button>

          <el-button
            class="btn-action"
            type="text"
            icon="el-icon-delete"
            @click="clear"
            style="color: #fc5454"
            :disabled="queryValue.problem.nodes == undefined"
          >清除数据</el-button>
          <el-button
            class="btn-action"
            @click="handleDownload"
            type="text"
            icon="el-icon-tickets"
            style="color: #fcbe2d"
          >格式模板</el-button>
          <el-button
            class="btn-action"
            @click="drawerValue.drawerShow = true"
            type="text"
            icon="el-icon-set-up"
            style="color: #607d8b"
          >设置算法参数</el-button>
          <el-button
            class="btn-action"
            @click="visible1 = true"
            type="text"
            icon="el-icon-set-up"
            style="color: #607d8b"
            :disabled="queryValue.problem.nodes == undefined"
          >添加节点</el-button>
          <el-button
            class="btn-action"
            @click="visible = true"
            type="text"
            icon="el-icon-set-up"
            style="color: #607d8b"
            :disabled="queryValue.problem.nodes == undefined"
          >添加车辆</el-button>
        </el-button-group>
      </div>
    </el-header>
    <el-container style="overflow:auto;overflow-x: hidden !important;">
      <coordinate-list-side v-if="show" v-model="queryValue.problem" />
      <el-main style="padding: 10px 20px" height="100%">
        <el-table
          v-if="!show"
          class="card"
          :header-cell-style="{background:'#e4e5e6'}"
          v-bind="table"
          height="100%"
        >
          <template slot="empty">
            <img src="../../../assets/images/坐标.png" style="width: 80%" />
            <img src="../../../assets/images/暂无数据3.png" style="width: 80%" />
          </template>
          <el-table-column
            v-for="(item, index) in table.columns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          ></el-table-column>
        </el-table>
        <svg id="graph_coordinate" height="100%" width="100%" ref="svg_coordinate" v-show="show" />
      </el-main>
      <vehicle-list-side v-if="show" v-model="queryValue.problem" />
    </el-container>
    <el-footer height="auto" style="padding: 20px; ">
      <el-collapse
        class="card"
        @change="handleChange"
        style="padding: 0.1em;background-color:#9fb6cd;"
      >
        <el-collapse-item name="1">
          <template slot="title">
            <div style="text-align:center;color:#000;width:100%">
              <!-- <div style="text-align:center;"> -->
              <b>坐标查询文件内容要求</b>
              <!-- </div> -->
            </div>
          </template>
          <el-divider></el-divider>
          <span class="s" style="background-color:#f0f8ff;">
            <div style="color:red;text-align:center;">
              <b>坐标形式的查询，你需要按照要求调整文件格式，以下字段必须在文件的第一行出现，字段的顺序可任意：</b>
            </div>
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
              <br />
              <b>type</b>：点的类型，depot——配送中心，customer——客户点，other——其他类型的点
              <br />
              <b>name</b>：点的名字或者编号
              <br />
              <b>X</b>：点的横坐标（单位默认：km)
              <br />
              <b>Y</b>：点的纵坐标（单位默认：km)
              <br />
              <b>demand</b>：点的需求量，配送中心也可以写，这不影响路线的计算
              <br />
              <b>serviceTime</b>：自定义该点的服务时间（默认：5min)
              <br />
              <b>beginTime</b>：客户点接受配送到达的最早时间（单位默认：min)
              <br />
              <b>endTime</b>：客户点接受配送到达的最迟时间（单位默认：min)
              <br />
              <b>Vehicle_type</b>：车辆类型
              <br />
              <b>Vehicle_load</b>：车辆载重
              <br />
              <b>Vehicle_number</b>：该车辆类型的数量
              <br />
              <b>Vehicle_mileage</b>：车辆里程
              <br />
              <b>Center_name</b>：车辆所在配送中心的名字，对应type=depot的name值
            </div>
          </span>
        </el-collapse-item>
      </el-collapse>
    </el-footer>
    <drawer v-model="drawerValue" />
    <query-dialog v-model="queryValue"></query-dialog>
    <add-coordinate-dialog v-model="queryValue.problem.nodes" :visible.sync="visible1"></add-coordinate-dialog>
    <add-vehicle-dialog v-model="queryValue.problem" :visible.sync="visible"></add-vehicle-dialog>
  </el-container>
</template>

<script>
import * as d3 from "d3";
import * as xlsx from "xlsx";
import { ipcRenderer } from "electron";
import Vue from "vue";
import pluginImport from "@d2-projects/vue-table-import";
import pluginExport from "@d2-projects/vue-table-export";
import drawer from "../drawer/";
import QueryDialog from "../dialog/query-dialog";
import AddVehicleDialog from "../dialog/add-vehicle-dialog";
import AddCoordinateDialog from "../dialog/add-coordinate-dialog";
// import AddCoordinatePopover from "../popover/add-coordinate-popover";
// import VehicleDetailPopover from "../popover/popover-detail-vehicle";
import CoordinateListSide from "../side/side-list-coordinate";
import VehicleListSide from "../side/side-list-vehicle";
Vue.use(pluginExport);
Vue.use(pluginImport);
export default {
  components: {
    drawer,
    QueryDialog,
    AddVehicleDialog,
    AddCoordinateDialog,
    // VehicleDetailPopover,
    // AddCoordinatePopover,
    CoordinateListSide,
    VehicleListSide,
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
        costPrior: false,
      },
      queryValue: {
        show: false,
        name: "", //距离优先
        problem: {},
        time: "",
        isHistory: false,
        type: "coordinate",
      },
      table: {
        columns: [],
        data: [],
        size: "mini",
        stripe: true,
        border: true,
      },
      stdcolumns: [],
      polylinePath: [],
      vehicles: [],
      temp_vehicle: { id: "xx", depot: 1, load: 2, mileage: 50, count: 5 },
      need_options: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      node_types: [
        { type: "depot", title: "中心节点" },
        { type: "customer", title: "子节点" },
        { type: "other", title: "其它节点" },
      ],
      visible: false,
      visible1: false,
      show: false,
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
      { label: "Center_name", prop: "Center_name" },
    ];
    this.routeColumns = [
      { label: "type", prop: "type" },
      { label: "name_a", prop: "name_a" },
      { label: "demand", prop: "demand" },
      { label: "serviceTime", prop: "serviceTime" },
      { label: "beginTime", prop: "beginTime" },
      { label: "endTime", prop: "endTime" },
      { label: "Vehicle_type", prop: "Vehicle_type" },
      { label: "Vehicle_load", prop: "Vehicle_load" },
      { label: "Vehicle_number", prop: "Vehicle_number" },
      // { label: "Use_cost", prop: "Use_cost" },
      // { label: "Driving_cost", prop: "Driving_cost" },
      // { label: "Waiting_cost", prop: "Waiting_cost" },
      { label: "Vehicle_mileage", prop: "Vehicle_mileage" },
      { label: "Center_name", prop: "Center_name" },
    ];
  },
  activated() {
    let file = this.$route.params.uploadFile;
    if (file) {
      this.handleUpload(file);
    }
  },
  methods: {
    clear() {
      // this.table = {
      //   columns: [],
      //   data: [],
      //   size: "mini",
      //   stripe: true,
      //   border: true,
      // };
      this.show = false;
      let svgChildren = d3.selectAll("svg#graph_coordinate > *");
      svgChildren.remove();
    },

    handleUpload(file) {
      this.show = true;
      this.$import.xlsx(file).then(({ header, results }) => {

        // 判断是否是坐标格式的文件
        let isCoorFile = true;
        let lostLabel = null;
        for (var i in this.stdcolumns) {
          if (!header.includes(this.stdcolumns[i].label)) {
            isCoorFile = false;
            lostLabel = this.stdcolumns[i].label;
            break;
          }
        }

        // 判断是否是线路格式的文件
        let isRouteFile = !isCoorFile;
        if (isRouteFile) {
          for (let j in this.routeColumns) {
            if (!header.includes(this.routeColumns[j].label)) {
              isRouteFile = false;
              break;
            }
          }
        }

        // 坐标查询文件
        if (isCoorFile) {
          this.tableToPreblem(results);
          this.showScatterGraph();

        // 线路查询文件
        } else if (isRouteFile) {
          this.show = false;
          var me = this;
          this.$confirm(
            "该文件是线路查询文件，是否跳转到线路查询页面？",
            "格式错误",
            {
              confirmButtonText: "确定",
              type: "error",
            }
          ).then(() => {
            this.$router.push({
              name: "page_route",
              params: {
                uploadFile: file
              }});
          }).catch(() => {
            // pass
          }).finally(() => {
            return false;
          });

        // 格式错误
        } else {
          var me = this;
          this.$confirm(
            "表头缺少字段" + lostLabel + ",请检查格式",
            "格式错误",
            {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "error",
            }
          );
          return false;
        }
      });

      return false;
    },

    tableToPreblem(outdata) {
      let problem = [];
      var costModeFlag = false;
      outdata.map((v) => {
        let obj = {};
        obj.nodes = {
          type: v["type"],
          id: v["name"],
          name: "" + v["name"],
          demand: v["demand"],
          service_time: v["serviceTime"],
          tw_beg: v["beginTime"],
          tw_end: v["endTime"],
          x: v["X"],
          y: v["Y"],
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
          waitingCost: v["Waiting_cost"],
        };
        console.log("vehicles:" + JSON.stringify(obj.vehicles));
        if (v["Use_cost"] || v["Driving_cost"] || v["Waiting_cost"]) {
          costModeFlag = true;
        }
        problem.push(obj);
      });
      // eslint-disable-next-line camelcase
      let new_nodes = problem.map((obj) => {
        return obj.nodes;
      });
      let newproblem_edges = "euc2d";

      // eslint-disable-next-line camelcase
      let new_vehicles = problem.map((obj) => {
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
        loadPrior: 4, // 满载率加权
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
        maxiter: this.drawerValue.maxIter,
      };
      console.log("new_vehicles:" + JSON.stringify(new_vehicles));
      this.vehicles = new_vehicles;
      this.polylinePath = new_nodes;

      console.log("problem:" + JSON.stringify(newproblem_edges));
      this.queryValue.problem = newproblem_edges;
    },

    inquery() {
      if (this.queryValue.problem == null) {
        this.$confirm("还未选择文件打开哦", "温馨提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning",
        }).catch(() => {
          this.$notify.info({
            title: "消息",
            message: "未选择文件打开",
          });
        });
      } else {
        let depots = this.queryValue.problem.nodes.filter((path) => {
          return path.type == "depot";
        });

        if (depots.length < 1) {
          this.$notify({
            title: "警告",
            message: "请设置配送中心节点！",
            type: "warning",
          });
          return;
        }

        let customers = this.queryValue.problem.nodes.filter((path) => {
          return path.type == "customer";
        });

        if (customers.length < 2) {
          this.$notify({
            title: "警告",
            message: "子节点过少！请添加子节点",
            type: "warning",
          });
          return;
        }

        if (this.queryValue.problem.vehicles.length == 0) {
          this.$notify({
            title: "警告",
            message: "请添加车辆类型",
            type: "warning",
          });
          return;
        }

        let depotsId = depots.map((depot) => {
          return depot.id;
        });
        for (let i = 0; i < this.queryValue.problem.vehicles.length; i++) {
          let vehicle = this.queryValue.problem.vehicles[i];
          console.log("vehicle=" + JSON.stringify(vehicle));
          if (depotsId.indexOf(vehicle.depot) == -1) {
            this.$notify({
              title: "警告",
              message: "车辆类型：" + vehicle.id + "所在的配送中心不存在。",
              type: "warning",
            });
            return;
          }
        }

        this.queryValue.problem.names = this.queryValue.problem.nodes.map(
          (node) => {
            return node.name;
          }
        );
        this.queryValue.show = true;
      }
    },

    handleChange(val) {
      console.log(val);
    },

    handleDownload() {
      var table = [];
      table.push(
        this.stdcolumns.map((item) => {
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
      ipcRenderer.once("selectedItem", function (e, path) {
        if (path != null) {
          xlsx.writeFile(wb, path);
        }
      });
    },
    showScatterGraph() {
      let svgChildren = d3.selectAll("svg#graph_coordinate > *");
      svgChildren.remove();
      var problem = this.queryValue.problem;
      let data = problem.nodes;
      console.log("data=" + JSON.stringify(data));

      let width = this.$refs["svg_coordinate"].clientWidth;
      let height = this.$refs["svg_coordinate"].clientHeight;
      console.log("width=" + width + " height=" + height);
      const margin = { top: 30, right: 60, bottom: 60, left: 60 };

      let svg = d3
        .select("svg#graph_coordinate")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 " + width + " " + height);
      // .attr("viewBox", "0 0 100% 100%");

      // 比例尺
      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.x))
        .nice()
        .range([margin.left, width - margin.right]);
      const y = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.y))
        .nice()
        .range([height - margin.bottom, margin.top]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      // y轴
      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // 绘制坐标点
      svg
        .append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("fill", function (d, i) {
          if (d.type == "depot") {
            return "red";
          } else if (d.type == "customer") {
            return "#02c58d";
          } else {
            return "#fcbe2d";
          }
        })
        .attr("r", 4);

      svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("class", function (d) {
          if (d.type == "depot") {
            return "dot-text text-depot-" + d.id;
          }
          return "dot-text dot-text-" + d.id;
        })
        .attr("x", (d) => x(d.x))
        .attr("y", (d) => y(d.y))
        .text((d) => {
          // if (problem.names !== undefined) {
          //   return problem.names[d.name];
          // }
          // return d.name;
          // return "节点" + d.id + ":(" + d.x + ", " + d.y + ")";
          return d.id + "(" + d.x + ", " + d.y + ")";
        })
        .call(dodge);

      function dodge(text, iterations = 300) {
        const nodes = text.nodes();
        const left = () => text.attr("text-anchor", "middle").attr("dy", "1em");
        const right = () =>
          text.attr("text-anchor", "middle").attr("dy", "1em");
        const top = () => text.attr("text-anchor", "middle").attr("dy", "1em");
        const bottom = () =>
          text.attr("text-anchor", "middle").attr("dy", "1em");
        const points = nodes.map((node) => ({
          fx: +node.getAttribute("x"),
          fy: +node.getAttribute("y"),
        }));
        const labels = points.map(({ fx, fy }) => ({ x: fx, y: fy }));
        const links = points.map((source, i) => ({
          source,
          target: labels[i],
        }));

        const simulation = d3
          .forceSimulation(points.concat(labels))
          .force("charge", d3.forceManyBody().distanceMax(80))
          .force("link", d3.forceLink(links).distance(4).iterations(4))
          .stop();

        for (let i = 0; i < iterations; i += 1) simulation.tick();

        text
          .attr("x", (_, i) => labels[i].x)
          .attr("y", (_, i) => labels[i].y)
          .each(function (_, i) {
            const a = Math.atan2(
              labels[i].y - points[i].fy,
              labels[i].x - points[i].fx
            );
            d3.select(this).call(
              a > Math.PI / 4 && a <= (Math.PI * 3) / 4
                ? bottom
                : a > -Math.PI / 4 && a <= Math.PI / 4
                ? left
                : a > (-Math.PI * 3) / 4 && a <= (Math.PI * 3) / 4
                ? top
                : right
            );
          });
      }

      // addLegend();

      function addLegend() {
        var legend = svg.append("g");
        var textGroup = legend.selectAll("text").data(legendTexts);

        textGroup.exit().remove();

        legend
          .selectAll("text")
          .data(legendTexts)
          .enter()
          .append("text")
          .text(function (d) {
            // return (
            //   '车辆' +
            //   d.id +
            //   '：路程：' +
            //   d.distance.toFixed(2) +
            //   '公里 | 时间：' +
            //   d.time.toFixed(2) +
            //   '小时'
            // )
            return d.id;
            // return d.text
          })
          .attr("class", "legend")
          .attr("y", function (d, i) {
            return i * 20 + 40;
          })
          .attr("x", 90)
          .attr("fill", function (d, i) {
            return legendColors(i);
          });

        var rectGroup = legend.selectAll("rect").data(legendTexts);

        rectGroup.exit().remove();

        legend
          .selectAll("rect")
          .data(legendTexts)
          .enter()
          .append("rect")
          .attr("y", function (d, i) {
            return i * 20 + 28;
          })
          .attr("x", 70)
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", function (d, i) {
            return legendColors(i);
          });
      }
    },
  },
};
</script>
<style>
</style>
<style src="../../../assets/btn.css" scoped></style>
