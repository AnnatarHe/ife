// 入口文件
import './app.sass'

import Album from './main'


const $album = document.querySelector('.fel-album')

const album = new Album($album)

album.setLayout(1)