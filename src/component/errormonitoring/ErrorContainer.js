import React from "react"

const ErrorContainer = ({errorCount, deleteObjects, getFileList}) => {
    const onClickBtnHandler = () => {
        deleteObjects()
        getFileList('test2')
    }

    return(
        <div className="container h-25 border bg-light">
            <div className="col h-100 p-1 d-flex flex-column">
                <div className="w-100 border p-2 mb-1">
                    Errors
                </div>
                <div className="h-100 border p-2">
                    <p className="text-center fs-3">현재 에러의 수는 <span className="fw-bold text-red">{errorCount}개</span> 입니다.</p>
                    <button type="button" className="btn btn-secondary mt-2" onClick={() => onClickBtnHandler()}>전체 삭제</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorContainer