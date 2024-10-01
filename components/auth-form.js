"use client";
import Link from "next/link";
import { auth } from "@/actions/auth";
import { useFormState } from "react-dom";

export default function AuthForm({ mode }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="icon.jpg"
            className="mx-auto h-30 w-60 rounded-lg"
          /> */}
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
            {mode === "login" ? "Sign in to your account" : "Make an account!"}
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            {mode === "signup" && (
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-base font-medium leading-6 text-white-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="userFirstName"
                    type="text"
                    required
                    className="block w-full bg-gray-800 rounded-md border-0 py-1.5 pl-3 antialiased text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-800 font-medium placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
            {mode === "signup" && (
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-base font-medium leading-6 text-white-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="userLastName"
                    type="text"
                    required
                    className="block text-lg w-full bg-gray-800 rounded-md border-0 py-1.5 pl-3 antialiased text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-800 font-medium placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium leading-6 text-white-700"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full bg-gray-800 rounded-md border-0 py-1.5 pl-3 antialiased text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-800 font-medium placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base font-medium leading-6 text-white-800"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full bg-gray-800 rounded-md border-0 py-1.5 pl-3 antialiased text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-800 font-medium placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {formState.errors && (
              <ul style={{ color: "red" }}>
                {Object.keys(formState.errors).map((error) => (
                  <li key={error}>{formState.errors[error]}</li>
                ))}
              </ul>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white-500 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {mode === "login" ? "Login" : "Create Account"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-m text-gray-500">
            {mode === "login" ? `Not a User?${" "}` : ""}
            {mode === "login" && (
              <Link
                href="/Authenticate/?mode=signup"
                className="font-semibold leading-6 text-indigo-400 hover:text-indigo-500"
              >
                Register
              </Link>
            )}

            {mode === "signup" && (
              <Link
                href="/Authenticate/?mode=login"
                className="font-semibold leading-6 text-indigo-400 hover:text-indigo-500"
              >
                Login with an existing account
              </Link>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
