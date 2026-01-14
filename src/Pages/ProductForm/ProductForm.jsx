
import React from 'react';
import { useForm } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';

const ProductForm = ({ onClose, productToEdit, setProducts, products }) => {
    
    const isEditing = !!productToEdit;
    
    // 1. Initialize React Hook Form (RHF)
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        defaultValues: productToEdit || {
            Product_ID: Date.now(), 
            Brand: '',
            Category: '',
            Price_PKR: '',
            Material: '',
            Color: '',
            Gender: '',
            Image_url: '',
            Discount_Percentage: '',
        }
    });

    // 2. Form Fields with Validation Rules
    const formFields = [
        { 
            label: 'Brand Name', 
            name: 'Brand', 
            type: 'text', 
            validation: { 
                required: 'Brand Name is required.', 
                pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'Only letters and spaces are allowed.'
                }
            } 
        },
        { 
            label: 'Category', 
            name: 'Category', 
            type: 'text', 
            validation: { 
                required: 'Category is required.',
                pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'Only letters and spaces are allowed.'
                }
            }
        },
        { 
            label: 'Price (PKR)', 
            name: 'Price_PKR', 
            type: 'number', 
            validation: { 
                required: 'Price is required.',
                min: { value: 1, message: 'Price must be greater than 0.' },
                pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message: 'Invalid price format.'
                }
            }
        },
        { label: 'Material', name: 'Material', type: 'text', validation: {} },
        { label: 'Color', name: 'Color', type: 'text', validation: {} },
        { label: 'Gender', name: 'Gender', type: 'text', validation: {} },
        { 
            label: 'Discount (%)', 
            name: 'Discount_Percentage', 
            type: 'number', 
            validation: { 
                min: { value: 0, message: 'Discount cannot be negative.' },
                max: { value: 100, message: 'Discount cannot exceed 100%.' }
            } 
        },
        { label: 'Image URL', name: 'Image_url', type: 'text', validation: {} },
    ];


    // 3. Handle Submit function for RHF
    const onSubmit = (data) => {
        
        let finalData = { ...data };
        let successMessage;

        finalData.Price_PKR = parseFloat(finalData.Price_PKR) || 0;
        finalData.Discount_Percentage = parseFloat(finalData.Discount_Percentage) || 0;


        if (isEditing) {
            setProducts(
                products.map(p => 
                    String(p.Product_ID) === String(finalData.Product_ID) ? finalData : p
                )
            );
            successMessage = `Product ID: ${finalData.Product_ID} updated successfully!`;
        } else {
            const newProduct = {
                ...finalData,
                Product_ID: `NEW_${Date.now()}`,
            };
            setProducts([newProduct, ...products]);
            successMessage = 'New product added successfully!';
        }
        
        onClose({ success: true, message: successMessage });
    };

    // Helper function to get the input border class
    const getInputBorderClass = (fieldName) => {
        return errors[fieldName] 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'; // Teal accent
    };


    return (
        //BACKGROUND: Using a gradient for a soft, modern look (Light Slate/Lavender)
        <div 
            className="fixed inset-0 bg-gradient-to-br from-slate-200 via-white to-teal-100 backdrop-blur-sm flex justify-center z-50 p-4 py-8 overflow-y-auto items-start"
            onClick={onClose}
        >
            {/* The Actual Form Container */}
            <div 
                // Border color is Teal
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-xl transform transition duration-300 scale-100 relative border-t-4 border-teal-600"
                onClick={e => e.stopPropagation()}
            >
                {/* Heading color is Dark Gray/Charcoal */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                    {isEditing ? `Edit Product: ${productToEdit?.Brand || 'Details'}` : 'Add New Product'}
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    
                    {formFields.map(field => (
                        <div key={field.name} className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label} {field.validation.required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type={field.type}
                                {...register(field.name, field.validation)}
                                className={`w-full p-3 border rounded-md transition duration-200 
                                            ${getInputBorderClass(field.name)}`}
                            />
                            
                            {/* Error Message Display */}
                            {errors[field.name] && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <BiErrorCircle className="w-4 h-4" />
                                    {errors[field.name].message}
                                </p>
                            )}
                        </div>
                    ))}
                    
                    {/* Modal Footer */}
                    <div className="flex justify-end space-x-4 pt-4 border-t mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            // Submit button color is Teal
                            className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition duration-300 shadow-md"
                        >
                            {isEditing ? 'Save Changes' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;