import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import AdminProductApproval from './AdminProductApproval';

const AdminProductsDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState('pending'); // 'all', 'pending', 'approved', 'rejected'
  const [counts, setCounts] = useState({
    all: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  // Fetch product counts
  const fetchCounts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/admin-product-counts`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch product counts');
      }
      
      const data = await response.json();
      setCounts(data.counts);
    } catch (error) {
      console.error('Error fetching product counts:', error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/admin-products?status=${filter}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(error.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load products on mount and when filter changes
  useEffect(() => {
    fetchProducts();
    fetchCounts();
  }, [filter]);

  // Handle quick approval/rejection
  const handleQuickAction = async (productId, status) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/update-product-status`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          status
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Action failed');
      }
      
      toast.success(`Product ${status === 'approved' ? 'approved' : 'rejected'} successfully`, {
        position: "top-center",
      });
      fetchProducts();
      fetchCounts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  // Open product details modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  // Close product details modal
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-2xl font-bold mb-6">OLX Product Approval Dashboard</h1>
      
      {/* Filter Controls */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All
            <span className="bg-white text-blue-600 text-xs px-2 py-1 rounded-full">{counts.all}</span>
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          >
            Pending
            <span className="bg-white text-yellow-600 text-xs px-2 py-1 rounded-full">{counts.pending}</span>
          </button>
          <button 
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Approved
            <span className="bg-white text-green-600 text-xs px-2 py-1 rounded-full">{counts.approved}</span>
          </button>
          <button 
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            Rejected
            <span className="bg-white text-red-600 text-xs px-2 py-1 rounded-full">{counts.rejected}</span>
          </button>
        </div>
      </div>
      
      {/* Products Table */}
      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No {filter !== 'all' ? filter : ''} products found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Seller</th>
                <th className="px-4 py-3 text-left">Listed On</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0] || "/placeholder.svg"} 
                          alt={product.name} 
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No img</span>
                        </div>
                      )}
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{product.category}</td>
                  <td className="px-4 py-3">₹{product.sellingPrice}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      product.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.userId?.name || 'Unknown'}
                  </td>
                  <td className="px-4 py-3">
                    {formatDate(product.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openProductModal(product)}
                        className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      
                      {product.status !== 'approved' && (
                        <button 
                          onClick={() => handleQuickAction(product._id, 'approved')}
                          className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                      )}
                      
                      {product.status !== 'rejected' && (
                        <button 
                          onClick={() => handleQuickAction(product._id, 'rejected')}
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Product Approval Modal */}
      {selectedProduct && (
        <AdminProductApproval 
          product={selectedProduct} 
          onClose={closeProductModal} 
          refreshProducts={() => {
            fetchProducts();
            fetchCounts();
          }}
        />
      )}
    </div>
  );
};

export default AdminProductsDashboard;