import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import "../styles/navbar.css";

type NavbarProps = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Navbar({ isAuth, setIsAuth }: NavbarProps) {
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/createpost">Create Post</NavLink>
      {!isAuth ? (
        <NavLink to="/login">Login</NavLink>
      ) : (
        <button onClick={signUserOut}>Log Out</button>
      )}
    </nav>
  );
}
