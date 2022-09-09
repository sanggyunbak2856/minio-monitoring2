import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import MinioHeader from './component/MinioHeader';
import FileContainer from './component/FileContainer';
import AWS from 'aws-sdk';
import ErrorContainer from './component/errormonitoring/ErrorContainer';
import React from 'react'
import {useState, useEffect} from 'react'
import useDidMountEffect from './hook/UseDidMountEffect';

const s3 = new AWS.S3({
  endpoint: "http://localhost:9000",
  port: "9000",
  accessKeyId: "minio",
  secretAccessKey: "miniostorage",
  signatureVersion: "v4",
  s3ForcePathStyle:  true,
})

function App() {

  const [normalFileList, setNormalFileList] = useState([]);
  const [errorFileList, setErrorFileList] = useState([]);
  const [errorCount, setErrorCount] = useState(0);

  /**
   * 
   * 파일 목록 가져오기
   */
  const getFileList = async (bucket) => {
      try {
          const param = {
              Bucket: bucket,
          }
          const res = await s3.listObjects(param).promise()
          bucket === "test1" ? setNormalFileList(res.Contents) : setErrorFileList(res.Contents)
      }
      catch (err) {
          console.log(err)
      }
  }

  const getFiles = () => {
    getFileList("test1")
    getFileList("test2")
  }

  useEffect(() => {
    const timer = setInterval(() => getFiles(),  500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    errorFileList.length !== errorCount && setErrorCount(errorFileList.length)
  }, [errorFileList])

  /**
   * errorcount의 개수가 변하면 알람을 띄운다
   */
  useDidMountEffect(() => {
    errorCount !== 0 && alert(`현재 ${errorCount}개의 오류가 있습니다.`)
  }, [errorCount])

  /**
   * 오브젝트 전체 삭제
   */
  
  const deleteObjects = async () => {
    try {
      const params = {
        Bucket: 'test2',
        Delete: {
          Objects: errorFileList.map(file => {
            let newKey = {}
            newKey['Key'] = file.Key
            return newKey
          })
        }
      }
      const res = await s3.deleteObjects(params, (err, data) => console.log(data))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App container vh-100">
      <MinioHeader />
      <FileContainer normalFileList={normalFileList} errorFileList={errorFileList}/>
      <ErrorContainer errorCount={errorCount} deleteObjects={deleteObjects} getFileList={getFileList}/>
    </div>
  );
}

export default App;
