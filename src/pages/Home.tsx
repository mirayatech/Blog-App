import { useState, useEffect } from "react";
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../firebase-config";

export function Home() {
  const [postLists, setPostLists] = useState<
    {
      author: { id: string; name: string };
      id: string;
      postText: string;
      title: string;
    }[]
  >([]);
  const postCollectionRefrence = collection(db, "Post");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRefrence);
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  return (
    <div className="home__page">
      {postLists.map((post) => {
        return (
          <div key={post.id} className="post">
            <h1>{post.title}</h1>
            <p>{post.postText}</p>
            <span>{post.author.name}</span>
          </div>
        );
      })}
    </div>
  );
}
