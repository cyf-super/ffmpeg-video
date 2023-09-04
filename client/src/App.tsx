import { useUploadFile } from './hooks/useUpload'
import './App.css'

function App() {
  const { uploadFile } = useUploadFile()
  return (
    <>
      <input type="file" onChange={uploadFile} />
    </>
  )
}

export default App
