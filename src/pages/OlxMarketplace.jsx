"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { FaFilter, FaSearch, FaPlus, FaUser, FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"
import ProductCard from "../components/OlxProductCard"
import OlxUploadForm from "../components/OlxUploadForm"

// Constants
const CATEGORIES = [
  "All Categories",
  "Electronics",
  "Furniture",
  "Clothing",
  "Books",
  "Sports",
  "Appliances",
  "Vehicles",
  "Toys",
  "Collectibles",
  "Other",
]

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
]

const OlxMarketplace = () => {
  // State
  const [products, setProducts] = useState([])
  const [myProducts, setMyProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [showMyListings, setShowMyListings] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  // Filter state
  const [filters, setFilters] = useState({
    category: "All Categories",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
    search: "",
  })

  // Load cart count on mount
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("olxCart")
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart)
          setCartCount(cart.length)
        } catch (error) {
          setCartCount(0)
        }
      } else {
        setCartCount(0)
      }
    }

    updateCartCount()

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user-details`, {
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json()
          setUserDetails(data.user)
        }
      } catch (error) {
        console.error("Error fetching user details:", error)
      }
    }

    fetchUserDetails()
  }, [])

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true)

      // Build query string from filters
      const queryParams = new URLSearchParams()

      if (filters.category && filters.category !== "All Categories") {
        queryParams.append("category", filters.category.toLowerCase())
      }

      if (filters.minPrice) {
        queryParams.append("minPrice", filters.minPrice)
      }

      if (filters.maxPrice) {
        queryParams.append("maxPrice", filters.maxPrice)
      }

      if (filters.sort) {
        queryParams.append("sort", filters.sort)
      }

      if (filters.search) {
        queryParams.append("search", filters.search)
      }

      // Only show approved and unsold products
      queryParams.append("status", "approved")

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/products?${queryParams.toString()}`, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch user's own products
  const fetchMyProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/my-products`, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch your products")
      }

      const data = await response.json()
      setMyProducts(data.products || [])
    } catch (error) {
      console.error("Error fetching your products:", error)
    }
  }

  // Load products on mount and when filters change
  useEffect(() => {
    fetchProducts()
    if (userDetails) {
      fetchMyProducts()
    }
  }, [filters, userDetails])

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    fetchProducts()
  }

  // Add to cart function - SIMPLE AND WORKING
  const addToCart = (product) => {
    try {
      // Get existing cart
      const existingCart = localStorage.getItem("olxCart")
      let cart = []

      if (existingCart) {
        cart = JSON.parse(existingCart)
      }

      // Check if product already in cart
      const isAlreadyInCart = cart.some((item) => item._id === product._id)

      if (isAlreadyInCart) {
        toast.info("Product is already in your cart")
        return
      }

      // Add product to cart
      const cartItem = {
        _id: product._id,
        name: product.name,
        category: product.category,
        sellingPrice: product.sellingPrice,
        description: product.description,
        images: product.images || [],
      }

      cart.push(cartItem)

      // Save to localStorage
      localStorage.setItem("olxCart", JSON.stringify(cart))

      // Update cart count
      setCartCount(cart.length)

      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent("cartUpdated"))

      toast.success(`${product.name} added to cart!`)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add product to cart")
    }
  }

  // Toggle upload form
  const toggleUploadForm = () => {
    setShowUploadForm((prev) => !prev)
  }

  // Toggle between marketplace and my listings
  const toggleMyListings = () => {
    setShowMyListings((prev) => !prev)
  }

  // Determine which products to display
  const displayProducts = showMyListings ? myProducts : products

  return (
    <div className="container mx-auto p-4 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">OLX Marketplace</h1>
        <div className="flex gap-2">
          {/* Cart Link */}
          <Link
            to="/olx-cart"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 transition-colors relative"
          >
            <FaShoppingCart size={16} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {userDetails && (
            <button
              onClick={toggleMyListings}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                showMyListings
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <FaUser size={12} />
              {showMyListings ? "Show Marketplace" : "My Listings"}
            </button>
          )}
          <button
            onClick={toggleUploadForm}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center gap-2 transition-colors"
          >
            <FaPlus size={12} />
            List Product
          </button>
        </div>
      </div>

      {/* Filters - Only show in marketplace view */}
      {!showMyListings && (
        <div className="bg-white dark:bg-blue-900 p-4 rounded-lg shadow-md mb-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-blue-500 dark:text-blue-400" />
            <h2 className="font-semibold text-blue-900 dark:text-blue-100">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-blue-800 text-blue-900 dark:text-blue-100"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">Min Price</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="0"
                  className="w-full p-2 border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-blue-800 text-blue-900 dark:text-blue-100"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">Max Price</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="1000000"
                  className="w-full p-2 border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-blue-800 text-blue-900 dark:text-blue-100"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">Sort By</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="w-full p-2 border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-blue-800 text-blue-900 dark:text-blue-100"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">Search</label>
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search products..."
                  className="flex-1 p-2 border border-blue-200 dark:border-blue-700 rounded-l-md bg-white dark:bg-blue-800 text-blue-900 dark:text-blue-100"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-3 rounded-r-md hover:bg-yellow-600 transition-colors"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Title for My Listings */}
      {showMyListings && (
        <div className="bg-white dark:bg-blue-900 p-4 rounded-lg shadow-md mb-6 border border-blue-200 dark:border-blue-800">
          <h2 className="font-semibold text-lg text-blue-900 dark:text-blue-100">My Product Listings</h2>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Here you can see all your listed products and their current status.
          </p>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-500 dark:text-blue-400">Loading products...</p>
        </div>
      ) : displayProducts.length === 0 ? (
        <div className="text-center py-8 bg-white dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-500 dark:text-blue-400">
            {showMyListings ? "You haven't listed any products yet" : "No products found"}
          </p>
          <p className="text-sm text-blue-400 dark:text-blue-500 mt-2">
            {showMyListings
              ? "Click 'List Product' to add your first product"
              : "Try adjusting your filters or be the first to list a product!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              refreshProducts={showMyListings ? fetchMyProducts : fetchProducts}
              addToCart={addToCart}
              showOwnerControls={showMyListings}
            />
          ))}
        </div>
      )}

      {/* Upload Form Modal */}
      {showUploadForm && (
        <OlxUploadForm
          onClose={toggleUploadForm}
          onSuccess={() => {
            fetchMyProducts()
            setShowMyListings(true)
          }}
        />
      )}
    </div>
  )
}

export default OlxMarketplace
