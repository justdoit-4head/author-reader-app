import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { BsCalendar2Date } from "react-icons/bs";
import EditBook from "./EditBook";
import { Link } from "react-router-dom";

const BookModal = ({
  title,
  id,
  author,
  description,
  publishDate,
  comments,
  displayAvgRating,
  onClose,
}) => {
  const role = localStorage.getItem("role");

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h4 className="my-2 text-gray-500">{id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-gray-500 text-2xl" />
          <h2 className="my-1">{title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-gray-500 text-2xl" />
          <h2 className="my-1">{author}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BsCalendar2Date className="text-gray-500 text-2xl" />
          <h2 className="my-1">{publishDate}</h2>
        </div>
        <p className="mt-4">Description-</p>
        <p className="my-2">{description}</p>
        <div className="flex justify-start items-center gap-x-2">
          Comments-
          {comments.map((comment) => (
            <h2 className="my-1">{comment.text}</h2>
          ))}
        </div>
        <div className="stars flex py-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <svg
              key={index}
              className={`w-8 h-8 ms-3 ${
                index <= displayAvgRating
                  ? "text-yellow-300"
                  : "text-gray-300 dark:text-gray-500 "
              } `}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        </div>
        {role === "author" ? <Link to={`/editbook/${id}`}>clickme</Link> : ""}
      </div>
    </div>
  );
};

export default BookModal;
