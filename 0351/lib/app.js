// 入口文件
import './app.scss'

import Album from './main'

const $album = document.querySelector('.fel-album')
const album = new Album($album)
album.setLayout(3)


// 绑定事件，使得按钮可以修改样式
document.querySelector('#puzzle').addEventListener('click', () => {
    album.resetLayout(1)
})

document.querySelector('#waterfall').addEventListener('click', () => {
    album.resetLayout(2)
})

document.querySelector('#barrel').addEventListener('click', () => {
    album.resetLayout(3)
})

document.querySelector('#fullscreen').addEventListener('click', () => {
    album.resetLayout(4)
})