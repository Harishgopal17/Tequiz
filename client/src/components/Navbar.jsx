import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { DetailsContext } from "./../App";
import { navLinks } from "./../constants/constants";
import { FaUser } from "react-icons/fa6";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { GoCrossReference } from "react-icons/go";
import { MdContactMail } from "react-icons/md";

export default function Navbar() {
  const { isLoggedIn, theme, handleTheme } = useContext(DetailsContext);

  return (
    <nav className="w-full px-8 py-5 bg-transparent text-dark backdrop-blur-md border-b-[0.5px] border-lightest z-10 top-0 fixed dark:text-light">
      <div className="flex justify-between items-center max-container">
        <div>
          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            className="font-codystar font-bold text-2xl"
          >
            Tequiz
          </Link>
        </div>
        <ul className="flex justify-center items-center gap-16 max-sm:hidden">
          {navLinks.map((nav) => (
            <li key={nav.label} className="text-lg ">
              <NavLink
                to={`${nav.href}`}
                className="hover:text-dark-green transition-all duration-300"
              >
                {nav.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex justify-center items-center gap-8 sm:hidden">
          <li>
            <NavLink
              to={"/guide"}
              className="hover:text-dark-green transition-all duration-300"
            >
              <GoCrossReference size={20} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="hover:text-dark-green transition-all duration-300"
            >
              <MdContactMail size={20} />
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center gap-6">
          <button onClick={handleTheme}>
            {theme === "dark" ? (
              <MdSunny size={22} />
            ) : (
              <BsMoonStarsFill size={18} />
            )}
          </button>
          <div>
            {isLoggedIn ? (
              <Link to="/profile">
                <FaUser size={22} />
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-lg font-semibold border border-transparent bg-[#f3f3f3] hover:border hover:border-slate-black hover:bg-light px-3 py-2 rounded-md max-sm:text-base transition-all duration-300 dark:bg-dark-bg dark:hover:border-lightest dark:hover:bg-dark"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
