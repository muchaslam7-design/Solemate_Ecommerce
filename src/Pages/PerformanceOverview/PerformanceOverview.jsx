import React from "react";
import { FaBoxes, FaDollarSign, FaChartLine, FaTrophy, FaEye } from "react-icons/fa";

const PerformanceOverview = () => {
    // Dummy Data for demonstration
    const totalSales = 125000;
    const itemsSold = 842;
    const trendingProducts = [
        { id: 1, name: 'AirStride Pro 5', sales: 155, trend: 'UP', image: 'shoe_1.jpg' },
        { id: 2, name: 'Urban Runner X', sales: 120, trend: 'UP', image: 'shoe_2.jpg' },
        { id: 3, name: 'Classic Retro 86', sales: 90, trend: 'STABLE', image: 'shoe_3.jpg' },
    ];
    
    //Important data For Employee and Seller
    const employeeData = {
        totalOrders: 450,
        averageSaleValue: 150,
        conversionRate: '4.2%',
    };

    // ProductCard Component define in PerformanceOverview.
    const ProductCard = ({ name, sales, trend }) => (
        // Border: Green Accent
        <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center border-l-4 border-green-600">
            <div>
                <h4 className="text-lg font-bold text-gray-800">{name}</h4>
                {/* Sales: Green Accent */}
                <p className="text-sm text-gray-500">Sold: <span className="font-semibold text-green-700">{sales} units</span></p>
            </div>
            {/* Trend: UP ko Green, STABLE Blue */}
            <div className={`text-sm font-bold flex items-center ${trend === 'UP' ? 'text-green-600' : 'text-blue-500'}`}>
                {trend} <FaChartLine className="ml-1" />
            </div>
        </div>
    );


    return (
        // Background color light gray/teal
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            
            {/* Page Header */}
            <div className="max-w-7xl mx-auto text-center mb-12">
                {/* Heading color dark green/teal tone  */}
                <h1 className="text-5xl font-extrabold text-teal-700">
                    SoleMate Sales Activity Dashboard 📊
                </h1>
                {/* Sub-heading color dark gray diya */}
                <p className="mt-4 text-xl text-gray-600">
                    Progress, Performance, and Popularity at a Glance.
                </p>
            </div>

---
            
            {/* Section 1: Business Overview (Seller & Employee Focus) */}
            <h2 className="text-3xl font-bold text-gray-800 max-w-7xl mx-auto mb-6 flex items-center border-b pb-2">
                {/* Icon color Dark Teal */}
                <FaChartLine className="mr-3 text-teal-600" /> Key Business Metrics (Last 30 Days)
            </h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                
                {/* 1. Total Units Sold - Teal Accent */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-teal-600">
                    <FaBoxes className="text-3xl text-teal-600 mb-3" />
                    <p className="text-sm font-medium text-gray-500">Total Units Sold</p>
                    <p className="text-4xl font-extrabold text-gray-900">{itemsSold}</p>
                </div>
                
                {/* 2. Total Revenue - Green Accent (Theme Color) */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
                    <FaDollarSign className="text-3xl text-green-600 mb-3" />
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-4xl font-extrabold text-gray-900">${totalSales.toLocaleString()}</p>
                </div>

                {/* 3. Total Orders - Light Blue Accent */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                    <FaEye className="text-3xl text-blue-500 mb-3" />
                    <p className="text-sm font-medium text-gray-500">Total Orders Processed</p>
                    <p className="text-4xl font-extrabold text-gray-900">{employeeData.totalOrders}</p>
                </div>

                {/* 4. Conversion Rate - Cyan Accent */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-cyan-500">
                    <FaTrophy className="text-3xl text-cyan-500 mb-3" />
                    <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                    <p className="text-4xl font-extrabold text-gray-900">{employeeData.conversionRate}</p>
                </div>
            </div>

---

            {/* Section 2: Trending Products (Customer & Seller Focus) */}
            <h2 className="text-3xl font-bold text-gray-800 max-w-7xl mx-auto mb-6 flex items-center border-b pb-2">
                {/* Icon color Green-600*/}
                <FaTrophy className="mr-3 text-green-600" /> Currently Trending Shoes
            </h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {trendingProducts.map(product => (
                    <ProductCard key={product.id} name={product.name} sales={product.sales} trend={product.trend} />
                ))}
            </div>
            
---
            
            {/* Section 3: Detailed Sales Breakdown (All Products) */}
            <h2 className="text-3xl font-bold text-gray-800 max-w-7xl mx-auto mb-6 flex items-center border-b pb-2">
                {/* Icon color Dark Teal */}
                <FaBoxes className="mr-3 text-teal-700" /> Full Product Sales Breakdown
            </h2>
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg">
                <p className="text-lg text-gray-600 mb-4">
                    Below is the list of all **{itemsSold} units** sold, categorized by the shoe model and quantity. This information helps with inventory and re-ordering.
                </p>
                
                {/* This is where the table/detailed list of all sold shoes would go */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shoe Model</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sold</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Share</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Example Rows */}
                            {trendingProducts.map((p, index) => (
                                // Table row background colors lighter gray/teal tone
                                <tr key={p.id} className={index % 2 === 0 ? 'bg-teal-50' : 'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.sales} units</td>
                                    {/* Revenue share color Green-700 */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-semibold">${(p.sales * employeeData.averageSaleValue).toLocaleString()}</td>
                                    {/* color Green-600  */}
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${p.trend === 'UP' ? 'text-green-600' : 'text-blue-500'}`}>{p.trend}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            </div>

        </div>
    );
};

export default PerformanceOverview;