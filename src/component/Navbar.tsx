import { NavLink, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../lib/firebase";
import { signOut } from "firebase/auth";

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
    <nav className="z-10 w-full	p-7 flex fixed justify-center items-center bg-[#292929] ">
      <NavLink
        className="mx-[20px] cursor-pointer	 text-[16px] font-[500] text-white"
        to="/"
      >
        Home
      </NavLink>

      {isUserSignedIn === true ? (
        <>
          <NavLink
            className="mx-[20px] cursor-pointer	 text-[16px] font-[500] text-white"
            to="/createpost"
          >
            Create Post
          </NavLink>
          <button
            className="mx-[20px] cursor-pointer	 text-[16px] font-[500] text-white"
            onClick={signUserOut}
          >
            Log Out
          </button>
        </>
      ) : (
        <NavLink
          to="/login"
          className="mx-[20px] cursor-pointer	 text-[16px] font-[500] text-white"
        >
          Login
        </NavLink>
      )}
    </nav>
  );
}
