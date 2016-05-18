// 拼图布局
import './puzzle.scss'
import Album from '../albumInterfaces/album'

class Puzzle extends Album {
    constructor(imageDoms) {
        super()
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
        imageDoms[0].parentNode.classList.add('puzzle--album')
        this._getImgsDom(imageDoms)
        let rect = this.getMaxWidth()
        // 为每一个图片强制设置宽度高度，铺满画布
        for (let index in imageDoms) {
            if (imageDoms.hasOwnProperty(index)) {
                let currentDom = imageDoms[index]
                currentDom.querySelector('img').style.height = rect.height + 'px'
                currentDom.querySelector('img').style.width = rect.width + 'px'
            }
        }
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

    append(image) {
        throw new Error('please implement append method')
    }

    render() {
        console.log('just render this dom')
    }
}

export default Puzzle