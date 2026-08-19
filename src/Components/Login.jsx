import React, { useRef, useState } from "react";
import Header from "./Header";

import {
  Bg_Netflix_url,
  profileImage,
} from "../Utils/Constants";

import { checkValidData } from "../Utils/Validate";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../Utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";


const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");


  const dispatch = useDispatch();


  // ==========================================
  // INPUT REFERENCES
  // ==========================================

  const email = useRef(null);

  const password = useRef(null);

  const name = useRef(null);


  // ==========================================
  // SIGN IN / SIGN UP
  // ==========================================

  const handleButtonClick = async (e) => {

    e.preventDefault();


    const emailValue =
      email.current?.value.trim() || "";

    const passwordValue =
      password.current?.value.trim() || "";

    const nameValue =
      name.current?.value.trim() || "";


    // ==========================================
    // VALIDATION
    // ==========================================

    const message = checkValidData(
      emailValue,
      passwordValue,
      nameValue,
      isSignInForm
    );


    if (message) {

      setErrorMessage(message);

      return;
    }


    setErrorMessage("");


    try {

      // ==========================================
      // SIGN UP
      // ==========================================

      if (!isSignInForm) {

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            emailValue,
            passwordValue
          );


        const firebaseUser =
          userCredential.user;


        // Update Firebase Profile

        await updateProfile(
          firebaseUser,
          {
            displayName: nameValue,
            photoURL: profileImage,
          }
        );


        // Refresh Firebase user

        await firebaseUser.reload();


        const updatedUser =
          auth.currentUser;


        // Store User in Redux

        dispatch(
          addUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
          })
        );


        return;
      }


      // ==========================================
      // SIGN IN
      // ==========================================

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );


      const firebaseUser =
        userCredential.user;


      // Store User in Redux

      dispatch(
        addUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        })
      );

    } catch (error) {

      console.error(
        "Firebase Error:",
        error.code
      );


      // ==========================================
      // FIREBASE ERROR HANDLING
      // ==========================================

      switch (error.code) {

        case "auth/invalid-credential":

          setErrorMessage(
            "Invalid email or password."
          );

          break;


        case "auth/email-already-in-use":

          setErrorMessage(
            "This email is already registered."
          );

          break;


        case "auth/weak-password":

          setErrorMessage(
            "Password must be at least 6 characters."
          );

          break;


        case "auth/invalid-email":

          setErrorMessage(
            "Please enter a valid email address."
          );

          break;


        case "auth/user-not-found":

          setErrorMessage(
            "No account found with this email."
          );

          break;


        case "auth/wrong-password":

          setErrorMessage(
            "Incorrect password."
          );

          break;


        case "auth/network-request-failed":

          setErrorMessage(
            "Network error. Please check your internet connection."
          );

          break;


        default:

          setErrorMessage(
            "Authentication failed. Please try again."
          );

      }

    }

  };


  // ==========================================
  // TOGGLE SIGN IN / SIGN UP
  // ==========================================

  const toggleSignInForm = () => {

    setIsSignInForm(
      (previous) => !previous
    );

    setErrorMessage("");

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-black
      "
    >

      {/* =====================================
          BACKGROUND
      ====================================== */}

      <img
        className="
          fixed
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
        src={Bg_Netflix_url}
        alt="Netflix background"
      />


      {/* =====================================
          DARK OVERLAY
      ====================================== */}

      <div
        className="
          fixed
          inset-0
          bg-black/60

          sm:bg-black/65
        "
      />


      {/* =====================================
          HEADER
      ====================================== */}

      <Header />


      {/* =====================================
          LOGIN CONTAINER
      ====================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          items-center
          justify-center

          px-4
          pb-8
          pt-24

          sm:px-6
          sm:pb-10

          md:px-8

          lg:px-10
        "
      >

        {/* =====================================
            LOGIN FORM
        ====================================== */}

        <form
          onSubmit={handleButtonClick}
          className="
            w-full
            max-w-sm
            rounded-lg
            bg-black/80
            p-6
            shadow-2xl
            backdrop-blur-sm

            sm:max-w-md
            sm:p-8

            md:p-9

            lg:max-w-md
            lg:p-10

            xl:max-w-lg
          "
        >

          {/* =====================================
              HEADING
          ====================================== */}

          <h1
            className="
              mb-6
              text-2xl
              font-bold
              text-white

              sm:mb-7
              sm:text-3xl

              md:text-4xl
            "
          >
            {isSignInForm
              ? "Sign In"
              : "Sign Up"}
          </h1>


          {/* =====================================
              NAME
          ====================================== */}

          {!isSignInForm && (

            <input
              ref={name}
              type="text"
              placeholder="Full Name"

              className="
                mb-4
                w-full
                rounded
                border
                border-transparent
                bg-gray-700/90

                px-4
                py-3

                text-sm
                text-white

                placeholder-gray-400

                outline-none

                transition-all
                duration-200

                focus:border-red-600
                focus:bg-gray-700
                focus:ring-1
                focus:ring-red-600

                sm:py-4
                sm:text-base
              "
            />

          )}


          {/* =====================================
              EMAIL
          ====================================== */}

          <input
            ref={email}
            type="email"
            placeholder="Email Address"

            autoComplete="email"

            className="
              mb-4
              w-full
              rounded
              border
              border-transparent
              bg-gray-700/90

              px-4
              py-3

              text-sm
              text-white

              placeholder-gray-400

              outline-none

              transition-all
              duration-200

              focus:border-red-600
              focus:bg-gray-700
              focus:ring-1
              focus:ring-red-600

              sm:py-4
              sm:text-base
            "
          />


          {/* =====================================
              PASSWORD
          ====================================== */}

          <input
            ref={password}
            type="password"
            placeholder="Password"

            autoComplete={
              isSignInForm
                ? "current-password"
                : "new-password"
            }

            className="
              mb-4
              w-full
              rounded
              border
              border-transparent
              bg-gray-700/90

              px-4
              py-3

              text-sm
              text-white

              placeholder-gray-400

              outline-none

              transition-all
              duration-200

              focus:border-red-600
              focus:bg-gray-700
              focus:ring-1
              focus:ring-red-600

              sm:py-4
              sm:text-base
            "
          />


          {/* =====================================
              ERROR MESSAGE
          ====================================== */}

          {errorMessage && (

            <div
              className="
                mb-4
                rounded
                border
                border-red-500/30
                bg-red-500/10
                px-3
                py-2
              "
            >

              <p
                className="
                  text-xs
                  font-semibold
                  leading-relaxed
                  text-red-400

                  sm:text-sm
                "
              >
                {errorMessage}
              </p>

            </div>

          )}


          {/* =====================================
              SUBMIT BUTTON
          ====================================== */}

          <button
            type="submit"

            className="
              w-full
              rounded
              bg-red-600

              py-3

              text-sm
              font-semibold
              text-white

              shadow-lg

              transition-all
              duration-200

              hover:bg-red-700
              active:scale-[0.98]

              sm:py-3.5
              sm:text-base

              md:text-lg
            "
          >
            {isSignInForm
              ? "Sign In"
              : "Sign Up"}
          </button>


          {/* =====================================
              TOGGLE
          ====================================== */}

          <p
            onClick={toggleSignInForm}

            className="
              mt-5
              cursor-pointer
              text-center
              text-xs
              text-gray-400

              transition-colors
              duration-200

              hover:text-white

              sm:mt-6
              sm:text-sm

              md:text-base
            "
          >
            {isSignInForm
              ? "New here? Sign Up Now"
              : "Already registered? Sign In"}
          </p>


          {/* =====================================
              SMALL FOOTER TEXT
          ====================================== */}

          <p
            className="
              mt-5
              text-center
              text-[10px]
              leading-relaxed
              text-gray-500

              sm:text-xs
            "
          >
            This page is protected by Firebase
            authentication.
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;