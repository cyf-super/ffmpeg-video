import './App.css';
import { Table } from './compoments/table';
import { useUploadFile } from './hooks/useUpload';

function App() {
  const { uploadFile } = useUploadFile();
  return (
    <>
      <div className="upload">
        <button className="upload-btn">上传文件</button>
        <input type="file" onChange={uploadFile} />
      </div>

      <Table />
    </>
  );
}

export default App;
