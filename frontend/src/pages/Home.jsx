import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken", {
      secure: true,
      sameSite: "Strict",
    });
    navigate("/login");
  };

  return (
    <div className="mx-2 lg:w-1/3 backdrop-blur-xl bg-white/10 md:px-16 px-4 py-12 rounded-xl shadow-xl border border-white/15 text-center">
      <h1 className="md:text-6xl text-2xl font-bold text-white drop-shadow-md mb-4">
        Welcome
      </h1>
      <p className="md:text-lg text-base text-gray-300 mb-8">
        Explore the Head and Tail Game.
      </p>

      <nav className="flex flex-col space-y-4">
        <Link
          to="/about"
          className="md:px-10 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md transition-all transform hover:scale-105 hover:shadow-lg"
        >
          About Us
        </Link>
        <Link
          to="/head-tail"
          className="px-10 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-md transition-all transform hover:scale-105 hover:shadow-lg"
        >
          Play Head & Tail
        </Link>
        <button
          onClick={handleLogout}
          className="px-10 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-md transition-all transform hover:scale-105 hover:shadow-lg mt-4"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Home;
