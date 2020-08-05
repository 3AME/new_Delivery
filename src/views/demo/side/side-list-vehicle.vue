<template>
<el-aside width="20%" height="100%" style="margin: 10px;">
  <div class="card" style="margin: 10px">
    <div style="text-align: center; padding: 20px">
      <img width="40%" src="../../../assets/images/small/车辆.png" />
    </div>
    <div style="padding: 10px; border-bottom: 1px solid #EBEEF5;">
      <el-row>
        <el-col :span="16">
          <span style="font-size: 24px;">车辆列表</span>
        </el-col>

        <el-col
          :span="8"
          style="left: 0; right: 0; top: 0; bottom: 0; margin: auto; position: absolute; top: 50%; transform: translate(100%, -25%);"
        >
          <el-popover placement="bottom" width="240" trigger="hover" v-if="value.vehicles.length > 0">
            <p style="padding: 10px">确定清空车辆列表？</p>
            <div style="text-align: right; margin: 0; padding: 10px">
              <el-button type="primary" size="mini" @click="clearVehicle">确定</el-button>
            </div>
            <i
              slot="reference"
              class="el-icon-delete"
              style="float: right; font-size: 12px; color: red;"
            >清空</i>
          </el-popover>
        </el-col>
      </el-row>
    </div>
    <div v-if="value.vehicles.length == 0" class="box-card">
      <div style="font-size: 16px; color: #999; text-align: center; padding: 100px 0;">
        <img width="80%" src="../../../assets/images/small/暂无数据.png" />
        <p>什么都没有</p>
      </div>
    </div>
    <el-popover
      v-for="(vehicle, index) in value.vehicles"
      :key="index"
      title="修改车辆信息"
      :name="vehicle.id"
      trigger="click"
      placement="right"
    >
      <el-row style="padding: 10px">
        <el-col :span="8">车辆类型：</el-col>
        <el-col :span="16">
          <el-input size="mini" v-model="vehicle.id" autidocomplete="off" clearable></el-input>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col :span="8">运输中心：</el-col>
        <el-col :span="16">
          <el-select
            v-model="vehicle.depot"
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
          <el-input-number v-model="vehicle.load" :min="1" :max="100" label="车辆载重" size="mini"></el-input-number>
        </el-col>
      </el-row>
      <el-row style="padding: 10px">
        <el-col :span="8">车辆里程：</el-col>
        <el-col :span="16">
          <el-input-number
            v-model="vehicle.mileage"
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
          <el-input-number v-model="vehicle.count" :min="1" :max="10" label="车辆里程" size="mini"></el-input-number>
        </el-col>
      </el-row>
      <div style="text-align: center; padding: 10px">
        <i
          @click="removeVehicle(vehicle)"
          class="i-tag el-icon-delete"
          style="font-size: 18px; color: red;"
        ></i>
      </div>
      <div slot="reference" class="el-card__header">
        <el-row type="flex" justify="space-around">
          <el-col :span="4">
            <i class="el-icon-truck" style="font-size: 20px; float: left; color: #409eff"></i>
          </el-col>
          <el-col :span="16">
            <span style="font-size: 12px;padding: 0 8px">车辆类型：{{ vehicle.id }}</span>
          </el-col>
          <el-col :span="4">
            <i
              class="el-icon-delete"
              style="float: right; color: red;"
              @click="removeVehicle(vehicle)"
            ></i>
          </el-col>
        </el-row>
      </div>
    </el-popover>
  </div>
</el-aside>

</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
  },
  // data() {
  // },
  methods: {
    removeVehicle(vehicle) {
      this.value.vehicles.splice(this.value.vehicles.indexOf(vehicle), 1);
    },
    clearVehicle(vehicle) {
      this.value.vehicles.splice(0, this.value.vehicles.length);
    },
  }
};
</script>

<style>
</style>
