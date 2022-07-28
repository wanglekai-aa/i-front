// 从 itemElement 中抽离所有的 imgElements
export const getImgElements = (itemElements) => {
  const imgElements = []

  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

// 生成所有图片链接数组
export const getAllImg = (imgElements) => {
  // console.log('imgElements', imgElements)
  return imgElements.map((img) => {
    return img.src
  })
}

// 监听图片数组加载完成
export const onComplateImgs = (imgs) => {
  const promiseAll = []

  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        resolve({ img, index })
      }
      imgObj.onerror = () => {
        reject(new Error('图片加载异常！'))
      }
    })
  })
  return Promise.all(promiseAll)
}

// 返回列高对象 中的最大的高度
export const getMaxHeight = (columnHeightObj) => {
  return Math.max(...Object.values(columnHeightObj))
}

// 返回列高对象中最小的高度
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

// 返回列高对象中最小高度所在的列
export const getMinHeightColumn = (columnHeightObj) => {
  // console.log(columnHeightObj)
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}
