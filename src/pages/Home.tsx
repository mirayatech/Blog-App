import { useState, useEffect } from "react";
import { IoMdTrash } from "react-icons/io";
import {
  collection,
  CollectionReference,
  onSnapshot,
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
    onSnapshot(postsCollectionRef, (snapshot) =>
      setPosts(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  return (
    <div className="home__page">
      {posts.map(({ title, id, postText, author }) => {
        return (
          <div key={id} className="post">
            <header className="header">
              <h1>{title}</h1>
              <IoMdTrash />
            </header>
            <div className="line"></div>
            <div className="post__text">
              <p>{postText}</p>
            </div>
            <span>{author.name}</span>
          </div>
        );
      })}
    </div>
  );
}
