import React, { useState, useEffect,useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiBook, FiUser, FiMapPin, FiClock, FiCalendar, FiUserPlus, FiAward, FiPlay, FiTrendingUp, FiGrid,FiUsers,FiBookOpen,FiGlobe,FiFilter,  FiBarChart, FiX, FiRefreshCw,FiDollarSign, FiStar, FiVideo,FiDownload, FiArrowRight,FiBarChart2 ,FiCpu,FiHeart ,FiCheck,FiChevronDown,FiCode  } from "react-icons/fi";
import { RiSearchLine, RiNotificationLine, RiCloseLine, RiMenuLine, RiChatSmileLine,RiChatQuoteLine,RiArrowRightLine } from "react-icons/ri";
// import { motion, AnimatePresence } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher, FaChalkboard,FaBookOpen,FaLinkedin,FaTwitter,FaEnvelope ,FaCalendarAlt,FaClock,FaUser,FaDollarSign, FaCode,FaBookmark,FaQuoteLeft,FaGraduationCap,FaCheckCircle,FaClipboardList,FaArrowRight,FaStar,FaRegHeart, FaCheck} from 'react-icons/fa';
import { BsLightningCharge, BsStars,BsPeopleFill, BsBookFill } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {Link} from "react-router-dom"
// Constantimport { useNavigate } from "react-router-dom";

const CURRENT_USER = "huzaifa8883";
const CURRENT_DATE = "2025-02-03 01:51:27";
const currentTime = "2025-02-03 03:19:16";
const getLevelColor = (level) => {
  const colors = {
    'Beginner': '#22c55e',    // green-500
    'Intermediate': '#3b82f6', // blue-500
    'Advanced': '#8b5cf6',    // purple-500
    'Expert': '#ef4444'       // red-500
  };
  return colors[level] || '#6b7280'; // gray-500 as default
};
  const currentUser = "huzaifa8883";
