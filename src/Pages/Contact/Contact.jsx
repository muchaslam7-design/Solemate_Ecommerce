import React from 'react';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from 'react-icons/md';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  // KFUEIT Details (reference)
  const kfueit_address = "Abu Dhabi Rd, Rahim Yar Khan";
  const kfueit_map_url = `<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.272516306485!2d70.37177987540318!3d28.3808358954661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39375efadd8e3573%3A0xf516a4b3e4cb06b8!2sKhwaja%20Fareed%20University%20of%20Engineering%20%26%20Information%20Technology%20(KFUEIT)!5e0!3m2!1sen!2s!4v1760788125600!5m2!1sen!2s" 
  width="600"
  height="450" 
  style="border:0;" 
  allowfullscreen=""
   loading="lazy" 
   referrerpolicy="no-referrer-when-downgrade">
   </iframe>`
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Business Inquiries & Partnership
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Connect with the SoleMate management team for partnerships, vendor relations, and other business matters.
        </p>
      </div>

---

      {/* Main Content Area: Business Details (Left) and Map (Right) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Side: Direct Contact Information (Business Details) */}
        <div className="bg-white p-8 shadow-xl rounded-lg h-full"> 
          {/* Heading color Teal */}
          <h3 className="text-3xl font-bold text-teal-700 mb-8">
            SoleMate Corporate Headquarters
          </h3>

          <div className="space-y-6">
            
            {/* 1. Address */}
            <div className="flex items-start space-x-4 border-b pb-4">
              {/* Icon color Green */}
              <MdLocationOn className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg font-semibold text-gray-900">Head Office Location</p>
                <p className="text-gray-700">
                  **SoleMate Pvt. Ltd.** <br />
                  123 Fashion Lane, Corporate Tower, Suite 400, <br />
                  New York, NY 10001, USA
                </p>
              </div>
            </div>

            {/* 2. Primary Email */}
            <div className="flex items-center space-x-4 border-b pb-4">
              {/* Icon color Green */}
              <MdEmail className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-lg font-semibold text-gray-900">General Inquiry Email</p>
                {/* Email link color Teal */}
                <p className="text-teal-700 font-medium hover:underline">
                  <a href="mailto:info@solematebusiness.com">info@solematebusiness.com</a>
                </p>
              </div>
            </div>

            {/* 3. Phone */}
            <div className="flex items-center space-x-4 border-b pb-4">
              {/* Icon color Green */}
              <MdPhone className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-lg font-semibold text-gray-900">Business Phone Line</p>
                <p className="text-gray-700 font-medium">
                  **+1 (234) 567-890** (Mon-Fri, 9 AM - 5 PM EST)
                </p>
              </div>
            </div>

            {/* 4. Operating Hours */}
            <div className="flex items-center space-x-4">
              {/* Icon color Green */}
              <MdAccessTime className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-lg font-semibold text-gray-900">Working Hours</p>
                <p className="text-gray-700 font-medium">
                  Monday to Friday: 9:00 AM – 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Map and Social Media */}
        <div className="space-y-8">
          
          {/* 5. Map Embed for KFUEIT */}
          <div className="bg-white shadow-xl rounded-lg overflow-hidden h-96 w-full">
            <h3 className="text-center bg-gray-100 text-gray-500 py-3 font-semibold flex items-center justify-center space-x-2">
              <span>Location Map (KFUEIT, Rahim Yar Khan)</span>
               <MdLocationOn className="w-5 h-5 text-teal-600" />
            </h3>
            
           {/* Map Embed */}
            <div 
              className="h-full w-full"
              dangerouslySetInnerHTML={{ __html: kfueit_map_url }} 
            />
          </div>

          {/* 6. Social Media Links (Business-focused) */}
          <div className="bg-white p-6 shadow-xl rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
              Connect on Professional Platforms
            </h3>
            <div className="flex space-x-6 justify-center">
              {/* LinkedIn - Teal Accent */}
              <a href="#" className="text-teal-700 hover:text-teal-900 transition duration-300 transform hover:scale-110" title="LinkedIn">
                <FaLinkedin className="w-8 h-8" />
              </a>
              {/* Facebook - Green Accent */}
              <a href="#" className="text-green-600 hover:text-green-800 transition duration-300 transform hover:scale-110" title="Facebook">
                <FaFacebook className="w-8 h-8" />
              </a>
              {/* Twitter/X - Dark Gray/Charcoal Accent */}
              <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300 transform hover:scale-110" title="Twitter/X">
                <FaTwitter className="w-8 h-8" />
              </a>
            </div>
          </div>

        </div>

      </div>
      
    </div>
  );
};

export default Contact;