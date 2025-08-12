"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails, setToken } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleAuthButton = ({ text = "Continue with Google" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL || "https://swift-mart-backend.onrender.com";

  const handleGoogleResponse = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google authentication failed: No credentials received");
        return;
      }

      const result = await fetch(`${API_URL}/api/google-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
        credentials: "include",
      });

      const data = await result.json();

      if (data.success) {
        toast.success(data.message || "Successfully signed in with Google");

        dispatch(setUserDetails(data.user));
        dispatch(setToken(data.token));
        localStorage.setItem("token", data.token);

        navigate("/");
      } else {
        toast.error(data.message || "Failed to sign in with Google");
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error("Something went wrong with Google authentication");
    }
  };

  useEffect(() => {
    const loadGoogleScript = () => {
      if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        initializeGoogleSignIn();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      script.onerror = () => {
        toast.error("Failed to load Google Sign-In. Please disable ad-blockers and try again.");
      };
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (window.google) {
        try {
          // Prevent duplicate button rendering
          const buttonContainer = document.getElementById("google-signin-button");
          if (buttonContainer?.childNodes.length > 0) return;

          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          window.google.accounts.id.renderButton(buttonContainer, {
            theme: "outline",
            size: "large",
            width: 240,
            text: text === "Sign up with Google" ? "signup_with" : "signin_with",
          });
        } catch (error) {
          console.error("Google Sign-In initialization error:", error);
          toast.error("Google Sign-In failed to initialize");
        }
      }
    };

    loadGoogleScript();

    return () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.cancel();
        } catch (error) {
          console.error("Error during cleanup:", error);
        }
      }

      // Optional: Remove script to avoid duplication
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) script.remove();
    };
  }, [text]);

  return (
    <div className="w-full">
      <div
        id="google-signin-button"
        className="flex items-center justify-center gap-2 bg-white border border-gray-300 p-2 rounded-full w-full hover:bg-gray-50 transition-all cursor-pointer"
      ></div>
    </div>
  );
};

export default GoogleAuthButton;
