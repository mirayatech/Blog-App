import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
export function Navbar() {
  return (
    <nav>
      <NavLink
        style={({ isActive }) =>
          isActive
            ? {
                color: "#9bebff",
              }
            : { color: "#fff" }
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={({ isActive }) =>
          isActive
            ? {
                color: "#9bebff",
              }
            : { color: "#fff" }
        }
        to="/createpost"
      >
        Create Post
      </NavLink>
      <NavLink
        style={({ isActive }) =>
          isActive
            ? {
                color: "#9bebff",
              }
            : { color: "#fff" }
        }
        to="/login"
      >
        Login
      </NavLink>
    </nav>
  );
}
