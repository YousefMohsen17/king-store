import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (error) {
    console.log("Error in getAllProducts", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteProduct(req, res) {
  try {
    const productToBeDeleted = await Product.findByIdAndDelete(req.params.id);
    if (!productToBeDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (productToBeDeleted.productImg) {
      const publicId = productToBeDeleted.productImg
        .split("/")
        .pop()
        .split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloduinary");
      } catch (error) {
        console.log("error deleting image from cloduinary", error);
      }
      if (productToBeDeleted.featured) {
        await updateFeaturedProductsCache();
      }
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.log("Error in getRecommendedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export async function createProduct(req, res) {
  try {
    const { name, description, price, productImg, category } = req.body;

    const uploadedProductImg = await cloudinary.uploader.upload(productImg, {
      folder: "products",
      use_filename: true,
    });
    const product = new Product({
      name,
      description,
      price,
      productImg: uploadedProductImg.secure_url,
      category,
    });
    const savedProduct = await product.save();
    res.status(201).json({ data: savedProduct });
  } catch (error) {
    console.log("Error in createProduct", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function getProductsByCategory(req, res) {
  try {
    const { category } = req.params;
    const validCategories = Product.schema.path("category").enumValues;
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: category + " is invalid" });
    }
    const products = await Product.find({ category });
    res.status(200).json({ data: products });
  } catch (error) {
    console.log("Error in getProductsByCategory", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function getCategories(req, res) {
  try {
    const categories = Product.schema.path("category").enumValues;

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function addFeaturedProducts(req, res) {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.featured === true) {
      product.featured = false;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      return res.status(200).json({ data: updatedProduct });
    }
    product.featured = true;
    const updatedProduct = await product.save();
    await updateFeaturedProductsCache();
    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    console.log("Error in addFeaturedProducts", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ featured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("error in update cache function");
  }
}
export async function getFeaturedProducts(req, res) {
  try {
    const featuredProducts = await redis.get("featured_products");

    res.status(200).json({ data: JSON.parse(featuredProducts) });
  } catch (error) {
    console.log("Error in getFeaturedProducts", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
