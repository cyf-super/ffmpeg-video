
# 实现视频点播

将视频转化为m3u8格式的文件，请求m3u8文件可以实现快速播放、点播等

> *m3u8为一种UTF-8编码的播放列表文件，存储了视频片段的相关信息*  

需要借助特殊的播放器才能进行播放，如[plyr播放器](https://github.com/sampotts/plyr)




## Features

- 支持上传视频
- mp4视频转化为m3u8的格式
- plyr实现视频的点播


后端：[koa](https://github.com/koajs/koa) + [FFmpeg](https://ffmpeg.org/)  
前端：[plyr-react](https://github.com/chintan9/plyr-react) + [hls.js](https://github.com/video-dev/hls.js)
## Demo
![demo](./demo.gif)
## Installation

Install my-project with pnpm  

前端：

```bash
1. cd client
2. pnpm i
3. pnpm dev
```

后端：
```bash
1. cd server
2. pnpm i
3. nodemon app.js
```
> **需要先安装[FFmpeg](https://ffmpeg.org/)**