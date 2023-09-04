import { useState, ChangeEventHandler } from 'react'
import axios from 'axios'

export const useUploadFile = () => {
  const [fileQueue, setFileQueue] = useState([])

  const uploadFile = (event: Event) => {
    const files = (event.target as HTMLInputElement).files
    if (!files) return 
    [...files].forEach(async file => {
      const formData = new FormData()
      formData.append('file', file)

      const data = await axios.post('/api/upload/file', formData)
      console.log("file: useUpload.ts:15  uploadFile  data:", data)
    });
  }

  return {
    uploadFile,
    fileQueue
  }
}
