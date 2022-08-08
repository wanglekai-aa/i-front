// 用户名的表单交验
export const validateUsername = (username) => {
  if (!username) return '用户名为必填项'
  if (username.length < 3 || username.length > 12) {
    return '用户名长度在 3~12 位之间'
  }
  return true
}

// 密码的交验
export const validatePassword = (password) => {
  if (!password) return '秘密为必填项'
  if (password.length < 6 || password.length > 12) {
    return '密码的长度为 6~12 位之间'
  }
  return true
}

// 确认密码的交验
export const validateConfirmPassword = (val, password) => {
  if (val !== password[0]) return '两次密码输入必须一致'
  return true
}
