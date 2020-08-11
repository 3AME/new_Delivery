<template>
  <el-container v-loading="loading" class="content-container" style="overflow:hidden">
    <el-header height="auto" style="padding: 20px">
      <div>
        <strong style="width: 140px; color: #5673ff; padding: 10px; font-size: 24px">地图查询</strong>
      </div>
      <el-button-group class="card" style="margin-top: 20px">
        <el-button
          class="btn-action"
          type="text"
          icon="el-icon-set-up"
          @click="visible = true"
          style="color: #409eff;"
          :disabled="queryValue.problem.nodes.length == 0"
        >添加车辆</el-button>
        <el-button
          class="btn-action"
          @click="query"
          type="text"
          icon="el-icon-search"
          style="color: #02c58d;"
        >查询</el-button>
        <el-button
          class="btn-action"
          type="text"
          @click="saveProblem"
          icon="el-icon-tickets"
          style="color: #fcbe2d"
          :disabled="queryValue.problem.nodes.length == 0"
        >保存</el-button>
        <el-button
          class="btn-action"
          @click="drawerValue.drawerShow = true"
          type="text"
          icon="el-icon-set-up"
          style="color: #607d8b;"
        >设置算法参数</el-button>

        <el-switch
          v-model="selectMode"
          active-text="点击选点"
          style="padding-top: 20px; padding-bottom: 20px; padding-left: 12px; padding-right: 12px;"
        ></el-switch>
      </el-button-group>
    </el-header>

    <el-container style="overflow:auto;overflow-x: hidden !important; margin: 10px">
      <el-aside width="20%" class="aside" style="margin: 10px;">
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
                  v-if="queryValue.problem.nodes.length > 0"
                >
                  <p style="padding: 10px">确定清空地点列表？</p>
                  <div style="text-align: right; margin: 0; padding: 10px">
                    <el-button type="primary" size="mini" @click="clearTags">确定</el-button>
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
          <div v-if="queryValue.problem.nodes.length == 0" class="box-card">
            <div style="font-size: 16px; color: #999; text-align: center; padding: 100px 0;">
              <img width="80%" src="../../../assets/images/small/暂无数据.png" />
              <p>什么都没有</p>
            </div>
          </div>
          <el-popover
            v-for="(path, index) in queryValue.problem.nodes"
            :key="index"
            title="修改地点信息"
            :name="path.name"
            trigger="hover"
            placement="right"
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
                <el-col :span="16" style="text-align: center">
                  <span
                    :style="'font-size: 12px;padding: 0 8px; color:' + getNodeColorByType(path.type) + ';'"
                  >{{ path.name }}</span>
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
        </div>
      </el-aside>

      <el-container>
        <el-main
          class="card"
          height="100%"
          style="padding: 0px; margin: 20px 10px; border: 1px solid #ccc;"
        >
          <baidu-map
            :ak="ak"
            :center="center"
            :scroll-wheel-zoom="isScrollWheelZoom"
            style="height:100%;"
            :zoom="12"
            @click="handleChange"
            @load="handleMapLoaded"
            class="ele-form-bmap"
          >
            <bm-geolocation
              :autoLocation="true"
              :showAddressBar="true"
              @locationSuccess="handleChange"
              anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
              v-if="isShowGeolocation"
            ></bm-geolocation>

            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" v-if="isShowNavigation"></bm-navigation>

            <bm-control :offset="{width: '10px', height: '10px'}">
              <bm-auto-complete
                v-model="searchValue"
                :sugStyle="{zIndex: 999999}"
                @confirm="onAutoComplete"
              >
                <el-input :placeholder="'搜索并添加节点'" v-model="searchValue" clearable></el-input>
              </bm-auto-complete>
            </bm-control>
            <bm-local-search
              :auto-viewport="true"
              :keyword="searchValue"
              :location="location"
              :pageCapacity="10"
              :panel="false"
              @searchcomplete="handleSearchEnd"
              v-if="isSearching"
            ></bm-local-search>
            <bm-marker
              v-for="(item,index) in queryValue.problem.nodes"
              :key="index"
              :position="item"
              :dragging="true"
              animation="BMAP_ANIMATION_BOUNCE"
            />

            <bm-view style="width:100%; height:100%"></bm-view>

            <bm-driving
              v-for="(item, index) in drivingPath"
              :key="-index - 1"
              :start="item.start"
              :end="item.end"
              :startCity="item.start.city"
              :endCity="item.end.city"
              :auto-viewport="true"
              @onpolylinesset="onPolylinesSet"
              @resultshtmlset="resultsHtmlSet"
              @searchcomplete="searchComplete"
            />
          </baidu-map>

          <!-- <div style="position:absolute; right:30px; top:30px; background:#F00; width:40%; height:100px">sdrftgyhj</div> -->
        </el-main>
        <!-- <el-footer height="30%" class="card" style="margin: 20px 10px; ">
          <el-row style="padding: 10px">
            <el-col :span="4">关键词：</el-col>
            <el-col :span="8">
              <el-input size="mini" v-model="searchValue" autidocomplete="off" clearable></el-input>
            </el-col>
            <el-col :span="4">地区：</el-col>
            <el-col :span="8">
              <el-input size="mini" v-model="location" autidocomplete="off" clearable></el-input>
            </el-col>
          </el-row>
        </el-footer>-->
      </el-container>
      <vehicle-list-side v-model="queryValue.problem" />
    </el-container>
    <drawer v-model="drawerValue" />
    <query-dialog v-model="queryValue"></query-dialog>
    <add-vehicle-dialog v-model="queryValue.problem" :visible.sync="visible"></add-vehicle-dialog>
  </el-container>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import BmGeolocation from "vue-baidu-map/components/controls/Geolocation";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import drawer from "../drawer/";
