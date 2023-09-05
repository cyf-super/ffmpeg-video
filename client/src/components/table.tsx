import {  FileType } from '../hooks/useUpload'

interface TablePropsType {
  files: FileType[]
  playFileVideo: (file: FileType) => void
}

export function Table({ files, playFileVideo }: TablePropsType) {
  const handleFile = (e: Event) => {
    const id = (e.target as HTMLInputElement).getAttribute('data-id')
    if (!id) return

    playFileVideo(files[+id - 1])
  }
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>路径</th>
        </tr>
      </thead>
      <tbody onClick={handleFile}>
        {files.map(file => (
          <tr key={file.id}>
            <td>{file.id}</td>
            <td data-id={file.id}>{file.path}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
