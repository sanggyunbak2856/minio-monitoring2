import React from "react";
import 'bootstrap/dist/css/bootstrap.css'

const ErrorFileMonitoring = ({errorFileList}) => {
    return (
            <div className="col h-100 p-1 d-flex flex-column">
                <div className="w-100 border p-2 mb-1">
                    Error File
                </div>
                <div className="h-100 border p-2 mb-1">
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
                                    errorFileList.map((item, key) => 
                                        <tr key={item.key + "_" + key}> 
                                            <td>{item.Key}</td>
                                            <td>{item.Size}</td>
                                            <td style={{fontSize: 14}}>{item.LastModified.toString()}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                    </table>
                </div>
            </div>
    );
}

export default ErrorFileMonitoring