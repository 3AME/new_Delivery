<template>
  <div class="header-view">
    <div class="left-icon">
      <!-- <el-page-header @back="back" content="川流配送" style="padding: 10px;"></el-page-header> -->
      <el-row>
        <el-col :span="8">
          <el-button class="no-drag" type="text" size="mini" @click="back" style="padding: 10px;">
            <i class="btn el-icon-arrow-left"></i>
          </el-button>
        </el-col>
        <el-col :span="8">
          <el-button
            class="no-drag"
            type="text"
            size="mini"
            @click="forward"
            style="padding: 10px;"
          >
            <i class="btn el-icon-arrow-right"></i>
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <!-- <el-col :span="4">
          <el-button
            class="no-drag"
            type="text"
            size="mini"
            style="padding: 10px;"
          >
            <i class="btn el-icon-shopping-cart-2"></i>
          </el-button>
        </el-col> -->
        <el-col :span="4">
          <el-button
            class="no-drag"
            type="text"
            size="mini"
            @click="refresh"
            style="padding: 10px;"
          >
            <i class="btn el-icon-refresh"></i>
          </el-button>
        </el-col>
        <!-- <el-col :span="4">
          <el-button
            class="no-drag"
            type="text"
            size="mini"
            @click="setting"
            style="padding: 10px;"
          >
            <i class="btn el-icon-setting"></i>
          </el-button>
        </el-col> -->
        <el-col :span="4">
          <el-button
            class="no-drag"
            type="text"
            size="mini"
            @click="minimize"
            style="padding: 10px;"
          >
            <i class="btn el-icon-minus"></i>
          </el-button>
        </el-col>
        <el-col :span="4">
          <el-button
            class="no-drag"
            type="text"
            size="mini"
            @click="maximize"
            style="padding: 10px;"
          >
            <i class="btn el-icon-copy-document"></i>
          </el-button>
        </el-col>
        <el-col :span="4">
          <el-button class="no-drag" type="text" size="mini" @click="close" style="padding: 10px;">
            <i class="btn el-icon-close"></i>
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  props: {},
  inject: ["reload"],
  data() {
    return {
      state: "",
    };
  },
  methods: {
    close() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ipcRenderer.send("close");
        })
        .catch(() => {});
    },
    minimize() {
      ipcRenderer.send("minimize");
    },
    maximize() {
      ipcRenderer.send("maximize");
    },
    back() {
      if (this.$route.name !== "music") {
        this.$router.go(-1);
      }
    },
    forward() {
      this.$router.go(1);
    },
    refresh() {
      // this.reload();
      window.location.reload();
    },
    setting() {

    },
  },
};
</script>

<style>
.el-message-box {
    display: inline-block;
    width: 30%;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #FFF;
    border-radius: 8px;
    border: 1px solid #EBEEF5;
    font-size: 18px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.no-drag {
  -webkit-app-region: no-drag;
}
.search .el-input__inner {
  /* border: 1px solid #c5c5c5; */
  border: none;
  border-radius: 20px;
  background: #f4f4f4;
  color: #8c8c8c;
}
.btn {
  font-size: 17px;
  color: #000;
}
.btn:hover {
  color: #1296db;
}
.header-view {
  height: 45;
  padding: 0;
  margin: 0;

  /* border-radius: 12px; */
  border-top-right-radius: 12px;
  -webkit-app-region: drag;
  background: #fff;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  /* flex: auto; */
}
.middle-icon {
  /* display: flex;
  align-self: middle; */
  margin-top: 5px;
}
</style>
