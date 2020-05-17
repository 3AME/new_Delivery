<template>
  <el-container class="container" style="margin: 10px;" v-loading="loading">
    <el-aside width="230px" class="aside">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>最优结果</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div class="text-item" v-if="result">总路程: {{ result.distance.toFixed(2) }} 公里</div>
        <div class="text-item" v-if="result">总时间: {{ result.time.toFixed(2) }} 小时</div>
        <div class="text-item" v-if="result">平均满载率: {{ (result.loadfactor * 100).toFixed(2) }} %</div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>最优路线</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div style="text-align: center; margin-bottom: 20px;">
          <el-switch
            v-if="problem && problem.routeMode && problem.nodes.length !== 0"
            v-model="hideRoute"
            @change="toggleRoute()"
            active-text="隐藏无关路线"
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
            <!---->
          </label>
          <span
            @click="toggleVisible(route, index)"
            :style="'font-size: 12px; padding-top: 4px; padding-bottom: 4px;color:' + route.color"
            :fill="route.color"
          >车辆{{ route.text }}</span>
        </div>
      </el-card>
      <!-- {{ result }} -->
    </el-aside>
    <el-container>
      <div style="height:100%; width: 100%">
        <svg id="graph_svg" style="height:100%; width: 100%" ref="svg" />
      </div>
    </el-container>
  </el-container>
</template>

<script>
import * as d3 from 'd3'
const { spawn } = require('child_process')

