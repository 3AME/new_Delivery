<template>
  <d2-container style="padding: 0px 0px;">
    <el-container
      class="container"
      style="background: #fff;"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-aside width="230px" class="aside">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>最优结果</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="text-item" v-if="result">总路程: {{ result.distance.toFixed(2) }} 公里</div>
          <div class="text-item" v-if="result">总时间: {{ result.time.toFixed(2) }} 小时</div>
          <div class="text-item" v-if="result">平均满载率: {{ (result.loadFactor * 100).toFixed(2) }} %</div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>最优路线</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            <el-checkbox
              v-model="checked"
              style="float: right; padding: 3px 0"
              @change="onCheckboxChange"
            ></el-checkbox>
          </div>
          <div style="text-align: center; margin-bottom: 20px;">
            <el-button class="btn-success" size="mini" @click="drawer = true">路线详情</el-button>
            <!-- <el-button class="btn-success">test</el-button> -->
          </div>
          <div style="text-align: center; margin-bottom: 20px;">
            <el-switch
              v-model="hideRoute"
              @change="toggleRoute()"
              :active-text="problem.routeMode ? '隐藏无关路线' : '隐藏坐标文字'"
            ></el-switch>
          </div>
          <div
            v-for="(route, index) in routes"
            :key="index"
            style="padding-top: 4px; padding-bottom: 4px;"
          >
            <!-- @change="onCheckedChange(route, index)" -->
            <!-- <el-checkbox
            v-model="route.checked"
            :style="'margin-right: 4px;color:' + route.color"
            @change="onCheckedChange(route, index)"
            ></el-checkbox>-->
            <div @click="toggleVisible(route, index)">
              <label class="el-checkbox is-checked" style="margin-right: 4px;">
                <span class="el-checkbox__input is-checked">
                  <span
                    class="el-checkbox__inner"
                    :style="'background-color:' + (route.checked ? route.color : 'transparent') + ';border-color:' + route.color"
                  ></span>
                  <input
                    @click="toggleVisible(route, index)"
                    type="checkbox"
                    aria-hidden="false"
                    class="el-checkbox__original"
                    :value="route.checked"
                    :style="'background-color:' + (route.checked ? route.color : 'transparent') + ';border-color:' + route.color"
                  />
                </span>
              </label>
              <span
                :style="'font-size: 12px; padding-top: 4px; padding-bottom: 4px;color:' + route.color"
              >车辆{{ route.id }}</span>
            </div>
            <div
              @click="toggleVisible(route, index)"
              :style="'font-size: 12px; padding-top: 4px; padding-bottom: 4px;color:' + route.color"
              :fill="route.color"
            >{{ route.text }}</div>
          </div>
        </el-card>
      </el-aside>
      <el-main style="background-color: #f9f9f9">
        <svg id="graph_svg" style="height:100%; width: 100%;background-color: #f9f9f9" ref="svg" />
        <!-- <el-card class="box-card">

        </el-card>-->
        <svg
          id="test_svg"
          style="height:50%; width: 100%;background-color: #f9f9f9"
          ref="test_svg"
        />
      </el-main>
      <el-drawer title="路线详情" :visible.sync="drawer" :with-header="false" direction="rtl">
        <d2-container>
          <el-card class="box-card">
            <div class="clearfix">
              <span>路线详情</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="drawer = false">关闭</el-button>
            </div>
          </el-card>
          <div>
            <el-card
              class="box-card"
              v-for="(route, index) in routes"
              :key="index"
              style="padding-top: 4px; padding-bottom: 4px;"
            >
              <div
                :style="'font-size: 12px; padding-top: 4px; padding-bottom: 4px;color:' + route.color"
                :fill="route.color"
              >车辆{{ route.id }}</div>
              <div
                :style="'font-size: 12px; padding-top: 4px; padding-bottom: 4px;color:' + route.color"
                :fill="route.color"
              >路线：{{route.text}}</div>
              <!-- <span
            :style="'font-size: 12px; padding-top: 4px; padding-bottom: 4px;color:' + route.color"
            :fill="route.color"
              >车辆{{ route.id }}：路程：{{ route.distance.toFixed(2) }}公里 | 时间：{{ route.time.toFixed(2) }}小时</span>-->
              <div
                :style="'font-size: 12px; padding-top: 4px; padding-bottom: 4px;color:' + route.color"
                :fill="route.color"
              >路程：{{ route.distance.toFixed(2) }}公里</div>
              <div
                :style="'font-size: 12px; padding-top: 4px; padding-bottom: 4px;color:' + route.color"
                :fill="route.color"
              >时间：{{ route.time.toFixed(2) }}小时</div>
            </el-card>
          </div>
        </d2-container>
      </el-drawer>
    </el-container>
  </d2-container>
</template>

<script>
import * as d3 from "d3";
const { spawn } = require("child_process");
const os = require("os");

