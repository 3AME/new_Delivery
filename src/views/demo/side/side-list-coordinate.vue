<template>
  <el-aside width="20%" height="100%" style="margin: 10px;">
    <div class="shadow-card" style="margin: 10px">
      <div style="text-align: center; padding: 20px">
        <img width="40%" src="../../../assets/images/small/地点.png" />
      </div>
      <div style="padding: 10px; border-bottom: 1px solid #EBEEF5;">
        <el-row>
          <el-col :span="16">
            <span style="font-size: 24px;">坐标列表</span>
          </el-col>
          <el-col
            :span="8"
            style="left: 0; right: 0; top: 0; bottom: 0; margin: auto; position: absolute; top: 50%; transform: translate(100%, -25%);"
          >
            <!-- <el-popconfirm
              placement="bottom"
              width="240"
              trigger="hover"
              v-if="value.nodes.length > 0"
              title="确定清空坐标列表？"
              @onConfirm="clearDepots"
            >
              <i
                slot="reference"
                class="el-icon-delete"
                style="float: right; font-size: 12px; color: red;"
              >清空</i>
            </el-popconfirm> -->
            <el-popover
              placement="bottom"
              width="240"
              trigger="hover"
              v-if="value.nodes.length > 0"
            >
              <p style="padding: 10px">确定清空坐标列表？</p>
              <div style="text-align: right; margin: 0; padding: 10px">
                <el-button type="primary" size="mini" @click="clearDepots()">确定</el-button>
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
      <div v-if="value.nodes.length == 0" class="box-card">
        <div style="font-size: 16px; color: #999; text-align: center; padding: 100px 0;">
          <img width="80%" src="../../../assets/images/small/暂无数据.png" />
          <p>什么都没有</p>
        </div>
      </div>
      <el-popover
        v-for="(path, index) in value.nodes"
        :key="path.id"
        title="修改地点信息"
        :name="index"
        trigger="click"
        placement="right"
        @show="onShow(path)"
        @hide="onHide(path)"
      >
        <el-row style="padding: 10px">
          <el-col :span="8">节点类型：</el-col>
          <el-col :span="16">
            <el-select
              v-model="path.type"
              filterable
              allow-create
              default-first-option
              placeholder="节点类型"
              size="mini"
              @change="onSelectChange"
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
            <el-input size="mini" v-model="path.name" autidocomplete="off" clearable></el-input>
          </el-col>
        </el-row>
        <el-row style="padding: 10px">
          <el-col :span="8">横坐标：</el-col>
          <el-col :span="16">
            <el-input size="mini" v-model="path.x" autidocomplete="off" clearable></el-input>
          </el-col>
        </el-row>
        <el-row style="padding: 10px">
          <el-col :span="8">纵坐标：</el-col>
          <el-col :span="16">
            <el-input size="mini" v-model="path.y" autidocomplete="off" clearable></el-input>
          </el-col>
        </el-row>
        <el-row style="padding: 10px">
          <el-col :span="8">需求量</el-col>
          <el-col :span="16">
            <el-select
              v-model="path.demand"
              filterable
              allow-create
              default-first-option
              placeholder="需求量"
              size="mini"
              :disabled="path.type == 'depot'"
            >
              <el-option v-for="item in need_options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div style="text-align: center; padding: 10px">
          <i
            @click="removeDepot(path)"
            class="i-tag el-icon-delete"
            style="font-size: 16px; color: red;"
          ></i>
        </div>
        <div slot="reference" class="el-card__header">
          <el-row type="flex" justify="space-around">
            <el-col :span="4">
              <i
                class="el-icon-office-building"
                :style="'font-size: 20px; float: left; color: ' + getNodeColorByType(path.type) + ';'"
              ></i>
            </el-col>
            <el-col :span="16">
              <span
                :style="'font-size: 12px;padding: 0 8px; color:' + getNodeColorByType(path.type) + ';'"
              >节点名：{{ path.name }}</span>
            </el-col>
            <el-col :span="4">
              <i
                class="el-icon-delete"
                style="float: right; color: red;"
                @click="removeDepot(path)"
              ></i>
            </el-col>
          </el-row>
        </div>
      </el-popover>
      <!-- <coordinate-detail-popover v-for="(path, index) in value.nodes" v-model="path" :key="index"/> -->
    </div>
  </el-aside>
</template>

<script>

export default {
  props: {
    value: {
      type: Object,
    },
    isRoute: {
      type: Boolean,
    },
  },
  data() {
    return {
      temp_node: {
        type: "customer",
        id: 1,
        name: "",
        x: 0,
        y: 0,
        demand: 0.5,
      },
      need_options: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      node_types: [
        { type: "depot", title: "中心节点" },
        { type: "customer", title: "客户节点" },
        { type: "other", title: "其它节点" },
      ],
    };
  },
  methods: {
    onShow(node) {
      this.temp_node.type = node.type;
      this.temp_node.id = node.id;
      this.temp_node.name = node.name;
      this.temp_node.x = node.x;
      this.temp_node.y = node.y;
      this.temp_node.demand = node.demand;
    },
    onHide(node) {
      if (this.temp_node.id != node.id) {
        return;
      }
      console.log("onHide node=" + JSON.stringify(node));
      console.log("onhide temp_node=" + JSON.stringify(this.temp_node));
      if (
        this.temp_node.type != node.type ||
        this.temp_node.name != node.name ||
        this.temp_node.x != node.x ||
        this.temp_node.y != node.y ||
        this.temp_node.demand != node.demand
      ) {
        this.onChange();
      }
    },
    onSelectChange(select) {
      console.log("onSelectChange select=" + select);
      if (select != this.temp_node.type) {
        this.temp_node.type = select;
        this.onChange();
      }
    },
    getNodeColorByType(type) {
      return type == "depot"
        ? "red"
        : type == "customer"
        ? "#02c58d"
        : "#fcbe2d";
    },
    removeDepot(depot) {
      this.value.nodes.splice(this.value.nodes.indexOf(depot), 1);
      this.onChange();
    },
    clearDepots() {
      this.value.nodes.splice(0, this.value.nodes.length);
      this.onChange();
    },
    onChange() {
      this.$emit("onChange");
    },
  },
};
</script>

<style>
</style>
