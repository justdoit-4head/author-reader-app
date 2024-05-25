import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { data } from "../../../assets/mockData";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../../utils/constants";
import BookModal from "./BookModal";
import { BiLogOut } from "react-icons/bi";

function AuthorLayout() {
  const navigate = useNavigate();
  const [draftbooks, setDraftbooks] = useState([]);
  const [publishedbooks, setPublishedbooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showcaseItem, setShowcaseItem] = useState({});
  const [authorinfo, setauthorinfo] = useState();

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideLeftalt = () => {
    var slider = document.getElementById("slideralt");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRightalt = () => {
    var slider = document.getElementById("slideralt");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`${BACKEND_ENDPOINT}user/${userId}`);

      setauthorinfo(response);

      setDraftbooks(
        response.data.books.filter((book) => book.bookStatus === "draft")
      );
      setPublishedbooks(
        response.data.books.filter((book) => book.bookStatus === "published")
      );
    };
    fetchBooks();
  }, []);

  // more details about the book fnc
  const moredetails = (item) => {
    setShowModal(true);
    setShowcaseItem(item);
  };

  // logout
  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      <div className="h-1/2 flex text-center justify-center">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-blue-600 sm:mb-0 xs:mb-0 py-5">
          Author Layout
        </h1>
      </div>

      {showModal && (
        <BookModal
          title={showcaseItem.title}
          id={showcaseItem._id}
          author={authorinfo.data.fullName}
          description={showcaseItem.description}
          publishDate={new Date(showcaseItem.publishDate).getFullYear()}
          comments={showcaseItem.comments}
          displayAvgRating={showcaseItem.displayAvgRating}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="float-right px-4">
        <BiLogOut size={70} onClick={logout} />
      </div>

      <div className="flex flex-col">
        <div className="p-5 px-10 flex items-center">
          <div className="flex flex-row">
            <p class="text-[24px] font-[700] leading-7 tracking-tighter">
              Add a new book
            </p>
          </div>
          <Link to="/addbook" className="text-black text-sm font-semibold px-5">
            <IoMdAddCircle size={70} />
          </Link>
        </div>
        <div className="scrollbar">
          <>
            <div className="p-10">
              <p class="text-[24px] font-[700] leading-7 tracking-tighter">
                Your drafted books
              </p>
            </div>
            <div className="relative flex items-center">
              <MdChevronLeft
                className="opacity-50 cursor-pointer hover:opacity-100"
                onClick={slideLeft}
                size={40}
              />
              <div
                id="slider"
                className="w-3/4 h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
              >
                {draftbooks.map((item) => (
                  <>
                    <img
                      className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                      src={item.cover}
                      alt="Cat Image"
                      key={item._id}
                      onClick={() => moredetails(item)}
                    />
                  </>
                ))}
              </div>
              <MdChevronRight
                className="opacity-50 cursor-pointer hover:opacity-100"
                onClick={slideRight}
                size={40}
              />
            </div>

            {/* for published */}
            <div className="p-10">
              <p class="text-[24px] font-[700] leading-7 tracking-tighter">
                Your published books
              </p>
            </div>
            <div className="relative flex items-center">
              <MdChevronLeft
                className="opacity-50 cursor-pointer hover:opacity-100"
                onClick={slideLeftalt}
                size={40}
              />
              <div
                id="slideralt"
                className="w-3/4 h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
              >
                {publishedbooks.map((item) => (
                  <>
                    <img
                      className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                      src={item.cover}
                      alt="Cat Image"
                      key={item._id}
                      onClick={() => moredetails(item)}
                    />
                  </>
                ))}
              </div>
              <MdChevronRight
                className="opacity-50 cursor-pointer hover:opacity-100"
                onClick={slideRightalt}
                size={40}
              />
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default AuthorLayout;
