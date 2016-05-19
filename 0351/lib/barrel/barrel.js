// 木桶布局
import './barrel.sass'
import Album from '../albumInterfaces/album'

class Barrel extends Album {
    
    constructor(imageDoms, options) {
        super()

        this.options = {

            barrelHeight: 16 || options.barrelHeight, // 木桶模式的高度
            barrelBinMin: 5 || options.barrelBinMin, // 木桶模式每行图片数量下限
            barrelBinMax: 10 || options.barrelBinMax
        }
    }
    
    init(imageDoms) {
        throw new Error('please implement init method')
    }

    append(image) {
        throw new Error('please implement append method')
    }

    render() {
        throw new Error('please implement render method')
    }

}

export default Barrel
