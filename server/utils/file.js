const fs = require('fs')
const path = require('path')
const util = require('util')

const readdirPromise = util.promisify(fs.readdir)

const getFilePath = async () => {
  try {
    const ffmpegDir = path.join(__dirname, '../uploadFiles/ffmpeg')
    const dirs = await readdirPromise(ffmpegDir)
    const files = dirs.map((dir, index) => ({
      id: index + 1,
      path: '/ffmpeg/' + dir + '/index.m3u8',
      originPath: '/video/' + dir + '.mp4'
    }))

    return files
  } catch (error) {
    return []
  }
}

const exitPath = (path) => {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false)
        }
        return
      }
      if (stats.isDirectory()) {
        resolve(true)
      }
    });
  })
}

module.exports = {
  exitPath,
  getFilePath
}