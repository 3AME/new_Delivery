<template>
  <d2-container type="card">
    <template slot="header">
      <el-button @click="inquery">
        <d2-icon name="search" />查询
      </el-button>
    </template>
    <div class="d2-mb">
      <el-upload :before-upload="handleUpload" action="default">
        <el-button type="success">
          <d2-icon name="file-o" />选择要导入的 .xlsx 表格
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
import Vue from 'vue'
import pluginImport from '@d2-projects/vue-table-import'
Vue.use(pluginImport)
var outdata
export default {
  data () {
    return {
      table: {
        columns: [],
        data: [],
        size: 'mini',
        stripe: true,
        border: true
      }
    }
  },
  methods: {
    handleUpload (file) {
      this.$import.xlsx(file).then(({ header, results }) => {
        this.table.columns = header.map(e => {
          return {
            label: e,
            prop: e
          }
        })
        this.table.data = results
        outdata = results
        console.log('outdata:')
        console.log(outdata)
      })
      return false
    },
    inquery () {
      // eslint-disable-next-line camelcase
      var num_node = this.input
      console.log(num_node)
      if (outdata == null) {
        alert('请先上传文件')
      // eslint-disable-next-line brace-style
      }
      // else if (num_node == 0) {
      //   alert("请输入配送点数量，配送点数量应大于0");
      // }
      else {
        console.log(outdata)
        let problem = []
        outdata.map(v => {
          // let i = num_node
          let obj = {}
          obj.nodes = { type: v['type'], id: v['name_a'], demand: v['remand'] }
          obj.edge = { u: v['begin'], v: v['end'], w: v['load_length'] }
          obj.list = { list_num: v['name_a'] }
          obj.vehicles = {
            id: v['Vehicle_type'],
            depot: v['Vehicles_id'],
            load: v['Vehicle_load'],
            // count: v["Vehicle_number"]
            count: 5
          }
          obj.distancePrior = 5
          obj.timePrior = 1
          obj.loadPrior = 4
          problem.push(obj)
        })
        console.log(problem)
        // eslint-disable-next-line camelcase
        let new_outdata = []
        for (var i = 0; i < outdata.length; i++) {
          outdata.map(v => {
            let obj = {}
            obj = { u: v['name_a'], v: i, w: v[i] }
            new_outdata.push(obj)
          })
        }
        console.log(new_outdata)
        // eslint-disable-next-line camelcase
        let new_list = problem.map(obj => {
          return obj.list
        })
        console.log(new_list)
        // let len = new_list.length;
        // let listedges = [];
        // for (var i = 0; i < len; i++) {
        //   outdata.map(v => {
        //     let obj = {};
        //     obj.edge_list = { u: v["name_a"], v: i, w: v["i"] };
        //   });
        // }
        // console.log("LISTEDGES:");
        // console.log(listedges);
        // eslint-disable-next-line camelcase
        let new_nodes = problem.map(obj => {
          return obj.nodes
        })
        console.log('nodes:')
        console.log(new_nodes)
        for (let i = new_nodes.length - 1; i >= 0; i--) {
          if (
            new_nodes[i].type === undefined ||
            new_nodes[i].id === undefined ||
            new_nodes[i].demand === undefined
          ) {
            new_nodes.splice(i, 2) // 删除excel数据中出现的undefined
          }
        }
        console.log(new_nodes)
        // let new_edges = problem.map(obj => {
        //   return obj.edge
        // })
        // eslint-disable-next-line camelcase
        let new_vehicles = problem.map(obj => {
          if (obj.vehicles !== undefined) {
            return obj.vehicles
          } else {
            console.log('value is undefined')
          }
        })
        // new_vehicles.splice(0);
        console.log(new_vehicles)
        for (let i = new_vehicles.length - 1; i >= 0; i--) {
          if (
            new_vehicles[i].load === undefined ||
            new_vehicles[i].count === undefined
          ) {
            new_vehicles.splice(i, 2) // 删除excel数据中出现的undefined
          }
        }
        console.log(new_vehicles)
        // eslint-disable-next-line camelcase
        let new_test = {
          distancePrior: 5, // 路程加权
          timePrior: 1, // 用时加权
          loadPrior: 4 // 满载率加权
        }
        console.log(new_test)
        // eslint-disable-next-line camelcase
        var new_problem = {
          routeMode: true,
          nodes: new_nodes,
          edges: new_outdata,
          vehicles: new_vehicles,
          distancePrior: new_test.distancePrior,
          timePrior: new_test.timePrior,
          loadPrior: new_test.loadPrior
        }
        console.log(new_problem)
        this.$router.push({
          name: 'page_result',
          query: {
            problem: new_problem
          }
        })
      }
    }
  }
}
</script>
