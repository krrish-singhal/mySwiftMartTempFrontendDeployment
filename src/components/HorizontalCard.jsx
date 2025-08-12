import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();
  const {fetchUserAddToCart}=useContext(Context)

  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id)
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
        className="bg-white dark:bg-[#181f32] shadow-md rounded-full p-2 absolute left-0 text-lg hidden md:flex items-center justify-center z-10 border border-blue-100 dark:border-blue-800 hover:scale-110 transition"
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        <FaAngleLeft />
      </button>
      <button
        className="bg-white dark:bg-[#181f32] shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:flex items-center justify-center z-10 border border-blue-100 dark:border-blue-800 hover:scale-110 transition"
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        <FaAngleRight />
      </button>
      <div
      className="flex items-center gap-4 md:gap-8 overflow-x-auto overflow-y-hidden no-scrollbar transition-all px-2 py-2"

        ref={scrollElement}
      >
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-blue-50 dark:bg-[#1b2336] rounded-xl shadow-lg flex animate-pulse border border-blue-100 dark:border-blue-800"
              >
                <div className="bg-blue-100 dark:bg-blue-950 h-full p-4 min-w-[120px] md:min-w-[145px] rounded-l-xl"></div>
                <div className="p-4 flex flex-col gap-2 w-full">
                  <div className="h-5 bg-blue-200 dark:bg-blue-900 rounded-md w-3/4"></div>
                  <div className="h-4 bg-blue-200 dark:bg-blue-900 rounded-md w-1/2"></div>
                  <div className="flex gap-3">
                    <div className="h-4 bg-blue-200 dark:bg-blue-900 rounded-md w-1/3"></div>
                    <div className="h-4 bg-blue-200 dark:bg-blue-900 rounded-md w-1/4"></div>
                  </div>
                  <div className="h-8 bg-blue-200 dark:bg-blue-900 rounded-full w-full"></div>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product?._id}
                to={"product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white dark:bg-[#181f32] rounded-xl shadow-lg flex overflow-hidden border border-blue-100 dark:border-blue-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-blue-50 dark:bg-blue-900 h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
                  <img
                    src={product.productImage[0]}
                    className="object-scale-down h-full w-full hover:scale-110 transition-transform"
                    alt={product?.productName}
                  />
                </div>
                <div className="p-4 flex flex-col justify-between w-full">
                  <h2
                    className="font-medium text-base md:text-lg truncate text-blue-900 dark:text-blue-100"
                    title={product?.productName}
                  >
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-blue-400 dark:text-blue-300 text-xs">{product?.category}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-blue-700 dark:text-blue-200 font-bold">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-blue-400 dark:text-blue-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full w-full font-semibold shadow hover:scale-105 transition" onClick={(e)=>handleAddToCart(e,product?._id)}>
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
