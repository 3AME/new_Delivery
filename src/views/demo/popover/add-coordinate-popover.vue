<template>
  <el-popover
    title="添加坐标节点"
    trigger="click"
    placement="bottom"
    v-if="value != undefined"
    @show="onShow"
  >
    <el-row style="padding: 10px">
      <el-col :span="8">节点类型：</el-col>
      <el-col :span="16">
        <el-select
          v-model="temp_node.type"
          filterable
          allow-create
          default-first-option
          placeholder="节点类型"
          size="mini"
        >
          <el-option
            v-for="item in node_types"
            :key="item.type"
            :label="item.title"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">节点名：</el-col>
      <el-col :span="16">
        <el-input size="mini" v-model="temp_node.name" autidocomplete="off" clearable></el-input>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">横坐标：</el-col>
      <el-col :span="16">
        <el-input size="mini" v-model="temp_node.x" autidocomplete="off" clearable></el-input>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">纵坐标：</el-col>
      <el-col :span="16">
        <el-input size="mini" v-model="temp_node.y" autidocomplete="off" clearable></el-input>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">需求量</el-col>
      <el-col :span="16">
        <el-select
          v-model="temp_node.demand"
          filterable
          allow-create
          default-first-option
          placeholder="需求量"
          size="mini"
          :disabled="temp_node.type == 'depot'"
        >
          <el-option v-for="item in need_options" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div style="text-align: center; padding: 10px">
      <el-button
        class="btn-action"
        @click="addCoordinate"
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
    >添加节点</el-button>
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
      temp_node: {
        type: "customer",
        id: 1,
        name: "",
        demand: 0.5,
        x: 0,
        y: 0,
      },
      need_options: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      node_types: [
        { type: "depot", title: "中心节点" },
        { type: "customer", title: "子节点" },
        { type: "other", title: "其它节点" },
      ],
    };
  },
  methods: {
    onShow() {
      let id = this.generateId();
      this.temp_node.id = id;
      this.temp_node.name = "" + id;
    },
    generateId() {
      if (this.value != undefined) {
        let ids = this.value.map((node) => {
          return node.id;
        });
        ids.sort((x, y) => {
          if (x < y) {
            return -1;
          } else if (x > y) {
            return 1;
          } else {
            return 0;
          }
        });
        console.log("ids=" + JSON.stringify(ids));
        for (let i = 1; i < ids[ids.length - 1]; i++) {
          if (i != ids[i - 1]) {
            return i;
          }
        }
        return ids.length + 1;
      }
      return 1;
    },
    addCoordinate() {
      let sames = this.value.filter((node) => {
        return node.x == this.temp_node.x && node.y == this.temp_node.y;
      });
      if (sames.length > 0) {
      }
      this.value.push({
        type: this.temp_node.type,
        id: this.temp_node.id,
        name: this.temp_node.name,
        demand: this.temp_node.demand,
        x: this.temp_node.x,
        y: this.temp_node.y,
      });
      this.temp_node = {
        type: "customer",
        id: 1,
        name: "",
        demand: 0.5,
        x: 0,
        y: 0,
      };
    },
  },
};
</script>

<style>
</style>
