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

const isFullscreenEnabled = () => {
    // 懒得管兼容性了
    return document.fullscreenEnabled
}

exports.extend = extend
exports.isFullscreenEnabled = isFullscreenEnabled