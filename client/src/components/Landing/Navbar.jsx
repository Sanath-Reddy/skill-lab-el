import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTheme } from "../../ThemeContext";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import PageMeta from "../common/PageMeta";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    const checkAuthStatus = () => {
      const authToken = localStorage.getItem("authToken");
      const storedUserType = localStorage.getItem("userType");

      if (authToken && storedUserType) {
        setIsLoggedIn(true);
        setUserType(storedUserType);
      } else {
        setIsLoggedIn(false);
        setUserType("");
      }
    };

    window.addEventListener("popstate", updatePath);
    updatePath();
    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("popstate", updatePath);
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const navItems = ["banks", "eligibility", "about", "campaigns", "FAQ", "contact"];

  const getNavPath = (item) => {
    return item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#4b5563",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        setIsLoggedIn(false);
        setUserType("");
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out!",
          timer: 1500,
          showConfirmButton: false
        });
        navigate("/");
      }
    });
  };

  return (
    <>
      <PageMeta title="Navbar | RaktConnect" />

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-red-600"
            onClick={() => setCurrentPath("/")}
          >
            <span className="w-4 h-4 rounded-full bg-red-600 inline-block"></span>
            RaktConnect
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            {navItems.map((item) => {
              const navPath = getNavPath(item);
              const isActive = currentPath === navPath;
              return (
                <Link
                  key={item}
                  to={navPath}
                  className={`hover:text-red-600 ${isActive ? "text-red-600 font-semibold" : ""}`}
                  onClick={() => setCurrentPath(navPath)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 text-gray-600 hover:text-gray-900 border border-gray-300 rounded"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon size={14} /> : <FaSun size={14} />}
            </button>

            {/* Auth Button */}
            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded font-medium"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 uppercase font-semibold">
                  {userType}
                </span>
                <button
                  onClick={handleLogout}
                  className="border border-red-600 text-red-600 hover:bg-red-50 text-sm px-3 py-1 rounded font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-700 border border-gray-300 rounded"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2 text-sm font-medium text-gray-700">
            {navItems.map((item) => {
              const navPath = getNavPath(item);
              return (
                <Link
                  key={item}
                  to={navPath}
                  className="block py-1 hover:text-red-600"
                  onClick={() => {
                    setIsOpen(false);
                    setCurrentPath(navPath);
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={toggleTheme}
                className="p-1.5 text-gray-600 border border-gray-300 rounded text-xs"
              >
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>

              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogin();
                  }}
                  className="bg-red-600 text-white px-4 py-1.5 rounded text-xs font-medium"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="border border-red-600 text-red-600 px-3 py-1 rounded text-xs font-medium"
                >
                  Logout ({userType})
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
