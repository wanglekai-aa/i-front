import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
// 处理 navigationBar 中的 category
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      categories: []
    }
  },
  mutations: {
    setCategories(state, newCategories) {
      state.categories = [ALL_CATEGORY_ITEM, ...newCategories]
    }
  },
  actions: {
    async useCategoriesData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategories', categorys)
    }
  }
}
