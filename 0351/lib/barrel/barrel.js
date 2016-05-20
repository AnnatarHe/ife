// 木桶布局
import './barrel.scss'
import Album from '../albumInterfaces/album'

class Barrel extends Album {

    constructor(imageDoms, containerDom, options = {}) {
        super()
        this.orginImageDoms = imageDoms
        this.orginContainerDom = containerDom
        this.orginContainerDom.classList.add('barrel--album')
        this._transDOM2Array()

        this.options = {

            barrelHeight: options.barrelHeight || 200, // 木桶模式的高度
            barrelBinMin: options.barrelBinMin || 3, // 木桶模式每行图片数量下限
            barrelBinMax: options.barrelBinMax || 10
        }

        this.init(imageDoms)
    }
    
    _transDOM2Array() {
        let dom = []
        for ( let index in this.orginImageDoms) {
            if (this.orginImageDoms.hasOwnProperty(index)) {
                dom.push(this.orginImageDoms[index])
            }
        }
        this.imageDoms = dom
    }

    init(imageDoms) {
        let width = this.orginContainerDom.getBoundingClientRect().width
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
        while (this.imageDoms.length > 0) {

            parsedOneLineHtml += '<div class="barrel--item">'
            while (index < this.options.barrelBinMin && this.imageDoms.length > 0) {
                parsedOneLineHtml += '<div class="item">'
                parsedOneLineHtml += this.imageDoms.shift().innerHTML.trim()
                parsedOneLineHtml += '</div>'

                index++
            }
            parsedOneLineHtml += '</div>'
            index = 0
        }
        return parsedOneLineHtml
    }

    _changeImgSize() {
        for (let index in this.orginImageDoms) {
            if (this.orginImageDoms.hasOwnProperty(index)) {
                let img = this.orginImageDoms[index].querySelector('img')
                img.style.width = this.everyWidth + 'px'
                img.style.height = this.everyHeight + 'px'
            }
        }
    }

    render() {
        this.orginContainerDom.innerHTML = this.parseDom()
        this._changeImgSize()
    }

    destroy() {
        this.orginContainerDom.classList.remove('barrel--album')
    }
}

export default Barrel
