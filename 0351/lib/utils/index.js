/**
 * 使用higher来覆盖默认配置用的
 * 没有进行深度遍历
 * @param  {Object} base   默认配置
 * @param  {Object} higher 用户配置
 * @return {Object}        没有修改base，而是创建一个中间变量来保持纯度
 */
const extend = (base, higher) => {
    if (base === undefined || higher === undefined) {
        return false
    }

    let _temp = JSON.parse(JSON.stringify(base))

    for (let index in higher) {
        if (higher.hasOwnProperty(index)) {
            _temp[index] = higher[index]
        }
    }
    return _temp
}

/**
 * 是否支持全屏
 * @return {Boolean} 
 */
const isFullscreenEnabled = () => {
    // 懒得管兼容性了
    return document.fullscreenEnabled
}

exports.extend = extend
exports.isFullscreenEnabled = isFullscreenEnabled