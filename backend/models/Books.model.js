const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    cover: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    publishDate: {
      type: Date,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    bookStatus: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      required: [true, "please provide the status of this book"],
    },

    tags: [String],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppUsers", // Reference to the user model
      required: true,
    },

    displayAvgRating: {
      type: Number,
      default: "0",
    },

    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AppUsers", // Reference to the User model who submitted the rating
        },
        value: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AppUsers", // Reference to the User model who submitted the comment
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to automatically update author's books array
bookSchema.pre("save", async function (next) {
  try {
    // Check if the document is being created (isNew property is true)
    if (this.isNew) {
      const authorId = this.author;
      const author = await this.model("AppUsers").findById(authorId);
      if (author && author.role === "author") {
        author.books.push(this._id);
        await author.save();
      }
    }
    next(); // Proceed to save the document
  } catch (error) {
    next(error);
  }
});

const Book = mongoose.model("AppBooks", bookSchema);

module.exports = Book;
