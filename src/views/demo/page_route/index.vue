<template>
  <el-container class="content-container">
    <!-- style="overflow:hidden" -->
    <el-header height="auto" style="padding: 20px">
      <div>
        <strong style="width: 140px; color: #5673ff; padding: 10px; font-size: 24px">路线查询</strong>
        <el-button
          v-if="queryValue.fileName != undefined"
          class="btn-action"
          type="text"
          icon="el-icon-document"
          style="color: #5673ff;"
        >
          <strong>{{ queryValue.fileName }}</strong>
        </el-button>
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
        >{{queryValue.problem.nodes == undefined ? "格式模板" : "导出查询"}}</el-button>
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
        <el-button
          v-if="show"
          class="btn-action"
          @click="toggleShowMode"
          type="text"
          icon="el-icon-set-up"
          style="color: #607d8b"
        >{{ type == 'edit' ? '表格模式' : '图形模式' }}</el-button>
      </el-button-group>
    </el-header>
    <el-container id="container_route" style="overflow:auto;overflow-x: hidden !important;">
      <route-list-side
        v-if="type == 'edit' && show"
        v-model="queryValue.problem"
        @onChange="showGraph"
        @onAddEdge="onAddEdge"
        @onShowDetail="onShowDetail"
      />
      <el-main style="padding: 10px 20px; padding-bottom: 20px;" height="100%">
        <div class="draguploader card" v-if="!show">
          <el-upload
            :before-upload="handleUpload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            style="height: 100%;"
          >
            <div style="left: 0; top: 0; right: 0; bottom: 0; margin: auto;">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击选取文件</em>
              </div>
            </div>
          </el-upload>
        </div>
        <svg
          style="overflow:hidden;"
          id="graph_route"
          height="100%"
          width="100%"
          ref="svg_route"
          v-show="type == 'edit' && show"
        />
        <detail-table
          style="overflow:auto !important;overflow-x: hidden !important;"
          height="100%"
          width="100%"
          v-show="type == 'table' && show"
          v-model="queryValue.problem"
        />
      </el-main>
      <vehicle-list-side v-if="type == 'edit' && show" v-model="queryValue.problem" />
    </el-container>
    <drawer v-model="drawerValue" />
    <query-dialog v-model="queryValue"></query-dialog>
    <add-route-dialog v-model="queryValue.problem" :visible.sync="visible1" @onAdd="showGraph"></add-route-dialog>
    <add-vehicle-dialog v-model="queryValue.problem" :visible.sync="visible"></add-vehicle-dialog>
    <add-edge-dialog
      v-model="queryValue.problem"
      :visible.sync="visible2"
      :node="temp_node"
      @add="showGraph"
    />
    <detail-edge-dialog
      v-model="queryValue.problem"
      :visible.sync="visible3"
      :node="temp_node"
      :edge="temp_edge"
      @save="onSaveEdge"
    />
    <el-dialog title="加载中" :show-close="false" :visible.sync="loading" width="20%" center>
      <div class="cssload-container">
        <div class="cssload-item cssload-moon"></div>
      </div>
    </el-dialog>
    <el-dialog title="选择模式" width="30%" :visible.sync="showDialog">
      <el-row>
        <el-col :span="12">
          <div style="text-align: center; margin-top: 40px;margin-bottom: 40px;">
            <el-button height="40px" type="primary" @click="selectShowMode('table')">表格模式</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="text-align: center; margin-top: 40px;margin-bottom: 40px;">
            <el-button height="40px" class="btn-success" @click="selectShowMode('edit')">图形模式</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </el-container>
</template>

<script>
import * as d3 from "d3";
import * as xlsx from "xlsx";

import drawer from "../drawer/";
import QueryDialog from "../dialog/query-dialog";
import AddRouteDialog from "../dialog/add-route-dialog";
import AddVehicleDialog from "../dialog/add-vehicle-dialog";
import RouteListSide from "../side/side-list-route";
import VehicleListSide from "../side/side-list-vehicle";
import AddEdgeDialog from "../dialog/add-edge-dialog";
import DetailEdgeDialog from "../dialog/detail-edge-dialog";
import DetailTable from "../table/table-detail";

