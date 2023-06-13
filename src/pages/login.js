import { MdAlternateEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";

import HeaderLogo from "@components/common/headerLogo";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@constants/schema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const { login } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-2">
      <div className="w-50 flex max-w-md flex-col rounded-3xl bg-white px-4 py-8 shadow-md sm:px-6 md:px-8 lg:px-10">
        <div className="border-b-2 mb-3">
          <HeaderLogo mode="light"/>
        </div>
        <div className="self-center text-xl font-medium text-gray-800 sm:text-3xl">
          Log in Now
        </div>
        <div className="mt-4 self-center text-xl text-gray-800 sm:text-sm">
          Enter your credentials to get access account
        </div>
        <div className="mt-6">
          <form onSubmit={handleSubmit(login)}>
            <div className="mb-5 flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div
                  className="
              absolute
              left-0
              top-0
              inline-flex
              h-full
              w-10
              items-center
              justify-center
              text-gray-400
            "
                >
                  <span className="text-blue-600">
                    <MdAlternateEmail />
                  </span>
                </div>
                <input
                  type="email"
                  {...register("email")}
                  name="email"
                  className="
              w-full
              rounded-2xl
              border
              border-gray-400
              py-2
              pl-10 pr-4
              text-sm
              placeholder-gray-500
              focus:border-blue-400 focus:outline-none
            "
                  placeholder="Enter your email"
                />
              </div>
              <span className="text-sm text-red-800">
                {errors.email?.message}
              </span>
            </div>
            <div className="mb-6 flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm"
              >
                Password:
              </label>
              <div className="relative">
                <div
                  className="
              absolute
              left-0
              top-0
              inline-flex
              h-full
              w-10
              items-center
              justify-center
              text-gray-400
            "
                >
                  <span className=" text-blue-600">
                    <AiFillLock />
                  </span>
                </div>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  className="
              w-full
              rounded-2xl
              border
              border-gray-400
              py-2
              pl-10 pr-4
              text-sm
              placeholder-gray-500
              focus:border-blue-400 focus:outline-none
            "
                  placeholder="Enter your password"
                />
              </div>
              <span className="text-sm text-red-800">
                {errors.password?.message}
              </span>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="
            mt-2
            flex
            w-full
            items-center
            justify-center
            rounded-2xl bg-blue-600
            py-2
            text-sm
            text-white
            transition
            duration-150
            ease-in
            hover:bg-blue-600
            focus:outline-none
            sm:text-base
          "
              >
                <span className="mr-2 uppercase">Log in</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center">
        <Link
          href="/signup"
          target="_blank"
          className="
      inline-flex
      items-center
      text-center
      text-xs
      font-medium text-gray-700
    "
        >
          <span className="ml-2 text-gray-400">
            Don&apos;t have an account?
          </span>
        </Link>
        <Link
          href="/signup"
          className="ml-2 text-xs font-semibold text-blue-500"
        >
          Signup here
        </Link>
      </div>
    </div>
  );
};

export default Login;
