import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../../utils/constants";
import { toast } from "react-toastify";

function ReviewModal({ id, onClose, title }) {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState("");
  const handleStarClick = (index) => {
    setRating(index);
  };

  //   review submission
  const handlesubmit = async (e) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BACKEND_ENDPOINT}books/rating/${id}`,
        {
          rating: rating,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responsecomment = await axios.put(
        `${BACKEND_ENDPOINT}books/comment/${id}`,
        {
          comment: comment,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("rated successfully", response);
      console.log("commented successfully", responsecomment);
      toast("Rating Submitted!");
      setRating("0");
      setComment("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
        <h4 className="my-2 text-black text-lg font-semibold uppercase">
          {title}
        </h4>

        <div className="formdiv w-full flex flex-col items-center">
          <form
            className="max-w-screen-lg sm:w-96 w-full"
            onSubmit={handlesubmit}
          >
            <div className="flex flex-col pt-7">
              <div className="title">
                <p class="text-md font-semibold flex items-center text-gray-500">
                  Leave a review with comment-
                </p>
              </div>
              <div className="inputs pt-5">
                <textarea
                  name="name"
                  placeholder="your comment"
                  required
                  type="text-area"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="peer h-full w-full rounded-md border border-blue-gray-400  !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>
              <div class="flex items-center pt-7">
                <div className="title">
                  <p class="text-md font-semibold flex items-center text-gray-500">
                    Stars-
                  </p>
                </div>
                {[1, 2, 3, 4, 5].map((index) => (
                  <svg
                    key={index}
                    className={`w-8 h-8 ms-3 ${
                      index <= rating
                        ? "text-yellow-300"
                        : "text-gray-300 dark:text-gray-500"
                    }  cursor-pointer`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                    onClick={() => handleStarClick(index)}
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="submitbtn flex items-center">
              <button
                className="mt-6 block w-full select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
              >
                Submit review!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
