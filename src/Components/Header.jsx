import React, { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { auth } from "../Utils/firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import {
  Netflix_Logo,
  SUPPORTED_LANGUAGES,
} from "../Utils/Constants";
import { toggleGptSearchView } from "../Utils/GptSlice";
import { changeLanguage } from "../Utils/ConfigureSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector(
    (store) => store.gpt.showGptSearch
  );

  // Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);

      console.log("User signed out successfully");

      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);

      alert("Unable to sign out. Please try again.");
    }
  };

  // GPT Search Toggle
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  // Authentication Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );

        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  // Language Change
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div
        className="
          w-full
          bg-gradient-to-b
          from-black/95
          via-black/60
          to-transparent
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[70px]
            w-full
            max-w-screen-2xl
            items-center
            justify-between
            gap-2
            px-3
            py-3

            sm:px-5
            sm:py-4

            md:px-8

            lg:px-10
            lg:py-5

            xl:px-12
          "
        >
          {/* =========================
              NETFLIX LOGO
          ========================== */}

          <img
            src={Netflix_Logo}
            alt="Netflix Logo"
            className="
              w-24
              shrink-0
              object-contain

              sm:w-28

              md:w-36

              lg:w-40

              xl:w-44
            "
          />

          {/* =========================
              RIGHT SIDE
          ========================== */}

          {user && (
            <div
              className="
                flex
                min-w-0
                flex-wrap
                items-center
                justify-end
                gap-1

                sm:gap-2

                md:gap-3

                lg:gap-4
              "
            >
              {/* =========================
                  LANGUAGE SELECT
              ========================== */}

              {showGptSearch && (
                <select
                  onChange={handleLanguageChange}
                  className="
                    h-8
                    max-w-[100px]
                    rounded
                    border
                    border-gray-600
                    bg-gray-900
                    px-1
                    text-xs
                    text-white
                    outline-none

                    focus:border-white

                    sm:h-9
                    sm:max-w-[120px]
                    sm:px-2
                    sm:text-sm

                    md:h-10
                    md:max-w-[140px]
                    md:px-3
                    md:text-base

                    lg:max-w-[160px]
                  "
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option
                      key={lang.indentifier}
                      value={lang.indentifier}
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}

              {/* =========================
                  GPT SEARCH BUTTON
              ========================== */}

              <button
                onClick={handleGptSearchClick}
                className="
                  h-8
                  whitespace-nowrap
                  rounded
                  bg-purple-800
                  px-2
                  text-xs
                  font-medium
                  text-white
                  transition
                  duration-200
                  hover:bg-purple-700

                  sm:h-9
                  sm:px-3
                  sm:text-sm

                  md:h-10
                  md:px-4
                  md:text-base

                  lg:px-5
                "
              >
                {/* Mobile */}
                <span className="sm:hidden">
                  {showGptSearch ? "Home" : "GPT"}
                </span>

                {/* Tablet + Desktop */}
                <span className="hidden sm:inline">
                  {showGptSearch ? "Home Page" : "GPT Search"}
                </span>
              </button>

              {/* =========================
                  PROFILE IMAGE
              ========================== */}

              <img
                src={
                  user.photoURL ||
                  "https://via.placeholder.com/40"
                }
                alt="Profile"
                className="
                  h-7
                  w-7
                  shrink-0
                  rounded-full
                  border
                  border-gray-500
                  object-cover

                  sm:h-8
                  sm:w-8

                  md:h-9
                  md:w-9

                  lg:h-10
                  lg:w-10
                "
              />

              {/* =========================
                  SIGN OUT BUTTON
              ========================== */}

              <button
                onClick={handleSignOut}
                className="
                  h-8
                  whitespace-nowrap
                  rounded
                  bg-red-600
                  px-2
                  text-xs
                  font-medium
                  text-white
                  transition
                  duration-200
                  hover:bg-red-700

                  sm:h-9
                  sm:px-3
                  sm:text-sm

                  md:h-10
                  md:px-4
                  md:text-base

                  lg:px-5
                "
              >
                {/* Mobile */}
                <span className="sm:hidden">
                  Sign Out
                </span>

                {/* Tablet + Desktop */}
                <span className="hidden sm:inline">
                  Sign Out
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;