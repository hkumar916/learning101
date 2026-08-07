import express from "express"
import CategoryModel from "../models/category.model.js"
//import { handleRouteError } from "../helpers/error-handling.js";

const router = express.Router()

router.post("/", async (req, res) => {
    try {
      if (!req.body.name || req.body.name.trim().length < 3) {
        return res.status(400).send({
          message: req.t("categoryNameValidation"),
        });
      }
      const newCategory = await CategoryModel.create({
        name: req.body.name,
      });
      res.status(201).json(newCategory);

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const categoryList = await CategoryModel.find();
    if(!categoryList || categoryList.length === 0){
      res.status(200).send({ message: req.t("categoryNotFound"), });
    }

    res.status(200).send(categoryList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: req.t("categoryNotFound"), });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCategory = await CategoryModel.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ message: req.t("categoryNotFound"), });
      }
      res.status(200).json({ message: req.t("categoryDeletedSuccessfully"), });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

//module.exports = router;
export default router;