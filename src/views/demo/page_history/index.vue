<template>
  <div>
    <el-button size="mini" @click="deleteAll()" round>全部删除</el-button>
    <el-table :data="querys">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="title" label="标题" width="200px">
        <template slot-scope="scope">
          <span style="width: 140px;" class="line-1 hover">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" width="200px">
        <template slot-scope="scope">
          <span style="width: 190px;" class="line-1 hover">{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查询" placement="bottom">
            <el-button
              size="mini"
              type="primary"
              @click="queryProblem(scope.$index, scope.row)"
              circle
            >
              <i class="el-icon-search" />
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button
              size="mini"
              type="danger"
              @click="deleteQuery(scope.$index, scope.row)"
              circle
            >
              <i class="el-icon-delete" />
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
            <el-button
              size="mini"
              type="success"
              @click="saveQuery(scope.$index, scope.row)"
              circle
            >
              <i class="el-icon-download" />
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as xlsx from 'xlsx'
export default {
  computed: {
    querys () {
      return this.$store.state.d2admin.query.querys
    }
  },
  methods: {
    deleteAll () {
      this.$store.commit('d2admin/DELETE_ALL_QUERY_DATA')
      this.$message({
        message: '全部删除成功',
        type: 'success'
      })
    },
    queryProblem (index, row) {
      this.$router.push({
        name: 'page_result',
        query: {
          problem: row.problem
        }
      })
    },
    deleteQuery (index, row) {
      this.$store.commit('d2admin/DELETE_QUERY_DATA', index)
      this.$message({
        message: '删除' + row.title + '成功',
        type: 'success'
      })
    },
    saveQuery (index, row) {
      var problem = row.problem
      var table = []
      var edges = problem.edges

      if (problem.num_node === undefined) {
        let row0 = ['物流中心(' + edges[0].x + ', ' + edges[0].y + ')']
        table.push(row0)

        var header1 = ['配送节点', '横坐标x(km)', '纵坐标y(km)', '需求量q(t)']

        table.push(header1)

        for (var i = 1; i < edges.length; i++) {
          let row = []
          row.push(i)
          row.push(edges[i].x)
          row.push(edges[i].y)
          row.push(problem.customers[i - 1])
          table.push(row)
        }
      } else {
        let row0 = ['各配送点与配送中心的距离（/KM）']
        table.push(row0)

        let header1 = ['配送节点']
        for (let i = 0; i < problem.num_node; i++) {
          header1.push(i)
        }
        table.push(header1)

        // init table
        for (let i = 0; i < problem.num_node; i++) {
          let row = []
          row.push(i)
          for (var j = 0; j < problem.num_node; j++) {
            if (i === j) {
              row.push(0)
            } else {
              row.push('')
            }
          }
          table.push(row)
        }

        for (let i = 0; i < problem.num_node; i++) {
          let row = table[i + 2]
          edges.forEach(function (item) {
            if (item.u === i) {
              row[item.v + 1] = item.w
              table[item.v + 2][item.u + 1] = item.w
            }
          })
        }

        table.push([])

        table.push(['各配送点需求量（T）'])
        var row1 = ['配送点']
        var row2 = ['需求量（T)']
        for (let i = 0; i < problem.customers.length; i++) {
          row1.push(i + 1)
          row2.push(problem.customers[i])
        }
        table.push(row1)
        table.push(row2)
      }

      // 创建book
      var wb = xlsx.utils.book_new()
      // json转sheet
      var ws = xlsx.utils.aoa_to_sheet(table)
      // sheet写入book
      xlsx.utils.book_append_sheet(wb, ws, 'query')
      // 输出
      this.$electron.ipcRenderer.send('open-save-dialog', row.title)
      this.$electron.ipcRenderer.once('selectedItem', function (e, path) {
        if (path != null) {
          xlsx.writeFile(wb, path)
        }
      })
    },
    saveQuery2 (index, row) {
      var problem = row.problem
      var table = []
      var edges = problem.edges
      var row0 = ['物流中心(' + edges[0].x + ', ' + edges[0].y + ')']
      table.push(row0)

      var header1 = ['配送节点', '横坐标x(km)', '纵坐标y(km)', '需求量q(t)']

      table.push(header1)

      for (var i = 1; i < edges.length; i++) {
        let row = []
        row.push(i)
        row.push(edges[i].x)
        row.push(edges[i].y)
        row.push(problem.customers[i - 1])
        table.push(row)
      }

      // 创建book
      var wb = xlsx.utils.book_new()
      // json转sheet
      var ws = xlsx.utils.aoa_to_sheet(table)
      // sheet写入book
      xlsx.utils.book_append_sheet(wb, ws, 'query')
      // 输出
      this.$electron.ipcRenderer.send('open-save-dialog', row.title)
      this.$electron.ipcRenderer.once('selectedItem', function (e, path) {
        if (path != null) {
          xlsx.writeFile(wb, path)
        }
      })
    }
  }
}
</script>

<style>
</style>
