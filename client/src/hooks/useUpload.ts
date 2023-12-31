import { useCallback, useState } from 'react';
import axios from 'axios';

export interface FileType {
  id: number;
  path: string;
  originPath: string;
}

export const useUploadFile = () => {
  const [fileQueue, setFileQueue] = useState<FileType[] | []>([]);

  const fetchFiles = useCallback(async () => {
    const res = await axios.get('/api/files');
    if (res.data) {
      setFileQueue(res.data);
    }
  }, []);

  const uploadFile = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    [...files].forEach(async file => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const data = await axios.post('/api/file/upload', formData);
        if (data) {
          await fetchFiles();
        }
      } catch (error) {
        console.log("file: useUpload.ts:30  uploadFile  error:", error)
      }
    });
  };

  return {
    uploadFile,
    fetchFiles,
    fileQueue
  };
};
