<template>
  <el-container class="content-container" v-loading="loading">
    <!-- <el-header height="auto">
      <div style="text-align: center; padding: 10px">
        <el-button-group class="card">
          <el-button
            class="btn-action"
            type="text"
            icon="el-icon-delete"
            @click="addVehicle"
            style="color: #409eff;"
          >添加车辆</el-button>
          <el-button
            class="btn-action"
            @click="handleDownload"
            type="text"
            icon="el-icon-tickets"
            style="color: #fcbe2d;"
          >添加地点</el-button>
          <el-button
            class="btn-action"
            @click="drawerValue.drawerShow = true"
            type="text"
            icon="el-icon-set-up"
            style="color: #607d8b;"
          >设置算法参数</el-button>
          <el-button
            class="btn-action"
            @click="test"
            type="text"
            icon="el-icon-search"
            style="color: #02c58d;"
          >查询</el-button>
        </el-button-group>
      </div>
    </el-header>-->
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
                  v-if="polylinePath.length > 0"
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
          <div v-if="polylinePath.length == 0" class="box-card">
            <div style="font-size: 16px; color: #999; text-align: center; padding: 100px 0;">
              <img width="80%" src="../../../assets/images/small/暂无数据.png" />
              <p>什么都没有</p>
            </div>
          </div>
          <el-popover
            v-for="(path, index) in polylinePath"
            :key="path.name"
            title="修改地点信息"
            :name="index"
            trigger="hover"
            placement="right"
          >
            <el-row style="padding: 10px">
              <el-col :span="8">节点类型：</el-col>
              <el-col :span="16">{{ index == 0 ? '中心节点' : '子节点' }}</el-col>
            </el-row>
            <el-row style="padding: 10px">
              <el-col :span="8">节点名：</el-col>
              <el-col :span="16">{{ path.name }}</el-col>
            </el-row>
            <el-row style="padding: 10px">
              <el-col :span="8">需求量</el-col>
              <el-col :span="16">
                <el-select
                  v-model="path.need"
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
                    style="font-size: 20px; float: left; color: #00cdcd;"
                  ></i>
                </el-col>
                <el-col :span="16" style="text-align: center">
                  <span style="font-size: 12px;padding: 0 8px;">{{ path.name }}</span>
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
                <el-input
                  :placeholder="logisticsCenter == undefined ? '搜索并添加中心节点' : '搜索并添加子节点'"
                  v-model="searchValue"
                  clearable
                ></el-input>
              </bm-auto-complete>
            </bm-control>
            <bm-local-search
              :auto-viewport="true"
              :keyword="searchValue"
              :pageCapacity="10"
              :panel="false"
              @searchcomplete="handleSearchEnd"
              v-if="isSearching"
            ></bm-local-search>
            <bm-marker
              v-for="(item,index) in polylinePath"
              :key="index"
              :position="item"
              :dragging="true"
              animation="BMAP_ANIMATION_BOUNCE"
            />

            <!-- <bm-marker :position="logisticsCenter">
              <bm-info-window
              :position="logisticsCenter"
                :show="show"
                @close="show = false"
                @open="infoWindowOpen"
                style="font-size: 14px"
              >
                <p>站点：</p>
                <p>站点地址：</p>
              </bm-info-window>
            </bm-marker> -->

            <bm-view style="width:100%; height:100%"></bm-view>
            <bm-driving
              v-for="(item, index) in drivingPath"
              :key="-index - 1"
              :start="item.start"
              :end="item.end"
              startCity="成都市"
              endCity="成都市"
              :auto-viewport="true"
              @onpolylinesset="onPolylinesSet"
              @resultshtmlset="resultsHtmlSet"
              @searchcomplete="searchComplete"
            />
          </baidu-map>

          <!-- <div style="position:absolute; right:30px; top:30px; background:#F00; width:40%; height:100px">sdrftgyhj</div> -->
        </el-main>
        <el-footer height="auto">
          <div style="text-align: center; padding-bottom: 50px">
            <el-autocomplete
              popper-class="my-autocomplete"
              placeholder="请输入内容"
              style="padding: 10px"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              <template>
                <div class="name">item.value</div>
                <span class="addr">item.address</span>
              </template>
            </el-autocomplete>

            <el-button-group class="card">
              <el-button
                class="btn-action"
                type="text"
                icon="el-icon-delete"
                @click="addVehicle"
                style="color: #409eff;"
              >添加车辆</el-button>
              <el-button
                class="btn-action"
                type="text"
                icon="el-icon-tickets"
                style="color: #fcbe2d;"
              >添加地点</el-button>
              <el-button
                class="btn-action"
                @click="drawerValue.drawerShow = true"
                type="text"
                icon="el-icon-set-up"
                style="color: #607d8b;"
              >设置算法参数</el-button>
              <el-button
                class="btn-action"
                @click="test"
                type="text"
                icon="el-icon-search"
                style="color: #02c58d;"
              >查询</el-button>
              <el-switch
                v-model="selectMode"
                active-text="点击选点"
                style="padding-top: 20px; padding-bottom: 20px; padding-left: 12px; padding-right: 12px;"
              ></el-switch>
            </el-button-group>
          </div>
        </el-footer>
      </el-container>
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
                <el-popover
                  placement="bottom"
                  width="240"
                  trigger="hover"
                  v-if="vehicles.length > 0"
                >
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
          <div v-if="vehicles.length == 0" class="box-card">
            <div style="font-size: 16px; color: #999; text-align: center; padding: 100px 0;">
              <img width="80%" src="../../../assets/images/small/暂无数据.png" />
              <p>什么都没有</p>
            </div>
          </div>
          <el-popover
            v-for="(vehicle, index) in vehicles"
            :key="vehicle.id"
            title="修改车辆信息"
            :name="index"
            trigger="hover"
            placement="right"
          >
            <el-row style="padding: 10px">
              <el-col :span="8">车辆类型：</el-col>
              <el-col :span="16">
                <el-input
                  width="50%"
                  size="mini"
                  v-model="vehicle.id"
                  autidocomplete="off"
                  clearable
                ></el-input>
              </el-col>
            </el-row>
            <el-row style="padding: 10px">
              <el-col :span="8">车辆载重：</el-col>
              <el-col :span="16">
                <el-input-number v-model="vehicle.load" :min="1" :max="10" label="车辆载重" size="mini"></el-input-number>
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
                <el-input-number
                  v-model="vehicle.count"
                  :min="1"
                  :max="10"
                  label="车辆里程"
                  size="mini"
                ></el-input-number>
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
    </el-container>
    <drawer v-model="drawerValue" />
    <query-dialog v-model="queryValue"></query-dialog>
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
        name: "", //距离优先
        problem: {},
        time: "",
        isHistory: false,
        type: "map",
      },
      dialogVisible: true,
      center: "成都市",
      logisticsCenter: undefined,
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
      polylinePath: [],
      vehicles: [{ id: 1, depot: 0, load: 2, mileage: 50, count: 5 }],
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
      loadOptions: [1, 2, 3, 4, 5],
      mileageOptions: [20, 25, 30, 35, 40, 45, 50],
      countOptions: [1, 2, 3],
      activeName: "0",
      activeNode: 0,
      loading: true,
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
    infoWindowOpen() {
      //这里有个问题纠结了很久，百度的信息窗口默认有个点击其他地方就消失的事件，我没有找到
      //并且信息窗口点击一次显示，一次消失
      //于是我加了一个100毫秒的定时器，保证每次点击地图都可以展示信息窗口
      setInterval(() => {
        this.show = true;
      }, 100);
    },
    refresh() {
      // this.reload();
      window.location.reload();
    },
    test() {
      if (this.polylinePath.length < 3) {
        this.$notify({
          title: "警告",
          message: "节点过少，请在地图上添加节点！",
          type: "warning",
        });
        return;
      }
      if (this.vehicles.length < 1) {
        this.$notify({
          title: "警告",
          message: "车辆过少，请添加车辆！",
          type: "warning",
        });
        return;
      }
      var names = this.polylinePath.map((x) => {
        return x.name;
      });
      var problem = {
        routeMode: true,
        names: names,
        nodes: [],
        edges: [],
        vehicles: this.vehicles,
        distancePrior: this.drawerValue.distancePrior,
        timePrior: this.drawerValue.timePrior,
        loadPrior: this.drawerValue.loadPrior,
        speed: this.drawerValue.speedValue,
        maxiter: this.drawerValue.maxIter,
      };
      console.log("drivingPath=" + JSON.stringify(this.drivingPath));
      this.drivingPath.forEach(function (path, i) {
        var start = names.indexOf(path.start.name);
        var end = names.indexOf(path.end.name);
        problem.edges.push({
          u: start,
          v: end,
          w: path.len / 1000,
        });
      });

      problem.nodes.push({ type: "depot", id: 0, demand: 0 });
      for (var i = 1; i < this.polylinePath.length; i++) {
        // problem.customers.push(this.polylinePath[i].need);
        problem.nodes.push({
          type: "customer",
          id: i,
          demand: this.polylinePath[i].need,
        });
      }

      console.log("test problem=" + JSON.stringify(problem));

      // this.$router.push({
      //   name: "page_result",
      //   query: {
      //     problem: problem
      //   }
      // });
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
          // this.printObj(res);
          // console.log("pixel=" + this.printObj(res.pixel));
          // console.log("jb=" + this.printObj(res.jb));
          // this.polylinePath.push({
          //   name: "地点(" + res.point.lng + ", " + res.point.lat + ")",
          //   lng: res.point.lng,
          //   lat: res.point.lat,
          // });
          // this.center = res.point;
          // let geocoder = new BMap.Geocoder(); // 创建地址解析器的实例
          // geocoder.getLocation(res.point, (rs) => {
          //   // this.add.site = rs.address;
          //   // 地址描述(string)=
          //   console.log(rs.address); // 这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
          //   console.log(rs.addressComponents); // 结构化的地址描述(object)
          //   console.log(rs.addressComponents.province); // 省
          //   console.log(rs.addressComponents.city); // 城市
          //   console.log(rs.addressComponents.district); // 区县
          //   console.log(rs.addressComponents.street); // 街道
          //   console.log(rs.addressComponents.streetNumber); // 门牌号
          //   console.log(rs.surroundingPois); // 附近的POI点(array)
          //   console.log(rs.business); // 商圈字段，代表此点所属的商圈(string)
          // });
          let me = this;
          let point = res.point;
          let name = "地点(" + res.point.lng + ", " + res.point.lat + ")";
          me.activeName = "1";
          me.polylinePath.forEach(function (item) {
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
            };
            console.log("pppppppppppp=" + JSON.stringify(p));
            // me.drivingPath.push(p)
            me.tempDrivingPath.push(p);
          });
          if (me.tempDrivingPath.length > 0) {
            me.drivingPath.push(me.tempDrivingPath[0]);
          }
          me.activeNode = me.drivingPath.length;
          // console.log('size=' + me.drivingPath.length)
          // console.log('me.drivingPath=' + JSON.stringify(me.drivingPath))
          // console.log('lng=' + point.lng + ' lat=' + point.lat)
          var path = {
            name: name,
            lng: point.lng,
            lat: point.lat,
          };
          if (me.logisticsCenter === undefined) {
            me.logisticsCenter = path;
          } else {
            // path.need = 0.1 * (me.polylinePath.length + 1);
            path.need = 0.1;
          }
          me.polylinePath.push(path);
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
    // 更新路线
    updatePolylinePath(e) {
      // this.polylinePath = e.target.getPath();
      console.log("e=" + Object.keys(e));
      console.log("returnValue=" + e.returnValue);
      console.log("e.target=" + Object.keys(e.target));
      console.log("e.target.getPath()=" + e.target.getPath());
    },
    // 添加路线
    addPolylinePoint() {
      var last = this.polylinePath[this.polylinePath.length - 1];
      var newOne = {
        name: "随机地点" + this.polylinePath.length,
        lng: last.lng,
        lat: last.lat,
      };
      newOne.lng += (Math.random() - 0.5) / 10;
      newOne.lat += (Math.random() - 0.5) / 10;
      this.polylinePath.push(newOne);
      this.$notify({
        title: "成功",
        message: "添加" + newOne.name + "成功",
        type: "success",
      });
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
      console.log("length=" + this.polylinePath.length);
      let len = this.polylinePath.filter((path) => {
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
            me.activeName = "1";
            me.polylinePath.forEach(function (item) {
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
              };
              console.log("pppppppppppp=" + JSON.stringify(p));
              // me.drivingPath.push(p)
              me.tempDrivingPath.push(p);
            });
            if (me.tempDrivingPath.length > 0) {
              me.drivingPath.push(me.tempDrivingPath[0]);
            }
            me.activeNode = me.drivingPath.length;
            // console.log('size=' + me.drivingPath.length)
            // console.log('me.drivingPath=' + JSON.stringify(me.drivingPath))
            // console.log('lng=' + point.lng + ' lat=' + point.lat)
            var path = {
              name: name,
              lng: point.lng,
              lat: point.lat,
            };
            if (me.logisticsCenter === undefined) {
              me.logisticsCenter = path;
            } else {
              // path.need = 0.1 * (me.polylinePath.length + 1);
              path.need = 0.1;
            }
            me.polylinePath.push(path);
          }
        },
        res.item.city
      );
    },
    searchComplete(r) {
      this.drivingPath[this.drivingPath.length - 1].len = r.taxiFare.distance;
      // this.tempDrivingPath[0].len = r.taxiFare.distance
      this.tempDrivingPath.splice(0, 1);
      if (this.tempDrivingPath.length > 0) {
        this.drivingPath.push(this.tempDrivingPath[0]);
      }
    },
    // 移除Tag
    removeDepot(tag) {
      this.polylinePath.splice(this.polylinePath.indexOf(tag), 1);
      for (var i = this.drivingPath.length - 1; i >= 0; i--) {
        var item = this.drivingPath[i];
        if (item.start.name === tag.name || item.end.name === tag.name) {
          this.drivingPath.splice(i, 1);
        }
      }
    },
    removeVehicle(vehicle) {
      this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);
      // this.vehicles.forEach((vehicle, i) => {
      //   vehicle.id = i + 1;
      // });
    },
    clearVehicle(vehicle) {
      this.vehicles.splice(0, this.vehicles.length);
    },
    // 显示输入框
    showInput() {
      this.inputVisible = true;
      this.searchValue = "";
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 选择物流中心
    selectLogisticsCenter(res) {
      if (res && res.point) {
        this.center = res.point;
        this.logisticsCenter = {
          name: res.value,
          lng: res.point.lng,
          lat: res.point.lat,
        };
        this.inputVisible = false;
      }
    },
    onTagClick(path) {
      this.center = path.name;
    },
    clearTags() {
      this.polylinePath.splice(0, this.polylinePath.length);
      this.drivingPath.splice(0, this.drivingPath.length);
      this.tempDrivingPath.splice(0, this.tempDrivingPath.length);
      this.logisticsCenter = undefined;
    },
    addVehicle() {
      this.vehicles.push({
        id: this.vehicles.length + 1,
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
    // 测试路线模式
    testRouteMode() {
      var problem = {
        routeMode: true,
        nodes: [
          { type: "depot", id: 0, demand: 0 },
          { type: "customer", id: 1, demand: 1.7 },
          { type: "customer", id: 2, demand: 0.8 },
          { type: "customer", id: 3, demand: 1.3 },
          { type: "customer", id: 4, demand: 2.8 },
          { type: "customer", id: 5, demand: 1.9 },
          { type: "customer", id: 6, demand: 3.5 },
          { type: "customer", id: 7, demand: 0.9 },
          { type: "customer", id: 8, demand: 0.3 },
          { type: "customer", id: 9, demand: 1.2 },
          { type: "other", id: 10, demand: 0 },
        ],
        edges: [
          // 无向道路 连接节点u, v，长度为w
          { u: 0, v: 1, w: 5 },
          { u: 0, v: 2, w: 8 },
          { u: 0, v: 3, w: 7 },
          { u: 0, v: 10, w: 5 },
          { u: 0, v: 5, w: 4 },
          { u: 0, v: 6, w: 12 },
          { u: 0, v: 7, w: 9 },
          { u: 0, v: 8, w: 12 },
          { u: 0, v: 9, w: 6 },
          { u: 1, v: 2, w: 4 },
          { u: 1, v: 9, w: 3 },
          { u: 2, v: 3, w: 3 },
          { u: 3, v: 4, w: 4 },
          { u: 3, v: 10, w: 5 },
          { u: 4, v: 5, w: 3 },
          { u: 4, v: 10, w: 2 },
          { u: 5, v: 6, w: 10 },
          { u: 5, v: 10, w: 2 },
          { u: 6, v: 7, w: 4 },
          { u: 6, v: 8, w: 7 },
          { u: 7, v: 8, w: 5 },
          { u: 8, v: 9, w: 9 },
        ],
        vehicles: [
          { id: 1, depot: 0, load: 2, mileage: 35, count: 1 },
          { id: 2, depot: 0, load: 2, mileage: 35, count: 1 },
          { id: 3, depot: 0, load: 2, mileage: 35, count: 1 },
          { id: 4, depot: 0, load: 5, mileage: 35, count: 1 },
          { id: 5, depot: 0, load: 5, mileage: 35, count: 1 },
        ],
        distancePrior: 5, // 路程加权
        timePrior: 0, // 用时加权
        loadPrior: 0, // 满载率加权
      };
      console.log(problem);
      this.$router.push({
        name: "page_result",
        query: {
          problem: problem,
        },
      });
    },
    // 测试坐标模式
    testCoordMode() {
      var problem = {
        routeMode: false,
        nodes: [
          { x: 14.2, y: 13.1, type: "depot", id: 0, demand: "任意" },
          { x: 12.8, y: 8.5, type: "customer", id: 1, demand: 1.7 },
          { x: 18.4, y: 3.4, type: "customer", id: 2, demand: 0.8 },
          { x: 15.4, y: 16.6, type: "customer", id: 3, demand: 1.3 },
          { x: 18.9, y: 15.2, type: "customer", id: 4, demand: 2.8 },
          { x: 15.5, y: 11.6, type: "customer", id: 5, demand: 1.9 },
          { x: 3.9, y: 10.6, type: "customer", id: 6, demand: 3.5 },
          { x: 10.6, y: 7.6, type: "customer", id: 7, demand: 0.9 },
          { x: 8.6, y: 8.4, type: "customer", id: 8, demand: 0.3 },
          { x: 12.5, y: 2.1, type: "customer", id: 9, demand: 1.2 },
          { x: 13.8, y: 5.2, type: "other", id: 10, demand: "任意" },
        ],
        edges: "euc2d",
        vehicles: [
          { id: "1", depot: 0, load: 2, mileage: 35, count: 1 },
          { id: "2", depot: 0, load: 2, mileage: 35, count: 1 },
          { id: "3", depot: 0, load: 2, mileage: 35, count: 1 },
          { id: "4", depot: 0, load: 5, mileage: 35, count: 1 },
          { id: "5", depot: 0, load: 5, mileage: 35, count: 1 },
        ],
        distancePrior: 5, // 路程加权
        timePrior: 1, // 用时加权
        loadPrior: 4, // 满载率加权
      };
      console.log(problem);
      this.$router.push({
        name: "page_result",
        query: {
          problem: problem,
        },
      });
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
