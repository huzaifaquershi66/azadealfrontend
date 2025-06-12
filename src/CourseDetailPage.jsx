import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RiSearchLine,RiArrowRightLine, RiNotificationLine, RiCloseLine, RiMenuLine, RiChatSmileLine,RiChatQuoteLine} from "react-icons/ri";
import { FiClock, FiBook, FiAward, FiUser, FiUsers, FiBookmark, FiCheck, FiPlay, FiGlobe, FiStar, FiBarChart,FiCreditCard,FiDollarSign  } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import io from 'socket.io-client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';


const CourseDetailPage = () => {
  const { slug } = useParams();  // To get the course slug from the URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [socket, setSocket] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
 const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [user, setUser] = useState(null);


   const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [showSearch, setShowSearch] = useState(false);
        const [isScrolled, setIsScrolled] = useState(false);
        const [file, setFile] = useState(null);
        const [uploadProgress, setUploadProgress] = useState(0);
        const [isDragging, setIsDragging] = useState(false);
        const [previewUrl,setpreviewUrl] = useState(null)
        const fileInputRef = useRef(null);

        const fileIcons = {
          pdf: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18H17V16H7V18Z" fill="currentColor"/>
              <path d="M17 14H7V12H17V14Z" fill="currentColor"/>
              <path d="M7 10H11V8H7V10Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="currentColor"/>
            </svg>
          ),
          image: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7 7C5.34315 7 4 8.34315 4 10V16C4 17.6569 5.34315 19 7 19H17C18.6569 19 20 17.6569 20 16V10C20 8.34315 18.6569 7 17 7H7ZM2 10C2 7.23858 4.23858 5 7 5H17C19.7614 5 22 7.23858 22 10V16C22 18.7614 19.7614 21 17 21H7C4.23858 21 2 18.7614 2 16V10ZM15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929C15.3166 9.90237 14.6834 9.90237 14.2929 10.2929L12 12.5858L11.7071 12.2929C11.3166 11.9024 10.6834 11.9024 10.2929 12.2929L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L11 14.4142L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L15.7071 11.7071Z" fill="currentColor"/>
              <path d="M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10Z" fill="currentColor"/>
            </svg>
          ),
          doc: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18H17V16H7V18Z" fill="currentColor"/>
              <path d="M17 14H7V12H17V14Z" fill="currentColor"/>
              <path d="M7 10H11V8H7V10Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M4 4C4 2.89543 4.89543 2 6 2H14L20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM13 4L18 9H14C13.4477 9 13 8.55228 13 8V4ZM6 4V20H18V11H13C11.8954 11 11 10.1046 11 9V4H6Z" fill="currentColor"/>
            </svg>
          ),
          default: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM18 9H13V4H6V20H18V9ZM12 12H7V10H12V12ZM7 14H17V16H7V14ZM17 18H7V20H17V18Z" fill="currentColor"/>
            </svg>
          )
        };
      
        const getFileIcon = (fileType) => {
          if (fileType?.includes('pdf')) return fileIcons.pdf;
          if (fileType?.includes('image')) return fileIcons.image;
          if (fileType?.includes('word') || fileType?.includes('doc')) return fileIcons.doc;
          return fileIcons.default;
        };
      

        const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (file) {
            // File size validation (5MB)
            if (file.size > 5 * 1024 * 1024) {
              alert('File size should not exceed 5MB');
              return;
            }
            setSelectedFile(file);
      
            // Show file preview if it's an image
            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setpreviewUrl(e.target.result);
              };
              reader.readAsDataURL(file);
            } else {
              setpreviewUrl(null);
            }
          }
        };
        const handleDragOver = (e) => {
          e.preventDefault();
          setIsDragging(true);
        };
      
        const handleDragLeave = (e) => {
          e.preventDefault();
          setIsDragging(false);
        };
      
        const handleDrop = (e) => {
          e.preventDefault();
          setIsDragging(false);
          
          const files = Array.from(e.dataTransfer.files);
          if (files.length > 0) {
            const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
            if (files[0].size > MAX_FILE_SIZE) {
              alert('File size should not exceed 5MB');
              return;
            }
            setFile(files[0]);
          }
        };
      

       useEffect(() => {
          const handleScroll = () => setIsScrolled(window.scrollY > 20);
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }, []);
      
        const socketRef = useRef(null);
        const userId = localStorage.getItem("userId");
        
        useEffect(() => {
          if (!userId) {
            console.log("No userId found in localStorage");
            return;
          }
        
          const newSocket = io("https://casback-production.up.railway.app", { withCredentials: true });
          newSocket.emit("register", userId);
          socketRef.current = newSocket;
        
          newSocket.on("receiveMessage", (receivedMessage) => {
            setMessages((prev) => [...prev, receivedMessage]);
          });
        
          return () => {
            newSocket.disconnect();
          };
        }, [userId]);
        
   const handleSendMessage = async () => {
    if (!userId || (!message.trim() && !selectedFile)) return;

    const instructorId = "67c85b1d9db406a98506b498";
    let fileUrl = "";

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        setUploadProgress(0);
        const response = await fetch("https://casback-production.up.railway.app/users/file", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        fileUrl = data.fileUrl || "";
        setUploadProgress(100);
        
        // Wait a bit before resetting the progress
        setTimeout(() => {
          setUploadProgress(0);
        }, 500);
      } catch (error) {
        console.error("File upload failed:", error);
        setUploadProgress(0);
        return;
      }
    }

    const newMessage = {
      senderId: userId,
      receiverId: instructorId,
      message: message.trim(),
      fileUrl,
      fileName: selectedFile?.name,
      fileType: selectedFile?.type,
      timestamp: new Date().toISOString(),
    };

    socketRef.current?.emit("sendMessage", newMessage);
    setMessage('');
    setSelectedFile(null);
    setpreviewUrl(null);
  };

        
        
        const handleChatToggle = () => {
          setIsChatOpen(prev => !prev);
        };
        

    
        const handlePaymentClick = (method) => {
          const studentId = localStorage.getItem("user");

  const instructorId = "67c85b1d9db406a98506b498"; // Replace with dynamic id if needed

  fetch("https://casback-production.up.railway.app/users/enroll", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({  studentId, instructorId, paymentMethod: method }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message || "Enrolled!");
      // Redirect to payment instructions or thank you page
    })
    .catch(() => alert("Enrollment failed"));
};


  
  // Fetch course details based on slug
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://casback-production.up.railway.app/users/getsinglecourse/${slug}`);
        setCourse(response.data.course);
        console.log(response.data)
      } catch (err) {
        setError("Course not found or failed to load.");
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);  // Re-fetch when slug changes
  useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
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

  if (loading) {
    return <div>Loading...</div>;  // Show loading state while data is being fetched
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600 text-xl">{error}</div>;  // Show error message if fetching fails
  }

  if (!course) {
    return <div className="text-center mt-10 text-red-600 text-xl">Course not found!</div>;  // If course is not found
  }

  // Destructure course details
  const {
    title, instructor, price, type,
    description, thumbnail
    , contact,
    courseType,
  
// userId,
    courseDuration,

    instructorTitle="hamzaalihassan",
    instructorImage='http://res.cloudinary.com/duovmhekc/image/upload/v1741728230/muslrmcbyrsfum9p8mxn.png',

    totalLessons,
    level ,
    enrolledStudents ,
    language ,
    lastUpdated ,
    highlights = ["Lifetime Access", "Project Based Learning", "Live Support", "Certificate"],
    learningOutcomes = [
      "Master fundamental concepts",
      "Build real-world projects",
      "Learn industry best practices",
      "Get hands-on experience"
    ]
  } = course;

  const getTypeLabel = () => {
    switch (type) {
      case "video": return "Online Video Course";
      case "zoom": return "Live on Zoom";
      case "inperson": return "In-Person Attendance Required";
      default: return "Course";
    }
  };
  const getCourseTypeMessage = (type) => {
    const messages = {
      video: {
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        textColor: 'text-blue-600',
        icon: '🎥',
        title: 'Recorded Video Course',
        message: 'Access lifetime recorded content at your own pace'
      },
      online: {
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-600',
        icon: '💻',
        title: 'Live Online Course',
        message: 'Interactive live sessions via Zoom'
      },
      inperson: {
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-600',
        icon: '🏫',
        title: 'In-Person Course',
        message: 'Physical classroom learning experience'
      }
    };
    return messages[type?.toLowerCase()];
  };

  const courseTypeInfo = getCourseTypeMessage(courseType);
  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };
  return (
    <>
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
<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <motion.div 
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1 }} 
  className="relative min-h-[60vh] lg:h-[85vh] w-full overflow-hidden"
