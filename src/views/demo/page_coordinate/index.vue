<template>
  <d2-container type="card" style="opacity: 0.8">
    <template slot="header">
     <el-button @click="inquery">
        <d2-icon name="search"/>
          查询
      </el-button>
      <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="文件内容要求" name="1">
     <span>
       进入坐标形式的查询，你需要按照要求调整文件格式，以下字段必须在文件的第一行出现，字段的顺序随意：<br />
       <table border="1px" style="border-collapse:collapse">
         <tr>
           <th>type</th>
           <th>name</th>
           <th>x</th>
           <th>y</th>
           <th>remand</th>
           <th>Vehicle_load</th>
           <th>Vehicle_number</th>
           <th>Vehicle_mileage</th>
           <th>Vehicle_id</th>
         </tr>
       </table>
          type：点的类型，depot——配送中心，customer——配送点，other——其他类型的点<br />
          name：点的名字或者编号<br />
          x：点的横坐标（单位默认：km)<br />
          y:   点的纵坐标（单位默认：km)<br />
          remand：点的需求量，配送中心也可以写，这不影响路线的计算<br />
          Vehicle_load：车辆载重量<br />
          Vehicle_number：该车辆的数量<br />
          Vehicle_mileage：车辆里程<br />
          Vehicle_id：车辆所在配送中心的名字或者编号，对应type=depot的name值
     </span>
    </el-collapse-item>
    </el-collapse>
    </template>
    <div class="d2-mb">
      <el-upload :before-upload="handleUpload" action="default">
        <el-button type="success">
          <d2-icon name="file-o"/>
          选择要导入的 .xlsx 表格
        </el-button>
      </el-upload>
    </div>
    <div contenteditable="true">
    <el-table v-bind="table">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label">
      </el-table-column>
    </el-table>
    </div>
  </d2-container>
</template>

<script>
import Vue from 'vue'
import pluginImport from '@d2-projects/vue-table-import'
Vue.use(pluginImport)

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
        })
      return false
    },
    inquery () { },
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
.outer_div{
max-height:90%;
overflow-y:auto;
}
.inner_div{
height:100px;
}
</style>
