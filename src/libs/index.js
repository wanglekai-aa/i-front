import { defineAsyncComponent } from 'vue'

export default {
  install(app) {
    // vite 通用组件自动化注册

    // 获取当前路径下所有文件夹中的 .vue 文件
    const components = import.meta.glob('./*/*.vue')
    // 遍历获取到的组件模块
    // console.log(components)
    for (const [key, value] of Object.entries(components)) {
      // 拼接组件注册的 name
      const componentName = 'm-' + key.replace('./', '').split('/')[0]

      // 通过 defineAsyncComponent 异步导入指定路径下的组件
      app.component(componentName, defineAsyncComponent(value))
    }
  }
}
