import { useState, useEffect } from "react";
import { IoMdTrash } from "react-icons/io";

import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

type HomeProps = {
  isAuth: boolean;
};

export function Home({ isAuth }: HomeProps) {
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
      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const deletePost = async (id: any) => {
    const postDoc = doc(db, "Post", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="home__page">
      {postLists.map((post) => {
        return (
          <div key={post.id} className="post">
            <h1>{post.title}</h1>
            <p>{post.postText}</p>
            <span>Author: {post.author.name}</span>
            <div>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button
                  className="delete__post"
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  <IoMdTrash />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
