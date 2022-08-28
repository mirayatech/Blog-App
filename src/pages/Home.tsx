import { useState, useEffect } from "react";
import { IoMdTrash, IoIosHeart } from "react-icons/io";
import {
  collection,
  CollectionReference,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "../styles/home.css";
import { firebaseAuth, firebaseDb } from "../lib/firebase";

type Post = {
  heart: number;
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

  const likePost = (id: string, heart: number) => {
    const postDoc = doc(firebaseDb, `posts/${id}`);
    const giveLikes = { heart: heart + 1 };
    updateDoc(postDoc, giveLikes);
  };

  return (
    <div className="home__page">
      {posts.map(({ title, id, postText, author, heart }) => {
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
            <div>
              {author.id === firebaseAuth.currentUser?.uid ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    likePost(id, heart);
                  }}
                >
                  <IoIosHeart />
                </button>
              )}
              <p>
                {author.id === firebaseAuth.currentUser?.uid ? (
                  <IoIosHeart />
                ) : (
                  ""
                )}
                {heart}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
