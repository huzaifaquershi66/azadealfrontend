import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiStar, FiMapPin, FiBook, FiUser, FiGlobe, FiClock, FiAward, FiHeart, FiDollarSign, FiCheckCircle,FiBarChart2,FiCode,FiPenTool,FiMusic ,FiCamera,FiFeather,FiTrendingUp,FiBookOpen, FiActivity, 
 
  
  
  FiShield, 
  FiCpu, 
  FiBriefcase} from 'react-icons/fi';
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
    const [featuredTeachers, setFeaturedTeachers] = useState([]);
      const [loading, setLoading] = useState(true);
       const [user, setUser] = useState(null);
          useEffect(() => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          }, []);
      

    const navigate = useNavigate();
  

  // if (loading) return <p className="text-center">Loading teachers...</p>;
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 useEffect(() => {
     const fetchApprovedUsers = async () => {
       try {
         const response = await fetch("https://casback-production.up.railway.app/users/getallapproved");
         const data = await response.json();
         setFeaturedTeachers(data.data); // ✅ Setting approved users in state
         console.log(data.data)
       } catch (error) {
         console.error("Error fetching approved users:", error);
       }
     };
 
    fetchApprovedUsers()
   }, []); // ✅ Fetch only when tab changes to 'completed'
 
   



  const categories = [
  {
    name: 'Academic Courses',
    icon: <FiBook className="w-8 h-8" />,
    count: 150,
    color: 'from-blue-500 via-blue-600 to-indigo-600',
    bgLight: 'bg-blue-50/80',
    description: 'Matric, Inter, O/A Levels'
  },
  {
    name: 'Engineering & Medical',
    icon: <FiActivity className="w-8 h-8" />,
    count: 120,
    color: 'from-violet-500 via-purple-500 to-purple-600',
    bgLight: 'bg-purple-50/80',
    description: 'ECAT, MDCAT, NUMS, NUST'
  },
  {
    name: 'CSS & FPSC',
    icon: <FiAward className="w-8 h-8" />,
    count: 85,
    color: 'from-emerald-400 via-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50/80',
    description: 'CSS, PMS, FPSC Preparation'
  },
  {
    name: 'Professional Skills',
    icon: <FiCode className="w-8 h-8" />,
    count: 200,
    color: 'from-rose-400 via-pink-500 to-pink-600',
    bgLight: 'bg-rose-50/80',
    description: 'Web, App Development, Digital Marketing'
  },
  {
    name: 'Design & Media',
    icon: <FiPenTool className="w-8 h-8" />,
    count: 90,
    color: 'from-amber-400 via-amber-500 to-yellow-600',
    bgLight: 'bg-amber-50/80',
    description: 'Graphic Design, UI/UX, Video Editing'
  },
  {
    name: 'Languages',
    icon: <FiGlobe className="w-8 h-8" />,
    count: 75,
    color: 'from-cyan-400 via-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50/80',
    description: 'English, IELTS, Chinese, German'
  },
  {
    name: 'Business & Finance',
    icon: <FiBarChart2 className="w-8 h-8" />,
    count: 110,
    color: 'from-teal-400 via-teal-500 to-emerald-600',
    bgLight: 'bg-teal-50/80',
    description: 'Accounting, Trading, Entrepreneurship'
  },
  {
    name: 'Military & Defense',
    icon: <FiShield className="w-8 h-8" />,
    count: 60,
    color: 'from-red-400 via-red-500 to-rose-600',
    bgLight: 'bg-red-50/80',
    description: 'Army, Navy, Air Force Tests'
  },
  {
    name: 'Technology & AI',
    icon: <FiCpu className="w-8 h-8" />,
    count: 95,
    color: 'from-indigo-400 via-indigo-500 to-blue-600',
    bgLight: 'bg-indigo-50/80',
    description: 'Data Science, AI, Cyber Security'
  },
  {
    name: 'Islamic Studies',
    icon: <FiHeart className="w-8 h-8" />,
    count: 70,
    color: 'from-green-400 via-green-500 to-emerald-600',
    bgLight: 'bg-green-50/80',
    description: 'Quran, Hadith, Islamic Finance'
  },
  {
    name: 'Personal Development',
    icon: <FiUser className="w-8 h-8" />,
    count: 80,
    color: 'from-purple-400 via-purple-500 to-violet-600',
    bgLight: 'bg-purple-50/80',
    description: 'Leadership, Public Speaking, Career'
  },
  {
    name: 'Competitive Exams',
    icon: <FiBriefcase className="w-8 h-8" />,
    count: 130,
    color: 'from-orange-400 via-orange-500 to-amber-600',
    bgLight: 'bg-orange-50/80',
    description: 'LUMS, IBA, FAST Entry Tests'
  }
];
  
  const subjects = [
  { name: "Mathematics" },
  { name: "Physics" },
  { name: "Chemistry" },
  { name: "Biology" },
  { name: "English Language" },
  { name: "Urdu Literature" },
  { name: "Islamic Studies" },
  { name: "Pakistan Studies" },
  { name: "Computer Science" },
  { name: "Web Development" },
  { name: "App Development" },
  { name: "Cyber Security" },
  { name: "Graphic Designing" },
  { name: "Digital Marketing" },
  { name: "Freelancing" },
  { name: "Data Science & AI" },
  { name: "Accounting & Finance" },
  { name: "Economics" },
  { name: "Business & Entrepreneurship" },
  { name: "Medical Entrance Test Prep" },
  { name: "Engineering Entry Test Prep" },
  { name: "CSS & Government Exam Prep" },
  { name: "Public Speaking & Communication" },
  { name: "Quran & Tajweed" },
  { name: "Foreign Languages" }
];

  return (
    <div className="min-h-screen bg-gray-50">
     <nav className={`fixed w-full z-50 transition-all duration-500 ${
     isScrolled 
       ? "bg-gradient-to-r from-sky-900/95 via-cyan-900/95 to-teal-900/95 shadow-[0_8px_32px_0_rgba(0,201,255,0.2)] backdrop-blur-xl" 
       : "bg-transparent backdrop-blur-sm bg-gradient-to-r from-sky-900/50 via-cyan-900/50 to-teal-900/50"
   }`}>
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="flex justify-between items-center h-20">
         {/* Logo */}
         <div className="flex items-center">
           <div className="relative group">
             <div className="flex items-center space-x-4">
               {/* Main Logo Container */}
               <div className="relative group cursor-pointer">
                 {/* Animated background rings */}
                 <div className="absolute inset-[-8px] bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400 rounded-full animate-spin-slow opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-700"></div>
                 <div className="absolute inset-[-4px] bg-gradient-to-r from-teal-400 via-cyan-300 to-sky-400 rounded-full animate-reverse-spin opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-700"></div>
                 
                 <div className="relative">
                   {/* Main logo shape */}
                   <div className="relative w-14 h-14 bg-gradient-to-br from-sky-500 via-cyan-400 to-teal-500 rounded-full transform transition-all duration-500 group-hover:scale-110 hover:rotate-180">
                     {/* Glass effect overlay */}
                     <div className="absolute inset-[2px] bg-gradient-to-br from-white/30 to-white/10 rounded-full backdrop-blur-sm">
                       {/* Logo content */}
                       <div className="absolute inset-0 flex items-center justify-center">
                         <span className="text-white text-2xl font-bold font-sans tracking-wider transform transition-transform duration-500 group-hover:scale-110">
                           A
                         </span>
                       </div>
                       
                       {/* Animated border */}
                       <div className="absolute inset-0 rounded-full border-2 border-white/20 overflow-hidden">
                         <div className="w-full h-full animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100">
                           <div className="w-full h-full rounded-full border-2 border-transparent border-t-white/40"></div>
                         </div>
                       </div>
                     </div>
                   </div>
   
                   {/* Floating particles */}
                   <div className="absolute -top-1 -right-1 w-3 h-3">
                     <div className="absolute inset-0 bg-cyan-300 rounded-full animate-float opacity-75"></div>
                   </div>
                   <div className="absolute bottom-0 -left-2 w-2 h-2">
                     <div className="absolute inset-0 bg-teal-300 rounded-full animate-float-delayed opacity-75"></div>
                   </div>
                 </div>
               </div>
   
               {/* Brand Text */}
               <div className="relative group">
                 <h1 className="text-4xl font-bold">
                   <span className="relative inline-block">
                     {/* Main text */}
                     <span className="relative z-10 bg-gradient-to-r from-sky-200 via-cyan-300 to-teal-200 bg-clip-text text-transparent font-sans">
                       Azad
                     </span>
                     
                     {/* Text glow effect */}
                     <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 blur-md opacity-50 bg-clip-text text-transparent animate-pulse"></span>
                     
                     {/* Animated underline */}
                     <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 group-hover:w-full transition-all duration-700 ease-out"></span>
                   </span>
                 </h1>
                 <p className="text-sm font-medium mt-1">
                   <span className="bg-gradient-to-r from-sky-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent tracking-wider">
                     Education Platform
                   </span>
                 </p>
               </div>
             </div>
           </div>
         </div>
   
         {/* Desktop Menu */}
         <div className="hidden md:flex items-center space-x-8">
           {["Home", "Courses", "Academies", "Resources", "About"].map((item) => (
             <a
               key={item}
               onClick={() => navigate(`/${item.toLowerCase()}`)}
               className="relative group"
             >
               <span className="relative z-10 text-white hover:text-cyan-200 transition-colors duration-300 font-medium text-lg">
                 {item}
               </span>
               {/* Animated hover effect */}
               <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
             </a>
           ))}
   
           {/* Enhanced Action Buttons */}
           <div className="flex items-center space-x-6">
             {/* Search Button */}
             <button
               onClick={() => setShowSearch(!showSearch)}
               className="relative group p-2 hover:bg-white/10 rounded-full transition-all duration-300"
             >
               <RiSearchLine className="h-6 w-6 text-white group-hover:text-cyan-300 transition-colors duration-300" />
             </button>
   
             {/* Notification Button */}
             <div className="relative group">
               <button className="p-2 hover:bg-white/10 rounded-full transition-all duration-300">
                 <RiNotificationLine className="h-6 w-6 text-white group-hover:text-cyan-300 transition-colors duration-300" />
               </button>
               <span className="absolute -top-1 -right-1 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                 3
               </span>
             </div>
   
             {/* Get Started Button */}
             {user ? (
               <Link to="/teacherdashboard" className="flex items-center gap-3 group">
                 <div className="relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 rounded-full animate-pulse opacity-75"></div>
                   <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-300/30 transform transition-transform duration-300 group-hover:scale-110">
                     {user.profilePicture ? (
                       <img
                         src={user.profilePicture}
                         alt="Profile"
                         className="w-full h-full object-cover"
                       />
                     ) : (
                       <div className="w-full h-full bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
                         {user.fullName?.charAt(0).toUpperCase()}
                       </div>
                     )}
                   </div>
                 </div>
                 <span className="text-white font-medium text-lg group-hover:text-cyan-200 transition-colors capitalize">
                   {user.fullName}
                 </span>
               </Link>
             ) : (
               <Link to="/signup">
                 <button
                   onClick={() => setShowLoginModal(true)}
                   className="relative group"
                 >
                   <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 rounded-full blur group-hover:blur-md transition-all duration-300"></span>
                   <span className="relative block px-8 py-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 rounded-full text-white font-semibold group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:via-cyan-400 group-hover:to-teal-400 transform transition-all duration-300 group-hover:scale-105">
                     Get Started
                   </span>
                 </button>
               </Link>
             )}
           </div>
         </div>
   
         {/* Mobile Menu Button */}
         <button 
           className="md:hidden relative group p-2 hover:bg-white/10 rounded-full transition-all duration-300"
           onClick={() => setIsMenuOpen(!isMenuOpen)}
         >
           {isMenuOpen ? (
             <RiCloseLine className="h-6 w-6 text-white group-hover:text-cyan-300 transition-colors duration-300" />
           ) : (
             <RiMenuLine className="h-6 w-6 text-white group-hover:text-cyan-300 transition-colors duration-300" />
           )}
         </button>
       </div>
   
       {/* Mobile Menu */}
       <AnimatePresence>
         {isMenuOpen && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: "auto" }}
             exit={{ opacity: 0, height: 0 }}
             className="md:hidden bg-gradient-to-r from-sky-900/95 via-cyan-900/95 to-teal-900/95 backdrop-blur-xl border-t border-cyan-800/30"
           >
             <div className="flex flex-col space-y-4 p-6">
               {["Courses", "Teachers", "Resources", "About"].map((item) => (
                 <a
                   key={item}
                   href={`#${item.toLowerCase()}`}
                   className="text-white hover:text-cyan-200 font-medium text-lg transition-colors"
                 >
                   {item}
                 </a>
               ))}
               <button
                 onClick={() => setShowLoginModal(true)}
                 className="relative group w-full mt-4"
               >
                 <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 rounded-full blur-sm"></span>
                 <span className="relative block py-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 rounded-full text-white font-semibold text-center">
                   Get Started
                 </span>
               </button>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   
     {/* Search Overlay */}
     <AnimatePresence>
       {showSearch && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 bg-sky-950/80 backdrop-blur-md flex items-center justify-center"
         >
           <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl w-full max-w-2xl mx-4 border border-cyan-500/20 shadow-[0_8px_32px_0_rgba(0,201,255,0.2)]">
             <div className="flex items-center">
               <RiSearchLine className="text-cyan-300 mr-4 h-6 w-6" />
               <input
                 type="text"
                 placeholder="Search courses, teachers, or topics..."
                 className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-cyan-300/50"
                 autoFocus
               />
               <button 
                 onClick={() => setShowSearch(false)}
                 className="text-cyan-300 hover:text-white transition-colors"
               >
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
            {subjects.map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 backdrop-blur-lg text-blue-100 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                {tag.name}
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
     <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredTeachers.map((teacher, index) => (
        <Link to={`/teacherprofile/${teacher._id}`} key={teacher._id}>

          <motion.div
            key={teacher._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300"
          >
            {/* Teacher Image Section */}
            <div className="relative group">
              <img
                src={teacher.profilePicture || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={teacher.fullName}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Status Badges */}
              <div className="absolute top-4 right-4 space-y-2">
                {teacher.isApproved && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm flex items-center backdrop-blur-sm bg-opacity-90"
                  >
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    Verified
                  </motion.div>
                
                )}
              </div>
            </div>

            {/* Teacher Info Section */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{teacher.fullName}</h3>
                  <p className="text-gray-600 font-medium">{teacher.specialization}</p>
                </div>
                <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                  <FiStar className="text-yellow-400 mr-2 text-lg" />
                  <span className="font-bold text-blue-600">{teacher.experience} Years</span>
                </div>
              </div>

              {/* Achievements Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Achievements & Qualifications</h4>
                <div className="grid grid-cols-1 gap-4">
                  {/* Education Achievement */}
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                    <FiAward className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-medium text-gray-800">{teacher.qualification}</h5>
                      <p className="text-sm text-gray-600">from {teacher.university} ({teacher.graduationYear})</p>
                    </div>
                  </div>

                  {/* Specialization */}
                  <div className="flex items-start space-x-3 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors duration-300">
                    <FiBookOpen className="text-indigo-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-medium text-gray-800">Specialized in {teacher.specialization}</h5>
                      <p className="text-sm text-gray-600">
                        Teaching {teacher.teachingLevel.map(level => JSON.parse(level)).flat().join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-300">
                    <FiClock className="text-green-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-medium text-gray-800">{teacher.experience} Years Experience</h5>
                      <p className="text-sm text-gray-600">
                        Previous Institution: {teacher.previousInstitutions.map(inst => JSON.parse(inst)).flat().join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-300">
                    <FiBook className="text-purple-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-medium text-gray-800">Subject Expertise</h5>
                      <p className="text-sm text-gray-600">
                        {teacher.subjects.map(subject => JSON.parse(subject)).flat().join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Available Timings */}
                  <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors duration-300">
                    <FiClock className="text-yellow-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-medium text-gray-800">Availability</h5>
                      <p className="text-sm text-gray-600">
                        {teacher.availableTimings.map(timing => JSON.parse(timing)).flat().join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  <FiUser className="mr-3 text-lg" />
                  <span className="font-medium">Active Teacher</span>
                </div>
                <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  <FiGlobe className="mr-3 text-lg" />
                  <span className="font-medium">{teacher.address}</span>
                </div>
                <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  <FiCheckCircle className="mr-3 text-lg" />
                  <span className="font-medium">Verified Profile</span>
                </div>
                <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  <FiUser className="mr-3 text-lg" />
                  <span className="font-medium">{teacher.gender}</span>
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div>
                  <span className="text-gray-400 text-sm font-medium">Expected Salary</span>
                  <div className="text-3xl font-bold text-blue-600">
                    Rs. {teacher.expectedSalary}
                  </div>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium">
                  Contact Now
                </button>
              </div>
            </div>
          </motion.div>
                </Link>

        ))}
      </div>
    </div>
   
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