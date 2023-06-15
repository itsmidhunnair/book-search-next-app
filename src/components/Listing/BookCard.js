import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import React from "react";
import Link from "next/link";
import placeHolderImg from "@public/assets/img/No-Image-Placeholder.png";

const BookCard = ({ book }) => {
  return (
    <div className="w-80 rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="group relative h-72 w-full">
        <Image
          className="rounded-t-lg object-contain pt-7 transition-all duration-500 group-hover:scale-110"
          src={book?.volumeInfo?.imageLinks?.thumbnail || placeHolderImg}
          alt=""
          fill
        />
      </div>
      <div className="p-5">
        <span className="h-15 relative inline-block overflow-hidden">
          <h5 className="title_underline mb-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {book?.volumeInfo?.title}
          </h5>
        </span>
        <p className="mb-5 h-[84px] overflow-clip text-ellipsis text-sm font-normal text-gray-700 dark:text-gray-400">
          {book?.volumeInfo?.description}
        </p>
        <p className="mt-3 overflow-clip text-ellipsis text-sm font-normal italic text-gray-700 dark:text-gray-400">
          <span>Published Date: </span>
          <span className="text-blue-500">
            {book?.volumeInfo?.publishedDate}
          </span>
        </p>
        <hr className="my-1" />
        <div className="my-2 flex items-center">
          <Rating
            size={18}
            allowFraction={true}
            initialValue={book?.volumeInfo?.averageRating}
            readonly={true}
          />
          {book?.volumeInfo?.ratingsCount && (
            <span className="pl-1 text-[11px] text-gray-500">
              ({book?.volumeInfo?.ratingsCount})
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={`/book/${book.id}`}
            className="inline-flex items-center rounded-lg border-2 px-3 py-2 text-center text-sm font-medium hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-600 dark:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Show
            <svg
              aria-hidden="true"
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <span className="text-xs italic text-gray-500">
            {book?.volumeInfo?.publisher}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
