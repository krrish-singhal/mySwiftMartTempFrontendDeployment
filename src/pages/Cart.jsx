"use client";

import { useEffect, useState, useContext } from "react";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import SummaryApi from "../common"; // <-- Import the central API

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  // Fetch cart data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        SummaryApi.addToCartProductView.url, // USE SummaryApi here
        {
          method: SummaryApi.addToCartProductView.method.toUpperCase(),
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      } else {
        toast.error(responseData.message || "Failed to load cart items");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Something went wrong while loading your cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("payment") === "success") {
      toast.success("Payment successful! Your order has been placed.");
      context.fetchUserAddToCart();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loading && context.cartProductCount !== data.length) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [context.cartProductCount]);

  // Increase quantity
  const increaseQty = async (id, qty) => {
    const updatedData = data.map((item) =>
      item._id === id ? { ...item, quantity: qty + 1 } : item
    );
    setData(updatedData);

    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method.toUpperCase(),
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          addToCartProductId: id,
          quantity: qty + 1,
        }),
      });
      const responseData = await response.json();

      if (!responseData.success) {
        fetchData();
        toast.error(responseData.message || "Failed to update quantity");
      } else {
        context.fetchUserAddToCart();
      }
    } catch (err) {
      console.error("Update failed", err);
      fetchData();
      toast.error("Something went wrong while updating quantity");
    }
  };

  // Decrease quantity
  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const updatedData = data.map((item) =>
        item._id === id ? { ...item, quantity: qty - 1 } : item
      );
      setData(updatedData);

      try {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method.toUpperCase(),
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            addToCartProductId: id,
            quantity: qty - 1,
          }),
        });

        const responseData = await response.json();
        if (!responseData.success) {
          fetchData();
          toast.error(responseData.message || "Failed to update quantity");
        } else {
          context.fetchUserAddToCart();
        }
      } catch (err) {
        console.error("Update failed", err);
        fetchData();
        toast.error("Something went wrong while updating quantity");
      }
    }
  };

  // Delete product from cart
  const deleteCartProduct = async (id) => {
    try {
      setData((prevData) => prevData.filter((item) => item._id !== id));

      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method.toUpperCase(),
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId: id }), // <-- Only send the id
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Product deleted from cart");
        context.fetchUserAddToCart();
      } else {
        toast.error(responseData.message || "Failed to delete product");
        fetchData();
      }
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Something went wrong");
      fetchData();
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  // Handle payment
  const handlePayment = async () => {
    if (processingPayment) return;

    try {
      setProcessingPayment(true);
      toast.info("Processing payment...");

      const response = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method.toUpperCase(),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: data }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const session = await response.json();

      if (session.url) {
        localStorage.setItem("pending_checkout", "true");
        window.location.href = session.url;
      } else {
        toast.error(session.message || "Failed to initiate payment");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong during payment");
    } finally {
      setProcessingPayment(false);
    }
  };

  useEffect(() => {
    const pendingCheckout = localStorage.getItem("pending_checkout");

    if (
      pendingCheckout === "true" &&
      window.location.pathname === "/payment-success"
    ) {
      localStorage.removeItem("pending_checkout");
      toast.success("Payment successful! Your order has been placed.");

      fetchData();
      context.fetchUserAddToCart();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mx-auto bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="text-center text-lg my-3 pt-4">
        {data.length === 0 && !loading && (
          <p className="bg-white dark:bg-blue-900 py-5 rounded-lg text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            Your cart is empty
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, i) => (
                <div
                  key={i}
                  className="w-full bg-blue-100 dark:bg-blue-800 h-32 my-3 border border-blue-200 dark:border-blue-700 animate-pulse rounded-xl"
                ></div>
              ))
            : data.map((product, index) => (
                <div
                  key={product?._id}
                  className="w-full bg-white dark:bg-blue-900 h-32 my-3 border border-blue-200 dark:border-blue-800 rounded-xl grid grid-cols-[128px_1fr] shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-32 h-32 bg-blue-50 dark:bg-blue-800 rounded-l-xl">
                    <img
                      src={product?.productId?.productImage[0] || "/placeholder.svg"}
                      className="w-full h-full object-scale-down p-2 bg-white rounded-lg"
                      alt={product?.productId?.productName}
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      className="absolute right-2 top-2 text-red-600 dark:text-red-400 rounded-full p-2 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300 cursor-pointer transition-colors"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1 text-blue-900 dark:text-blue-100">
                      {product?.productId?.productName}
                    </h2>
                    <p className="text-blue-600 dark:text-blue-400">{product?.productId?.category}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-blue-700 dark:text-blue-300 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-blue-600 dark:border-blue-400 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded text-blue-600 dark:text-blue-400 transition-colors"
                        onClick={() => decraseQty(product?._id, product.quantity)}
                      >
                        -
                      </button>
                      <span className="text-blue-900 dark:text-blue-100 font-medium">{product?.quantity}</span>
                      <button
                        className="border border-blue-600 dark:border-blue-400 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded text-blue-600 dark:text-blue-400 transition-colors"
                        onClick={() => increaseQty(product?._id, product.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {data.length > 0 && !loading && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            <div className="h-auto bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
              <h2 className="text-white bg-blue-600 dark:bg-blue-700 px-4 py-3 rounded-t-xl font-semibold">Summary</h2>
              <div className="p-4">
                <div className="flex items-center justify-between px-2 gap-2 font-medium text-lg text-blue-800 dark:text-blue-200 mb-2">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-2 gap-2 font-medium text-lg text-blue-800 dark:text-blue-200 mb-4">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 p-3 text-white w-full rounded-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                  onClick={handlePayment}
                  disabled={processingPayment}
                >
                  {processingPayment ? "Processing..." : "Payment"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
