import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import AddProfileInfo from "@/actions/auth";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ProfileForm({ email, userInfo, isClose }) {
  const profilePicRef = useRef();
  const [pickedImg, setPickedImg] = useState();

  function handleProfilePic() {
    profilePicRef.current.click();
  }

  function handleChange(evt) {
    const file = evt.target.files[0];

    if (!file) {
      setPickedImg(null);
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImg(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <form action={AddProfileInfo}>
      <input type="hidden" name="email" value={email} />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile information
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="janesmith"
                    defaultValue={userInfo.username}
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="bio"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bio
              </label>
              <div className="mt-2">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={userInfo.bio}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  aria-hidden="true"
                  className="h-12 w-12 text-gray-300"
                />
                <button
                  type="button"
                  onClick={handleProfilePic}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
              <button
                onClick={isClose}
                type="submit"
                className="text-green-600 mt-6"
              >
                Submit
              </button>
            </div>
            <div className="col-span-full">
              <div className="picker">
                <label htmlFor="profilePic">
                  <div className="controls">
                    <div className="preview">
                      {pickedImg && (
                        <Image fill src={pickedImg} alt="profile photo" />
                      )}
                    </div>
                    <input
                      type="hidden"
                      name="lastProfilePic"
                      value={userInfo.image_url}
                    />
                    <input
                      ref={profilePicRef}
                      id="profilePic"
                      name="profilePic"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="input"
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
