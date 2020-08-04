<template>
  <el-popover
        :key="value.id"
        title="修改地点信息"
        :name="index"
        trigger="hover"
        placement="right"
      >
        <el-row style="padding: 10px">
          <el-col :span="8">节点类型：</el-col>
          <el-col :span="16">
            <el-select
              v-model="value.type"
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
            <el-input size="mini" v-model="value.name" autidocomplete="off" clearable></el-input>
          </el-col>
        </el-row>
        <el-row style="padding: 10px">
          <el-col :span="8">横坐标：</el-col>
          <el-col :span="16">
            <el-input size="mini" v-model="value.x" autidocomplete="off" clearable></el-input>
          </el-col>
        </el-row>
        <el-row style="padding: 10px">
          <el-col :span="8">纵坐标：</el-col>
          <el-col :span="16">
            <el-input size="mini" v-model="value.y" autidocomplete="off" clearable></el-input>
          </el-col>
        </el-row>
        <el-row style="padding: 10px">
          <el-col :span="8">需求量</el-col>
          <el-col :span="16">
            <el-select
              v-model="value.demand"
              filterable
              allow-create
              default-first-option
              placeholder="需求量"
              size="mini"
              :disabled="value.type == 'depot'"
            >
              <el-option v-for="item in need_options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div style="text-align: center; padding: 10px">
          <i
            @click="removeDepot()"
            class="i-tag el-icon-delete"
            style="font-size: 16px; color: red;"
          ></i>
        </div>
        <div slot="reference" class="el-card__header">
          <el-row type="flex" justify="space-around">
            <el-col :span="4">
              <i
                class="el-icon-office-building"
                :style="'font-size: 20px; float: left; color: ' + getNodeColorByType() + ';'"
              ></i>
            </el-col>
            <el-col :span="16">
              <span
                :style="'font-size: 12px;padding: 0 8px; color:' + getNodeColorByType() + ';'"
              >节点名：{{ value.name }}</span>
            </el-col>
            <el-col :span="4">
              <i
                class="el-icon-delete"
                style="float: right; color: red;"
                @click="removeDepot()"
              ></i>
            </el-col>
          </el-row>
        </div>
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
      need_options: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      node_types: [
        { type: "depot", title: "中心节点" },
        { type: "customer", title: "子节点" },
        { type: "other", title: "其它节点" },
      ],
    };
  },
  methods: {
    getNodeColorByType() {
      return this.value.type == "depot"
        ? "red"
        : this.value.type == "customer"
        ? "#02c58d"
        : "#fcbe2d";
    },
    removeDepot() {
      // this.value.nodes.splice(this.value.nodes.indexOf(depot), 1);
    },
    clearDepots() {
      // this.value.nodes.splice(0, this.value.nodes.length);
    },
  },
};
</script>

<style>
</style>
