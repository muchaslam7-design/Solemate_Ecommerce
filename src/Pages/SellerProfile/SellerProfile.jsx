
import axios from 'axios';
import React, { useEffect, useState,  useMemo, useCallback } from 'react'; 

// --- Import Split Components ---

import { ConfirmationModal, SuccessModal } from '../../Components/Modals';
import SearchActions from '../../Components/SearchActions';
import TableView from '../../Components/TableView';
import GridCarouselView from '../../Components/GridCarouselView';
import ProductDetail from '../ProductDetail/ProductDetail';
import ProductForm from '../ProductForm/ProductForm';
 

// --- CONSTANTS for Local Storage ---
const LOCAL_STORAGE_KEY = 'cachedProductsData_NewVersion'; 
const API_URL = 'https://fakestoreapi.com/products';


const SellerProfile = () => {
    // --- States ---
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [isTableView, setIsTableView] = useState(false); 
    const [isAddFormOpen, setIsAddFormOpen] = useState(false); 
    const [currentProduct, setCurrentProduct] = useState(null); 
    const [successModal, setSuccessModal] = useState(null); 
    const [addProductModal, setAddProductModal] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); // Detail View State
    
    // --- Handlers for Product Detail View ---
    const handleViewDetails = (productData) => {
        // When click on any product
        setSelectedProduct(productData);
    };

    const handleCloseDetails = () => {
        // From Detail page back to list view
        setSelectedProduct(null);
    };
    
    // --- Data Sanitization, Fetching, Handlers ---
    const sanitizeAndSave = useCallback((data) => {
    let fetchedProducts = Array.isArray(data) ? data : (data.products || []);
    
    const sanitizedProducts = fetchedProducts.map((p, index) => ({
        ...p,
        Product_ID: p.id || p.Product_ID || `temp-id-${index}`,
        // When image from API then push into image_url
        Image_URL: p.image || p.Image_URL || 'https://via.placeholder.com/300', 
        Brand: p.title || p.Brand,
        Price_PKR: p.price ? Math.floor(p.price * 280) : p.Price_PKR,
        Category: p.category || p.Category
    }));
    
    setProducts(sanitizedProducts);
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitizedProducts));
    } catch (error) {
        console.error("Could not save to Local Storage:", error);
    }
}, []);

    useEffect(() => {
        let isCancelled = false;
        
        const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cachedData) {
            try {
                const parsedData = JSON.parse(cachedData);
                if (Array.isArray(parsedData) && parsedData.length > 0) {
                    console.log("Using cached data from Local Storage.");
                    setProducts(parsedData);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error parsing cached data, fetching new data.", error);
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
        }

        const fetchData = async () => {
            if (!cachedData) {
                setLoading(true); 
            }
            try {
                const res = await axios.get(API_URL);
                if (!isCancelled) {
                    sanitizeAndSave(res.data);
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error("Error fetching fresh data:", error);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();
        
        return () => {
            isCancelled = true;
        };
    }, [sanitizeAndSave]);


    const handleFormClose = (status) => {
        setIsAddFormOpen(false); 
        setCurrentProduct(null); 

        if (status && status.success) {
            setSuccessModal({
                title: 'Success!',
                message: status.message || 'Product saved successfully!',
                type: 'success'
            });
            try {
            } catch (error) {
                console.error("Could not update Local Storage after form save:", error);
            }
            
        } else if (status && status.error) {
            setSuccessModal({
                title: 'Error!',
                message: status.message || 'Failed to save product.',
                type: 'error'
            });
        }
    };
    
    const handleAddProductConfirm = () => {
        setAddProductModal({
            title: 'Add New Product',
            message: 'Are you sure you want to open the form to add a brand new product to the inventory?',
            confirmText: 'Yes, Add Product',
            onConfirm: () => {
                setAddProductModal(null); 
                setCurrentProduct(null); 
                setIsAddFormOpen(true); 
            },
            onCancel: () => setAddProductModal(null),
            type: 'add'
        });
    };

    // When Edit button click from ProductDetail
    const handleEditProduct = (product) => {
        // 1. imedately close Detail View 
        setSelectedProduct(null); 
        
        // 2. Data set for Edit Form
        setCurrentProduct(product); 
        
        // 3. Form Modal open
        setIsAddFormOpen(true); 
    };
    
    const handleDeleteProduct = async (productID) => {
        setAddProductModal({
            title: 'Confirm Deletion',
            message: `Are you sure you want to permanently delete Product ID: ${productID}? (This is local only.)`,
            confirmText: 'Delete',
            onConfirm: () => {
                const newProducts = products.filter(p => String(p.Product_ID) !== String(productID));
                setProducts(newProducts); 
                try {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProducts));
                } catch (error) {
                    console.error("Could not update Local Storage after deletion:", error);
                }
                
                setAddProductModal(null); 
                setSuccessModal({
                    title: 'Deleted!',
                    message: `Product ${productID} deleted locally!`,
                    type: 'error' 
                });
            },
            onCancel: () => setAddProductModal(null),
            type: 'delete'
        });
    };

    const filteredProducts = useMemo(() => {
        const searchString = searchTerm.toLowerCase().trim();

        if (!searchString) {
            return products;
        }
        
        const priceMatch = searchString.match(/under\s+(\d+)/);
        const priceLimit = priceMatch ? parseFloat(priceMatch[1]) : null;

        let cleanSearchString = searchString.replace(/under\s+\d+/g, '').replace(/\s+(shoes|shoe|price|pkd|in|the|a|for)\s*/g, ' ').trim();
        if (!cleanSearchString) cleanSearchString = '.*';

        return products.filter(product => {
            const brandMatch = (product.Brand && product.Brand.toLowerCase().includes(cleanSearchString));
            const categoryMatch = (product.Category && product.Category.toLowerCase().includes(cleanSearchString));
            
            const textMatch = (
                cleanSearchString === '.*' || 
                brandMatch || 
                categoryMatch ||
                (product.Color && product.Color.toLowerCase().includes(cleanSearchString)) ||
                (product.Description && product.Description.toLowerCase().includes(cleanSearchString)) 
            );

            let priceIsWithinLimit = true;
            if (priceLimit) {
                const currentPrice = parseFloat(product.Discount_Price_PKR || product.Price_PKR || product.Retail_Price || product.Price);
                priceIsWithinLimit = !isNaN(currentPrice) && currentPrice < priceLimit;
            }

            if (isTableView) {
                const idMatch = (product.Product_ID && String(product.Product_ID).toLowerCase().includes(searchString));
                return idMatch || brandMatch || categoryMatch;
            }
            
            return textMatch && priceIsWithinLimit;
        });
    }, [products, searchTerm, isTableView]); 
    // ---------------------------------------------
    
    return (
        <div className="p-6 min-h-screen bg-white"> 

            {/* --- MODALS --- (ProductForm, Confirmation, Success) */}
            {(isAddFormOpen) && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
                    <ProductForm 
                        onClose={handleFormClose} 
                        productToEdit={currentProduct}
                        products={products}
                        setProducts={setProducts}
                    />
                </div>
            )}
            
            {addProductModal && (
                <ConfirmationModal {...addProductModal} />
            )} 
            {successModal && (
                <SuccessModal 
                    title={successModal.title}
                    message={successModal.message}
                    type={successModal.type}
                    onClose={() => setSuccessModal(null)} 
                />
            )}
            
            {/* --- MAIN CONTENT RENDERING --- */}
            {selectedProduct ? (
                // 1. PRODUCT DETAIL VIEW (When selectedProduct set)
                <div className="fixed inset-0 z-40 p-0 bg-gray-100 overflow-y-auto"> 
                    <ProductDetail 
                        product={selectedProduct} // Selected product data pass
                        onBack={handleCloseDetails} // Back button handler (selectedProduct = null)
                        setProducts={setProducts} 
                        products={products}
                        onEdit={handleEditProduct} // Edit button handler (selectedProduct = null and form open)
                    />
                </div>
            ) : (
                // 2. LIST/TABLE VIEW (When selectedProduct is null)
                <>
                    {/* --- Search Bar & Action Buttons --- */}
                    <SearchActions
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        isTableView={isTableView}
                        setIsTableView={setIsTableView}
                        handleAddProductConfirm={handleAddProductConfirm}
                    />

                    {loading ? (
                        // --- Loading State ---
                        <div className="flex justify-center items-center h-96">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div> 
                            <p className="ml-4 text-gray-700 font-semibold">Loading Products...</p> 
                        </div>
                    ) : (
                        <>
                            {/* CONDITION 1: TABLE VIEW */}
                            {isTableView ? (
                                <TableView
                                    filteredProducts={filteredProducts}
                                    searchTerm={searchTerm}
                                    handleEditProduct={handleEditProduct}
                                    handleDeleteProduct={handleDeleteProduct}
                                    handleViewDetails={handleViewDetails} 
                                />
                            ) : (
                                
                                <GridCarouselView
                                    products={products}                
                                    filteredProducts={filteredProducts} 
                                    searchTerm={searchTerm}
                                    handleViewDetails={handleViewDetails} 
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default SellerProfile;