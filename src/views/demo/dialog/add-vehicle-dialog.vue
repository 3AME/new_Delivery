<template>
  <el-dialog title="添加车辆" :visible="visible" width="40%" @open="onOpen" @close="onClose">
    <!-- <span>添加车辆类型</span> -->
    <el-row style="padding: 10px">
      <el-col :span="8">车辆类型：</el-col>
      <el-col :span="16">
        <el-input size="mini" v-model="temp_vehicle.id" autidocomplete="off" clearable></el-input>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">运输中心：</el-col>
      <el-col :span="16">
        <el-select
          v-if="value.nodes != undefined"
          v-model="temp_vehicle.depot"
          filterable
          allow-create
          default-first-option
          placeholder="运输中心"
          size="mini"
        >
          <el-option
            v-for="item in value.nodes.filter(node => {return node.type == 'depot'})"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">车辆载重：</el-col>
      <el-col :span="16">
        <el-input-number v-model="temp_vehicle.load" :min="1" :max="1000" label="车辆载重" size="mini"></el-input-number>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">车辆里程：</el-col>
      <el-col :span="16">
        <el-input-number
          v-model="temp_vehicle.mileage"
          :step="5"
          :min="10"
          :max="1000"
          label="车辆里程"
          size="mini"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">车辆数量：</el-col>
      <el-col :span="16">
        <el-input-number v-model="temp_vehicle.count" :min="1" :max="100" label="车辆数量" size="mini"></el-input-number>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="addVehicle">添 加</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      temp_vehicle: { id: "五菱", depot: 1, load: 100, mileage: 50, count: 5 },
      // dialog_visible: this.visible,
    };
  },
  methods: {
    onOpen() {
      this.temp_vehicle = {
        id: "五菱",
        depot: 1,
        load: 2,
        mileage: 50,
        count: 5,
      };
      let depots = this.value.nodes.filter(node => {return node.type == 'depot'});
      console.log('depots=' + JSON.stringify(depots));
      this.temp_vehicle.depot = depots[0].id;
    },
    onClose() {
      // this.dialog_visible = false;
      // this.$emit("onVisibleChange", this.dialog_visible);
      this.$emit("update:visible", false);
    },
    addVehicle() {
      // this.$emit("add", {
      //   id: this.temp_vehicle.id,
      //   depot: this.temp_vehicle.depot,
      //   load: this.temp_vehicle.load,
      //   mileage: this.temp_vehicle.mileage,
      //   count: this.temp_vehicle.count,
      // });
      this.value.vehicles.push({
        id: this.temp_vehicle.id,
        depot: this.temp_vehicle.depot,
        load: this.temp_vehicle.load,
        mileage: this.temp_vehicle.mileage,
        count: this.temp_vehicle.count,
      });
      console.log('value=' + JSON.stringify(this.value));
      this.onClose();
    },
  },
};
</script>

<style>
/* .el-dialog__wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
.el-dialog {

  display: inline-block;
  width: 30%;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
} */
</style>
