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
    
    _getDivFragment(img) {
        let item = document.createElement('div')
        item.classList.add('item')
        item.appendChild(img)
        return item
    }
    
    _getBarrelFragment() {
        let barrelItem = document.createElement('div')
        barrelItem.classList.add('barrel--item')
        return barrelItem
    }

    append(image) {

        let barrels = this.originContainerDom.querySelectorAll('.barrel--item')
        let lastBarrel = barrels[barrels.length - 1]

        let lastBarrelItemLength = lastBarrel.querySelectorAll('.item').length
        console.log(barrels)
        console.log(lastBarrelItemLength)
        if (lastBarrelItemLength < this.options.barrelBinMin) {
            let item = this._getDivFragment(image)
            lastBarrel.appendChild(item)
        }else {
            let barrelFragment = this._getBarrelFragment()
            let item = this._getDivFragment(image)
            barrelFragment.appendChild(item)
            this.originContainerDom.appendChild(barrelFragment)
        }
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
        let totalWidth = this.originContainerDom.getBoundingClientRect().width
        let perWidth = Math.ceil(totalWidth / this.options.barrelBinMin)
        
        let imgs = this.originContainerDom.querySelectorAll('img')
        
        for (let index in imgs) {
            if (imgs.hasOwnProperty(index)) {
                imgs[index].style.width = perWidth + 'px'
            }
        }
    }

    render() {
        this.originContainerDom.classList.add('barrel--album')
        this.originContainerDom.innerHTML = this.parseDom()
        this._changeImgSize()
    }

    destroy() {
        this.originContainerDom.classList.remove('barrel--album')
    }
}

export default Barrel
