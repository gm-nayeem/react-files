import React from 'react'
import DropInputFile from '../../components/dropInputFile/DropInputFile';

const Home = () => {
  const handleFileChange = (files) => {
    console.log(files);
  }

  return (
    <div className="box">
      <h2 className="header">
        React Drag & Drop Files
      </h2>
      <DropInputFile
        handleFileChange={handleFileChange}
      />
    </div>
  )
}

export default Home;
