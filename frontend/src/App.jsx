import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ExplorePage from "./pages/ExplorePage";
import LikesPage from "./pages/LikesPage";
import SideBar from "./components/SideBar";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";

function App() {

  const { authUser,loading } = useAuthContext();
  console.log("Authed USER:", authUser);


  if (loading){
    return null; //dont naviagte to any page
  }
  return (
    <div className="flex ">
      <Toaster position="top-center" reverseOrder={false} />

      <SideBar />
      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to={"/"} />} />
          <Route path="/explore" element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />} />
          <Route path="/likes" element={authUser ? <LikesPage /> : <Navigate to={"/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
