import { Product } from "../models/product_models.js";
import Apierr from "../utils/Apierror.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw new Apierr(500, "Internal Server error");
  }
};

const createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw new Apierr(500, "Internal Server error");
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true }
    );
    if (!product) {
      throw new Apierr(500, "Page not found");
    }
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error.message);
    throw new Apierr(500, "Internal Server error");
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Apierr(500, "Page not found");
    }
    res.json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw new Apierr(500, "Internal Server error");
  }
};

export { getProducts, createProduct, updateProduct, deleteProduct };
