const fs = require('fs')
const path = require('path')
const util = require('util');
const { exec } = require('child_process')

const mkdirPromise = util.promisify(fs.mkdir);

module.exports = async function (fileName) {
  const fileDir = fileName.split('.').slice(0, -1).join('.')

  const dir = path.join(__dirname, '../uploadFiles/ffmpeg', fileDir)
  await mkdirPromise(dir)

  const createVideoTs = `ffmpeg -y -i "${path.join(__dirname, '..', 'uploadFiles/video', fileName)}" -vcodec copy -acodec copy -vbsf h264_mp4toannexb "${dir}\\index.ts"`;

  const createM3u8 = `ffmpeg -i "${dir}\\index.ts" -c copy -map 0 -f segment -segment_list "${dir}\\index.m3u8" -segment_time 10 "${dir}\\${fileDir}-%04d.ts"`

  const m3u8 = `/ffmpeg/${fileDir}/index.m3u8`

  try {
    await executeCommand(createVideoTs)
    await executeCommand(createM3u8)

    return m3u8
  } catch (err) {
    console.log("🚀 ~ err:", err)
  }
}

async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}
