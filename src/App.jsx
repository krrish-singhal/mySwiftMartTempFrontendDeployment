"use client";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Context from "./context/index";
import SummaryApi from "./common";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [olxCartCount, setOlxCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const darkMode = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newDark = !prev;
      document.documentElement.classList.toggle("dark", newDark);
      localStorage.setItem("theme", newDark ? "dark" : "light");
      return newDark;
    });
  };

  // Fetch current logged-in user
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method.toUpperCase(),
        credentials: "include", // ✅ include cookies
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
    }
  };

  // Fetch cart count
  const fetchCartCount = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method.toUpperCase(),
        credentials: "include", // ✅ include cookies
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.data?.count || 0);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
    }
  };

  // OLX cart count
  const loadOlxCartCount = () => {
    try {
      const savedCart = localStorage.getItem("olxCart");
      setOlxCartCount(savedCart ? JSON.parse(savedCart).length : 0);
    } catch (error) {
      console.error("Error loading OLX cart count:", error);
      setOlxCartCount(0);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchCartCount();
    loadOlxCartCount();

    window.updateOlxCartCount = (count) => setOlxCartCount(count);
    window.addEventListener("cart-updated", fetchCartCount);

    return () => {
      delete window.updateOlxCartCount;
      window.removeEventListener("cart-updated", fetchCartCount);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        cartProductCount: cartCount,
        fetchUserAddToCart: fetchCartCount,
        olxCartCount,
        user,
      }}
    >
      <div className="min-h-screen w-screen flex flex-col bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
        <Header
          cartCount={cartCount}
          olxCartCount={olxCartCount}
          user={user}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
        <main className="flex-grow w-screen max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </main>
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Context.Provider>
  );
}

export default App;
