// 入口文件
import './app.sass'

import Album from './main'


const $album = document.querySelector('.fel-album')

const album = new Album($album)

document.querySelector('#puzzle').addEventListener('click', () => {
    album.setLayout(1)
})

document.querySelector('#waterfall').addEventListener('click', () => {
    album.setLayout(2)
})

document.querySelector('#barrel').addEventListener('click', () => {
    album.setLayout(3)
})