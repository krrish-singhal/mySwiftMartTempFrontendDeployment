import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { toast } from "react-toastify";

const EditProfilePicture = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.profilePic || "");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setImagePreview(URL.createObjectURL(uploadedFile)); // Preview the selected image
    }
  };

  const handleUpdate = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/update-profile-picture`, {
        method: "PUT",
        headers: {
          "Accept": "application/json", // Don't include Content-Type for FormData
        },
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(data.user)); // Update the user state with the new profile pic
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile picture");
    }
  };

  useEffect(() => {
    if (user?.profilePic) {
      setImagePreview(user.profilePic); // Make sure the profile pic is shown on initial load
    }
  }, [user]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Change Profile Picture</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full mb-3"
      />
      <div className="mb-4">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border"
          />
        )}
      </div>
      <button
        onClick={handleUpdate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update
      </button>
    </div>
  );
};

export default EditProfilePicture;
