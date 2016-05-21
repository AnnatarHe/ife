// 瀑布流布局
import './waterfall.scss'
import Album from '../albumInterfaces/album'

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
        let falls = this.originContainerDom.querySelectorAll('.waterfall--item')
        let map = []
        for (let index in falls) {
            if (falls.hasOwnProperty(index)) {
                let height = falls[index].getBoundingClientRect().height
                map.push({
                    index,
                    height
                })
            }
        }

        map.sort((prev, current) => prev.height >= current.height ? 1 : 0)
        this._appendAction(falls[map[0].index], image)
    }

    _appendAction(parent, node) {
        let item = document.createElement('div')
        item.classList.add('item')
        item.appendChild(node)
        parent.appendChild(item)
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

    render() {
        let originSize = this.rememberOriginImgSize()
        this.originContainerDom.classList.add('waterfall--album')
        this.originContainerDom.classList.add('clearfix')
        this.originContainerDom.innerHTML = this._generatDomStr()
        this.resetImagesSize(originSize, 'width')
    }
    

    destroy() {
        this.originContainerDom.classList.remove('waterfall--album')
        this.originContainerDom.classList.remove('clearfix')
    }
}

export default Waterfall