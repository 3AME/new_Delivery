<template>
  <el-container class="content-container">
    <el-header height="auto" style="padding-top: 20px">
      <div>
        <strong style="width: 140px; color: #5673ff; padding: 10px; font-size: 24px">任务列表</strong>
        <el-button class="btn-action" type="text" icon="el-icon-menu" style="color: #5673ff;">
          <strong>总计（{{ querys.length }}）</strong>
        </el-button>
      </div>
      <div>
        <el-button-group class="card">
          <el-button
            class="btn-action"
            type="text"
            icon="el-icon-delete"
            :style="'color: ' + (multipleSelection.length != 0 ? '#409eff' : '#cccccc') + ';'"
            :disabled="multipleSelection.length == 0"
            @click="deleteSelected"
          >删除</el-button>
          <el-button
            class="btn-action"
            type="text"
            icon="el-icon-tickets"
            :style="'color: ' + (multipleSelection.length == 1 ? '#fcbe2d' : '#cccccc') + ';'"
            :disabled="multipleSelection.length != 1"
            @click="saveQuery(multipleSelection[0])"
          >保存</el-button>
          <el-button
            class="btn-action"
            type="text"
            icon="el-icon-search"
            :style="'color: ' + (multipleSelection.length == 1 ? '#02c58d' : '#cccccc') + ';'"
            :disabled="multipleSelection.length != 1"
            @click="queryProblem(multipleSelection[0])"
          >查询</el-button>
          <el-button
            class="btn-action"
            type="text"
            icon="el-icon-circle-close"
            :style="'color: ' + (tasks.length != 0 ? '#666666' : '#cccccc') + ';'"
            @click="deleteAll()"
            :disabled="querys.length == 0"
          >清空</el-button>
        </el-button-group>
      </div>
    </el-header>
    <el-main>
      <el-table
        class="card"
        :data="tasks"
        height="100%"
        style="padding: 20px 0"
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="title" label="标题">
          <template slot-scope="scope">
            <i class="el-icon-s-order" style="font-size: 18px"></i>
            <strong style="color: black; margin-left: 10px" class="line-1 hover">{{scope.row.title}}</strong>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="日期">
          <template slot-scope="scope">
            <i class="el-icon-time" style="color: #fea82d; font-size: 18px"></i>
            <strong style="color: black; margin-left: 10px" class="line-1 hover">{{scope.row.time}}</strong>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              class="btn-action"
              type="text"
              icon="el-icon-search"
              style="color: #409eff;"
              @click="queryProblem(scope.row)"
            >查询</el-button>
            <el-button
              class="btn-action"
              type="text"
              icon="el-icon-delete"
              style="color: red;"
              @click="deleteQuery(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              class="btn-action"
              type="text"
              icon="el-icon-download"
              style="color: #02c58d;"
              @click="saveQuery(scope.row)"
            >保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer height="auto" style="text-align: center">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :current-page.sync="currentPage"
        :total="querys.length"
        :page-size="5"
        @current-change="handleCurrentChange"
        style="padding: 20px"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import * as xlsx from "xlsx";
