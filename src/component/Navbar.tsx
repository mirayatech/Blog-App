import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "../styles/navbar.css";
import { firebaseAuth } from "../lib/firebase";

export function Navbar() {
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(firebaseAuth).then(() => {
      navigate("./");
    });
  };

  return (
    <nav>
      <NavLink to="/">Home</NavLink>

      {firebaseAuth.currentUser ? (
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
