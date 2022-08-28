import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { CreatePost } from "./pages/CreatePost";
import { Navbar } from "./component/Navbar";
import { firebaseAuth } from "./lib/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        return setIsUserSignedIn(true);
      } else {
        setIsUserSignedIn(false);
      }
    });
  }, []);

  return (
    <Router>
      <Navbar isUserSignedIn={isUserSignedIn} />

      {isUserSignedIn === true ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}
