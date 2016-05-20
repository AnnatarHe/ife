// main文件

import Barrel from './barrel/barrel'
import Puzzle from './puzzle/puzzle'
import Waterfall from './waterfall/waterfall'
import Fullscreen from './fullscreen/fullscreen'

import { extend, isFullscreenEnabled } from './utils/index'

/**
 * PUZZLE:      1         拼图布局
 * WATERFALL:   2         瀑布布局
 * BARREL:      3         木桶布局
 * FULLSCREEN:  4         全屏模式
 */
class FelAlbum {
    constructor(containerDom, options) {
        
        this.orginContainerDom = containerDom

        this.getImageDomElements(containerDom)
        
        this._setInitOptions(options)

        this._setDefaultLayoutEngine()

    }

    /**
     * @private
     * @param {object} options 用户设置的值
     */
    _setInitOptions(options) {

        if (options && options.layout !== undefined) {
            this._checkLayout(options.layout)
        }

        let defaultOptions = {
            layout: 1, // 拼图布局是默认的
            gutterX: 16, // 图片间距 X 轴
            gutterY: 16, // 图片间距 Y 轴
            barrelHeight: 16, // 木桶模式的高度
            barrelBinMin: 5, // 木桶模式每行图片数量下限
            barrelBinMax: 10 // 木桶模式每行图片数量上限
        }

        if (options) {
            this.options = extend(defaultOptions, options)
        }else {
            this.options = defaultOptions
        }

    }

    /**
     * @private
     * 设置默认渲染引擎
     */
    _setDefaultLayoutEngine() {
        let rest = this.images.length
        
        // 当所有图片加载完成之后才能设置布局引擎
        for (let index in this.images) {
            if (this.images.hasOwnProperty(index)) {
                this.images[index].querySelector('img').onload = () => {
                    --rest
                    // 在所有图片加载完以后调用
                    if (rest <= 0) {
                        this._setLayoutEngineAction()
                    }
                }
            }
        }
    }

    /**
     * 设置布局引擎
     * 被上面的设置所调用
     * @private
     */
    _setLayoutEngineAction() {

        switch (this.options.layout) {
            case 2:
                this.layoutEngine = new Waterfall(this.images, this.orginContainerDom)
                break
            case 3:
                this.layoutEngine = new Barrel(this.images, this.orginContainerDom)
                break
            case 4:
                this.layoutEngine = new Fullscreen(this.images, this.orginContainerDom)
                break
            case 1:
                this.layoutEngine = null
            default:
                this.layoutEngine = new Puzzle(this.images, this.orginContainerDom)
                break
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
    getImageDomElements(containerDom) {
        this.images = containerDom.querySelectorAll('.item')
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
    
    resetLayout(layout) {
        this.layoutEngine.destroy()
        
        this.setLayout(layout)
    }

    /**
     * 设置相册布局
     * @param {number} layout 初始化定义的layout 的 number
     */
    setLayout(layout) {
        

        if (this._checkLayout(layout)) {
            this.options.layout = layout
            this._setLayoutEngineAction()
            // 触发重新渲染逻辑
            this.layoutEngine.render()
        }
    }

    /**
     * @private
     * 确认这个layout是不是合法值
     * @param  {number} layout layout 类型
     * @return {boolean} 成功或错误
     */
    _checkLayout(layout) {

        let _layout = ~~layout

        if (_layout < 1 || _layout > 4) {
            throw new Error(`
                please input number like this:
                1: puzzle layout
                2: waterfall layout
                3: barrel layout
                `)
        }

        return true

    }

    /**
     * 获取布局
     * @return {number} 布局
     */
    getLayout() {

        let layout = 0

        switch (this.options.layout) {
            case 1:
                layout = 'Puzzle layout'
                break
            case 2:
                layout = 'Waterfall layout'
                break
            case 3:
                layout = 'Barrel layout'
                break
            case 4:
                layout = 'Full screen layout'
                break
            default:
                throw new Error('unknow layout engine')
        }
        return layout
    }

    /**
     * 修改图片的间距
     * @param {[type]} x [description]
     * @param {[type]} y [description]
     */
    setGutter(x = 16, y = 16) {

        if (typeof x !== 'number' || typeof y !== 'number') {
            x = parseInt(x)
            y = parseInt(y)
        }

        this.options.gutterX = x
        this.options.gutterY = y

        this.layoutEngine.render()

    }

    /**
     * 点击图片的时候全屏浏览
     * @param {HTMLImgElement} ele 图片DOM
     * @return {[type]} [description]
     */
    enableFullscreen(ele) {
        if (isFullscreenEnabled()) {
            ele.requestFullscreen()
        }
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
    setBarrelBin(min = 5, max = 10) {
        // todo 检测
        this.options.barrelBinMin = min
        this.options.barrelBinMax = max
    }

    /**
     * 获取木桶模式每行图片的下限
     * @return {[type]} [description]
     */
    getBarrelBinMin() {
        return this.options.barrelBinMin
    }

    /**
     * 设置木桶模式每行高的上下限
     */
    setBarrelHeight() {
        return this.options.barrelHeight
    }

    /**
     * 获取木桶模式高度的上限
     * @return {[type]} [description]
     */
    getBarrelHeightMax() {
        return this.options.barrelHeight
    }

    /**
     * 获取木桶模式每行高度的 下限
     * @return {[type]} [description]
     */
    getBarrelHeightMin() {
        return this.options.barrelHeight
    }
}

export default FelAlbum