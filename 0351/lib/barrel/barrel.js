// 木桶布局
import './barrel.scss'
import Album from '../albumInterfaces/album'

class Barrel extends Album {

    constructor(imageDoms, containerDom, options = {}) {
        super()
        this.originImageDoms = imageDoms
        this.originContainerDom = containerDom
        this.imageDoms = this._transDOM2Array(this.originImageDoms)

        this.options = {

            barrelHeight: options.barrelHeight || 200, // 木桶模式的高度
            barrelBinMin: options.barrelBinMin || 3, // 木桶模式每行图片数量下限
            barrelBinMax: options.barrelBinMax || 10
        }

        this.init(imageDoms)
    }
    
    _transDOM2Array(doms) {
        let dom = []
        for ( let index in doms) {
            if (doms.hasOwnProperty(index)) {
                dom.push(doms[index])
            }
        }
        return dom
    }

    init(imageDoms) {
        let width = this.originContainerDom.getBoundingClientRect().width
        this.everyWidth = width / this.options.barrelBinMin
        this.everyHeight = this.options.barrelHeight
        this.render()
    }

    append(image) {

    }

    /**
     * 重新生成DOM，要给个外边的barrel-item
     * @returns {string}
     */
    parseDom() {
        let index = 0
        let parsedOneLineHtml = ''
        let domsArr = this._transDOM2Array(this.originContainerDom.querySelectorAll('.item'))
        while (domsArr.length > 0) {

            parsedOneLineHtml += '<div class="barrel--item">'
            while (index < this.options.barrelBinMin && domsArr.length > 0) {
                parsedOneLineHtml += '<div class="item">'
                parsedOneLineHtml += domsArr.shift().innerHTML.trim()
                parsedOneLineHtml += '</div>'

                index++
            }
            parsedOneLineHtml += '</div>'
            index = 0
        }
        return parsedOneLineHtml
    }

    _changeImgSize() {
        for (let index in this.originImageDoms) {
            if (this.originImageDoms.hasOwnProperty(index)) {
                let img = this.originImageDoms[index].querySelector('img')
                img.style.width = this.everyWidth + 'px'
                img.style.height = this.everyHeight + 'px'
            }
        }
    }

    render() {
        this.originContainerDom.classList.add('barrel--album')
        let originSize = this.rememberOriginImgSize()
        this.originContainerDom.innerHTML = this.parseDom()
        this.resetImagesSize(originSize, 'height')
    }

    destroy() {
        this.originContainerDom.classList.remove('barrel--album')
    }
}

export default Barrel
