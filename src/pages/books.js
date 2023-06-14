import React from "react";
import BookCard from "@components/Listing/BookCard";
import SearchBar from "@components/search/SearchBar";
import _ from "lodash";
import { useRouter } from "next/router";
import { client } from "src/graphql/client";
import { searchBooks } from "src/graphql/query";
import ScrollToTopBtn from "@components/common/scrollToTop/ScrollToTopBtn";
import Pagination from "@components/common/pagination/Pagination";
import Select from "@components/common/selectMenu/FilterMenu";
import { filterOptions } from "@constants/filter/options";
import Loader from "@components/common/loader";
import { getSession, useSession } from "next-auth/react";

const Books = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto max-w-7xl pt-10">
        <SearchBar />
        {props.data && (
          <div className="flex items-center justify-between gap-y-2 border-b-2 px-3 py-7 max-sm:flex-col">
            <span className="text-xl font-medium text-gray-800 dark:text-white max-sm:text-base">
              Search Results for {`"${router.query.search}"`}
            </span>
            <Select options={filterOptions} />
            {/* <Select
              handleOpen={handleOpen}
              open={open}
              setSelectedValue={setSelectedValue}
              options={filterOptions}
            /> */}
          </div>
        )}
        <div className="mt-10 flex max-w-7xl flex-wrap justify-center gap-4">
          {props.data ? (
            _.size(props.data.books) > 0 ? (
              props.data.books.map((book) => (
                <BookCard book={book} key={book.id} />
              ))
            ) : (
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                No Books Found
              </h3>
            )
          ) : (
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {props.msg}
            </h3>
          )}
        </div>
        {_.size(props?.data?.books) > 0 && (
          <>
            <Pagination />
            <ScrollToTopBtn />
          </>
        )}
      </div>
    </>
  );
};

export default Books;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  const { query } = context;

  if (!_.isEmpty(query)) {
    const { data } = await client.query({
      query: searchBooks,
      variables: {
        input: {
          index: parseInt(query.page),
          search: query.search,
          filter: query.filter,
        },
      },
    });
    return {
      props: {
        data,
      },
    };
  } else {
    return {
      props: {
        msg: "Search For Any Books...",
      },
    };
  }
}
