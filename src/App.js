import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import MinioHeader from './component/MinioHeader';
import FileContainer from './component/FileContainer';
import AWS from 'aws-sdk';
import ErrorContainer from './component/errormonitoring/ErrorContainer';

const s3 = new AWS.S3({
  endpoint: "http://localhost:9000",
  port: "9000",
  accessKeyId: "minio",
  secretAccessKey: "miniostorage",
  signatureVersion: "v4",
  s3ForcePathStyle:  true,
})

function App() {
  return (
    <div className="App container vh-100">
      <MinioHeader />
      <FileContainer s3={s3}/>
      <ErrorContainer />
    </div>
  );
}

export default App;
