export default {
  state: {
    querys: []
  },
  mutations: {
    ADD_QUERY_DATA: (state, data) => {
      console.log('ADD_QUERY_DATA')
      state.querys.push(data)
      console.log('length=' + state.querys.length)
    },
    DELETE_QUERY_DATA: (state, index) => {
      console.log('DELETE_QUERY_DATA')
      state.querys.splice(index, 1)
      console.log('length=' + state.querys.length)
    },
    DELETE_ALL_QUERY_DATA: (state) => {
      state.querys.splice(0, state.querys.length)
    }
  },
  actions: {
    addQuery ({ commit, state }, problem) {
      console.log('addQuery')

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

      var query = {
        title: '查询记录' + time,
        problem: problem,
        time: time
      }
      commit('ADD_QUERY_DATA', query)
    }
    // deleteQuery({ commit, state }, index) {
    //     commit('DELETE_QUERY_DATA', index)
    // },
    // deleteAllQuery({ commit, state }) {
    //     // state.querys.splice(0, state.querys.length)
    //     commit('DELETE_ALL_QUERY_DATA')
    // }
  }
}
