import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../../utils/constants";
import BookSingleCard from "./BookSingleCard";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

function ReaderLayout() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };
  // filtering books useeffect
  useEffect(() => {
    // filter by search input
    const filtered = books.filter((book) => {
      const searchTerms = searchQuery.toLowerCase();
      const bookData = Object.values(book).join(" ").toLowerCase();

      return bookData.includes(searchTerms);
    });

    // second filter for filter by author name
    const secondFiltered = filtered.filter((fbook) => {
      const searchTerms = selectedAuthor.toLowerCase();
      const authorName = fbook.author.fullName.toLowerCase();
      // If selectedAuthor is empty, return true for all books to show everything
      if (selectedAuthor === "all") {
        return true;
      } else {
        return authorName.includes(searchTerms);
      }
    });

    setFilteredBooks(secondFiltered);
  }, [books, searchQuery, selectedAuthor]);

  // fetching all books useeffect // setting up books and authors
  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(BACKEND_ENDPOINT + "books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setBooks(response.data);
      const uniqueAuthors = [
        ...new Set(response.data.map((book) => book.author.fullName)),
      ];
      setAuthors(uniqueAuthors);
    };
    fetchBooks();
  }, []);

  // logout
  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div>
      <div className="h-1/2 flex text-center justify-center">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-blue-600 sm:mb-0 xs:mb-0">
          Readers Layout
        </h1>
      </div>
      <div className="float-right px-4 cursor-pointer">
        <BiLogOut size={70} onClick={logout} />
      </div>
      <div className="pt-10 px-5 relative mx-auto text-gray-600 flex max-sm:flex-col">
        <p class="text-lg font-semibold px-3 flex items-center max-sm:justify-center">
          Search by
        </p>

        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-md focus:outline-none"
          type="search"
          name="search"
          placeholder="Book title, price, etc"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          value={selectedAuthor}
          onChange={handleAuthorChange}
          className="mx-5 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-md focus:outline-none max-sm:mt-2"
        >
          <option value="all">All Authors</option>
          {authors.map((author) => (
            <option value={author}>{author}</option>
          ))}
        </select>
      </div>
      <div className="max-h-[86vh] overflow-y-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto">
          {filteredBooks.map((item) => (
            <BookSingleCard key={item._id} book={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReaderLayout;
