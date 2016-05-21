// 拼图布局
import './puzzle.scss'
import Album from '../albumInterfaces/album'

class Puzzle extends Album {
    constructor(imageDoms, containerDom) {
        super()
        this.originContainerDom = containerDom
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
    
    _generaterDomString() {
        let _domStr = ''
        let images = this.originContainerDom.querySelectorAll('img')
        
        for (let index in images) {
            if (images.hasOwnProperty(index)) {
                _domStr += '<div class="item">'
                _domStr += images[index].parentNode.innerHTML
                _domStr += '</div>'
            }
        }
        return _domStr
    }

    append(image) {
        let fragment = document.createDocumentFragment()
        let item = document.createElement('div')
        item.classList.add('item')
        item.appendChild(image)
        fragment.appendChild(item)
        this.originContainerDom.appendChild(fragment)
        
        // 用来重置宽高的
        this.resetImagesSize(this.rememberOriginImgSize(), 'all')
    }
    
    _resetDomHtml() {
        let domStr = this._generaterDomString()
        this.originContainerDom.innerHTML = domStr
    }

    render() {
        this.originContainerDom.classList.add('puzzle--album')
        let originSize = this.rememberOriginImgSize()
        this._resetDomHtml()
        this.resetImagesSize(originSize, 'all')
    }
    
    destroy() {
        this.originContainerDom.classList.remove('puzzle--album')
    }
}

export default Puzzle