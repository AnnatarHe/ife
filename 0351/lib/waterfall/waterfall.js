// 瀑布流布局
import './waterfall.sass'
import Album from '../albumInterfaces/album'

/**
 * TODO:
 * 
 */
class Waterfall extends Album {
    constructor(doms, containerDom) {
        super()
        this.containerDom = containerDom
        this.init(doms)
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

    destroy() {
        throw  new Error('please implement destroy method')
    }
}

export default Waterfall