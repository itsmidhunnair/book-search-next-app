import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { BsMoonStars } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";

const MobileNav = ({ setDark, dark }) => {
  const { status, data } = useSession();
  return (
    <div className="fixed top-[78px] z-40 flex w-full items-center justify-between bg-neutral-100 py-2 shadow-md shadow-black/5 dark:bg-gray-800 dark:shadow-black/10 md:hidden lg:flex-wrap lg:justify-start lg:py-4">
      {status === "authenticated" && (
        <div
          className="relative flex w-full items-center justify-between px-4"
          data-te-dropdown-ref=""
        >
          {/* Second dropdown trigger */}
          <div
            className="hidden-arrow flex items-center whitespace-nowrap rounded-lg border-2 border-gray-500 p-2 transition duration-150 ease-in-out motion-reduce:transition-none"
            id="dropdownMenuButton2"
            role="button"
            data-te-dropdown-toggle-ref=""
            aria-expanded="false"
          >
            {/* User Name */}
            <span className="pr-3 dark:text-gray-100">{data.user.name}</span>
            {/* User avatar */}
            <div className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-500">
              {data?.user?.image ? (
                <Image
                  src={data?.user?.image}
                  alt=""
                  className="overflow-hidden object-cover"
                />
              ) : (
                // <img
                //   src={data?.user?.image}
                //   alt=""
                //   className=""
                // />
                <span className="text-2xl font-semibold uppercase text-gray-800">
                  {data?.user.name[0]}
                </span>
              )}
            </div>
          </div>
          <div className="ml-5 rounded-full border-2 border-gray-700 px-1 pt-1">
            <button onClick={() => setDark(!dark)}>
              {dark ? (
                <HiOutlineLightBulb className="text-xl text-white" />
              ) : (
                <BsMoonStars className="text-lg" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