import p2eu from "../../../util/problem-to-excel-utils";
import sheetFormat from "../../../util/sheet-format";

export default {
  inject: ["reload"], //注入依赖
  components: {
    drawer,
    QueryDialog,
    AddVehicleDialog,
    AddRouteDialog,
    RouteListSide,
    VehicleListSide,
    AddEdgeDialog,
    DetailEdgeDialog,
    DetailTable,
  },

  data() {
    return {
      loading: false,
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
        name: "",
        fileName: undefined,
        problem: {},
        time: "",
        isHistory: false,
        type: "route",
      },
      stdcolumns: [],
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      temp_node: {},
      temp_edge: {},
      show: false,
      asideCollapse: true,
      showDialog: false,
      type: "",
    };
  },

  mounted() {
    console.log("mounted");
  },

  activated() {
    let file = this.$route.params.uploadFile;
    if (file) {
      this.handleUpload(file);
    }
  },

  methods: {
    selectShowMode(mode) {
      console.log("test");
      this.type = mode;
      this.showDialog = false;
      if (this.type == "edit") {
        var me = this;
        setTimeout(function () {
          me.loading = true;

          setTimeout(function () {
            me.show = true;
            console.log("showGraph");
            me.showGraph();
            setTimeout(function () {
              me.loading = false;
            }, 0);
          }, 0);
        }, 500);
      } else if (this.type == "table") {
        this.show = true;
      }
    },

    toggleShowMode() {
      console.log("toggleShowMode");
      if (this.type == "table") {
        var me = this;
        me.loading = true;
        setTimeout(function () {
          me.type = "edit";
          setTimeout(function () {
            console.log("showGraph");
            me.showGraph();
            setTimeout(function () {
              me.loading = false;
            }, 0);
          }, 0);
        }, 100);
      } else if (this.type == "edit") {
        this.type = "table";
      }
    },

    onAddEdge(node) {
      this.temp_node = node;
      this.visible2 = true;
    },

    onShowDetail(val) {
      console.log("onShowDetail val=" + JSON.stringify(val));
      console.log("onShowDetail edge=" + JSON.stringify(val.edge));
      console.log("onShowDetail node=" + JSON.stringify(val.node));
      this.temp_edge = val.edge;
      this.temp_node = val.node;
      this.visible3 = true;
    },

    onSaveEdge(oldEdge, newEdge) {
      for (let i = this.queryValue.problem.edges.length - 1; i >= 0; i--) {
        let edge = this.queryValue.problem.edges[i];
        if (
          (edge.u == oldEdge.u && edge.v == oldEdge.v) ||
          (edge.u == oldEdge.v && edge.v == oldEdge.u)
        ) {
          this.queryValue.problem.edges.splice(i, 1);
        }
      }
      this.queryValue.problem.edges.push({
        u: newEdge.u,
        v: newEdge.v,
        w: newEdge.w,
      });
      this.showGraph();
    },

    refresh() {
      this.reload();
    },

    clear() {
      this.queryValue.problem = {};
      let svgChildren = d3.selectAll("svg#graph_route > *");
      svgChildren.remove();
      this.show = false;
      this.queryValue.fileName = undefined;
    },

    handleUpload(file) {
      let workbook = xlsx.read(file.path, { type: "file" });
      let dsNodes = xlsx.utils.sheet_to_json(workbook.Sheets["节点信息"]);
      let dsVehicles = xlsx.utils.sheet_to_json(workbook.Sheets["车辆信息"]);
      if (
        !dsNodes ||
        !dsVehicles ||
        dsNodes.length == 0 ||
        dsVehicles.length == 0
      ) {
        this.$confirm("查询文件必须包含点信息和车辆信息", "格式错误", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "error",
        });
        return false;
      }
      if (sheetFormat.IsRouteFile(dsNodes, dsVehicles)) {
        this.queryValue.fileName = file.name;
        this.sheetsToProblem(dsNodes, dsVehicles);
        this.showDialog = true;
        // this.loading = true;
        // this.show = true;
        // var me = this;
        // setTimeout(function () {
        //   me.sheetsToProblem(dsNodes, dsVehicles);
        //   me.showGraph();
        //   setTimeout(function () {
        //     me.loading = false;
        //   }, 0);
        // }, 0);
        return false;
      } else if (sheetFormat.IsCoordinateFile(dsNodes, dsVehicles)) {
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
      } else {
        var me = this;
        this.$confirm("查询文件格式不正确", "格式错误", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "error",
        });
        return false;
      }
      return false;
    },

    sheetsToProblem(dsNodes, dsVehicles) {
      let problem = {
        routeMode: true,
        costMode: false,
        nodes: [],
        edges: [],
        vehicles: [],
        distancePrior: this.drawerValue.distancePrior,
        timePrior: this.drawerValue.timePrior,
        loadPrior: this.drawerValue.loadPrior,
        speed: this.drawerValue.speedValue,
        maxiter: this.drawerValue.maxIter,
      };

      let aNodes = [];
      for (let i in dsNodes) {
        let tmp = {};
        for (let j in sheetFormat.RouteFile.nodes) {
          let it = sheetFormat.RouteFile.nodes[j];
          if (typeof dsNodes[i][it.label] != undefined) {
            tmp[it.field] = dsNodes[i][it.label];
          } else if (!it.required && it.default) {
            tmp[it.field] = it.default;
          }
        }
        aNodes.push(tmp);
      }
      for (let i = 0; i < aNodes.length; i++) {
        aNodes[i]['name'] = aNodes[i]['id'];
      }
      problem["nodes"] = aNodes;

      let aVehicles = [];
      for (let i = 0; i < dsVehicles.length; i++) {
        let tmp = {};
        for (let j = 0; j < sheetFormat.RouteFile.vehicles.length; j++) {
          let it = sheetFormat.RouteFile.vehicles[j];
          if (typeof dsVehicles[i][it.label] != undefined) {
            tmp[it.field] = dsVehicles[i][it.label];
          } else if (!it.required && it.default) {
            tmp[it.field] = it.default;
          }
        }
        if (tmp["Use_cost"] || tmp["Driving_cost"] || tmp["Waiting_cost"]) {
          problem["costMode"] = true;
        }
        aVehicles.push(tmp);
      }
      problem["vehicles"] = aVehicles;

      // 导入边，假设邻接矩阵是对称矩阵
      let aEdges = [];
      for (let i = 0; i < dsNodes.length; i++) {
        for (let j = 0; j < i; j++) {
          if (dsNodes[i][j]) {
            aEdges.push({ u: i, v: j, w: dsNodes[i][j] });
          }
        }
      }
      problem["edges"] = aEdges;

      this.vehicles = problem["vehicles"];
      this.polylinePath = problem["nodes"];

      this.queryValue.problem = problem;

      this.loading = false;
    },
    inquery() {
      if (JSON.stringify(this.queryValue.problem) === "{}") {
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
            message: "客户节点过少！请添加客户节点",
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
        console.log(depotsId);
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
      p2eu.routeToExcel(
        this,
        this.queryValue.problem,
        this.queryValue.fileName == undefined
          ? "路线查询文件"
          : this.queryValue.fileName
      );
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
        edges.push({
          source: indexs.get(edge.u),
          target: indexs.get(edge.v),
          value: edge.w,
        });
      });

      console.log("nodes=" + JSON.stringify(nodes));
      console.log("edges=" + JSON.stringify(edges));

      let width = document.getElementById("container_route").clientWidth * 0.6;
      let height = document.getElementById("container_route").clientHeight;
      var marge = { top: 10, bottom: 10, left: 10, right: 10 };

      let svg = d3
        .select("svg#graph_route")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 " + width + " " + height);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

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
<style >
.draguploader {
  /* height: 100%; */
  /* width: 100%;             */
}
.draguploader .el-upload-dragger {
  height: 100%;
  width: 100%;
  padding: 12%;
}
.draguploader .el-upload.el-upload--text {
  height: 100%;
  width: 100%;
}
</style>
<style src="../../../assets/btn.css" scoped></style>
<style src="../../../assets/spinner.css" scoped></style>

