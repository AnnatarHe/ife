## IFE task 0351

[任务五十一：多功能相册](http://ife.baidu.com/task/detail?taskId=51)

## dev

开发模式

```bash
npm run dev
```

然后打开 `localhost:8080/dist`

## dirs

分别是三个模式：[木桶模式](http://ife.baidu.com/task/detail?taskId=45), [瀑布布局](http://ife.baidu.com/task/detail?taskId=44), [拼图布局](http://ife.baidu.com/task/detail?taskId=43)

分别在各自的文件夹中：

拼图布局 => puzzle

瀑布布局 => waterfall

木桶布局 => barrel

继承于 album ，必须要实现其中的方法(就是Interface)

各个模式自行写各自的样式文件，同样地样式对`styles`目录可以进行调整

整个相册库是`main.js`为入口。`app.js`是调用的(应该写测试的)

## deploy

```bash
npm run build
```

然后对文件做些调整放入到`gh-pages`分支