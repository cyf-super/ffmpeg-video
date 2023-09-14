import {  FileType } from '../hooks/useUpload'

interface TablePropsType {
  files: FileType[]
  playFileVideo: (file: FileType) => void
  downloadFile: (path: string) => void
}

export function Table({ files, playFileVideo, downloadFile }: TablePropsType) {
  const handleFile = (e: Event) => {
    const playId = (e.target as HTMLInputElement).getAttribute('play-id')
    if (playId) {
      playFileVideo(files[+playId - 1])
    }

    const downloadId = (e.target as HTMLInputElement).getAttribute('download-id')
    if (downloadId) {
      downloadFile(files[+downloadId - 1].originPath)
    }


  }
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>路径</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody onClick={handleFile}>
        {files.map(file => (
          <tr key={file.id}>
            <td>{file.id}</td>
            <td play-id={file.id}>{file.path}</td>
            <td download-id={file.id}>下载</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
