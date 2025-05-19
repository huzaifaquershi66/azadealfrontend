import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { RiSearchLine, RiNotificationLine, RiCloseLine, RiMenuLine, RiChatSmileLine,RiChatQuoteLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaBookOpen, FaAward, FaRocket, FaChalkboardTeacher, FaQuoteLeft,FaLinkedin, FaRegClock, FaRegStar,FaCheckCircle,
         FaLaptopCode, FaCertificate, FaGlobe, FaUserGraduate, FaVideo, FaMedal,FaArrowRight,FaPlay, FaStar,FaClock,FaTrophy} from 'react-icons/fa';
import { gsap } from 'gsap';
import { BsArrowUpRight } from 'react-icons/bs';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import Typed from 'typed.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import CountUp from 'react-countup';

import {Tilt} from 'react-tilt';
import  about from "./assets/about.png"
import { BiBadgeCheck } from 'react-icons/bi';
import { BsLightning } from 'react-icons/bs';

import Particles from "react-tsparticles";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const heroRef = useRef(null);
  const typedRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
     const [user, setUser] = useState(null);
              useEffect(() => {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                  setUser(JSON.parse(storedUser));
                }
              }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);
  const { scrollYProgressw } = useScroll();
  const opacityw = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  
  const handleEnrollClick = () => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      company: "Google",
      course: "Advanced Web Development",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGg2wn02buaDMs8QQ8qua6iUdyV-N1pLQbVA&s",
      rating: 5,
      linkedIn: "https://linkedin.com/in/sarah-johnson",
      review: "This platform has completely transformed my learning experience. The interactive courses and expert guidance helped me land my dream job at Google. The practical projects and real-world applications were invaluable.",
      achievement: "Increased salary by 150%",
      completion: "2024"
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      company: "Microsoft",
      course: "Data Science Bootcamp",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGg2wn02buaDMs8QQ8qua6iUdyV-N1pLQbVA&s",
      rating: 5,
      linkedIn: "https://linkedin.com/in/michael-chen",
      review: "The depth of content and quality of instruction is unmatched. I went from knowing basic Python to implementing machine learning models in production. The career support was exceptional.",
      achievement: "Built AI solution used by 1M+ users",
      completion: "2024"
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Apple",
      course: "UI/UX Design Mastery",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGg2wn02buaDMs8QQ8qua6iUdyV-N1pLQbVA&s",
      rating: 5,
      linkedIn: "https://linkedin.com/in/emily-rodriguez",
      review: "The hands-on projects and mentor feedback helped me develop a strong portfolio. I learned current design tools and methodologies that are actually used in the industry.",
      achievement: "Won Designer of the Year Award",
      completion: "2023"
    },
    // Add more testimonials as needed
  ];
  const features = [
    {
      icon: FaLaptopCode,
      title: "Interactive Learning",
      description: "Engage with real-time coding exercises and interactive simulations. Practice with hands-on projects and get instant feedback on your progress.",
      stats: "1000+ Exercises",
      color: "blue"
    },
    {
      icon: FaVideo,
      title: "HD Video Courses",
      description: "Access premium quality video content with expert instruction. Learn at your own pace with our carefully curated HD video lectures.",
      stats: "500+ Hours",
      color: "purple"
    },
    {
      icon: FaUserGraduate,
      title: "Personal Mentoring",
      description: "Get one-on-one guidance from industry experts. Schedule personalized sessions to accelerate your learning journey.",
      stats: "50+ Mentors",
      color: "green"
    },
    {
      icon: FaCertificate,
      title: "Certified Programs",
      description: "Earn industry-recognized certificates upon completion. Showcase your skills with verified credentials.",
      stats: "20+ Certificates",
      color: "yellow"
    },
    {
      icon: FaGlobe,
      title: "Global Community",
      description: "Connect with learners worldwide. Participate in forums, discussions, and collaborative projects.",
      stats: "100K+ Members",
      color: "pink"
    },
    {
      icon: FaRocket,
      title: "Career Support",
      description: "Get comprehensive career guidance and job placement assistance. Access exclusive job opportunities.",
      stats: "90% Placement",
      color: "orange"
    }
  ];
  const stats = [
    { 
      icon: FaUsers, 
      count: 100000, 
      label: "Active Users",
      description: "Engaged learners worldwide",
      increment: "Monthly",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: FaBookOpen, 
      count: 5000, 
      label: "Premium Courses",
      description: "Expert-curated content",
      increment: "Quarterly",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: FaMedal, 
      count: 15000, 
      label: "Certificates Awarded",
      description: "Industry-recognized achievements",
      increment: "Yearly",
      color: "from-amber-500 to-orange-500"
    },
    { 
      icon: FaGlobe, 
      count: 120, 
      label: "Countries Reached",
      description: "Global learning community",
      increment: "Total",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: FaStar, 
      count: 50000, 
      label: "5-Star Reviews",
      description: "Student satisfaction",
      increment: "All-time",
      color: "from-yellow-500 to-amber-500"
    },
    { 
      icon: FaChalkboardTeacher, 
      count: 1000, 
      label: "Expert Instructors",
      description: "Industry professionals",
      increment: "Active",
      color: "from-rose-500 to-red-500"
    },
    { 
      icon: FaClock, 
      count: 25000, 
      label: "Learning Hours",
      description: "Quality content delivered",
      increment: "Monthly",
      color: "from-indigo-500 to-violet-500"
    },
    { 
      icon: FaTrophy, 
      count: 200, 
      label: "Industry Partners",
      description: "Corporate collaborations",
      increment: "Growing",
      color: "from-teal-500 to-cyan-500"
    }
  ];
  useEffect(() => {
    // Typed.js Animation
    const typed = new Typed(typedRef.current, {
      strings: [
        'Future of Education',
        'World of Knowledge',
        'Path to Success',
        'Learning Revolution'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true
    });

    // GSAP Animations
    const tl = gsap.timeline();
    tl.from('.hero-content', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    });

    return () => typed.destroy();
  }, []);
  const featuresw = [
    {
      icon: FaRocket,
      text: "Start Learning Instantly"
    },
    {
      icon: FaGraduationCap,
      text: "Expert-Led Courses"
    },
    {
      icon: FaCertificate,
      text: "Certified Programs"
    },
    {
      icon: FaRegClock,
      text: "Lifetime Access"
    }
  ];

  return (
    <div className="w-full overflow-hidden">
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
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          params={{
            particles: {
              number: { value: 80 },
              size: { value: 3 },
              color: { value: '#4F46E5' },
              line_linked: {
                color: '#4F46E5',
                opacity: 0.2
              }
            }
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image Layer */}
  <div className="absolute inset-0">
    <img 
      src="https://media.istockphoto.com/id/1406888053/photo/a-group-of-cheerful-people-at-graduation-holding-diplomas-or-certificates-up-together-and.jpg?s=612x612&w=0&k=20&c=8LRkx77cpb1clqj2tHqOY--uO8Mj6DB8Qd1Y3RdDRyQ="
      alt="Education Background"
      className="object-cover w-full h-full opacity-50"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-indigo-900/95 to-purple-900/95" />
  </div>

  {/* Main Content */}
  <div className="relative z-20 container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div className="text-left space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-medium text-blue-400 tracking-wide">
            Welcome to the Future of Learning
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Discover the
            </span>
            <br />
            <span className="text-white mt-2 block">
              <span ref={typedRef}></span>
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Join our platform to access world-class courses, expert instructors, and a 
            supportive learning community. Transform your future today.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-lg font-semibold hover:shadow-2xl transition-all duration-300">
            <span className="relative z-10 flex items-center text-white">
              Get Started Now
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button className="group px-8 py-4 bg-white/10 backdrop-blur-lg rounded-lg text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300 flex items-center">
            <FaPlay className="mr-2" />
            Watch Demo
          </button>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-8 pt-8"
        >
          {[
            { number: "50K+", label: "Active Students" },
            { number: "200+", label: "Expert Instructors" },
            { number: "1000+", label: "Premium Courses" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Content - Featured Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:block"
      >
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={'https://png.pngtree.com/thumb_back/fh260/background/20231002/pngtree-symbolic-representation-of-academic-achievement-3d-render-depicting-a-black-mortarboard-image_13554732.png'}
              alt="Educational Platform Interface"
              className="w-full rounded-2xl"
            />
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-lg rounded-lg p-4 animate-float">
              <FaGraduationCap className="text-3xl text-white" />
            </div>
            <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-lg rounded-lg p-4 animate-float-delay">
              <FaLaptopCode className="text-3xl text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>

  {/* Animated Floating Icons */}
  <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
    {[FaGraduationCap, FaLaptopCode, FaCertificate, FaVideo].map((Icon, index) => (
      <motion.div
        key={index}
        className="absolute text-white/10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          x: ['0%', '100%'],
          y: ['0%', '100%'],
        }}
        transition={{
          duration: Math.random() * 10 + 15,
          repeat: Infinity,
          delay: index * 2,
        }}
        style={{
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 80 + 10}%`,
          fontSize: `${Math.random() * 30 + 20}px`,
        }}
      >
        <Icon />
      </motion.div>
    ))}
  </div>
</div>

      {/* Innovative Features Section */}
      <section className="py-32 relative bg-gradient-to-b from-gray-900 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/30 via-teal-500/30 to-cyan-500/30 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 rounded-full bg-blue-500/10 text-blue-400 font-semibold text-lg mb-6 border border-blue-500/20 backdrop-blur-sm"
          >
            REVOLUTIONARY FEATURES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Unlock Your Full{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Potential
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gray-300 text-xl max-w-2xl mx-auto"
          >
            Experience cutting-edge learning technology designed to accelerate your growth
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              scale={1.02}
              className="h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
              >
                {/* Gradient Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Feature Icon */}
                <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5`}>
                  <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Feature Content */}
                <h3 className="text-2xl font-bold text-white mt-6 mb-4 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                  <BsArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 -translate-y-1" />
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature Stats */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.gradient} text-white text-sm font-semibold`}>
                  {feature.stats}
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>

      {/* Statistics Section with 3D Cards */}
   
      {/* Testimonials Carousel */}
      <section className="py-32 relative bg-[#0A0A1F] overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-25"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-white font-semibold text-lg border border-blue-500/20 hover:border-purple-500/30 shadow-lg shadow-blue-500/5 hover:shadow-purple-500/10 transition-all duration-300">
              <BsLightning className="text-yellow-400" />
              ACHIEVEMENTS & MILESTONES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mt-8 mb-6"
          >
            <span className="text-white">Our Journey of </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Excellence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed"
          >
            Transforming dreams into reality through innovation and dedication
          </motion.p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-${stat.shadowColor}-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-${stat.shadowColor}-500/10`}>
                {/* Enhanced Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Enhanced Content Container */}
                <div className="relative z-10">
                  {/* Enhanced Icon */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.iconGradient} p-0.5 group-hover:scale-110 transition-transform duration-500`}>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl"></div>
                    <div className="relative w-full h-full rounded-xl bg-[#0A0A1F]/50 flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Enhanced Counter */}
                  <div className="mt-6 mb-2">
                    <div className="text-4xl font-bold text-white flex items-end gap-2">
                      <CountUp
                        end={stat.count}
                        duration={2.5}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                        className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                      />
                      <span className="text-xl text-white/60">+</span>
                    </div>
                  </div>

                  {/* Enhanced Label & Description */}
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                    {stat.label}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {stat.description}
                  </p>

                  {/* Enhanced Badge */}
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${stat.gradient} bg-opacity-10 text-white text-sm font-medium border border-white/10 group-hover:border-white/20`}>
                    <FaStar className="w-4 h-4" />
                    {stat.increment}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
      {/* Call to Action */}
      <section className="relative py-32 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.1]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_100%)]"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center">
            {/* Floating Offer Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="mb-12"
            >
              <span className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-md border border-purple-500/30 text-purple-200 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <FaRegStar className="text-yellow-400 text-xl group-hover:rotate-180 transition-transform duration-700" />
                <span className="group-hover:scale-105 transition-transform duration-300">
                  Special Launch Offer - Save 30% Today
                </span>
              </span>
            </motion.div>

            {/* Animated Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight"
            >
              <span className="text-white">Transform Your</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient">
                Future Today
              </span>
            </motion.h1>

            {/* Enhanced Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto font-medium"
            >
              Join our community of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-bold">
                100,000+ learners
              </span>{' '}
              and unlock your potential with our cutting-edge platform.
            </motion.p>

            {/* Interactive Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {/* {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="p-8 rounded-3xl bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-500/40 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{feature.text}</h3>
                  <p className="text-purple-200/80 text-sm">{feature.subText}</p>
                </motion.div>
              ))} */}
            </motion.div>

            {/* Enhanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-8 justify-center items-center mb-20"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white rounded-2xl text-xl font-bold shadow-lg hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Learning Now
                  <FaGraduationCap className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_100%)]"></div>
              </motion.button>

              <a
                href="#learn-more"
                className="flex items-center gap-3 text-purple-200 text-lg font-medium hover:text-purple-400 transition-colors duration-300 group"
              >
                Explore Courses
                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </motion.div>

            {/* Trust Badges with Hover Effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-6"
            >
              {[
                { icon: FaCheckCircle, text: "100K+ Active Students" },
                { icon: FaCheckCircle, text: "4.9/5 Average Rating" },
                { icon: FaCheckCircle, text: "30-Day Money Back" }
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="px-6 py-3 rounded-xl bg-purple-500/10 backdrop-blur-lg border border-purple-500/20 text-purple-200 text-sm font-medium flex items-center gap-3 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <badge.icon className="text-purple-400" />
                  {badge.text}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
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

export default AboutUs;