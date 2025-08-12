"use client";

import { useEffect, useState } from "react";

import image1 from "../../assest/banner/img6_mobile copy.webp";
import image2 from "../../assest/banner/img2.webp";
import image3 from "../../assest/banner/img3.jpg";
import image4 from "../../assest/banner/img4.jpg";
import image5 from "../../assest/banner/img5.webp";
import image6 from "../../assest/banner/img8.jpg";

import image1Mobile from "../../assest/banner/img6_mobile.jpg";
import image2Mobile from "../../assest/banner/img2_mobile.webp";
import image3Mobile from "../../assest/banner/img3_mobile.jpg";
import image4Mobile from "../../assest/banner/img4_mobile.jpg";
import image5Mobile from "../../assest/banner/img5_mobile.png";
import image6Mobile from "../../assest/banner/img8 copy.webp";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image6,image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
    image6Mobile
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const preveImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-blue-50 dark:bg-blue-900 relative rounded-xl overflow-hidden border border-blue-200 dark:border-blue-800 shadow-lg">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl px-4">
            <button
              onClick={preveImage}
              className="bg-white dark:bg-blue-800 shadow-md rounded-full p-2 text-blue-600 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-700 transition-all border border-blue-200 dark:border-blue-700"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white dark:bg-blue-800 shadow-md rounded-full p-2 text-blue-600 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-700 transition-all border border-blue-200 dark:border-blue-700"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/**desktop and tablet version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all duration-500"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imageURl || "/placeholder.svg"}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/**mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all duration-500"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imageURl || "/placeholder.svg"}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 pointer-events-none">
          {desktopImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full opacity-0 pointer-events-auto`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
