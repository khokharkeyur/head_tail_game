import { Link } from "react-router-dom";

const About = () => {
  return (
      <div className="mx-2 lg:w-1/3 backdrop-blur-xl bg-white/10 p-10 rounded-xl shadow-xl border border-white/20 text-center">
        <h1 className="md:text-4xl text-2xl font-extrabold text-white drop-shadow-lg mb-6">
          About Us
        </h1>

        <p className="text-lg text-gray-300 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quos impedit non? Quae aliquam modi illo, fuga in odit! Soluta reiciendis consequuntur minima quam. Alias odit molestiae dolor placeat quo.
        </p>

        <Link
          to="/"
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg rounded-lg shadow-md transition-all transform hover:scale-105 hover:shadow-lg"
        >
          Back to Home
        </Link>
      </div>
  );
};

export default About;
