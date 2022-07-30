export default {
  namespaced: true,
  state: () => {
    return {
      histories: []
    }
  },
  mutations: {
    addHistory(state, newHistory) {
      /**
       * 新增历史记录:
       *    新增的记录位于数组头部
       *    不可出现重复记录
       */
      const isFindIndex = state.histories.findIndex((item) => {
        return item === newHistory
      })

      if (isFindIndex !== -1) {
        state.histories.splice(isFindIndex, 1)
      }
      state.histories.unshift(newHistory)
    },
    // 删除指定数据
    removeHistory(state, index) {
      state.histories.splice(index, 1)
    },
    removeAllHistory(state) {
      state.histories = []
    }
  }
}
