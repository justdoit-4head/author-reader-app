const express = require("express");
const { PORT, mongoDBURL } = require("./config.js");
const mongoose = require("mongoose");
const booksRoute = require("./routes/booksRoute.js");
const userRoute = require("./routes/userRoute.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// setting up file upload limit
app.use(bodyParser({ limit: "50mb" }));

// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Backend for the author/reader app");
});

app.use("/books", booksRoute);
app.use("/user", userRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
