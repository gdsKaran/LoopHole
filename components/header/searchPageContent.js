"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPageContent({ posts }) {
  const router = useRouter();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const searchQuery = params.get("query") || "";

      setQuery(searchQuery);
    }
  }, []);

  useEffect(() => {
    if (query.length) {
      setFilteredPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [router.isReady, query, posts]);

  return (
    <>
      {filteredPosts.length > 0 ? (
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Results for: {query}
              </h2>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.createdAt} className="text-gray-500">
                      {post.createdAt.slice(0, 10)}
                    </time>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#6B6B6B"
                        viewBox="0 0 612 612"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      <span style={{ color: "black", marginLeft: "4px" }}>
                        {post.likes}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#6B6B6B"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="#6B6B6B"
                          d="M12.344 11.458A5.28 5.28 0 0 0 14 7.526C14 4.483 11.391 2 8.051 2S2 4.483 2 7.527c0 3.051 2.712 5.526 6.059 5.526a6.6 6.6 0 0 0 1.758-.236q.255.223.554.414c.784.51 1.626.768 2.512.768a.37.37 0 0 0 .355-.214.37.37 0 0 0-.03-.384 4.7 4.7 0 0 1-.857-1.958v.014z"
                        ></path>
                      </svg>{" "}
                      <span style={{ color: "black", marginLeft: "4px" }}>
                        {post.commentsCount}
                      </span>
                    </div>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link href={`/homePage/${post.id}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.content}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img
                      alt="Profile Image"
                      src={post.userImageUrl}
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href={""}>
                          <span className="absolute inset-0" />
                          {post.userFirstName} {post.userLastName}
                        </a>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="mt -8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            No Results Found for: {query}
          </h1>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            No Results Found for: {query}
          </h1>
          <p className="mt-4 text-center text-sm tracking-tight text-gray-600 sm:text-4xl">
            Make sure all words are spelled correctly.
          </p>

          <p className="text-center text-sm tracking-tight text-gray-600 sm:text-4xl">
            Try different keywords.
          </p>
          <p className="text-center text-sm tracking-tight text-gray-600 sm:text-4xl">
            {" "}
            Try more general keywords.
          </p>
        </div>
      )}
    </>
  );
}
