import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState(null); // ✅ separate state for file errors

  let navigate = useNavigate();

  let onFormSubmit = async (newUser) => {
    setLoading(true); // ✅ add this
    const formData = new FormData();
    let { role, profileImageUrl, ...userObj } = newUser;
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    formData.append("profileImageUrl", profileImageUrl[0]);

    try {
      const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      if (role === "USER") {
        let resObj = await axios.post(`${BASE_URL}/user-api/users`, formData);
        if (resObj.status === 201) {
          navigate("/login");
        }
      }
      if (role === "AUTHOR") {
        let resObj = await axios.post(`${BASE_URL}/author-api/users`, formData);
        if (resObj.status === 201) {
          navigate("/login");
        }
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(msg);
      console.error("Full Error Object:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading === true) {
    return <p className="text-black text-2xl">Loading...</p>;
  }

  if (error != null) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-700 text-3xl mb-4">{error}</p>
        <button
          onClick={() => setError(null)}
          className="bg-violet-600 text-white p-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-lg bg-white p-12 rounded-3xl shadow-2xl border border-slate-200">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-8 flex items-center justify-center bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="me-4 font-semibold text-slate-700">
              Select Role:
            </span>
            <label className="flex items-center me-4 cursor-pointer">
              <input
                type="radio"
                value="USER"
                {...register("role", { required: "Please select a role" })}
                className="accent-violet-600 w-4 h-4"
              />
              <span className="ms-2">User</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="AUTHOR"
                {...register("role", { required: "Please select a role" })}
                className="accent-violet-600 w-4 h-4"
              />
              <span className="ms-2">Author</span>
            </label>
          </div>
          {errors.role && (
            <p className="text-red-500 block text-sm mt-1">
              {errors.role.message}
            </p>
          )}

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="First Name"
                className="w-full border-2 border-slate-200 p-4 rounded-xl focus:outline-none focus:border-violet-400 transition-colors"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last Name"
                className="w-full border-2 border-slate-200 p-4 rounded-xl focus:outline-none focus:border-violet-400 transition-colors"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email Address"
              className="w-full border-2 border-slate-200 p-4 rounded-xl focus:outline-none focus:border-violet-400 transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 block text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-8">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message:
                    "Password must be at least 6 characters, including a capital letter, a small letter, and a number",
                },
              })}
              placeholder="Password"
              className="w-full border-2 border-slate-200 p-4 rounded-xl focus:outline-none focus:border-violet-400 transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 block text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("profileImageUrl")}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (!["image/jpeg", "image/png"].includes(file.type)) {
                    setFileError("Only JPG or PNG allowed"); // ✅ use fileError
                    return;
                  }
                  if (file.size > 2 * 1024 * 1024) {
                    setFileError("File size must be less than 2MB"); // ✅ use fileError
                    return;
                  }
                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                  setFileError(null); // ✅ clear fileError
                }
              }}
            />
            {fileError && (
              <p className="text-red-500 text-sm mt-1">{fileError}</p>
            )}{" "}
            {/* ✅ inline error */}
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-lg bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-4 rounded-2xl transition duration-300 shadow-lg active:scale-95"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
