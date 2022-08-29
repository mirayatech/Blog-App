import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../lib/firebase";

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
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-[20px] bg-white rounded-lg shadow-md border border-[#eee]   w-[380px]">
        <h1 className="text-[#292929] text-[25px] font-[500] w-[350px]">
          Create a post
        </h1>
        <div className="h-px w-full mb-4 mt-1.5 bg-[#ddd]"></div>
        <div className="flex flex-col">
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            type="text"
            name="title"
            placeholder="Title..."
            className="text-[16px] p-[8px] rounded border border-[#bbb] mb-[10px]"
          />
        </div>
        <div className="flex flex-col">
          <textarea
            onChange={(event) => {
              setPostText(event.target.value);
            }}
            placeholder="Post..."
            className="text-[16px] p-[8px] rounded border border-[#bbb] mb-[10px] h-[220px]"
          />
        </div>
        <button
          onClick={createPost}
          className="p-[10px] rounded bg-[#292929] text-white font-[500] w-[100%] hover:scale-[.98] ease-in duration-200"
        >
          Share Post
        </button>
      </div>
    </div>
  );
}
