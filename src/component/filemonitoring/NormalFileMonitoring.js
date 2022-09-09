import React from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import ContentModal from "../ContentModal";

const NormalFileMonitoring = ({normalFileList, s3}) => {

    const [showModal, setShowModal] = useState(false);
    const [clickedFileKey, setClickedFileKey] = useState("")
    const [clickedFileContent, setClickedFileContent] = useState("")

    const onClickFileHandler = (key) => {
        getFileContent(key)
        setClickedFileKey(key)
        setShowModal(true)
    }

    /**
     * 파일 내용 가져오기
     */

    const getFileContent = async (key) => {
        const param = {
            Bucket: 'test1',
            Key: key
        }
        try {
            const res = await s3.getObject(param).promise()
            const body = res.Body.toString()
            setClickedFileContent(body)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getFileContent(clickedFileKey)
    }, [clickedFileKey])

    /**
     * 파일 삭제하기
     */

    const deleteFile = async (key) => {
        const param = {
            Bucket: 'test1',
            Key: key
        }
        try {
            const res = await s3.deleteObject(param).promise()
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
            <div className="col h-100 p-1 d-flex flex-column">
                <div className="w-100 border p-2 mb-1">
                    Normal File
                </div>
                <div className=" h-100 border p-2 mb-1">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Size</th>
                                <th>Last Modified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                normalFileList.map((item, key) => 
                                    <tr key={item.key + "_" + key} onClick={()=>onClickFileHandler(item.Key)}> 
                                        <td>{item.Key}</td>
                                        <td>{item.Size}</td>
                                        <td style={{fontSize: 14}}>{item.LastModified.toString()}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <ContentModal 
                    showModal={showModal} 
                    fileKey={clickedFileKey} 
                    fileContent={clickedFileContent} 
                    setShowModal={setShowModal} 
                    deleteFile={deleteFile}
                />
            </div>
    );
}

export default NormalFileMonitoring