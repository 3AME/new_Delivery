<template>
  <el-aside width="20%" height="100%" style="margin: 10px;">
    <div class="card" style="margin: 10px">
      <div style="text-align: center; padding: 20px">
        <img width="40%" src="../../../assets/images/small/地点.png" />
      </div>
      <div style="padding: 10px; border-bottom: 1px solid #EBEEF5;">
        <el-row>
          <el-col :span="16">
            <span style="font-size: 24px;">地点列表</span>
          </el-col>

          <el-col
            :span="8"
            style="left: 0; right: 0; top: 0; bottom: 0; margin: auto; position: absolute; top: 50%; transform: translate(100%, -25%);"
          >
            <el-popover
              placement="bottom"
              width="240"
              trigger="hover"
              v-if="value.nodes.length > 0"
            >
              <p style="padding: 10px">确定清空路线列表？</p>
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
        style="width: 30%;"
      >
        <el-row style="padding: 10px">
          <el-col :span="8">节点ID：</el-col>
          <el-col :span="16">
            <el-input size="mini" v-model="path.id" :disabled="true"></el-input>
          </el-col>
        </el-row>
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
        <el-row style="padding: 10px;">
          <el-col :span="8">路线信息：</el-col>
          <el-col :span="16">
            <!-- <el-tag
              v-for="(tag, index) in routeTags"
              :key="index"
              closable
              :disable-transitions="false"
              @close="onTagClose(tag, path)"
              @click="onShowDetail(tag, path)"
            >{{tag.u == path.id ? tag.v : tag.u}}</el-tag> -->
            <el-tag
              v-for="(tag, index) in routeTags"
              :key="index"
              closable
              :disable-transitions="false"
              @close="onTagClose(tag, path)"
              @click="onShowDetail(tag, path)"
            >{{tag.name}}</el-tag>
            <el-button v-if="routeTags.length != value.nodes.length - 1" class="button-new-tag" size="small" @click="onAddEdge(path)">+ 添加路线</el-button>
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
                @click="removeDepotSync(path)"
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
  data() {
    return {
      temp_node: {
        type: "customer",
        id: 1,
        name: "",
        demand: 0.5,
      },
      need_options: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      node_types: [
        { type: "depot", title: "中心节点" },
        { type: "customer", title: "子节点" },
        { type: "other", title: "其它节点" },
      ],
      routeTags: [],
      visible: false,
    };
  },
  methods: {
    initRouteTags(node) {
      // this.routeTags = this.value.edges.filter((edge) => {
      //   return edge.u == node.id || edge.v == node.id;
      // });
      let names = new Map();
      this.value.nodes.forEach(node => {
        names.set(node.id, node.name);
      })
      this.routeTags = [];
      let temp = new Set();
      this.value.edges.forEach(edge => {
        if (edge.u == node.id) {
          if (!temp.has(edge.v)) {
            temp.add(edge.v);
            this.routeTags.push({
              u: edge.u,
              v: edge.v,
              w: edge.w,
              name: names.get(edge.v)
            });
          }
        } else if (edge.v == node.id) {
          if (!temp.has(edge.u)) {
            temp.add(edge.u);
            this.routeTags.push({
              u: edge.u,
              v: edge.v,
              w: edge.w,
              name: names.get(edge.u)
            });
          }
        }
      });
      console.log('temp=' + JSON.stringify(Array.from(temp)));
      console.log('routeTas=' + JSON.stringify(this.routeTags));

      // this.value.nodes.forEach(node => {
      //   if (temp.has(node.id)) {
      //     this.routeTags.push(node);
      //   }
      // });
    },
    onShow(node) {
      this.temp_node.type = node.type;
      this.temp_node.id = node.id;
      this.temp_node.name = node.name;
      this.temp_node.demand = node.demand;
      let tags = [];
      console.log("edges=" + JSON.stringify(this.value.edges));
      this.initRouteTags(node);
      // this.value.edges.forEach(edge => {
      //   if (edge.u == node.id || edge.v == node.id) {
      //     routeTags.push({
      //       start: edge.u,
      //       end: edge.v,
      //       len: edge.w
      //     });
      //   }
      // });
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
        this.temp_node.demand != node.demand
      ) {
        // node.type = this.temp_node.type;
        // node.name = this.temp_node.name;
        // node.demand = this.temp_node.demand;
        this.onChange();
      }
    },
    onAddEdge(node) {
      this.$emit("onAddEdge", node);
    },
    onSelectChange(select) {
      console.log("onSelectChange select=" + select);
      if (select != this.temp_node.type) {
        this.temp_node.type = select;
        this.onChange();
      }
    },
    onTagClose(tag, node) {
      this.routeTags.splice(this.routeTags.indexOf(tag), 1);
      this.value.edges.splice(this.value.edges.indexOf(tag), 1);
      // this.initRouteTags(node);
      this.onChange();
    },
    onShowDetail(tag, node) {
      this.$emit("onShowDetail", {
        edge: tag,
        node: node
      });
    },
    getNodeColorByType(type) {
      return type == "depot"
        ? "red"
        : type == "customer"
        ? "#02c58d"
        : "#fcbe2d";
    },
    removeDepotSync(depot) {
      this.removeDepot(depot);
      this.onChange();
    },
    removeDepot(depot) {
      console.log("depot=" + JSON.stringify(depot));
      console.log("edges=" + JSON.stringify(this.value));
      this.value.nodes.splice(this.value.nodes.indexOf(depot), 1);
      for (let i = this.value.edges.length - 1; i >= 0; i--) {
        var item = this.value.edges[i];
        if (item.u === depot.id || item.v === depot.id) {
          this.value.edges.splice(i, 1);
          console.log("remove i=" + i);
        }
      }
      console.log("edges=" + JSON.stringify(this.value));
    },
    clearDepots() {
      this.value.nodes.splice(0, this.value.nodes.length);
      this.value.edges.splice(0, this.value.edges.length);
      this.onChange();
    },
    onChange() {
      this.$emit("onChange");
    },
  },
};
</script>

<style>
.el-tag {
  margin: 5px;
}

.el-tag + .el-tag {
  margin-left: 5px;
}

.el-popover {
  position: absolute;
  background: #fff;
  width: 40%;
  border: 1px solid #ebeef5;
  padding: 12px;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
}
</style>
