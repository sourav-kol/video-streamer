'use client'

import React, { useState } from "react";
import { handleFileUpload } from '../../service/file.service';

type Props = {
}

export default function UploadVideo() {
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const onUpload = () => {
        if (!file)
            return "Please select a file to be uplaoded!!!";

        handleFileUpload(file);
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button disabled={!file} onClick={onUpload}>
                Upload
            </button>
            <hr />
            <br />
            {/* {fileUrl && (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    View Uploaded File
                </a>
            )} */}
        </div >
    );
}
