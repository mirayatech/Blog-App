import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
type NavbarProps = {
  isAuth: boolean;
};

export function Navbar({ isAuth }: NavbarProps) {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/createpost">Create Post</NavLink>
      {!isAuth ? (
        <NavLink to="/login">Login</NavLink>
      ) : (
        <button>Log Out</button>
      )}
    </nav>
  );
}
