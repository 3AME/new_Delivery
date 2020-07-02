// import { set, get } from 'lodash'
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
    addQuery ({ commit, state, dispatch }, queryValue) { // problem, name, time
      console.log('addQuery')

      // let fmt = 'yyyy-MM-dd HH-mm-ss'
      // let date = new Date()

      // var o = {
      //   'M+': date.getMonth() + 1, // 月份
      //   'd+': date.getDate(), // 日
      //   'H+': date.getHours(), // 小时
      //   'm+': date.getMinutes(), // 分
      //   's+': date.getSeconds(), // 秒
      //   'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      //   'S': date.getMilliseconds() // 毫秒
      // }
      // if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      // for (var k in o) {
      //   if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      // }

      // var time = fmt
      // console.log('time=' + time)

      var query = {
        title: queryValue.name,
        problem: queryValue.problem,
        time: queryValue.time
      }
      commit('ADD_QUERY_DATA', query)
      dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'query.history',
        value: state.querys,
        user: true
      }, { root: true })
    },
    async historyLoad ({ state, commit, dispatch }) {
      // store 赋值
      const value = await dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'query.history',
        defaultValue: [],
        user: true
      }, { root: true })
      state.querys = value
      console.log('historyLoad value=' + JSON.stringify(value))
    }
  }
}
