
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
}

export default AlbumInterface