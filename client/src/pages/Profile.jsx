import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserFaliure,
  updateUserSuccess,
} from "../redux/user/userSlice";
import {
  deleteUserStart,
  deleteUserFaliure,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import {
  SignOutUserStart,
  SignOutUserFaliure,
  SignOutUserSuccess,
} from "../redux/user/userSlice";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFaliure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFaliure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFaliure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFaliure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(SignOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignOutUserFaliure(data.message));
        return;
      }
      dispatch(SignOutUserSuccess(data));
    } catch (error) {
      dispatch(SignOutUserFaliure(data.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        showListingError(true);
      }
      setUserListings(data);
    } catch (error) {
      showListingError(true);
    }
  };

  const handleDeleteListing = async (listingid) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingid)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div>
        <h1 className=" text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="self-center  rounded-full h-24 w-24 object-cover cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
          <p>
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image Upload(Must be less than 2mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className=" text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className=" text-green-500">Successfull Uploaded!</span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />
          <input
            type="submit"
            value={loading ? "LOADING..." : "UPDATE"}
            disabled={loading}
            className="uppercase bg-green-700 text-white rounded-lg p-3  hover:opacity-80"
          />
          <Link
            to="/create-listing"
            className="uppercase bg-emerald-700 text-white rounded-lg p-3  hover:opacity-80 text-center"
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between mt-5">
          <span
            className="text-red-700  cursor-pointer hover:text-red-600"
            onClick={handleDelete}
          >
            Delete Account
          </span>
          <span
            className="text-red-700  cursor-pointer hover:text-red-600"
            onClick={handleSignOut}
          >
            Sign Out
          </span>
        </div>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-400">
        {updateSuccess ? "User is updated succesfully !" : ""}
      </p>
      <button
        onClick={handleShowListing}
        className="text-green-600 w-full hover:opacity-75  font-medium"
      >
        Show Listing
      </button>
      <p className="text-red-700 mt-5">
        {showListingError ? "Error Showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center  text-2xl font-semibold">Your Listings</h1>
          {userListings &&
            userListings.length > 0 &&
            userListings.map((listing) => (
              
                <div
                  key={listing._id}
                  className="border rounded-lg p-3 flex justify-between items-center  gap-4"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-contain "
                    />
                  </Link>
                  <Link
                    className="text-green-700 font-semibold flex-1 hover:underline truncate"
                    to={`/listing/${listing._id}`}
                  >
                    <p>{listing.name}</p>
                  </Link>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleDeleteListing(listing._id)}
                      className="text-red-700 uppercase hover:text-red-300"
                    >
                      Delete
                    </button>
                    <Link to={`/update-listing/${listing._id}`} >
                    <button className="text-green-600 uppercase hover:text-yellow-700">Edit</button>
                    </Link>
                  </div>
                </div>
              
            ))}
        </div>
      )}
    </div>
  );
}

export default Profile;

/*
**Firebase storage future reference**
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read ;
      allow write: if 
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
      ;
    }
  }
}*/
