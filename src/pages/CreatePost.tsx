import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../styles/createpost.css";
import { useNavigate } from "react-router-dom";

type CreatePostProps = {
  isAuth: boolean;
};

export function CreatePost({ isAuth }: CreatePostProps) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollectionRefrence = collection(db, "Post");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postCollectionRefrence, {
      title: title,
      postText: postText,
      author: { name: auth.currentUser?.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, []);

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
