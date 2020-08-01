<template>
  <el-popover title="添加车辆类型" trigger="click" placement="bottom" v-if="value != undefined">
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
          v-model="temp_vehicle.depot"
          filterable
          allow-create
          default-first-option
          placeholder="运输中心"
          size="mini"
        >
          <el-option
            v-for="item in value.filter(node => {return node.type == 'depot'})"
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
        <el-input-number v-model="temp_vehicle.load" :min="1" :max="10" label="车辆载重" size="mini"></el-input-number>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">车辆里程：</el-col>
      <el-col :span="16">
        <el-input-number
          v-model="temp_vehicle.mileage"
          :step="5"
          :min="10"
          :max="120"
          label="车辆里程"
          size="mini"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">车辆数量：</el-col>
      <el-col :span="16">
        <el-input-number v-model="temp_vehicle.count" :min="1" :max="10" label="车辆里程" size="mini"></el-input-number>
      </el-col>
    </el-row>
    <div style="text-align: center; padding: 10px">
      <el-button
        class="btn-action"
        @click="addVehicle"
        type="text"
        icon="el-icon-search"
        style="color: #02c58d"
      >添加</el-button>
    </div>
    <el-button
      slot="reference"
      class="btn-action"
      type="text"
      icon="el-icon-search"
      style="color: #02c58d"
    >添加车辆</el-button>
  </el-popover>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
    },
  },
  data() {
    return {
      temp_vehicle: { id: "xx", depot: 1, load: 2, mileage: 50, count: 5 }
    };
  },
  methods: {
    addVehicle() {
      this.$emit("add", {
        id: this.temp_vehicle.id,
        depot: this.temp_vehicle.depot,
        load: this.temp_vehicle.load,
        mileage: this.temp_vehicle.mileage,
        count: this.temp_vehicle.count,
      });
      this.temp_vehicle.id = 'xx';
    },
  },
};
</script>

<style>
</style>