const filterOptions = {
  category: [
    {
      group: "Academic Courses",
      options: [
        { value: "matric_inter", label: "Matric & Intermediate" },
        { value: "o_a_level", label: "O-Level & A-Level" },
        { value: "engineering_entrance", label: "Engineering Entrance Exams" },
        { value: "medical_entrance", label: "Medical Entrance Exams" },
        { value: "css_fpsc", label: "CSS & FPSC Preparation" },
        { value: "bachelors_masters", label: "Bachelors & Masters" }
      ]
    },
    {
      group: "Professional & Skill-Based",
      options: [
        { value: "freelancing", label: "Freelancing" },
        { value: "graphic_design", label: "Graphic Designing" },
        { value: "digital_marketing", label: "Digital Marketing" },
        { value: "ecommerce", label: "E-commerce" },
        { value: "web_development", label: "Web Development" },
        { value: "app_development", label: "App Development" },
        { value: "cyber_security", label: "Cyber Security" },
        { value: "data_science_ai", label: "Data Science & AI" }
      ]
    },
    {
      group: "Language & Communication",
      options: [
        { value: "english", label: "English Language" },
        { value: "urdu_pashto", label: "Urdu & Pashto Writing" },
        { value: "foreign_languages", label: "Foreign Languages" }
      ]
    },
    {
      group: "Government & Competitive",
      options: [
        { value: "govt_exams", label: "Government Exams" },
        { value: "military_test", label: "Military Test Prep" },
        { value: "police_agencies", label: "Police & Agencies Prep" },
        { value: "university_tests", label: "University Entry Tests" }
      ]
    },
    {
      group: "Business & Finance",
      options: [
        { value: "accounting_finance", label: "Accounting & Finance" },
        { value: "stock_crypto", label: "Stock & Crypto Trading" },
        { value: "entrepreneurship", label: "Entrepreneurship" }
      ]
    },
    {
      group: "Personal Development",
      options: [
        { value: "time_management", label: "Time Management" },
        { value: "public_speaking", label: "Public Speaking" },
        { value: "leadership", label: "Leadership" },
        { value: "career_counseling", label: "Career Counseling" }
      ]
    },
    {
      group: "Islamic & Religious",
      options: [
        { value: "quran_tajweed", label: "Quran & Tajweed" },
        { value: "hadith_fiqh", label: "Hadith & Fiqh" },
        { value: "islamic_finance", label: "Islamic Finance" }
      ]
    }
  ],
  level: [
    {
      group: "Difficulty Levels",
      options: [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
        { value: "expert", label: "Expert" }
      ]
    }
  ],
  ageGroup: [
    {
      group: "Age Ranges",
      options: [
        { value: "kids", label: "Kids (7-12 years)" },
        { value: "teens", label: "Teens (13-17 years)" },
        { value: "young-adults", label: "Young Adults (18-25 years)" },
        { value: "adults", label: "Adults (26+ years)" }
      ]
    }
  ],
  duration: [
    {
      group: "Course Length",
      options: [
        { value: "short", label: "Short (0-4 weeks)" },
        { value: "medium", label: "Medium (1-3 months)" },
        { value: "long", label: "Long (3-6 months)" },
        { value: "extended", label: "Extended (6+ months)" }
      ]
    }
  ],
  price: [
    {
      group: "Price Ranges",
      options: [
        { value: "free", label: "Free" },
        { value: "low", label: "Low (Under $50)" },
        { value: "medium", label: "Medium ($50-$200)" },
        { value: "high", label: "High ($200+)" }
      ]
    }
  ],
  schedule: [
    {
      group: "Class Timings",
      options: [
        { value: "morning", label: "Morning (6 AM - 12 PM)" },
        { value: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
        { value: "evening", label: "Evening (4 PM - 8 PM)" },
        { value: "night", label: "Night (8 PM - 12 AM)" }
      ]
    },
    {
      group: "Days",
      options: [
        { value: "weekdays", label: "Weekdays" },
        { value: "weekends", label: "Weekends" },
        { value: "flexible", label: "Flexible" }
      ]
    }
  ]
};

// Sample Data
const course = [
  {
    id: 1,
    name: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and MongoDB",
    category: "Programming",
    level: "Intermediate",
    city: "Online",
    duration: "12 weeks",
    instructor: {
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson",
      title: "Senior Developer"
    },
    price: 499,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    enrolledStudents: 1234
  },
  {
    id: 2,
    name: "Data Science Fundamentals",
    description: "Master data analysis, Python, and machine learning basics",
    category: "Data Science",
    level: "Beginner",
    city: "Online",
    duration: "10 weeks",
    instructor: {
      name: "Michael Chen",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen",
      title: "Data Scientist"
    },
    price: 599,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    enrolledStudents: 892
  },
  {
    id: 3,
    name: "UI/UX Design Workshop",
    description: "Create beautiful and functional user interfaces",
    category: "Design",
    level: "Advanced",
    city: "Online",
    duration: "8 weeks",
    instructor: {
      name: "Emma Davis",
      avatar: "https://ui-avatars.com/api/?name=Emma+Davis",
      title: "UX Designer"
    },
    price: 399,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    enrolledStudents: 567
  },
  {
    id: 4,
    name: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and MongoDB",
    category: "Programming",
    level: "Intermediate",
    city: "Online",
    duration: "12 weeks",
    instructor: {
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson",
      title: "Senior Developer"
    },
    price: 499,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    enrolledStudents: 1234
  },
  {
    id: 5,
    name: "Data Science Fundamentals",
    description: "Master data analysis, Python, and machine learning basics",
    category: "Data Science",
    level: "Beginner",
    city: "Online",
    duration: "10 weeks",
    instructor: {
      name: "Michael Chen",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen",
      title: "Data Scientist"
    },
    price: 599,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    enrolledStudents: 892
  },
  {
    id: 6,
    name: "UI/UX Design Workshop",
    description: "Create beautiful and functional user interfaces",
    category: "Design",
    level: "Advanced",
    city: "Online",
    duration: "8 weeks",
    instructor: {
      name: "Emma Davis",
      avatar: "https://ui-avatars.com/api/?name=Emma+Davis",
      title: "UX Designer"
    },
    price: 399,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    enrolledStudents: 567
  },
  {
    id: 1,
    name: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and MongoDB",
    category: "Programming",
    level: "Intermediate",
    city: "Online",
    duration: "12 weeks",
    instructor: {
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson",
      title: "Senior Developer"
    },
    price: 499,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    enrolledStudents: 1234
  },
  {
    id: 2,
    name: "Data Science Fundamentals",
    description: "Master data analysis, Python, and machine learning basics",
    category: "Data Science",
    level: "Beginner",
    city: "Online",
    duration: "10 weeks",
    instructor: {
      name: "Michael Chen",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen",
      title: "Data Scientist"
    },
    price: 599,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    enrolledStudents: 892
  },
  {
    id: 3,
    name: "UI/UX Design Workshop",
    description: "Create beautiful and functional user interfaces",
    category: "Design",
    level: "Advanced",
    city: "Online",
    duration: "8 weeks",
    instructor: {
      name: "Emma Davis",
      avatar: "https://ui-avatars.com/api/?name=Emma+Davis",
      title: "UX Designer"
    },
    price: 399,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    enrolledStudents: 567
  }
];

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
  
       const [user, setUser] = useState(null);

        useEffect(() => {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }, []);
      const navigate = useNavigate();
    
  
 useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://casback-production.up.railway.app/users/getcourse"); // Replace with your API endpoint
        setCourses(response.data.courses);
        console.log(response.data.courses)
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
     const getMenuItemDescription = (item) => {
  const descriptions = {
    Home: "Back to main page",
    Courses: "Browse all available courses",
    Teachers: "Meet our expert instructors",
    Resources: "Learning materials & tools",
    About: "Learn more about us"
  };
  return descriptions[item] || "";
};
  return (
<nav className={`fixed w-full z-50 transition-all duration-500 ${
  isScrolled 
    ? "bg-gradient-to-r from-indigo-900/95 via-blue-900/95 to-purple-900/95 shadow-[0_8px_32px_0_rgba(99,102,241,0.15)] backdrop-blur-xl" 
    : "bg-transparent backdrop-blur-sm bg-gradient-to-r from-indigo-900/50 via-blue-900/50 to-purple-900/50"
}`}>
  <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
    <div className="flex justify-between items-center h-16 sm:h-20">
      {/* Logo */}
      <div className="flex items-center">
        <div className="relative group">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Main Logo Container */}
            <div className="relative group cursor-pointer">
              {/* Animated background rings */}
              <div className="absolute inset-[-8px] bg-gradient-to-r from-indigo-400 via-blue-300 to-purple-400 rounded-full animate-spin-slow opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-700"></div>
              <div className="absolute inset-[-4px] bg-gradient-to-r from-purple-400 via-blue-300 to-indigo-400 rounded-full animate-reverse-spin opacity-60 blur-sm group-hover:opacity-90 transition-opacity duration-700"></div>
              
              <div className="relative">
                {/* Main logo shape */}
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 via-blue-400 to-purple-500 rounded-full transform transition-all duration-500 group-hover:scale-110 hover:rotate-180">
                  {/* Glass effect overlay */}
                  <div className="absolute inset-[2px] bg-gradient-to-br from-white/40 to-white/20 rounded-full backdrop-blur-sm">
                    {/* Logo content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xl sm:text-2xl font-bold font-sans tracking-wider transform transition-transform duration-500 group-hover:scale-110">
                        A
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Text */}
            <div className="relative group">
              <h1 className="text-2xl sm:text-4xl font-bold">
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-indigo-200 via-blue-200 to-purple-200 bg-clip-text text-transparent font-sans">
                    Azad
                  </span>
                </span>
              </h1>
              <p className="hidden sm:block text-sm font-medium mt-1">
                <span className="bg-gradient-to-r from-indigo-100 via-blue-100 to-purple-100 bg-clip-text text-transparent tracking-wider">
                  Education Platform
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        {["Home", "Courses", "Academies", "Resources", "About"].map((item) => (
          <a
            key={item}
            onClick={() => navigate(`/${item.toLowerCase()}`)}
            className="relative group"
          >
            <span className="relative z-10 text-white hover:text-indigo-200 transition-colors duration-300 font-medium text-base lg:text-lg">
              {item}
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
        ))}

        {/* Enhanced Action Buttons */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="relative group p-2 hover:bg-white/5 rounded-full transition-all duration-300"
          >
            <RiSearchLine className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:text-indigo-200 transition-colors duration-300" />
          </button>

          {/* Get Started Button */}
          {user ? (
            <Link to="/teacherdashboard" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-indigo-300/30 transform transition-transform duration-300 group-hover:scale-110">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                      {user.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <span className="text-white font-medium text-sm sm:text-lg group-hover:text-indigo-200 transition-colors capitalize">
                {user.fullName}
              </span>
            </Link>
          ) : (
            <Link to="/signup">
              <button
                onClick={() => setShowLoginModal(true)}
                className="relative group"
              >
                <span className="relative block px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full text-white font-semibold text-sm sm:text-base group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-blue-400 group-hover:to-purple-400 transform transition-all duration-300 group-hover:scale-105">
                  Get Started
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden relative group p-2 hover:bg-white/5 rounded-full transition-all duration-300"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <RiCloseLine className="h-6 w-6 text-white group-hover:text-indigo-200 transition-colors duration-300" />
        ) : (
          <RiMenuLine className="h-6 w-6 text-white group-hover:text-indigo-200 transition-colors duration-300" />
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
      className="md:hidden fixed top-16 sm:top-20 left-0 right-0 bg-gradient-to-b from-indigo-900/98 to-purple-900/98 backdrop-blur-xl border-t border-indigo-500/20 shadow-2xl"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-7xl mx-auto"
      >
        <div className="p-6 space-y-6">
          {/* Menu Items */}
          <div className="grid gap-4">
            {[
              { name: "Home", icon: "🏠", path: "/" },
              { name: "Courses", icon: "📚", path: "/courses" },
              { name: "Teachers", icon: "👩‍🏫", path: "/academies" },
              { name: "Resources", icon: "📑", path: "/resources" },
              { name: "About", icon: "ℹ️", path: "/about" }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false); // Close menu after navigation
                }}
                className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 backdrop-blur-sm transition-all duration-300">
                  <span className="text-2xl">{item.icon}</span>
                </span>
                <div className="flex flex-col">
                  <span className="text-white font-medium text-lg group-hover:text-indigo-200 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-indigo-300/60 text-sm">
                    {getMenuItemDescription(item.name)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-indigo-500/20">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center">
                <RiSearchLine className="h-5 w-5 text-indigo-300/60 group-hover:text-indigo-200 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search courses, teachers..."
                className="w-full pl-12 pr-4 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 focus:bg-indigo-500/20 rounded-xl border border-indigo-500/20 hover:border-indigo-500/30 focus:border-indigo-500/40 text-white placeholder-indigo-300/60 outline-none transition-all duration-300"
              />
            </div>

            {/* Get Started Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowLoginModal(true);
                setIsMenuOpen(false); // Close menu when opening login modal
              }}
              className="relative w-full group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3 py-4 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-xl text-white font-semibold text-lg">
                <span>Get Started</span>
                <RiArrowRightLine className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>

            {/* Additional Links */}
            <div className="flex items-center justify-between pt-4 text-sm">
              <div
                onClick={() => {
                  navigate('/help');
                  setIsMenuOpen(false);
                }}
                className="text-indigo-300/80 hover:text-indigo-200 transition-colors cursor-pointer"
              >
                Need Help?
              </div>
              <span className="text-indigo-500/40">•</span>
              <div
                onClick={() => {
                  navigate('/contact');
                  setIsMenuOpen(false);
                }}
                className="text-indigo-300/80 hover:text-indigo-200 transition-colors cursor-pointer"
              >
                Contact Us
              </div>
              <span className="text-indigo-500/40">•</span>
              <div
                onClick={() => {
                  navigate('/faq');
                  setIsMenuOpen(false);
                }}
                className="text-indigo-300/80 hover:text-indigo-200 transition-colors cursor-pointer"
              >
                FAQ
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  </div>
</nav>
  );
};

// NavLink Component
const NavLink = ({ href, children }) => (

  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    {children}
  </a>
);

// Hero Section
const Hero = () => (
    <div className="relative fonting min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <img
        src="https://c0.wallpaperflare.com/preview/980/37/200/training-course-learning-and-development-online.jpg"
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-indigo-900/90"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>

    {/* Main Content */}
    <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute -left-16 -top-16">
              <BsStars className="text-4xl text-yellow-400 animate-pulse" />
            </div>
            <div className="absolute -right-16 -top-8">
              <BsLightningCharge className="text-3xl text-blue-400 animate-bounce" />
            </div>
            <IoSchoolOutline className="text-6xl text-white opacity-80" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          Empower Your Future with
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Professional Education
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
        >
          Join thousands of learners worldwide and transform your career with our expert-led courses
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {[
            { icon: FiAward, text: "Certified Courses" },
            { icon: FiUserPlus, text: "Expert Instructors" },
            { icon: FiTrendingUp, text: "Career Growth" },
            { icon: FiGrid, text: "Interactive Learning" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
            >
              <feature.icon className="text-2xl text-blue-400 mb-2 mx-auto" />
              <p className="text-white text-sm">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg shadow-blue-600/30">
            <FiBook className="text-white text-xl group-hover:rotate-12 transition-transform" />
            <span className="text-white font-semibold">Browse Courses</span>
          </button>
          
          <button className="group px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:ring-2 hover:ring-indigo-400/50">
  <FiPlay className="text-white text-xl group-hover:scale-110 transition-transform" />
  <span className="text-white font-semibold">Watch Demo</span>
</button>
        </motion.div>

        {/* Stats */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1 }}
  className="mt-12 container mx-auto"
>
  {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto px-4">
    {/* Students Card */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="col-span-1 bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group shadow-lg shadow-blue-900/30"
    >
      <div className="flex items-center justify-between mb-4">
        <BsPeopleFill className="text-3xl text-blue-400 group-hover:text-blue-300 transition-colors" />
        <FiUsers className="text-2xl text-blue-400/50 group-hover:text-blue-300 transition-colors" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 text-transparent bg-clip-text mb-2">10K+</div>
      <div className="text-sm text-blue-300">Active Students</div>
    </motion.div>

    {/* Courses Card */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="col-span-1 bg-gradient-to-br from-gray-900 via-purple-900 to-purple-800 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group shadow-lg shadow-purple-900/30"
    >
      <div className="flex items-center justify-between mb-4">
        <BsBookFill className="text-3xl text-purple-400 group-hover:text-purple-300 transition-colors" />
        <FiBookOpen className="text-2xl text-purple-400/50 group-hover:text-purple-300 transition-colors" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-100 text-transparent bg-clip-text mb-2">200+</div>
      <div className="text-sm text-purple-300">Online Courses</div>
    </motion.div>

    {/* Countries Card */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="col-span-1 bg-gradient-to-br from-gray-900 via-indigo-900 to-indigo-800 backdrop-blur-md rounded-2xl p-6 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 group shadow-lg shadow-indigo-900/30"
    >
      <div className="flex items-center justify-between mb-4">
        <FiGlobe className="text-3xl text-indigo-400 group-hover:text-indigo-300 transition-colors" />
        <FiGlobe className="text-2xl text-indigo-400/50 group-hover:text-indigo-300 transition-colors" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-indigo-100 text-transparent bg-clip-text mb-2">1000+</div>
      <div className="text-sm text-indigo-300">Academics</div>
    </motion.div>

    {/* Time Card */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="col-span-1 bg-gradient-to-br from-gray-900 via-cyan-900 to-cyan-800 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 group shadow-lg shadow-cyan-900/30"
    >
      <div className="flex items-center justify-between mb-4">
        <FiClock className="text-3xl text-cyan-400 group-hover:text-cyan-300 transition-colors" />
        <FiCalendar className="text-2xl text-cyan-400/50 group-hover:text-cyan-300 transition-colors" />
      </div>
      <div className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-cyan-100 text-transparent bg-clip-text mb-2">2025-02-03</div>
      <div className="text-sm text-cyan-300">02:29:39 UTC</div>
    </motion.div>

    {/* User Card */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="col-span-1 bg-gradient-to-br from-gray-900 via-teal-900 to-teal-800 backdrop-blur-md rounded-2xl p-6 border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300 group shadow-lg shadow-teal-900/30"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold">
            H
          </span>
        </div>
        <FiUsers className="text-2xl text-teal-400/50 group-hover:text-teal-300 transition-colors" />
      </div>
      <div className="text-lg font-bold bg-gradient-to-r from-teal-300 to-teal-100 text-transparent bg-clip-text mb-2 truncate">
        huzaifa8883
      </div>
      <div className="text-sm text-teal-300">Active User</div>
    </motion.div>
  </div>

  {/* Enhanced animation line */}
  <div className="max-w-6xl mx-auto mt-8 px-4">
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.5, delay: 1.5 }}
      className="h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
    />
  </div>
</motion.div>
      </motion.div>
    </div>

    {/* Bottom Wave */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,128C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  </div>
);

// Course Card Component
const CourseCard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await axios.get("https://casback-production.up.railway.app/users/getcourse"); // Replace with your API endpoint
          setCourses(response.data.courses);
          console.log(response.data.courses)
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch courses:", error);
          setLoading(false);
        }
      };
      fetchCourses();
    }, []);
    const getLevelBadgeColor = (level) => {
  const colors = {
    beginner: 'bg-green-100/90 text-green-800',
    intermediate: 'bg-yellow-100/90 text-yellow-800',
    advanced: 'bg-red-100/90 text-red-800',
    expert: 'bg-purple-100/90 text-purple-800'
  };
  return colors[level.toLowerCase()] || colors.beginner;
};
  return (
    <>
{courses.map((course, index) => (
  <motion.div
    key={course._id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ 
      y: -12,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl 
      transition-all duration-500 border border-gray-100 backdrop-blur-lg"
  >
    {/* Course Image & Header Section - Enhanced */}
    <div className="relative h-[300px] overflow-hidden">
      {/* Improved gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
        group-hover:from-black/95 transition-all duration-500" />
      
      <motion.img 
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Enhanced Course Meta Information */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        {/* Improved Level Badge */}
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className={`px-4 py-2 rounded-full text-sm font-semibold 
            ${getLevelBadgeColor(course.level)} backdrop-blur-md shadow-lg
            border border-white/10`}
        >
          {course.level}
        </motion.span>

        {/* Enhanced Price Tag */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center bg-white/95 px-4 py-2 rounded-full shadow-lg
            border border-blue-100"
        >
          <FaDollarSign className="text-blue-600 mr-1" />
          <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-800 
            bg-clip-text text-transparent">{course.price}</span>
        </motion.div>
      </div>

      {/* Enhanced Course Title Section */}
      <div className="absolute bottom-4 left-4 right-4 transform group-hover:translate-y-0 
        transition-transform duration-300">
        <h3 className="text-2xl font-bold text-white mb-3 leading-tight
          group-hover:text-blue-400 transition-colors duration-300">{course.title}</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md 
            rounded-full px-3 py-1">
            <FaClock className="text-blue-400" />
            <span className="text-sm text-gray-100">{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-md 
            rounded-full px-3 py-1">
            <FaStar className="text-yellow-400" />
            <span className="text-sm text-gray-100">4.8</span>
          </div>
        </div>
      </div>
    </div>

    {/* Enhanced Course Content Section */}
    <div className="p-8">
      {/* Improved Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 
            text-blue-600 rounded-full text-sm font-medium border border-blue-200
            hover:shadow-md transition-all duration-300"
        >
          {course.category}
        </motion.span>
      </div>

      {/* Enhanced Description */}
      <p className="text-gray-600 text-base mb-6 line-clamp-2 leading-relaxed">
        {course.description}
      </p>

      {/* Improved Key Features */}
      <div className="space-y-4 mb-8">
        <motion.div 
          whileHover={{ x: 4 }}
          className="flex items-start space-x-3 group/item"
        >
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 
            flex items-center justify-center">
            <FaCheck className="text-green-500 text-sm" />
          </div>
          <span className="text-gray-700 group-hover/item:text-gray-900 
            transition-colors duration-300">{course.whatYouWillLearn}</span>
        </motion.div>
      </div>

      {/* Enhanced Instructor Info */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <motion.div 
          whileHover={{ x: 4 }}
          className="flex items-center space-x-4"
        >
          <div className="relative">
            <img 
              src={"http://res.cloudinary.com/duovmhekc/image/upload/v1741728230/muslrmcbyrsfum9p8mxn.png"}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 
              rounded-full border-2 border-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Top Instructor</h4>
            <p className="text-sm text-gray-500">Expert Level</p>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Action Buttons */}
      <div className="pt-8 flex items-center justify-between">
        <Link 
          to={`/courses/${course._id}`}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white 
            px-8 py-4 rounded-2xl font-bold tracking-wide
            hover:from-blue-700 hover:to-blue-800 transition-all duration-300 
            transform hover:-translate-y-1 shadow-lg hover:shadow-xl
            text-center uppercase text-sm"
        >
          Enroll Now
        </Link>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="ml-4 p-4 rounded-2xl border border-gray-200 hover:bg-gray-50
            transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          <FaRegHeart className="text-gray-600 text-xl" />
        </motion.button>
      </div>
    </div>

    {/* Enhanced Progress Badge */}
    {course.progress && (
      <div className="absolute top-4 right-4">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-16 h-16 bg-white rounded-full shadow-lg p-2">
            <CircularProgressbar 
              value={course.progress} 
              text={`${course.progress}%`}
              styles={buildStyles({
                pathColor: `#2563EB`,
                textColor: '#1E40AF',
                trailColor: '#EFF6FF',
                pathTransitionDuration: 0.5,
              })}
            />
          </div>
        </motion.div>
      </div>
    )}
  </motion.div>
))}
  </>
)
}
  // In your parent component:


// Search and Filter Component
const SearchFilters = ( ) => {
  // States
  const [activeCategory, setActiveCategory] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const currentUser = "huzaifaquershi66";
const [filters, setFilters] = useState({
  search: '',
  category: '',
  level: '',
  ageGroup: '',
  duration: '',
  price: '',
  schedule: ''
});

const resetFilters = () => {
  setFilters({
    search: '',
    category: '',
    level: '',
    ageGroup: '',
    duration: '',
    price: '',
    schedule: ''
  });
};

// Then in your JSX:
<SearchFilters 
  filters={filters}
  setFilters={setFilters}
  resetFilters={resetFilters}
/>
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time functions
  const formatDateTime = (date) => {
    return date.toISOString().replace('T', ' ').slice(0, 19);
  };

  const formatDisplayTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // FilterCategory Component
  const FilterCategory = ({ category, isActive, onClick, selectedValue, onOptionSelect, options, openCategory,
  setOpenCategory }) => {
  const showOptions = openCategory === category;
    const categoryRef = useRef(null);
    const isOpen = openCategory === category;
const handleToggle = () => {
    setOpenCategory(isOpen ? null : category);
  };

  const handleSelect = (value) => {
    onOptionSelect(value);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setOpenCategory(null);
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => window.removeEventListener('click', handleClickOutside);
  }, [isOpen, setOpenCategory]);


    return (
    <div className="relative" ref={categoryRef}>
      <div
        className={`p-4 rounded-2xl cursor-pointer transition-all duration-200
          ${isActive 
            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiFilter className={`text-xl ${isActive ? 'text-white' : 'text-blue-500'}`} />
            <span className="font-medium">
              {category === 'ageGroup' ? 'Age Group' : category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
          {selectedValue && (
            <span className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
              {selectedValue}
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute bottom-full left-0 right-0 mb-2 z-50 bg-white rounded-xl shadow-xl border border-gray-100 p-3 max-h-[300px] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((groupObj, groupIndex) => (
            <div key={groupIndex} className="mb-3 last:mb-0">
              <div className="text-sm font-semibold text-gray-500 mb-2 px-2">
                {groupObj.group}
              </div>
              {groupObj.options.map((option, index) => (
                <div
                  key={index}
                  className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                  onClick={() => handleSelect(option.value)}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {selectedValue === option.value && (
                      <FiCheck className="text-blue-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl shadow-2xl p-8 mb-8 mt-12"
    >
      {/* Header Section */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-2xl"></div>
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-500/5">
          {/* Left Section - Title */}
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl transform transition-transform duration-300 group-hover:scale-105">
                <FiFilter className="text-2xl text-white" />
              </div>
            </div>
            <div className="relative group">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Search Filters
              </h2>
              <p className="text-gray-500 text-sm mt-1 group-hover:text-gray-600 transition-colors duration-300">
                Find your perfect match
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Right Section - User Info & Actions */}
          <div className="flex flex-wrap items-center gap-4">
            {/* User Profile */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 px-4 py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 cursor-pointer"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg animate-pulse opacity-50 blur"></div>
                  <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-white">
                    {currentUser[0].toUpperCase()}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium">{currentUser}</span>
                  <span className="text-gray-400 text-xs">Active Now</span>
                </div>
              </motion.div>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {/* User Menu Content */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Time Display */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 px-4 py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 cursor-pointer"
                onClick={() => setShowTimeMenu(!showTimeMenu)}
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FiClock className="text-blue-500 text-lg" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium">{formatDisplayTime(currentDateTime)}</span>
                  <span className="text-gray-400 text-xs">Today</span>
                </div>
              </motion.div>

              <AnimatePresence>
                {showTimeMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {/* Time Menu Content */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetFilters}
              className="group flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              <FiRefreshCw className="text-lg group-hover:rotate-180 transition-transform duration-500" />
              <span>Reset Filters</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FiSearch className="text-xl text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses, instructors, or keywords..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-700 placeholder-gray-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* Filter Categories */}
     {/* Filter Categories */}
{/* Filter Categories */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
  {['category', 'level', 'ageGroup', 'duration', 'price', 'schedule'].map((category) => (
    <FilterCategory
      key={category}
      category={category}
      isActive={openCategory === category || filters[category]}
      selectedValue={filters[category]}
      onOptionSelect={(value) => {
        setFilters(prev => ({ ...prev, [category]: value }));
        setOpenCategory(null);
      }}
      options={filterOptions[category] || [{
        group: "Options",
        options: [{ value: "none", label: "No options available" }]
      }]}
      openCategory={openCategory}
      setOpenCategory={setOpenCategory}
    />
  ))}
</div>
      {/* Active Filters */}
      <AnimatePresence>
        {Object.entries(filters).some(([_, value]) => value) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100"
          >
            {Object.entries(filters).map(([key, value]) =>
              value ? (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => setFilters({ ...filters, [key]: "" })}
                    className="hover:text-blue-800"
                  >
                    <FiX className="text-xs" />
                  </button>
                </motion.span>
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
const filterCategories = [
  { name: 'All', icon: FiGrid },
  { name: 'Popular', icon: FiTrendingUp },
  { name: 'Newest', icon: FiClock },
  { name: 'Featured', icon: FiStar }
];
const SelectArrow = () => (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
    <svg
      className="w-4 h-4 text-gray-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
)

// Main App Component
const Courses = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    level: "",
    city: "",
    ageGroup: "",
    duration: "",
    price: "",
    schedule: ""
  });

  // Filter courses based on search criteria
  const filteredCourses = course.filter(course => {
    return (
      (filters.search === "" || 
        course.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.category === "" || course.category === filters.category) &&
      (filters.level === "" || course.level === filters.level)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      
      <main className="container mx-auto px-4 py-12 -mt-20 relative z-10">
        <SearchFilters filters={filters} setFilters={setFilters} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
            <CourseCard key={course.id} course={course} />
        
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses found matching your criteria.</p>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EduLearn Pro</h3>
              <p className="text-gray-400">Transforming lives through education</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400">Courses</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@edulearn.pro</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <FiUser className="text-xl" />
                </a>
                {/* Add more social icons as needed */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduLearn Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Add these styles to your CSS file or use a styling solution like Tailwind CSS
const styles = `
  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to right, #3B82F6, #8B5CF6);
  }

  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full
      transform hover:scale-105 transition-all duration-300 shadow-md
      flex items-center justify-center;
  }

  .btn-secondary {
    @apply bg-white/10 hover:bg-white/20 text-gray-800 px-6 py-2 rounded-full
      backdrop-blur-sm transform hover:scale-105 transition-all duration-300
      shadow-md flex items-center justify-center border border-gray-200;
  }
`;

export default Courses;