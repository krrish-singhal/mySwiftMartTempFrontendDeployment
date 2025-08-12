import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';

const AdminOlxProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [filter, setFilter] = useState('pending'); // 'pending', 'approved', 'rejected', 'all'
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/olx-products?status=${filter}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching OLX products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, [filter]);
  
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  
  const handleApprove = async (productId) => {
    try {
      setActionLoading(true);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/olx-products/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Product approved successfully');
        fetchProducts();
        setShowModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error approving product:', error);
      toast.error('Failed to approve product');
    } finally {
      setActionLoading(false);
    }
  };
  
  const handleReject = async (productId) => {
    try {
      setActionLoading(true);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/olx-products/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Product rejected successfully');
        fetchProducts();
        setShowModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error rejecting product:', error);
      toast.error('Failed to reject product');
    } finally {
      setActionLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="max-w-screen-xl mx-auto w-screen">
      <div className="bg-white flex justify-between items-center py-3 px-6 mb-4">
        <h2 className="font-bold text-lg">OLX Marketplace Products</h2>
        
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === status
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === 'pending' && (
                <span className="ml-1 px-1.5 py-0.5 bg-white text-yellow-700 rounded-full text-xs">
                  {products.filter(p => p.status === 'pending').length || 0}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.images[0] || 'https://via.placeholder.com/40x40?text=No+Image'}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.seller.name}</div>
                    <div className="text-sm text-gray-500">{product.seller.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{product.sellingPrice}</div>
                    <div className="text-sm text-gray-500">Worth: ₹{product.worthPrice}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(product.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(product)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                      >
                        <FaEye />
                      </button>
                      
                      {product.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(product._id)}
                            className="text-green-600 hover:text-green-900 p-1"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleReject(product._id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500">
            {filter === 'pending'
              ? 'No products waiting for approval.'
              : filter === 'approved'
              ? 'No approved products yet.'
              : filter === 'rejected'
              ? 'No rejected products.'
              : 'No products available.'}
          </p>
        </div>
      )}
      
      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Product Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Images */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Product Images</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedProduct.name} ${index + 1}`}
                        className="rounded-md w-full h-40 object-cover"
                      />
                    ))}
                  </div>
                </div>
                
                {/* Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Product Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Name:</span>
                      <p className="font-medium">{selectedProduct.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Category:</span>
                      <p className="font-medium capitalize">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Original Worth:</span>
                      <p className="font-medium">₹{selectedProduct.worthPrice}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Selling Price:</span>
                      <p className="font-medium">₹{selectedProduct.sellingPrice}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Status:</span>
                      <p className="font-medium capitalize">{selectedProduct.status}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Seller:</span>
                      <p className="font-medium">{selectedProduct.seller.name} ({selectedProduct.seller.email})</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Listed On:</span>
                      <p className="font-medium">{formatDate(selectedProduct.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedProduct.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Reason for Sale / Known Issues</h3>
                  <p className="text-gray-700 bg-yellow-50 p-3 rounded">{selectedProduct.reason}</p>
                </div>
              </div>
              
              {/* Actions */}
              {selectedProduct.status === 'pending' && (
                <div className="mt-8 flex justify-end gap-4 pt-4 border-t">
                  <button
                    onClick={() => handleReject(selectedProduct._id)}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                  >
                    {actionLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <FaTimes />
                    )}
                    Reject Product
                  </button>
                  
                  <button
                    onClick={() => handleApprove(selectedProduct._id)}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                  >
                    {actionLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <FaCheck />
                    )}
                    Approve Product
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOlxProducts;