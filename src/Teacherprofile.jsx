import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { RiSearchLine, RiNotificationLine, RiCloseLine, RiMenuLine, RiChatSmileLine,RiChatQuoteLine } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, FaUsers, FaStar, FaCertificate, 
  FaCalendarAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedinIn,FaUniversity,FaQuoteLeft,FaRegThumbsUp,FaRegComment,FaShare,
  FaGithub, FaYoutube, FaArrowRight, FaBookOpen,FaClock,FaCalendar, FaLinkedin,FaPlay,FaAward,FaLightbulb,FaMedal ,FaBookmark,FaHeart,FaPlayCircle
} from 'react-icons/fa';
// import {FaVerified} from 'react-icons/fc';
const teacherData = {
  name: "Dr. Sarah Ahmed",
  title: "Senior Professor of Computer Science",
  specialization: "AI & Machine Learning Expert",
  rating: 4.8,
  totalReviews: 127,
  experience: "6 Years",
  students: "0",
  activeCourses: 1,
  location: "Stanford University, California",
  email: "dr.sarah@stanford.edu",
  phone: "+1 (650) 123-4567",
  officeHours: "Mon-Fri: 9:00 AM - 5:00 PM",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg", // Added avatar for profile
  education: [
    {
      degree: "Ph.D. in Computer Science",
      institution: "Stanford University",
      year: "2008"
    },
    {
      degree: "M.S. in Artificial Intelligence",
      institution: "MIT",
      year: "2005"
    },
    {
      degree: "B.S. in Computer Science",
      institution: "Carnegie Mellon University",
      year: "2003"
    }
  ],
  courses: [
    {
      id: 1,
      title: "Advanced Machine Learning",
      category: "Artificial Intelligence",
      level: "Advanced",
      duration: "12 Weeks",
      students: 150,
      rating: 4.9,
      price: 799,
      description: "Master advanced ML algorithms and their real-world applications with hands-on projects and industry-relevant case studies.",
      image: "https://media.istockphoto.com/id/1387900612/photo/automation-data-analytic-with-robot-and-digital-visualization-for-big-data-scientist.jpg?s=612x612&w=0&k=20&c=50maOJU6CpVC55mYnUqtff2aiaJZ7KlmMn4jNhWD_eo="
    },
    {
      id: 2,
      title: "Deep Learning Fundamentals",
      category: "Neural Networks",
      level: "Intermediate",
      duration: "10 Weeks",
      students: 120,
      rating: 4.8,
      price: 699,
      description: "Explore the foundations of neural networks and deep learning with practical implementations using modern frameworks.",
      image: "https://ischoolonline.berkeley.edu/wp-content/uploads/sites/37/2021/01/4430_whatismachinelearning_hero.jpg"
    },
    {
      id: 3,
      title: "Natural Language Processing",
      category: "AI & Language",
      level: "Advanced",
      duration: "8 Weeks",
      students: 90,
      rating: 4.7,
      price: 599,
      description: "Learn cutting-edge NLP techniques and build practical applications for text analysis and language understanding.",
      image: "https://thedatascientist.com/wp-content/uploads/2023/05/machine-learning.jpeg"
    }
  ],
  reviews: [
    {
      id: 1,
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      date: "2025-01-28 14:30:00",
      verified: true,
      topReviewer: true,
      content: "Dr. Sarah's Advanced Machine Learning course is nothing short of exceptional. Her ability to break down complex concepts into digestible pieces is remarkable. I particularly appreciated her real-world applications and hands-on projects. The course has significantly improved my understanding of ML algorithms and their practical implementations. Her office hours were incredibly helpful, and she always went above and beyond to ensure every student understood the material.",
      likes: 234,
      comments: 42,
      course: "Advanced Machine Learning",
      media: [
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&auto=format",
        "https://images.unsplash.com/photo-1586374579358-9d19d632b6df?w=400&auto=format"
      ]
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      date: "2025-01-15 09:45:00",
      verified: true,
      topReviewer: false,
      content: "Taking the Deep Learning Fundamentals course with Dr. Ahmed was a game-changing experience for my career. Her teaching methodology is innovative and engaging. The course structure was well-thought-out, progressing from basic concepts to advanced applications seamlessly. The practical exercises and project work were particularly valuable. Dr. Ahmed's expertise in the field is evident, and her passion for teaching makes complex topics accessible and interesting.",
      likes: 189,
      comments: 28,
      course: "Deep Learning Fundamentals"
    },
    {
      id: 3,
      name: "David Kumar",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 4.8,
      date: "2025-02-01 16:20:00",
      verified: true,
      topReviewer: true,
      content: "The Natural Language Processing course exceeded my expectations. Dr. Sarah's approach to teaching NLP is both comprehensive and practical. She has an incredible ability to explain complex algorithms in an understandable way. The course materials were up-to-date with the latest developments in the field, and the hands-on projects gave us real-world experience. Her feedback on assignments was always constructive and helpful.",
      likes: 156,
      comments: 31,
      course: "Natural Language Processing",
      media: [
        "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&auto=format"
      ]
    },
    {
      id: 4,
      name: "Sophie Anderson",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 4.9,
      date: "2025-02-03 11:15:00",
      verified: true,
      topReviewer: false,
      content: "Dr. Ahmed is an outstanding educator who brings both academic rigor and industry relevance to her courses. I took the Advanced Machine Learning course, and I was impressed by her ability to maintain a perfect balance between theoretical foundations and practical applications. The course projects were challenging but incredibly rewarding, and Dr. Ahmed was always available to provide guidance when needed. Her extensive industry experience adds tremendous value to the learning experience.",
      likes: 142,
      comments: 23,
      course: "Advanced Machine Learning"
    },
    {
      id: 5,
      name: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/92.jpg",
      rating: 4.7,
      date: "2025-01-22 13:40:00",
      verified: true,
      topReviewer: false,
      content: "The Deep Learning Fundamentals course was transformative for my understanding of neural networks. Dr. Sarah has a gift for making complex concepts accessible without oversimplifying them. The course materials were comprehensive, and the practical sessions were invaluable. What sets her apart is her commitment to student success - she regularly held additional consultation sessions for challenging topics and provided excellent career guidance. Highly recommend any course taught by her.",
      likes: 167,
      comments: 35,
      course: "Deep Learning Fundamentals",
      media: [
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&auto=format",
        "https://images.unsplash.com/photo-1564865878688-9a244444042a?w=400&auto=format"
      ]
    }
  ],
  specializations: [
    {
      title: "Machine Learning",
      description: "Specializing in advanced ML algorithms and their practical applications in real-world scenarios."
    },
    {
      title: "Deep Learning",
      description: "Expert in neural networks architecture and implementation using modern frameworks."
    },
    {
      title: "Natural Language Processing",
      description: "Focus on cutting-edge NLP techniques and their applications in text analysis and understanding."
    }
  ]
};


