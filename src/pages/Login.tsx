import { FcGoogle } from "react-icons/fc";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import "../styles/navbar.css";
import { firebaseAuth, googleAuthProvider } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleAuthProvider).then(() => {
      navigate("/");
    });
  };

  // useEffect(() => {

  // }, []);

  return (
    <>
      {firebaseAuth.currentUser ? (
        ""
      ) : (
        <div className="login-page">
          <h1>In order to create a post, you must sign in with Google.</h1>
          <button className="login__button" onClick={signInWithGoogle}>
            <FcGoogle className="login__button--icon" />
            Sign in with Google
          </button>
        </div>
      )}
    </>
  );
}
