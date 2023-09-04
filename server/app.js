const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const router = require('./router')

const app = new Koa()
app.use(koaStatic(path.join(__dirname, 'uploadFiles')))
app.use(router.routes(), router.allowedMethods())

app.listen(3000, () => {
  console.log('running...')
})
