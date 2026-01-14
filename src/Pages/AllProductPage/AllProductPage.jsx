
import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react'; // useMemo imported
import { Link } from 'react-router-dom';

const AllProductsPage = () => {
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All'); 
    const [categories, setCategories] = useState([]); 
    
    // NEW STATE: Sort Order 
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'lowToHigh', 'highToLow'

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get('https://mocki.io/v1/ffc1ebeb-c294-456e-a8b2-cbfb6d3de44d'); 
                
                let fetchedProducts = [];
                if (Array.isArray(res.data)) {
                    fetchedProducts = res.data;
                } else if (res.data && Array.isArray(res.data.products)) {
                    fetchedProducts = res.data.products;
                }
                
                // Assuming 'Price' field exists in the API response objects
                setProducts(fetchedProducts);
                
                // --- Extract Unique Categories ---
                if (fetchedProducts.length > 0) {
                    const uniqueCategories = [
                        'All',
                        ...new Set(fetchedProducts.map(p => p.Category).filter(c => c))
                    ];
                    setCategories(uniqueCategories);
                }
                // ----------------------------------
                
            } catch (error) {
                console.error("Error fetching all products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // LOGIC: Filtering and Sorting in one go using useMemo 
    const sortedAndFilteredProducts = useMemo(() => {
        // 1. Filtering by Category
        let currentProducts = products.filter(product => {
            if (selectedCategory === 'All') {
                return true;
            }
            return product.Category && product.Category === selectedCategory;
        });

        // 2. Sorting by Price
        if (sortOrder !== 'default') {
            currentProducts = [...currentProducts].sort((a, b) => {
                // Ensure price is treated as a number. Using 'Retail_Price' if available, otherwise defaulting to 0.
                const priceA = parseFloat(a.Retail_Price) || parseFloat(a.Price) || 0;
                const priceB = parseFloat(b.Retail_Price) || parseFloat(b.Price) || 0;
                
                if (sortOrder === 'lowToHigh') {
                    return priceA - priceB;
                } else if (sortOrder === 'highToLow') {
                    return priceB - priceA;
                }
                return 0;
            });
        }
        
        return currentProducts;
    }, [products, selectedCategory, sortOrder]); // Depend on these states

    // Product Card component (remains the same)
    const ProductCard = ({ data, index }) => (
        <Link
            to={`/SellerProfile/${data.Product_ID || index}`}
            key={`all-${data.Product_ID || index}`}
            className="bg-white border border-gray-200 rounded-lg p-3 shadow-md block h-auto group relative overflow-hidden transform hover:scale-105 transition duration-300 hover:bg-purple-600" 
        >
            <img 
                src={data.image_url || 'https://storage.googleapis.com/web-dev-assets/image-optim/demo-images/img/placeholder.png'} 
                alt={data.Brand || 'Shoe'} 
                className="w-full object-contain rounded-md bg-white"
                style={{ height: '180px' }} 
                onError={(e) => { e.target.onerror = null; e.target.style.backgroundColor = 'lightgray'; }}
            />
            <div className="h-10 mt-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold text-pink-300 group-hover:text-pink-300 text-center">
                    {data.Brand || 'Product Name'}
                </h3>
            </div>
        </Link>
    );

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <h1 className="text-4xl font-extrabold text-purple-800 mb-8 border-b-4 border-pink-500 pb-2">
                All Footwear Collections
            </h1>
            
            {/* Filter and Sort Controls Container */}
            <div className="flex justify-between items-center mb-6 flex-wrap">
                
                {/* Category Filter Bar */}
                <div className="flex space-x-4 overflow-x-auto pb-2 flex-shrink-0">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-300 flex-shrink-0 ${
                                selectedCategory === cat
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-purple-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                
                {/* Price Sort Dropdown  */}
                <div className="mt-2 md:mt-0 flex items-center space-x-2 flex-shrink-0">
                    <label htmlFor="sort" className="text-gray-700 font-semibold text-sm">Sort By:</label>
                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg bg-white focus:ring-pink-500 focus:border-pink-500 text-sm"
                    >
                        <option value="default">Default</option>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                    </select>
                </div>
                {/* ---------------------------------- */}
            </div>
            {/* End Controls Container */}
            
            <p className="text-gray-600 mb-6">
                Showing **{sortedAndFilteredProducts.length}** items 
                {selectedCategory !== 'All' && ` in category "${selectedCategory}"`}
            </p>

            {/* ... (Loader and Product Grid ) */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    <p className="ml-4 text-purple-700 font-semibold">Loading all inventory...</p>
                </div>
            ) : (
                <>
                    {sortedAndFilteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {sortedAndFilteredProducts.map((data, index) => (
                                <ProductCard data={data} index={index} key={data.Product_ID || index} />
                            ))}
                        </div>
                    ) : (
                        <p className="col-span-full text-center text-xl text-gray-600 p-10 border rounded-lg bg-white shadow">
                            No products found in the selected category "{selectedCategory}".
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default AllProductsPage;