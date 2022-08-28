import { NavLink, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import "../styles/navbar.css";

type NavbarProps = {
  isUserSignedIn: boolean;
};

export function Navbar({ isUserSignedIn }: NavbarProps) {
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(firebaseAuth).then(() => {
      navigate("/login");
    });
  };

  return (
    <nav>
      <NavLink to="/">Home</NavLink>

      {isUserSignedIn === true ? (
        <>
          <NavLink to="/createpost">Create Post</NavLink>
          <button className="logout__button" onClick={signUserOut}>
            Log Out
          </button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
}
