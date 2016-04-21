'use strict';
const fs = require('fs')

let tasks = []

// fs.readdir('.', (err, files) => {
//     let dirs = files.filter(current => {
//         return current.indexOf('0') == 0
//     })
//     dirs.map(current => {
//         fs.readdir(__dirname + '/' + current, (err, fileAtDir) => {
            
//             fileAtDir.filter(current => {
                
//             })
//         })
//     })
// })

new Promise(function(resolve, reject) {
    fs.readdir('.', (err, files) => {
        if (err) {
            reject(err)
        }
        resolve(files)
    })
}).then(files => {
    let dirs = files.filter(current => {
        return current.indexOf('0') == 0
    })
    return dirs
}).then(dirs => {
    dirs.map(current => {
        // 这里不得已用了Sync的方法
        // 一会儿一定要问一下在循环中使用异步方法如何解决
        let fileAtDir = fs.readdirSync(__dirname + '/' + current)
        let path = fileAtDir.filter(current => current.indexOf('.htm') > 0)
        
        let task = {
            title: current,
            path: `./${current}/${path[0]}`
        }
        tasks.push(task)
    })
    return tasks
}).then(tasks => {
    let data = JSON.stringify(tasks)
    fs.writeFile('./resource.json', data, (err, success) => {
        if (err) {
            console.log('fuck !!! there are err' + err)
        }
        console.log('ok!')
    })
}).catch(err => console.log(err))