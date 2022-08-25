import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

type LoginProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Login({ setIsAuth }: LoginProps) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);

      navigate("/");
    });
  };

  return (
    <div className="login-page">
      <h1>In order to create a post, you must sign in with Google.</h1>
      <button className="login__button" onClick={signInWithGoogle}>
        <FcGoogle className="login__button--icon" />
        Sign in with Google
      </button>
    </div>
  );
}