export default {
  data () {
    return {
      forceSimulation: undefined,
      myChart: undefined,
      result: undefined,
      problem: undefined,
      hideRoute: false,
      routes: [],
      loading: true
    }
  },
  mounted () {
    console.log('mounted')
    this.hideRoute = false

    let me = this
    window.onresize = () => {
      if (me.forceSimulation) {
        let width = me.$refs['svg'].clientWidth
        let height = me.$refs['svg'].clientHeight
        console.log('onresize width=' + width + ' height=' + height)
        me.forceSimulation
          .force('center')
          .x(width / 2)
          .y(height / 2)
      }
    }
  },
  activated () {
    // console.log('problem=' + JSON.stringify(this.problem))
    // console.log('this.$route.query.problem=' + JSON.stringify(this.$route.query.problem))
    // console.log('==============' + (this.problem === this.$route.query.problem))
    let svgChildren = d3.selectAll('svg#graph_svg > *')
    console.log('d3.selectAll()=' + svgChildren.size())
    if (
      svgChildren.size() > 0 &&
      JSON.stringify(this.problem) === JSON.stringify(this.$route.query.problem)
    ) {
      this.loading = false
      return
    }
    this.loading = true
    svgChildren.remove()
    console.log('activated')
    this.problem = this.$route.query.problem
    this.hideRoute = false
    this.problem = this.$route.query.problem
    console.log('names=' + this.problem.names)
    this.$store.dispatch('d2admin/addQuery', this.problem)
    this.solve(this.problem)
  },
  deactivated () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    solve (
      problem, // VRP问题描述
      popsize = 100, // 种群大小
      childsize = 100, // 子代数量
      maxiter = 40, // 迭代次数
      mutationProb = 0.25 // 变异率
    ) {
      var isRouteMode = this.problem.routeMode
      if (!isRouteMode) {
        var problem1 = problem
        problem = {
          // num_node: problem1.edges.length,
          nodes: problem1.nodes,
          edges: [],
          // customers: problem1.customers,
          vehicles: problem1.vehicles,
          distancePrior: problem1.distancePrior,
          timePrior: problem1.timePrior,
          loadPrior: problem1.loadPrior
        }
        for (var i = 0; i < problem1.edges.length; i++) {
          var start = problem1.edges[i]
          for (var j = i + 1; j < problem1.edges.length; j++) {
            var end = problem1.edges[j]
            var deltaX = start.x - end.x
            var deltaY = start.y - end.y
            var len = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            problem.edges.push({
              u: i,
              v: j,
              w: len
            })
          }
        }
      }

      console.log('function solve run')

      var solver = spawn('resources/VehicleRouting.exe')
      var pipe = (...msg) => {
        solver.stdin.write(msg.join(' ') + '\n')
        // console.log(msg.join(' '));
      }

      // eslint-disable-next-line camelcase
      var n_customer = 0
      for (let i in problem.nodes) {
        var node = problem.nodes[i]
        if (node.type === 'customer') {
          // eslint-disable-next-line camelcase
          n_customer++
        }
      }
      pipe(n_customer)
      for (let i in problem.nodes) {
        let node = problem.nodes[i]
        if (node.type === 'customer') {
          pipe(node.id, node.demand)
        }
      }

      // eslint-disable-next-line camelcase
      var n_depot = 0
      // eslint-disable-next-line camelcase
      var first_depot = -1
      for (let i in problem.nodes) {
        let node = problem.nodes[i]
        if (node.type === 'depot') {
          // eslint-disable-next-line camelcase
          if (first_depot === -1) {
            // eslint-disable-next-line camelcase
            first_depot = node.id
          }
          // eslint-disable-next-line camelcase
          n_depot++
        }
      }
      // eslint-disable-next-line camelcase
      if (first_depot === -1) {
        // eslint-disable-next-line no-throw-literal
        throw 'no depot was found in nodes'
      }
      pipe(n_depot)
      for (let i in problem.nodes) {
        let node = problem.nodes[i]
        if (node.type === 'depot') {
          pipe(node.id)
        }
      }

      // eslint-disable-next-line camelcase
      var n_other = 0
      for (let i in problem.nodes) {
        let node = problem.nodes[i]
        if (node.type === 'other') {
          // eslint-disable-next-line camelcase
          n_other++
        }
      }
      pipe(n_other)
      for (let i in problem.nodes) {
        let node = problem.nodes[i]
        if (node.type === 'other') {
          pipe(node.id)
        }
      }

      if (typeof problem.edges === 'string') {
        if (problem.edges === 'euc2d') {
          var n = problem.nodes.length
          pipe(Math.round((n * (n - 1)) / 2))
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
              var w = Math.sqrt(
                Math.pow(problem.nodes[i].x - problem.nodes[j].x, 2) +
                  Math.pow(problem.nodes[i].y - problem.nodes[j].y, 2)
              )
              pipe(problem.nodes[i].id, problem.nodes[j].id, w)
            }
          }
        } else {
          // eslint-disable-next-line no-throw-literal
          throw 'unsupported edge type "' + problem.edges + '"'
        }
      } else {
        pipe(problem.edges.length)
        for (let i in problem.edges) {
          var edge = problem.edges[i]
          pipe(edge.u, edge.v, edge.w)
        }
      }

      pipe(problem.vehicles.length)
      for (let i in problem.vehicles) {
        var veh = problem.vehicles[i]
        // eslint-disable-next-line camelcase
        var depot = veh.depot || first_depot
        var load = veh.load || -1
        var mileage = veh.mileage || 35
        var worktime = veh.worktime || -1
        var count = veh.count || 1
        // pipe(veh.id, depot, load, mileage, worktime, count);
        pipe(veh.id, depot, load, mileage, worktime, count)
      }

      pipe(problem.distancePrior, problem.timePrior, problem.loadPrior)
      pipe(popsize, childsize, maxiter, mutationProb)

      solver.stdout.on('data', buffer => {
        console.log('dddddddddddddddddd=' + buffer.toString())
        // eslint-disable-next-line no-eval
        var solution = eval('(' + buffer.toString() + ')')
        console.log(solution)

        // eslint-disable-next-line no-eval
        this.result = eval('(' + buffer.toString() + ')')

        if (isRouteMode) {
          this.showGraph()
        } else {
          this.showScatterGraph()
        }
        this.loading = false
      })

      solver.on('exit', code => {
        console.log(`child process exit，code = ${code}`)
      })
    },
    toggleRoute () {
      let visibility = this.hideRoute ? 'hidden' : 'visible'
      d3.selectAll('.link-edge-normal').attr('visibility', visibility)
      d3.selectAll('.link-text-normal').attr('visibility', visibility)
    },
    toggleVisible (route, i) {
      route.checked = !route.checked
      this.onCheckedChange(route, i)
    },
    onCheckedChange (route, i) {
      let visibility = route.checked ? 'visible' : 'hidden'
      d3.selectAll('.link-edge-route-' + i).attr('visibility', visibility)
      d3.selectAll('.link-text-route-' + i).attr('visibility', visibility)
    },
    // 散点图
    showScatterGraph () {
      var problem = this.problem
      var data = []
      problem.edges.forEach(function (edge, index) {
        data.push({
          name: '节点' + index + ':(' + edge.x + ', ' + edge.y + ')',
          x: edge.x,
          y: edge.y
        })
      })

      var plan = this.result

      var edges = []

      var legendTexts = []
      // let vid = 0
      plan.plan.forEach(function (item) {
        item.trips.forEach(function (trip, index) {
          let text = item.vid + '_' + index + ' : '
          var tempRoute = 0
          trip.route.forEach(function (route, i) {
            if (i !== 0) {
              edges.push({
                source: tempRoute,
                target: route,
                // value: value,
                // vid: item.vid
                vid: legendTexts.length
              })
              text += ' → '
            }
            // text += route;
            if (problem.names !== undefined) {
              text += problem.names[route]
            } else {
              text += route
            }
            tempRoute = route
          })
          legendTexts.push({
            id: item.vid + '_' + index,
            text: text,
            checked: true,
            distance: trip.distance,
            time: trip.time
          })
          // this.routes.push(text);
          // vid++
        })
      })

      var legendColors = d3
        .scaleOrdinal()
        .domain(d3.range(legendTexts.length))
        .range(d3.schemeCategory10)
      legendTexts.forEach((legend, index) => {
        legend.color = legendColors(index)
      })

      this.routes = legendTexts

      edges.forEach(function (link) {
        // find other edges with same target+source or source+target
        var sameAll = []
        edges.forEach(function (item) {
          if (
            (item.source === link.source && item.target === link.target) ||
            (item.source === link.target && item.target === link.source)
          ) {
            sameAll.push(item)
          }
        })
        console.log('sameAll=' + JSON.stringify(sameAll))

        sameAll.forEach(function (s, i) {
          s.sameIndex = i + 1
          s.sameTotal = sameAll.length
          s.sameTotalHalf = s.sameTotal / 2
          s.sameUneven = s.sameTotal % 2 !== 0
          // if (s.sameUneven) {
          //   s.sameMiddleLink = Math.ceil(s.sameTotalHalf) === s.sameIndex
          // } else {
          //   s.sameMiddleLink = s.sameTotalHalf
          // }
          s.sameMiddleLink = Math.ceil(s.sameTotalHalf) === s.sameIndex
          // s.sameMiddleLink =
          //   s.sameUneven === true && Math.ceil(s.sameTotalHalf) === s.sameIndex;
          s.sameLowerHalf = s.sameIndex <= s.sameTotalHalf
          s.sameArcDirection = s.sameLowerHalf ? 0 : 1
          s.sameIndexCorrected = s.sameLowerHalf
            ? s.sameIndex
            : s.sameIndex - Math.ceil(s.sameTotalHalf)
        })
      })

      edges.sort(function (x, y) {
        return x.sameTotal - y.sameTotal
      })
      console.log('sort=' + JSON.stringify(edges))
      var maxSame = edges[edges.length - 1].sameTotal
      console.log('maxSame=' + maxSame)

      edges.forEach(function (link) {
        link.maxSameHalf = Math.floor(maxSame / 2)
      })

      console.log('edges=' + JSON.stringify(edges))

      let width = this.$refs['svg'].clientWidth
      let height = this.$refs['svg'].clientHeight
      const margin = { top: 30, right: 30, bottom: 30, left: 30 }

      let svg = d3
        .select('svg#graph_svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', '0 0 ' + width + ' ' + height)

      // 比例尺
      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .nice()
        .range([margin.left, width - margin.right])
      const y = d3
        .scaleLinear()
        .domain(d3.extent(data, d => d.y))
        .nice()
        .range([height - margin.bottom, margin.top])

      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

      // y轴
      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

      // 绘制坐标点
      svg
        .append('g')
        .attr('fill', '#000')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 4)

      // 标注文字
      svg
        .append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 14)
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', d => x(d.x))
        .attr('y', d => y(d.y))
        .text(d => {
          if (problem.names !== undefined) {
            return problem.names[d.name]
          }
          return d.name
        })
        .call(dodge)

      // eslint-disable-next-line no-unused-vars
      var links = svg
        .selectAll('.line')
        .data(edges)
        .enter()
        .append('path')
        .attr('class', function (d) {
          if (d.vid !== undefined) {
            return 'link-edge-route-' + d.vid
          } else {
            return 'link-edge-normal'
          }
        })
        .attr('stroke', function (d, i) {
          console.log('stroke d=' + JSON.stringify(d) + '  d.vid=' + d.vid)
          if (d.vid !== undefined) {
            var color = legendColors(d.vid)
            return color
          }
          return '#ccc'
        })
        .attr('stroke-width', 1)
        .attr('marker-end', function (d, i) {
          // eslint-disable-next-line no-unused-vars
          var arrowMarker = svg
            .append('marker')
            .attr('id', 'arrow' + i)
            .attr('markerUnits', 'userSpaceOnUse')
            .attr('markerWidth', '16')
            .attr('markerHeight', '15')
            .attr('viewBox', '0 0 12 12')
            .attr('refX', 30)
            .attr('refY', 6)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2')
            .attr('fill', function () {
              if (d.vid !== undefined) {
                return legendColors(d.vid)
              }
              return '#000000'
            })
          if (d.vid !== undefined) {
            return 'url(#arrow' + i + ')'
          }
          return 'url(#end)'
        })
        .attr('fill', 'transparent')
        .attr('d', linkArc)

      function linkArc (d) {
        // console.log('linkArc linkArc linkArc')
        var dx = x(data[d.target].x) - x(data[d.source].x)
        var dy = y(data[d.target].y) - y(data[d.source].y)
        var dr = Math.sqrt(dx * dx + dy * dy)
        var unevenCorrection = d.sameUneven ? 0 : 0.5
        var arc =
          (dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection)

        if (d.sameMiddleLink) {
          arc = 0
        }

        return (
          'M' +
          x(data[d.source].x) +
          ',' +
          y(data[d.source].y) +
          'A' +
          arc +
          ',' +
          arc +
          ' 0 0,' +
          d.sameArcDirection +
          ' ' +
          x(data[d.target].x) +
          ',' +
          y(data[d.target].y)
        )
      }
      addLegend()

      function dodge (text, iterations = 300) {
        const nodes = text.nodes()
        const left = () =>
          text.attr('text-anchor', 'start').attr('dy', '0.32em')
        const right = () =>
          text.attr('text-anchor', 'end').attr('dy', '0.32em')
        const top = () =>
          text.attr('text-anchor', 'middle').attr('dy', '0.0em')
        const bottom = () =>
          text.attr('text-anchor', 'middle').attr('dy', '0.8em')
        const points = nodes.map(node => ({
          fx: +node.getAttribute('x'),
          fy: +node.getAttribute('y')
        }))
        const labels = points.map(({ fx, fy }) => ({ x: fx, y: fy }))
        const links = points.map((source, i) => ({
          source,
          target: labels[i]
        }))

        const simulation = d3
          .forceSimulation(points.concat(labels))
          .force('charge', d3.forceManyBody().distanceMax(80))
          .force(
            'link',
            d3
              .forceLink(links)
              .distance(4)
              .iterations(4)
          )
          .stop()

        for (let i = 0; i < iterations; i += 1) simulation.tick()

        text
          .attr('x', (_, i) => labels[i].x)
          .attr('y', (_, i) => labels[i].y)
          .each(function (_, i) {
            const a = Math.atan2(
              labels[i].y - points[i].fy,
              labels[i].x - points[i].fx
            )
            d3.select(this).call(
              a > Math.PI / 4 && a <= (Math.PI * 3) / 4
                ? bottom
                : a > -Math.PI / 4 && a <= Math.PI / 4
                  ? left
                  : a > (-Math.PI * 3) / 4 && a <= (Math.PI * 3) / 4
                    ? top
                    : right
            )
          })
      }

      function addLegend () {
        var legend = svg.append('g')
        var textGroup = legend.selectAll('text').data(legendTexts)

        textGroup.exit().remove()

        legend
          .selectAll('text')
          .data(legendTexts)
          .enter()
          .append('text')
          .text(function (d) {
            return (
              '车辆' +
              d.id +
              '：路程：' +
              d.distance.toFixed(2) +
              '公里 | 时间：' +
              d.time.toFixed(2) +
              '小时'
            )
            // return d.text
          })
          .attr('class', 'legend')
          .attr('y', function (d, i) {
            return i * 20 + 12
          })
          .attr('x', 70)
          .attr('fill', function (d, i) {
            return legendColors(i)
          })

        var rectGroup = legend.selectAll('rect').data(legendTexts)

        rectGroup.exit().remove()

        legend
          .selectAll('rect')
          .data(legendTexts)
          .enter()
          .append('rect')
          .attr('y', function (d, i) {
            return i * 20
          })
          .attr('x', 50)
          .attr('width', 12)
          .attr('height', 12)
          .attr('fill', function (d, i) {
            return legendColors(i)
          })
      }
    },
    // 力导向图
    showGraph () {
      var problem = this.problem

      var plan = this.result

      // 准备数据
      var nodes = [
        // 节点集
      ]

      var edges = []

      var map = new Map()

      for (var i = 0; i < problem.nodes.length; i++) {
        let node = problem.nodes[i]
        let group = 1
        if (node.type === 'depot') {
          group = 2
        } else if (node.type === 'customer') {
          group = 1.5
        } else if (node.type === 'other') {
          group = 1
        } else {
          continue
        }
        nodes.push({ name: node.id.toString(), group: group })
        // var name = i.toString()
        // var group = 1;
        // if (i === 0) {
        //   group = 2;
        // } else if (i <= problem.customers.length) {
        //   group = 1.5;
        // }
        // nodes.push({ name: i.toString(), group: group });
      }

      problem.edges.forEach(function (edge) {
        map.set(edge.u + '' + edge.v, edge.w)
      })

      var legendTexts = []
      plan.plan.forEach(function (item) {
        item.trips.forEach(function (trip, index) {
          let text = item.vid + '_' + index + ' : '
          var tempRoute = 0

          trip.route.forEach(function (route, i) {
            if (i !== 0) {
              var value = map.get(tempRoute + '' + route)
              if (!value) {
                value = map.get(route + '' + tempRoute)
              }
              console.log('value=' + value)
              if (value > 0) {
                edges.push({
                  source: tempRoute,
                  target: route,
                  value: value,
                  // vid: item.vid
                  vid: legendTexts.length
                })
              }
              text += ' → '
            }
            if (problem.names !== undefined) {
              text += problem.names[route]
            } else {
              text += route
            }
            tempRoute = route
          })
          legendTexts.push({
            id: item.vid + '_' + index,
            text: text,
            checked: true,
            distance: trip.distance,
            time: trip.time
          })
        })
      })
      // this.routes = legendTexts

      problem.edges.forEach(function (edge) {
        var has = false
        for (var i = 0; i < edges.length; i++) {
          var item = edges[i]
          if (
            (edge.u === item.source && edge.v === item.target) ||
            (edge.u === item.target && edge.v === item.source)
          ) {
            has = true
            break
          }
        }
        if (!has) {
          edges.push({
            source: edge.u,
            target: edge.v,
            value: edge.w
          })
        }
      })

      // var legendColors = d3
      //   .scaleOrdinal()
      //   .domain(d3.range(legendTexts.length))
      //   .range(d3.schemeCategory10)
      var legendColors = d3
        .scaleOrdinal()
        .domain(d3.range(legendTexts.length))
        .range(d3.schemeCategory10)
      legendTexts.forEach((legend, index) => {
        legend.color = legendColors(index)
      })

      this.routes = legendTexts

      edges.forEach(function (link) {
        var sameAll = []
        edges.forEach(function (item) {
          if (
            (item.source === link.source && item.target === link.target) ||
            (item.source === link.target && item.target === link.source)
          ) {
            sameAll.push(item)
          }
        })
        console.log('sameAll=' + JSON.stringify(sameAll))

        sameAll.forEach(function (s, i) {
          s.sameIndex = i + 1
          s.sameTotal = sameAll.length
          s.sameTotalHalf = s.sameTotal / 2
          s.sameUneven = s.sameTotal % 2 !== 0
          s.sameMiddleLink = Math.ceil(s.sameTotalHalf) === s.sameIndex
          s.sameLowerHalf = s.sameIndex <= s.sameTotalHalf
          s.sameArcDirection = s.sameLowerHalf ? 0 : 1
          s.sameIndexCorrected = s.sameLowerHalf
            ? s.sameIndex
            : s.sameIndex - Math.ceil(s.sameTotalHalf)
        })
      })

      edges.sort(function (x, y) {
        return x.sameTotal - y.sameTotal
      })
      console.log('sort=' + JSON.stringify(edges))
      var maxSame = edges[edges.length - 1].sameTotal
      console.log('maxSame=' + maxSame)

      edges.forEach(function (link) {
        link.maxSameHalf = Math.floor(maxSame / 2)
      })

      console.log('edges=' + JSON.stringify(edges))

      // 设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
      // var colorScale = d3
      //   .scaleOrdinal()
      //   .domain(d3.range(nodes.length))
      //   .range(d3.schemeCategory10)

      let width = this.$refs['svg'].clientWidth
      let height = this.$refs['svg'].clientHeight
      var marge = { top: 10, bottom: 10, left: 10, right: 10 }

      // let svg = d3.select("svg");
      let svg = d3
        .select('svg#graph_svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', '0 0 ' + width + ' ' + height)

      var g = svg
        .append('g')
        .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')')

      var legend = svg.append('g')

      var zoom = d3
        .zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', () => {
          g.attr('transform', d3.event.transform)
        })
      svg.call(
        zoom
        // d3
        //   .zoom()
        //   .scaleExtent([0.1, 4])
        //   .on("zoom", () => {
        //     g.attr("transform", d3.event.transform);
        //   })
      )
      // zoom.scaleBy(svg, 0.5);

      var forceSimulation = d3
        .forceSimulation()
        .force('path', d3.forceLink())
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter())
      this.forceSimulation = forceSimulation
      // 生成节点数据
      forceSimulation.nodes(nodes).on('tick', ticked)
      // 生成边数据
      forceSimulation
        .force('path')
        .links(edges)
        .distance(function (d) {
          // 每一边的长度
          // return Math.sqrt(d.value) * 40;
          if (d.value > 9) {
            return (Math.sqrt(d.value) + 6) * 40
          }
          return d.value * 40
        })

      // 设置图形的中心位置
      forceSimulation
        .force('center')
        .x(width / 2)
        .y(height / 2)

      // 绘制边
      var links = g
        .append('g')
        .selectAll('path')
        .data(edges)
        .enter()
        .append('path')
        .attr('class', function (d) {
          if (d.vid !== undefined) {
            return 'link-edge-route-' + d.vid
          } else {
            return 'link-edge-normal'
          }
        })
        .attr('stroke', function (d, i) {
          console.log('stroke d=' + JSON.stringify(d) + '  d.vid=' + d.vid)
          if (d.vid !== undefined) {
            var color = legendColors(d.vid)
            console.log(
              'sameTotal=' +
                d.sameTotal +
                '  d.vid=' +
                d.vid +
                '   color=' +
                color
            )
            return color
          }
          return '#ccc'
        })
        .attr('stroke-width', 1)
        //   .attr("class", function(d) { return "link " + d.sameTotal; })
        .attr('marker-end', function (d, i) {
          var refX = 30
          // var refY = d.sameTotal * 6
          nodes.forEach(function (node) {
            if (node.name === d.target.toString()) {
              refX = node.group * 15
            }
          })
          // eslint-disable-next-line no-unused-vars
          var arrowMarker = svg
            .append('marker')
            .attr('id', 'arrow' + i)
            .attr('markerUnits', 'userSpaceOnUse')
            .attr('markerWidth', '16')
            .attr('markerHeight', '15')
            .attr('viewBox', '0 0 12 12')
            .attr('refX', refX)
            .attr('refY', 6)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2')
            .attr('fill', function () {
              if (d.vid !== undefined) {
                return legendColors(d.vid)
              }
              return '#000000'
            })
          if (d.vid !== undefined) {
            return 'url(#arrow' + i + ')'
          }
          return 'url(#end)'
        })

      // 边上文字
      var linksText = g
        .append('g')
        .selectAll('text')
        .data(edges)
        .enter()
        .append('text')
        .attr('class', function (d) {
          if (d.vid !== undefined) {
            return 'link-text-route-' + d.vid
          } else {
            return 'link-text-normal'
          }
        })
        .text(function (d) {
          return d.value.toFixed(2)
          // return d.relation;
        })
      // 建立用来放在每个节点和对应文字的分组<g>
      var gs = g
        .selectAll('.circleText')
        .data(nodes)
        .enter()
        .append('g')
        .attr('transform', function (d, i) {
          var cirX = d.x
          var cirY = d.y
          return 'translate(' + cirX + ',' + cirY + ')'
        })
        .call(
          d3
            .drag()
            .on('start', started)
            .on('drag', dragged)
            .on('end', ended)
        )

      // 绘制节点
      gs.append('circle')
        // .attr("r",20)
        .attr('r', function (d, i) {
          // 圆圈半径
          return d.group * 15
        })
        .attr('fill', function (d, i) {
          return '#ccc'
          // if (d.group === 2) {
          //   return "#ccc"
          // }
          // return colorScale(i);
          // return colorScale(d.group);
        })
      // 文字
      gs.append('text')
        .attr('text-anchor', 'middle')
        .text(function (d) {
          if (problem.names !== undefined) {
            return problem.names[d.name]
          }
          return d.name
        })

      addLegend()

      function ticked () {
        links.attr('fill', 'transparent').attr('d', linkArc)

        linksText
          .attr('x', function (d) {
            return (d.source.x + d.target.x) / 2
          })
          .attr('y', function (d) {
            return (d.source.y + d.target.y) / 2
          })

        gs.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
      }
      // drag
      function started (d) {
        if (!d3.event.active) {
          // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
          forceSimulation.alphaTarget(0.8).restart()
        }
        d.fx = d.x
        d.fy = d.y
      }
      function dragged (d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
      }
      function ended (d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0)
        }
        d.fx = null
        d.fy = null
      }

      function linkArc (d) {
        // console.log('linkArc linkArc linkArc')
        var dx = d.target.x - d.source.x
        var dy = d.target.y - d.source.y
        var dr = Math.sqrt(dx * dx + dy * dy)
        var unevenCorrection = d.sameUneven ? 0 : 0.5
        var arc =
          (dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection)

        if (d.sameMiddleLink) {
          arc = 0
        }

        return (
          'M' +
          d.source.x +
          ',' +
          d.source.y +
          'A' +
          arc +
          ',' +
          arc +
          ' 0 0,' +
          d.sameArcDirection +
          ' ' +
          d.target.x +
          ',' +
          d.target.y
        )
      }

      // 添加图例

      function addLegend () {
        var textGroup = legend.selectAll('text').data(legendTexts)

        textGroup.exit().remove()

        legend
          .selectAll('text')
          .data(legendTexts)
          .enter()
          .append('text')
          .text(function (d) {
            return (
              '车辆' +
              d.id +
              '：路程：' +
              d.distance.toFixed(2) +
              '公里 | 时间：' +
              d.time.toFixed(2) +
              '小时'
            )
            // return d.text
          })
          .attr('class', 'legend')
          .attr('y', function (d, i) {
            return i * 20 + 12
          })
          .attr('x', 30)
          .attr('fill', function (d, i) {
            return legendColors(i)
          })

        var rectGroup = legend.selectAll('rect').data(legendTexts)

        rectGroup.exit().remove()

        legend
          .selectAll('rect')
          .data(legendTexts)
          .enter()
          .append('rect')
          .attr('y', function (d, i) {
            return i * 20
          })
          .attr('x', 10)
          .attr('width', 12)
          .attr('height', 12)
          .attr('fill', function (d, i) {
            return legendColors(i)
          })
      }
    }
  }
}
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
