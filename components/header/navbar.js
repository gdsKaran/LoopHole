import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Lobster } from "next/font/google";
import SearchBar from "./search-bar";
import Link from "next/link";
import { logout } from "@/actions/auth";
import { verifyAuth } from "../lib/auth";
import { getPosts, getUserById } from "../lib/blogs-DB";

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
  size: "60",
});

export default async function Navbar() {
  const result = await verifyAuth();
  const userId = result.user.id;
  const userInfo = getUserById(userId);
  const posts = await getPosts();

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 inset-x-0 z-10">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex-1 flex items-center justify-start">
            <div className="flex items-center">
              <span className={`${lobster.className} text-3xl`}>
                <Link href="/homePage">LoopHole</Link>
              </span>
            </div>

            <div className="flex-1 mx-1">
              <SearchBar
                posts={posts}
                className="w-full max-w-xs sm:max-w-md lg:max-w-lg"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link href="/write" className="ml-4 text-white">
              Write
            </Link>
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            <Menu as="div" className="relative">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="Profile"
                    src={userInfo.image_url}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
              >
                <MenuItem>
                  <a
                    href="/profilePage"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Your Profile
                  </a>
                </MenuItem>

                <MenuItem>
                  <form action={logout}>
                    <button
                      type="submit"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Logout
                    </button>
                  </form>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
