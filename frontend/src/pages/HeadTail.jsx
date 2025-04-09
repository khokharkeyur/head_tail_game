import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const HeadTail = () => {
  const [result, setResult] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedValue) {
      toast.error("Please select a value from the dropdown");
      return;
    }

    const newResult = [...result];
    const lastRow = newResult[newResult.length - 1];

    if (selectedValue === "H") {
      if (lastRow && !lastRow.includes("T")) {
        lastRow.push("H");
      } else {
        newResult.push(["H"]);
      }
    } else if (selectedValue === "T") {
      if (lastRow && !lastRow.includes("H")) {
        lastRow.push("T");
      } else {
        newResult.push(["T"]);
      }
    }

    setResult(newResult);
    setSelectedValue("");
  };

  const handleReset = () => {
    setResult([]);
    setSelectedValue("");
  };
  const transpose = (matrix) => {
    const maxLength = Math.max(...matrix.map((row) => row.length));

    return Array.from({ length: maxLength }, (_, colIndex) =>
      matrix.map((row) => row[colIndex] || " ")
    );
  };

  const transposedResult = transpose(result);
  return (
    <div className="w-full max-w-3xl mx-auto backdrop-blur-xl bg-white/10 p-10 rounded-xl shadow-xl border border-white/20 text-center">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-6">
        Head & Tail Game
      </h1>
      <div className="flex justify-center items-center space-x-4 mb-6">
        <select
          value={selectedValue}
          onChange={handleSelectChange}
          className="px-4 py-2 rounded-lg bg-white text-gray-800"
          placeholder="Select value"
        >
          <option value="">Select value</option>
          <option value="H">H</option>
          <option value="T">T</option>
        </select>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 hover:bg-green-600"
        >
          Submit
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 text-white text-left">
        {transposedResult.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2">
            {row.map((value, colIndex) => (
              <span key={colIndex}>
                {value === "H"
                  ? "H"
                  : value === "T"
                  ? "T"
                  : value
                  ? " \u00A0\u00A0"
                  : ""}
              </span>
            ))}
          </div>
        ))}
      </div>

      <Link
        to="/"
        className="mt-6 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg rounded-lg shadow-md transition-all transform hover:scale-105 hover:bg-blue-600 hover:shadow-lg block w-fit mx-auto"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default HeadTail;
