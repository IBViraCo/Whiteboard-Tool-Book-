import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { SaveFile, CancelFile, SaveFileTitle, FileRenameInput, SubmitFileRename } from "./style"
import React from "react";

export default ({blob, isShowModal, setIsShowModal}) => {
    const inputRef = React.useRef();

    const download = (fileName) => {

         if(!blob) return;

        const downloadLink    = document.createElement('a');
        downloadLink.href     = URL.createObjectURL(blob);
        downloadLink.download = `${fileName}.webm`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        //clear from memory 
        URL.revokeObjectURL(blob);

        //remove element
        document.body.removeChild(downloadLink);

        //close
        setIsShowModal(false);

    }

    const handleSubmitRenameFile = (e) => {
        e.preventDefault();

        if(!blob) return;

        let fileName = inputRef.current.value;
        
        if( !fileName || fileName === '' ) fileName = `ویدیو آموزشی تاریخ: ` + new Date().toLocaleDateString('fa');

        download(fileName)

    }

    if(!blob || !isShowModal ) return '';

    return (
        <SaveFile className="scale-zero-hide position-absolute p-4">
            <div className="row">
                <div className="col-12 d-flex justify-content-end align-items-center">
                    <CancelFile className="pointer p2" onClick={() => { setIsShowModal(false) }}>
                        <FontAwesomeIcon icon={faTrash} />
                    </CancelFile>
                </div>
                <SaveFileTitle className="col-12 pb-2">
                    <h4 className="text-dark">نام فایل تدریس خود را انتخاب کنید</h4>
                </SaveFileTitle>
                <form className="col-12 d-flex " onSubmit={handleSubmitRenameFile}>
                    <FileRenameInput 
                        id="file-rename-input" 
                        type="text" 
                        ref={inputRef}
                        className="file-rename form-control ml-3" 
                        placeholder="...نام فایل را وارد کنید"
                        />
                    <SubmitFileRename 
                        type="submit" 
                        className="save-file btn"
                        >
                        ذخیره
                    </SubmitFileRename>    
                </form>
            </div>
        </SaveFile>
    )
}