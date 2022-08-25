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
      <p>Sign in with Google to continue </p>
      <button className="login__button" onClick={signInWithGoogle}>
        <FcGoogle className="login__button--icon" />
        Sign in with Google
      </button>
    </div>
  );
}
