import axios from 'axios';
const UNIT = 1024 * 1024 * 10;

export const useDownloadFile = () => {
  const downloadFile = async (path: string) => {
    try {
      console.time('范围请求时间：');
      const size = await fetchFileSize(path);
      if (!size) return alert('下载失败');

      const sizeQueue = getFileSlice(+size.headers['content-length']);

      const peomiseQueue = sizeQueue.map(item => {
        const [start, end] = item;
        return fetchFileBlob(path, start, end);
      });

      Promise.all(peomiseQueue)
        .then(res => {
          const blob = new Blob(res, { type: 'video/mp4' });
          const href = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.download = path.split('/').pop() as string;
          a.href = href;
          a.click();
          URL.revokeObjectURL(blob);
          console.timeEnd('范围请求时间：');
        })
        .catch(err => {
          console.log('🚀 ~ Promise.all ~ err:', err);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return {
    downloadFile
  };
};

/**
 * 获取文件大小
 * @param path
 * @returns
 */
async function fetchFileSize(path: string) {
  try {
    const size = await axios.head('/api/file/size', {
      params: {
        originPath: path
      }
    });

    return size;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 请求分片文件的blob
 * @param path
 * @param start
 * @param end
 * @returns
 */
async function fetchFileBlob(
  path: string,
  start: number,
  end: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/file/download', {
        params: {
          originPath: path
        },
        headers: {
          range: `bytes=${start}-${end}`,
          accept: 'application/octet-stream'
        },
        responseType: 'blob'
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
        console.log('🚀 ~ returnnewPromise ~ err:', err);
      });
  });
}

/**
 * 获取文件range范围
 * @param length
 * @returns
 */
function getFileSlice(length: number) {
  const num = Math.ceil(length / UNIT);
  const res = Array.from({ length: num }).map((_, index) => {
    const end = (index + 1) * UNIT - 1;
    return [index * UNIT, Math.min(end, length)];
  });

  return res;
}
