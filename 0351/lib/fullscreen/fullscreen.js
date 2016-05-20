// 全屏模式

import './fullscreen.sass'
import Album from '../albumInterfaces/album'

class Fullscreen extends Album {
    
    constructor(doms, containerDom) {
        super()
        this.addModalTo(document.body)
        this.init(containerDom)
    }

    init(containerDom) {
        let imgs = containerDom.querySelectorAll('img')
        this._bindEvent(imgs)
    }
    
    _bindEvent(imgs) {
        for (let index in imgs) {
            if (imgs.hasOwnProperty(index)) {
                imgs[index].addEventListener('click', e => {
                    this.removeLastImg()
                    this.setModal(e.target.src)
                })
            }
        }
    }
    
    removeLastImg() {
        let mask = document.querySelector('.mask')
        if (!mask) {
            return
        }
        let imgs = mask.querySelectorAll('img')
        
        for (let index in imgs) {
            if (imgs.hasOwnProperty(index)) {
                mask.removeChild(imgs[index])
            }
        }
    }
    
    addModalTo(dom) {
        let fragment = document.createDocumentFragment()
        
        let mask = document.createElement('div')
        mask.className = 'mask hidden'
        mask.addEventListener('click', e => {
            if (e.target.classList.contains('mask')) {
                mask.classList.add('hidden')
            }
        })
        this.mask = mask
        fragment.appendChild(mask)
        
        dom.appendChild(fragment)
    }

    setModal(src) {
        let mask = document.querySelector('.mask')
        mask.classList.remove('hidden')
        let img = new Image()
        img.src = src
        img.onload = function () {
            mask.appendChild(img)
        }
    }


    append(image) {
        // 不用处理
    }

    render() {
        // 不用处理
    }

    destroy() {
        // 不用处理
    }
}

export default Fullscreen