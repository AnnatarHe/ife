
/**
 * 模仿接口，要求必须实现的方法
 */
class AlbumInterface {

    /**
     * 追加
     * @return {[type]} [description]
     */
    append() {
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