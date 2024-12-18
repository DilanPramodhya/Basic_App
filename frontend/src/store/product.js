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
}));
