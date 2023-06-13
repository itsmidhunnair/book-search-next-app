import React from "react";
import { SiQuickbooks } from "react-icons/si";

const HeaderLogo = ({ mode = "dark" }) => {
  return (
    <div className="pb-3 flex items-center justify-center">
      <SiQuickbooks
        className={`text-5xl text-gray-800 ${
          mode === "dark" && "dark:text-gray-50"
        }`}
      />
      <span
        className={`pl-2 text-2xl font-black text-gray-800 ${
          mode === "dark" && "dark:text-gray-50"
        }`}
      >
        Quick Books
      </span>
    </div>
  );
};

export default HeaderLogo;
