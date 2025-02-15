import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Popular");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-between items-center w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        {selectedOption}
        <svg
          className="w-5 h-5 ml-2 -mr-1 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1 text-sm text-gray-700">
            <li
              onClick={() => handleOptionSelect("Popular")}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedOption === "Popular"
                  ? "text-blue-600 font-semibold"
                  : ""
              }`}
            >
              Popular
            </li>
            <li
              onClick={() => handleOptionSelect("New & Noteworthy")}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedOption === "New & Noteworthy"
                  ? "text-blue-600 font-semibold"
                  : ""
              }`}
            >
              New & Noteworthy
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
