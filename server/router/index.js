const router = require('koa-router')()
const multer = require('@koa/multer')
const fs = require('fs')
const util = require('util');

const writeFilePromise = util.promisify(fs.writeFile);

const upload = multer()

router.post('/upload/file', upload.single('file'), async (ctx) => {
    console.log("ctx---> ", ctx.file)
    const { originalname, buffer } = ctx.file
    try {
      const path = '../uploadFiles/video' + originalname
      await writeFilePromise(path, buffer)

      
    } catch (error) {
      
    }
    ctx.body = ctx.file
})

module.exports = router