import { ipcRenderer } from "electron";
import p2eu from "../../../util/problem-to-excel-utils";
export default {
  data() {
    return {
      popoverVisible: false,
      currentPage: 1,
      tasks: [],
      multipleSelection: [],
    };
  },
  computed: {
    querys() {
      return this.$store.state.d2admin.query.querys;
    },
  },
  activated() {
    // ipcRenderer.send('open-save-dialog', {
    //   method: 'get',
    //   querys: this.querys
    // })
    // ipcRenderer.once('selectedItem', function (e, path) {
    //   if (e.returnValue) {
    //     this.$store.state.d2admin.query.querys = e.returnValue.queryHistory
    //   }
    // })
    // this.$store.dispatch('d2admin/historyLoad', null)
    this.handleCurrentChange(this.currentPage);
  },
  methods: {
    deleteAll() {
      this.$confirm("此操作将删除全部查询任务, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.commit("d2admin/DELETE_ALL_QUERY_DATA");
          this.handleCurrentChange(this.currentPage);
          this.$notify({
            title: "成功",
            message: "全部删除成功",
            type: "success",
          });
        })
        .catch(() => {
          this.$notify.info({
            title: "消息",
            message: "已取消删除",
          });
        });
      // console.log('popoverVisible111=' + this.popoverVisible)
      // this.popoverVisible = false
      // console.log('popoverVisible=' + this.popoverVisible)
      // this.$store.commit('d2admin/DELETE_ALL_QUERY_DATA')
      // this.$notify({
      //   title: '成功',
      //   message: '全部删除成功',
      //   type: 'success'
      // })
    },
    deleteSelected() {
      this.$confirm("此操作将删除已选择的查询任务, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.commit(
            "d2admin/DELETE_QUERY_DATAS",
            this.multipleSelection
          );
          this.handleCurrentChange(this.currentPage);
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => {
          this.$notify.info({
            title: "消息",
            message: "已取消删除",
          });
        });
    },
    queryProblem(row) {
      let queryValue = {
        name: row.title, //距离优先
        problem: row.problem,
        time: row.time,
        isHistory: true,
      };
      this.$router.push({
        name: "page_result",
        query: {
          queryValue: queryValue,
        },
      });
    },
    deleteQuery(index, row) {
      let datas = [];
      datas.push(row);
      this.$store.commit("d2admin/DELETE_QUERY_DATAS", datas);
      this.handleCurrentChange(this.currentPage);
      this.$notify({
        title: "成功",
        message: "删除" + row.title + "成功",
        type: "success",
      });
    },
    saveQuery(row) {
      var problem = row.problem;
      if (problem.routeMode) {
        p2eu.routeToExcel(problem, row.title);
      } else {
        p2eu.coordinateToExcel(problem, row.title);
      }

      // var table = [];

      // let depots = problem.nodes.filter((node) => {
      //   return node.type == "depot";
      // });

      // if (!problem.routeMode) {
      //   depots.forEach((node) => {
      //     let row0 = [
      //       "物流中心" + node.id + "(" + node.x + ", " + node.y + ")",
      //     ];
      //     table.push(row0);
      //   });

      //   var header1 = ["配送节点", "横坐标x(km)", "纵坐标y(km)", "需求量q(t)"];

      //   table.push(header1);

      //   problem.nodes.forEach((node, i) => {
      //     if (node.type === "customer") {
      //       let row = [];
      //       row.push(node.id);
      //       row.push(node.x);
      //       row.push(node.y);
      //       row.push(node.demand);
      //       table.push(row);
      //     }
      //   });
      // } else {
      //   depots.forEach((node) => {
      //     let row0 = [
      //       "物流中心" + node.id + "(" + node.x + ", " + node.y + ")",
      //     ];
      //     table.push(row0);
      //   });

      //   let row0 = ["各配送点与配送中心的距离（/KM）"];
      //   table.push(row0);

      //   let header1 = ["配送节点"];
      //   problem.nodes.forEach((node) => {
      //     header1.push(node.id);
      //   });
      //   table.push(header1);

      //   problem.nodes.forEach((node, i) => {
      //     let row = [];
      //     row.push(node.id);
      //     for (let j = 0; j < problem.nodes.length; j++) {
      //       if (i === j) {
      //         row.push(0);
      //       } else {
      //         row.push("");
      //       }
      //     }
      //     table.push(row);
      //   });

      //   problem.nodes.forEach((node, i) => {
      //     let row = table[i + 2];
      //     problem.edges.forEach((item, j) => {
      //       if (item.u === node.id) {
      //         row[item.v + 1] = item.w;
      //         table[item.v + 2][item.u + 1] = item.w;
      //       }
      //     });
      //   });

      //   table.push([]);

      //   table.push(["各配送点需求量（T）"]);
      //   var row1 = ["配送点"];
      //   var row2 = ["需求量（T)"];
      //   problem.nodes.forEach((node, i) => {
      //     if (node.type === "customer") {
      //       row1.push(node.id);
      //       row2.push(node.demand);
      //     }
      //   });
      //   table.push(row1);
      //   table.push(row2);
      // }

      // // 创建book
      // var wb = xlsx.utils.book_new();
      // // json转sheet
      // var ws = xlsx.utils.aoa_to_sheet(table);
      // // sheet写入book
      // xlsx.utils.book_append_sheet(wb, ws, "query");
      // // 输出
      // ipcRenderer.send("open-save-dialog", row.title);
      // ipcRenderer.once("selectedItem", function (e, path) {
      //   if (path != null) {
      //     xlsx.writeFile(wb, path);
      //   }
      // });
    },
    handleCurrentChange(val) {
      console.log(this.querys);
      const PAGE_LENGTH = 5;
      console.log(`当前页: ${val}`);
      let length = this.querys.length;
      if (length == 0) {
        this.tasks = [];
        return;
      }
      // if (val <= 0) return;
      // let start = (val - 1) * PAGE_LENGTH;
      // let end = start + PAGE_LENGTH;
      // if (end > length) {
      //   end = length;
      // }
      // this.tasks = this.querys.slice(start, end);
      // ** reversed **
      let start = length - val * PAGE_LENGTH;
      let end = start + PAGE_LENGTH;
      if (start < 0) {
        start = 0;
      }
      if (start >= length || end <= 0) {
        return;
      }
      this.tasks = this.querys.slice(start, end).reverse();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      console.log("currentPage=" + this.currentPage);
    },
  },
};
</script>
<style>
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #5673ff;
  border-color: #5673ff;
}

.content-container
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #5673ff;
  color: #fff;
}

.el-pager li.active {
  color: #5673ff;
  cursor: default;
}
</style>
