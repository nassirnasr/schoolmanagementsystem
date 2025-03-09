"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// A simple full-screen loading spinner
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mySkyLight to-myPurpleLight p-4">
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
  </div>
);

const LoginPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const role = user?.publicMetadata.role;
      if (role) {
        router.push(`/${role}`);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  // While Clerk is loading the user state, show the loading spinner.
  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center bg-gradient-to-br from-mySkyLight to-myPurpleLight p-4 sm:p-6 md:p-8">
      {/* Left Side - Only visible on larger screens */}
      <div className="hidden sm:flex flex-col items-center justify-center sm:w-1/2 p-8">
        <Image
          src="/icon.png"
          alt="School Logo"
          width={200}
          height={200}
          className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
        />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mt-6 text-center">
          Shule System
        </h2>
        <p className="text-gray-600 mt-4 text-center max-w-md">
          Simplify school operations for primary & secondary education with our
          all-in-one management system.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full sm:w-1/2 max-w-md px-4 sm:px-6">
        <SignIn.Root>
          <SignIn.Step name="start" className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
            {/* Mobile Logo - Only visible on small screens */}
            <div className="flex sm:hidden items-center justify-center mb-6">
              <Image
                src="/icon.png"
                alt="Logo"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Please login to your account
              </p>
            </div>

            <Clerk.GlobalError className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm" />

            <div className="space-y-6">
              {/* Username Field */}
              <Clerk.Field name="identifier">
                <Clerk.Label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </Clerk.Label>
                <Clerk.Input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-myPurple focus:border-transparent transition duration-200 outline-none text-base"
                />
                <Clerk.FieldError className="text-red-500 text-sm mt-1" />
              </Clerk.Field>

              {/* Password Field */}
              <Clerk.Field name="password">
                <div className="flex items-center justify-between mb-1">
                  <Clerk.Label className="block text-sm font-medium text-gray-700">
                    Password
                  </Clerk.Label>
                  <button
                    className="text-sm text-myPurple hover:text-purple-700 transition duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add your forgot password logic here
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Clerk.Input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-myPurple focus:border-transparent transition duration-200 outline-none text-base pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <Clerk.FieldError className="text-red-500 text-sm mt-1" />
              </Clerk.Field>

              {/* Submit Button */}
              <SignIn.Action
                submit
                className="w-full bg-myPurple hover:bg-purple-600 text-white font-medium py-3 rounded-lg transition duration-200 flex items-center justify-center text-base"
              >
                Login
              </SignIn.Action>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Protected by SSL Security</p>
            </div>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
};

export default LoginPage;
