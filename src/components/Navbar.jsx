import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/m.png";
import Button from "./Button";

const SearchActions = ({ searchQuery, setSearchQuery, onFilter, onAddUser }) => (
  <>
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search employee..."
      aria-label="Search employee"
      className="w-full md:w-72 py-2 px-3 rounded-md border border-blue-600 placeholder:opacity-50 outline-none"
    />
    <div className="flex gap-2 mt-3 md:mt-0">
      <Button text="Filter" onClick={onFilter} type="button" />
      <Button text="Add User" onClick={onAddUser} type="button" />
    </div>
  </>
);

const Navbar = ({ searchQuery, setSearchQuery, onAddUser, onFilter }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-200 shadow-md py-4 flex justify-center relative z-50">
      <div className="w-11/12 flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-12 md:w-14" />

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-row items-center gap-3">
          <SearchActions
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onFilter={onFilter}
            onAddUser={onAddUser}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 left-0 w-full h-1/2 bg-gray-100 shadow-lg p-6 transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl focus:outline-none"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>
        <div
          className={`flex flex-col gap-4 transition-all duration-500 ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <SearchActions
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onFilter={onFilter}
            onAddUser={onAddUser}
          />
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
