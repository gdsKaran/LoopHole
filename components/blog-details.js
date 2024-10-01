import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import LikeButton from "./like-btn";
import CommentBtn from "./comments/comment-btn";
import CommentArea from "./comments/commentSection";
import { useState } from "react";
import { deletePostFunc } from "@/actions/auth";

export default function DetailedPage({
  postData,
  action,
  comments,
  currentUser,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  const handleDelete = async () => {
    try {
      await deletePostFunc(postData.id);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };
  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between pt-20  pl-10 pr-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {postData.title}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {/* <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon
              aria-hidden="true"
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            />
            Full-time
          </div> */}
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                aria-hidden="true"
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              />
              India
            </div>
            {/* <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon
              aria-hidden="true"
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            />
            $120k &ndash; $140k
          </div> */}
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                aria-hidden="true"
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              />
              Posted at {postData.createdAt.slice(0, 10)}
            </div>
          </div>
        </div>

        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          {/* <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PencilIcon
              aria-hidden="true"
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            />
            Edit
          </button>
        </span> */}

          {/* <span className="ml-3 hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <LinkIcon
              aria-hidden="true"
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            />
            View
          </button>
        </span> */}

          <form
            action={action.bind(null, postData.id)}
            className={postData.isLiked ? "liked" : ""}
          >
            <div
              style={{ display: "inline-flex", alignItems: "center" }}
              className="mt-0.5"
            >
              <LikeButton />
              <span style={{ color: "black" }}>{postData.likes}</span>
            </div>
          </form>
          <div
            style={{ display: "inline-flex", alignItems: "center" }}
            className="pl-5 pb-5"
          >
            <div onClick={handleOpen}>
              <CommentBtn />
            </div>
            <div className="relative z-20">
              <CommentArea
                isOpen={isOpen}
                onClose={handleClose}
                postId={postData.id}
                comments={comments}
                currentUser={currentUser}
              />
            </div>
          </div>
          {/* <span className="sm:ml-3 pl-5">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Follow
            </button>
          </span> */}
          {postData.userId === currentUser && (
            <span className="sm:ml-3 pl-5 mt-2">
              <button
                onClick={handleDelete}
                className="text-gray-700 hover:text-red-600"
                aria-label="Delete comment"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center  bg-white-100 p-6 ">
        <div className="max-w-2xl w-full bg-white text-black  p-8 text-lg mb-8">
          {postData.content}
        </div>
      </div>
    </>
  );
}
