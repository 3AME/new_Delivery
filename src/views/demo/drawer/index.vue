<template>
  <el-drawer
    :before-close="handleClose"
    :visible.sync="value.drawerShow"
    direction="rtl"
    custom-class="demo-drawer"
    ref="drawer"
    :with-header="false"
  >
    <el-container style="overflow: hidden" class="content-container">
      <el-main style="overflow: auto;">
        <el-form>
          <el-card style="margin: 10px;">
            <el-form-item label="迭代次数" :label-width="formLabelWidth">
              <el-input
                size="mini"
                v-model="value.maxIter"
                autocomplete="off"
                clearable
                placeholder="200"
                @change="ParameterChanged"
              ></el-input>
            </el-form-item>
            <el-form-item label="距离优先参数" :label-width="formLabelWidth">
              <el-input
                size="mini"
                v-model="value.distancePrior"
                autocomplete="off"
                clearable
                placeholder="5"
                @change="ParameterChanged"
              ></el-input>
            </el-form-item>
            <el-form-item label="时间优先参数" :label-width="formLabelWidth">
              <el-input
                size="mini"
                v-model="value.timePrior"
                autocomplete="off"
                clearable
                placeholder="1"
                @change="ParameterChanged"
              ></el-input>
            </el-form-item>
            <el-form-item label="满载率优先参数" :label-width="formLabelWidth">
              <el-input
                size="mini"
                v-model="value.loadPrior"
                autocomplete="off"
                clearable
                placeholder="4"
                @change="ParameterChanged"
              ></el-input>
            </el-form-item>
            <el-form-item label="车辆速度(km/h)" :label-width="formLabelWidth">
              <el-input
                size="mini"
                v-model="value.speedValue"
                autocomplete="off"
                clearable
                placeholder="10"
                @change="ParameterChanged"
              ></el-input>
            </el-form-item>
          </el-card>
          <el-card style="margin: 10px;">
            <el-form-item>
              1.&nbsp;&nbsp;&nbsp;&nbsp;距离优先参数范围:0-100
              <br />2.&nbsp;时间优先参数范围:0-100
              <br />3.&nbsp;满载率优先参数范围:0-100
              <br />4.&nbsp;车辆速度范围：1-120(单位：km/h)
              <br />5.&nbsp;算法迭代次数：1-20000
            </el-form-item>
          </el-card>
        </el-form>
      </el-main>
      <!-- <el-footer height="auto" style="padding: 40px">
        <el-row justify="space-around">
          <el-col :span="12" style="text-align: center"><el-button @click="$refs.drawer.closeDrawer()">取 消</el-button></el-col>
          <el-col :span="12" style="text-align: center"><el-button class="btn-success" @click="closeDrawer">确 定</el-button></el-col>
        </el-row>
      </el-footer> -->
    </el-container>
  </el-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },

  data() {
    return {
      saveConfig: false,
      formLabelWidth: "110px"
    };
  },

  methods: {
    _NumberFilter(s, low, upper) {
      let num = parseInt(s.toString().replace(/\D/g, ''));
      if (num < low) return low;
      if (num > upper) return upper;
      return num;
    },

    ParameterChanged() {
      this.value.maxIter = this._NumberFilter(this.value.maxIter, 1, 20000);
      this.value.distancePrior = this._NumberFilter(this.value.distancePrior, 0, 100);
      this.value.timePrior = this._NumberFilter(this.value.timePrior, 0, 100);
      this.value.loadPrior = this._NumberFilter(this.value.loadPrior, 0, 100);
      this.value.speedValue = this._NumberFilter(this.value.speedValue, 1, 120);
      this.saveConfig = true;
    },

    // closeDrawer() {
    //   this.saveConfig = true;
    //   this.$refs.drawer.closeDrawer();
    // },

    handleClose(done) {
      if (!this.saveConfig) {
        done();
        return;
      }
      this.saveConfig = false;
      // if (this.value.distancePrior == "") {
      //   this.value.distancePrior = 5;
      // }
      // if (this.value.timePrior == "") {
      //   this.value.timePrior = 1;
      // }
      // if (this.value.loadPrior == "") {
      //   this.value.loadPrior = 4;
      // }
      // if (this.value.speedValue == "") {
      //   this.value.speedValue = 10;
      // }
      // if (this.value.maxIter == "") {
      //   this.value.maxIter = 300;
      // }
      // console.log(this.value.distancePrior);
      // console.log(this.value.timePrior);
      // console.log(this.value.loadPrior);
      // console.log(this.value.speedValue);
      // console.log(this.value.maxIter);
      done();
      this.$notify({
        title: "成功",
        message: "参数设置成功",
        type: "success"
      });
    }
  }
};
</script>

<style src="../../../assets/btn.css" scoped></style>
