const router = require('koa-router')()
const multer = require('@koa/multer')
const fs = require('fs')
const path = require('path')
const util = require('util');
const transform = require('../utils/transform')
const { exitPath, getFilePath } = require('../utils/file')
const { gerRange } = require('../utils/tools')

const writeFilePromise = util.promisify(fs.writeFile);
const mkdirPromise = util.promisify(fs.mkdir);

const videoDir = path.join(__dirname, '../uploadFiles/video')
const ffmpegDir = path.join(__dirname, '../uploadFiles/ffmpeg')
exitPath(videoDir).then(async (res) => {
  if (!res) {
    await mkdirPromise(videoDir)
  }
})

exitPath(ffmpegDir).then(async (res) => {
  if (!res) {
    await mkdirPromise(ffmpegDir)
  }
})

/**
 * 上传文件
 */
const upload = multer()
router.post('/file/upload', upload.single('file'), async (ctx) => {
  const { originalname, buffer } = ctx.file
  try {
    const fileName = Date.now() + '_' + originalname
    const filePath = path.join(__dirname, '../uploadFiles/video/' + fileName)
    await writeFilePromise(filePath, buffer)

    const src = await transform(fileName)
    let files = []
    if (src) {
      files = await getFilePath()
    }
    ctx.body = files
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error)
  }
})


/**
 * 获取文件
 */
router.get('/files', async (ctx) => {
  ctx.body = await getFilePath()
})


/**
 * 获取文件大小
 */
router.head('/file/size', async (ctx) => {
  const { originPath } = ctx.query
  const filePath = path.join(__dirname, '../uploadFiles', originPath)
  const { size } = fs.statSync(filePath)

  ctx.set('Content-Length', size)
  ctx.status = 200
})


/**
 * 下载文件
 */
router.get('/file/download', async (ctx) => {
  const { originPath } = ctx.query
  const filePath = path.join(__dirname, '../uploadFiles', originPath)

  const { size } = fs.statSync(filePath)

  const range = ctx.headers.range

  if (!range) {
    ctx.set('Accept-Range', 'bytes')
    ctx.body = fs.createReadStream(filePath);
    return
  }

  const [start, end] = gerRange(range)

  if (start > size || end > size) {
    ctx.status = 416
    ctx.body = ''
    return
  }

  ctx.set('Accept-Ranges', 'bytes')
  ctx.set('Content-Range', `bytes ${start}-${end}/${size}`)
  ctx.status = 206

  ctx.body = fs.createReadStream(filePath, { start, end })
})

module.exports = router