import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content cannot be empty!");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success("Paste updated successfully!");
    } else {
      dispatch(addToPastes(paste));
      toast.success("Paste created successfully!");
    }

    // Clear fields after action
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border">
      {/* Title Input */}
      <input
        className="w-full p-3 mb-4 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Textarea Input */}
      <textarea
        className="w-full p-3 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 min-h-[200px]"
        placeholder="Enter content here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Create / Update Button */}
      <button
        onClick={createPaste}
        className="w-full mt-4 py-3 text-lg font-semibold bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
      >
        {pasteId ? "Update Paste" : "Create My Paste"}
      </button>
    </div>
  );
};

export default Home;
