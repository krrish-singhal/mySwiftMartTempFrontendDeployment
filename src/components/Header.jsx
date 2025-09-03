import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { FaUserCircle, FaShoppingCart, FaStore, FaShoppingBag } from "react-icons/fa";
import Logo from "./Logo";
import { toast } from "react-toastify";
import { setUserDetails, logout } from "../store/userSlice";
import Context from "../context/index";
import MysteryBoxIcon from "../pages/MysteryBoxIcon";
import ProfilePictureModal from "./ProfilePictureModal";
import ThemeToggle from "./ThemeToggle";
import SummaryApi from "../common/index";

const Header = ({ cartCount, olxCartCount, user, isDark, toggleTheme }) => {
  const reduxUser = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(Context);

  const [menuDisplay, setMenuDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [localOlxCartCount, setLocalOlxCartCount] = useState(0);

  // Fetch user details on mount if not in Redux
  useEffect(() => {
    if (!reduxUser?._id) {
      fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method.toUpperCase(),
        credentials: "include", // important for cookies/auth
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized or network error");
          return res.json();
        })
        .then((data) => {
          if (data.user) dispatch(setUserDetails(data.user));
        })
        .catch(() => {
          dispatch(logout());
        });
    }

    const savedCart = localStorage.getItem("olxCart");
    if (savedCart) setLocalOlxCartCount(JSON.parse(savedCart).length);

    window.updateOlxCartCount = (count) => setLocalOlxCartCount(count);
    return () => {
      delete window.updateOlxCartCount;
    };
  }, [reduxUser, dispatch]);

  // Close dropdown on route change
  useEffect(() => {
    setMenuDisplay(false);
  }, [location.pathname]);

  // Logout handler
  const handleLogout = async () => {
    try {
      const res = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method.toUpperCase(),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(logout());
        navigate("/");
      } else toast.error(data.message || "Logout failed");
    } catch (err) {
      toast.error("Network error during logout");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    navigate(e.target.value ? `/search?q=${e.target.value}` : `/search`);
  };

  const openProfileModal = () => {
    setProfileModalOpen(true);
    setMenuDisplay(false);
  };

  const isAdmin = reduxUser?.role === "admin";

  return (
    <>
      <header className="w-full h-16 shadow-md bg-white/90 dark:bg-[#101624] backdrop-blur-md fixed z-40 top-0 left-0 transition-colors duration-300">
        <div className="h-full max-w-7xl mx-auto flex items-center px-4 justify-between">
          <Link to="/"><Logo w={120} h={60} /></Link>

          {/* Search */}
          <div className="hidden lg:flex items-center w-full max-w-sm border border-blue-200 dark:border-blue-800 rounded-full pl-2 bg-white dark:bg-[#1b2336] transition-all duration-300">
            <input
              type="text"
              placeholder="Search product here..."
              className="w-full outline-none bg-transparent text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-2"
              onChange={handleSearch}
              value={search}
            />
            <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white hover:bg-blue-700 transition">
              <GrSearch />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

            {reduxUser?._id && (
              <>
                <Link to="/olx-marketplace" className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all">
                  <FaStore className="text-sm" /> <span className="hidden md:block">OLX Market</span>
                </Link>

                <Link to="/olx-cart" className="text-2xl relative">
                  <FaShoppingBag />
                  {localOlxCartCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
                      {localOlxCartCount}
                    </div>
                  )}
                </Link>

                <Link to="/mystery-box" className="px-3 py-1 flex items-center gap-2 rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transform transition duration-300 ease-in-out hover:scale-105 shadow">
                  <MysteryBoxIcon /> <span className="hidden lg:block">Mystery Box</span>
                </Link>

                <Link to="/cart" className="text-2xl relative">
                  <FaShoppingCart />
                  {cartCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </div>
                  )}
                </Link>
              </>
            )}

            {/* Profile */}
            <div className="relative flex justify-center">
              {reduxUser?._id ? (
                <div
                  className="cursor-pointer flex justify-center items-center w-10 h-10 relative group"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  {reduxUser.profilePic ? (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${reduxUser.profilePic}`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      onError={(e) => { e.target.src = "/default-profile.png"; }}
                    />
                  ) : reduxUser.name ? (
                    <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center font-semibold">
                      {reduxUser.name[0].toUpperCase()}
                    </div>
                  ) : (
                    <FaUserCircle className="text-gray-500 text-3xl" />
                  )}
                </div>
              ) : null}

              {/* Dropdown */}
              {menuDisplay && reduxUser?._id && (
                <div className="absolute bg-white dark:bg-[#1b2336] top-11 right-0 p-2 shadow-lg rounded z-50 w-52 border border-blue-100 dark:border-blue-800">
                  <nav className="flex flex-col text-sm">
                    {isAdmin && (
                      <>
                        <Link to="/admin-panel/all-products" className="hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded transition">Admin Panel</Link>
                        <Link to="/admin-panel/admin-products" className="hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded transition">OLX Approvals</Link>
                      </>
                    )}
                    <Link to="/order" className="hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded transition">My Orders</Link>
                    <Link to="/olx-purchases" className="hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded transition">My Purchases</Link>
                    <button onClick={openProfileModal} className="text-left hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded transition">Edit Profile Picture</button>
                  </nav>
                </div>
              )}
            </div>

            {/* Login/Logout */}
            {reduxUser?._id ? (
              <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition">
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Profile Picture Modal */}
      <ProfilePictureModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </>
  );
};

export default Header;
