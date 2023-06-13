import BookCard from "@components/Listing/BookCard";
import SearchBar from "@components/search/SearchBar";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import ReactPaginate from "react-paginate";
import { client } from "src/graphql/client";
import { searchBooks } from "src/graphql/query";

const Books = (props) => {
  const router = useRouter();

  return (
    <>
      <div className="container mx-auto max-w-7xl pt-10">
        <SearchBar />
        <div className="mt-10 flex max-w-7xl flex-wrap justify-center gap-4">
          {props.data ? (
            props.data.books.map((book) => (
              <BookCard book={book} key={book.id} />
            ))
          ) : (
            <h1 className="text-2xl font-semibold text-white">{props.msg}</h1>
          )}
        </div>
        <div className="my-10 flex justify-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={(e) =>
              router.push({ query: { ...router.query, page: e.selected + 1 } })
            }
            pageRangeDisplayed={5}
            pageCount={10}
            previousLabel="< Prev"
            containerClassName="flex gap-x-3"
            pageClassName="bg-gray-800 px-3 rounded-md text-white"
            pageLinkClassName="text-bold"
            previousClassName="bg-gray-800 px-3 rounded-md text-white"
            previousLinkClassName="text-bold"
            nextClassName="bg-gray-800 px-3 rounded-md text-white"
            nextLinkClassName="text-bold"
            activeClassName="bg-white"
            activeLinkClassName="text-gray-600"
            breakClassName="text-white"
            // value={1}
            initialPage={router.query.page - 1}
          />
        </div>
      </div>
    </>
  );
};

export default Books;

export async function getServerSideProps({ query }) {
  if (!_.isEmpty(query)) {
    const { data } = await client.query({
      query: searchBooks,
      variables: {
        input: {
          index: parseInt(query.page),
          search: query.search,
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
