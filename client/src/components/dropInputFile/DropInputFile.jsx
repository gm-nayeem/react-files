import React, { useEffect, useRef, useState } from 'react';
import './dropInputFile.css';

import { ImageConfig } from '../../config/ImageConfig';
import uploadImg from '../../assets/cloud-upload.png';
import downloadBtn from '../../assets/download-btn.png';
import { createFile, fetchAllFile, deleteFile } from '../../service/api';

const DropInputFile = () => {
    const [files, setFiles] = useState([]);
    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    // handle file
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];

        const uploadFile = async () => {
            if (newFile) {
                const data = new FormData();
                data.append("name", newFile.name);
                data.append("file", newFile);

                const res = await createFile(data);

                res && setFiles(prev => [res, ...prev]);
            }
        }

        uploadFile();
    }

    // remove file
    const fileRemove = async (id) => {
        const res = await deleteFile(id);

        res && setFiles(prev => (
            prev.filter(file => file._id !== id)
        ));
    }

    // fetch all files
    useEffect(() => {
        const getAllFile = async () => {
            const res = await fetchAllFile();

            console.log(res)

            res && setFiles(res);
        }
        getAllFile();
    }, []);

    // download from client
    // const downloadFile = async (id) => {
    //     try {
    //         const res = await publicRequest.get(
    //             `files/single/${id}`,
    //             { responseType: "blob" }
    //         );
    //         const blob = new Blob([res.data], { type: res.data.type });
    //         const link = document.createElement("a");
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download = "file.pdf";
    //         // link.download = res.headers["content-disposition"].split("filename=")[1];
    //         link.click();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

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
                            files.map((file, index) => (
                                <div key={index} className="previewItem">
                                    <div className="itemInfo">
                                        <img
                                            src={ImageConfig[file?.name.split('.')[1]] || ImageConfig['default']}
                                            alt="file image"
                                        />
                                        <div className="info">
                                            <p>{file?.name}</p>
                                            <p>{file?.size}B</p>
                                        </div>
                                    </div>
                                    <div className="itemBtn">
                                        <a href={`${file?.downloadURL}/${file?._id}`} target='_blank'>
                                            <img src={downloadBtn} alt=""
                                                className='downloadBtn'
                                            />
                                        </a>
                                        <span
                                            className="removeBtn"
                                            onClick={() => fileRemove(file?._id)}
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