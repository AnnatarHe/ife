// 拼图布局
import './puzzle.scss'
import Album from '../albumInterfaces/album'

class Puzzle extends Album {
    constructor(imageDoms, containerDom) {
        super()
        this.orginContainerDom = containerDom
        this.init(imageDoms)
    }

    /**
     * 获取图片，而不是图片父元素
     * @param imageDoms
     * @private
     */
    _getImgsDom(imageDoms) {
        let images = []

        for (let index in imageDoms) {
            if (imageDoms.hasOwnProperty(index)) {
                images.push(imageDoms[index].querySelector('img'))
            }
        }

        this.images = images
    }

    init(imageDoms) {
        this.imageDoms = imageDoms
        this._getImgsDom(this.imageDoms)
        this.render()
    }

    getMaxWidth() {
        this.images.sort((prev, current) => {
            return parseInt(prev.getBoundingClientRect().width) - parseInt(current.getBoundingClientRect().width) > 0 ? 0 : 1
        })
        let width = this.images[0].getBoundingClientRect().width
        this.images.sort((prev, current) => {
            return parseInt(prev.getBoundingClientRect().height) - parseInt(current.getBoundingClientRect().height) > 0 ? 0 : 1
        })
        let height = this.images[0].getBoundingClientRect().height
        return {
            width,
            height
        }
    }
    
    _generaterDomString() {
        let _domStr = ''
        for (let item of this.images) {
            _domStr += '<div class="item">'
            _domStr += item.parentNode.innerHTML
            _domStr += '</div>'
        }
        return _domStr
    }

    append(image) {
        throw new Error('please implement append method')
    }
    
    _resetDomHtml() {
        let domStr = this._generaterDomString()
        this.orginContainerDom.innerHTML = domStr
    }

    /**
     * TODO:
     * 再次生成的时候会造成图片宽高强制设定成0.。。。我的锅
     */
    render() {
        this.orginContainerDom.classList.add('puzzle--album')
        this._resetDomHtml()
        let rect = this.getMaxWidth()
        // 为每一个图片强制设置宽度高度，铺满画布
        for (let index in this.imageDoms) {
            if (this.imageDoms.hasOwnProperty(index)) {
                let currentDom = this.imageDoms[index]
                currentDom.querySelector('img').style.height = rect.height + 'px'
                currentDom.querySelector('img').style.width = rect.width + 'px'
            }
        }
    }
    
    destroy() {
        this.orginContainerDom.classList.remove('puzzle--album')
    }
}

export default Puzzle