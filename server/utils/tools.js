const fs = require('fs')

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
  exitPath
}