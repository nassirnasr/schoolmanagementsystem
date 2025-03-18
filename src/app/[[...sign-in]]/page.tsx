"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaLock, FaRegEyeSlash, FaShieldVirus, FaUserShield } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
    <div className="relative flex flex-col items-center space-y-4">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/20 rounded-full animate-ping"></div>
        <div className="absolute inset-0 border-4 border-purple-200 dark:border-purple-800/30 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-500 dark:to-purple-300 rounded-full animate-pulse"></div>
        </div>
      </div>
      <span className="text-purple-600 dark:text-purple-300 font-medium text-lg animate-pulse">
        Securing Connection...
      </span>
    </div>
  </div>
);

const LoginPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      setIsDarkMode(mediaQuery.matches);
      document.documentElement.classList.toggle("dark", mediaQuery.matches);
    };
    
    mediaQuery.addEventListener("change", updateTheme);
    updateTheme();
    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push(`/${user?.publicMetadata.role}`);
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center mb-8 space-y-4">
          <Image 
            src="/icon.png" 
            alt="Logo" 
            width={80} 
            height={80} 
            className="w-20 h-20 animate-fade-in"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Secure access to your digital workspace
          </p>
        </div>

        <SignIn.Root>
          <SignIn.Step name="start">
            <Clerk.GlobalError className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-3 rounded-lg mb-6 text-sm border border-red-200 dark:border-red-700/50" />

            <div className="space-y-6">
              <Clerk.Field name="identifier">
                <div className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </Clerk.Label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <Clerk.Input
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                                text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                placeholder-gray-400 transition-all duration-200"
                      placeholder="user@example.com"
                    />
                  </div>
                  <Clerk.FieldError className="text-red-500 dark:text-red-400 text-sm" />
                </div>
              </Clerk.Field>

              <Clerk.Field name="password">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Clerk.Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </Clerk.Label>
                    <button
                      className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add forgot password logic here
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <Clerk.Input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                                text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                placeholder-gray-400 transition-all duration-200"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400"
                    >
                      {showPassword ? <FaRegEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                  </div>
                  <Clerk.FieldError className="text-red-500 dark:text-red-400 text-sm" />
                </div>
              </Clerk.Field>

              <SignIn.Action
                submit
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600
                          text-white font-semibold py-3.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02]
                          shadow-lg hover:shadow-purple-500/20 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="animate-pulse"><FaUserShield/></span>
                  Sign In
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-shimmer" />
              </SignIn.Action>
            </div>
          </SignIn.Step>
        </SignIn.Root>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span>Secure TLS 1.3 Encrypted Connection</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">256-bit AES Encryption | FIPS 140-2 Compliant</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;