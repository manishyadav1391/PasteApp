import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast"; // For notifications

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-100 shadow-lg rounded-2xl p-6 mt-10">
      {/* Title */}
      <div className="flex justify-between items-center">
        <input
          className="p-3 text-lg font-semibold bg-gray-200 text-gray-800 rounded-xl w-full border border-gray-400"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
      </div>

      {/* Content Box */}
      <div className="relative mt-6">
        <textarea
          className="w-full p-4 text-lg bg-gray-200 text-gray-900 rounded-xl border border-gray-400 min-h-[300px] resize-none"
          value={paste.content}
          placeholder="Enter content here"
          disabled
          rows={10}
        />

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-200"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
