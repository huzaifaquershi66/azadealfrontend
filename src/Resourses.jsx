import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Play,ChevronRight,Users, Sparkles,Quote,BookOpen, Brain, Heart, } from 'lucide-react';
import { RiSearchLine, RiNotificationLine, RiCloseLine, RiMenuLine, RiChatSmileLine,RiChatQuoteLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


import { 
  FiBook, 
  FiMonitor, 
  FiTrendingUp, 
  FiHome, 
  FiClock,
  FiPlay,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiAward,
  FiUsers,
  FiTarget,
  FiHeart
} from 'react-icons/fi';

const ParentResourcesPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [showSearch, setShowSearch] = useState(false);
        const navigate = useNavigate();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
 useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const parentResources = [
    {
      title: "Interactive Learning Modules",
      category: "Educational Content",
      description: "Engaging modules designed to make learning fun and effective for children of all ages",
      rating: "4.9",
      icon: BookOpen,
      image: "https://www.commonsense.org/sites/default/files/jpg/2020-12/2020-bts-parent-tips-800x450_1.jpg",
      features: ["Age-appropriate content", "Progress tracking", "Interactive quizzes"]
    },
    {
      title: "Expert-Led Video Classes",
      category: "Live Learning",
      description: "Live and recorded sessions by top educators covering various subjects and topics",
      rating: "4.8",
      icon: Users,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkEhfwN3Ii5y-cVQsR26c5pfbnVsywItRGg&s",
      features: ["Live interaction", "Recorded sessions", "Expert Q&A"]
    },
    {
      title: "Cognitive Development Games",
      category: "Brain Training",
      description: "Scientifically designed games that enhance memory, focus, and problem-solving skills",
      rating: "4.9",
      icon: Brain,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ07GFkSRIwqM2aHsmvUahDKwU4RR4j81AEGg&s",
      features: ["Adaptive difficulty", "Skill assessment", "Real-time feedback"]
    }
  ];
  
  const features = [
    {
      icon: FiAward,
      title: "Expert-Led Content",
      description: "Curated by leading education specialists",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: FiTarget,
      title: "Personalized Learning",
      description: "Tailored to your child's unique needs",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FiUsers,
      title: "Community Support",
      description: "Connect with other parents",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FiHeart,
      title: "Holistic Development",
      description: "Focus on overall growth",
      color: "from-pink-500 to-rose-500"
    }
  ];
  const orbs = [...Array(5)].map((_, i) => ({
    size: 200 + Math.random() * 200,
    duration: 15 + Math.random() * 15
  }));

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
      {/* Hero Section - Enhanced with 3D elements and particles */}
      <div className="relative h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{
                y: [0, window.innerHeight],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-[url(https://www.teachhub.com/wp-content/uploads/2020/09/Sept-2-The-Value-of-Parents-Helping-with-Homework_web.jpg)] opacity-20 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/80 to-blue-900/95"></div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
        {/* <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6"> */}
      <div className="max-w-4xl">
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Trust Badge */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                       text-blue-200 px-6 py-3 rounded-full text-sm backdrop-blur-md 
                       border border-white/10 hover:border-white/20 transition-all"
          >
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="font-medium">Trusted by 10,000+ Parents Worldwide</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Empower Your
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                             bg-clip-text text-transparent animate-gradient">
                Child's Future
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100/90 max-w-2xl leading-relaxed"
          >
            Access world-class educational resources and expert guidance to nurture 
            your child's potential and unlock their brightest future.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6 pt-4"
          >
            {/* Primary CTA */}
            {/* <button className="group relative px-8 py-4 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all 
                            duration-300 group-hover:scale-105" />
              {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity 
                            duration-300 bg-gradient-to-r from-purple-600 to-blue-600" />
              {/* <div className="relative flex items-center gap-2">
                <span className="font-semibold text-white">Get Started Free</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </div> */}
            {/* </button>   */}

            {/* Secondary CTA */}
            {/* <button className="group px-8 py-[-30px] rounded-xl bg-white/5 border border-white/10 
                             hover:bg-white/10 hover:border-white/20 backdrop-blur-lg transition-all duration-300">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">Watch Demo Video</span>
              </div>
            </button> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
        {/* </div> */}

        {/* Enhanced Floating Stats */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/10"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Happy Parents", icon: FiHeart },
                { value: "500+", label: "Expert Resources", icon: FiBook },
                { value: "24/7", label: "Support Available", icon: FiUsers },
                { value: "4.9", label: "Parent Rating", icon: FiStar }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300"
                  >
                    <stat.icon className="text-2xl text-blue-300" />
                  </motion.div>
                  <div className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-blue-200 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Grid - Enhanced with 3D cards */}
      <div className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-2 rounded-full mb-6"
          >
            <span className="text-sm font-semibold">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Unlock Your Child's
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Full Potential
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover comprehensive resources designed to support every aspect of your 
            child's educational journey and foster their growth
          </p>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card Background with enhanced depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-2xl 
                            transform group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300"></div>
              
              {/* Main Card Content */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                            transition-all duration-300 border border-gray-100/80 backdrop-blur-sm">
                {/* Icon Container with enhanced animation */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl 
                             bg-gradient-to-r ${feature.color} mb-6 transform transition-all duration-300
                             shadow-lg group-hover:shadow-xl`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title with gradient hover effect */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r 
                             group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text 
                             group-hover:text-transparent transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Interactive Learn More Link */}
                <motion.a
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg 
                       transition-all duration-300"
          >
            Start Your Journey
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
      {/* Resource Cards - Enhanced with 3D hover effects */}
      <div className="py-32 bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-600 px-6 py-2 rounded-full text-sm mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Premium Resources</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-900">Premium Learning</span>
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resources
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Curated content designed to support every stage of your child's development journey
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parentResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 
                            transform hover:-translate-y-2 border border-gray-100">
                {/* Card Header with Image */}
                <div className="relative h-64">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                          {resource.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-medium">{resource.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                          <resource.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {resource.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {resource.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl 
                                font-semibold flex items-center justify-center gap-2 group"
                    >
                      Explore Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 
                                hover:bg-gray-200 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg 
                       transition-all duration-300"
          >
            View All Resources
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>

      {/* Enhanced CTA Section */}
      {/* Enhanced CTA Section */}
      <div className="relative py-32 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-overlay"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle at center, ${
                i % 2 === 0 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(139, 92, 246, 0.3)'
              }, transparent)`
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/50 to-blue-950/80"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Enhanced Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 
                       text-blue-300 px-6 py-3 rounded-full text-sm mb-8 hover:bg-white/20 transition-all cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span className="font-medium">Join 10,000+ Happy Parents</span>
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>

          {/* Enhanced Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="text-white">Start Your Child's</span>
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learning Journey Today
            </span>
          </h2>

          <p className="text-xl text-blue-100/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of parents who are transforming their children's educational 
            experience with our expert-guided resources and personalized learning paths.
          </p>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-8 py-4 rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                            bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <div className="relative flex items-center gap-2 text-white font-semibold">
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg 
                         hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-white font-semibold">
                <Play className="w-5 h-5" />
                Watch Demo
              </div>
            </motion.button>
          </div>

          {/* Enhanced Testimonial Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Decorative elements */}
            <div className="absolute -left-4 -top-4 w-8 h-8 text-blue-300 opacity-50">
              <Quote className="w-full h-full" />
            </div>
            <div className="absolute -right-4 -bottom-4 w-8 h-8 text-blue-300 opacity-50 transform rotate-180">
              <Quote className="w-full h-full" />
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 
                          hover:bg-white/[0.15] transition-all duration-300">
              <div className="flex items-center gap-6 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 
                             flex items-center justify-center text-white text-2xl font-bold ring-4 ring-white/20"
                >
                  S
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Sarah Thompson</h4>
                  <div className="flex items-center gap-2 text-blue-200">
                    <span>Parent of two</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-lg text-blue-100 italic leading-relaxed">
                "This platform has transformed how I support my children's education. 
                The resources are exceptional, and the expert guidance has been invaluable. 
                I've seen remarkable improvement in their engagement and results."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">ParentEdu</h3>
              <p className="text-gray-400 mb-6">
                Empowering parents to guide their children's educational journey with confidence.
              </p>
              <div className="flex gap-4">
                {/* Social Media Icons */}
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  {/* Add social media icons */}
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {['About Us', 'Resources', 'Blog', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Resources</h4>
              <ul className="space-y-4">
                {['Learning Guides', 'Video Tutorials', 'Assessment Tools', 'Community'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Stay updated with the latest educational resources and tips.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ParentEdu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ParentResourcesPage;