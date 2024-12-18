// import { useState } from "react";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }), // const [state, setState] = useState([]);

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill all the fields" };
    }
    const res = await fetch("http://localhost:5000/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product Created Successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("http://localhost:5000/api/product");
    const data = await res.json();
    set({ products: data.data });
    return { success: true, message: "Product Created Successfully" };
  },
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`http://localhost:5000/api/product/${pid}`, {
        method: "DELETE",
      });

      // Validate response
      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to delete product",
        };
      }

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update state immediately for UI feedback
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product Deleted Successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  },
}));
