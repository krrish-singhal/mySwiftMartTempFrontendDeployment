"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  FaArrowLeft,
  FaShoppingBag,
  FaInfoCircle,
  FaTag,
  FaRupeeSign,
  FaHistory,
  FaExclamationTriangle,
  FaShoppingCart,
} from "react-icons/fa"

const OlxProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [cart, setCart] = useState([])

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("olxCart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
        localStorage.removeItem("olxCart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("olxCart", JSON.stringify(cart))
    if (window.updateOlxCartCount) {
      window.updateOlxCartCount(cart.length)
    }
  }, [cart])

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/product/${id}`, {
          method: "GET",
          credentials: "include",
        })

        const data = await response.json()

        if (data.success) {
          setProduct(data.product)
        } else {
          toast.error(data.message)
          navigate("/olx-marketplace")
        }
      } catch (error) {
        console.error("Error fetching product details:", error)
        toast.error("Failed to load product details")
        navigate("/olx-marketplace")
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetail()
  }, [id, navigate])

  const handlePurchase = async () => {
    try {
      setPaymentLoading(true)

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: id,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url 
      } else {
        throw new Error(data.message || "Failed to process payment")
      }
    } catch (error) {
      console.error("Error purchasing product:", error)
      toast.error(error.message || "Failed to process purchase")
    } finally {
      setPaymentLoading(false)
    }
  }

  // Add to cart - FIXED VERSION
  const addToCart = () => {
    if (!product) return

    console.log("Adding product to cart:", product)

    // Check if product is already in cart
    if (cart.some((item) => item._id === product._id)) {
      toast.info("Product is already in your cart")
      return
    }

    // Create cart item with all necessary fields
    const cartItem = {
      _id: product._id,
      name: product.name,
      category: product.category,
      sellingPrice: product.sellingPrice,
      description: product.description,
      images: product.images || [],
      userId: product.userId,
    }

    const newCart = [...cart, cartItem]
    setCart(newCart)
    toast.success(`${product.name} added to cart!`)
    console.log("Updated cart:", newCart)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 dark:bg-blue-950 pt-24 pb-12 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-blue-50 dark:bg-blue-950 pt-24 pb-12 px-4 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Product not found</h2>
          <p className="text-blue-500 dark:text-blue-400 mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/olx-marketplace")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    )
  }

  const {
    name,
    category,
    worthPrice,
    sellingPrice,
    description,
    reason,
    images,
    status,
    seller,
    createdAt,
    isOwner,
    isSold,
  } = product

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Calculate discount percentage
  const discountPercentage = () => {
    if (!worthPrice || !sellingPrice) return 0
    const discount = ((worthPrice - sellingPrice) / worthPrice) * 100
    return Math.round(discount)
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-blue-950 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/olx-marketplace")}
          className="mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Marketplace</span>
        </button>

        <div className="bg-white dark:bg-blue-900 rounded-lg shadow-md overflow-hidden border border-blue-200 dark:border-blue-800">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-4">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-blue-100 dark:bg-blue-800 relative">
                <img
                  src={images[activeImage] || "/placeholder.svg?height=400&width=400"}
                  alt={name}
                  className="h-full w-full object-cover object-center"
                />

                {/* Sold Overlay */}
                {isSold && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">SOLD</span>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-md cursor-pointer border-2 transition-colors ${
                        activeImage === index ? "border-blue-500" : "border-blue-200 dark:border-blue-700"
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={image || "/placeholder.svg?height=80&width=80"}
                        alt={`${name} thumbnail ${index + 1}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{name}</h1>
                <div
                  className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${
                    status === "approved"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }
                `}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <FaTag className="text-blue-500 dark:text-blue-400" />
                <span className="text-sm text-blue-500 dark:text-blue-400 capitalize">{category}</span>
              </div>

              <div className="mt-4 flex items-baseline gap-4">
                <span className="text-3xl font-bold text-blue-900 dark:text-blue-100">₹{sellingPrice}</span>
                <span className="text-lg text-blue-500 dark:text-blue-400 line-through">₹{worthPrice}</span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {discountPercentage()}% off
                </span>
              </div>

              {/* Seller Info */}
              <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-800 rounded-md">
                <div className="text-sm text-blue-500 dark:text-blue-400 mb-1">Seller</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full flex items-center justify-center text-xl font-semibold">
                    {seller?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className="font-medium text-blue-900 dark:text-blue-100">{seller?.name || "Unknown"}</div>
                    <div className="text-sm text-blue-500 dark:text-blue-400">
                      Member since {formatDate(seller?.createdAt || createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {status === "approved" && !isSold && !isOwner ? (
                  <>
                    <button
                      onClick={handlePurchase}
                      disabled={paymentLoading}
                      className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {paymentLoading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaShoppingBag />
                          Buy Now - ₹{sellingPrice}
                        </>
                      )}
                    </button>

                    <button
                      onClick={addToCart}
                      className="w-full py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                  </>
                ) : isOwner ? (
                  <div className="p-3 bg-blue-50 dark:bg-blue-800 rounded-md text-blue-800 dark:text-blue-200 text-sm">
                    <div className="font-medium">You own this product</div>
                    <div>
                      Your listing is {status}. {status === "pending" ? "It will be reviewed by an admin soon." : ""}
                    </div>
                  </div>
                ) : status === "pending" ? (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-md text-yellow-800 dark:text-yellow-200 text-sm">
                    <div className="font-medium">Product is pending approval</div>
                    <div>This product is awaiting admin approval and is not available for purchase yet.</div>
                  </div>
                ) : isSold ? (
                  <div className="p-3 bg-red-50 dark:bg-red-900 rounded-md text-red-800 dark:text-red-200 text-sm">
                    <div className="font-medium">Product has been sold</div>
                    <div>This product is no longer available for purchase.</div>
                  </div>
                ) : (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-md text-yellow-800 dark:text-yellow-200 text-sm">
                    <div className="font-medium">Product is {status}</div>
                    <div>This product is not available for purchase.</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="p-6 border-t border-blue-200 dark:border-blue-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                  <FaInfoCircle className="text-blue-600 dark:text-blue-400" />
                  Description
                </h2>
                <div className="text-blue-700 dark:text-blue-300 leading-relaxed">{description}</div>
              </div>

              {/* Original Worth & History */}
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                  <FaRupeeSign className="text-blue-600 dark:text-blue-400" />
                  Product Value
                </h2>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="w-32 text-blue-500 dark:text-blue-400">Original Worth:</div>
                    <div className="font-medium text-blue-900 dark:text-blue-100">₹{worthPrice}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-32 text-blue-500 dark:text-blue-400">Selling Price:</div>
                    <div className="font-medium text-blue-900 dark:text-blue-100">₹{sellingPrice}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-32 text-blue-500 dark:text-blue-400">You Save:</div>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      ₹{worthPrice - sellingPrice} ({discountPercentage()}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reason for Sale */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                <FaExclamationTriangle className="text-blue-600 dark:text-blue-400" />
                Reason for Sale / Known Issues
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-md text-blue-700 dark:text-blue-300 leading-relaxed">
                {reason}
              </div>
            </div>

            {/* Listing History */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                <FaHistory className="text-blue-600 dark:text-blue-400" />
                Listing History
              </h2>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="w-32 text-blue-500 dark:text-blue-400">Listed On:</div>
                  <div className="text-blue-900 dark:text-blue-100">{formatDate(createdAt)}</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-32 text-blue-500 dark:text-blue-400">Status:</div>
                  <div className="capitalize text-blue-900 dark:text-blue-100">{status}</div>
                </div>
                {isSold && (
                  <div className="flex gap-2">
                    <div className="w-32 text-blue-500 dark:text-blue-400">Sold On:</div>
                    <div className="text-blue-900 dark:text-blue-100">{formatDate(product.purchaseDate)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OlxProductDetail
