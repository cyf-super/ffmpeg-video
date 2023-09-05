import { useCallback, useState } from 'react';
import axios from 'axios';

export interface FileType {
  path: string;
  id: number;
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
      const formData = new FormData();
      formData.append('file', file);

      const data = await axios.post('/api/upload', formData);
      await fetchFiles();
    });
  };

  return {
    uploadFile,
    fetchFiles,
    fileQueue
  };
};
