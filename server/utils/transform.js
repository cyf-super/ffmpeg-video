const { exec } = require('child_process')


module.exports = async function(path) {
  const createVideoTs = `ffmpeg -y -i "${path.join(__dirname, '..', 'uploadFiles', filePath)}" -vcodec copy -acodec copy -vbsf h264_mp4toannexb "${currentM3u8}.ts"`;

  const createM3u8 = `ffmpeg -i "${currentM3u8}.ts" -c copy -map 0 -f segment -segment_list "${dirtName}\\index.m3u8" -segment_time 10 "${currentM3u8}-%04d.ts"`

  const m3u8 = `/ffmpeg/${fileName}/index.m3u8`  
}
