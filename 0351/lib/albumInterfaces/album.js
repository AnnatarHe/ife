/**
 * 模仿接口，要求必须实现的方法
 */
class AlbumInterface {

    /**
     * 初始化
     * @param  {images[]} imageDoms 图片的父dom
     * @return {}
     */
    init(imageDoms) {
        throw new Error('please implement init method')
    }

    /**
     * 追加
     * @param {HTMLElement} image 图片的父dom
     * @return {[type]} [description]
     */
    append(image) {
        throw new Error('please implement append method')
    }

    /**
     * 渲染方法
     * 一张图片，两张图片什么的不一样
     */
    render() {
        throw new Error('please implement render method')
    }


    /**
     * 用来给render之前获取到当前图片的大小，以便在render之后重置图片大小
     * @returns {Array}
     */
    rememberOriginImgSize() {
        let originSize = []
        let items = this.originContainerDom.querySelectorAll('.item')
        for (let index in items) {
            if (items.hasOwnProperty(index)) {
                let currentImg = items[index].querySelector('img').getBoundingClientRect()
                let h = currentImg.height
                let w = currentImg.width
                originSize.push({h, w})
            }
        }
        return originSize
    }

    /**
     *
     * @param sizes
     * @param same 'height', 'width', 'all'
     */
    resetImagesSize(sizes, same = 'height') {
        let items = this.originContainerDom.querySelectorAll('.item')

        if (same === 'height' || same === 'all') {

            // 按照高度排序
            sizes.sort((prev, current) => prev.h > current.h ? 0 : 1)
            // 设定高度
            this.setAllImage(items, sizes[0].h, 'height')
        }

        if (same === 'width' || same === 'all') {
            sizes.sort((prev, current) => prev.w > current.w ? 0 : 1)
            this.setAllImage(items, sizes[0].w, 'width')
        }
    }

    /**
     * @param size 多大
     * @param same 'height', 'width', 'all'
     */
    setAllImage(items, size, same = 'height') {
        for (let index in items) {
            if (items.hasOwnProperty(index)) {
                items[index].querySelector('img').style[same] = size + 'px'
            }
        }
    }

    destroy() {
        throw  new Error('please implement destroy method')
    }
}

export default AlbumInterface