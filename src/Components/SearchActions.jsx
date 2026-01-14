
import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import { BiLayerPlus } from 'react-icons/bi';
import { MdOutlineViewCarousel } from 'react-icons/md';
import { TbTableDown } from 'react-icons/tb';

const SearchActions = ({ searchTerm, setSearchTerm, isTableView, setIsTableView, handleAddProductConfirm }) => {
    return (
        <div className="relative mb-8 flex justify-center items-center gap-2"> 
            <div className="relative w-full max-w-lg">
                <IoMdSearch size={24} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                <input
                    type="text"
                    placeholder={isTableView ? "Search ID, Brand, or Category..." : "Search Product, Category"}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300" 
                />
            </div>
            <button
                onClick={handleAddProductConfirm} 
                className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition duration-300 shadow-md flex items-center whitespace-nowrap gap-2"
            >
                <BiLayerPlus size={24} /> 
                Add Product
            </button>

            <button
                onClick={() => {
                    setIsTableView(!isTableView);
                    setSearchTerm(''); 
                }}
                className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-teal-600 transition duration-300 shadow-md flex items-center whitespace-nowrap gap-2"
            >
                {isTableView ? (
                    <>
                        <span className="text-xl"><MdOutlineViewCarousel /></span> Grid View
                    </>
                ) : (
                    <>
                        <TbTableDown size={20} /> 
                        Table Management View
                    </>
                )}
            </button>
        </div>
    );
};

export default SearchActions;