const express = require("express");

const Book = require("../models/Books.model");
const User = require("../models/User.model");

const router = express.Router();
const authController = require("../controllers/authController");

router.use(authController.protect);

// getting all books
router.get("/", async (req, res) => {
  try {
    const Allbooks = await Book.find(req.query).populate("author");
    res.status(200).json(Allbooks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// add book
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      publishDate,
      price,
      tags,
      author,
      cover,
      bookStatus,
    } = req.body;
    const newbook = new Book({
      cover,
      title,
      description,
      genre,
      publishDate,
      price,
      tags,
      author,
      bookStatus,
    });
    await newbook.save();

    // // updating the book inside author //  commenting since doing it manually isnt much effective
    // const updateAuthor = await User.findById(author);

    // updateAuthor.books.push(newbook._id);
    // await updateAuthor.save();

    res.status(201).send("Book created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// update book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cover,
      title,
      description,
      genre,
      publishDate,
      price,
      tags,
      bookStatus,
    } = req.body;

    // Find the book by ID and update its fields
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        cover,
        title,
        description,
        genre,
        publishDate,
        price,
        tags,
        bookStatus,
      },
      { new: true }
    ); // Set { new: true } to return the updated document

    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// delete buk
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book by ID and delete it
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).send("Book not found");
    }

    res.status(200).send("Book deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// rating the book up next---->
router.put("/rating/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, userId } = req.body;

    const rateBook = await Book.findById(id);

    rateBook.ratings.push({ user: userId, value: rating });

    await rateBook.save();

    // // updating averagedisplay rating for the book
    const totalRating = rateBook.ratings.reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    const avgRating = totalRating / rateBook.ratings.length;

    rateBook.displayAvgRating = avgRating;
    await rateBook.save();

    res.status(200).json({ message: "Book rating updated successfully" });
  } catch (error) {
    console.error("Error rating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// getting average rating for the book
router.get("/avgrating/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const selectedbook = await Book.findById(id);

    // Calculate average rating
    const totalRating = selectedbook.ratings.reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    const avgRating = totalRating / selectedbook.ratings.length;

    res.status(200).json({ message: "Average rating", avgRating });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// placing comments for the book---->
router.put("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, userId } = req.body;

    const rateBook = await Book.findById(id);

    rateBook.comments.push({ user: userId, text: comment });

    await rateBook.save();

    res.status(200).json({ message: "Comment added to the book" });
  } catch (error) {
    console.error("Error rating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
