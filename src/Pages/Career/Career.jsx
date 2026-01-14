import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaHandsHelping, FaUserTie } from 'react-icons/fa';
import { MdWork, MdLightbulb } from 'react-icons/md';
import { FaHandshakeAngle } from 'react-icons/fa6';

const Careers = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      
      {/* 1. Hero Section - Deep Charcoal Background */}
      <section className="relative bg-gray-900 text-white py-24 md:py-32"> 
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        {/* Main Content */}
        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-fadeInDown flex items-center justify-center gap-4">
            Join the SOLEMATE Team <FaHandshakeAngle size={70} className="text-teal-400"/> 
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-200">
            Be part of our growth story. Here, every role is not just a job, but a new journey.
          </p>
          {/* Call to Action Button - Teal Accent */}
          <Link
            to="/signup"
            className="inline-block bg-teal-500 text-gray-900 hover:bg-teal-400 font-bold py-3 px-10 rounded-full transition duration-300 transform hover:scale-105 shadow-xl"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* 2. Employee Value Proposition (Why Join Us) */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Work at SOLEMATE?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Value Proposition Card 1 - Teal Border */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center border-t-4 border-teal-500">
              <FaLaptopCode className="text-5xl text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Modern Tech Stack</h3>
              <p className="text-gray-600">Work on cutting-edge technologies and tools to ensure you deliver best-in-class solutions.</p>
            </div>
            
            {/* Value Proposition Card 2 - Teal Border */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center border-t-4 border-teal-500">
              <FaHandsHelping className="text-5xl text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Culture of Support</h3>
              <p className="text-gray-600">Be part of a team where collaboration, mentorship, and personal growth are strongly supported.</p>
            </div>

            {/* Value Proposition Card 3 - Teal Border */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center border-t-4 border-teal-500">
              <MdLightbulb className="text-5xl text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Impactful Work</h3>
              <p className="text-gray-600">Engage in projects that directly influence the future of the e-commerce and fashion industry.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Current Openings Section - White Background */}
      <section className="bg-white py-16 md:py-24 px-6 border-t border-gray-200">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Current Job Openings <MdWork className="inline-block text-4xl ml-2 text-teal-600"/>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Job Card 1 - Subtle Charcoal/Gray Background */}
            <div className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition duration-200 border-l-4 border-teal-400">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">Full Stack Developer (MERN)</h3>
                <p className="text-gray-600">Remote / Karachi, Pakistan</p>
              </div>
              <Link to="/signup" className="text-teal-500 hover:text-teal-700 font-semibold flex items-center">
                View Details & Apply &rarr;
              </Link>
            </div>
            
            {/* Job Card 2 */}
            <div className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition duration-200 border-l-4 border-teal-400">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">Customer Success Specialist</h3>
                <p className="text-gray-600">Hybrid / Lahore, Pakistan</p>
              </div>
              <Link to="/signup" className="text-teal-500 hover:text-teal-700 font-semibold flex items-center">
                View Details & Apply &rarr;
              </Link>
            </div>

            {/* Job Card 3 */}
            <div className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition duration-200 border-l-4 border-teal-400">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">E-commerce Marketing Manager</h3>
                <p className="text-gray-600">Remote / Global</p>
              </div>
              <Link to="/signup" className="text-teal-500 hover:text-teal-700 font-semibold flex items-center">
                View Details & Apply &rarr;
              </Link>
            </div>
            
            {/* Final CTA */}
            <div className="pt-8 text-center">
                 <p className="text-lg text-gray-600">Looking for your next career move? Check out our <Link to="/contact" className="text-teal-600 font-semibold hover:underline">Contact Page</Link>.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;