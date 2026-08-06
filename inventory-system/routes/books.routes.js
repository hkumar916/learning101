const express = require("express");
const BookModel = require("../models/Book.model");
const {
  createBookValidation,
  handleValidationErrors,
  updateBookValidation,
  idValidation,
} = require("../validators/book.validator");
const { param } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  createBookValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const newBook = await BookModel.create(req.body);

      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const bookList = await BookModel.find();
    res.status(200).send(bookList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", idValidation, handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book Not Found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete(
  "/:id",
  idValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await BookModel.findByIdAndDelete(id);

      if (!deletedBook) {
        return res.status(404).json({ message: "Book Not Found" });
      }

      res.status(200).json({ message: "Book Deleted Successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.put(
  "/:id",
  idValidation,
  updateBookValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedBook) {
        return res.status(404).json({ message: "Book Not Found" });
      }

      res
        .status(200)
        .json({ message: "Book Updated Successfully", updatedBook });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
