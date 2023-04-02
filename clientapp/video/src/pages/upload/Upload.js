import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { storage } from '../../firebase'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"

const Upload = () => {
  const [img, setImg] = useState({ file: null });
  const [media, setMedia] = useState({ file: null });
  const handleUpload =() =>{
    if(img == null || media == null){
      alert("please choose the files");
      return;
    }
    const imgref = ref(storage, `images/` + Date.now() + img.file.name);
    const mediaref = ref(storage, `media/` + Date.now() + media.file.name);
    uploadBytes(imgref, img.file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setImgUrl(url);
        console.log(url);
      });
    });
    uploadBytes(mediaref, media.file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
      });
    });

  }

  return (
    <div className="container">
    <div className="row">
      <div className="col-12 col-md-6 my-2">
        <div className="mb-3">
          <label htmlFor="thumbfile" className="form-label">
            Thumbnail
          </label>
          <input
            className="form-control"
            type="file"
            id="thumbfile"
            onChange={(e) => {setImg({ file: e.target.files[0] })}}
            accept="image/*"
          />
        </div>
      </div>
      <div className="col-12 col-md-6 my-2">
        <div className="mb-3">
          <label htmlFor="mediafile" className="form-label">
            Media
          </label>
          <input
            className="form-control"
            type="file"
            id="mediafile"
            onChange={(e) => {setMedia({ file: e.target.files[0] })}}
            accept="video/*, audio/*"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
              <button
                className="btn btn-danger"
                onClick={handleUpload}
                style={{ maxWidth: "150px" }}
              >
                Upload Files
              </button>
            </div>
      </div>
      </div>
  )
}

export default Upload