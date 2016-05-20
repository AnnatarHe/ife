// 瀑布流布局
import './waterfall.scss'
import Album from '../albumInterfaces/album'

/**
 * TODO:
 * 
 */
class Waterfall extends Album {
    constructor(doms, containerDom, line = 2) {
        super()
        this.originContainerDom = containerDom
        this.options = { line } // 需要几条瀑布？
        this.init()
    }
    
    init() {
        this.originImageDoms = this.originContainerDom.querySelectorAll('.item')
        this.imagesDom = this._images2Array(this.originImageDoms)
    }

    append(image) {
        throw new Error('please implement append method')
    }

    _images2Array(imageDoms) {
        let arr = []
        for (let index in imageDoms) {
            if (imageDoms.hasOwnProperty(index)) {
                arr.push(imageDoms[index])
            }
        }

        return arr
    }

    _generatDomStr() {
        let html = ''
        let i = 0
        // 每个瀑布有几个条目，首次渲染不判定了，直接截取吧
        let itemSize = Math.ceil(this.imagesDom.length / this.options.line)
        
        while(this.imagesDom.length > 0) {
            html += '<div class="waterfall--item">'
            while(i < itemSize && this.imagesDom.length > 0) {
                let lastDom = this.imagesDom.pop()
                console.log(lastDom)
                html += '<div class="item">'
                html += lastDom.innerHTML
                html += '</div>'
                i++
            }
            html += '</div>'
            i = 0
        }
        
        return html
    }
    
    _changeWidth() {
    }

    render() {
        let originSize = this.rememberOriginImgSize()
        this.originContainerDom.classList.add('waterfall--album')
        this.originContainerDom.innerHTML = this._generatDomStr()
        this.resetImagesSize(originSize, 'width')
    }
    

    destroy() {
        this.originContainerDom.classList.remove('waterfall-album')
    }
}

export default Waterfall