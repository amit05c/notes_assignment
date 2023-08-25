import React, { useState } from "react";
import axios from "axios";
import styles from "../Style/notes.module.css";
import { BsFileImage, BsCameraVideo } from "react-icons/bs";
import { AiFillAudio, AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";
function AddNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [video, setVideo] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, description);

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    // formData.append('image', image);

    // console.log(title,description)
    if (image) {
      formData.append("files", image);
    }
    if (audio) {
      formData.append("files", audio);
    }
    if (video) {
      formData.append("files", video);
    }

    try {
      console.log(formData);
      await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Data uploaded successfully");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + "...";
    }
  }

  return (
    <div className={styles.container}>
      <h1>Add Note</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <Link to={"/"}>
            <AiOutlineArrowLeft />
          </Link>
          <button className={styles.btn} type="submit">
            Add Note
          </button>
        </div>

        <div>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            style={{
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "1rem",
              width: "80%",
            }}
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            style={{
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "1rem",
              width: "80%",
            }}
            rows="30"
            cols="10"
          ></textarea>
        </div>

        {/* <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div> */}

        <div className={styles.uploadFileName}>
          {image && <p>{truncateString(image.name, 5)}</p>}
          {/* {console.log(truncateString(audio.length,5))} */}
          {console.log(audio)}
          {video && <p>{truncateString(video.name, 5)}</p>}
          {audio && <p>{truncateString(audio.name, 5)}</p>}
          {/* {audio.length >0 && <p>{console.log(truncateString(audio.length,5))}</p>} */}
        </div>

        <div className={styles.fileBox}>
          <div>
            <input
              className={styles.imagefile}
              type="file"
              id="customFile"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label htmlFor="customFile">
              <BsFileImage />
            </label>
          </div>

          {/* <div>
          <label>Audio:</label>
          <input type="file" accept="audio/*" onChange={handleAudioChange} />
        </div> */}

          {/* <div>
          <label>Video:</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </div> */}

          <div>
            <input
              className={styles.audiofile}
              type="file"
              id="customVideoFile"
              accept="video/*"
              onChange={handleVideoChange}
            />
            <label htmlFor="customVideoFile">
              <BsCameraVideo />
            </label>
          </div>

          <div>
            <input
              className={styles.audiofile}
              type="file"
              id="customAudioFile"
              accept="audio/*"
              onChange={handleAudioChange}
            />
            <label htmlFor="customAudioFile">
              <AiFillAudio />
            </label>
          </div>
        </div>

        {/* <button type="submit">Add Note</button> */}
      </form>
    </div>
  );
}

export default AddNote;
