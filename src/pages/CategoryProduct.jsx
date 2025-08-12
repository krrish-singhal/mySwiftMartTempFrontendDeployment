"use client"

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import productCategory from "../helpers/productCategory"
import VerticalCard from "../components/VerticalCard"

function CategoryProduct() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListArray = urlSearch.getAll("category")

  const initialCategoryState = {}
  urlCategoryListArray.forEach((category) => {
    initialCategoryState[category] = true
  })

  const [selectCategory, setSelectCategory] = useState(initialCategoryState)
  const [filterCategoryList, setFilterCategoryList] = useState(Object.keys(initialCategoryState))
  const [sortBy, setSortBy] = useState("")

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/filter-product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: filterCategoryList }),
    })
    const dataResponse = await response.json()
    setData(dataResponse?.data || [])
    setLoading(false)
  }

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target
    setSortBy(value)
    setData((prev) => {
      const sorted = [...prev]
      return value === "asc"
        ? sorted.sort((a, b) => a.sellingPrice - b.sellingPrice)
        : sorted.sort((a, b) => b.sellingPrice - a.sellingPrice)
    })
  }

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }))
  }

  useEffect(() => {
    const selectedCategories = Object.keys(selectCategory).filter((key) => selectCategory[key])
    setFilterCategoryList(selectedCategories)

    const categoryQuery = selectedCategories.map((cat) => `category=${cat}`).join("&")
    navigate(`/product-category?${categoryQuery}`)
  }, [selectCategory])

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  return (
    <div className="container mx-auto p-4 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="hidden lg:grid grid-cols-[200px,1fr] gap-6">
        {/* Left Panel */}
        <div className="bg-white dark:bg-blue-900 p-4 min-h-[calc(100vh-120px)] overflow-y-auto scrollbar-none rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
          {/* Sort By */}
          <div className="mb-6">
            <h3 className="text-base uppercase font-medium text-blue-800 dark:text-blue-200 border-b border-blue-200 dark:border-blue-700 pb-2 mb-3">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  value="asc"
                  onChange={handleOnChangeSortBy}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <label className="text-blue-700 dark:text-blue-300">Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  value="dsc"
                  onChange={handleOnChangeSortBy}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <label className="text-blue-700 dark:text-blue-300">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter By Category */}
          <div>
            <h3 className="text-base uppercase font-medium text-blue-800 dark:text-blue-200 border-b border-blue-200 dark:border-blue-700 pb-2 mb-3">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-3">
              {productCategory.map((category) => (
                <div className="flex items-center gap-3" key={category.value}>
                  <input
                    type="checkbox"
                    name="category"
                    id={category.value}
                    value={category.value}
                    checked={!!selectCategory[category.value]}
                    onChange={handleSelectCategory}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <label htmlFor={category.value} className="text-blue-700 dark:text-blue-300 cursor-pointer">
                    {category.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right Panel - Products */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 p-4">
          <p className="font-medium text-blue-800 dark:text-blue-200 text-lg mb-4">Search Results: {data.length}</p>
          <div className="min-h-[calc(100vh-200px)] overflow-y-auto scrollbar-none">
            {data.length !== 0 ? (
              <VerticalCard data={data} loading={loading} />
            ) : (
              <p className="text-blue-500 dark:text-blue-400 text-sm text-center py-8">No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
