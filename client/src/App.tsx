import { useState, useEffect } from 'react'
import { Table } from './components/table';
import { PlyrVideo } from './components/plyrVideo';
import { useUploadFile, FileType } from './hooks/useUpload';
import './App.css';

function App() {
  const [videoFile, setVideoFile] = useState<FileType>({})
  const { uploadFile, fetchFiles, fileQueue } = useUploadFile();

  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  return (
    <div className='container'>
      <div className='file'>
        <div className="upload">
          <button className="upload-btn">上传文件</button>
          <input type="file" onChange={uploadFile} />
        </div>

        <Table files={fileQueue} playFileVideo={setVideoFile} />
      </div>

      <div className='video'>
        <PlyrVideo videoFile={videoFile}></PlyrVideo>
      </div>
    </div>
  );
}

export default App;
