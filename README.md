# 视频点播 & 切片下载

将视频转化为 m3u8 格式的文件，请求 m3u8 文件可以实现快速播放、点播等

> _m3u8 为一种 UTF-8 编码的播放列表文件，存储了视频片段的相关信息_

需要借助特殊的播放器才能进行播放，如[plyr 播放器](https://github.com/sampotts/plyr)

## Features

- 支持上传视频
- mp4 视频转化为 m3u8 的格式
- plyr 实现视频的点播
- 支持切片下载视频文件

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
