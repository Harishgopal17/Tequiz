import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

import { guide } from "./../constants/constants.js";

export default function Guide() {
  return (
    <div
      id="guide"
      className="w-full flex flex-col container py-16 scroll-mt-[80px] max-xl:px-10 dark:text-light"
    >
      <div className="flex flex-col py-10">
        <h3 className="text-3xl font-bold pb-1">Learning Hub</h3>
        <h5 className="text-lightest">
          Handpicked resources to fuel your growth
        </h5>
      </div>
      <div className="flex flex-col gap-9">
        <p className="opacity-60 text-lg leading-8 max-sm:text-base max-sm:leading-7">
          Learning is a journey, and the right resources can make all the
          difference. Whether you're exploring new skills or mastering advanced
          concepts, we've curated the most reliable and beginner-friendly tools
          to guide you every step of the way. No matter your interests or goals,
          these resources are here to empower your growth and success.
        </p>

        <div className="flex flex-wrap gap-12 justify-between max-sm:flex-col max-sm:items-center max-sm:gap-7 ">
          {guide.map((el) => (
            <div
              key={el.heading}
              className="max-w-[300px] p-4 flex flex-col justify-center gap-3 rounded-xl shadow-sm cursor-pointer dark:bg-zinc-950"
            >
              <p className="text-xl font-medium">{el.heading}</p>
              <p className="text-[15px] max-sm:text-[14px]">{el.context}</p>
              <a
                href={el.url}
                target="_blank"
                className="text-[#4dabf7] flex gap-2 items-center"
              >
                <span>{el.urlname}</span>
                <FaExternalLinkAlt size={15} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
