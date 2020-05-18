<template>
  <d2-container type="card">
    <template slot="header">
    <el-row>
       <el-button  class="btn1">
          <el-upload :before-upload="handleUpload" action="default">
              上传<i class="el-icon-upload el-icon--right"></i>
          </el-upload>
        </el-button>
        <el-button @click="inquery"  class="btn">
          <d2-icon name="search" />查询
        </el-button>
        <el-button type="info" @click="clear">
          清除数据
        </el-button>
         <el-button @click="handleDownload" type="success" style="margin-left:30%">
          下载坐标查询表头<i class="el-icon-download el-icon--right"></i>
        </el-button>
    </el-row>
     <el-collapse  @change="handleChange" class="yaoqiu">
      <el-collapse-item  name="1" >
      <template slot="title">
      <div class="s">
       坐标查询文件内容要求
      </div>
       </template>
     <span>
       坐标形式的查询，你需要按照要求调整文件格式，以下字段必须在文件的第一行出现，字段的顺序可任意：<br />
       <table border="1px" style="border-collapse:collapse">
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
          type：点的类型，depot——配送中心，customer——客户点，other——其他类型的点<br />
          name：点的名字或者编号<br />
          X：点的横坐标（单位默认：km)<br />
          Y：点的纵坐标（单位默认：km)<br />
          demand：点的需求量，配送中心也可以写，这不影响路线的计算<br />
          serviceTime：自定义该点的服务时间（默认：5min)<br />
          beginTime：客户点接受配送到达的最早时间（单位默认：min)<br />
          endTime：客户点接受配送到达的最迟时间（单位默认：min)<br />
          Vehicle_type：车辆类型<br />
          Vehicle_load：车辆载重<br />
          Vehicle_number：该车辆类型的数量<br />
          Vehicle_mileage：车辆里程<br />
          Center_name：车辆所在配送中心的名字，对应type=depot的name值
     </span>
    </el-collapse-item>
    </el-collapse>
    </template>
    <el-table v-bind="table">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import Vue from 'vue'
import pluginImport from '@d2-projects/vue-table-import'
import pluginExport from '@d2-projects/vue-table-export'
Vue.use(pluginExport)
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
      },
      stdcolumns:[],
    }
  },
  mounted () {
    console.log('mounted')
    this.stdcolumns = 
    [
        {label: 'type', prop: 'type'},
        {label: 'name',prop: 'name'},
        {label: 'X',prop: 'X'},
        {label: 'Y',prop: 'Y'},
        {label: 'demand',prop: 'demand'},
        {label: 'serviceTime',prop: 'serviceTime'},
        {label: 'beginTime',prop: 'beginTime'},
        {label: 'endTime',prop: 'endTime'},
        {label: 'Vehicle_type',prop: 'Vehicle_type'},
        {label: 'Vehicle_load',prop: 'Vehicle_load'},
        {label: 'Vehicle_number',prop: 'Vehicle_number'},
        {label: 'Vehicle_mileage',prop: 'Vehicle_mileage'},
        {label: 'Center_name',prop: 'Center_name'}
    ]
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
        for(var i in this.stdcolumns){
            console.log(this.stdcolumns[i].label)
            if(!header.includes(this.stdcolumns[i].label)){
              var me=this
              this.$confirm('表头缺少字段'+me.stdcolumns[i].label+',请检查格式', '格式错误', {
                confirmButtonText: '确定',
                type: 'error'
              })
              return false
            }
        }
      })
      return false
    },
    inquery () {
      if (outdata == null) {
        this.$confirm('还未选择文件上传哦', '温馨提示', {
          confirmButtonText: '确定',
          showCancelButton:false,
          type: 'warning'
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '文件未上传'
          })
        })
        return false
      } else {
        let problem = []
        outdata.map(v => {
          let obj = {}
          obj.nodes = {
            type: v['type'],
            id: v['name'],
            demand: v['demand'],
            service_time: v['serviceTime'],
            tw_beg: v['beginTime'],
            tw_end: v['endTime'],
            x: v['X'], 
            y: v['Y']
          }
          // obj.edges = { x: v['X'], y: v['Y'] }
          obj.vehicles = {
            id: v['Vehicle_type'],
            depot: v['Center_name'],
            load: v['Vehicle_load'],
            count: v['Vehicle_number'],
            mileage: v['Vehicle_mileage']
          }
          problem.push(obj)
        })
        // eslint-disable-next-line camelcase
        let new_nodes = problem.map(obj => {
          return obj.nodes
        })
        let newproblem_edges="euc2d"

        // eslint-disable-next-line camelcase
        let new_vehicles = problem.map(obj => {
          if (obj.vehicles !== undefined) {
            return obj.vehicles
          } else {
            console.log('value is undefined')
          }
        })
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
          loadPrior: 4 // 满载率加权
        }
        // eslint-disable-next-line camelcase
        newproblem_edges = {
          routeMode: false,
          nodes: new_nodes,
          edges: newproblem_edges,
          vehicles: new_vehicles,
          distancePrior: new_test.distancePrior,
          timePrior: new_test.timePrior,
          loadPrior: new_test.loadPrior
        }
        console.log("problem:"+JSON.stringify(newproblem_edges))
        this.$router.push({
          name: 'page_result',
          query: {
            problem: newproblem_edges
          }
        })
      }
    },
    handleChange (val) {
      console.log(val)
    },
    handleDownload () {
      var columns=[]
      for(var i in this.stdcolumns){
          columns.push({
            label:this.stdcolumns[i].label,
            prop:this.stdcolumns[i].prop
          })
      }
  
      this.$export.excel({
        title: "坐标查询文件",
        columns,
      })
    },
  }
}
</script>
<style scoped>
.yaoqiu {
  margin-top: 2%;
}
.s {
  /* color: red; */
  width: 100%;
  background-color: rgba(173, 175, 68, 0.274);
}
.btn {
  margin-left: 5%;
  background-color: rgb(146, 171, 196);
}
.btn1 {
  background-color: rgba(76, 167, 228, 0.466);
   margin-left: 5%;
}
</style>
