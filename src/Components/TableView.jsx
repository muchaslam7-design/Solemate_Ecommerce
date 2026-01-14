
import React from 'react';
import { HiClipboardDocumentList } from 'react-icons/hi2';

// handleViewDetails receive in props
const TableView = ({ filteredProducts, searchTerm, handleEditProduct, handleDeleteProduct, handleViewDetails }) => {
    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 gap-2 flex">
                <HiClipboardDocumentList size={40} /> Product Inventory Management
            </h2>
            
            {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-600 p-10 border rounded-lg bg-white">
                    {searchTerm ? `No products found matching "${searchTerm}".` : 'No products in inventory.'}
                </p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100"> 
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (PKR)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount %</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.Product_ID} className="hover:bg-teal-50/50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.Product_ID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.Brand}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.Category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600 font-semibold"> 
                                        {product.Discount_Price_PKR || product.Price_PKR || product.Retail_Price || product.Price || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                                        {product.Discount_Percentage ? `${product.Discount_Percentage}%` : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center">
                                        
                                        {/*  View Details Button */}
                                        <button
                                            onClick={() => handleViewDetails(product)}
                                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded-md"
                                        >
                                            Details
                                        </button>

                                        <button
                                            onClick={() => handleEditProduct(product)}
                                            className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-2 py-1 rounded-md"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.Product_ID)}
                                            className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TableView;