import HeaderLogo from "@components/common/headerLogo";
import Loader from "@components/common/loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  return (
    <>
      <>
        <section className="body-font text-gray-600">
          <div className="container mx-auto flex flex-col-reverse items-center px-7 py-24 md:flex-row">
            <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
              <h1 className="title-font mb-4 text-3xl font-medium text-gray-800 dark:text-white sm:text-4xl">
                Welcome to
                <br className="lg:inline-block" />
                <span className="font-bold underline underline-offset-8">
                  Quick Books
                </span>
              </h1>
              <span className="pb-3 text-sm italic text-gray-600 dark:text-gray-300">
                Your Ultimate Book Search App!
              </span>
              <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-300">
                Are you tired of spending hours searching for the perfect book?
                Look no further!{" "}
                <span className="font-medium italic">Quick Books</span> is here
                to save the day and transform your reading experience. Whether
                you&apos;re a bookworm, a casual reader, or simply curious about
                the literary world, our app is designed to help you discover,
                explore, and find your next favorite book in a matter of
                seconds. Get ready to embark on an exciting reading journey with{" "}
                <span className="font-medium italic">Quick Books</span>!
              </p>
              <div className="flex justify-center">
                <>
                  {status === "loading" ? (
                    <Loader />
                  ) : status === "authenticated" ? (
                    <button
                      onClick={() => {
                        router.push("/books");
                      }}
                      className="inline-flex rounded border-0 bg-[#111827] px-6 py-2 text-lg text-white hover:bg-[#2f3b54] focus:outline-none"
                    >
                      Search Book&apos;s
                    </button>
                  ) : (
                    status === "unauthenticated" && (
                      <>
                        <button
                          onClick={() => {
                            router.push("/signup");
                          }}
                          className="inline-flex rounded border-0 bg-[#111827] px-6 py-2 text-lg text-white hover:bg-[#2f3b54] focus:outline-none"
                        >
                          Let&apos;s Get Started
                        </button>
                        <button
                          onClick={() => {
                            router.push("/login");
                          }}
                          className="ml-4 inline-flex rounded border-2 border-transparent bg-gray-100 px-6 py-2 text-lg text-gray-700 hover:border-[#111827]  focus:outline-none"
                        >
                          Login
                        </button>
                      </>
                    )
                  )}
                </>
              </div>
            </div>
            <div className="w-5/6 rounded-lg border-2 py-5 max-sm:mb-8 md:w-1/2 md:py-20 lg:w-full lg:max-w-lg">
              <HeaderLogo />
            </div>
          </div>
        </section>
      </>
    </>
  );
}
