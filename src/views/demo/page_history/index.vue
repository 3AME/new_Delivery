<template>
  <d2-container>
    <el-table :data="querys" style="width: 100%">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="title" label="标题" width="250px">
        <template slot-scope="scope">
          <span style="width: 140px;" class="line-1 hover">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" width="250px">
        <template slot-scope="scope">
          <span style="width: 190px;" class="line-1 hover">{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查询" placement="bottom">
            <el-button
              size="mini"
              class="btn-success"
              @click="queryProblem(scope.$index, scope.row)"
            >
              <i class="el-icon-search" />
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button size="mini" class="btn-danger" @click="deleteQuery(scope.$index, scope.row)">
              <i class="el-icon-delete" />
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
            <el-button size="mini" class="btn-warning" @click="saveQuery(scope.$index, scope.row)">
              <i class="el-icon-download" />
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-button
          size="mini" class="btn-danger" style="margin: 10px;" @click="deleteAll()">
          全部删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import * as xlsx from "xlsx";
import { ipcRenderer } from "electron";
export default {
  data() {
    return {
      popoverVisible: false
    };
  },
  computed: {
    querys() {
      return this.$store.state.d2admin.query.querys;
    }
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
  },
  methods: {
    deleteAll() {
      this.$confirm("此操作将删除全部历史记录, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("d2admin/DELETE_ALL_QUERY_DATA");
          this.$notify({
            title: "成功",
            message: "全部删除成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$notify.info({
            title: "消息",
            message: "已取消删除"
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
    queryProblem(index, row) {
      this.$router.push({
        name: "page_result",
        query: {
          problem: row.problem
        }
      });
    },
    deleteQuery(index, row) {
      this.$store.commit("d2admin/DELETE_QUERY_DATA", index);
      this.$notify({
        title: "成功",
        message: "删除" + row.title + "成功",
        type: "success"
      });
    },
    saveQuery(index, row) {
      var problem = row.problem;
      var table = [];
      var edges = problem.edges;

      if (!problem.routeMode) {
        let row0 = ["物流中心(" + edges[0].x + ", " + edges[0].y + ")"];
        table.push(row0);

        var header1 = ["配送节点", "横坐标x(km)", "纵坐标y(km)", "需求量q(t)"];

        table.push(header1);

        problem.nodes.forEach((node, i) => {
          if (node.type === "customer") {
            let row = [];
            row.push(node.id);
            row.push(edges[i].x);
            row.push(edges[i].y);
            row.push(node.demand);
            table.push(row);
          }
        });
      } else {
        let row0 = ["各配送点与配送中心的距离（/KM）"];
        table.push(row0);

        let header1 = ["配送节点"];
        problem.nodes.forEach(node => {
          header1.push(node.id);
        });
        // for (let i = 0; i < problem.num_node; i++) {
        //   header1.push(i)
        // }
        table.push(header1);

        // init table
        for (let i = 0; i < problem.nodes.length; i++) {
          let row = [];
          row.push(i);
          for (var j = 0; j < problem.nodes.length; j++) {
            if (i === j) {
              row.push(0);
            } else {
              row.push("");
            }
          }
          table.push(row);
        }

        for (let i = 0; i < problem.nodes.length; i++) {
          let row = table[i + 2];
          edges.forEach(function(item) {
            if (item.u === i) {
              row[item.v + 1] = item.w;
              table[item.v + 2][item.u + 1] = item.w;
            }
          });
        }

        table.push([]);

        table.push(["各配送点需求量（T）"]);
        var row1 = ["配送点"];
        var row2 = ["需求量（T)"];
        // for (let i = 0; i < problem.nodes.length; i++) {
        //   if (problem.nodes[i] === 'customer') {
        //     row1.push(problem.nodes[i].id)
        //     row2.push(problem.nodes[i].demand)
        //   }
        // }
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
      ipcRenderer.once("selectedItem", function(e, path) {
        if (path != null) {
          xlsx.writeFile(wb, path);
        }
      });
    },
    saveQuery2(index, row) {
      var problem = row.problem;
      var table = [];
      var edges = problem.edges;
      var row0 = ["物流中心(" + edges[0].x + ", " + edges[0].y + ")"];
      table.push(row0);

      var header1 = ["配送节点", "横坐标x(km)", "纵坐标y(km)", "需求量q(t)"];

      table.push(header1);

      for (var i = 1; i < edges.length; i++) {
        let row = [];
        row.push(i);
        row.push(edges[i].x);
        row.push(edges[i].y);
        row.push(problem.customers[i - 1]);
        table.push(row);
      }

      // 创建book
      var wb = xlsx.utils.book_new();
      // json转sheet
      var ws = xlsx.utils.aoa_to_sheet(table);
      // sheet写入book
      xlsx.utils.book_append_sheet(wb, ws, "query");
      // 输出
      ipcRenderer.send("open-save-dialog", row.title);
      ipcRenderer.once("selectedItem", function(e, path) {
        if (path != null) {
          xlsx.writeFile(wb, path);
        }
      });
    }
  }
};
</script>
<style src="../../../assets/btn.css" scoped></style>
