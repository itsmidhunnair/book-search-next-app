import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { client } from "src/graphql/client";
import { book } from "src/graphql/query";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Loader from "@components/common/loader";

const Book = ({ book }) => {
  const [fullContent, setFullContent] = useState(false);

  const router = useRouter();

  const description = fullContent
    ? book?.book?.volumeInfo?.description
    : book?.book?.volumeInfo?.description?.slice(0, 400) + "...";

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <section className="body-font container mx-auto overflow-hidden bg-white text-gray-700 dark:bg-gray-800 dark:text-white md:mt-5">
      <div className="container mx-auto px-5 py-12">
        <div className="mx-auto flex flex-wrap items-start">
          <div className="relative h-96 w-full md:w-1/3">
            <button
              onClick={() => {
                router.back();
              }}
              className="absolute -left-3 -top-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-600"
            >
              <MdArrowBackIos className="pl-1 text-white" />
            </button>
            <Image
              alt="book"
              fill
              className=" mx-auto w-72 rounded object-contain object-center"
              src={book?.book?.volumeInfo?.imageLinks?.thumbnail}
            />
          </div>
          <div className="mt-6 w-full lg:mt-0 lg:w-2/3 lg:pl-10">
            <h2 className="title-font text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {book?.book?.volumeInfo?.publisher}
            </h2>
            <h1 className="title_underline title-font mb-1 text-3xl font-medium text-gray-900 dark:text-white">
              {book?.book?.volumeInfo?.title}
            </h1>
            <div className="mb-4 mt-4 flex">
              <Rating
                size={20}
                allowFraction={true}
                initialValue={book?.book?.volumeInfo?.averageRating}
                readonly={true}
              />
              <span className="ml-3 pt-2 text-sm text-gray-600">
                {book?.book?.volumeInfo?.ratingsCount} Reviews
              </span>
            </div>
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            <button
              className="text-sm text-blue-500 underline underline-offset-4"
              onClick={() => setFullContent(!fullContent)}
            >
              Show {fullContent ? "Less" : "More"}
            </button>
            <div className="mb-5 mt-6 flex items-center pb-5">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="bg-gray-50 px-6 py-3 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                      >
                        Authors
                      </th>
                      <td className="px-6 py-4">
                        {book?.book?.volumeInfo?.authors?.join(" | ") || "NA"}
                      </td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="bg-gray-50 px-6 py-3 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                      >
                        Published Date
                      </th>
                      <td className="px-6 py-4">
                        {book?.book?.volumeInfo?.publishedDate || "NA"}
                      </td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="bg-gray-50 px-6 py-3 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                      >
                        Page Count
                      </th>
                      <td className="px-6 py-4">
                        {book?.book?.volumeInfo?.pageCount || "NA"}
                      </td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="bg-gray-50 px-6 py-3 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                      >
                        Price
                      </th>
                      <td className="px-6 py-4">
                        {book?.book?.saleInfo?.listPrice?.amount || "NA"}
                        <span>
                          {book?.book?.saleInfo?.listPrice?.currencyCode}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const session = await getSession(context);

  if (!session) {
    console.log(session);
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  const { params } = context;
  console.log(params);
  const id = params.id;
  if (id) {
    try {
      const { data } = await client.query({
        query: book,
        variables: {
          bookId: id,
        },
      });
      return {
        props: {
          book: data,
        },
        // revalidate: 60,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
