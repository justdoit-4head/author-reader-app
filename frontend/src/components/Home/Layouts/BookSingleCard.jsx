import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { GiBurningBook } from "react-icons/gi";
import { MdOutlineRateReview } from "react-icons/md";
import ReviewModal from "./ReviewModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  return (
    <>
      <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
        <h2 className="absolute top-1 right-2 px-4 py-1 bg-gray-400 rounded-lg">
          {new Date(book.publishDate).getFullYear()}
        </h2>
        <h4 className="my-2 text-gray-400">{book._id}</h4>

        {/* displaying rating with star */}
        <div class="flex items-center mt-5">
          <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p class="ms-2 text-sm font-bold">
            {book.displayAvgRating.toFixed(1)}
          </p>
          <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
          <a
            href="#"
            class="text-sm font-medium text-gray-900 underline hover:no-underline "
          >
            {book.ratings.length} reviews
          </a>
        </div>

        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-gray-500 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-gray-500 text-2xl" />
          <h2 className="my-1">{book.author.fullName}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <RiMoneyRupeeCircleLine className="text-gray-500 text-2xl" />
          <h2 className="my-1">{book.price}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <GiBurningBook className="text-gray-500 text-2xl" />
          <h2 className="my-1">{book.genre}</h2>
        </div>
        <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
          <BsInfoCircle
            className="text-3xl text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setShowModal(true)}
          />
          <MdOutlineRateReview
            className="text-3xl text-blue-800 hover:text-black cursor-pointer"
            onClick={() => setShowModal1(true)}
          />
        </div>
        {showModal && (
          <BookModal
            title={book.title}
            id={book._id}
            author={book.author.fullName}
            description={book.description}
            publishDate={new Date(book.publishDate).getFullYear()}
            comments={book.comments}
            displayAvgRating={book.displayAvgRating}
            onClose={() => setShowModal(false)}
          />
        )}
        {showModal1 && (
          <ReviewModal
            id={book._id}
            title={book.title}
            onClose={() => setShowModal1(false)}
          />
        )}
      </div>
    </>
  );
};

export default BookSingleCard;
