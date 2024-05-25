import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_ENDPOINT } from "../../../utils/constants";
import { ToastContainer, toast } from "react-toastify";

function AddBookModal() {
  const [formData, setFormData] = useState({
    cover: "",
    title: "",
    description: "",
    genre: "",
    publishDate: "",
    price: "",
    bookStatus: "",
    tags: "",
  });

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isoString = formData.publishDate + "T00:00:00.000Z";
      const authorId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      // const formDat = new FormData();
      // formDat.set("title", formData.title);
      // formDat.set("description", formData.description);
      // formDat.set("genre", formData.genre);
      // formDat.set("publishDate", isoString);
      // formDat.set("price", formData.price);
      // formDat.set("bookStatus", formData.bookStatus);
      // formDat.set("tags", formData.tags);
      // formDat.set("author", authorId);
      // formDat.set("cover", avatar);

      const response = await axios.post(
        BACKEND_ENDPOINT + "books/",
        // formDat,
        {
          title: formData.title,
          description: formData.description,
          genre: formData.genre,
          publishDate: isoString,
          price: formData.price,
          bookStatus: formData.bookStatus,
          tags: formData.tags,
          author: authorId,
          cover: avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      toast("Book succesfully created!");
      setFormData({
        cover: "",
        title: "",
        description: "",
        genre: "",
        publishDate: "",
        price: "",
        bookStatus: "",
        tags: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast("An error occured!!");
    }
  };

  const handleDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      // console.log(reader.result);
      setAvatar(reader.result); // Log the result after the file is read
    };
    // console.log(e.target.files[0]);
    // setAvatar(e.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div classname="flex flex-col">
      <div className="title justify-center text-center">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-500 md:text-5xl lg:text-6xl dark:text-grey-100 sm:mb-0 xs:mb-0">
          Add your book
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="flex justify-center h-screen">
          <div className="relative h-20 w-3/4 min-w-[200px] p-10 my-10">
            <div class="mx-auto max-w-lg">
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md  focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Book Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md  focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="text"
                placeholder="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              />
              <textarea
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md  focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="text"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              {/* price input */}
              <div class="flex py-4">
                <div className="w-1/4">
                  <button class=" tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      class="w-6 h-7 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span class="ml-3">Rupees</span>
                  </button>
                </div>
                <div className="w-3/4">
                  <input
                    class="w-full px-8 py-[18px] rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md  focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* //////////// */}

              {/* date picker */}
              <div class="flex py-4">
                <input
                  class="w-full px-8 py-[18px] rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md  focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="date"
                  placeholder="Month and Year of publish date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ///////////// */}

              <div class="flex py-4">
                <input
                  class="w-full px-8 py-[18px] rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md  focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                />
              </div>

              <select
                class="w-full px-8 py-[18px] rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                name="bookStatus"
                value={formData.bookStatus}
                onChange={handleChange}
                required
              >
                <option selected>Draft or Publish?</option>
                <option value="draft">Draft</option>
                <option value="published">Publish</option>
              </select>

              <div className="flex w-full justify-between gap-3 items-center py-4">
                <img
                  class="w-[48px] h-[48px] rounded-full"
                  src={avatarPreview}
                  alt="Rounded avatar"
                ></img>
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    onChange={handleDataChange}
                    className="block w-full text-sm text-gray-400
                                    file:mr-3 file:py-2 file:px-6
                                    file:rounded-full file:border-0
                                    file:text-sm file:cursor-pointer file:font-semibold
                                    file:bg-blue-100 file:text-blue-700
                                    hover:file:bg-blue-200
                                    "
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <svg
                  class="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span class="ml-3">Add</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBookModal;
