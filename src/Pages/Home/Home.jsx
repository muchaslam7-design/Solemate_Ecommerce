import React, { useState, useEffect } from 'react';
import { MdContacts } from 'react-icons/md';
import { RiLoginCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';


const changingWords = ["BOOT", "SHOES", "AESTHETIC", "STYLE","FASHION","COMFORT"];
const videoSrc = "Images/5705724-hd_1920_1080_30fps.mp4";
// *****************************************

const Home = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // For Animation state

useEffect(() => {
  const cycleTime = 1500; // Total time for the cycle 
  const fadeDuration = 500; // Fade out duration 
  
  let timeoutId;
  
  const startAnimation = () => {
    // 1. Fade Out
    setIsVisible(false);

    timeoutId = setTimeout(() => {
      // 2. Change Word and Fade In (Bounce In)
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % changingWords.length);
      setIsVisible(true); 
      
      // 3. Schedule the next cycle after Bounce In is done (cycleTime - fadeDuration)
      timeoutId = setTimeout(startAnimation, cycleTime - fadeDuration);
    }, fadeDuration);
  };
  
  // Start the first cycle
  timeoutId = setTimeout(startAnimation, cycleTime);
  
  // Cleanup
  return () => clearTimeout(timeoutId); 
}, []);
// WordClasses simple (In CSS use transition)
const wordClasses = `inline-block min-w-[150px] text-center uppercase transition-all duration-500 ease-in-out transform ${
  isVisible 
    ? 'opacity-100 animate-bounce-in' // Visible: Fully opaque and bounce-in
    : 'opacity-0 scale-90' // Hidden: Transparent and small
}`;

  return (
    // 'overflow-x-hidden' = horizontal scrollbar, and 'h-screen' =height fix.
    <div className="m-0 p-0 overflow-x-hidden">
      <header className="relative w-full h-screen overflow-hidden flex items-center justify-start"> 

        {/* 1.1 Background Video (Layer 1: z-10) */}
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="object-cover absolute inset-0 w-full h-full" 
          style={{ zIndex: 10 }}
        ></video>

        {/* 1.2. SEMI-TRANSPARENT PURPLE OVERLAY (Layer 2: z-20) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(51, 51, 51, 0.7)', 
            zIndex: 20, 
          }}
        ></div>

        {/* 2. CONTENT LAYER (Layer 3: z-50) */}
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          {/* CONTENT: max-w-7xl center the content. */}
          <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-8 mx-auto text-white">
            
            {/* Left Side: Text and Buttons */}
            <div className="flex-1 text-center lg:text-left mb-10 lg:mb-0 lg:mr-10">
              <p className="bg-teal-200 opacity-30 text-lime-800 text-sm font-semibold uppercase mb-2 rounded-full py-2 px-6 
                  inline-block">. SHOPIFY OS 2.0</p>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Creative Multipurpose <br />
                <span className="text-teal-400"> 
                  <span className={wordClasses}>
                    {changingWords[currentWordIndex]}
                  </span>
                </span> Shopify Theme
              </h2>
              <p className="mt-6 text-lg text-gray-300 max-w-md mx-auto lg:mx-0">
                The new standard in customizability and speed.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ">
                <Link
                  to="/signup"
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-8 transition-colors duration-300 flex items-center justify-center space-x-3 rounded" /* ⭐ BUTTON 1 BG: Teal-700 ⭐ */
                >
                  <RiLoginCircleFill className="text-2xl text-white transition-colors duration-300 " />
                  <span>Sign Up Now</span>
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent hover:bg-gray-700 text-white font-bold py-3 px-8 transition-colors duration-300 border-2 border-gray-400 hover:border-white flex items-center justify-center space-x-3 rounded" /* ⭐ BUTTON 2 BORDER: Silver/Gray-400 ⭐ */
                >
                  <MdContacts className="text-2xl text-white transition-colors duration-300" />
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
            
            {/* Right Side: Device Mockups (ADJUSTED FOR SCREEN FIT) */}
            <div className="flex-1 flex justify-center lg:justify-end relative lg:h-[80vh] lg:w-[45%] h-[400px] w-full mt-10 lg:mt-0">
              
              {/* Main Mockup (Bigger Image) */}
              <div className="absolute top-[5%] right-[5%] w-[60%] h-[70%] bg-gray-800 rounded-lg shadow-2xl transform rotate-3 z-40 flex items-center justify-center overflow-hidden">
                <img src="Images/pexels-ingo-609771.jpg" alt="Product Display" className="w-full h-full object-cover"/>
                <div className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded">OS 2.0</div>
              </div>

              {/* Mobile View 1 (Bottom Left) */}
              <div className="absolute bottom-[5%] left-[5%] w-[25%] h-[40%] bg-gray-800 rounded-lg shadow-xl transform -rotate-6 z-40 flex items-center justify-center overflow-hidden">
                <img src="Images/pexels-fernanda-simoes-206549222-30725738.jpg" alt="Mobile View 1" className="w-full h-full object-cover"/>
              </div>

              {/* Mobile View 2 (Center) */}
              <div className="absolute top-[40%] left-[25%] w-[30%] h-[45%] bg-gray-800 rounded-lg shadow-xl transform rotate-12 z-40 flex items-center justify-center overflow-hidden">
                <img src="Images/pexels-melvin-buezo-1253763-2529148.jpg" alt="Mobile View 2" className="w-full h-full object-cover"/>
              </div>

            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;