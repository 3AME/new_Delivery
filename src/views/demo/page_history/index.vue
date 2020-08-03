<template>
  <el-container class="content-container"></el-container>
</template>

<script>
import * as xlsx from "xlsx";
import { ipcRenderer } from "electron";
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
      this.$store.commit("d2admin/DELETE_QUERY_DATA", index);
      this.$notify({
        title: "成功",
        message: "删除" + row.title + "成功",
        type: "success",
      });
    },
    saveQuery(row) {
      var problem = row.problem;
      var table = [];

      let depots = problem.nodes.filter((node) => {
        return node.type == "depot";
      });

      if (!problem.routeMode) {
        depots.forEach((node) => {
          let row0 = [
            "物流中心" + node.id + "(" + node.x + ", " + node.y + ")",
          ];
          table.push(row0);
        });

        var header1 = ["配送节点", "横坐标x(km)", "纵坐标y(km)", "需求量q(t)"];

        table.push(header1);

        problem.nodes.forEach((node, i) => {
          if (node.type === "customer") {
            let row = [];
            row.push(node.id);
            row.push(node.x);
            row.push(node.y);
            row.push(node.demand);
            table.push(row);
          }
        });
      } else {
        depots.forEach((node) => {
          let row0 = [
            "物流中心" + node.id + "(" + node.x + ", " + node.y + ")",
          ];
          table.push(row0);
        });

        let row0 = ["各配送点与配送中心的距离（/KM）"];
        table.push(row0);

        let header1 = ["配送节点"];
        problem.nodes.forEach((node) => {
          header1.push(node.id);
        });
        table.push(header1);

        problem.nodes.forEach((node, i) => {
          let row = [];
          row.push(node.id);
          for (let j = 0; j < problem.nodes.length; j++) {
            if (i === j) {
              row.push(0);
            } else {
              row.push("");
            }
          }
          table.push(row);
        });

        problem.nodes.forEach((node, i) => {
          let row = table[i + 2];
          problem.edges.forEach((item, j) => {
            if (item.u === node.id) {
              row[item.v + 1] = item.w;
              table[item.v + 2][item.u + 1] = item.w;
            }
          });
        });

        table.push([]);

        table.push(["各配送点需求量（T）"]);
        var row1 = ["配送点"];
        var row2 = ["需求量（T)"];
        problem.nodes.forEach((node, i) => {
          if (node.type === "customer") {
            row1.push(node.id);
            row2.push(node.demand);
          }
        });
        table.push(row1);
        table.push(row2);
      }

      // 创建book
      var wb = xlsx.utils.book_new();
      // json转sheet
      var ws = xlsx.utils.aoa_to_sheet(table);
      // sheet写入book
      xlsx.utils.book_append_sheet(wb, ws, "query");
      // 输出
      ipcRenderer.send("open-save-dialog", row.title);
      ipcRenderer.once("selectedItem", function (e, path) {
        if (path != null) {
          xlsx.writeFile(wb, path);
        }
      });
    },
    // saveQuery2(index, row) {
    //   var problem = row.problem;
    //   var table = [];
    //   var edges = problem.edges;
    //   var row0 = ["物流中心(" + edges[0].x + ", " + edges[0].y + ")"];
    //   table.push(row0);

    //   var header1 = ["配送节点", "横坐标x(km)", "纵坐标y(km)", "需求量q(t)"];

    //   table.push(header1);

    //   for (var i = 1; i < edges.length; i++) {
    //     let row = [];
    //     row.push(i);
    //     row.push(edges[i].x);
    //     row.push(edges[i].y);
    //     row.push(problem.customers[i - 1]);
    //     table.push(row);
    //   }

    //   // 创建book
    //   var wb = xlsx.utils.book_new();
    //   // json转sheet
    //   var ws = xlsx.utils.aoa_to_sheet(table);
    //   // sheet写入book
    //   xlsx.utils.book_append_sheet(wb, ws, "query");
    //   // 输出
    //   ipcRenderer.send("open-save-dialog", row.title);
    //   ipcRenderer.once("selectedItem", function (e, path) {
    //     if (path != null) {
    //       xlsx.writeFile(wb, path);
    //     }
    //   });
    // },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let length = this.querys.length;
      let end = val * 20;
      let start = end - 20;
      if (end > length) {
        end = length;
      }
      if (start > length) {
        return;
      }
      this.tasks = this.querys.slice(start, end);
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