const TeacherProfile = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [teacher, setTeacher] = useState(null);
    
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
const { id } = useParams();
 const [user, setUser] = useState(null);
          useEffect(() => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // useEffect(() => {
  useEffect(() => {
  const fetchApprovedUsers = async () => {
    try {
      const response = await fetch(`https://casback-production.up.railway.app/users/getsingleuser/${id}`);
      const data = await response.json();

      if (data) {
        setTeacher(data.data); // set state
        console.log(data.data)
      } else {
        console.log("User not found or bad response:", data);
      }
    } catch (error) {
      console.error("Error fetching approved user:", error);
    }
  };

  fetchApprovedUsers();
}, [id]);


  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.3}px)`
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-indigo-600"
        >
          <FaGraduationCap className="w-16 h-16" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
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
      {/* Hero Section */}
      <header className="relative min-h-screen overflow-hidden bg-[#0A0F1C]">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-30" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full filter blur-[128px] animate-pulse-slow" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/30 rounded-full filter blur-[128px] animate-pulse-slow animation-delay-2000" />
            <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full filter blur-[128px] animate-pulse-slow animation-delay-4000" />
          </div>
        </div>
      </div>

      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/80 via-[#0A0F1C]/90 to-[#0A0F1C]" />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="relative container mx-auto px-8 h-full pt-32 z-10"
      >
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-12">
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full 
                       bg-gradient-to-r from-emerald-500/10 to-blue-500/10
                       backdrop-blur-xl border border-white/10 hover:border-white/20
                       transition-all duration-300 cursor-pointer"
            >
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-sm font-medium tracking-wider group-hover:text-emerald-300">
                Available for Mentoring
              </span>
            </motion.div>

            {/* Title & Subtitle */}
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <h2 className="text-white/80 text-xl font-light">Welcome to my profile</h2>
                <h1 className="text-7xl font-bold tracking-tight leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r 
                               from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
        {teacher?.fullName || "Loading..."}
                  </span>
                </h1>
                <p className="text-3xl font-light bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  {teacher?.bio}
                </p>
              </motion.div>
            </div>

            {/* Stats */}
           <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8">
  {[
    { label: "Students", value: 0, icon: FaUsers },            // student review 0
    { label: "Rating", value: 5, icon: FaStar },              // fixed rating 5
    { label: "Experience", value: teacher?.experience, icon: FaClock } // teacher.experience
  ].map((stat, idx) => (
    <motion.div
      key={idx}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                  rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 
                  backdrop-blur-xl hover:border-white/20 transition-all duration-300">
        <div className="flex flex-col items-center">
          <stat.icon className="text-3xl text-blue-400 mb-4 group-hover:text-blue-300 
                            transition-colors duration-300" />
          <div className="text-4xl font-bold text-white mb-2 tracking-tight">
            {stat.value}
          </div>
          <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">
            {stat.label}
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="flex items-center gap-8">
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 
                             rounded-2xl blur group-hover:blur-xl transition-all duration-300" />
                <div className="relative flex items-center gap-3 px-8 py-4 rounded-2xl 
                             bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium">
                  <FaCalendar className="text-xl" />
                  <span>Book a Session</span>
                </div>
              </motion.button>

              {/* Social Links */}
              <div className="flex gap-6">
                {[
                  { icon: FaLinkedin, color: "hover:text-blue-400" },
                  { icon: FaGithub, color: "hover:text-purple-400" },
                  { icon: FaYoutube, color: "hover:text-pink-400" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ y: -5 }}
                    href="#"
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 
                                backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                      <social.icon className={`text-2xl text-white ${social.color} transition-colors duration-300`} />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Image Container */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                            rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-3xl overflow-hidden border-2 border-white/10 
                           group-hover:border-white/20 transition-all duration-300"
                >
                  <img
                    src={teacher?.profilePicture}
                    alt={teacher?.fullName}
                    className="w-[540px] h-[640px] object-cover transition-transform duration-500 
                             group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/80 via-transparent to-transparent" />
                </motion.div>
              </div>

              {/* Achievement Cards */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -left-20 top-1/4 p-6 rounded-2xl 
                         bg-white/5 backdrop-blur-xl border border-white/10"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {teacherData.totalReviews}+
                </div>
                <div className="text-blue-200 font-medium">Student Reviews</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -right-10 bottom-1/4 p-6 rounded-2xl 
                         bg-white/5 backdrop-blur-xl border border-white/10"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {teacher?.experience}
                </div>
                <div className="text-blue-200 font-medium">Years Teaching</div>
              </motion.div>

              {/* Play Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                         p-6 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                         hover:bg-white/20 transition-all duration-300 group"
              >
                <FaPlay className="text-3xl text-white group-hover:text-blue-400 
                               transition-colors duration-300" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
                   from-transparent via-white/20 to-transparent" />
    </header>



      {/* Main Content */}
      <main className="min-h-screen bg-[#fafafa] dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-indigo-600/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-3xl" />
        <div className="absolute top-60 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-pink-600/20 to-purple-600/20 blur-3xl" />
      </div>

      <div className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Teacher Profile
          </h1>
          <div className="w-24  h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Left Sidebar with Sticky Position */}
          <div className="lg:col-span-1 h-[calc(100vh-80px)] sticky top-8 space-y-8">
            {/* Teacher Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg border border-white/20 min-h-[500px]"
            >
              {/* Header Section with Background */}
              <div className="relative">
  {/* Header Background */}
  {/* <div className="relative h-60" style={parallaxStyle}>
    <div className="absolute inset-0">
      <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-[url('/mesh-gradient.png')] mix-blend-overlay opacity-50" />
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-30" />
      </div>
    </div>
  </div>
   */}
  {/* Profile Picture - Absolutely Positioned within the same parent */}
  <div className="absolute bg-indigo-600 top-20 left-0 right-0 flex justify-center transform -translate-y-1/2">
    <div className="relative group">
      <div className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-2xl ring-4 ring-indigo-600/30">
        <img 
          src={teacher?.profilePicture}
          alt="Teacher Name"
          className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
        />
      </div>
      <motion.div
        className="absolute -right-2 -bottom-2 bg-indigo-600 rounded-full p-2 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaCertificate className="w-5 h-5 text-white" />
      </motion.div>
    </div>
  </div>
</div>


              {/* Avatar - Absolutely Positioned */}
              {/* <div className="absolute top-40 left-0 right-0 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group"
                >
                  <div className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-2xl ring-4 ring-indigo-600/30">
                    <img 
                      src="https://media.istockphoto.com/id/157400344/photo/happy-forties.jpg?s=612x612&w=0&k=20&c=hVK0eBwnrzWFS2inwHJHHRLTDzaKpqOZqzSaQWf85lc="
                      alt={teacherData.name}
                      className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                    />
                  </div>
                  <motion.div
                    className="absolute -right-2 -bottom-2 bg-indigo-600 rounded-full p-2 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaCertificate className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.div>
              </div> */}

              {/* Content Section with extra top padding */}
              <div className="pt-44 pb-8 px-8">
                <div className="text-center space-y-4">
                  <motion.h2 
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {teacher?.fullName}
                  </motion.h2>
                  
                  <motion.div 
                    className="flex flex-wrap justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {['Expert Educator', teacher?.bio].map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Enhanced Stats */}
                  <motion.div 
                    className="grid grid-cols-3 gap-6 py-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {[
                      { icon: FaUsers, label: 'Students', value: '0', color: 'from-blue-500 to-indigo-500' },
                      { icon: FaStar, label: 'Rating', value: '5', color: 'from-yellow-500 to-orange-500' },
                      { icon: FaAward, label: 'Courses', value: '1', color: 'from-purple-500 to-pink-500' }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4 }}
                        className="relative group"
                      >
                        <div 
                          className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity"
                          style={{ backgroundImage: `linear-gradient(to right, ${stat.color.replace(' ', ', ')})` }}
                        />
                        <div className="relative p-4 text-center rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-xl">
                          <stat.icon className="w-8 h-8 mx-auto mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text" />
                          <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                            {stat.value}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Enhanced Social Links */}
                  <motion.div 
                    className="flex justify-center gap-4 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[
                      { Icon: FaLinkedin, color: 'hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/50' },
                      { Icon: FaGithub, color: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800' },
                      { Icon: FaEnvelope, color: 'hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50' }
                    ].map((social, idx) => (
                      <motion.a
                        key={idx}
                        whileHover={{ y: -4, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href="#"
                        className={`p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 transition-all duration-300 shadow-lg hover:shadow-2xl ${social.color} backdrop-blur-lg border border-white/20`}
                      >
                        <social.Icon className="text-2xl" />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-white/20"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  Contact Information
                </span>
              </h3>
              
              <div className="space-y-6">
                {[
                  { icon: FaEnvelope, label: 'Email', value: teacher.email },
                  { icon: FaMapMarkerAlt, label: 'Location', value: teacher.
address
 },
                  { icon: FaCalendarAlt, label: 'Available', value: teacher.availableTimings.join(", ")  }
                ].map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 8 }}
                    className="group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    <div className="relative flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon className="text-xl" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                        <p className="text-gray-900 dark:text-white font-medium">{value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 backdrop-blur-lg border border-white/20"
            >
              <div className="flex flex-wrap md:flex-nowrap gap-4 p-2">
                {['Overview', 'Courses', 'Reviews'].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(tab.toLowerCase())}
                    className={`flex-1 py-4 px-6 rounded-2xl font-medium transition-all duration-500 flex items-center justify-center gap-2 group ${
                      activeSection === tab.toLowerCase()
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className={`text-xl ${
                      activeSection === tab.toLowerCase() ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'
                    }`}>
                      {tab === 'Overview' ? '📊' : tab === 'Courses' ? '📚' : '⭐'}
                    </span>
                    {tab}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Content Sections with Animated Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-8"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-white/20">
                  {activeSection === 'overview' && <OverviewSection teacherData={teacherData} />}
                  {activeSection === 'courses' && <CoursesSection courses={teacherData.courses} />}
                  {activeSection === 'reviews' && <ReviewsSection reviews={teacherData.reviews} />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
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
};

// Content Section Components
const OverviewSection = ({ teacherData }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            icon: FaUsers,
            label: 'Active Students',
            value: teacherData.students,
            gradient: 'from-blue-500 to-indigo-500',
            bgGlow: 'blue'
          },
          { 
            icon: FaBookOpen,
            label: 'Course Portfolio',
            value: teacherData.activeCourses,
            gradient: 'from-purple-500 to-pink-500',
            bgGlow: 'purple'
          },
          { 
            icon: FaCertificate,
            label: 'Years Experience',
            value: teacherData.experience,
            gradient: 'from-amber-500 to-orange-500',
            bgGlow: 'orange'
          }
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="relative group"
          >
            {/* Background Glow Effect */}
            <div className={`absolute inset-0 bg-${stat.bgGlow}-600/20 rounded-3xl blur-xl 
                          group-hover:bg-${stat.bgGlow}-600/30 transition-all duration-300`} />
            
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl
                          border border-white/20 backdrop-blur-lg overflow-hidden">
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-5 bg-[url('/grid-pattern.svg')]" />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} 
                              shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 
                             dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {stat.value}+
                </h4>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced About Section */}
      <motion.div
        variants={itemVariants}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-3xl blur-xl" />
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 
                      border border-white/20 backdrop-blur-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 
                        rounded-full blur-3xl transform translate-x-20 -translate-y-20" />
          
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaLightbulb className="text-indigo-600" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg relative z-10">
            {teacherData.about || `With over ${teacherData.experience} years of dedicated teaching experience,
            I've mastered the art of breaking down complex concepts into digestible pieces. My teaching
            philosophy is built on three pillars: practical application, strong fundamentals, and
            personalized attention to each student's learning journey.`}
          </p>
        </div>
      </motion.div>

      {/* Enhanced Specializations */}
      <motion.div
        variants={itemVariants}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl blur-xl" />
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 
                      border border-white/20 backdrop-blur-lg">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaMedal className="text-purple-600" />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Areas of Expertise
            </span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {teacherData.specializations?.map((spec, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }}
                className="group relative"
              >
                {/* Card Background with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 
                              dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl 
                              group-hover:from-indigo-100 group-hover:to-purple-100
                              dark:group-hover:from-indigo-800/20 dark:group-hover:to-purple-800/20
                              transition-all duration-300" />
                
                {/* Card Content */}
                <div className="relative p-6 rounded-2xl overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br 
                                from-purple-600/10 to-pink-600/10 rounded-full blur-xl" />
                  
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3
                               group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                               transition-colors duration-300">
                    {spec.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {spec.description}
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className="mt-4 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CoursesSection = ({ courses }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      className="grid md:grid-cols-2 gap-8"
    >
      {courses.map((course, i) => (
        <motion.div
          key={i}
          variants={cardVariants}
          whileHover={{ y: -8 }}
          className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden
                   border border-white/20 backdrop-blur-lg"
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 
                        group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-500" />
          
          {/* Course Image Container */}
          <div className="relative h-56 overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            
            {/* Course Image */}
            <motion.img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />

            {/* Category Badge */}
            <motion.div 
              className="absolute top-4 left-4 z-20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-medium
                           text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600
                           shadow-lg backdrop-blur-sm border border-white/20">
                {course.category}
              </span>
            </motion.div>

            {/* Course Duration */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2">
              <div className="flex items-center px-3 py-1.5 bg-black/50 rounded-full backdrop-blur-sm">
                <FaClock className="text-white/80 mr-2 text-sm" />
                <span className="text-white/90 text-sm">{course.duration}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 z-20 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg backdrop-blur-sm
                         text-indigo-600 hover:text-purple-600 transition-colors duration-300"
              >
                <FaBookmark className="text-lg" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg backdrop-blur-sm
                         text-red-500 hover:text-red-600 transition-colors duration-300"
              >
                <FaHeart className="text-lg" />
              </motion.button>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-8 relative">
            {/* Course Title */}
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 
                         group-hover:text-indigo-600 transition-colors duration-300">
              {course.title}
            </h4>

            {/* Course Stats */}
            <div className="flex items-center space-x-6 mb-6">
              {/* Rating */}
              <div className="flex items-center">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar 
                      key={index}
                      className={`text-lg ${index < Math.floor(course.rating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-400 font-medium">
                  {course.rating}
                </span>
              </div>

              {/* Student Count */}
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FaUsers className="text-indigo-600 mr-2" />
                <span className="font-medium">{course.students} students</span>
              </div>
            </div>

            {/* Course Preview */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                {course.description}
              </p>
            </div>

            {/* Course Features */}
            <div className="flex items-center gap-4 mb-6">
              {['Video Lessons', 'Assignments', '24/7 Support'].map((feature, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-full text-sm
                           text-indigo-600 dark:text-indigo-400 font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              {/* Price */}
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">Course Fee</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                               bg-clip-text text-transparent">
                  ${course.price}
                </span>
              </div>

              {/* Enroll Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl
                         font-medium shadow-lg shadow-indigo-600/20 hover:shadow-xl
                         hover:shadow-indigo-600/40 transition-all duration-300
                         flex items-center space-x-2"
              >
                <FaPlayCircle className="text-lg" />
                <span>Enroll Now</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
const ReviewsSection = ({ reviews }) => {
  const [selectedRating, setSelectedRating] = useState('all');
  
  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1);
  const ratingCounts = reviews.reduce((acc, rev) => {
    acc[rev.rating] = (acc[rev.rating] || 0) + 1;
    return acc;
  }, {});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Reviews Summary Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8
                 border border-white/20 backdrop-blur-lg relative overflow-hidden"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br 
                      from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr 
                      from-pink-600/10 to-purple-600/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Overall Rating */}
            <div className="text-center md:border-r dark:border-gray-700 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Overall Rating
              </h3>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                              bg-clip-text text-transparent">
                  {averageRating}
                </span>
                <div className="flex flex-col items-start">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`w-4 h-4 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {totalReviews} reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Rating Distribution
              </h3>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-4">
                  <span className="w-12 text-sm text-gray-600 dark:text-gray-400">
                    {rating} stars
                  </span>
                  <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((ratingCounts[rating] || 0) / totalReviews) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                    />
                  </div>
                  <span className="w-12 text-sm text-right text-gray-600 dark:text-gray-400">
                    {((ratingCounts[rating] || 0) / totalReviews * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        {['all', 5, 4, 3, 2, 1].map((rating) => (
          <motion.button
            key={rating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedRating(rating)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300
                     ${selectedRating === rating
                       ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/20'
                       : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                     }`}
          >
            {rating === 'all' ? 'All Reviews' : `${rating} Stars`}
          </motion.button>
        ))}
      </motion.div>

      {/* Reviews List */}
      <motion.div variants={itemVariants} className="space-y-6">
        {reviews
          .filter(review => selectedRating === 'all' || review.rating === selectedRating)
          .map((review, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8
                       border border-white/20 backdrop-blur-lg relative overflow-hidden"
            >
              {/* Review Card Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 
                           group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-500" />
              
              <div className="relative z-10">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {review.avatar ? (
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="w-12 h-12 rounded-full border-2 border-indigo-600"
                      />
                    ) : (
                      <FaUserCircle className="w-12 h-12 text-indigo-600" />
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {review.name}
                        </h4>
                        {review.verified && (
                          <FaUniversity className="text-blue-500" title="Verified Purchase" />
                        )}
                        {review.topReviewer && (
                          <FaAward className="text-yellow-500" title="Top Reviewer" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar
                        key={idx}
                        className={`w-5 h-5 ${idx < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-6">
                  <FaQuoteLeft className="text-2xl text-indigo-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {review.content}
                  </p>
                </div>

                {/* Review Media (if any) */}
                {review.media && (
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    {review.media.map((item, idx) => (
                      <motion.img
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        src={item}
                        alt={`Review media ${idx + 1}`}
                        className="rounded-xl w-full h-24 object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Review Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      <FaRegThumbsUp />
                      <span>{review.likes || 0}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      <FaRegComment />
                      <span>{review.comments || 0}</span>
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    <FaShare />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
      </>
    
  );
};



export default TeacherProfile;