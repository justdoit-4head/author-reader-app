import React from "react";
import AuthorLayout from "./Layouts/AuthorLayout";
import ReaderLayout from "./Layouts/ReaderLayout";
import Login from "../User/Login";

function Home() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
    <div className="home">
      {role === "reader" ? <ReaderLayout /> : <AuthorLayout />}
    </div>
  );
}

export default Home;
