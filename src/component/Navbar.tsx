import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
export function Navbar() {
  return (
    <nav>
      <NavLink
        style={({ isActive }) =>
          isActive
            ? {
                background: "-webkit-linear-gradient(30deg, #fff2a0, #ff9aac)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
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
                background: "-webkit-linear-gradient(30deg, #fff2a0, #ff9aac)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
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
                background: "-webkit-linear-gradient(30deg, #fff2a0, #ff9aac)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
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
