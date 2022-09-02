import React from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import NormalFileMonitoring from "./filemonitoring/NormalFileMonitoring";
import ErrorFileMonitoring from "./filemonitoring/ErrorFileMonitoring";

const FileContainer = ({s3}) => {
    const [normalFileList, setNormalFileList] = useState([]);
    const [errorFileList, setErrorFileList] = useState([]);

    const getFileList = async (bucket) => {
        try {
            const param = {
                Bucket: bucket
            }
            const res = await s3.listObjects(param).promise()
            bucket === "test1" ? setNormalFileList(res.Contents) : setErrorFileList(res.Contents)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getFileList("test1")
        getFileList("test2")
    }, [])

    return (
        <div className="container h-75 border bg-light">
            <div className="row h-100">
                <NormalFileMonitoring normalFileList={normalFileList}/>
                <ErrorFileMonitoring errorFileList={errorFileList}/>
            </div>
        </div>
    );
}

export default FileContainer;


