<template>
  <el-container class="content-container" style="overflow:auto;overflow-x: hidden !important;">
    <el-header height="auto" style="padding: 20px">
      <div>
        <strong style="width: 140px; color: #5673ff; padding: 10px; font-size: 24px">路线查询</strong>
        <!-- <el-button class="btn-action" type="text" icon="el-icon-menu" style="color: #5673ff;">
          <strong>总计（{{ querys.length }}）</strong>
        </el-button>-->
      </div>
      <el-button-group class="card" style="margin-top: 20px">
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
    </el-header>
    <el-container style="height:68%" id="container_route">
      <route-list-side v-if="show" v-model="queryValue.problem" @onBeforeChange="onBeforeChange"  @onChange="showGraph"/>
      <el-main style="padding: 10px 20px" height="100%">
        <el-table
          v-show="!show"
          class="card"
          :header-cell-style="{background:'#e4e5e6'}"
          v-bind="table"
          height="100%"
        >
          <template slot="empty">
            <img src="../../../assets/images/路线.png" width="30%" />
            <img src="../../../assets/images/暂无数据3.png" width="80%" />
          </template>
          <el-table-column
            v-for="(item, index) in table.columns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          ></el-table-column>
        </el-table>
        <svg id="graph_route" height="100%" width="100%" ref="svg_route" v-show="show" />
      </el-main>
      <vehicle-list-side v-if="show" v-model="queryValue.problem" />
    </el-container>
    <el-footer height="auto" style="padding: 20px">
      <div style="height:0.5em"></div>
      <el-collapse
        class="card"
        @change="handleChange"
        style="padding: 0.1em;background-color:#add8e6"
      >
        <el-collapse-item name="1">
          <template slot="title">
            <div style="text-align:center;color:#000;width:100%">
              <b>路线查询文件内容要求</b>
            </div>
          </template>
          <el-divider></el-divider>
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
              <br />
              <b>name_a</b>：点的数字编号
              <br />
              <b>demand</b>：客户的需求量，配送中心也可以写，这不影响路线的计算
              <br />
              <b>serviceTime</b>：自定义该点的服务时间（默认：5min)
              <br />
              <b>beginTime</b>：客户点接受配送到达的最早时间（单位默认：min)
              <br />
              <b>endTime</b>：客户点接受配送到达的最迟时间（单位默认：min)
              <br />
              <b>Vehicle_load</b>：车辆载重（单位默认：t)
              <br />
              <b>Vehicle_number</b>：该车辆类型的数量，可不做配置
              <br />
              <b>Vehicle_mileage</b>：车辆里程，（默认：35km)
              <br />
              <b>Center_name</b>：车辆所在配送中心的名字，对应type="depot"类型点的的编号
              <br />
              <b>0、1、2对应的字段为name_a</b>
            </div>
          </span>
        </el-collapse-item>
      </el-collapse>
    </el-footer>
    <drawer v-model="drawerValue" />
    <query-dialog v-model="queryValue"></query-dialog>
    <add-route-dialog v-model="queryValue.problem" :visible.sync="visible1" @onAdd="showGraph"></add-route-dialog>
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
import AddRouteDialog from "../dialog/add-route-dialog";
import AddVehicleDialog from "../dialog/add-vehicle-dialog";
import RouteListSide from "../side/side-list-route";
import VehicleListSide from "../side/side-list-vehicle";
Vue.use(pluginExport);
Vue.use(pluginImport);
export default {
  inject: ["reload"], //注入依赖
  components: {
    drawer,
    QueryDialog,
    AddVehicleDialog,
    AddRouteDialog,
    RouteListSide,
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
      },
      queryValue: {
        show: false,
        name: "", //距离优先
        problem: {},
        time: "",
        isHistory: false,
        type: "route",
      },
      table: {
        columns: [],
        data: [],
        size: "mini",
        stripe: true,
        border: true,
      },
      stdcolumns: [],
      // polylinePath: [],
      // vehicles: [],
      // need_options: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      // node_types: [
      //   { type: "depot", title: "中心节点" },
      //   { type: "customer", title: "子节点" },
      //   { type: "other", title: "其它节点" },
      // ],
      visible: false,
      visible1: false,
      show: false,
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
      // { label: "Use_cost", prop: "Use_cost" },
      // { label: "Driving_cost", prop: "Driving_cost" },
      // { label: "Waiting_cost", prop: "Waiting_cost" },
      { label: "Vehicle_mileage", prop: "Vehicle_mileage" },
      { label: "Center_name", prop: "Center_name" },
    ];
    this.coorColumns = [
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
  },
  activated() {
    let file = this.$route.params.uploadFile;
    if (file) {
      this.handleUpload(file);
    }
  },
  methods: {
    refresh() {
      this.reload();
    },
    clear() {
      // this.table = {
      //   columns: [],
      //   data: [],
      //   size: "mini",
      //   stripe: true,
      //   border: true,
      // };
      let svgChildren = d3.selectAll("svg#graph_route > *");
      svgChildren.remove();
      this.show = false;
    },

    handleUpload(file) {
      this.show = true;
      this.$import.xlsx(file).then(({ header, results }) => {
        // 判断是否是线路格式的文件
        let isRouteFile = true;
        let lostLabel = null;
        for (var i in this.stdcolumns) {
          if (!header.includes(this.stdcolumns[i].label)) {
            isRouteFile = false;
            lostLabel = this.stdcolumns[i].label;
            break;
          }
        }

        // 判断是否是坐标格式的文件
        let isCoorFile = !isRouteFile;
        if (isCoorFile) {
          for (let j in this.coorColumns) {
            if (!header.includes(this.coorColumns[j].label)) {
              isCoorFile = false;
              break;
            }
          }
        }

        // 线路查询文件
        if (isRouteFile) {
          this.tableToPreblem(results);
          this.showGraph();

          // 坐标查询文件
        } else if (isCoorFile) {
          this.show = false;
          var me = this;
          this.$confirm(
            "该文件是坐标查询文件，是否跳转到坐标查询页面？",
            "格式错误",
            {
              confirmButtonText: "确定",
              type: "error",
            }
          )
            .then(() => {
              this.$router.push({
                name: "page_coordinate",
                params: {
                  uploadFile: file,
                },
              });
            })
            .catch(() => {
              // pass
            })
            .finally(() => {
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

    tableToPreblem(results) {
      console.log(results);
      let problem = [];
      var costModeFlag = false;
      results.map((v) => {
        // let i = num_node
        let obj = {};
        obj.nodes = {
          type: v["type"],
          id: v["name_a"],
          name: "" + v["name_a"],
          demand: v["demand"],
          service_time: v["serviceTime"],
          tw_beg: v["beginTime"],
          tw_end: v["endTime"],
        };
        // obj.edge = { u: v['begin'], v: v['end'], w: v['load_length'] }
        obj.list = { list_num: v["name_a"] };
        obj.vehicles = {
          id: v["Vehicle_type"],
          depot: v["Center_name"],
          load: v["Vehicle_load"],
          count: v["Vehicle_number"],
          useCost: v["Use_cost"],
          drivingCost: v["Driving_cost"],
          waitingCost: v["Waiting_cost"],
          mileage: v["Vehicle_mileage"],
          // count: 5
        };
        if (v["Use_cost"] || v["Driving_cost"] || v["Waiting_cost"]) {
          costModeFlag = true;
        }
        obj.distancePrior = 5;
        obj.timePrior = 1;
        obj.loadPrior = 4;
        problem.push(obj);
      });
      console.log(problem);
      // eslint-disable-next-line camelcase
      let new_results = [];
      for (var i = 0; i < results.length; i++) {
        results.map((v) => {
          let obj = {};
          obj = { u: v["name_a"], v: i, w: v[i] };
          if (obj.w == undefined || obj.w < 0 || obj.u == obj.v) {
          } else {
            new_results.push(obj);
          }
        });
      }
      console.log(new_results);
      // eslint-disable-next-line camelcase
      let new_list = problem.map((obj) => {
        return obj.list;
      });
      console.log(new_list);
      let new_nodes = problem.map((obj) => {
        return obj.nodes;
      });
      console.log("nodes:");
      console.log(new_nodes);
      for (let i = new_nodes.length - 1; i >= 0; i--) {
        if (new_nodes[i].type === undefined || new_nodes[i].id === undefined) {
          new_nodes.splice(i, 2); // 删除excel数据中出现的undefined
        }
      }
      console.log(new_nodes);

      let new_vehicles = problem.map((obj) => {
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
        loadPrior: 4, // 满载率加权
      };
      console.log(new_test);
      var new_problem = {
        routeMode: true,
        costMode: costModeFlag,
        nodes: new_nodes,
        edges: new_results,
        vehicles: new_vehicles,
        distancePrior: this.drawerValue.distancePrior,
        timePrior: this.drawerValue.timePrior,
        loadPrior: this.drawerValue.loadPrior,
        speed: this.drawerValue.speedValue,
        maxiter: this.drawerValue.maxIter,
      };
      console.log(new_problem);
      // this.vehicles = new_vehicles;
      // this.polylinePath = new_nodes;
      this.queryValue.problem = new_problem;

      console.log(this.distancePrior);
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
            type: "warning",
          });
        });
        return false;
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
        //刷新四个参数的值
        this.distancePrior = "";
        this.timePrior = "";
        this.loadPrior = "";
        this.speed_value = "";
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
      let row = this.stdcolumns.map((item) => {
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
      ipcRenderer.once("selectedItem", function (e, path) {
        if (path != null) {
          xlsx.writeFile(wb, path);
        }
      });
    },
    onBeforeChange() {
      let svgChildren = d3.selectAll("svg#graph_route > *");
      svgChildren.remove();
    },
    showGraph() {
      let svgChildren = d3.selectAll("svg#graph_route > *");
      svgChildren.remove();
      var problem = this.queryValue.problem;

      // 准备数据
      var nodes = [];
      let indexs = new Map();
      problem.nodes.forEach((node, index) => {
        indexs.set(node.id, index);
        nodes.push({
          type: node.type,
          id: node.id,
          name: node.name,
        });
      });

      var edges = [];



      problem.edges.forEach(function (edge) {
        // edges.push({
        //   source: edge.u,
        //   target: edge.v,
        //   value: edge.w,
        // });
        edges.push({
          source: indexs.get(edge.u),
          target: indexs.get(edge.v),
          value: edge.w,
        });
      });

      console.log('nodes=' + JSON.stringify(nodes));
      console.log('edges=' + JSON.stringify(edges));

      // let width = this.$refs["container_route"].clientWidth * 0.5;
      // let height = this.$refs["container_route"].clientHeight;
      let width = document.getElementById('container_route').clientWidth * 0.6;
      let height = document.getElementById('container_route').clientHeight;
      var marge = { top: 10, bottom: 10, left: 10, right: 10 };

      let svg = d3
        .select("svg#graph_route")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 " + width + " " + height);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

      var legend = svg.append("g");

      var zoom = d3
        .zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", () => {
          g.attr("transform", d3.event.transform);
        });
      svg.call(zoom);

      var forceSimulation = d3
        .forceSimulation()
        .force("path", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());
      this.forceSimulation = forceSimulation;
      // 生成节点数据
      forceSimulation.nodes(nodes).on("tick", ticked);
      // 生成边数据
      forceSimulation
        .force("path")
        .links(edges)
        .distance(function (d) {
          // 每一边的长度
          if (d.value > 9) {
            return (Math.sqrt(d.value) + 6) * 40;
          }
          return d.value * 40;
        });

      // 设置图形的中心位置
      forceSimulation
        .force("center")
        .x(width / 2)
        .y(height / 2);

      // 绘制边
      var links = g
        .append("g")
        .selectAll("path")
        .data(edges)
        .enter()
        .append("path")
        .attr("stroke", function (d, i) {
          return "#ccc";
        })
        .attr("stroke-width", 1);
      // .attr("marker-end", function (d, i) {
      //   var refX = 30;
      //   nodes.forEach(function (node) {
      //     if (node.name === d.target.toString()) {
      //       refX = node.group * 15;
      //     }
      //   });
      //   var arrowMarker = svg
      //     .append("marker")
      //     .attr("id", "arrow" + i)
      //     .attr("markerUnits", "userSpaceOnUse")
      //     .attr("markerWidth", "16")
      //     .attr("markerHeight", "15")
      //     .attr("viewBox", "0 0 12 12")
      //     .attr("refX", refX)
      //     .attr("refY", 6)
      //     .attr("orient", "auto")
      //     .append("svg:path")
      //     .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
      //     .attr("fill", function () {
      //       return "#000000";
      //     });
      //   if (d.vid !== undefined) {
      //     return "url(#arrow" + i + ")";
      //   }
      //   return "url(#end)";
      // });

      // 边上文字
      var linksText = g
        .append("g")
        .selectAll("text")
        .data(edges)
        .enter()
        .append("text")
        .text(function (d) {
          return d.value.toFixed(2);
        });
      // 建立用来放在每个节点和对应文字的分组<g>
      var gs = g
        .selectAll(".circleText")
        .data(nodes)
        .enter()
        .append("g")
        // .attr("transform", function (d, i) {
        //   var cirX = d.x;
        //   var cirY = d.y;
        //   return "translate(" + cirX + "," + cirY + ")";
        // })
        .call(
          d3.drag().on("start", started).on("drag", dragged).on("end", ended)
        );

      // 绘制节点
      gs.append("circle")
        // .attr("r",20)
        .attr("r", function (d, i) {
          if (d.type == "depot") {
            return 30;
          } else if (d.type == "customer") {
            return 22.5;
          } else {
            return 15;
          }
          // 圆圈半径
        })
        .attr("fill", function (d, i) {
          if (d.type == "depot") {
            return "#fc5454";
          } else if (d.type == "customer") {
            return "#02c58d";
            // return "#ccc"
          } else {
            return "#fcbe2d";
          }
        });
      // 文字
      gs.append("text")
        .attr("text-anchor", "middle")
        // .attr("font-size", "14px")
        .attr("dominant-baseline", "middle")
        .attr("fill", function (d) {
          return "#fff";
        })
        .attr("font-size", function (d) {
          return "16px";
        })
        .text(function (d) {
          return d.name;
        });

      function ticked() {
        links.attr("fill", "transparent").attr("d", linkArc);

        linksText
          .attr("x", function (d) {
            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", function (d) {
            return (d.source.y + d.target.y) / 2;
          });

        gs.attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      }
      // drag
      function started(d) {
        if (!d3.event.active) {
          // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
          forceSimulation.alphaTarget(0.8).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function ended(d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }

      function linkArc(d) {
        // console.log('linkArc linkArc linkArc')
        var dx = d.target.x - d.source.x;
        var dy = d.target.y - d.source.y;
        var dr = Math.sqrt(dx * dx + dy * dy);
        var arc = 0;

        return (
          "M" +
          d.source.x +
          "," +
          d.source.y +
          "A" +
          arc +
          "," +
          arc +
          " 0 0," +
          0 +
          " " +
          d.target.x +
          "," +
          d.target.y
        );
      }
    },
  },
};
</script>
<style>
</style>
<style src="../../../assets/btn.css" scoped></style>
