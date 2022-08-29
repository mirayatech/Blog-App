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
    <div className="max-w-[100%] h-auto flex pt-[90px] items-center flex-col relative">
      {posts.map(({ title, id, postText, author, heart }) => {
        return (
          <div
            key={id}
            className="p-[20px] bg-white rounded-lg shadow-md border border-[#eee]  my-[10px] max-w-[350px]"
          >
            <header className="flex items-baseline justify-flex-start">
              <h1 className="w-[350px] font-[500] text-[1.1rem] leading-tight  text-[#4e4d52]">
                {title}
              </h1>
              {author.id === firebaseAuth.currentUser?.uid && (
                <button
                  className="p-[3px] flex ml-[10px] text-[1.1rem] border-2 border-[#e9e9e9] text-[#9A999E] bg-[#EEEEEE] rounded "
                  onClick={() => {
                    deletePost(id);
                  }}
                >
                  <IoMdTrash />
                </button>
              )}
            </header>
            <div className="h-px w-full mb-[10px] mt-[8px] bg-[#ddd]"></div>
            <div className="post__text">
              <p className="w-[100%] h-auto  max-h-[300px] overflow-y-scroll text-[1rem] text-[#9A999E] pb-[30px] break-all text-[#4e4d52 ">
                {postText}
              </p>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-[500] italic text-[.9rem] text-[#4e4d52]">
                Author: {author.name}
              </span>
              <div className="flex flex-row-reverse	 items-center">
                {author.id === firebaseAuth.currentUser?.uid ? (
                  ""
                ) : (
                  <button
                    className="p-[3px] flex ml-[10px] text-[.9rem] border-2 border-[#e9e9e9] text-[#9A999E] bg-[#EEEEEE] rounded "
                    onClick={() => {
                      likePost(id, heart);
                    }}
                  >
                    <IoIosHeart />
                  </button>
                )}
                <p className="flex items-center  text-[#4e4d52]">
                  {heart}
                  {author.id === firebaseAuth.currentUser?.uid ? (
                    <IoIosHeart className="ml-[10px]" />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
