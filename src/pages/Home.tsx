import { useState, useEffect } from "react";
import { IoMdTrash } from "react-icons/io";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  CollectionReference,
} from "firebase/firestore";
import "../styles/home.css";
import { firebaseAuth, firebaseDb } from "../lib/firebase";

type Post = {
  author: { id: string; name: string };
  id: string;
  postText: string;
  title: string;
};

export function Home() {
  const [postLists, setPostLists] = useState<Post[]>([]);
  const postsCollectionRef = collection(
    firebaseDb,
    "posts"
  ) as CollectionReference<Post>;

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs<Post>(postsCollectionRef);
      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const deletePost = async (id: any) => {
    const postDoc = doc(firebaseDb, `posts/${id}`);
    await deleteDoc(postDoc);
  };

  return (
    <div className="home__page">
      {postLists.map(({ id, title, postText, author }) => {
        return (
          <div key={id} className="post">
            <div className="header">
              <h1>{title}</h1>{" "}
              {author.id === firebaseAuth.currentUser?.uid && (
                <button
                  className="delete__post"
                  onClick={() => {
                    deletePost(id);
                  }}
                >
                  <IoMdTrash />
                </button>
              )}
            </div>
            <div className="line"></div>
            <div className="post__text">
              <p>{postText}</p>
            </div>
            <span className="post__author">Author: {author.name}</span>
          </div>
        );
      })}
    </div>
  );
}
