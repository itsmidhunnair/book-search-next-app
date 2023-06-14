import useScrollTo from "@hooks/useScrollTo";
import React from "react";
import { BiArrowToTop } from "react-icons/bi";

const ScrollToTopBtn = () => {
  const { scrollToTop } = useScrollTo();
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 rounded-md bg-gray-700 p-1 dark:bg-white max-md:bottom-5 max-md:right-5`}
    >
      <BiArrowToTop className="text-3xl text-white dark:text-gray-800" />
    </button>
  );
};

export default ScrollToTopBtn;