import QueryDialog from "../dialog/query-dialog";
import AddVehicleDialog from "../dialog/add-vehicle-dialog";
// import RouteListSide from "../side/side-list-route";
import VehicleListSide from "../side/side-list-vehicle";

import p2eu from "../../../util/problem-to-excel-utils";

export default {
  inject: ["reload"], //注入依赖
  name: "ele-form-bmap",
  components: {
    BaiduMap,
    BmView,
    BmNavigation,
    BmLocalSearch,
    BmGeolocation,
    BmMarker,
    drawer,
    QueryDialog,
    AddVehicleDialog,
    // RouteListSide,
    VehicleListSide,
  },
  data() {
    return {
      show: false,
      drawerValue: {
        drawerShow: false,
        distancePrior: 5, //距离优先
        timePrior: 1, //时间优先
        loadPrior: 4, //满载率优先
        speedValue: 10,
        maxIter: 200,
      },
      queryValue: {
        show: false,
        name: "",
        fileName: undefined,
        problem: {
          nodes: [],
          vehicles: [],
          edges: [],
        },
        time: "",
        isHistory: false,
        type: "map",
      },
      dialogVisible: true,
      center: "成都市",
      location: "成都市",
      isSearching: true,
      searchList: [],
      searchValue: "",
      ak: "Fmr6cw34yLG1GZZKEyGSZcsE5c72Upwo",
      mapHeight: 500,
      isScrollWheelZoom: true,
      isShowNavigation: true,
      isShowGeolocation: true,
      placeholder: "添加地址",
      value: "成都市",
      // polylinePath: [],
      // vehicles: [{ id: "xx", depot: 0, load: 2, mileage: 50, count: 5 }],
      drivingPath: [
        // {
        //   start: "锦江区望江宾馆",
        //   end: "四川大学(江安校区)"
        // }
      ],
      tempDrivingPath: [],
      selectMode: false,
      inputVisible: false,
      need_options: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      node_types: [
        { type: "depot", title: "中心节点" },
        { type: "customer", title: "客户节点" },
        { type: "other", title: "其它节点" },
      ],
      loadOptions: [1, 2, 3, 4, 5],
      mileageOptions: [20, 25, 30, 35, 40, 45, 50],
      countOptions: [1, 2, 3],
      activeName: "0",
      activeNode: 0,
      loading: true,
      visible: false,
    };
  },
  activated() {
    let me = this;
    window.addEventListener("online", () => {
      if (!me.loading) {
        return;
      }
      me.loading = false;
      me.reload();
    });

    window.addEventListener("offline", () => {
      if (me.loading) {
        return;
      }
      me.loading = true;
      me.$notify.error({
        title: "错误",
        message: "网络已断开，请连接网络",
      });
    });
    if (navigator.onLine) {
      this.loading = false;
    } else {
      this.loading = true;
      this.$notify.error({
        title: "错误",
        message: "网络连接失败，请连接网络",
      });
    }
  },
  methods: {
    generateId() {
      if (this.queryValue.problem.nodes != undefined) {
        let ids = this.queryValue.problem.nodes.map((node) => {
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
        for (let i = 0; i < ids[ids.length - 1]; i++) {
          if (i != ids[i]) {
            return i;
          }
        }
        return ids.length;
      }
      return 0;
    },
    getNodeColorByType(type) {
      return type == "depot"
        ? "red"
        : type == "customer"
        ? "#02c58d"
        : "#fcbe2d";
    },
    refresh() {
      // this.reload();
      window.location.reload();
    },
    saveProblem() {
      p2eu.routeToExcel(this, this.queryValue.problem, "地图查询");
    },
    query() {
      if (this.queryValue.problem.nodes.length < 3) {
        this.$notify({
          title: "警告",
          message: "节点过少，请在地图上添加节点！",
          type: "warning",
        });
        return;
      }
      if (this.queryValue.problem.vehicles.length < 1) {
        this.$notify({
          title: "警告",
          message: "车辆过少，请添加车辆！",
          type: "warning",
        });
        return;
      }

      let depots = this.queryValue.problem.nodes.filter((path) => {
        return path.type == "depot";
      });

      if (depots.length < 1) {
        this.$notify({
          title: "警告",
          message: "请设置配送中心节点！",
          type: "warning",
        });
        return;
      }

      let customers = this.queryValue.problem.nodes.filter((path) => {
        return path.type == "customer";
      });

      if (customers.length < 2) {
        this.$notify({
          title: "警告",
          message: "客户节点过少！请添加客户节点",
          type: "warning",
        });
        return;
      }

      if (this.queryValue.problem.vehicles.length == 0) {
        this.$notify({
          title: "警告",
          message: "请添加车辆类型",
          type: "warning",
        });
        return;
      }

      let depotsId = depots.map((depot) => {
        return depot.id;
      });
      for (let i = 0; i < this.queryValue.problem.vehicles.length; i++) {
        let vehicle = this.queryValue.problem.vehicles[i];
        console.log("vehicle=" + JSON.stringify(vehicle));
        if (depotsId.indexOf(vehicle.depot) == -1) {
          this.$notify({
            title: "警告",
            message: "车辆类型：" + vehicle.id + "所在的配送中心不存在。",
            type: "warning",
          });
          return;
        }
      }

      var names = this.queryValue.problem.nodes.map((x) => {
        return x.name;
      });
      var problem = {
        routeMode: true,
        names: names,
        nodes: this.queryValue.problem.nodes,
        edges: this.queryValue.problem.edges,
        vehicles: this.queryValue.problem.vehicles,
        distancePrior: this.drawerValue.distancePrior,
        timePrior: this.drawerValue.timePrior,
        loadPrior: this.drawerValue.loadPrior,
        speed: this.drawerValue.speedValue,
        maxiter: this.drawerValue.maxIter,
      };
      console.log("drivingPath=" + JSON.stringify(this.drivingPath));
      // this.drivingPath.forEach(function (path, i) {
      //   var start = names.indexOf(path.start.name);
      //   var end = names.indexOf(path.end.name);
      //   problem.edges.push({
      //     u: start,
      //     v: end,
      //     w: path.len / 1000,
      //   });
      // });

      // for (var i = 0; i < this.polylinePath.length; i++) {
      //   problem.nodes.push({
      //     type: this.polylinePath[i].type,
      //     id: i,
      //     demand: this.polylinePath[i].demand,
      //   });
      // }
      // problem.nodes = this.queryValue.problem.nodes;

      console.log("query problem=" + JSON.stringify(problem));
      this.queryValue.problem = problem;
      this.queryValue.show = true;
    },
    // 地图加载成功
    handleMapLoaded() {
      if (this.value) {
        this.center = this.value;
        if (typeof this.value === "string") {
          this.searchValue = this.value;
        } else if (typeof this.value === "object" && this.value.address) {
          this.searchValue = this.value.address;
        }
      }
    },
    // 发起请求
    querySearch(queryString, cb) {
      console.log("querySearch queryString=" + queryString);
      if (queryString) {
        this.cb = cb;
        this.isSearching = true;
      }
    },
    // 搜索结束
    handleSearchEnd(res) {
      if (res && res.Ir && this.cb) {
        const list = res.Ir.map((pos) => {
          return {
            address: pos.address,
            point: pos.point,
            value: pos.title,
          };
        });
        this.cb(list);
        this.cb = null;
      }
    },
    // 位置改变
    handleChange(res) {
      console.log("handleChange");

      if (res && res.point) {
        if (this.selectMode) {
          this.printObj(res);
          // console.log("pixel=" + this.printObj(res.pixel));
          // console.log("target=" + this.printObj(res.target));
          // console.log("jb=" + this.printObj(res.jb));
          let me = this;
          let point = res.point;
          let geocoder = new BMap.Geocoder(); // 创建地址解析器的实例
          geocoder.getLocation(res.point, (rs) => {
            // this.add.site = rs.address;
            // 地址描述(string)=
            console.log(rs.address); // 这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
            console.log(rs.addressComponents); // 结构化的地址描述(object)
            console.log(rs.addressComponents.province); // 省
            console.log(rs.addressComponents.city); // 城市
            console.log(rs.addressComponents.district); // 区县
            console.log(rs.addressComponents.street); // 街道
            console.log(rs.addressComponents.streetNumber); // 门牌号
            console.log(rs.surroundingPois); // 附近的POI点(array)
            console.log(rs.business); // 商圈字段，代表此点所属的商圈(string)

            let id = me.generateId();

            let name = "地点(" + point.lng + ", " + point.lat + ")";
            me.activeName = "1";
            me.queryValue.problem.nodes.forEach(function (item) {
              var p = {
                start: {
                  name: name,
                  lng: point.lng,
                  lat: point.lat,
                  city: rs.addressComponents.city,
                },
                end: {
                  name: item.name,
                  lng: item.lng,
                  lat: item.lat,
                  city: item.city,
                },
                u: id,
                v: item.id,
                w: 0,
              };
              console.log("pppppppppppp=" + JSON.stringify(p));
              // me.drivingPath.push(p)
              me.tempDrivingPath.push(p);
            });
            if (me.tempDrivingPath.length > 0) {
              let edge = me.tempDrivingPath[0];
              me.drivingPath.push(edge);
              me.queryValue.problem.edges.push(edge);
            }
            me.activeNode = me.drivingPath.length;
            // console.log('size=' + me.drivingPath.length)
            // console.log('me.drivingPath=' + JSON.stringify(me.drivingPath))
            // console.log('lng=' + point.lng + ' lat=' + point.lat)
            let path = {
              id: id,
              name: name,
              lng: point.lng,
              lat: point.lat,
              city: rs.addressComponents.city,
            };
            if (me.queryValue.problem.nodes.length == 0) {
              path.demand = 0;
              path.type = "depot";
            } else {
              path.demand = 0.5;
              path.type = "customer";
            }
            me.queryValue.problem.nodes.push(path);
          });
          // console.log('res=' + JSON.stringify(res));
        } else {
          this.center = res.point;
          this.$emit("input", {
            address: this.searchValue,
            lat: res.point.lat,
            lng: res.point.lng,
          });
        }
      }
    },
    onPolylinesSet(a, b) {
      // console.log("a=" + a + " b=" + b);
    },
    resultsHtmlSet(r) {
      // console.log("r=" + Object.keys(r));
    },
    onAutoComplete(res) {
      this.printObj(res);
      console.log("onAutoComplete res=" + JSON.stringify(res.item));
      let me = this;
      console.log("value=" + JSON.stringify(res.item.value));
      var name =
        res.item.value.province +
        res.item.value.city +
        res.item.value.district +
        res.item.value.business +
        res.item.value.street +
        res.item.value.streetNumber;
      // var name = res.item.value.business
      console.log("name=" + name);
      console.log("length=" + this.queryValue.problem.nodes.length);
      let len = this.queryValue.problem.nodes.filter((path) => {
        return path.name == name;
      }).length;
      console.log("len=" + len);
      if (len > 0) {
        this.$notify({
          title: "警告",
          message: "地点已存在",
          type: "warning",
        });
        return;
      }

      // 创建地址解析器实例
      // eslint-disable-next-line no-undef
      var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint(
        name,
        function (point) {
          if (point) {
            let id = me.generateId();
            me.activeName = "1";
            me.queryValue.problem.nodes.forEach(function (item) {
              // me.drivingPath.push({
              //   start: name,
              //   end: item.name
              // })
              var p = {
                start: {
                  name: name,
                  lng: point.lng,
                  lat: point.lat,
                },
                end: {
                  name: item.name,
                  lng: item.lng,
                  lat: item.lat,
                },
                u: id,
                v: item.id,
                w: 0,
              };
              console.log("pppppppppppp=" + JSON.stringify(p));
              // me.drivingPath.push(p)
              me.tempDrivingPath.push(p);
            });
            if (me.tempDrivingPath.length > 0) {
              let edge = me.tempDrivingPath[0];
              me.drivingPath.push(edge);
              me.queryValue.problem.edges.push(edge);
            }
            me.activeNode = me.drivingPath.length;
            // console.log('size=' + me.drivingPath.length)
            // console.log('me.drivingPath=' + JSON.stringify(me.drivingPath))
            // console.log('lng=' + point.lng + ' lat=' + point.lat)
            var path = {
              id: me.generateId(),
              name: name,
              lng: point.lng,
              lat: point.lat,
            };
            if (me.queryValue.problem.nodes.length == 0) {
              path.demand = 0;
              path.type = "depot";
            } else {
              path.demand = 0.1;
              path.type = "customer";
            }
            me.queryValue.problem.nodes.push(path);
          }
        },
        res.item.city
      );
    },
    searchComplete(r) {
      console.log("searchComplete r=" + JSON.stringify(r));
      let distance = r.taxiFare.distance / 1000;
      this.drivingPath[this.drivingPath.length - 1].len = distance;
      this.queryValue.problem.edges[
        this.queryValue.problem.edges.length - 1
      ].w = distance;

      this.tempDrivingPath.splice(0, 1);
      if (this.tempDrivingPath.length > 0) {
        // this.drivingPath.push(this.tempDrivingPath[0]);
        let edge = this.tempDrivingPath[0];
        this.drivingPath.push(edge);
        this.queryValue.problem.edges.push(edge);
      }
    },
    // 移除Tag
    removeDepot(tag) {
      this.queryValue.problem.nodes.splice(
        this.queryValue.problem.nodes.indexOf(tag),
        1
      );
      for (var i = this.drivingPath.length - 1; i >= 0; i--) {
        var item = this.drivingPath[i];
        if (item.start.name === tag.name || item.end.name === tag.name) {
          this.drivingPath.splice(i, 1);
        }
      }
      for (var i = this.queryValue.problem.edges.length - 1; i >= 0; i--) {
        var item = this.queryValue.problem.edges[i];
        if (item.start.name === tag.name || item.end.name === tag.name) {
          this.queryValue.problem.edges.splice(i, 1);
        }
      }
    },
    removeVehicle(vehicle) {
      this.queryValue.problem.vehicles.splice(
        this.queryValue.problem.vehicles.indexOf(vehicle),
        1
      );
      // this.queryValue.problem.vehicles.forEach((vehicle, i) => {
      //   vehicle.id = i + 1;
      // });
    },
    clearVehicle(vehicle) {
      this.queryValue.problem.vehicles.splice(
        0,
        this.queryValue.problem.vehicles.length
      );
    },
    // 显示输入框
    showInput() {
      this.inputVisible = true;
      this.searchValue = "";
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    onTagClick(path) {
      this.center = path.name;
    },
    clearTags() {
      this.queryValue.problem.nodes.splice(
        0,
        this.queryValue.problem.nodes.length
      );
      this.drivingPath.splice(0, this.drivingPath.length);
      this.tempDrivingPath.splice(0, this.tempDrivingPath.length);
    },
    addVehicle() {
      this.queryValue.problem.vehicles.push({
        id: this.queryValue.problem.vehicles.length + 1,
        depot: 0,
        load: 2,
        mileage: 80,
        count: 5,
      });
    },
    // 打印一个对象所有属性的值
    printObj(obj) {
      var str = obj + " : ";
      for (var i in obj) {
        str += i + " = " + obj[i] + "\n";
      }
      console.log(str);
    },
  },
};
</script>

<style>
.list {
  border-radius: 2px;
  /* border: 1px solid #f7f7f7; */
  border-bottom: 0px;
  color: #000;
}
.site-list {
  border-radius: 2px;
  /* border: 1px solid #f7f7f7; */
  border-top: 0px;

  color: #000;
}
/* .side-bk {
  background-color: #f1eeee;
} */
/* .container {
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-shrink: 0;
  border-radius: 5px;
} */

.ele-form-bmap {
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
}
.ele-form-search-keywords {
  max-width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
}
.ele-form-search-location {
  font-size: 12px;
  color: #b4b4b4;
}
.highlighted .ele-form-search-location {
  color: #ddd;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.div-row {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}

.div-tag {
  font-size: 12px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.div-tag:hover {
  background-color: #eee;
}

.i-tag:hover {
  color: #66b1ff;
}

.box-card {
  margin: 10px;
}

.mclear {
  border: 0; /*去掉button按钮的棱角(边框)   */
  position: absolute; /*子元素的绝对定位    */
  top: 26px;
  left: 251px; /* 按钮的绝对定位的位置   */
  width: 25px;
  height: 25px; /* 按钮的大小 */
  background-size: 13px 13px; /* 背景图片的大小  */
}

.serachinput {
  width: 300px;
  box-sizing: border-box;
  padding: 9px;
  border: 1px solid #dddee1;
  line-height: 20px;
  font-size: 16px;
  height: 38px;
  color: #333;
  position: relative;
  border-radius: 4px;
  -webkit-box-shadow: #666 0px 0px 10px;
  -moz-box-shadow: #666 0px 0px 10px;
  box-shadow: #666 0px 0px 10px;
}

#collapse_nodes .el-collapse-item__header {
  padding-left: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 48px;
  line-height: 14px;
  background-color: #fff;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 12px;
  -webkit-transition: border-bottom-color 0.3s;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
</style>
