// main文件

import Barrel from './barrel/barrel'
import Puzzle from './puzzle/puzzle'
import Waterfall from './waterfall/waterfall'

class FelAlbum {
    constructor() {
        this.layout = {
            PUZZLE: 1, // 拼图布局
            WATERFALL: 2, // 瀑布布局
            BARREL: 3 // 木桶布局
        }
    }

    /**
     * 初始化并设置相册
     * @param {string} image  一张图片的URL
     * @param {object} option 配置项
     */
    setImage(image, option) {
        if (typeof image === 'string') {
            // 包装成数组
        }
    }

    /**
     * 获取相册所有图像的对应DOM元素
     * @return {[type]} [description]
     */
    getImageDomElements() {

    }

    /**
     * 向相册添加图片
     */
    addImage() {

    }

    /**
     * 移除相册图片
     * @param {HTMLElement} image 需要移除的图片
     * @return {boolean} 成功？
     */
    removeImage(image) {

    }

    /**
     * 设置相册布局
     * @param {number} layout 初始化定义的layout 的 number
     */
    setLayout(layout) {

    }

    /**
     * 获取布局
     * @return {number} 布局
     */
    getLayout() {

    }

    /**
     * 修改图片的间距
     * @param {[type]} x [description]
     * @param {[type]} y [description]
     */
    setGutter(x, y) {

    }

    /**
     * 点击图片的时候全屏浏览
     * @return {[type]} [description]
     */
    enableFullscreen() {

    }

    /**
     * 禁止全屏浏览
     * @return {[type]} [description]
     */
    disableFullscreen() {

    }

    /**
     * 设置木桶模式图片的上下限
     * @param {[type]} min [description]
     * @param {[type]} max [description]
     */
    setBarrelBin(min, max) {

    }

    /**
     * 获取木桶模式每行图片的下限
     * @return {[type]} [description]
     */
    getBarrelBinMin() {

    }

    /**
     * 设置木桶模式每行高的上下限
     */
    setBarrelHeight() {
    }

    /**
     * 获取木桶模式高度的上限
     * @return {[type]} [description]
     */
    getBarrelHeightMax() {

    }

    /**
     * 获取木桶模式每行高度的 下限
     * @return {[type]} [description]
     */
    getBarrelHeightMin() {

    }
}

export default FelAlbum