"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import VerticalCard from "../components/VerticalCard"

function SearchProduct() {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProduct = async () => {
    setLoading(true)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/search` + query.search)
    const dataResponse = await response.json()
    setLoading(false)
    setData(dataResponse.data)
  }

  useEffect(() => {
    fetchProduct()
  }, [query])

  return (
    <div className="container mx-auto p-4 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 p-6">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-blue-800 dark:text-blue-200">Loading...</p>
          </div>
        )}

        <p className="text-lg font-semibold my-3 text-blue-900 dark:text-blue-100">Search Results: {data.length}</p>

        {data.length === 0 && !loading && (
          <p className="bg-blue-50 dark:bg-blue-800 text-lg text-center p-8 rounded-lg text-blue-600 dark:text-blue-400">
            No data found...
          </p>
        )}

        {data.length !== 0 && !loading && <VerticalCard loading={loading} data={data} />}
      </div>
    </div>
  )
}

export default SearchProduct
