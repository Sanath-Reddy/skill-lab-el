import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { title: "About Us", url: "/about" },
    { title: "Blog", url: "/blog" },
    { title: "Campaigns", url: "/campaigns" },
    { title: "FAQ", url: "/faq" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: "#" },
    { icon: <FaTwitter />, url: "#" },
    { icon: <FaInstagram />, url: "#" },
    { icon: <FaLinkedin />, url: "#" },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200 text-gray-700 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-2">
            <FaHeart className="text-red-600 text-xl" />
            <Link to="/" className="text-xl font-bold text-gray-900">
              RaktConnect
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            A student skill lab initiative connecting voluntary donors with healthcare centers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">
            Quick Links
          </h4>
          <ul className="space-y-1 text-sm">
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.url} className="text-gray-600 hover:text-red-600">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">
            Follow Us
          </h4>
          <div className="flex space-x-4 text-lg text-gray-600">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="hover:text-red-600"
                aria-label="Social Link"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} RaktConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
