<template>
  <el-container class="content-container">
    <el-header height="auto" style="padding: 20px">
      <div>
        <strong style="width: 140px; color: #5673ff; padding: 10px; font-size: 24px">坐标查询</strong>
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
            :disabled="!queryValue.problem"
          >查询</el-button>

          <el-button
            class="btn-action"
            type="text"
            icon="el-icon-delete"
            @click="clear"
            style="color: #fc5454"
            :disabled="!queryValue.problem"
          >清除数据</el-button>
          <el-button
            class="btn-action"
            @click="handleDownload"
            type="text"
            icon="el-icon-tickets"
            style="color: #fcbe2d"
          >{{!queryValue.problem.nodes ? "格式模板" : "导出查询"}}</el-button>
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
            :disabled="!queryValue.problem"
          >添加节点</el-button>
          <el-button
            class="btn-action"
            @click="visible = true"
            type="text"
            icon="el-icon-set-up"
            style="color: #607d8b"
            :disabled="!queryValue.problem"
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
      </div>
    </el-header>
    <el-container style="overflow:auto" id="container_route">
      <coordinate-list-side
        v-if="type == 'edit' && show"
        v-model="queryValue.problem"
        @onChange="showGraph"
      />
      <el-main style="overflow:hidden; padding: 10px 20px; padding-bottom: 20px;" height="100%">
        <div class="draguploader card" v-if="!show">
          <el-upload
            :before-upload="handleUpload"
            :on-change="handleUploadEnd"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            style="height: 100%; "
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
          id="graph_coordinate"
          height="100%"
          width="100%"
          ref="svg_coordinate"
          v-show="type == 'edit' && show"
        />
        <detail-table
          height="100%"
          width="100%"
          v-if="type == 'table' && show"
          v-model="queryValue.problem"
        />
      </el-main>
      <vehicle-list-side v-if="type == 'edit' && show" v-model="queryValue.problem" />
    </el-container>
    <drawer v-model="drawerValue" height="100%"/>
    <query-dialog v-model="queryValue"></query-dialog>
    <add-coordinate-dialog
      v-model="queryValue.problem.nodes"
      :visible.sync="visible1"
      @onAdd="showGraph"
    ></add-coordinate-dialog>
    <add-vehicle-dialog v-model="queryValue.problem" :visible.sync="visible"></add-vehicle-dialog>

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
import AddVehicleDialog from "../dialog/add-vehicle-dialog";
import AddCoordinateDialog from "../dialog/add-coordinate-dialog";
import CoordinateListSide from "../side/side-list-coordinate";
import VehicleListSide from "../side/side-list-vehicle";
import DetailTable from "../table/table-detail";

import sheetFormat from "../../../util/sheet-format";
import p2eu from "../../../util/problem-to-excel-utils";

export default {
  components: {
    drawer,
    QueryDialog,
    AddVehicleDialog,
    AddCoordinateDialog,
    CoordinateListSide,
    VehicleListSide,
    DetailTable,
  },

  data() {
    return {
      loading: false,
      file: {
        uploaded: 0,
        all: 1,
      },
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
        name: "",
        fileName: undefined,
        problem: {},
        time: "",
        isHistory: false,
        type: "coordinate",
      },
      stdcolumns: [],
      polylinePath: [],
      vehicles: [],
      temp_vehicle: { id: "xx", depot: 1, load: 2, mileage: 50, count: 5 },
      need_options: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      node_types: [
        { type: "depot", title: "中心节点" },
        { type: "customer", title: "客户节点" },
        { type: "other", title: "其它节点" },
      ],
      visible: false,
      visible1: false,
      show: false,
      asideCollapse: true,
      showDialog: false,
      type: "",
      temp_name: undefined,
    };
  },

  mounted() {
    // console.log("mounted");
  },

  activated() {
    let file = this.$route.params.uploadFile;
    if (file) {
      this.handleUpload(file);
    }
  },

  methods: {
    clear() {
      this.show = false;
      let svgChildren = d3.selectAll("svg#graph_coordinate > *");
      svgChildren.remove();
      this.queryValue.problem = {};
      this.queryValue.fileName = undefined;
    },

    handleUploadEnd() {
      this.loading = false;
      console.log("this.loading = false;", this.loading);
    },

    selectShowMode(mode) {
      console.log("test");
      this.type = mode;
      this.showDialog = false;
      this.queryValue.fileName = this.temp_name;
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

    handleUpload(file) {
      this.temp_name = file.name;
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
      if (sheetFormat.IsCoordinateFile(dsNodes, dsVehicles)) {
        this.queryValue.fileName = file.name;
        this.sheetsToProblem(dsNodes, dsVehicles);
        this.showDialog = true;
        // var me = this;
        // setTimeout(function () {
        //   me.sheetsToProblem(dsNodes, dsVehicles);
        //   me.showGraph();
        //   setTimeout(function () {
        //     me.loading = false;
        //   }, 0);
        // }, 0);
        return false;
      } else if (sheetFormat.IsRouteFile(dsNodes, dsVehicles)) {
        this.show = false;
        var me = this;
        this.$confirm(
          "该文件是线路查询文件，是否跳转到线路查询页面？",
          "格式错误",
          {
            confirmButtonText: "确定",
            type: "error",
          }
        )
          .then(() => {
            this.$router.push({
              name: "page_route",
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
      let svgChildren = d3.selectAll("svg#graph_coordinate > *");
      svgChildren.remove();
      this.queryValue.problem = {};
      let problem = {
        routeMode: false,
        nodes: [],
        edges: "euc2d",
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
        for (let j in sheetFormat.CoordinateFile.nodes) {
          let it = sheetFormat.CoordinateFile.nodes[j];
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
        for (let j = 0; j < sheetFormat.CoordinateFile.vehicles.length; j++) {
          let it = sheetFormat.CoordinateFile.vehicles[j];
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

      this.vehicles = problem["vehicles"];
      this.polylinePath = problem["nodes"];

      this.queryValue.problem = problem;
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

        // 设置参数
        this.queryValue.problem.distancePrior = this.drawerValue.distancePrior,
        this.queryValue.problem.timePrior = this.drawerValue.timePrior,
        this.queryValue.problem.loadPrior = this.drawerValue.loadPrior,
        this.queryValue.problem.speed = this.drawerValue.speedValue,
        this.queryValue.problem.maxiter = this.drawerValue.maxIter,

        this.queryValue.show = true;
      }
    },

    handleDownload() {
      p2eu.coordinateToExcel(
        this,
        this.queryValue.problem,
        this.queryValue.fileName == undefined
          ? "坐标查询文件"
          : this.queryValue.fileName
      );
    },

    showGraph() {
      let svgChildren = d3.selectAll("svg#graph_coordinate > *");
      svgChildren.remove();
      var problem = this.queryValue.problem;
      let data = problem.nodes;

      let width = document.getElementById("container_route").clientWidth * 0.6;
      let height = document.getElementById("container_route").clientHeight;
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
          return d.name + "(" + d.x + ", " + d.y + ")";
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
    },
  },
};
</script>
<style >
.draguploader {
  height: 100%;
  width: 100%;
}
.draguploader .el-upload-dragger {
  height: 100%;
  width: 100%;
  padding-top: 14%;
}
.draguploader .el-upload.el-upload--text {
  height: 100%;
  width: 100%;
}
</style>
<style scoped>
el-container::-webkit-scrollbar {
  width: 0;
}
</style>>
<style src="../../../assets/btn.css" scoped></style>
<style src="../../../assets/spinner.css" scoped></style>
