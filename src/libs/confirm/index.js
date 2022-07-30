import confirmIndex from './confirmIndex.vue'
import { h, render } from 'vue'

/**
 *
 * @param {*} title 标题
 * @param {*} content 文本
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 * @returns
 */
export const mConfirm = (
  title,
  content,
  cancelText = '取消',
  confirmText = '确定'
) => {
  return new Promise((resolve, reject) => {
    // 允许只传递 content
    if (title && !content) {
      content = title
      title = ''
    }

    // 关闭弹层事件
    const close = () => {
      render(null, document.body)
    }

    // 取消按钮事件
    const cancelHandler = () => {
      reject(new Error('取消按钮点击'))
    }

    // 确定按钮事件
    const confirmHandler = () => {
      resolve()
    }
    // 利用 h 函数生成 vnode，并利用 render 函数进行渲染：
    // 1. vnode
    const vnode = h(confirmIndex, {
      title,
      content,
      cancelText,
      confirmText,
      confirmHandler,
      cancelHandler,
      close
    })
    // 2. render
    render(vnode, document.body)
  })
}
