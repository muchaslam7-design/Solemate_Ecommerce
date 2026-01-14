import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { TbShoppingCartUp } from 'react-icons/tb';
import ProductCard from './ProductCard';

// Simple Chevron arrow components
const ChevronLeft = () => <span className="text-5xl font-extralight">〈</span>;
const ChevronRight = () => <span className="text-5xl font-extralight">〉</span>;

const itemsPerPage = 5;

// Add forceGridView prop
const GridCarouselView = ({ products, filteredProducts, searchTerm, handleViewDetails, forceGridView = false }) => {
    const scrollRef = useRef(null);

    // ... (scrollItems function logic) ...
    const scrollItems = (direction) => {
        if (scrollRef.current && products.length > 0) {
            const container = scrollRef.current;
            const scrollDistance = container.clientWidth;
            
            let newScrollLeft =
                direction === 'left'
                ? container.scrollLeft - scrollDistance
                : container.scrollLeft + scrollDistance;
            
            const totalScrollWidth = container.scrollWidth;
            const singleSetWidth = totalScrollWidth / 2;
            
            // Right Scroll Loop Logic
            if (direction === 'right' && newScrollLeft >= singleSetWidth) {
                container.scrollLeft = newScrollLeft - singleSetWidth;
                newScrollLeft = container.scrollLeft + scrollDistance;
            }
            
            // Left Scroll Loop Logic
            if (direction === 'left' && newScrollLeft < 0) {
                container.scrollLeft = singleSetWidth + newScrollLeft;
                newScrollLeft = container.scrollLeft - scrollDistance;
            }

            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth',
            });
        }
    };

    // display conditions
    const showCarousel = !forceGridView && searchTerm.length === 0;
    const showGrid = forceGridView || searchTerm.length > 0;
    
    return (
        <>
            {/* Carousel Section (Only visible when forceGridView is false AND no search term is active) */}
            {showCarousel && ( 
                <>
                    <div className="relative flex items-center w-full mb-auto pb-4">
                        <button
                            onClick={() => scrollItems('left')}
                            className="absolute left-0 z-20 p-2 transform -translate-y-1/2 top-1/2 text-gray-700 transition hover:text-teal-500 bg-white rounded-full shadow-lg"
                            disabled={products.length === 0}
                        >
                            <ChevronLeft />
                        </button>
                        <div
                            ref={scrollRef}
                            className="flex gap-6 overflow-x-scroll w-full mx-16 p-2"
                            style={{ scrollSnapType: 'x mandatory' }}
                        >
                            {products.length > 0 ? (
                                // Duplicating products for continuous loop effect
                                [...products, ...products].map((data, index) => (
                                    <div
                                        key={`c-${index}`}
                                        onClick={() => handleViewDetails(data)}
                                        style={{ width: `calc(100% / ${itemsPerPage} - 16px)` }}
                                        className="cursor-pointer transition duration-200 transform hover:shadow-xl hover:z-30 flex-shrink-0 snap-start"
                                    >
                                        <ProductCard
                                            data={data}
                                            index={index}
                                            keyPrefix={'carousel'}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-700 w-full">No featured products found.</p>
                            )}
                        </div>
                        <button
                            onClick={() => scrollItems('right')}
                            className="absolute right-0 z-20 p-2 transform -translate-y-1/2 top-1/2 text-gray-700 transition hover:text-teal-500 bg-white rounded-full shadow-lg"
                            disabled={products.length === 0}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                    
                    <div className="mt-16 p-10 rounded-xl text-center bg-teal-100 border-4 border-dashed border-gray-500">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Discover Our Latest Arrivals!
                        </h2>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Explore trending styles, new collections, and exclusive limited edition footwear. Your perfect sole mate is just a scroll away!
                        </p>
                        <Link
                            to="/shop-all"
                            className="mt-5 px-8 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-teal-600 transition duration-300 shadow-lg gap-2 flex items-center justify-center mx-auto w-max "
                        >
                            <TbShoppingCartUp size={25} /> Shop All Footwear
                        </Link>
                    </div>
                </>
            )}
            
            {/* Grid View (Visible when search term is active OR forceGridView is true) */}
            {showGrid && ( 
                <div className="mt-8">
                    {/* H2 tag use for jut search term */}
                    {searchTerm.length > 0 && (
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            Search Results for: <span className="text-teal-600">"{searchTerm}"</span>
                        </h2>
                    )}
                    
                    <div className="grid grid-cols-5 gap-6">
                        {/* In Grid filteredProducts is always render */}
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((data, index) => (
                                <div
                                    key={`s-${index}`}
                                    onClick={() => handleViewDetails(data)}
                                    className="cursor-pointer transition duration-200 transform hover:shadow-xl hover:scale-[1.02]"
                                >
                                    <ProductCard
                                        data={data}
                                        index={index}
                                        keyPrefix={'grid'}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="col-span-5 text-center text-gray-700 p-10 border rounded-lg">
                                Sorry, no products found matching "{searchTerm}".
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default GridCarouselView;