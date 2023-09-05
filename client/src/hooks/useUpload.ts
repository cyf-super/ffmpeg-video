import { useCallback, useState } from 'react'
import axios from 'axios'

export interface FileType {
  path: string
  id: number
}

export const useUploadFile = () => {
  const [fileQueue, setFileQueue] = useState<FileType[] | []>([])

  const fetchFiles = useCallback(async () => {
    const res = await axios.get('/api/files')
     console.log("file: useUpload.ts:9  fetchFiles  res:", res)
     if (res.data) {
      setFileQueue(res.data)
     }
  }, [])

  const uploadFile = (event: Event) => {
    const files = (event.target as HTMLInputElement).files
    if (!files) return 
    [...files].forEach(async file => {
      const formData = new FormData()
      formData.append('file', file)

      const data = await axios.post('/api/upload/file', formData)
      await fetchFiles()
      console.log("file: useUpload.ts:15  uploadFile  data:", data)
    });
  }

  return {
    uploadFile,
    fetchFiles,
    fileQueue
  }
}
