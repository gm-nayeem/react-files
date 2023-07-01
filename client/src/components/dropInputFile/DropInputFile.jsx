import React, { useRef, useState } from 'react';
import './dropInputFile.css';

import { ImageConfig } from '../../config/ImageConfig';
import uploadImg from '../../assets/cloud-upload.png';
import downloadBtn from '../../assets/download-btn.png';

const DropInputFile = ({ handleFileChange }) => {
    const [files, setFiles] = useState([]);
    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    // handle multiple file
    const onFileDrop = (e) => {
        const newFile = e.target.files;

        if (newFile) {
            const updatedList = [...files, ...newFile];
            setFiles(updatedList);
            handleFileChange(updatedList);
        }
    }

    // remove file
    const fileRemove = (file) => {
        const updatedList = [...files];
        updatedList.splice(files.indexOf(file), 1);
        setFiles(updatedList);
        handleFileChange(updatedList);
    }

    // handle file download
    const handleDownload = (item) => {
        console.log(item)
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="dropInputFile"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="inputFile_label">
                    <img src={uploadImg} alt="upload image" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input
                    type="file" value=""
                    multiple
                    onChange={onFileDrop}
                />
            </div>
            {
                files.length > 0 ? (
                    <div className="inputFile_preview">
                        <p className="previewTitle">
                            Ready to upload
                        </p>
                        {
                            files.map((item, index) => (
                                <div key={index} className="previewItem">
                                    <div className="itemInfo">
                                        <img
                                            src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']}
                                            alt="file image"
                                        />
                                        <div className="info">
                                            <p>{item.name}</p>
                                            <p>{item.size}B</p>
                                        </div>
                                    </div>
                                    <div className="itemBtn">
                                        <img src={downloadBtn} alt=""
                                            className='downloadBtn'
                                            onClick={() => handleDownload(item)}
                                        />
                                        <span
                                            className="removeBtn"
                                            onClick={() => fileRemove(item)}
                                        >
                                            x
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}


export default DropInputFile;