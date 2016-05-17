// 拼图布局
import './puzzle.scss'
import Album from '../albumInterfaces/album'

class Puzzle extends Album {
    constructor(imageDoms) {
        super()
        this.init(imageDoms)
    }
    init(imageDoms) {
        imageDoms[0].parentNode.classList.add('puzzle--album')
        
        let loadedImages = imageDoms.length
        
        // 为每一个图片强制设置宽度高度，铺满画布
        // for (let index in imageDoms) {
        //     if (imageDoms.hasOwnProperty(index)) {
        //         imageDoms[index].querySelector('img').onload = () => {
        //             loadedImages--
        //             if (loadedImages <= 0) {
        //                
        //             }
        //         }
        //         imageDoms[index].querySelector('img').style.height = imageDoms[index].getBoundingClientRect().height
        //         imageDoms[index].querySelector('img').style.width = imageDoms[index].getBoundingClientRect().width
        //     }
        // }
    }
    append(image) {
        throw new Error('please implement append method')
    }
    
    render() {
        console.log('just render this dom')
    }
}

export default Puzzle