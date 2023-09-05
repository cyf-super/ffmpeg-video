const router = require('koa-router')()
const multer = require('@koa/multer')
const fs = require('fs')
const path = require('path')
const util = require('util');
const transform = require('../utils/transform')
const { exitPath, getFilePath } = require('../utils/file')

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

const upload = multer()
router.post('/upload/file', upload.single('file'), async (ctx) => {
  const { originalname, buffer } = ctx.file
  try {
    const fileName = Date.now() + '_' + originalname
    const filePath = path.join(__dirname, '../uploadFiles/video/' + fileName)
    await writeFilePromise(filePath, buffer)

    const src = await transform(fileName)
    console.log("file: index.js:35  router.post  src:", src)
    let files = []
    if (src) {
      files = await getFilePath()
    }
    ctx.body = files
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error)
  }
})


router.get('/files', async (ctx) => {
  ctx.body = await getFilePath()
})

module.exports = router