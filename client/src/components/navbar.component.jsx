import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const MobileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white text-gray-600 z-50 transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer" onClick={() => navigate("/")}>
        <img
          alt="logo"
          src="https://assets.website-files.com/64ca974841739b6ec696173f/64d75492ab17a008282d7d31_Frame%201%20(7).png"
          className="w-10 h-10 rounded-full"
        />
        <span className="ml-3 font-bold text-xl">Proof Dao</span>
      </div>

      <ul className="p-4">
        <li>
          <Link to="/all-members" onClick={handleLinkClick}>
            All DAO Members
          </Link>
        </li>
        <li>
          <a href="https://www.reclaimprotocol.org/" onClick={handleLinkClick}>
            <button className="inline-flex cursor-pointer items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              🔗 Reclaim Protocol
            </button>
          </a>
        </li>
        {/* Add more mobile menu items as needed */}
      </ul>
    </div>
  );
};

export const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="text-gray-600 body-font border-b border-gray-300">
      <div className="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
        <div className=" flex  title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer  " onClick={() => navigate("/")} >
          <img
            alt="logo"
            src="https://assets.website-files.com/64ca974841739b6ec696173f/64d75492ab17a008282d7d31_Frame%201%20(7).png"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-3 font-bold text-xl">Proof Dao</span>
        </div>

        {/* Hamburger menu button */}
        <div className="md:hidden ml-auto cursor-pointer" onClick={toggleMobileMenu}>
          <div className="w-6 h-6">
            <div className="w-full h-1 bg-gray-700 my-1"></div>
            <div className="w-full h-1 bg-gray-700 my-1"></div>
            <div className="w-full h-1 bg-gray-700 my-1"></div>
          </div>
        </div>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/all-members" className="hidden md:block mr-5 hover:text-gray-900">
            All DAO Members
          </Link>
        </nav>
        <a href="https://www.reclaimprotocol.org" className="hidden md:block hover:text-gray-900">
          🔗 Reclaim Protocol
        </a>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  );
};
