import useAuth from "@hooks/useAuth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SiQuickbooks } from "react-icons/si";

const Header = ({setDark}) => {
  const { data, status } = useSession();
  const { logout } = useAuth();
  return (
    <nav
      className="flex-no-wrap sticky top-0 z-50 flex w-full items-center justify-between bg-neutral-100 py-2 shadow-md shadow-black/5 dark:bg-gray-800 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
      data-te-navbar-ref=""
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        {/* Hamburger button for mobile view */}
        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init=""
          data-te-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* Hamburger icon */}
          <span className="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        {/* Collapsible navigation container */}
        <div
          className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent1"
          data-te-collapse-item=""
        >
          {/* Logo */}
          <Link
            className="mb-4 mr-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            href="/"
          >
            <SiQuickbooks className="text-3xl" />
            <span className="pl-3 text-lg font-semibold">Quick Books</span>
          </Link>
        </div>
        {/* Right elements */}
        <div className="relative flex items-center">
          {/* Second dropdown container */}
          {status === "authenticated" && (
            <div className="relative flex" data-te-dropdown-ref="">
              <input type="checkbox" onChange={(e)=>setDark(e.target.checked)} />
              {/* Second dropdown trigger */}
              <a
                className="hidden-arrow flex items-center whitespace-nowrap rounded-lg border-2 border-gray-500 p-2 transition duration-150 ease-in-out motion-reduce:transition-none"
                href="#"
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
              </a>
              <button
                onClick={() => {
                  logout();
                }}
                className="ml-5 mt-0 inline-flex items-center rounded border-0 bg-gray-600 px-3 py-1 text-base text-white hover:bg-gray-500 focus:outline-none"
              >
                Log Out
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="ml-1 h-4 w-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
