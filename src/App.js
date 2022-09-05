import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import MinioHeader from './component/MinioHeader';
import FileContainer from './component/FileContainer';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  endpoint: "http://localhost:19001",
  port: "19001",
  accessKeyId: "minio",
  secretAccessKey: "miniostorage",
  signatureVersion: "v4",
  s3ForcePathStyle:  true,
})

function App() {
  return (
    <div className="App">
      <MinioHeader />
      <FileContainer s3={s3}/>
    </div>
  );
}

export default App;
