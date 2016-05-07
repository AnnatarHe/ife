// 入口文件
import './app.sass'

import Album from './main'

const $album = document.querySelector('.fel-album')
const album = new Album($album)


// 绑定事件，使得按钮可以修改样式
document.querySelector('#puzzle').addEventListener('click', () => {
    album.setLayout(1)
})

document.querySelector('#waterfall').addEventListener('click', () => {
    album.setLayout(2)
})

document.querySelector('#barrel').addEventListener('click', () => {
    album.setLayout(3)
})

document.querySelector('#fullscreen').addEventListener('click', () => {
    album.setLayout(4)
})