<template>
  <d2-container type="card">
    <template slot="header">
     <el-button @click="inquery">
        <d2-icon name="search"/>
          查询
      </el-button>
    </template>
    <div class="d2-mb">
      <el-upload :before-upload="handleUpload" action="default">
        <el-button type="success">
          <d2-icon name="file-o"/>
          选择要导入的 .xlsx 表格
        </el-button>
      </el-upload>
    </div>
    <el-table v-bind="table">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label">
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import Vue from 'vue'
import pluginImport from '@d2-projects/vue-table-import'
Vue.use(pluginImport)
var outdata;
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
      this.$import.xlsx(file)
        .then(({ header, results }) => {
          this.table.columns = header.map(e => {
            return {
              label: e,
              prop: e
            }
          })
          this.table.data = results
          outdata=results
          console.log(outdata);
        })
      return false
    },
    inquery () { 
      if (outdata == null) {
        alert("请先上传文件");
      } else {
        console.log("未处理的outdata:");
        console.log(outdata);
        let problem = [];
        outdata.map(v => {
          let obj = {};
          obj.nodes={type:v["type"],id:v["name"],x:v["X"],y:v["Y"],demand:v["remand"]};
          obj.edges = "euc2d";
          obj.vehicles = {id:v["name"],depot:v["Vehicle_id"],load:v["Vehicle_load"],count:v["Vehicle_number"]};
          obj.distancePrior = 5;
          obj.timePrior = 1;
          obj.loadPrior = 4;
          problem.push(obj);
        });
        console.log(problem);
        let new_nodes=problem.map(obj=>{
          return obj.nodes;
        })
        let newproblem_edges = {
          edges:"euc2d",
        };
        let new_vehicles = problem.map(obj => {
          if (obj.vehicles != undefined) {
            return obj.vehicles;
          }
          else{
            console.log("value is undefined");
          }
        });
        // new_vehicles.splice(0);
        console.log(new_vehicles);
        for(var i=new_vehicles.length-1;i>=0;i--){
          if(new_vehicles[i].load==undefined||new_vehicles[i].count==undefined){
            new_vehicles.splice(i,2);//删除excel数据中出现的undefined
          }
        }
        console.log(new_vehicles);
        let new_test = {
          distancePrior: 5, // 路程加权
          timePrior: 1, // 用时加权
          loadPrior: 4 // 满载率加权
        };
        console.log(new_test);
        newproblem_edges = {
          routeMode: false,
          nodes:new_nodes,
          edges: newproblem_edges.edges,
          vehicles: new_vehicles,
          distancePrior: new_test.distancePrior,
          timePrior: new_test.timePrior,
          loadPrior: new_test.loadPrior
        };
        // newproblem_edges=newproblem_edges.filter( res=> {return res!="undefined"});
        // newproblem_edges.filter(Boolean);
        console.log(newproblem_edges);
        this.$router.push({
          name: "page_result",
          query: {
            problem: newproblem_edges
          }
        });
      }
    }
  }
}
</script>
