const { Router } = require("express");
const router = Router();
const {getAllCategories, getCategory, editCategory, deleteCategory, createCategory,} = require("../controllers/categories.controller");

router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategory);
router.put("/categories/:id", editCategory);
router.delete("/categories/:id", deleteCategory);
router.post("/categories", createCategory);

module.exports = router;
