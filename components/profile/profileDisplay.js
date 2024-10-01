"use client";
import { useState } from "react";
import ProfileEditArea from "./edit-space";

export default function ProfileDisplay({ email, userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(userInfo.image_url);
  function handleclick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }
  return (
    <>
      <ProfileEditArea
        isOpen={isOpen}
        isClose={handleClose}
        userInfo={userInfo}
        email={email}
      />
      <div className="w-full md:w-100 mx-auto flex flex-col items-center md:items-start">
        <img
          className="w-24 h-24 md:w-32 md:h-32 md:rounded-full rounded-full mx-auto"
          src={userInfo.image_url}
          alt="Profile Image"
          width="256"
          height="256"
        />
        <div className="pt-6 md:p-8 md:text-left space-y-4 min-w-[150px]">
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-black">
              {userInfo.first_name} {userInfo.last_name}
            </div>
            <div className="text-slate-700 dark:text-slate-500">
              Username: {userInfo.username}
            </div>
          </figcaption>

          <blockquote>
            <span className="text-slate-700 dark:text-slate-500">Bio</span>
            <p className="text-lg font-medium text-gray-800">{userInfo.bio}</p>
          </blockquote>
        </div>
      </div>
      <button onClick={handleclick} className="text-green-600 mt-3 ml-8">
        Edit Profile
      </button>
    </>
  );
}
