import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuUpload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import {
  updatePassword,
  updateProfile,
  uploadProfileImage,
} from "../../../services/operations/Profile";
import toast from "react-hot-toast";

const genders = [
  { id: 1, gender: "male" },
  { id: 2, gender: "female" },
  { id: 3, gender: "Prefer not to say" },
  { id: 4, gender: "Other" },
];

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [file, setFile] = useState("");
  const [profileInfo, setProfileInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
    gender: user?.additionalDetails?.gender || "",
    contactNumber: user?.additionalDetails?.contactNumber || "",
    about: user?.additionalDetails?.about || "",
  });

  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("No file selected");
      return;
    }
    dispatch(uploadProfileImage(file, token, user));
  };

  const handleInfoChange = (e) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitProfileInfo = (e) => {
    e.preventDefault();
    const { dateOfBirth } = profileInfo;

    if (dateOfBirth.includes("-")) {
      const [year, month, day] = dateOfBirth.split("-");
      profileInfo.dateOfBirth = `${day}.${month}.${year}`;
    }

    dispatch(updateProfile(profileInfo, user, token));
  };

  const handlePasswordChange = (e) => {
    setPasswordInfo({
      ...passwordInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitPasswordHandler = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = passwordInfo;

    if (!newPassword || !confirmPassword) {
      toast.error("Passwords are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(updatePassword(passwordInfo, token));
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="mx-auto w-11/12 max-w-[1000px] py-10">
        <h1 className="mb-10 text-3xl font-semibold text-richblack-5">
          Edit Profile
        </h1>

        {/* Profile Image Section */}
        <div className="bg-richblack-800 border border-richblack-700 shadow-md rounded-xl p-6 flex items-center gap-6 mb-10">
          <img
            src={user?.image}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-richblack-5 mb-2">Change Profile Picture</p>
            <form className="flex gap-3 items-center" onSubmit={handleUpload}>
              <label
                htmlFor="profileImage"
                className="cursor-pointer bg-richblack-700 text-richblack-50 px-4 py-2 rounded-md font-medium"
              >
                Select
                <input
                  type="file"
                  hidden
                  id="profileImage"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleFileChange}
                />
              </label>

              {file && typeof file !== "string" && (
                <span className="text-sm text-richblack-200 max-w-[150px] truncate">
                  {file.name}
                </span>
              )}

              <button
                type="submit"
                className="bg-[#20b486] text-white px-4 py-2 rounded-md hover:bg-[#20b43c] flex items-center gap-2"
              >
                Upload <LuUpload />
              </button>
            </form>
          </div>
        </div>

        {/* Profile Info Form */}
        <form
          onSubmit={submitProfileInfo}
          className="bg-richblack-800 border border-richblack-700 shadow-md rounded-xl p-8 mb-10 text-richblack-5"
        >
          <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="mb-1 block">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full p-2 border border-gray-300 bg-richblack-700 rounded-md text-black"
                defaultValue={profileInfo.firstName}
                onChange={handleInfoChange}
              />
            </div>
            <div>
              <label className="mb-1 block">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full p-2 border border-gray-300  bg-richblack-700 rounded-md text-black"
                defaultValue={profileInfo.lastName}
                onChange={handleInfoChange}
              />
            </div>
            <div>
              <label className="mb-1 block">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                className="w-full p-2 border border-gray-300  bg-richblack-700 rounded-md text-black"
                value={profileInfo.dateOfBirth}
                onChange={handleInfoChange}
              />
            </div>
            <div>
              <label className="mb-1 block">Gender</label>
              <select
                name="gender"
                className="w-full p-2 border border-gray-300  bg-richblack-700 rounded-md text-black"
                value={profileInfo.gender}
                onChange={handleInfoChange}
              >
                {genders.map((item) => (
                  <option key={item.id} value={item.gender}>
                    {item.gender}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                className="w-full p-2 border border-gray-300  bg-richblack-700 rounded-md text-black"
                defaultValue={profileInfo.contactNumber}
                onChange={handleInfoChange}
              />
            </div>
            <div>
              <label className="mb-1 block">About</label>
              <input
                type="text"
                name="about"
                className="w-full p-2 border border-gray-300  bg-richblack-700 rounded-md text-black"
                defaultValue={profileInfo.about}
                onChange={handleInfoChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-profile")}
              className="bg-richblack-700 text-richblack-200 px-5 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#20b486] text-white px-5 py-2 rounded-md hover:bg-[#20b43c]"
            >
              Save
            </button>
          </div>
        </form>

        {/* Password Section */}
        <form
          onSubmit={submitPasswordHandler}
          className="bg-richblack-800 border border-richblack-700 shadow-md rounded-xl p-8 text-richblack-5"
        >
          <h2 className="text-xl font-semibold mb-6">Change Password</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="mb-1 block">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                className="w-full p-2 border border-gray-300  bg-richblack-700 rounded-md text-black"
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label className="mb-1 block">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="w-full p-2 border border-gray-300  bg-richblack-700 rounded-md text-black"
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label className="mb-1 block">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full p-2 border border-gray-300  bg-richblack-700 rounded-md text-black"
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-profile")}
              className="bg-richblack-700 text-richblack-200 px-5 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#20b486] text-white px-5 py-2 rounded-md hover:bg-[#20b43c]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
