import express from "express";
import {
  GetProducts,
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/", GetProducts);
router.post("/", CreateProduct);
router.put("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

export default router;
