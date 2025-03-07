import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pastId) {
    dispatch(removeFromPastes(pastId));
    toast.error("Paste deleted!");
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-lg">
      {/* Search Bar */}
      <input
        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
        type="search"
        placeholder="🔍 Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste List */}
      <div className="mt-6 space-y-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{paste.title}</h3>

              {/* Content Preview */}
              <p className="text-gray-600 line-clamp-3">{paste.content}</p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <a
                  href={`/?pasteId=${paste?._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  ✏️ Edit
                </a>
                <a
                  href={`/pastes/${paste?._id}`}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                >
                  👁 View
                </a>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  🗑 Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard!");
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                >
                  📋 Copy
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition">
                  🔗 Share
                </button>
              </div>

              {/* Date */}
              <div className="text-gray-400 text-sm mt-2">📅 {paste.createdAt}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
