export default {
  categories: (state) => state.category.categories,
  themeType: (state) => state.theme.themeType,
  // 分类 选中项
  currentCategory: (state) => state.app.currentCategory,
  // 分类选中项的下标
  currentCategoryIndex: (state, getters) => {
    return getters.categories.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
  },
  // 搜索历史记录
  searchHistories: (state) => state.search.histories,
  // 搜索文本
  searchText: (state) => state.app.searchText
}
