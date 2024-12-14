import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <header
      id="home"
      className="w-full h-screen flex justify-center items-center bg-light  text-dark dark:bg-dark dark:text-light"
    >
      <div className="flex flex-col justify-center items-center gap-6 sm:px-10">
        <h2 className="text-4xl font-bold max-sm:text-[36px]">
          Unlock the <br className="sm:hidden" /> genius within you
        </h2>
        <h3 className="text-3xl max-sm:text-2xl">Challenge. Learn. Win.</h3>
        <div className="flex gap-6">
          <Link
            to="/signup"
            className="px-3 py-2 text-lg font-medium bg-slate-black text-light hover:bg-dark-bg  transition-all duration-300 dark:bg-light dark:text-dark dark:hover:bg-slate-300"
          >
            Get started
          </Link>
          <Link
            to="/guide"
            className="px-3 py-2 border text-lg font-medium text-slate-black border-slate-black hover:bg-[#f0f0f0] transition-all duration-300 dark:text-slate-50 dark:hover:bg-dark dark:hover:border-light"
          >
            Learn more
          </Link>
        </div>
      </div>
    </header>
  );
}
