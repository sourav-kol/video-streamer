'use client'

import React, { useState } from "react";

type Props = {
    setFile: any,
    setFileUrl: any
}

export default function UploadVideo(props: Props) {
    const { setFile, setFileUrl } = props;

    const handleFileChange = (e:any) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button disabled={false} onClick={() => { }}>
                Upload
            </button>
            <hr />
            <br />
            {/* {fileUrl && (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    View Uploaded File
                </a>
            )} */}
        </div>
    );
}
