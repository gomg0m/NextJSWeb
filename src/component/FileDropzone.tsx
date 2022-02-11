import { sizeWidth } from '@mui/system';
import React, { useCallback, useMemo, useState} from 'react';
import { useDropzone } from 'react-dropzone';
//import Dropzone from 'react-dropzone';
import Axios from 'axios';

const baseStyle = {
  display : 'flex',
  align: 'center',
  padding: '2px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
  width: '300px',
  height: '40px',
  margin: "-10px 30px 0px",
  font: 'bold 0.7em/1em areal',
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function FileDropzone() {
  const [thumb, setThumb] = useState<string[]>([]);

  const onDrop = useCallback(acceptedFiles => {

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
    const config = {
      headers: { "content-type": "multipart/form-data" }
    }
   
    formData.append("file", file);
    console.log("acceptFilesNum",acceptedFiles.length);
  })

  }, [])
   
  const {getRootProps,getInputProps,isDragActive, isDragAccept,isDragReject} = useDropzone({onDrop,accept: 'image/jpeg, image/png', multiple:true});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  
  return (
    <div {...getRootProps({style})} >    
    <input {...getInputProps()} />
    {
      isDragActive ?
        <p>여기에 드롭!</p> :
        <p>파일 드래그 또는 클릭</p>         
    }      
    </div>
  )
}