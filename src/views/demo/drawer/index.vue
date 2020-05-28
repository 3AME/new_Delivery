<template>
  <el-drawer
          :before-close="handleClose"
          :visible.sync="value.drawerShow"
          direction="rtl"
          custom-class="demo-drawer"
          ref="drawer"
          :with-header="false"
        >
          <div class="demo-drawer__content">
            <el-form>
              <el-card style="margin: 10px;">
                <el-form-item label="距离优先参数" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="value.distancePrior"
                    autocomplete="off"
                    clearable
                    placeholder="5"
                  ></el-input>
                </el-form-item>
                <el-form-item label="时间优先参数" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="value.timePrior"
                    autocomplete="off"
                    clearable
                    placeholder="1"
                  ></el-input>
                </el-form-item>
                <el-form-item label="满载率优先参数" :label-width="formLabelWidth">
                  <el-input
                    size="mini"
                    v-model="value.loadPrior"
                    autocomplete="off"
                    clearable
                    placeholder="4"
                  ></el-input>
                </el-form-item>
                <el-form-item label="车辆速度(km/h)" :label-width="formLabelWidth">
                  <el-select
                    size="medium"
                    v-model="value.speedValue"
                    filterable
                    allow-create
                    style="font-size:12px"
                    placeholder="10"
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
              <el-card style="margin: 10px;">
                <el-form-item>
                  1.&nbsp;&nbsp;&nbsp;&nbsp;距离优先参数范围:0-100
                  <br />2.&nbsp;时间优先参数范围:0-100
                  <br />3.&nbsp;满载率优先参数范围:0-100
                  <br />4.&nbsp;车辆速度范围：1-120(单位：km/h)
                </el-form-item>
              </el-card>
            </el-form>
            <div class="demo-drawer__footer" style="text-align: center;">
              <el-button style="margin-right:40px;" @click="$refs.drawer.closeDrawer()">取 消</el-button>
              <el-button class="btn-success" @click="closeDrawer" style="margin-left:40px;">确 定</el-button>
            </div>
          </div>
        </el-drawer>
</template>

<script>
export default {
  props: {
      // step: Number,
      // distancePrior: Number, //距离优先
      // timePrior: Number, //时间优先
      // loadPrior: Number, //满载率优先
      // speedValue: Number,
      // drawerShow: Boolean,
      value: {
        type: Object
      }
  },
  data() {
    return {
      saveConfig: false,
      // show: false,
      // distancePrior: 5, //距离优先
      // timePrior: 1, //时间优先
      // loadPrior: 4, //满载率优先
      // speed_value: 10,
      formLabelWidth: "110px",
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
    };
  },
  methods: {
    closeDrawer() {
      this.saveConfig = true;
      this.$refs.drawer.closeDrawer();
    },
    handleClose(done) {
      if (!this.saveConfig) {
        done();
        return;
      }
      this.saveConfig = false;
      if (this.value.distancePrior == "") {
        this.value.distancePrior = 5;
      }
      if (this.value.timePrior == "") {
        this.value.timePrior = 1;
      }
      if (this.value.loadPrior == "") {
        this.value.loadPrior = 4;
      }
      if (this.value.speedValue == "") {
        this.value.speedValue = 10;
      }
      console.log(this.value.distancePrior);
      console.log(this.value.timePrior);
      console.log(this.value.loadPrior);
      console.log(this.value.speedValue);
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
