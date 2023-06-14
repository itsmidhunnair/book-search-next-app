import HeaderLogo from "@components/common/headerLogo";

export default function Home() {
  return (
    <>
      <>
        <section className="body-font text-gray-600">
          <div className="container mx-auto flex flex-col items-center px-7 py-24 md:flex-row">
            <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
              <h1 className="title-font mb-4 text-3xl font-medium text-gray-800 sm:text-4xl">
                Welcome to
                <br className="hidden lg:inline-block" />
                <span className="font-bold underline underline-offset-8">
                  Just Do It
                </span>
              </h1>
              <p className="mb-8 leading-relaxed">
                Stay organized and boost your productivity with{" "}
                <span className="italic">Just Do It</span>, the perfect
                companion to manage all your tasks efficiently. Whether
                you&apos;re a busy professional, a student, or someone juggling
                multiple responsibilities,
                <span className="italic"> Just Do It</span> has got you covered.
              </p>
              <div className="flex justify-center">
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
              </div>
            </div>
            <div className="w-5/6 rounded-lg border-2 md:w-1/2 md:py-20 lg:w-full lg:max-w-lg">
              <HeaderLogo />
            </div>
          </div>
        </section>
      </>
    </>
  );
}
