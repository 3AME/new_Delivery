<template>
  <d2-container type="card">
    <template slot="header">
      <el-button-group>
        <el-col :span="3.2">
          <el-upload :before-upload="handleUpload" action="default">
            <el-button
              class="btn-upload"
              style="border-top-right-radius: 0px;border-bottom-right-radius: 0px;"
            >
              上传
              <!-- <i class="el-icon-upload el-icon--right"></i> -->
            </el-button>
          </el-upload>
        </el-col>
        <el-button @click="inquery" class="btn-success">
          查询
          <!-- <i class="fa fa-search" aria-hidden="true"></i> -->
        </el-button>
        <el-button class="btn-danger" @click="clear">
          清除数据
          <!-- <i class="fa fa-close" aria-hidden="true"></i> -->
        </el-button>
        <el-button @click="handleDownload" class="btn-warning">
          格式模板
          <!-- <i class="el-icon-download el-icon--right"></i> -->
        </el-button>
        <el-button @click="refresh" class="btn-dark">刷新</el-button>
        <el-button class="btn-primary" @click="dialog = true">设置算法参数</el-button>
        <el-drawer
          :before-close="handleClose"
          :visible.sync="dialog"
          direction="rtl"
          custom-class="demo-drawer"
          ref="drawer"
        >
          <div class="demo-drawer__content">
            <el-form :model="form">
              <el-card>
                <el-form-item label="距离优先参数" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="distancePrior"
                    autocomplete="off"
                    clearable
                    placeholder="5"
                  ></el-input>
                </el-form-item>
                <el-form-item label="时间优先参数" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="timePrior"
                    autocomplete="off"
                    clearable
                    placeholder="1"
                  ></el-input>
                </el-form-item>
                <el-form-item label="满载率优先参数" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="loadPrior"
                    autocomplete="off"
                    clearable
                    placeholder="4"
                  ></el-input>
                </el-form-item>
                <el-form-item label="车辆速度(km/h)" :label-width="formLabelWidth">
                  <el-select
                    size="medium"
                    v-model="speed_value"
                    filterable
                    allow-create
                    style="font-size:12px"
                    placeholder="60"
                    clearable
                  >
                    <el-option
                      v-for="item in vehicles_speed"
                      :key="item.speed_value"
                      :label="item.label"
                      :value="item.speed_value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-card>
              <el-card>
                <el-form-item>
                  1.&nbsp;&nbsp;&nbsp;&nbsp;距离优先参数范围:0-100
                  <br />2.&nbsp;时间优先参数范围:0-100
                  <br />3.&nbsp;满载率优先参数范围:0-100
                  <br />4.&nbsp;车辆速度范围：1-120(单位：km/h)
                </el-form-item>
              </el-card>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button style="float: left;margin-left:40px;" @click="cancelForm">取 消</el-button>
              <el-button
                class="btn-success"
                @click="$refs.drawer.closeDrawer()"
                :loading="loading"
                style="float: left;margin-left:70px;"
              >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
            </div>
          </div>
        </el-drawer>
      </el-button-group>
      <el-collapse @change="handleChange" class="yaoqiu">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="s">坐标查询文件内容要求</div>
          </template>
          <span class="s">
            坐标形式的查询，你需要按照要求调整文件格式，以下字段必须在文件的第一行出现，字段的顺序可任意：
            <br />
            <table border="1px" style="border-collapse:collapse;margin-left:1%">
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
            <div class="s">
              type：点的类型，depot——配送中心，customer——客户点，other——其他类型的点
              <br />name：点的名字或者编号
              <br />X：点的横坐标（单位默认：km)
              <br />Y：点的纵坐标（单位默认：km)
              <br />demand：点的需求量，配送中心也可以写，这不影响路线的计算
              <br />serviceTime：自定义该点的服务时间（默认：5min)
              <br />beginTime：客户点接受配送到达的最早时间（单位默认：min)
              <br />endTime：客户点接受配送到达的最迟时间（单位默认：min)
              <br />Vehicle_type：车辆类型
              <br />Vehicle_load：车辆载重
              <br />Vehicle_number：该车辆类型的数量
              <br />Vehicle_mileage：车辆里程
              <br />Center_name：车辆所在配送中心的名字，对应type=depot的name值
            </div>
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
import Vue from "vue";
import pluginImport from "@d2-projects/vue-table-import";
import pluginExport from "@d2-projects/vue-table-export";
Vue.use(pluginExport);
Vue.use(pluginImport);
var outdata;
var form;
var distancePrior;
var timePrior;
var loadPrior;
var speed;
export default {
  inject: ["reload"], //注入依赖
  data() {
    return {
      dialog: false,
      loading: false,
      distancePrior: "", //距离优先
      timePrior: "", //时间优先
      loadPrior: "", //满载率优先
      form: {},
      formLabelWidth: "110px",
      timer: null,
      vehicles_speed: [
        {
          speed_value: 10,
          label: 10
        },
        {
          speed_value: 60,
          label: 60
        }
      ],
      speed_value: [],
      table: {
        columns: [],
        data: [],
        size: "mini",
        stripe: true,
        border: true
      },
      stdcolumns: []
    };
  },
  mounted() {
    console.log("mounted");
    this.stdcolumns = [
      { label: "type", prop: "type" },
      { label: "name", prop: "name" },
      { label: "X", prop: "X" },
      { label: "Y", prop: "Y" },
      { label: "demand", prop: "demand" },
      { label: "serviceTime", prop: "serviceTime" },
      { label: "beginTime", prop: "beginTime" },
      { label: "endTime", prop: "endTime" },
      { label: "Vehicle_type", prop: "Vehicle_type" },
      { label: "Vehicle_load", prop: "Vehicle_load" },
      { label: "Vehicle_number", prop: "Vehicle_number" },
      { label: "Vehicle_mileage", prop: "Vehicle_mileage" },
      { label: "Center_name", prop: "Center_name" }
    ];
  },
  methods: {
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          this.loading = true;
          // console.log(this.distancePrior); //获取输入的值
          // console.log(this.timePrior); //获取输入的值
          // console.log(this.loadPrior); //获取输入的值
          // console.log(this.speed_value);
          if (this.distancePrior == "") {
            this.distancePrior = 5;
          }
          if (this.timePrior == "") {
            this.timePrior = 1;
          }
          if (this.loadPrior == "") {
            this.loadPrior = 4;
          }
          if (this.speed_value == "") {
            this.speed_value = 60;
          }
          console.log(this.distancePrior);
          console.log(this.timePrior);
          console.log(this.loadPrior);
          console.log(this.speed_value);
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    refresh() {
      this.reload();
      // this.$router.replace( this.$router)
      // Object.assign(this.$data, this.$options.data())
    },
    clear() {
      this.table = {
        columns: [],
        data: [],
        size: "mini",
        stripe: true,
        border: true
      };
    },
    handleUpload(file) {
      this.$import.xlsx(file).then(({ header, results }) => {
        this.table.columns = header.map(e => {
          return {
            label: e,
            prop: e
          };
        });
        this.table.data = results;
        outdata = results;
        for (var i in this.stdcolumns) {
          console.log(this.stdcolumns[i].label);
          if (!header.includes(this.stdcolumns[i].label)) {
            var me = this;
            this.$confirm(
              "表头缺少字段" + me.stdcolumns[i].label + ",请检查格式",
              "格式错误",
              {
                confirmButtonText: "确定",
                showCancelButton: false,
                type: "error"
              }
            );
            return false;
          }
        }
      });
      return false;
    },
    inquery() {
      if (outdata == null) {
        this.$confirm("还未选择文件上传哦", "温馨提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        }).catch(() => {
          this.$notify.info({
            title: "消息",
            message: "文件未上传"
          });
        });
        return false;
      } else {
        let problem = [];
        outdata.map(v => {
          let obj = {};
          obj.nodes = {
            type: v["type"],
            id: v["name"],
            demand: v["demand"],
            service_time: v["serviceTime"],
            tw_beg: v["beginTime"],
            tw_end: v["endTime"],
            x: v["X"],
            y: v["Y"]
          };
          // obj.edges = { x: v['X'], y: v['Y'] }
          obj.vehicles = {
            id: v["Vehicle_type"],
            depot: v["Center_name"],
            load: v["Vehicle_load"],
            count: v["Vehicle_number"],
            mileage: v["Vehicle_mileage"]
          };
          problem.push(obj);
        });
        // eslint-disable-next-line camelcase
        let new_nodes = problem.map(obj => {
          return obj.nodes;
        });
        let newproblem_edges = "euc2d";

        // eslint-disable-next-line camelcase
        let new_vehicles = problem.map(obj => {
          if (obj.vehicles !== undefined) {
            return obj.vehicles;
          } else {
            console.log("value is undefined");
          }
        });
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
        };
        // eslint-disable-next-line camelcase
     
        newproblem_edges = {
          routeMode: false,
          nodes: new_nodes,
          edges: newproblem_edges,
          vehicles: new_vehicles,
          distancePrior: this.distancePrior,
          timePrior: this.timePrior,
          loadPrior: this.loadPrior,
          speed: this.speed_value
        };

        console.log("problem:" + JSON.stringify(newproblem_edges));
        this.$router.push({
          name: "page_result",
          query: {
            problem: newproblem_edges
          }
        });
        //刷新四个参数的值
        this.distancePrior = "";
        this.timePrior = "";
        this.loadPrior = "";
        this.speed_value = "";
        console.log(this.distancePrior);
      }
    },
    handleChange(val) {
      console.log(val);
    },
    handleDownload() {
      var columns = [];
      for (var i in this.stdcolumns) {
        columns.push({
          label: this.stdcolumns[i].label,
          prop: this.stdcolumns[i].prop
        });
      }

      this.$export.excel({
        title: "坐标查询文件",
        columns
      });
    }
  }
};
</script>
<style src="../../../assets/btn.css" scoped></style>
