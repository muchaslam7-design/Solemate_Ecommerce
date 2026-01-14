
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ data, index, customWidth, keyPrefix }) => (
    <Link
        to={`/SellerProfile/${data.Product_ID || index}`}
        key={`${keyPrefix}-${data.Product_ID || index}`}
        //  h-[220px] remove bottom extra space
        className="bg-white border border-gray-200 rounded-lg p-3 shadow-md block h-[220px] group relative overflow-hidden flex-shrink-0 transform hover:scale-105 transition duration-300 hover:bg-gray-800" 
        style={customWidth ? { width: customWidth } : {}}
    >
        <img 
            src={data.Image_URL || 'https://via.placeholder.com/300'} 
            alt={data.Brand || 'Shoe'} 
            className="w-full object-contain rounded-md bg-white"
            style={{ height: '160px' }} 
            onError={(e) => { 
                e.target.onerror = null; 
                e.target.style.backgroundColor = 'lightgray'; 
            }}
        />
        
        {/* --- Hover Text Section --- */}
        <div 
            className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900/90 px-2"
        >
            <h3 
                className="text-xs font-semibold text-teal-300 text-center leading-tight line-clamp-2"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}
            >
                {data.Brand || data.Product_ID || 'Product Name'}
            </h3>
        </div>
    </Link>
);

export default ProductCard;