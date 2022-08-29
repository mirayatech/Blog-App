import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleAuthProvider).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      {firebaseAuth.currentUser ? (
        ""
      ) : (
        <div className="flex items-center justify-center flex-col min-h-screen m-auto	">
          <h1 className="mx-auto	 w-[400px] text-center pb-[30px] text-2xl	px-[20px] font-[500] text-[#292929] 	">
            In order to create a post, you must sign in with Google.
          </h1>
          <button
            className="p-[10px] flex items-center bg-white text-[20px] border border-[#eee] rounded-md  shadow-md hover:shadow-sm ease-in duration-200	font-[500] text-[#5a6072]"
            onClick={signInWithGoogle}
          >
            <FcGoogle className="mr-[10px] text-[25px]" />
            Sign in with Google
          </button>
        </div>
      )}
    </>
  );
}
