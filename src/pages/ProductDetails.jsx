"use client"

import { useCallback, useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import { FaStarHalf } from "react-icons/fa"
import displayINRCurrency from "../helpers/displayCurrency"
import CategroyWiseProductDisplay from "../components/CategoryWiseProductDisplay"
import addToCart from "../helpers/addToCart"
import Context from "../context"

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const { fetchUserAddToCart } = useContext(Context)
  const navigate = useNavigate()

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  })
  const [zoomImage, setZoomImage] = useState(false)

  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product-details`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    })
    setLoading(false)
    const dataReponse = await response.json()

    setData(dataReponse?.data)
    setActiveImage(dataReponse?.data?.productImage[0])
  }

  console.log("data", data)

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true)
      const { left, top, width, height } = e.target.getBoundingClientRect()
      console.log("coordinate", left, top, width, height)

      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      setZoomImageCoordinate({
        x,
        y,
      })
    },
    [zoomImageCoordinate],
  )

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleAddToCart = (e, id) => {
    addToCart(e, id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = (e, id) => {
    addToCart(e, id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className="container mx-auto p-4 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 p-6">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-blue-50 dark:bg-blue-800 relative p-2 rounded-lg border border-blue-200 dark:border-blue-700">
            <img
              src={activeImage || "/placeholder.svg"}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-blue-50 dark:bg-blue-800 p-1 -right-[510px] top-0 rounded-lg border border-blue-200 dark:border-blue-700">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-blue-200 dark:bg-blue-800 rounded-lg animate-pulse border border-blue-200 dark:border-blue-700"
                      key={"loadingImage" + index}
                    ></div>
                  )
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-blue-50 dark:bg-blue-800 rounded-lg p-1 border border-blue-200 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                      key={imgURL}
                    >
                      <img
                        src={imgURL || "/placeholder.svg"}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer hover:scale-105 transition-transform"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-blue-200 dark:bg-blue-800 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-blue-200 dark:bg-blue-800 animate-pulse w-full rounded"></h2>
            <p className="capitalize bg-blue-200 dark:bg-blue-800 min-w-[100px] animate-pulse h-6 lg:h-8 w-full rounded"></p>

            <div className="bg-blue-200 dark:bg-blue-800 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full rounded"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
              <p className="bg-blue-200 dark:bg-blue-800 w-full rounded"></p>
              <p className="bg-blue-200 dark:bg-blue-800 w-full rounded"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 bg-blue-200 dark:bg-blue-800 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8 bg-blue-200 dark:bg-blue-800 rounded animate-pulse w-full"></button>
            </div>

            <div className="w-full">
              <p className="h-6 lg:h-8 bg-blue-200 dark:bg-blue-800 rounded animate-pulse w-full"></p>
              <p className="bg-blue-200 dark:bg-blue-800 rounded animate-pulse h-10 lg:h-12 w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-400 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium text-blue-900 dark:text-blue-100">{data?.productName}</h2>
            <p className="capitalize text-blue-600 dark:text-blue-400">{data?.category}</p>

            <div className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-blue-700 dark:text-blue-300">{displayINRCurrency(data.sellingPrice)}</p>
              <p className="text-blue-400 dark:text-blue-500 line-through">{displayINRCurrency(data.price)}</p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-blue-600 dark:border-blue-400 rounded-lg px-3 py-1 min-w-[120px] text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:scale-105 duration-300"
                onClick={(e) => handleBuyProduct(e, data._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-blue-600 dark:border-blue-400 rounded-lg px-3 py-1 min-w-[120px] font-medium text-white bg-blue-600 dark:bg-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-blue-900 transition-all shadow-lg hover:scale-105 duration-300"
                onClick={(e) => handleAddToCart(e, data._id)}
              >
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-blue-600 dark:text-blue-400 font-medium my-1">Description :</p>
              <p className="text-blue-800 dark:text-blue-200">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"} />}
    </div>
  )
}

export default ProductDetails
