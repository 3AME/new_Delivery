<template>
  <el-dialog title="路线详情" :visible="visible" width="40%" @open="onShow" @close="onHide">
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
        <el-input type="number" size="mini" v-model="node_edge.w" autidocomplete="off" clearable></el-input>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onHide">取 消</el-button>
      <el-button type="primary" @click="saveEdge">保 存</el-button>
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
    edge: {
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
      console.log('node=' + JSON.stringify(this.node));
      console.log('edge=' + JSON.stringify(this.edge));
      this.node_edge = {
        u: this.node.id,
        v: this.edge.u == this.node.id ? this.edge.v : this.edge.u,
        w: this.edge.w,
      };
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

      console.log('temp=' + JSON.stringify(Array.from(temp)));
      console.log('end_nodes=' + JSON.stringify(this.end_nodes));
      console.log('node_edge=' + JSON.stringify(this.node_edge));
    },
    onHide() {
      this.$emit("update:visible", false);
    },
    saveEdge() {
      this.node_edge.w = parseFloat(this.node_edge.w);
      console.log('saveEdge node_edge=' + JSON.stringify(this.node_edge));
      if (this.node_edge.w > 0) {
        let v = this.edge.u == this.node.id ? this.edge.v : this.edge.u;
        if (this.node_edge.v != v || this.node_edge.w != this.edge.w) {
          this.$emit("save", this.edge, this.node_edge);
        }
        this.onHide();
      } else {
        this.$notify.error({
          title: "保存失败",
          message: "两个节点之间的距离必须大于0",
        });
      }
    },
  },
};
</script>

<style>
</style>
