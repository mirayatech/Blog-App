import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../lib/firebase";

import "../styles/createpost.css";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollectionRefrence = collection(firebaseDb, "posts");

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postCollectionRefrence, {
      title: title,
      postText: postText,
      heart: 0,
      author: {
        name: firebaseAuth.currentUser?.displayName,
        id: firebaseAuth.currentUser?.uid,
      },
    });
    navigate("/");
  };

  return (
    <div className="createpost">
      <div className="createpost__container">
        <h1>Create a post</h1>
        <div className="line"></div>
        <div className="input__wrapper">
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            type="text"
            name="title"
            placeholder="Title..."
          />
        </div>
        <div className="input__wrapper">
          <textarea
            onChange={(event) => {
              setPostText(event.target.value);
            }}
            placeholder="Post..."
          />
        </div>
        <button onClick={createPost} className="createpost__button">
          Share Post
        </button>
      </div>
    </div>
  );
}
