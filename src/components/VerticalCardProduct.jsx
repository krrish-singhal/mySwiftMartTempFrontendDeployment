import React, { useEffect, useRef, useState, useContext } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context/index"

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollElement = useRef();
  const loadingList = new Array(10).fill(null);
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  useEffect(() => {
    setLoading(true);
    fetchCategoryWiseProduct(category).then(categoryProduct => {
      setData(categoryProduct?.data);
      setTimeout(() => setLoading(false), 2000);
    });
  }, [category]);

  const scrollRight = () => { scrollElement.current.scrollLeft += 300; };
  const scrollLeft = () => { scrollElement.current.scrollLeft -= 300; };

  return (
    <div className="container mx-auto px-2 md:px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4 text-blue-800 dark:text-blue-200">{heading}</h2>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-[#181f32] shadow-md rounded-full p-3 hidden md:flex items-center justify-center z-10 border border-blue-100 dark:border-blue-800 hover:scale-110 transition"
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        <FaAngleLeft />
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-[#181f32] shadow-md rounded-full p-3 hidden md:flex items-center justify-center z-10 border border-blue-100 dark:border-blue-800 hover:scale-110 transition"
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        <FaAngleRight />
      </button>
      <div
        ref={scrollElement}
        className="flex items-stretch gap-4 md:gap-8 overflow-x-auto overflow-y-hidden no-scrollbar transition-all px-2 py-2"

      >
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="min-w-[250px] md:min-w-[280px] max-w-[250px] md:max-w-[280px] h-[320px] bg-blue-50 dark:bg-[#1b2336] rounded-xl shadow-lg flex flex-col p-4 gap-4 animate-pulse border border-blue-100 dark:border-blue-800"
              >
                <div className="bg-blue-100 dark:bg-blue-950 h-[150px] rounded-md w-full"></div>
                <div className="h-5 bg-blue-200 dark:bg-blue-900 rounded-md w-3/4"></div>
                <div className="h-4 bg-blue-200 dark:bg-blue-900 rounded-md w-1/2"></div>
                <div className="h-4 bg-blue-200 dark:bg-blue-900 rounded-md w-full"></div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product?._id}
                to={"product/" + product?._id}
                className="min-w-[250px] md:min-w-[280px] max-w-[250px] md:max-w-[280px] h-[320px] bg-white dark:bg-[#181f32] rounded-xl shadow-lg flex flex-col p-4 gap-4 border border-blue-100 dark:border-blue-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-blue-50 dark:bg-blue-900 p-3 flex items-center justify-center rounded-md h-[150px]">
                  <img
                    src={product.productImage[0]}
                    className="object-contain h-full w-full transition-transform transform hover:scale-110"
                    alt={product.productName}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold text-sm md:text-lg text-blue-900 dark:text-blue-100 truncate">
                    {product?.productName}
                  </h2>
                  <p className="text-xs md:text-sm text-blue-400 dark:text-blue-300">{product?.category}</p>
                  <div className="flex gap-2 items-center">
                    <p className="text-blue-700 dark:text-blue-200 font-bold text-md">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-blue-400 dark:text-blue-500 line-through text-sm">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold shadow hover:scale-105 transition" onClick={(e) => handleAddToCart(e, product?._id)}>
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
