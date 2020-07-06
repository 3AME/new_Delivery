<template>
  <el-dialog
  title="添加查询任务"
  :visible.sync="value.show"
  width="30%"
  @open="onOpen"
  >
  <span>任务名</span>
  <el-input v-model="value.name" placeholder="请输入任务名"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="value.show = false">取 消</el-button>
    <el-button type="primary" @click="onQuery">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  computed: {
    querys() {
      return this.$store.state.d2admin.query.querys;
    }
  },
  methods: {
    onQuery() {
      if (this.value.name === null || this.value.name.length === 0) {
        this.$notify({
          title: "警告",
          message: "任务名不能为空！",
          type: "warning"
        });
        return
      }
      let filterQuery = this.querys.filter(item => {
        return item.title === this.value.name
      })
      console.log('length=' + filterQuery.length)
      if (filterQuery.length > 0) {
        this.$notify({
          title: "警告",
          message: "任务名已存在！",
          type: "warning"
        });
        return
      }

      this.$router.push({
        name: "page_result",
        query: {
          queryValue: this.value
        }
      });
      this.value.show = false
    },
    onOpen() {
      let fmt = 'yyyy-MM-dd HH-mm-ss'
      let date = new Date()

      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      }

      var time = fmt
      console.log('time=' + time)
      this.value.time = time
      let name;
      if (this.value.type === 'coordinate') {
        name = '坐标查询';
      } else if (this.value.type === 'map') {
        name = '地图查询';
      } else {
        name = '路线查询';
      }
      this.value.name = name + time
      // this.formData.push(this.value)
    }
  }
}
</script>
