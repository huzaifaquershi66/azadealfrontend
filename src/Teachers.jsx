import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiStar, FiMapPin, FiBook, FiUser, FiGlobe, FiClock, FiAward, FiHeart, FiDollarSign, FiCheckCircle,FiBarChart2,FiCode,FiPenTool,FiMusic ,FiCamera,FiFeather,FiTrendingUp} from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { RiSearchLine, RiNotificationLine, RiCloseLine, RiMenuLine, RiChatSmileLine,RiChatQuoteLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import pakistanCities from "./pakistanCities";
// import Footer from "./Footer"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// SwiperCore.use([Navigation, Pagination, Autoplay]);
function Teachers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
  

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const featuredTeachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      rating: 4.9,
      students: 1234,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      isOnline: true,
      price: "$50/hr",
      expertise: ["Calculus", "Algebra", "Statistics"],
      badges: ["Top Rated", "Verified"],
      availability: "Mon-Fri",
      responseTime: "< 2 hours",
      totalHours: 1500,
      completionRate: 98,
      languages: ["English", "Spanish"],
      description: "Experienced mathematics professor with over 10 years of teaching excellence..."
    },
    {
      id: 2,
      name: "Prof. James Chen",
      subject: "Computer Science",
      rating: 4.8,
      students: 956,
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79",
      isOnline: true,
      price: "$65/hr",
      expertise: ["Python", "Machine Learning", "Web Development"],
      badges: ["Expert", "Most Popular"],
      availability: "Weekends",
      responseTime: "< 1 hour",
      totalHours: 2100,
      completionRate: 96,
      languages: ["English", "Mandarin"],
      description: "Expert in computer science with specialization in AI and machine learning..."
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      subject: "Physics",
      rating: 4.9,
      students: 789,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      isOnline: false,
      price: "$55/hr",
      expertise: ["Quantum Physics", "Mechanics", "Electromagnetism"],
      badges: ["PhD", "Research Expert"],
      availability: "Flexible",
      responseTime: "< 3 hours",
      totalHours: 1200,
      completionRate: 95,
      languages: ["English", "Portuguese"],
      description: "Quantum physics researcher with a passion for teaching complex concepts..."
    },
    // Academy entries
    {
      id: 4,
      name: "Excellence Academy",
      subject: "Multi-Disciplinary",
      rating: 4.7,
      students: 5000,
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b",
      isOnline: true,
      price: "$299/month",
      expertise: ["STEM", "Languages", "Test Prep"],
      badges: ["Accredited", "Featured"],
      availability: "24/7",
      responseTime: "Instant",
      totalHours: 50000,
      completionRate: 94,
      languages: ["Multiple Languages"],
      description: "Leading online academy offering comprehensive courses across multiple disciplines..."
    },
    {
      id: 5,
      name: "Global Tech Institute",
      subject: "Technology & Programming",
      rating: 4.8,
      students: 3500,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      isOnline: true,
      price: "$199/month",
      expertise: ["Coding", "Data Science", "Cybersecurity"],
      badges: ["Industry Partner", "Career Support"],
      availability: "24/7",
      responseTime: "< 4 hours",
      totalHours: 35000,
      completionRate: 92,
      languages: ["English", "Spanish", "German"],
      description: "Premier technology institute focusing on practical skills and industry readiness..."
    },
    {
      id: 6,
      name: "Creative Arts Academy",
      subject: "Arts & Design",
      rating: 4.6,
      students: 2800,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      isOnline: true,
      price: "$179/month",
      expertise: ["Digital Art", "Graphic Design", "Animation"],
      badges: ["Creative Excellence", "Industry Recognition"],
      availability: "Flexible",
      responseTime: "< 5 hours",
      totalHours: 25000,
      completionRate: 90,
      languages: ["English", "French", "Italian"],
      description: "Nurturing creativity through comprehensive arts and design education..."
    }
  ];

  const categories = [
    {
      name: 'Mathematics',
      icon: <FiBarChart2 className="w-8 h-8" />,
      count: 120,
      color: 'from-blue-500 via-blue-600 to-indigo-600',
      bgLight: 'bg-blue-50/80',
      description: 'Algebra, Calculus, Statistics'
    },
    {
      name: 'Programming',
      icon: <FiCode className="w-8 h-8" />,
      count: 85,
      color: 'from-violet-500 via-purple-500 to-purple-600',
      bgLight: 'bg-purple-50/80',
      description: 'Web, Mobile, AI Development'
    },
    {
      name: 'Languages',
      icon: <FiGlobe className="w-8 h-8" />,
      count: 200,
      color: 'from-emerald-400 via-emerald-500 to-green-600',
      bgLight: 'bg-emerald-50/80',
      description: 'English, Spanish, Mandarin'
    },
    {
      name: 'Arts & Design',
      icon: <FiPenTool className="w-8 h-8" />,
      count: 90,
      color: 'from-rose-400 via-pink-500 to-pink-600',
      bgLight: 'bg-rose-50/80',
      description: 'Drawing, Painting, Digital Art'
    },
    {
      name: 'Music',
      icon: <FiMusic className="w-8 h-8" />,
      count: 75,
      color: 'from-amber-400 via-amber-500 to-yellow-600',
      bgLight: 'bg-amber-50/80',
      description: 'Piano, Guitar, Voice'
    },
    {
      name: 'Photography',
      icon: <FiCamera className="w-8 h-8" />,
      count: 60,
      color: 'from-cyan-400 via-cyan-500 to-blue-600',
      bgLight: 'bg-cyan-50/80',
      description: 'Digital, Portrait, Landscape'
    },
    {
      name: 'Literature',
      icon: <FiFeather className="w-8 h-8" />,
      count: 45,
      color: 'from-red-400 via-red-500 to-rose-600',
      bgLight: 'bg-red-50/80',
      description: 'Creative Writing, Poetry'
    },
    {
      name: 'Sciences',
      icon: <FiBook className="w-8 h-8" />,
      count: 150,
      color: 'from-teal-400 via-teal-500 to-emerald-600',
      bgLight: 'bg-teal-50/80',
      description: 'Physics, Chemistry, Biology'
    },
  ];
  

  return (
    <div className="min-h-screen bg-gray-50">
     <nav className={`fixed w-full z-50 transition-all duration-300 ${
     isScrolled 
       ? "bg-gradient-to-r from-emerald-600 to-blue-600 backdrop-blur-md shadow-lg" 
       : "bg-gradient-to-r from-emerald-600 to-blue-600 backdrop-blur-md"
   }`}>
     {/* Rest of your navbar code remains the same, just updating the color-related classes */}
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="flex justify-between items-center h-20">
         {/* Logo */}
         <div className="flex items-center">
     <div className="relative group">
       <div className="flex items-center space-x-3">
         {/* Main Logo Container */}
         <div className="relative group cursor-pointer">
           {/* Background glow effect */}
           <div className="absolute inset-[-4px] bg-gradient-to-r from-rose-600/50 via-orange-500/50 to-amber-500/50 rounded-xl blur-md group-hover:blur-lg transition-all duration-500"></div>
           
           <div className="relative">
             {/* Main logo shape - Made wider than height */}
             <div className="relative w-16 h-12 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-xl transform transition-all duration-500 group-hover:scale-105 shadow-lg group-hover:shadow-orange-500/50">
               {/* Animated gradient overlay */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl animate-shine"></div>
               
               {/* Glass effect */}
               <div className="absolute inset-[1px] bg-gradient-to-br from-white/20 to-transparent rounded-xl backdrop-blur-sm">
                 {/* Diagonal lines pattern */}
                 <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,white_2px,white_3px)]"></div>
               </div>
               
               {/* Center content with 3D effect */}
               <div className="absolute inset-0 flex items-center justify-center transform transition-transform duration-500">
                 <span className="relative text-white text-2xl font-bold font-sans tracking-wider group-hover:scale-110">
                   {/* Text shadow for 3D effect */}
                   <span className="absolute -top-[1px] -left-[1px] text-orange-200/50">A</span>
                   <span className="relative">A</span>
                   <span className="absolute -bottom-[1px] -right-[1px] text-rose-700/50">A</span>
                 </span>
               </div>
   
               {/* Animated border with gradient */}
               <div className="absolute inset-0 rounded-xl border border-white/20 overflow-hidden">
                 <div className="absolute inset-0 animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100">
                   <div className="w-full h-full rounded-xl border border-transparent border-t-white/40"></div>
                 </div>
               </div>
             </div>
   
             {/* Enhanced particles */}
             <div className="absolute -top-1 -right-1 w-3 h-3">
               <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full animate-pulse"></div>
             </div>
             <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5">
               <div className="absolute inset-0 bg-rose-400 rounded-full animate-pulse"></div>
               <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75 delay-300"></div>
             </div>
   
             {/* Sparkle effects */}
             <div className="absolute -top-2 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
             <div className="absolute top-1/2 -right-2 w-1 h-1 bg-white rounded-full animate-twinkle delay-150"></div>
           </div>
         </div>
   
         {/* Text container with enhanced styling */}
         <div className="relative">
           <h1 className="text-3xl font-bold mb-0">
             <span className="relative inline-block">
               {/* Main text with vibrant gradient */}
               <span className="bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 bg-clip-text text-transparent font-sans">
                 Azad
               </span>
               {/* Enhanced glow effect */}
               <span className="absolute inset-0 bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 blur-md opacity-50 bg-clip-text text-transparent animate-pulse">
                 Azad
               </span>
               {/* Animated underline with gradient */}
               <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 group-hover:w-full transition-all duration-700"></span>
             </span>
           </h1>
           <p className="text-sm font-medium tracking-wide">
             <span className="bg-gradient-to-r from-rose-200 via-orange-200 to-amber-200 bg-clip-text text-transparent">
               Education
             </span>
           </p>
         </div>
       </div>
     </div>
   </div>
   
         {/* Desktop Menu - Updated hover colors */}
         <div className="hidden md:flex items-center space-x-8">
           {["Home", "Courses", "Academies", "Resources", "About"].map((item) => (
             <a
               key={item}
               onClick={() => navigate(`/${item.toLowerCase()}`)}
               className="text-white hover:text-emerald-200 transition-colors font-semibold text-lg"
             >
               {item}
             </a>
           ))}
   
           {/* Search Button */}
           <button
             onClick={() => setShowSearch(!showSearch)}
             className="text-white hover:text-emerald-200 transition-colors"
           >
             <RiSearchLine className="h-6 w-6" />
           </button>
   
           {/* Notification Button */}
           <div className="relative">
             <button className="text-white hover:text-emerald-200 transition-colors">
               <RiNotificationLine className="h-6 w-6" />
             </button>
             <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
               3
             </span>
           </div>
   
           {/* Get Started Button - Updated gradient */}
           <button
             onClick={() => setShowLoginModal(true)}
             className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-blue-600 transition-colors font-semibold shadow-lg hover:shadow-xl"
           >
             Get Started
           </button>
         </div>
   
         {/* Mobile Menu Toggle */}
         <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
           {isMenuOpen ? <RiCloseLine className="h-6 w-6" /> : <RiMenuLine className="h-6 w-6" />}
         </button>
       </div>
   
       {/* Mobile Menu - Updated gradient */}
       <AnimatePresence>
         {isMenuOpen && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: "auto" }}
             exit={{ opacity: 0, height: 0 }}
             className="md:hidden bg-gradient-to-r from-emerald-600 to-blue-600 backdrop-blur-md border-t border-emerald-500"
           >
             <div className="flex flex-col space-y-4 p-4">
               {["Courses", "Teachers", "Resources", "About"].map((item) => (
                 <a
                   key={item}
                   href={`#${item.toLowerCase()}`}
                   className="text-white hover:text-emerald-200 font-medium text-lg"
                 >
                   {item}
                 </a>
               ))}
               <button
                 onClick={() => setShowLoginModal(true)}
                 className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl"
               >
                 Get Started
               </button>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   
     {/* Search Overlay - No color changes needed */}
     <AnimatePresence>
       {showSearch && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
         >
           <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4 shadow-2xl">
             <div className="flex items-center">
               <RiSearchLine className="text-gray-400 mr-3 h-6 w-6" />
               <input
                 type="text"
                 placeholder="Search courses, teachers, or topics..."
                 className="flex-1 outline-none text-lg"
                 autoFocus
               />
               <button onClick={() => setShowSearch(false)} className="text-gray-400 hover:text-gray-600">
                 <RiCloseLine className="h-6 w-6" />
               </button>
             </div>
           </div>
         </motion.div>
       )}
     </AnimatePresence>
   </nav>
      {/* Hero Section with Video Background */}
      <div className="relative md:py-20 py-4 min-h-[85vh] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('https://img.freepik.com/free-photo/woman-celebrating-teacher-s-day-with-her-students_23-2148668563.jpg')] bg-cover bg-center opacity-20"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-purple-900/90"></div> */}
        
        {/* Animated Shapes */}
        {/* <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-white/10 backdrop-blur-3xl"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full">
        <div className="flex flex-col items-center justify-center h-full pt-20 pb-16">
          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { icon: FiUser, count: "10K+", label: "Students" },
              { icon: FiBook, count: "1000+", label: "Courses" },
              { icon: FiClock, count: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-2">
                <stat.icon className="text-blue-400" size={20} />
                <span className="text-white font-bold">{stat.count}</span>
                <span className="text-blue-200">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-100"
          >
            Elevate Your Learning <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              Journey Today
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 text-center max-w-3xl mb-12"
          >
            Connect with expert educators and unlock your potential through personalized learning experiences
          </motion.p>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-4xl"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 md:p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {/* Search Input */}
                <div className="bg-white/20 backdrop-blur-lg rounded-xl flex items-center px-4 hover:bg-white/30 transition-all duration-300">
                  <FiSearch className="text-blue-300" size={20} />
                  <input
                    type="text"
                    placeholder="Search subjects or skills..."
                    className="w-full p-3 bg-transparent text-white placeholder-blue-200 focus:outline-none"
                  />
                </div>

                {/* Location Select */}
                <div className="bg-white/20 backdrop-blur-lg rounded-xl flex items-center px-4 hover:bg-white/30 transition-all duration-300">
                  <FiMapPin className="text-blue-300" size={20} />
                  <select className="w-full p-3 bg-transparent text-white focus:outline-none appearance-none cursor-pointer">
                  <option value="" className="text-gray-800">Select Location</option>
  {pakistanCities.map((cityOption) => (
    <option key={cityOption.value} value={cityOption.value} className="text-black">
      {cityOption}
    </option>
  ))}
      {/* ))} */}
                  </select>
                </div>

                {/* Search Button */}
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-blue-500/25 font-semibold">
                  Find Teachers
                </button>
              </div>
            </div>
          </motion.div>

          {/* Featured Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {['Mathematics', 'Science', 'Languages', 'Programming', 'Arts'].map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 backdrop-blur-lg text-blue-100 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Explore Our Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover a world of knowledge across diverse subjects taught by expert educators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-3xl ${category.bgLight} p-6 transition-all duration-300 hover:shadow-2xl`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-r opacity-20 blur-2xl filter group-hover:opacity-30 transition-opacity duration-300"></div>

                {/* Icon Container */}
                <div className={`mb-6 inline-block rounded-2xl bg-gradient-to-r ${category.color} p-3 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>

                {/* Stats and CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold bg-white/50 rounded-full px-3 py-1">
                      {category.count}+ Teachers
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full bg-gradient-to-r ${category.color} p-2 text-white hover:shadow-lg transition-all duration-300`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold">
            View All Categories
          </button>
        </motion.div>
      </div>
    </section>


      {/* Featured Teachers Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-4 max-w-7xl">
    {/* Header Section with Animation */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row justify-between items-center mb-16"
    >
      <div className="text-center md:text-left mb-8 md:mb-0">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Top-Rated Teachers & Academies
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl">
          Learn from the best in their fields and transform your learning journey
        </p>
      </div>
      <div className="flex items-center space-x-4">
  <div className="relative inline-block w-72">
    <select 
      className="w-full appearance-none bg-white px-6 py-3.5 rounded-2xl border-2 border-gray-200 
                 text-gray-700 font-medium cursor-pointer
                 shadow-sm hover:border-blue-400 
                 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                 transition-all duration-300
                 bg-gradient-to-r from-white to-gray-50"
    >
      <option value="" className="font-medium">All Subjects</option>
      
      {/* STEM Subjects */}
      <optgroup label="STEM" className="font-semibold bg-gray-50">
        <option value="mathematics" className="py-2">Mathematics</option>
        <option value="physics">Physics</option>
        <option value="chemistry">Chemistry</option>
        <option value="biology">Biology</option>
        <option value="computer-science">Computer Science</option>
        <option value="engineering">Engineering</option>
      </optgroup>

      {/* Languages */}
      <optgroup label="Languages" className="font-semibold bg-gray-50">
        <option value="english">English</option>
        <option value="spanish">Spanish</option>
        <option value="french">French</option>
        <option value="german">German</option>
      </optgroup>

      {/* Arts & Humanities */}
      <optgroup label="Arts & Humanities" className="font-semibold bg-gray-50">
        <option value="literature">Literature</option>
        <option value="history">History</option>
        <option value="philosophy">Philosophy</option>
        <option value="art-design">Art & Design</option>
      </optgroup>

      {/* Business & Professional */}
      <optgroup label="Business & Professional" className="font-semibold bg-gray-50">
        <option value="business">Business Studies</option>
        <option value="economics">Economics</option>
        <option value="accounting">Accounting</option>
        <option value="marketing">Marketing</option>
      </optgroup>

      {/* Technology */}
      <optgroup label="Technology" className="font-semibold bg-gray-50">
        <option value="programming">Programming</option>
        <option value="web-development">Web Development</option>
        <option value="data-science">Data Science</option>
        <option value="cybersecurity">Cybersecurity</option>
      </optgroup>
    </select>

    {/* Custom Dropdown Arrow */}
    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
      <svg 
        className="w-5 h-5 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    {/* Optional: Add a label */}
    <label 
      className="absolute -top-2.5 left-4 bg-white px-2 text-sm text-blue-600 font-medium"
    >
      Select Subject
    </label>
  </div>

  {/* Optional: Add a search button */}
  <button 
    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 
               text-white font-medium rounded-xl 
               hover:from-blue-700 hover:to-indigo-700 
               transform hover:scale-105 
               transition-all duration-300 
               focus:ring-4 focus:ring-blue-200
               shadow-lg hover:shadow-xl"
  >
    <div className="flex items-center space-x-2">
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        /> 
      </svg>
      <span>Search</span>
    </div>
  </button>
</div>
    </motion.div>

    {/* Teachers Grid */}
    <Link to="/teacherprofile">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredTeachers.map((teacher, index) => (
        <motion.div
          key={teacher.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300"
        >
          {/* Teacher Image Section */}
          <div className="relative group">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Status Badges */}
            <div className="absolute top-4 right-4 space-y-2">
              {teacher.isOnline && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm flex items-center backdrop-blur-sm bg-opacity-90"
                >
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  Online
                </motion.div>
              )}
              {teacher.badges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-yellow-400 text-white px-4 py-1.5 rounded-full text-sm backdrop-blur-sm bg-opacity-90"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Info Section */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{teacher.name}</h3>
                <p className="text-gray-600 font-medium">{teacher.subject}</p>
              </div>
              <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                <FiStar className="text-yellow-400 mr-2 text-lg" />
                <span className="font-bold text-blue-600">{teacher.rating}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <FiUser className="mr-3 text-lg" />
                <span className="font-medium">{teacher.students} Students</span>
              </div>
              <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <FiClock className="mr-3 text-lg" />
                <span className="font-medium">{teacher.responseTime}</span>
              </div>
              <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <FiGlobe className="mr-3 text-lg" />
                <span className="font-medium">{teacher.languages.join(', ')}</span>
              </div>
              <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <FiCheckCircle className="mr-3 text-lg" />
                <span className="font-medium">{teacher.completionRate}% Completion</span>
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {teacher.expertise.map((exp, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-300"
                >
                  {exp}
                </span>
              ))}
            </div>

            {/* Footer Section */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div>
                <span className="text-gray-400 text-sm font-medium">Starting from</span>
                <div className="text-3xl font-bold text-blue-600">
                  {teacher.price}
                </div>
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium">
                Book Trial
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    </Link>
  </div>
</section>

      {/* Why Choose Us Section */}
      <section className="py-28 relative bg-gradient-to-br from-[#0A2647] via-[#144272] to-[#205295] text-white overflow-hidden">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mix-blend-overlay filter blur-3xl animate-float-delayed"></div>
        </div>
      </div>
    
      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold mb-6 tracking-tight">
            <span className="inline-block bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
              Why Choose Our Platform
            </span>
          </h2>
          <p className="text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-light">
            Join thousands of successful learners and experience the next generation of online education
          </p>
        </motion.div>
    
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {[
            {
              icon: <FiAward className="text-amber-400" size={44} />,
              title: "Expert Teachers",
              description: "Learn from industry experts and renowned educators",
              stats: "500+ Verified Experts",
              gradient: "from-amber-400/20 via-amber-300/10 to-amber-400/5",
              highlight: "text-amber-300"
            },
            {
              icon: <FiHeart className="text-rose-400" size={44} />,
              title: "Personalized Learning",
              description: "Adaptive learning paths tailored just for you",
              stats: "98% Student Satisfaction",
              gradient: "from-rose-400/20 via-rose-300/10 to-rose-400/5",
              highlight: "text-rose-300"
            },
            {
              icon: <FiClock className="text-cyan-400" size={44} />,
              title: "Flexible Schedule",
              description: "Learn at your own pace, anywhere, anytime",
              stats: "24/7 Unlimited Access",
              gradient: "from-cyan-400/20 via-cyan-300/10 to-cyan-400/5",
              highlight: "text-cyan-300"
            },
            {
              icon: <FiTrendingUp className="text-emerald-400" size={44} />,
              title: "Proven Results",
              description: "Achieve your goals with our proven methodology",
              stats: "95% Success Rate",
              gradient: "from-emerald-400/20 via-emerald-300/10 to-emerald-400/5",
              highlight: "text-emerald-300"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl transform group-hover:scale-105 transition-all duration-300 opacity-60`}></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 h-full border border-white/10 hover:border-white/20 transition-all duration-300">
                {/* Icon Container */}
                <div className="flex flex-col items-center">
                  <div className="inline-block p-4 bg-white/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-lg">
                    <div className="transform group-hover:rotate-12 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-2xl font-bold mb-4 ${feature.highlight} group-hover:text-white transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-blue-100/80 text-center mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Stats Badge */}
                  <div className="mt-auto">
                    <span className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium group-hover:bg-white/20 transition-all duration-300">
                      <span className={`w-2 h-2 rounded-full ${feature.highlight} mr-2`}></span>
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
    
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl font-semibold text-lg
                           hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 
                           transition-all duration-300 shadow-lg hover:shadow-xl">
            <span className="relative z-10">Start Your Learning Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>
    
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
          100% { transform: translate(0px, 0px) rotate(360deg); }
        }
        .animate-float {
          animation: float 15s infinite linear;
        }
        .animate-float-delayed {
          animation: float 18s infinite linear reverse;
        }
      `}</style>
    </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
  <div className="container mx-auto px-4 max-w-7xl">
    {/* Header Section with enhanced typography */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold mb-4 text-gray-900 leading-tight">
        What Our Students Say
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Discover how our platform has transformed the learning journey of students worldwide
      </p>
    </div>

    {/* Testimonials Slider with responsive configuration */}
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1} // Mobile first approach
      breakpoints={{
        640: { slidesPerView: 2 }, // Tablet
        1024: { slidesPerView: 3 }, // Desktop
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="testimonials-slider !pb-14"
    >
      {/* Testimonial Cards */}
      {[
        {
          name: "Sarah Johnson",
          role: "Web Development Student",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa231TUs5kyWvZmQLP6Iqu-5k9kTqbuVJp3A&s",
          testimonial: "This platform has been instrumental in my journey to becoming a full-stack developer. The structured curriculum and hands-on projects helped me land my dream job!",
          rating: 5,
        },
        {
          name: "John Doe",
          role: "Data Science Enthusiast",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa231TUs5kyWvZmQLP6Iqu-5k9kTqbuVJp3A&s",
          testimonial: "The courses are well-structured and the instructors are very knowledgeable. I gained a lot of practical skills that I could immediately apply to my job.",
          rating: 4,
        },
        {
          name: "Emily Davis",
          role: "AI Researcher",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa231TUs5kyWvZmQLP6Iqu-5k9kTqbuVJp3A&s",
          testimonial: "The platform's focus on real-world projects and continuous feedback was exactly what I needed to advance my career in AI research.",
          rating: 5,
        },
        {
          name: "Michael Brown",
          role: "Software Engineer",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa231TUs5kyWvZmQLP6Iqu-5k9kTqbuVJp3A&s",
          testimonial: "The interactive nature of the courses and the supportive community made learning so much more engaging and effective.",
          rating: 4,
        },
        {
          name: "Jessica Lee",
          role: "UX Designer",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa231TUs5kyWvZmQLP6Iqu-5k9kTqbuVJp3A&s",
          testimonial: "I loved the hands-on approach and the emphasis on practical skills. It really helped me to enhance my UX design capabilities.",
          rating: 5,
        },
      ].map((review, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white rounded-2xl shadow-xl p-8 h-full transition-transform duration-300 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-gray-50 shadow-md"
              />
              <div className="ml-4">
                <h4 className="text-2xl font-semibold text-gray-900">{review.name}</h4>
                <p className="text-gray-600">{review.role}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              "{review.testimonial}"
            </p>
            <div className="mt-6 flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Custom Navigation Buttons */}
    <div className="hidden md:block">
      <button className="swiper-button-prev after:content-[''] w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-lg flex items-center justify-center absolute left-4 top-1/2 transform -translate-y-1/2 z-10 hover:bg-gradient-to-r from-blue-600 to-blue-500 transition-all">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="swiper-button-next after:content-[''] w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-lg flex items-center justify-center absolute right-4 top-1/2 transform -translate-y-1/2 z-10 hover:bg-gradient-to-r from-blue-600 to-blue-500 transition-all">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</section>
      {/* Call to Action */}
      <footer className="bg-gray-900 text-gray-300 py-16">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* About Us */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
        <p className="text-gray-400 leading-relaxed">
          We are committed to providing high-quality education for children worldwide, empowering their future with knowledge and skills.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
        <ul className="space-y-3">
          <li><a href="#" className="hover:text-blue-400 transition-colors">Courses</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors">Teachers</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors">Resources</a></li>
        </ul>
      </div>

      {/* Contact Us */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
        <p className="text-gray-400">📧 support@example.com</p>
        <p className="text-gray-400">📞 +123 456 7890</p>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition">
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition">
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} YourCompany. All rights reserved.
    </div>
  </div>
</footer>
    </div>
  );
}

export default Teachers;