import { useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate, useLocation } from "react-router-dom";

const PatientNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/patient/dashboard" },
    { label: "Requests", path: "/patient/requests" },
    { label: "Haemoglobin Predictor", path: "/patient/haemoglobin" },
    { label: "Disease Checker", path: "/patient/disease" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link to="/patient/dashboard" className="flex items-center gap-2 font-bold text-lg text-red-600">
          <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
          RaktConnect <span className="text-xs font-normal text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded">Patient</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`hover:text-red-600 ${isActive ? "text-red-600 font-semibold" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            to="/patient/profile"
            className="text-gray-600 hover:text-red-600 flex items-center gap-1"
            title="Profile"
          >
            <FaUserCircle size={18} />
            <span className="text-xs">Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-gray-500 hover:text-red-600 text-xs border border-gray-300 rounded px-2.5 py-1"
            title="Logout"
          >
            <TbLogout size={16} />
            <span>Logout</span>
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-1.5 text-gray-700 border border-gray-300 rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2 text-sm text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="block py-1 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/patient/profile"
            className="block py-1 hover:text-red-600"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="w-full text-left py-1 text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default PatientNavbar;
