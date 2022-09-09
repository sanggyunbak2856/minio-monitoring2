import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import NormalFileMonitoring from "./filemonitoring/NormalFileMonitoring";
import ErrorFileMonitoring from "./filemonitoring/ErrorFileMonitoring";

const FileContainer = ({normalFileList, errorFileList}) => {
    
    return (
        <div className="container h-50 border bg-light">
            <div className="row h-100">
                <NormalFileMonitoring normalFileList={normalFileList}/>
                <ErrorFileMonitoring errorFileList={errorFileList}/>
            </div>
        </div>
    );
}

export default FileContainer;