>
  {/* Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40 mix-blend-overlay z-10" />
  
  {/* Thumbnail Image with Optimized Sizing */}
  <img 
    src={thumbnail} 
    alt={title} 
    className="w-full h-full object-cover scale-100 sm:scale-105 transform transition-transform duration-[20s] animate-slow-zoom"
    style={{
      objectPosition: 'center 20%' // Adjust image focus point
    }}
  />
  
  {/* Content Overlay with Gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20">
    <div className="container mx-auto px-4 sm:px-6 h-full flex items-end pb-16 sm:pb-20 lg:pb-32">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-white space-y-6 sm:space-y-8"
      >
        <div className="space-y-4 sm:space-y-6">
          {/* Tags Container */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-shadow"
            >
              {courseType}
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-shadow"
            >
              {level}
            </motion.span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-300">
              {title}
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl leading-relaxed opacity-90">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-48  relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
            {/* Course Overview Cards */}
           <div className="container mx-auto px-4 sm:px-6">
  {/* Create spacing between hero and cards */}
  <div className="mt-40 sm:mt-24 md:mt-28">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {[
        { 
          icon: FiClock, 
          label: "Duration", 
          value: courseDuration, 
          color: "from-blue-400 to-blue-600" 
        },
        { 
          icon: FiBook, 
          label: "Lessons", 
          value: 1, 
          color: "from-purple-400 to-purple-600" 
        },
        { 
          icon: FiUsers, 
          label: "Students", 
          value: 0, 
          color: "from-pink-400 to-pink-600" 
        },
        { 
          icon: FiGlobe, 
          label: "Language", 
          value: language, 
          color: "from-indigo-400 to-indigo-600" 
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl overflow-hidden group cursor-pointer transform transition-all duration-300"
        >
          <div className={`p-6 sm:p-8 bg-gradient-to-br ${item.color}`}>
            <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-3 sm:mb-4" />
            <p className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider">
              {item.label}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-white mt-1">
              {item.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</div>

    {/* </div> */}

            {/* Instructor Section */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Meet Your Instructor
                </h2>
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    {instructorImage ? (
                      <img src={instructorImage} alt={instructor} className="w-32 h-32 rounded-2xl object-cover shadow-lg" />
                    ) : (
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                        <FiUser className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">{instructor}</h3>
                    <p className="text-lg text-gray-600 mt-1">{instructorTitle}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200"
                      >
                        <FiStar className="w-5 h-5 text-yellow-500" />
                        <span className="ml-2 font-semibold text-yellow-700">5</span>
                        <span className="ml-1 text-gray-600">(0+ reviews)</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center bg-blue-50 px-4 py-2 rounded-full border border-blue-200"
                      >
                        <FiUsers className="w-5 h-5 text-blue-500" />
                        <span className="ml-2 text-blue-700">0+ students</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Learning Outcomes */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  What You'll Learn
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {learningOutcomes.map((outcome, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-4 bg-white/80 p-6 rounded-2xl shadow-lg border border-gray-100"
                    >
                      <div className="bg-gradient-to-br from-green-400 to-blue-400 p-3 rounded-xl">
                        <FiCheck className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-gray-700 text-lg">{outcome}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Pricing Card */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl shadow-xl p-10 sticky top-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-50" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Course Price</span>
                  <div className="text-6xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    PKR {price}
                  </div>
                </div>

 <div className="space-y-4">
  {/* Start Learning Button with enhanced gradient and animation */}
  <motion.button
    whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
    whileTap={{ scale: 0.98 }}
    onClick={() => setShowPurchaseModal(true)}
    className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <FiPlay className="w-7 h-7 relative z-10" />
    <span className="relative z-10">Start Learning Now</span>
  </motion.button>

  {/* Enhanced Purchase Modal with better styling and animations */}
  {showPurchaseModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
      onClick={() => setShowPurchaseModal(false)}
    >
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          backdropFilter: 'blur(8px)',
        }} 
      />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Payment Method
            </h2>
            <motion.button 
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowPurchaseModal(false)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Easypaisa */}
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.location.href = `mailto:${contact}?subject=Easypaisa%20Payment%20Request&body=I%20would%20like%20to%20pay%20via%20Easypaisa.%20Please%20provide%20the%20account%20details.`;
              }}
              className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3" onClick={() => handlePaymentClick("Easypaisa")}>
                <div className="w-16 h-16 bg-white rounded-full p-3 shadow-md">
                  <img 
                    src="https://crystalpng.com/wp-content/uploads/2024/10/Easypaisa-logo.png" 
                    alt="Easypaisa" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <span className="text-white font-semibold text-lg">Easypaisa</span>
              </div>
            </motion.button>

            {/* JazzCash */}
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.location.href = `mailto:${contact}?subject=JazzCash%20Payment%20Request&body=I%20would%20like%20to%20pay%20via%20JazzCash.%20Please%20provide%20the%20account%20details.`;
              }}
              className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-full p-3 shadow-md">
                  <img 
                    src="https://crystalpng.com/wp-content/uploads/2024/12/new-Jazzcash-logo.png" 
                    alt="JazzCash" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <span className="text-white font-semibold text-lg">JazzCash</span>
              </div>
            </motion.button>

            {/* NayaPay */}
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.location.href = `mailto:${contact}?subject=NayaPay%20Payment%20Request&body=I%20would%20like%20to%20pay%20via%20NayaPay.%20Please%20provide%20the%20account%20details.`;
              }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-full p-3 shadow-md">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0WqWND19oxUmwaDPcI0DCVnWUpo_ryX4aw&s" 
                    alt="NayaPay" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <span className="text-white font-semibold text-lg">NayaPay</span>
              </div>
            </motion.button>

            {/* Bank Transfer */}
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.location.href = `mailto:${contact}?subject=Bank%20Transfer%20Request&body=I%20would%20like%20to%20pay%20via%20bank%20transfer.%20Please%20provide%20the%20account%20details.`;
              }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-full p-3 shadow-md flex items-center justify-center">
                  <FiDollarSign className="w-10 h-10 text-blue-600" />
                </div>
                <span className="text-white font-semibold text-lg">Bank Transfer</span>
              </div>
            </motion.button>
          </div>

          {/* Price and Cancel Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 text-lg">Course Price:</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PKR {price}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPurchaseModal(false)}
              className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 text-lg"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )}
</div>
                <div className="mt-10">
                  <h3 className="font-bold text-xl mb-6 text-gray-800">Course Includes:</h3>
                  <div className="space-y-5">
                    {highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-4 text-gray-700"
                      >
                        <div className="bg-gradient-to-r from-green-400 to-blue-400 p-2 rounded-xl">
                          <FiCheck className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mt-10 pt-8 border-t border-gray-100"
                >
     <div className="chat-window mt-4 border border-gray-300 p-4 rounded-lg max-w-xl mx-auto shadow-lg">
      {/* Messages section */}
      <div className="chat-messages max-h-80 overflow-y-auto p-2 space-y-3 bg-gray-100 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md ${
                msg.senderId === userId
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-300 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.message && <p className="break-words">{msg.message}</p>}

              {msg.fileUrl && (
  <div className="mt-2 rounded">
    {msg.fileType?.startsWith('image/') ? (
      <div className="bg-white rounded overflow-hidden">
        <img
          src={msg.fileUrl}
          alt={msg.fileName}
          className="max-w-full w-full h-auto object-contain rounded"
          style={{ maxHeight: '200px' }}
        />
      </div>
    ) : (
      <a
        href={msg.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 p-2 rounded bg-opacity-50 hover:bg-opacity-30 transition"
      >
        {getFileIcon(msg.fileType)}
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium">{msg.fileName}</p>
          <p className="text-xs opacity-75">
            {(msg.fileType || '').split('/')[1]?.toUpperCase()}
          </p>
        </div>
      </a>
    )}
  </div>
)}
<span className="text-xs opacity-75 mt-1 block">
  {new Date(msg.timestamp).toLocaleTimeString()}
</span>

            </div>
          </div>
        ))}
      </div>

      {/* File preview and input section */}
      <div className="mt-4">
        {selectedFile && (
          <div className="mb-2 p-2 bg-gray-100 rounded-lg">
            {selectedFile.type.startsWith('image/') && previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-[200px] w-auto mx-auto rounded"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setpreviewUrl(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                {getFileIcon(selectedFile.type)}
                <span className="ml-2 flex-1 truncate">{selectedFile.name}</span>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setpreviewUrl(null);
                  }}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )}

        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full border border-gray-300 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim() && !selectedFile}
            className={`px-4 py-2 rounded flex items-center ${
              (!message.trim() && !selectedFile)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>

        {uploadProgress > 0 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>


                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Extra Spacing at Bottom */}
      <div className="h-20"></div>
    </div>


    </>
  );
};

export default CourseDetailPage;
