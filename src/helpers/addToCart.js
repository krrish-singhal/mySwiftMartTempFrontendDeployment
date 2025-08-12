import { toast } from "react-toastify";
import SummaryApi from "../common"; // Ensure the import path is correct!

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    const response = await fetch(SummaryApi.addToCart.url, {
      method: SummaryApi.addToCart.method.toUpperCase(),
      credentials: "include",
      headers: {
        "content-type": "application/json", // Fixed: removed space
      },
      body: JSON.stringify({ productId: id }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message || "Added to cart!");
    } else if (responseData.error) {
      toast.error(responseData.message || "Could not add to cart.");
    }

    return responseData;
  } catch (error) {
    console.error("Add to cart error:", error);
    toast.error("Something went wrong while adding to cart.");
    return { error: true, message: "Network or server error" };
  }
};

export default addToCart;
