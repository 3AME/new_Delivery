<template>
  <el-dialog title="添加路线" :visible="visible" width="40%" @open="onShow" @close="onHide">
    <el-row style="padding: 10px">
      <el-col :span="8">起始节点：</el-col>
      <el-col :span="16">
        <el-input size="mini" v-model="node_edge.u" autidocomplete="off" clearable disabled></el-input>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">目标节点：</el-col>
      <el-col :span="16">
        <!-- <el-input size="mini" v-model="edge.v" autidocomplete="off" clearable></el-input> -->
        <el-select
          v-model="node_edge.v"
          filterable
          allow-create
          default-first-option
          placeholder="目标节点"
          size="mini"
        >
          <!-- <el-option v-for="item in value.nodes" :key="item.id" :label="item.name" :value="item.id"></el-option> -->
          <el-option v-for="item in end_nodes" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="padding: 10px">
      <el-col :span="8">距离：</el-col>
      <el-col :span="16">
        <el-input size="mini" v-model="node_edge.w" autidocomplete="off" clearable></el-input>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onHide">取 消</el-button>
      <el-button type="primary" @click="addEdge">添 加</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
    node: {
      type: Object,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      node_edge: {
        u: 0,
        v: 0,
        w: 5,
      },
      end_nodes: [],
    };
  },
  methods: {
    onShow() {
      this.end_nodes = [];
      let temp = new Set();
      this.value.edges.forEach((edge) => {
        if (edge.u == this.node.id) {
          temp.add(edge.v);
        } else if (edge.v == this.node.id) {
          temp.add(edge.u);
        }
      });

      this.value.nodes.forEach((node) => {
        if (this.node.id != node.id && !temp.has(node.id)) {
          this.end_nodes.push(node);
        }
      });
      this.node_edge = {
        u: this.node.id,
        v: this.end_nodes[0].id,
        w: 5,
      };
      console.log('temp=' + JSON.stringify(Array.from(temp)));
      console.log('end_nodes=' + JSON.stringify(this.end_nodes));
      console.log('node_edge=' + JSON.stringify(this.node_edge));
    },
    onHide() {
      this.$emit("update:visible", false);
    },
    addEdge() {
      this.node_edge.w = parseFloat(this.node_edge.w);
      if (this.node_edge.w > 0) {
        this.value.edges.push({
          u: this.node_edge.u,
          v: this.node_edge.v,
          w: this.node_edge.w,
        });
        this.$emit("add");
        this.onHide();
      } else {
        this.$notify.error({
          title: "添加失败",
          message: "两个节点之间的距离必须大于0",
        });
      }
    },
  },
};
</script>

<style>
</style>
