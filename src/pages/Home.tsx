import { useState, useEffect } from "react";
import { IoMdTrash } from "react-icons/io";
import {
  collection,
  CollectionReference,
  onSnapshot,
  deleteDoc,
  doc,
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
  const [posts, setPosts] = useState<Post[]>([]);
  const postsCollectionRef = collection(
    firebaseDb,
    "posts"
  ) as CollectionReference<Post>;

  useEffect(() => {
    const getPosts = () => {
      onSnapshot(postsCollectionRef, (snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    };
    getPosts();
  }, []);

  const deletePost = (id: any) => {
    const postDoc = doc(firebaseDb, `posts/${id}`);
    deleteDoc(postDoc);
  };
  return (
    <div className="home__page">
      {posts.map(({ title, id, postText, author }) => {
        return (
          <div key={id} className="post">
            <header className="header">
              <h1>{title}</h1>
              {author.id === firebaseAuth.currentUser?.uid && (
                <button
                  onClick={() => {
                    deletePost(id);
                  }}
                >
                  <IoMdTrash />
                </button>
              )}
            </header>
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
