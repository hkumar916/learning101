const express = require("express")
const CategoryModel = require("../models/category.model")

const router = express.Router()

router.post("/", async (req, res) => {
    try {
      const newCategory = await CategoryModel.create(req.body);
      res.status(201).json(newCategory);

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const categoryList = await CategoryModel.find();
    res.status(200).send(categoryList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;