export default {
  data() {
    return {
      drawer: false,
      forceSimulation: undefined,
      myChart: undefined,
      result: undefined,
      problem: undefined,
      problemName: undefined,
      hideRoute: false,
      routes: [],
      loading: true,
      checked: true,
      msgs: [],
      maxiter: 200 // 迭代次数
    };
  },
  mounted() {
    console.log("mounted");
    this.hideRoute = false;

    let me = this;
    window.onresize = () => {
      if (me.forceSimulation) {
        let width = me.$refs["svg"].clientWidth;
        let height = me.$refs["svg"].clientHeight;
        console.log("onresize width=" + width + " height=" + height);
        me.forceSimulation
          .force("center")
          .x(width / 2)
          .y(height / 2);
      }
    };
  },
  activated() {
    // console.log("activated problem=" + JSON.stringify(this.problem));
    // console.log('this.$route.query.problem=' + JSON.stringify(this.$route.query.problem))
    // console.log('==============' + (this.problem === this.$route.query.problem))
    let svgChildren = d3.selectAll("svg#graph_svg > *");
    let testSvg = d3.selectAll("svg#test_svg > *");
    console.log("d3.selectAll()=" + svgChildren.size());
    let queryValue = this.$route.query.queryValue;
    if (
      svgChildren.size() > 0 &&
      this.problemName === queryValue.name
      // JSON.stringify(this.problem) === JSON.stringify(queryValue.problem)
    ) {
      this.loading = false;
      return;
    }
    this.checked = true;
    this.loading = true;
    svgChildren.remove();
    testSvg.remove();
    this.msgs.splice(0, this.msgs.length);
    // console.log("activated");
    // this.problem = this.$route.query.problem;
    this.hideRoute = false;
    this.problem = queryValue.problem;
    console.log("tttttttttt=" + JSON.stringify(this.problem));
    this.solve(queryValue);
  },
  deactivated() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    solve(
      queryValue, // VRP问题描述
      npop = 2,
      popsize = 100, // 种群大小
      maxiter = 100 // 迭代次数
    ) {

      let problem = queryValue.problem;
      this.maxiter = problem.maxiter;
      var isRouteMode = problem.routeMode;

      console.log("function solve run");
      console.log("problem=", problem);
      var solver = spawn("resources/VehicleRouting.exe");
      var pipe = (...msg) => {
        solver.stdin.write(msg.join(" ") + "\n");
        // console.log(msg.join(' '));
      };

      // eslint-disable-next-line camelcase

      var n_customer = 0;
      for (let i in problem.nodes) {
        var node = problem.nodes[i];
        if (node.type === "customer") {
          // eslint-disable-next-line camelcase
          n_customer++;
        }
      }
      console.log("n_customer=", n_customer);
      pipe(n_customer);
      for (let i in problem.nodes) {
        var node = problem.nodes[i];
        if (node.type == "customer") {
          var demand = node.demand;
          var service_time = node.service_time || 0;
          var tw_beg = node.tw_beg || -1;
          var tw_end = node.tw_end || -1;
          pipe(node.id, demand, service_time, tw_beg, tw_end);
        }
      }

      // eslint-disable-next-line camelcase
      var n_depot = 0;
      // eslint-disable-next-line camelcase
      var first_depot = -1;
      for (let i in problem.nodes) {
        let node = problem.nodes[i];
        if (node.type === "depot") {
          // eslint-disable-next-line camelcase
          if (first_depot === -1) {
            // eslint-disable-next-line camelcase
            first_depot = node.id;
          }
          // eslint-disable-next-line camelcase
          n_depot++;
        }
      }
      // eslint-disable-next-line camelcase
      if (first_depot === -1) {
        // eslint-disable-next-line no-throw-literal
        throw "no depot was found in nodes";
      }
      // console.log("n_depot=",n_depot)
      pipe(n_depot);
      for (let i in problem.nodes) {
        let node = problem.nodes[i];
        if (node.type === "depot") {
          // console.log("depot=",node.id)
          pipe(node.id);
        }
      }

      // eslint-disable-next-line camelcase
      var n_other = 0;
      for (let i in problem.nodes) {
        let node = problem.nodes[i];
        if (node.type === "other") {
          // eslint-disable-next-line camelcase
          n_other++;
        }
      }
      pipe(n_other);
      for (let i in problem.nodes) {
        let node = problem.nodes[i];
        if (node.type === "other") {
          pipe(node.id);
        }
      }
      if (!isRouteMode) {
        if (problem.edges === "euc2d") {
          var n = problem.nodes.length;
          pipe(Math.round((n * (n - 1)) / 2));
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
              var w = Math.sqrt(
                Math.pow(problem.nodes[i].x - problem.nodes[j].x, 2) +
                  Math.pow(problem.nodes[i].y - problem.nodes[j].y, 2)
              );
              pipe(problem.nodes[i].id, problem.nodes[j].id, w);
            }
          }
        } else {
          // eslint-disable-next-line no-throw-literal
          throw 'unsupported edge type "' + problem.edges + '"';
        }
      } else {
        pipe(problem.edges.length);
        for (let i in problem.edges) {
          var edge = problem.edges[i];
          pipe(edge.u, edge.v, edge.w);
        }
      }
      console.log("vehicles", problem.vehicles);
      pipe(problem.vehicles.length);
      var speed = problem.speed || 10;
      var work_time = problem.work_time || -1;
      // var iter=problem.maxiter;
      pipe(speed, work_time);
      for (var i in problem.vehicles) {
        var veh = problem.vehicles[i];
        var depot = veh.depot || first_depot;
        var load = veh.load;
        var mileage = veh.mileage || -1;
        var count = veh.count || -1;
        pipe(veh.id, depot, load, mileage, count);
      }

      pipe(problem.distancePrior, problem.timePrior, problem.loadPrior);
      pipe(npop, popsize, problem.maxiter);
      let out = "";
      solver.stdout.on("data", buffer => {
        console.log("dddddddddddddddddd=" + buffer.toString());

        out += buffer.toString();

        while (true) {
          let eol = out.indexOf(os.EOL);
          if (eol == -1) {
            break;
          }
          let data = out.substr(0, eol);
          let [flag, payload] = data.split(" ");
          console.log("flag=" + flag);
          console.log("payload=" + payload);
          payload = eval("(" + payload + ")");

          switch (flag) {
            case "msg":
              // onMessageReceived(payload);
              console.log("msg");
              console.log(payload);
              this.msgs.push(payload);
              break;
            case "fin":
              // onFinReceived(payload);
              console.log("fin");
              console.log(payload);
              break;
            case "sol":
              // onSolReceived(payload);
              console.log("sol");
              console.log(payload);
              this.result = payload;
              break;
            default:
              throw "unknown flag";
          }
          out = out.substr(eol + os.EOL.length);
        }
      });

      let exitCode = 0;

      solver.on("exit", code => {
        console.log(`child process exit，code = ${code}`);
        exitCode = code;
      });

      solver.on("close", () => {
        if (exitCode > 0) {
          this.$confirm("出现了错误，请重试一遍", "错误", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "error"
          }).then(() => {
            this.$router.go(-1);
          });
        } else {
          if (!queryValue.isHistory) {
            this.$store.dispatch("d2admin/addQuery", queryValue);
          }
          console.log("out=" + out);
          // this.result = eval("(" + out + ")");
          // this.result = out
          this.loading = false;
          if (isRouteMode) {
            this.showGraph();
          } else {
            this.showScatterGraph();
          }
          this.showCurveGraph();
        }
      });
    },
    toggleRoute() {
      let visibility = this.hideRoute ? "hidden" : "visible";
      if (this.problem.routeMode) {
        d3.selectAll(".link-edge-normal").attr("visibility", visibility);
        d3.selectAll(".link-text-normal").attr("visibility", visibility);
      } else {
        d3.selectAll(".dot-text").attr("visibility", visibility);

        this.routes.forEach(route => {
          let visibility = route.checked ? "visible" : "hidden";
          let textvisibility = this.hideRoute ? "hidden" : visibility;
          route.serve.forEach(id => {
            d3.selectAll(".dot-text-" + id).attr("visibility", textvisibility);
          });
        });
      }
    },
    toggleVisible(route, i) {
      route.checked = !route.checked;
      this.onCheckedChange(route, i);
      let size = this.routes.filter(r => {
        return r.checked;
      }).length;
      console.log("size=" + size + " length=" + this.routes.length);
      this.checked = size == this.routes.length;
    },
    onCheckedChange(route, i) {
      let visibility = route.checked ? "visible" : "hidden";
      d3.selectAll(".link-edge-route-" + i).attr("visibility", visibility);
      d3.selectAll(".link-text-route-" + i).attr("visibility", visibility);

      if (!this.problem.routeMode) {
        let textvisibility = this.hideRoute ? "hidden" : visibility;
        route.serve.forEach(id => {
          d3.selectAll(".graph-dot-" + id).attr("visibility", visibility);
          d3.selectAll(".dot-text-" + id).attr("visibility", textvisibility);
        });
      }
    },
    onCheckboxChange(checked) {
      this.routes.forEach((route, i) => {
        route.checked = checked;
        this.onCheckedChange(route, i);
      });
    },
    // 散点图
    showScatterGraph() {
      var problem = this.problem;
      let data = problem.nodes;
      // problem.nodes.forEach(function(node, index) {
      //   data.push({
      //     type: node.type,
      //     name: "节点" + node.id + ":(" + node.x + ", " + node.y + ")",
      //     x: node.x,
      //     y: node.y
      //   });
      // });

      var plan = this.result;

      var edges = [];

      var legendTexts = [];
      // let vid = 0
      let vids = [];
      plan.plan.forEach(function(item) {
        // let same = legendTexts.filter(t => {
        //   return t.id.indexOf(item.vid + "-") == 0;
        // });
        let same = vids.filter(v => {
          return item.vid == v;
        });
        vids.push(item.vid);
        item.trips.forEach(function(trip, index) {
          // let id = item.vid + "：" + same.length + "-" + index;
          let id;
          if (item.trips.length > 1) {
            id = item.vid + "：" + (same.length + 1) + "-" + index;
          } else {
            id = item.vid + "：" + (same.length + 1);
          }
          // let text = id + " : ";
          let text = "";
          var tempRoute = 0;
          trip.route.forEach(function(route, i) {
            if (i !== 0) {
              edges.push({
                source: tempRoute,
                target: route,
                // value: value,
                // vid: item.vid
                vid: legendTexts.length
              });
              text += " → ";
            }
            // text += route;
            if (problem.names !== undefined) {
              text += problem.names[route];
            } else {
              text += route;
            }
            tempRoute = route;
          });
          legendTexts.push({
            id: id,
            text: text,
            checked: true,
            distance: trip.distance,
            time: trip.time,
            serve: trip.serve
          });
          // this.routes.push(text);
          // vid++
        });
      });

      var legendColors = d3
        .scaleOrdinal()
        .domain(d3.range(legendTexts.length))
        .range(d3.schemeCategory10);
      legendTexts.forEach((legend, index) => {
        legend.color = legendColors(index);
      });

      this.routes = legendTexts;

      edges.forEach(function(link) {
        // find other edges with same target+source or source+target
        var sameAll = [];
        edges.forEach(function(item) {
          if (
            (item.source === link.source && item.target === link.target) ||
            (item.source === link.target && item.target === link.source)
          ) {
            sameAll.push(item);
          }
        });
        console.log("sameAll=" + JSON.stringify(sameAll));

        sameAll.forEach(function(s, i) {
          s.sameIndex = i + 1;
          s.sameTotal = sameAll.length;
          s.sameTotalHalf = s.sameTotal / 2;
          s.sameUneven = s.sameTotal % 2 !== 0;
          // if (s.sameUneven) {
          //   s.sameMiddleLink = Math.ceil(s.sameTotalHalf) === s.sameIndex
          // } else {
          //   s.sameMiddleLink = s.sameTotalHalf
          // }
          s.sameMiddleLink = Math.ceil(s.sameTotalHalf) === s.sameIndex;
          // s.sameMiddleLink =
          //   s.sameUneven === true && Math.ceil(s.sameTotalHalf) === s.sameIndex;
          s.sameLowerHalf = s.sameIndex <= s.sameTotalHalf;
          s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
          s.sameIndexCorrected = s.sameLowerHalf
            ? s.sameIndex
            : s.sameIndex - Math.ceil(s.sameTotalHalf);
        });
      });

      edges.sort(function(x, y) {
        return x.sameTotal - y.sameTotal;
      });
      console.log("sort=" + JSON.stringify(edges));
      var maxSame = edges[edges.length - 1].sameTotal;
      console.log("maxSame=" + maxSame);

      edges.forEach(function(link) {
        link.maxSameHalf = Math.floor(maxSame / 2);
      });

      console.log("edges=" + JSON.stringify(edges));

      let width = this.$refs["svg"].clientWidth;
      let height = this.$refs["svg"].clientHeight;
      const margin = { top: 30, right: 60, bottom: 60, left: 60 };

      let svg = d3
        .select("svg#graph_svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 " + width + " " + height);

      // 比例尺
      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .nice()
        .range([margin.left, width - margin.right]);
      const y = d3
        .scaleLinear()
        .domain(d3.extent(data, d => d.y))
        .nice()
        .range([height - margin.bottom, margin.top]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      // y轴
      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // 绘制坐标点
      svg
        .append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        // .attr("fill", "#000")
        .attr("class", function(d) {
          if (d.type == "depot") {
            return "dot-depot-" + d.id;
          }
          return "graph-dot-" + d.id;
        })
        .attr("fill", function(d, i) {
          if (d.type == "depot") {
            return "#FF0000";
          } else if (d.type == "customer") {
            return "#000";
          } else {
            return "#1f77b4";
          }
        })
        .attr("r", 4);

      // 标注文字
      svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("class", function(d) {
          if (d.type == "depot") {
            return "dot-text text-depot-" + d.id;
          }
          return "dot-text dot-text-" + d.id;
        })
        .attr("x", d => x(d.x))
        .attr("y", d => y(d.y))
        .text(d => {
          // if (problem.names !== undefined) {
          //   return problem.names[d.name];
          // }
          // return d.name;
          // return "节点" + d.id + ":(" + d.x + ", " + d.y + ")";
          return d.id + "(" + d.x + ", " + d.y + ")";
        })
        .call(dodge);

      // eslint-disable-next-line no-unused-vars
      var links = svg
        .selectAll(".line")
        .data(edges)
        .enter()
        .append("path")
        .attr("class", function(d) {
          if (d.vid !== undefined) {
            return "link-edge-route-" + d.vid;
          } else {
            return "link-edge-normal";
          }
        })
        .attr("stroke", function(d, i) {
          console.log("stroke d=" + JSON.stringify(d) + "  d.vid=" + d.vid);
          if (d.vid !== undefined) {
            var color = legendColors(d.vid);
            return color;
          }
          return "#ccc";
        })
        .attr("stroke-width", 1)
        // .attr("marker-end", function(d, i) {
        //   // eslint-disable-next-line no-unused-vars
        //   var arrowMarker = svg
        //     .append("marker")
        //     .attr("id", "arrow" + i)
        //     .attr("markerUnits", "userSpaceOnUse")
        //     .attr("markerWidth", "16")
        //     .attr("markerHeight", "15")
        //     .attr("viewBox", "0 0 12 12")
        //     .attr("refX", 30)
        //     .attr("refY", 6)
        //     .attr("orient", "auto")
        //     .append("svg:path")
        //     .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
        //     .attr("fill", function() {
        //       if (d.vid !== undefined) {
        //         return legendColors(d.vid);
        //       }
        //       return "#000000";
        //     });
        //   if (d.vid !== undefined) {
        //     return "url(#arrow" + i + ")";
        //   }
        //   return "url(#end)";
        // })
        .attr("fill", "transparent")
        .attr("d", linkArc);

      function linkArc(d) {
        let target = undefined;
        let source = undefined;
        data.forEach(dd => {
          if (dd.id == d.target) {
            target = dd;
          } else if (dd.id == d.source) {
            source = dd;
          }
        });
        var x1 = x(source.x);
        var y1 = y(source.y);
        var x2 = x(target.x);
        var y2 = y(target.y);
        var path;
        var slopy, cosy, siny;
        var Par = 6.0;
        var x3, y3;
        slopy = Math.atan2(y1 - y2, x1 - x2);
        cosy = Math.cos(slopy);
        siny = Math.sin(slopy);

        path = "M" + x1 + "," + y1 + " L" + x2 + "," + y2;

        x3 = (Number(x1) + Number(x2)) / 2;
        y3 = (Number(y1) + Number(y2)) / 2;

        path += " M" + x3 + "," + y3;

        path +=
          " L" +
          (Number(x3) + Number(Par * cosy - (Par / 2.0) * siny)) +
          "," +
          (Number(y3) + Number(Par * siny + (Par / 2.0) * cosy));

        path +=
          " M" +
          (Number(x3) +
            Number(Par * cosy + (Par / 2.0) * siny) +
            "," +
            (Number(y3) - Number((Par / 2.0) * cosy - Par * siny)));
        path += " L" + x3 + "," + y3;
        return path;

        // console.log(
        //   "target=" +
        //     d.target +
        //     " source=" +
        //     d.source +
        //     " data.size=" +
        //     data.length
        // );
        // console.log(
        //   "linkArc linkArc linkArc   data=" + JSON.stringify(data[d.target])
        // );
        // let target = undefined;
        // let source = undefined;
        // data.forEach(dd => {
        //   if (dd.id == d.target) {
        //     target = dd;
        //   } else if (dd.id == d.source) {
        //     source = dd;
        //   }
        // });
        // // var dx = x(data[d.target].x) - x(data[d.source].x);
        // // var dy = y(data[d.target].y) - y(data[d.source].y);
        // var dx = x(target.x) - x(source.x);
        // var dy = y(target.y) - y(source.y);
        // var dr = Math.sqrt(dx * dx + dy * dy);
        // var unevenCorrection = d.sameUneven ? 0 : 0.5;
        // var arc =
        //   (dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection);

        // if (d.sameMiddleLink) {
        //   arc = 0;
        // }

        // return (
        //   "M" +
        //   x(source.x) +
        //   "," +
        //   y(source.y) +
        //   "A" +
        //   arc +
        //   "," +
        //   arc +
        //   " 0 0," +
        //   d.sameArcDirection +
        //   " " +
        //   x(target.x) +
        //   "," +
        //   y(target.y)
        // );
      }
      // addLegend();

      function dodge(text, iterations = 300) {
        const nodes = text.nodes();
        const left = () => text.attr("text-anchor", "middle").attr("dy", "1em");
        const right = () =>
          text.attr("text-anchor", "middle").attr("dy", "1em");
        const top = () => text.attr("text-anchor", "middle").attr("dy", "1em");
        const bottom = () =>
          text.attr("text-anchor", "middle").attr("dy", "1em");
        const points = nodes.map(node => ({
          fx: +node.getAttribute("x"),
          fy: +node.getAttribute("y")
        }));
        const labels = points.map(({ fx, fy }) => ({ x: fx, y: fy }));
        const links = points.map((source, i) => ({
          source,
          target: labels[i]
        }));

        const simulation = d3
          .forceSimulation(points.concat(labels))
          .force("charge", d3.forceManyBody().distanceMax(80))
          .force(
            "link",
            d3
              .forceLink(links)
              .distance(4)
              .iterations(4)
          )
          .stop();

        for (let i = 0; i < iterations; i += 1) simulation.tick();

        text
          .attr("x", (_, i) => labels[i].x)
          .attr("y", (_, i) => labels[i].y)
          .each(function(_, i) {
            const a = Math.atan2(
              labels[i].y - points[i].fy,
              labels[i].x - points[i].fx
            );
            d3.select(this).call(
              a > Math.PI / 4 && a <= (Math.PI * 3) / 4
                ? bottom
                : a > -Math.PI / 4 && a <= Math.PI / 4
                ? left
                : a > (-Math.PI * 3) / 4 && a <= (Math.PI * 3) / 4
                ? top
                : right
            );
          });
      }

      function addLegend() {
        var legend = svg.append("g");
        var textGroup = legend.selectAll("text").data(legendTexts);

        textGroup.exit().remove();

        legend
          .selectAll("text")
          .data(legendTexts)
          .enter()
          .append("text")
          .text(function(d) {
            // return (
            //   '车辆' +
            //   d.id +
            //   '：路程：' +
            //   d.distance.toFixed(2) +
            //   '公里 | 时间：' +
            //   d.time.toFixed(2) +
            //   '小时'
            // )
            return d.id;
            // return d.text
          })
          .attr("class", "legend")
          .attr("y", function(d, i) {
            return i * 20 + 40;
          })
          .attr("x", 90)
          .attr("fill", function(d, i) {
            return legendColors(i);
          });

        var rectGroup = legend.selectAll("rect").data(legendTexts);

        rectGroup.exit().remove();

        legend
          .selectAll("rect")
          .data(legendTexts)
          .enter()
          .append("rect")
          .attr("y", function(d, i) {
            return i * 20 + 28;
          })
          .attr("x", 70)
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", function(d, i) {
            return legendColors(i);
          });
      }
    },
    // 力导向图
    showGraph() {
      var problem = this.problem;

      var plan = this.result;

      // 准备数据
      var nodes = [
        // 节点集
      ];

      var edges = [];

      var map = new Map();

      for (var i = 0; i < problem.nodes.length; i++) {
        let node = problem.nodes[i];
        let group = 1;
        if (node.type === "depot") {
          group = 2;
        } else if (node.type === "customer") {
          group = 1.5;
        } else if (node.type === "other") {
          group = 1;
        } else {
          continue;
        }
        nodes.push({ name: node.id.toString(), group: group });
        // var name = i.toString()
        // var group = 1;
        // if (i === 0) {
        //   group = 2;
        // } else if (i <= problem.customers.length) {
        //   group = 1.5;
        // }
        // nodes.push({ name: i.toString(), group: group });
      }

      problem.edges.forEach(function(edge) {
        map.set(edge.u + "" + edge.v, edge.w);
      });

      var legendTexts = [];
      let vids = [];
      plan.plan.forEach(function(item) {
        // let same = legendTexts.filter(t => {
        //   return t.id.indexOf(item.vid + "-") == 0;
        // });
        let same = vids.filter(v => {
          return item.vid == v;
        });
        vids.push(item.vid);
        item.trips.forEach(function(trip, index) {
          let id;
          if (item.trips.length > 1) {
            id = item.vid + "：" + (same.length + 1) + "-" + index;
          } else {
            id = item.vid + "：" + (same.length + 1);
          }
          // let text = id + " : ";
          let text = "";
          var tempRoute = 0;

          trip.route.forEach(function(route, i) {
            if (i !== 0) {
              var value = map.get(tempRoute + "" + route);
              if (!value) {
                value = map.get(route + "" + tempRoute);
              }
              console.log("value=" + value);
              if (value > 0) {
                edges.push({
                  source: tempRoute,
                  target: route,
                  value: value,
                  // vid: item.vid
                  vid: legendTexts.length
                });
              }
              text += " → ";
            }
            if (problem.names !== undefined) {
              text += problem.names[route];
            } else {
              text += route;
            }
            tempRoute = route;
          });
          legendTexts.push({
            id: id,
            text: text,
            checked: true,
            distance: trip.distance,
            time: trip.time,
            serve: trip.serve
          });
        });
      });
      // this.routes = legendTexts

      problem.edges.forEach(function(edge) {
        var has = false;
        for (var i = 0; i < edges.length; i++) {
          var item = edges[i];
          if (
            (edge.u === item.source && edge.v === item.target) ||
            (edge.u === item.target && edge.v === item.source)
          ) {
            has = true;
            break;
          }
        }
        if (!has) {
          edges.push({
            source: edge.u,
            target: edge.v,
            value: edge.w
          });
        }
      });

      // var legendColors = d3
      //   .scaleOrdinal()
      //   .domain(d3.range(legendTexts.length))
      //   .range(d3.schemeCategory10)
      var legendColors = d3
        .scaleOrdinal()
        .domain(d3.range(legendTexts.length))
        .range(d3.schemeCategory10);
      legendTexts.forEach((legend, index) => {
        legend.color = legendColors(index);
      });

      this.routes = legendTexts;

      edges.forEach(function(link) {
        var sameAll = [];
        edges.forEach(function(item) {
          if (
            (item.source === link.source && item.target === link.target) ||
            (item.source === link.target && item.target === link.source)
          ) {
            sameAll.push(item);
          }
        });
        console.log("sameAll=" + JSON.stringify(sameAll));

        sameAll.forEach(function(s, i) {
          s.sameIndex = i + 1;
          s.sameTotal = sameAll.length;
          s.sameTotalHalf = s.sameTotal / 2;
          s.sameUneven = s.sameTotal % 2 !== 0;
          s.sameMiddleLink = Math.ceil(s.sameTotalHalf) === s.sameIndex;
          s.sameLowerHalf = s.sameIndex <= s.sameTotalHalf;
          s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
          s.sameIndexCorrected = s.sameLowerHalf
            ? s.sameIndex
            : s.sameIndex - Math.ceil(s.sameTotalHalf);
        });
      });

      edges.sort(function(x, y) {
        return x.sameTotal - y.sameTotal;
      });
      console.log("sort=" + JSON.stringify(edges));
      var maxSame = edges[edges.length - 1].sameTotal;
      console.log("maxSame=" + maxSame);

      edges.forEach(function(link) {
        link.maxSameHalf = Math.floor(maxSame / 2);
      });

      console.log("edges=" + JSON.stringify(edges));

      // 设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
      // var colorScale = d3
      //   .scaleOrdinal()
      //   .domain(d3.range(nodes.length))
      //   .range(d3.schemeCategory10)

      let width = this.$refs["svg"].clientWidth;
      let height = this.$refs["svg"].clientHeight;
      var marge = { top: 10, bottom: 10, left: 10, right: 10 };

      // let svg = d3.select("svg");
      let svg = d3
        .select("svg#graph_svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 " + width + " " + height);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

      var legend = svg.append("g");

      var zoom = d3
        .zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", () => {
          g.attr("transform", d3.event.transform);
        });
      svg.call(
        zoom
        // d3
        //   .zoom()
        //   .scaleExtent([0.1, 4])
        //   .on("zoom", () => {
        //     g.attr("transform", d3.event.transform);
        //   })
      );
      // zoom.scaleBy(svg, 0.5);

      var forceSimulation = d3
        .forceSimulation()
        .force("path", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());
      this.forceSimulation = forceSimulation;
      // 生成节点数据
      forceSimulation.nodes(nodes).on("tick", ticked);
      // 生成边数据
      forceSimulation
        .force("path")
        .links(edges)
        .distance(function(d) {
          // 每一边的长度
          // return Math.sqrt(d.value) * 40;
          if (d.value > 9) {
            return (Math.sqrt(d.value) + 6) * 40;
          }
          return d.value * 40;
        });

      // 设置图形的中心位置
      forceSimulation
        .force("center")
        .x(width / 2)
        .y(height / 2);

      // 绘制边
      var links = g
        .append("g")
        .selectAll("path")
        .data(edges)
        .enter()
        .append("path")
        .attr("class", function(d) {
          if (d.vid !== undefined) {
            return "link-edge-route-" + d.vid;
          } else {
            return "link-edge-normal";
          }
        })
        .attr("stroke", function(d, i) {
          console.log("stroke d=" + JSON.stringify(d) + "  d.vid=" + d.vid);
          if (d.vid !== undefined) {
            var color = legendColors(d.vid);
            console.log(
              "sameTotal=" +
                d.sameTotal +
                "  d.vid=" +
                d.vid +
                "   color=" +
                color
            );
            return color;
          }
          return "#ccc";
        })
        .attr("stroke-width", 1)
        //   .attr("class", function(d) { return "link " + d.sameTotal; })
        .attr("marker-end", function(d, i) {
          var refX = 30;
          // var refY = d.sameTotal * 6
          nodes.forEach(function(node) {
            if (node.name === d.target.toString()) {
              refX = node.group * 15;
            }
          });
          // eslint-disable-next-line no-unused-vars
          var arrowMarker = svg
            .append("marker")
            .attr("id", "arrow" + i)
            .attr("markerUnits", "userSpaceOnUse")
            .attr("markerWidth", "16")
            .attr("markerHeight", "15")
            .attr("viewBox", "0 0 12 12")
            .attr("refX", refX)
            .attr("refY", 6)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
            .attr("fill", function() {
              if (d.vid !== undefined) {
                return legendColors(d.vid);
              }
              return "#000000";
            });
          if (d.vid !== undefined) {
            return "url(#arrow" + i + ")";
          }
          return "url(#end)";
        });

      // 边上文字
      var linksText = g
        .append("g")
        .selectAll("text")
        .data(edges)
        .enter()
        .append("text")
        .attr("class", function(d) {
          if (d.vid !== undefined) {
            return "link-text-route-" + d.vid;
          } else {
            return "link-text-normal";
          }
        })
        .text(function(d) {
          return d.value.toFixed(2);
          // return d.relation;
        });
      // 建立用来放在每个节点和对应文字的分组<g>
      var gs = g
        .selectAll(".circleText")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          var cirX = d.x;
          var cirY = d.y;
          return "translate(" + cirX + "," + cirY + ")";
        })
        .call(
          d3
            .drag()
            .on("start", started)
            .on("drag", dragged)
            .on("end", ended)
        );

      // 绘制节点
      gs.append("circle")
        // .attr("r",20)
        .attr("r", function(d, i) {
          // 圆圈半径
          return d.group * 15;
        })
        .attr("fill", function(d, i) {
          if (d.group == 2) {
            return "#fc5454";
          } else if (d.group == 1.5) {
            return "#02c58d";
            // return "#ccc"
          } else {
            return "#fcbe2d";
          }
        });
      // 文字
      gs.append("text")
        .attr("text-anchor", "middle")
        // .attr("font-size", "14px")
        .attr("dominant-baseline", "middle")
        .attr("fill", function(d) {
          if (problem.names !== undefined) {
            return "#000";
          }
          return "#fff";
        })
        .attr("font-size", function(d) {
          if (problem.names !== undefined) {
            return "12px";
          }
          return "16px";
        })
        .text(function(d) {
          if (problem.names !== undefined) {
            return problem.names[d.name];
          }
          return d.name;
        });

      // addLegend();

      function ticked() {
        links.attr("fill", "transparent").attr("d", linkArc);

        linksText
          .attr("x", function(d) {
            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", function(d) {
            return (d.source.y + d.target.y) / 2;
          });

        gs.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      }
      // drag
      function started(d) {
        if (!d3.event.active) {
          // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
          forceSimulation.alphaTarget(0.8).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function ended(d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }

      function linkArc(d) {
        // console.log('linkArc linkArc linkArc')
        var dx = d.target.x - d.source.x;
        var dy = d.target.y - d.source.y;
        var dr = Math.sqrt(dx * dx + dy * dy);
        var unevenCorrection = d.sameUneven ? 0 : 0.5;
        var arc =
          (dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection);

        if (d.sameMiddleLink) {
          arc = 0;
        }

        return (
          "M" +
          d.source.x +
          "," +
          d.source.y +
          "A" +
          arc +
          "," +
          arc +
          " 0 0," +
          d.sameArcDirection +
          " " +
          d.target.x +
          "," +
          d.target.y
        );
      }

      // 添加图例

      function addLegend() {
        var textGroup = legend.selectAll("text").data(legendTexts);

        textGroup.exit().remove();

        legend
          .selectAll("text")
          .data(legendTexts)
          .enter()
          .append("text")
          .text(function(d) {
            // return (
            //   '车辆' +
            //   d.id +
            //   '：路程：' +
            //   d.distance.toFixed(2) +
            //   '公里 | 时间：' +
            //   d.time.toFixed(2) +
            //   '小时'
            // )
            return d.id;
            // return d.text
          })
          .attr("class", "legend")
          .attr("y", function(d, i) {
            return i * 20 + 20;
          })
          .attr("x", 30)
          .attr("fill", function(d, i) {
            return legendColors(i);
          });

        var rectGroup = legend.selectAll("rect").data(legendTexts);

        rectGroup.exit().remove();

        legend
          .selectAll("rect")
          .data(legendTexts)
          .enter()
          .append("rect")
          .attr("y", function(d, i) {
            return i * 20 + 8;
          })
          .attr("x", 10)
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", function(d, i) {
            return legendColors(i);
          });
      }
    },
    showCurveGraph() {
      // this.msgs = [
      //   {
      //     step: 0,
      //     penalty: 0,
      //     cost: 71.3765,
      //     distance: 76,
      //     time: 3.45,
      //     loadFactor: 0.847059
      //   },
      //   {
      //     step: 15,
      //     penalty: 0,
      //     cost: 71.3765,
      //     distance: 76,
      //     time: 3.45,
      //     loadFactor: 0.847059
      //   },
      //   {
      //     step: 30,
      //     penalty: 0,
      //     cost: 51.49,
      //     distance: 74,
      //     time: 3.55,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 45,
      //     penalty: 0,
      //     cost: 49.49,
      //     distance: 70,
      //     time: 3.55,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 60,
      //     penalty: 0,
      //     cost: 49.49,
      //     distance: 70,
      //     time: 3.55,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 75,
      //     penalty: 0,
      //     cost: 48.69,
      //     distance: 69,
      //     time: 3.45,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 90,
      //     penalty: 0,
      //     cost: 48.69,
      //     distance: 69,
      //     time: 3.45,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 105,
      //     penalty: 0,
      //     cost: 48.69,
      //     distance: 69,
      //     time: 3.45,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 120,
      //     penalty: 0,
      //     cost: 48.69,
      //     distance: 69,
      //     time: 3.45,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 135,
      //     penalty: 0,
      //     cost: 48.69,
      //     distance: 69,
      //     time: 3.45,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 150,
      //     penalty: 0,
      //     cost: 48.69,
      //     distance: 69,
      //     time: 3.45,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 165,
      //     penalty: 0,
      //     cost: 48.69,
      //     distance: 69,
      //     time: 3.45,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 180,
      //     penalty: 0,
      //     cost: 48.69,
      //     distance: 69,
      //     time: 3.45,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 195,
      //     penalty: 0,
      //     cost: 48.69,
      //     distance: 69,
      //     time: 3.45,
      //     loadFactor: 0.96
      //   },
      //   {
      //     step: 200,
      //     penalty: 0,
      //     cost: 48.69,
      //     distance: 69,
      //     time: 3.45,
      //     loadFactor: 0.96
      //   }
      // ];

      console.log("msgs=" + JSON.stringify(this.msgs));
      let width = this.$refs["test_svg"].clientWidth;
      let height = this.$refs["test_svg"].clientHeight;
      const margin = { top: 30, right: 60, bottom: 60, left: 60 };

      let svg = d3
        .select("svg#test_svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 " + width + " " + height);

      // var data = [1, 3, 5, 7, 8, 4, 3, 7];
      let costs = this.msgs.map(msg => {
        return msg.cost
      })

      // 比例尺
      const xScale = d3
        .scaleLinear()
        // .domain([0, data.length-1])
        .domain([0, this.maxiter])
        .nice()
        .range([margin.left, width - margin.right]);
      const yScale = d3
        .scaleLinear()
        // .domain([0, d3.max(data)])
        // Math.floor(this.msgs[0].cost), Math.ceil(this.msgs[this.msgs.length - 1].cost)
        .domain([d3.min(costs), d3.max(costs)])
        // .domain([Math.floor(this.msgs[this.msgs.length - 1].cost), Math.ceil(this.msgs[0].cost)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("text-anchor", "start")
        .attr("stroke", "red")
        .style("font-size", "12px")
        .style("font-style", "宋体")
        .attr("x", width - margin.right)
        .attr("y", 5)
        .text(d => "迭代次数");


      // y轴
      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("text-anchor", "start")
        .attr("stroke", "red")
        .style("font-size", "12px")
        .style("font-style", "宋体")
        .attr("x", 10)
        .attr("y", 30)
        .text(d => "纵坐标");

      // const pathLine = d3
      //   .line()
      //   .curve(d3.curveBasis) // 如果没有这一行则是折线，有则为曲线
      //   .x((d, i) => xScale(i))
      //   // .y(d => height - margin.bottom - (yScale(0) - yScale(d)));
      //   .y((d, i) => yScale(d));

      const pathLine = d3
        .line()
        .curve(d3.curveBasis) // 如果没有这一行则是折线，有则为曲线
        .x((d, i) => xScale(d.step))
        .y((d, i) => yScale(d.cost));

      // [1,2,3,4,5,6,7,8]
      svg
        .append("path")
        .attr("d", pathLine(this.msgs)) // data
        .attr("stroke", "red")
        .attr("stroke-width", "1px")
        .attr("fill", "none");
      // .attr("transform", `translate(${(margin.left)*2},0)`);
      const header = ["算法收敛曲线"];
      const headers = svg.append("g");
      headers
        .selectAll("text")
        .data(header)
        .enter()
        .append("text")
        .attr("stroke", "black")
        .attr("transform", `translate(${width / 3},${margin.top})`)
        .style("font-size", "25px")
        .text(d => d);
    }
  }
};
</script>

<style>
.text-item {
  font-size: 14px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.box-card {
  margin: 10px;
}

.container {
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
}
</style>
<style src="../../../assets/btn.css" scoped></style>
