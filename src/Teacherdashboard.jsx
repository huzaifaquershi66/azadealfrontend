import React, { useState, useEffect ,useRef} from 'react';
import axios from "axios"; // Upar import kar lena
import { io } from 'socket.io-client';
import {Link} from "react-router-dom"
import JitsiMeeting from "./Jistsimeet.jsx"
import dayjs from 'dayjs';
import { FaRegCalendarAlt,FaUserCog,FaDesktop,FaKey, FaEdit,  FaCog,FaCheck,FaSmile,FaPaperclip, FaPaperPlane, FaVideo, FaTimes,FaClock, FaCheckCircle, FaRegClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';


import { 
  FiUsers, 
  FiBookOpen, 
  FiCreditCard ,
  FiTrendingUp, 
  FiDollarSign,
  FiMenu,
  FiBell,
  FiSun,
  FiMoon,
  FiSettings,
  FiMonitor,
  FiFileText,
  FiClipboard,
  FiPhoneOff,
  FiCalendar,
  FiVideo,
  FiMessageCircle,
  FiMic,
  FiX,
  FiUserMinus,
  FiShare2,
  FiLogOut,
  FiPlay,
  FiDownload,
  FiUserPlus,
  FiUserCheck ,
  FiAward,
  FiBook,
  FiBarChart2,
  FiPlus,
  FiFilter,
  FiMoreVertical,
  FiSearch ,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiEye ,
  FiTrash2 ,
  FiChevronDown,
  FiCode,
  FiClock,
  FiMessageSquare,
  FiActivity,
  FiStar
} from 'react-icons/fi';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaBell,
  FaPalette,
  FaLanguage,
  FaGlobe,
  FaGraduationCap,
 
  FaLock,
  FaEye,
  FaGoogle,
  FaMicrosoft,
  FaCalendar,
  FaSave,
  FaMoon,
  FaSun,
  FaFont,
  FaPercent,
  FaShieldAlt,
  FaSync,
  
} from 'react-icons/fa';

import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const categories = [
  {
    group: "Academic Courses",
    options: [
      { value: "matric_inter", label: "Matric & Intermediate" },
      { value: "o_a_level", label: "O-Level & A-Level" },
      { value: "engineering_entrance", label: "Engineering Entrance Exams" },
      { value: "medical_entrance", label: "Medical Entrance Exams" },
      { value: "css_fpsc", label: "CSS & FPSC Preparation" },
      { value: "bachelors_masters", label: "Bachelors & Masters" },
    ],
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
      { value: "data_science_ai", label: "Data Science & AI" },
    ],
  },
  {
    group: "Language & Communication",
    options: [
      { value: "english", label: "English Language" },
      { value: "urdu_pashto", label: "Urdu & Pashto Writing" },
      { value: "foreign_languages", label: "Foreign Languages" },
    ],
  },
  {
    group: "Government & Competitive",
    options: [
      { value: "govt_exams", label: "Government Exams" },
      { value: "military_test", label: "Military Test Prep" },
      { value: "police_agencies", label: "Police & Agencies Prep" },
      { value: "university_tests", label: "University Entry Tests" },
    ],
  },
  {
    group: "Business & Finance",
    options: [
      { value: "accounting_finance", label: "Accounting & Finance" },
      { value: "stock_crypto", label: "Stock & Crypto Trading" },
      { value: "entrepreneurship", label: "Entrepreneurship" },
    ],
  },
  {
    group: "Personal Development",
    options: [
      { value: "time_management", label: "Time Management" },
      { value: "public_speaking", label: "Public Speaking" },
      { value: "leadership", label: "Leadership" },
      { value: "career_counseling", label: "Career Counseling" },
    ],
  },
  {
    group: "Islamic & Religious",
    options: [
      { value: "quran_tajweed", label: "Quran & Tajweed" },
      { value: "hadith_fiqh", label: "Hadith & Fiqh" },
      { value: "islamic_finance", label: "Islamic Finance" },
    ],
  },
];

const TeacherDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(""); // For preview
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [students, setStudents] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);  // To hold the socket reference
  const studentsRef = useRef(students);
  const [studentss, setStudentss] = useState([]);
  // const [loading, setLoading] = useState(true);
    const [inputTime, setInputTime] = useState('');
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('Machine Learning');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeMeetings, setActiveMeetings] = useState([]);
const [isCustomTime, setIsCustomTime] = useState(false);
const [customHour, setCustomHour] = useState('');
const [customMinute, setCustomMinute] = useState('');
const [customPeriod, setCustomPeriod] = useState('AM');
const [showWithdrawModal, setShowWithdrawModal] = useState(false);
const [processingTime, setProcessingTime] = useState('2_days');
  const [messagess, setMessagess] = useState([]);
  const [newMessages, setNewMessages] = useState('');
  const [activeTab, setActiveTab] = useState('profile')
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRefs = useRef(null);
  const currentUser = "Usman Wazir";
  const currentDateTime = "2025-06-16 18:59:04";
 const [formDatai, setFormDatai] = useState({
    fullName: '',
    email: '',
    phone: '',
    emailNotifications: true,
    inAppNotifications: true,
    studentSubmissions: 'immediate',
    messageAlerts: 'immediate',
    darkMode: false,
    fontSize: 'medium',
    language: 'english',
    timezone: 'UTC',
    gradeScale: 'percentage',
    lateSubmissionPolicy: 'accept',
    latePenalty: 10,
    twoFactor: false,
    profileVisibility: 'public',
    password: '',
    googleClassroom: false,
    msTeams: false,
    calendarSync: false,
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChangei = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmiti = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call would go here
      console.log('Form data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Settings updated successfully!');
    } catch (error) {
      alert('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  //////  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagess]);

  const handleSubmito = async (e) => {
    e.preventDefault();
    if (!newMessages.trim()) return;

    // Add user message
    const userMessages = {
      id: Date.now(),
      text: newMessages,
      timestamp: new Date().toISOString(),
    };

    setMessagess(prev => [...prev, userMessages]);
    setNewMessages('');
    setIsTyping(true);

    // Simulate admin response
    setTimeout(() => {
      const adminResponse = {
        id: Date.now() + 1,
        text: 'Your message has been forwarded to admin. We will reply soon.',
        timestamp: new Date().toISOString(),
        isSystemMessage: true
      };
      setMessagess(prev => [...prev, adminResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleFileUploado = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileMessage = {
        id: Date.now(),
        text: `File attached: ${file.name}`,
        timestamp: new Date().toISOString(),
        file: {
          name: file.name,
          type: file.type
        }
      };
      setMessagess(prev => [...prev, fileMessage]);
    }
  };
const handleWithdrawSubmit = (e) => {
  e.preventDefault();
  // Handle the withdrawal request submission here
  setShowWithdrawModal(false);
};
// Calculate total revenue
const totalEarnings = studentss.reduce((acc, curr) => acc + (curr.coursePrice || 0), 0);

   const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const changeMonth = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  // Generate time slots from 9 AM to 9 PM
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 9;
    return {
      value: `${hour.toString().padStart(2, '0')}:00`,
      label: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`
    };
  });

  useEffect(() => {
    const stored = localStorage.getItem('scheduledMeetings');
    if (stored) {
      setScheduledMeetings(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('scheduledMeetings', JSON.stringify(scheduledMeetings));
  }, [scheduledMeetings]);

  const handleDateSelect = (day) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    setSelectedDate(newDate);
    setShowCalendar(false);
    handleDateTimeSelect(newDate);
  };

  const handleDateTimeSelect = (date = selectedDate) => {
    if (!date || !selectedTime) return;
    
    const dateTime = dayjs(date)
      .hour(parseInt(selectedTime.split(':')[0]))
      .minute(parseInt(selectedTime.split(':')[1] || 0))
      .format('YYYY-MM-DDTHH:mm');
    
    setInputTime(dateTime);
  };

  const handleSchedule = () => {
    if (!inputTime) return;
    const newMeeting = {
      time: inputTime,
      course: selectedCourse,
      started: false,
    };
    setScheduledMeetings([...scheduledMeetings, newMeeting]);
    setInputTime('');
    setSelectedDate(new Date());
    setSelectedTime('');
  };
  useEffect(() => {
  const interval = setInterval(() => {
    const now = dayjs();
    
    setScheduledMeetings((prevMeetings) =>
      prevMeetings.map((meeting) => {
        const meetingTime = dayjs(meeting.time);
        // Check if the meeting should be active (within the scheduled time)
        const shouldBeActive = meetingTime.isSame(now, 'minute') || 
          (meetingTime.isBefore(now) && meetingTime.add(1, 'hour').isAfter(now));

        if (shouldBeActive && !meeting.started) {
          // Meeting should start
          return { ...meeting, started: true };
        } else if (!shouldBeActive && meeting.started) {
          // Meeting should end
          return { ...meeting, started: false };
        }
        return meeting;
      })
    );

    // Update active meetings
    setActiveMeetings(scheduledMeetings.filter(meeting => {
      const meetingTime = dayjs(meeting.time);
      return meetingTime.isSame(now, 'minute') || 
        (meetingTime.isBefore(now) && meetingTime.add(1, 'hour').isAfter(now));
    }));

  }, 30000); // Check every 30 seconds

  return () => clearInterval(interval);
}, [scheduledMeetings]);
const handleEndMeeting = (meetingIndex) => {
  setScheduledMeetings((prevMeetings) =>
    prevMeetings.map((meeting, index) => {
      if (index === meetingIndex) {
        return { ...meeting, started: false, endedManually: true };
      }
      return meeting;
    })
  );
};
const handleCustomTimeSelect = () => {
  if (!customHour || !customMinute) return;
  
  let hour = parseInt(customHour);
  if (customPeriod === 'PM' && hour !== 12) {
    hour += 12;
  } else if (customPeriod === 'AM' && hour === 12) {
    hour = 0;
  }
  
  const timeString = `${hour.toString().padStart(2, '0')}:${customMinute}`;
  setSelectedTime(timeString);
  handleDateTimeSelect();
  setIsCustomTime(false); // Close custom time selector after selection
};
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    price: "",
    level: "",
    language: "",
    whatYouWillLearn: "",
    requirements: "",
    courseType: "", // Video, Online, InPerson
    videoFile: null,
    classTime: "",
    classDaysPerWeek: "",
    courseDuration: "",
    inPersonDetails: "",
    userId:""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Stored userId from localStorage:", storedUserId);
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userId: storedUserId }));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
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
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.onerror = () => {
          console.error('Error reading file');
          setPreviewUrl(null);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file)); // Set preview image
      // Save file locally to upload later with form submission
      setFormData((prevData) => ({
        ...prevData,
        thumbnail: file, // Store the file object for later upload
      }));
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ⛔ Don't rely on formData.userId
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("User ID not found! Please log in first.");
      return;
    }
  
    const formDataToSubmit = new FormData();
  
    // Append all fields except thumbnail and userId
    for (const key in formData) {
      if (key !== "thumbnail" && key !== "userId") {
        formDataToSubmit.append(key, formData[key]);
      }
    }
  
    // Append thumbnail
    if (formData.thumbnail) {
      formDataToSubmit.append("thumbnail", formData.thumbnail);
    }
  
    // ✅ Append userId directly from localStorage
    formDataToSubmit.append("userId", storedUserId);
  
    try {
      const response = await axios.post(
        "https://casback-production.up.railway.app/users/createcourse",
        formDataToSubmit,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Course created:", response.data.course);
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data?.message || error.message);
      alert("Failed to create course: " + (error.response?.data?.message || "Unknown error"));
    }
  };
  
 useEffect(() => {
    const instructorId = "67c85b1d9db406a98506b498"; // Replace with dynamic id if needed

    const fetchEnrollments = async () => {
      try {
        const response = await axios.get("https://casback-production.up.railway.app/users/enrollments",{params: { instructorId },
});
        setStudentss(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
  
    // Fetch all approved users
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://casback-production.up.railway.app/users/getallapproved');
        const data = await res.json();
        console.log("Fetched students:", data);
  
        if (Array.isArray(data.data)) {
          setStudents(data.data);
          studentsRef.current = data.data;
        } else {
          console.error("Fetched data is not an array", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  
    // Initialize socket connection if not already created
    if (!socketRef.current) {
      const newSocket = io('https://casback-production.up.railway.app', {
        withCredentials: true,
      });
  
      socketRef.current = newSocket;
  
      // 🔐 Register user with backend
      newSocket.emit('register', userId);
  
      // 📩 Handle incoming message
      const handleMessage = (message) => {
        const isFromCurrent = selectedStudentId === message.senderId;
  
        if (!isFromCurrent) {
          setUnreadMessages((prev) => ({
            ...prev,
            [message.senderId]: (prev[message.senderId] || 0) + 1,
          }));
        }
  
        setMessages((prev) => [...prev, message]);
      };
  
      newSocket.on('receiveMessage', handleMessage);
  
      // Cleanup on unmount
      return () => {
        newSocket.off('receiveMessage', handleMessage);
        newSocket.close();
        socketRef.current = null;
      };
    }
  
    return () => {
      socketRef.current?.off('receiveMessage');
    };
  }, [selectedStudentId]);
  
  // Handle student selection and reset unread messages count
  const handleSelectStudent = (id) => {
    setSelectedStudentId(id);
    setUnreadMessages((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };

  // Function to send message
  const sendMessage = async () => {
    if ((!newMessage.trim() && !selectedFile) || !selectedStudentId || !socketRef.current) return;
  
    let fileUrl = '';
    let fileName = '';
    let fileType = '';
  
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
        fileName = selectedFile.name;
        fileType = selectedFile.type;
        setUploadProgress(100);
        
        setTimeout(() => {
          setUploadProgress(0);
        }, 500);
      } catch (error) {
        console.error("File upload failed:", error);
        setUploadProgress(0);
        return;
      }
    }
  
    const messageObj = {
      senderId: localStorage.getItem('userId'),
      receiverId: selectedStudentId,
      message: newMessage.trim(),
      fileUrl,
      fileName,
      fileType,
      timestamp: new Date().toISOString(),
    };
  
    socketRef.current.emit('sendMessage', messageObj);
    setNewMessage('');
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalViews: 0,

    recentActivities: [
      { id: 1, student: "hamzaalihassan", action: "Enrolled", course: "Machine Learning Course", time: "2 days ago" },

    ],
    topCourses: [
      { id: 1, name: "Machine Learning", students: 1, progress: 1, revenue: 10000 },
     
    ]
  });

  // Chart Data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [15000, 18000, 21000, 19000, 25000, 28000],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const studentsData = {
    labels: ['Machine Learning'],
    datasets: [
      {
        data: [456, 385, 245, 178],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };
  // Add this in your state declarations
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

  return (
    <div className={`dashboard-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
     <aside 
     className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-800 border-r border-gray-200/80 dark:border-gray-700/50 transform transition-transform duration-300 ease-in-out z-50 backdrop-blur-xl
       ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
   >
     <div className="flex flex-col h-full">
       {/* Sidebar Header with Gradient */}
       <div className="p-6 border-b border-gray-200/80 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-800/30">
  <div className="flex items-center gap-4">
    <div className="relative">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 p-0.5">
        {/* Profile Picture or Initials */}
        {user && user.profilePicture ? (
          <img 
            src={user.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white text-xl font-bold rounded-xl">
            {user ? user.fullName?.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </div>
      {/* Status Indicator */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
    </div>
    <div>
      {/* Full Name */}
      <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
        {user ? user.fullName : 'Guest'}
      </h2>
      {/* Date and Time */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {new Date().toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
  </div>
</div>


   
       {/* Enhanced Navigation Menu */}
       <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto scrollbar-thin">
         {[
           { icon: FiBarChart2, label: 'Dashboard', id: 'dashboard', gradient: 'from-blue-500 to-indigo-500' },
           { icon: FiBookOpen, label: 'Courses', id: 'courses', gradient: 'from-emerald-500 to-teal-500' },
           { icon: FiUsers, label: 'Students', id: 'students', gradient: 'from-violet-500 to-purple-500' },
           { icon: FiPlay, label: 'Live Sessions', id: 'live-sessions', gradient: 'from-pink-500 to-rose-500' },
           { icon: FiDollarSign, label: 'Revenue', id: 'revenue', gradient: 'from-amber-500 to-orange-500' },
           { icon: FiSettings, label: 'Settings', id: 'settings', gradient: 'from-gray-500 to-slate-500' },
           { icon: FiMessageSquare, label: 'Messages', id: 'messenger', gradient: 'from-gray-500 to-slate-500' },
            { icon: FiMessageSquare, label: 'Message for query', id: 'help', gradient: 'from-gray-500 to-slate-500' }


         ].map(({ icon: Icon, label, id, gradient }) => (
           <button
             key={id}
             onClick={() => setCurrentPage(id)}
             className={`w-full group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 
               ${currentPage === id 
                 ? `bg-gradient-to-r ${gradient} text-white shadow-lg` 
                 : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50'}`}
           >
             <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
               currentPage === id 
                 ? 'bg-white/20' 
                 : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-white group-hover:shadow-md'
             }`}>
               <Icon className={`text-xl transition-transform duration-300 group-hover:scale-110 ${
                 currentPage === id 
                   ? 'text-white' 
                   : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-500'
               }`} />
             </div>
             <span className="font-medium">{label}</span>
             {currentPage === id && (
               <div className="ml-auto flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
               </div>
             )}
           </button>
         ))}
       </nav>
   
       {/* Enhanced User Profile & Logout */}
       <div className="p-4 border-t border-gray-200/80 dark:border-gray-700/50 bg-gradient-to-t from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-800/30">
         <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-300 group shadow-sm hover:shadow-md">
           <div className="relative">
           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 p-0.5">
  <img 
    src={user?.profilePicture || "https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg"} 
    alt="Profile" 
    className="w-full h-full rounded-lg object-cover"
  />
</div>

           </div>
           <div className="flex-1">
  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
    {user ? user.fullName : 'Guest'}
  </h4>
  <p className="text-xs text-gray-500 dark:text-gray-400">
    <Link to="/profile">View Profile</Link>
  </p>
</div>

           <button 
             className="p-2.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 hover:-translate-y-0.5"
             onClick={() => {/* handle logout */}}
           >
             <FiLogOut className="text-lg" />
           </button>
         </div>
       </div>
     </div>
   </aside>
      {/* Main Content */}
      {currentPage === 'dashboard' && (

<main className="flex-1 min-h-screen ml-72 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-all duration-500">
  {/* Background Decoration */}
  <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent pointer-events-none"></div>

  {/* Header */}
  <header className="flex justify-between items-center mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
    <div className="flex items-center gap-4">
      <button 
        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FiMenu className="text-2xl text-gray-600 dark:text-gray-300" />
      </button>
      <div className="hidden md:block">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500">{new Date("2025-03-13 21:57:23").toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>

    <div className="flex items-center gap-6">
      {/* Theme Toggle */}
      <button 
        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
        onClick={toggleTheme}
      >
        {darkMode ? 
          <FiSun className="text-2xl text-yellow-500 group-hover:rotate-180 transition-transform duration-500" /> : 
          <FiMoon className="text-2xl text-gray-600 group-hover:-rotate-180 transition-transform duration-500" />
        }
      </button>
      
      {/* Notifications */}
      <div className="relative group">
        <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
          <FiBell className="text-2xl text-gray-600 dark:text-gray-300 group-hover:animate-bell" />
        </button>
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">3</span>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 pl-6 border-l border-gray-200 dark:border-gray-700">
  <div className="hidden md:block text-right">
    {/* Full Name */}
    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
      {user ? user.fullName : 'Guest'}
    </h4>
    {/* Role */}
    <p className="text-xs text-gray-500 dark:text-gray-400">Teacher</p>
  </div>
  <div className="relative group cursor-pointer">
    {/* Profile Picture or Initials */}
    {user && user.profilePicture ? (
      <img 
        src={user.profilePicture} 
        alt="Profile" 
        className="w-11 h-11 rounded-xl ring-2 ring-primary-500 transition-transform duration-300 group-hover:scale-105"
      />
    ) : (
      <div className="w-11 h-11 flex items-center justify-center bg-gray-300 text-white text-xl font-bold rounded-xl ring-2 ring-primary-500">
        {user ? user.fullName?.charAt(0).toUpperCase() : 'U'}
      </div>
    )}
    {/* Status Indicator */}
    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
  </div>
</div>

    </div>
  </header>

  {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[
      { icon: FiUsers, title: 'Total Students', value: stats.totalStudents.toLocaleString(), trend: '+12.5%', color: 'blue', bgGradient: 'from-blue-500/20 to-cyan-500/20' },
      { icon: FiBookOpen, title: 'Total Courses', value: stats.totalCourses, trend: '+5.8%', color: 'emerald', bgGradient: 'from-emerald-500/20 to-teal-500/20' },
      { icon: FiDollarSign, title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, trend: '+18.2%', color: 'violet', bgGradient: 'from-violet-500/20 to-purple-500/20' },
      { icon: FiTrendingUp, title: 'Total Views', value: stats.totalViews.toLocaleString(), trend: '+8.9%', color: 'orange', bgGradient: 'from-orange-500/20 to-amber-500/20' }
    ].map((stat, index) => (
      <div 
        key={index} 
        className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.bgGradient} transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[360deg]`}>
            <stat.icon className={`text-2xl text-${stat.color}-500`} />
          </div>
          <span className={`text-sm font-semibold text-${stat.color}-500 bg-${stat.color}-100/50 dark:bg-${stat.color}-900/20 px-3 py-1.5 rounded-xl`}>
            {stat.trend}
          </span>
        </div>
        <div className="mt-6">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{stat.title}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Charts Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
        <select className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm font-medium border-0 focus:ring-2 focus:ring-primary-500">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>
      <div className="h-[400px] w-full">
        <Line data={revenueData} options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.8)',
              padding: 12,
              borderRadius: 8,
              bodyFont: { size: 14 },
              titleFont: { size: 16 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(156, 163, 175, 0.1)' },
              ticks: { padding: 10 }
            },
            x: {
              grid: { display: false },
              ticks: { padding: 10 }
            }
          },
          elements: {
            line: {
              tension: 0.4,
              borderWidth: 3,
              borderColor: '#6366f1'
            },
            point: {
              radius: 4,
              borderWidth: 2,
              backgroundColor: '#ffffff',
              borderColor: '#6366f1',
              hoverRadius: 6
            }
          }
        }} />
      </div>
    </div>

    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Students per Course</h3>
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          View All
        </button>
      </div>
      <div className="h-[400px]">
        <Doughnut data={studentsData} options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: '75%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                font: { size: 12 }
              }
            }
          }
        }} />
      </div>
    </div>
  </div>

  {/* Bottom Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Top Courses */}
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Top Performing Courses</h3>
        <button className="text-primary-500 hover:text-primary-600 font-medium text-sm">View All</button>
      </div>
      <div className="space-y-4">
        {stats.topCourses.map(course => (
          <div key={course.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {course.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {course.students.toLocaleString()} students enrolled
                </p>
              </div>
              <span className="text-sm font-bold text-primary-500 bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-xl">
                RS {course.revenue.toLocaleString()}
              </span>
            </div>
            <div className="relative h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-500 group-hover:from-primary-500 group-hover:to-primary-300"
                style={{ width: `${course.progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiFilter className="text-gray-500" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiMoreVertical className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {stats.recentActivities.map(activity => (
          <div key={activity.id} className="group flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${
              activity.action === 'Enrolled' ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-500' :
              activity.action === 'Completed' ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-500' :
              'bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-500'
            }`}>
              {activity.action === 'Enrolled' && <FiUsers className="text-xl" />}
              {activity.action === 'Completed' && <FiBookOpen className="text-xl" />}
              {activity.action === 'Reviewed' && <FiTrendingUp className="text-xl" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {activity.student}
                </h4>
                <small className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</small>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {activity.action} in <span className="font-medium text-gray-700 dark:text-gray-300">
                    {
                        activity.course}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
      )}

{currentPage === 'courses' && (
  <div className="min-h-[calc(100vh-var(--header-height))] translate-x-[300px] bg-gray-50 dark:bg-gray-900 p-8 relative overflow-hidden">
    {/* Background Gradient Effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent"></div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            My Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and track your course content
          </p>
        </div>
       
        <div className="p-6">
      {/* Create New Course Button */}
      <button
        className="group flex items-center text-white gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
        Create New Course
      </button>

      {/* Modal */}
     {isOpen && (
  <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-auto min-h-screen">
    <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-[0_0_50px_-12px_rgb(0,0,0,0.25)] animate-slideIn">
      {/* Decorative Header Background */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl" />

      {/* Close Button - Moved outside the white container */}
      <button
        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
        onClick={() => setIsOpen(false)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative z-10 px-8 pt-16 pb-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Create New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 max-h-[calc(100vh-240px)] overflow-y-auto custom-scrollbar">
          <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
            {/* Title and Category Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter course title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                  required
                />
              </div>

            <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">Category</label>
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none appearance-none bg-white"
    required
  >
    <option value="">Select Category</option>

    {categories.map((groupItem) => (
      <optgroup key={groupItem.group} label={groupItem.group}>
        {groupItem.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </optgroup>
    ))}
  </select>
</div>

            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Describe your course"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none"
                rows="3"
                required
              />
            </div>

            {/* Thumbnail Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-500 transition-all">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        name="thumbnail"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {thumbnailPreview && (
                <div className="mt-4">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Price and Level Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₨</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none appearance-none bg-white"
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Language and Course Type Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <input
                  type="text"
                  name="language"
                  placeholder="e.g., English, Urdu"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Course Type</label>
                <select
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none appearance-none bg-white"
                  required
                >
                  <option value="">Select Course Type</option>
                  <option value="Video">Video Course</option>
                  <option value="Online">Online (Zoom)</option>
                  <option value="InPerson">In-Person</option>
                </select>
              </div>
            </div>

            {/* Conditional Fields Based on Course Type */}
            {formData.courseType === "Video" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Upload Video</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-500 transition-all">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                        <span>Upload a video</span>
                        <input
                          type="file"
                          name="videoFile"
                          onChange={(e) => setFormData({ ...formData, videoFile: e.target.files[0] })}
                          accept="video/*"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">MP4, WebM up to 2GB</p>
                  </div>
                </div>
              </div>
            )}

            {formData.courseType === "Online" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Class Time</label>
                  <input
                    type="text"
                    name="classTime"
                    placeholder="e.g., 7PM - 8PM"
                    value={formData.classTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Classes per Week</label>
                  <input
                    type="number"
                    name="classDaysPerWeek"
                    placeholder="e.g., 3"
                    value={formData.classDaysPerWeek}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Course Duration</label>
                  <input
                    type="text"
                    name="courseDuration"
                    placeholder="e.g., 2 months"
                    value={formData.courseDuration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                  />
                </div>
              </div>
            )}

            {formData.courseType === "InPerson" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Location & Timing Details</label>
                <textarea
                  name="inPersonDetails"
                  placeholder="Please describe your location and timing preference"
                  value={formData.inPersonDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none"
                  rows="3"
                />
              </div>
            )}

            {/* What You Will Learn Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">What You Will Learn</label>
              <textarea
                name="whatYouWillLearn"
                placeholder="Enter learning objectives (comma separated)"
                value={formData.whatYouWillLearn}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none"
                rows="3"
                required
              />
            </div>

            {/* Requirements Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Requirements</label>
              <textarea
                name="requirements"
                placeholder="Enter course requirements (comma separated)"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none"
                rows="3"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <button
        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
        onClick={() => setIsOpen(false)}
        type="button" // Add this to prevent form submission
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Add click handler to the backdrop for closing */}
     

        </form>
      </div>
    </div>
  </div>
)}
    </div>

      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {/* Search Box */}
            <div className="relative max-w-md">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search courses..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filter Groups */}
            <div className="flex flex-wrap gap-4">
              {['All Categories', 'All Status', 'Sort By'].map((filter) => (
                <select key={filter} className="px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 cursor-pointer transition-all duration-300">
                  <option>{filter}</option>
                </select>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-primary-500 text-white flex items-center gap-2">
              <FiGrid /> Grid
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
              <FiList /> List
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2025</h3>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <FiChevronLeft />
          </button>
          <span className="font-medium">March</span>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
  {courses.map((course, index) => (
    <div 
      key={index}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative h-56">
        <img 
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay with Level & Price */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <span className="bg-primary-500 text-white text-sm px-3 py-1 rounded-md">
              {course.level}
            </span>
            <span className="bg-white text-gray-900 font-bold text-sm px-3 py-1 rounded-md">
              {course.price}Pkr
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <div className="text-primary-500 text-sm font-medium mb-2">
          {course.category} • {course.language}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-2">
          {course.description}
        </p>

        {/* What You Will Learn */}
        {course.whatYouWillLearn && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              What you'll learn
            </h4>
            <ul className="space-y-2">
              {Array.isArray(course.whatYouWillLearn) 
                ? course.whatYouWillLearn.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))
                : <li className="text-gray-600 dark:text-gray-400">{course.whatYouWillLearn}</li>
              }
            </ul>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Edit Course
          </button>
          <button className="flex-1 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
          <FiChevronLeft /> Previous
        </button>
        <div className="flex items-center gap-2">
          {[1, 2, 3, '...', 12].map((num, i) => (
            <button 
              key={i}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                num === 1 
                  ? 'bg-primary-500 text-white' 
                  : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
          Next <FiChevronRight />
        </button>
      </div>
    </div>
  </div>
)}

{currentPage === 'students' && (
  <main className="flex-1 min-h-screen ml-72 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-all duration-500">
    {/* Decorative Background Effects */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
    </div>

    <div className="relative z-10 max-w-[2000px] mx-auto">
      {/* Header Section */}
      <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title and Date */}
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Students Management
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <p className="text-gray-500 dark:text-gray-400">
                Welcome back, <span className="font-semibold text-indigo-600 dark:text-indigo-400">{"huzaifa8883"}</span>
              </p>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {new Date("2025-03-13 22:24:58").toLocaleString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-4 py-2.5 rounded-xl flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
              <FiDownload className="text-lg" />
              <span className="font-medium">Export Data</span>
            </button>
            <button className="px-4 py-2.5 rounded-xl flex items-center gap-2 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5">
              <FiUserPlus className="text-lg" />
              <span className="font-medium">Add New Student</span>
            </button>
            <button className="p-2.5 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
              <FiMoreVertical className="text-lg" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { 
              label: 'Total Students',
              value: studentss.length,
              change: '+12.5%',
              icon: FiUsers,
              gradient: 'from-blue-600 to-indigo-600',
              lightBg: 'bg-blue-50',
              darkBg: 'dark:bg-blue-900/20',
              textColor: 'text-blue-600 dark:text-blue-400'
            },
            {
              label: 'Active Students',
             value: studentss.length,
              change: '+8.1%',
              icon: FiUserCheck,
              gradient: 'from-emerald-600 to-teal-600',
              lightBg: 'bg-emerald-50',
              darkBg: 'dark:bg-emerald-900/20',
              textColor: 'text-emerald-600 dark:text-emerald-400'
            },
            {
              label: 'Course Completion',
              value: '0%',
              change: '0%',
              icon: FiAward,
              gradient: 'from-violet-600 to-purple-600',
              lightBg: 'bg-violet-50',
              darkBg: 'dark:bg-violet-900/20',
              textColor: 'text-violet-600 dark:text-violet-400'
            },
            {
              label: 'Average Grade',
              value: 'A+',
              change: '+2.2%',
              icon: FiTrendingUp,
              gradient: 'from-amber-600 to-orange-600',
              lightBg: 'bg-amber-50',
              darkBg: 'dark:bg-amber-900/20',
              textColor: 'text-amber-600 dark:text-amber-400'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} p-0.5 rotate-3 group-hover:rotate-6 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-800 flex items-center justify-center">
                    <stat.icon className={`text-2xl ${stat.textColor}`} />
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${stat.lightBg} ${stat.darkBg} ${stat.textColor}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              {/* Decorative Elements */}
              <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Search students by name, course, or ID..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Course', options: ['All Courses', 'Web Development', 'Mobile Development', 'UI/UX Design'] },
              { label: 'Status', options: ['All Status', 'Active', 'Inactive', 'On Hold'] },
              { label: 'Sort By', options: ['Latest', 'Name', 'Progress', 'Rating'] }
            ].map((filter, index) => (
              <div key={index} className="relative group">
                <select className="appearance-none w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 cursor-pointer">
                  {filter.options.map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
            <button className="p-3 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
              <FiFilter className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Students Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      
  {studentss.map((student, index) => {
     

  // DEBUGGING BLOCK 👇
  
    return (
      <div
        key={index}
        className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
      >
        {/* Student Card Header */}
        <div className="relative h-40">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          </div>

          {/* Profile Image */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex items-center gap-4">
              <div className="relative group-hover:scale-110 transition-transform duration-500">
                <img
                  src={student?.studentId?.profilePicture || `https://i.pravatar.cc/150?img=${index + 1}`}
                  alt={student.fullName}
                  className="w-16 h-16 rounded-xl border-2 border-white/50 object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{student?.studentId.fullName}</h3>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-100 border border-indigo-500/30">
                    {student.specialization || "Student"}
                  </span>
                </div>
                <p className="text-white/80 text-sm flex items-center gap-2">
                  <FiCode />
                  {student.studentId.qualification || "Qualification not provided"}
                </p>
              </div>

              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300">
                <FiMoreVertical />
              </button>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-6">
          {/* Status and Level */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400 border border-green-500/30">
              Active Student
            </span>
            <div className="flex items-center gap-2">
              <FiStar className="text-amber-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Level {index + 1}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Course Progress</span>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {0 + index}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full transition-all duration-500 relative group-hover:from-indigo-500 group-hover:to-pink-500"
                style={{ width: `${78 + index}%` }}
              >
                <div className="absolute inset-0 bg-[length:20px_20px] animate-shimmer"
                  style={{
                    backgroundImage:
                      'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: FiBook, label: 'Courses', value: 1 + index },
              { icon: FiAward, label: 'Certificates', value: 0 + index },
              { icon: FiClock, label: 'Hours', value: `${0 + index}h` }
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300"
              >
                <stat.icon className="text-lg text-indigo-500 mb-1" />
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25">
              View Profile
            </button>
            <button className="p-2.5 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
              <FiMessageSquare className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    );
  })}
</div>


      {/* Enhanced Pagination */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-2 border border-white/20 dark:border-gray-700/30 shadow-lg">
          <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            <FiChevronLeft className="text-xl" />
          </button>
          
          {[1, 2, 3, '...', 8].map((page, index) => (
            <button
              key={index}
              className={`min-w-[40px] h-10 rounded-lg flex items-center justify-center font-medium transition-all duration-300 
                ${page === 1 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {page}
            </button>
          ))}
          
          <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* Quick Stats Floating Card */}
      <div className="fixed bottom-6 right-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-gray-700/30 shadow-lg animate-float">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <FiActivity className="text-2xl text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Online Students</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">1,234</p>
          </div>
        </div>
      </div>
    </div>
  </main>
)}
{currentPage === 'live-sessions' && (
  <main className="flex-1 min-h-screen ml-72 bg-[#f8faff] dark:bg-gray-900 transition-all duration-500">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Virtual Classroom</h1>
          <div className="mt-2">
            Session ID: AzadEducation-{Math.random().toString(36).substr(2, 6).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-6">
            {/* Course Selection */}
            <div>
              <label className="block text-gray-700 dark:text-white font-medium mb-2">
                Select Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                          text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="Machine Learning">Machine Learning</option>
                <option value="Deep Learning">Deep Learning</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            {/* Date Selection */}
            <div className="relative">
              <label className="block text-gray-700 dark:text-white font-medium mb-2 flex items-center gap-2">
                <FaRegCalendarAlt />
                Select Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={dayjs(selectedDate).format('MMMM D, YYYY')}
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                            text-gray-800 dark:text-white cursor-pointer focus:ring-2 focus:ring-blue-500"
                />

                {showCalendar && (
                  <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <button onClick={() => changeMonth(-1)} className="p-2">
                        <FaChevronLeft />
                      </button>
                      <div className="font-semibold">
                        {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </div>
                      <button onClick={() => changeMonth(1)} className="p-2">
                        <FaChevronRight />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-2">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((day, index) => (
                        <button
                          key={index}
                          onClick={() => day && handleDateSelect(day)}
                          disabled={!day || (new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day) < new Date().setHours(0,0,0,0))}
                          className={`
                            p-2 rounded-lg
                            ${!day ? 'invisible' : ''}
                            ${day && new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).setHours(0,0,0,0) === new Date(selectedDate).setHours(0,0,0,0)
                              ? 'bg-blue-500 text-white'
                              : 'hover:bg-blue-100 dark:hover:bg-gray-700'}
                            ${new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day) < new Date().setHours(0,0,0,0)
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'cursor-pointer'}
                          `}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Time Selection */}
           <div>
  <label className="block text-gray-700 dark:text-white font-medium mb-2 flex items-center gap-2">
    <FaClock className="text-gray-500" />
    Select Time
  </label>
  
  {/* Toggle between preset and custom time */}
  <div className="flex gap-2 mb-4">
    <button
      onClick={() => setIsCustomTime(false)}
      className={`px-4 py-2 rounded-lg ${
        !isCustomTime 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      Preset Times
    </button>
    <button
      onClick={() => setIsCustomTime(true)}
      className={`px-4 py-2 rounded-lg ${
        isCustomTime 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      Custom Time
    </button>
  </div>

  {isCustomTime ? (
    // Custom Time Selection
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Hour Selection */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Hour
          </label>
          <select
            value={customHour}
            onChange={(e) => setCustomHour(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="">Hour</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
              <option key={hour} value={hour}>
                {hour.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>

        {/* Minute Selection */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Minute
          </label>
          <select
            value={customMinute}
            onChange={(e) => setCustomMinute(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="">Minute</option>
            {Array.from({ length: 60 }, (_, i) => i).map(minute => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>

        {/* AM/PM Selection */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            AM/PM
          </label>
          <select
            value={customPeriod}
            onChange={(e) => setCustomPeriod(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCustomTimeSelect}
        disabled={!customHour || !customMinute}
        className={`w-full p-3 rounded-lg ${
          customHour && customMinute
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        } transition-colors duration-200`}
      >
        Set Custom Time
      </button>

      {selectedTime && (
        <div className="mt-2 p-2 bg-blue-50 dark:bg-gray-700 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200">
            Selected Time: {dayjs(`2000-01-01 ${selectedTime}`).format('hh:mm A')}
          </p>
        </div>
      )}
    </div>
  ) : (
    // Preset Time Slots
    <div className="grid grid-cols-4 gap-2">
      {timeSlots.map((slot) => (
        <button
          key={slot.value}
          onClick={() => {
            setSelectedTime(slot.value);
            handleDateTimeSelect();
          }}
          className={`p-3 rounded-lg border flex items-center justify-center gap-2 ${
            selectedTime === slot.value
              ? 'bg-blue-500 text-white border-blue-600'
              : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white'
          } hover:bg-blue-50 dark:hover:bg-gray-600 transition-all`}
        >
          {selectedTime === slot.value ? (
            <FaCheckCircle className="h-4 w-4" />
          ) : (
            <FaRegClock className="h-4 w-4" />
          )}
          {slot.label}
        </button>
      ))}
    </div>
  )}
</div>

            {/* Schedule Button */}
            <button
              onClick={handleSchedule}
              disabled={!inputTime}
              className={`w-full p-4 rounded-lg ${
                inputTime
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              } text-white font-medium transition-all duration-200 flex items-center justify-center gap-2`}
            >
              <FaRegCalendarAlt className="h-5 w-5" />
              Schedule Meeting
            </button>
          </div>
        </div>

        {/* Scheduled Meetings */}
   {scheduledMeetings.length > 0 && (
  <div className="space-y-6">
    {scheduledMeetings.map((meeting, index) => {
      const meetingTime = dayjs(meeting.time);
      const now = dayjs();
      const isActive = meetingTime.isSame(now, 'minute') || 
        (meetingTime.isBefore(now) && meetingTime.add(1, 'hour').isAfter(now));
      const hasStarted = meeting.started && isActive && !meeting.endedManually;
      
      return (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {meeting.course}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-2">
                <FaRegCalendarAlt />
                {dayjs(meeting.time).format('MMMM D, YYYY [at] h:mm A')}
              </p>
              {!hasStarted && !meeting.endedManually && (
                <p className="text-sm text-gray-500 mt-1">
                  Meeting will be available at scheduled time
                </p>
              )}
              {meeting.endedManually && (
                <p className="text-sm text-red-500 mt-1">
                  Meeting ended by host
                </p>
              )}
            </div>
            <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              hasStarted ? 'bg-green-100 text-green-800' : 
              meeting.endedManually ? 'bg-red-100 text-red-800' :
              meetingTime.isAfter(now) ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {hasStarted ? (
                <>
                  <FaCheckCircle />
                  In Progress
                </>
              ) : meeting.endedManually ? (
                <>
                  <FaRegClock />
                  Ended by Host
                </>
              ) : meetingTime.isAfter(now) ? (
                <>
                  <FaRegClock />
                  Scheduled
                </>
              ) : (
                <>
                  <FaRegClock />
                  Ended
                </>
              )}
            </div>
          </div>

          {hasStarted && (
            <div className="mt-6">
              <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg mb-4 flex justify-between items-center">
                <p className="text-blue-800 dark:text-blue-200">
                  Your meeting is now active! Join below.
                </p>
                <button
                  onClick={() => handleEndMeeting(index)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                           transition-colors duration-200 flex items-center gap-2"
                >
                  <FaTimes className="h-4 w-4" />
                  End Meeting
                </button>
              </div>
              <JitsiMeeting
                roomName={`AzadEducation-${meeting.course.replace(/\s+/g, '')}-${index}`}
                configOverwrite={{
                  startWithAudioMuted: false,
                  prejoinPageEnabled: false,
                }}
                interfaceConfigOverwrite={{
                  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                  TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'desktop', 'fullscreen', 'hangup', 'chat',
                    'raisehand', 'videoquality', 'tileview', 'mute-everyone'
                  ],
                }}
                getIFrameRef={(iframeRef) => {
                  iframeRef.style.height = '600px';
                  iframeRef.style.width = '100%';
                }}
              />
            </div>
          )}

          {/* Add Rejoin Button for manually ended meetings */}
          {meeting.endedManually && isActive && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setScheduledMeetings((prevMeetings) =>
                    prevMeetings.map((m, i) => {
                      if (i === index) {
                        return { ...m, started: true, endedManually: false };
                      }
                      return m;
                    })
                  );
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaVideo className="h-4 w-4" />
                Rejoin Meeting
              </button>
            </div>
          )}
        </div>
      );
    })}
  </div>
)}
      </div>
    </main>
)}

{currentPage === 'messenger' && (
  <main className="flex-1 min-h-screen ml-72 bg-gray-50 dark:bg-gray-900">
    <div className="relative h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Teacher Messenger</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Online</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        {students.map((user) => {
  console.log("User ID:", user._id);
  messages.forEach((msg) => {
    console.log("Message senderId:", msg.senderId); // ya msg.userId
  });

  const userMsgCount =
  selectedStudentId !== user._id
    ? messages.filter((msg) => msg.senderId === user._id).length
    : 0;

  return (
    <div
    key={user._id}
    onClick={() => setSelectedStudentId(user._id)}
    className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
      userMsgCount > 0 ? 'bg-yellow-100 dark:bg-yellow-800' : ''
    }`}
  >
    <div className="flex items-center justify-between">
      <span className="text-gray-800 dark:text-white font-medium">{user.fullName}</span>
  
      {userMsgCount > 0 && (
        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {userMsgCount}
        </span>
      )}
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-400">Status: online</div>
  </div>
  
  );
})}

</aside>



        {/* Chat Messages Area */}
        {selectedStudentId ? (
          <section className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((msg, idx) => {
                  const isOwnMessage = msg.senderId === localStorage.getItem('userId');
                  return (
                    <div key={idx} className={`flex items-end space-x-2 ${isOwnMessage ? 'justify-end' : ''}`}>
                      {!isOwnMessage && (
                        <div className="flex flex-col items-center space-y-1">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                            S
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}
                      <div className={`group relative max-w-md ${isOwnMessage ? 'order-first' : ''}`}>
                        <div className={`p-4 rounded-2xl ${
                          isOwnMessage
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                        } shadow-sm`}>
                          {msg.message && <p className="break-words mb-2">{msg.message}</p>}
                          
                          {msg.fileUrl && (
                            <div className="mt-2">
                              {msg.fileType?.startsWith('image/') ? (
                                <a 
                                  href={msg.fileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="block"
                                >
                                  <div className="relative bg-white dark:bg-gray-600 rounded-lg overflow-hidden">
                                    <img
                                      src={msg.fileUrl}
                                      alt={msg.fileName}
                                      className="max-w-full w-full h-auto object-cover rounded-lg"
                                      style={{ maxHeight: '200px' }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                      {msg.fileName}
                                    </div>
                                  </div>
                                </a>
                              ) : (
                                <a
                                  href={msg.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 p-2 rounded  bg-opacity-20 hover:bg-opacity-30 transition"
                                >
                                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-medium">{msg.fileName}</p>
                                    <p className="text-xs opacity-75">
  {msg.fileType ? msg.fileType.split('/')[1]?.toUpperCase() : ""}
</p>

                                  </div>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                        <span className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Message Input Area */}
            <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="max-w-3xl mx-auto">
                {/* File Preview */}
                {selectedFile && (
                  <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {selectedFile.type.startsWith('image/') && previewUrl ? (
                      <div className="relative">
                        <div className="relative bg-white dark:bg-gray-600 rounded-lg overflow-hidden">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-w-full w-full h-auto object-contain rounded-lg"
                            style={{ 
                              maxHeight: '200px',
                              minHeight: '100px',
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                            {selectedFile.name}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="ml-2 flex-1 truncate text-gray-600 dark:text-gray-300">{selectedFile.name}</span>
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Upload Progress */}
                {uploadProgress > 0 && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-end space-x-4">
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                      />
                    </div>
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() && !selectedFile}
                    className={`px-6 py-3 ${
                      !newMessage.trim() && !selectedFile
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white font-medium rounded-xl transition-colors duration-200 flex items-center space-x-2`}
                  >
                    <span>Send</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            <div className="w-24 h-24 mb-4 text-gray-300 dark:text-gray-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Conversation Selected</h3>
            <p className="text-gray-500">Choose a student from the list to start chatting</p>
          </section>
        )}
      </div>
    </div>
  </main>
)}


{currentPage === 'revenue' && (
  <main className="flex-1 min-h-screen ml-72 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-all duration-500">
    {/* Decorative Background */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </div>

    <div className="relative z-10 max-w-[2000px] mx-auto">
      {/* Header Section */}
      <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Revenue Dashboard
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE UPDATES
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <img
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${"huzaifaquershi66"}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full bg-gray-100"
                />
                <p className="text-gray-500 dark:text-gray-400">
                  Welcome back, <span className="font-semibold text-emerald-600 dark:text-emerald-400">{""}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                <FiClock className="text-gray-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {new Date("2025-03-13 22:54:38").toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-4 py-2.5 rounded-xl flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
              <FiDownload className="text-lg" />
              <span className="font-medium">Export Report</span>
            </button>
           <button 
  onClick={() => setShowWithdrawModal(true)} 
  className="px-4 py-2.5 rounded-xl flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
>
  <FiDollarSign className="text-lg" />
  <span className="font-medium">Withdraw Earnings</span>
</button>
   
          </div>
        </div>

        {/* Revenue Stats */}
        {studentss.map((student)=>(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            {
              label: 'Total Earnings',
              value: `Rs ${totalEarnings}`,
              change: '+22% vs last month',
              icon: FiDollarSign,
              gradient: 'from-emerald-600 to-teal-600',
              lightBg: 'bg-emerald-50',
              darkBg: 'dark:bg-emerald-900/20',
              textColor: 'text-emerald-600 dark:text-emerald-400'
            },
            {
              label: 'Active Students',
              value: '1',
              change: '+1 this month',
              icon: FiUsers,
              gradient: 'from-blue-600 to-indigo-600',
              lightBg: 'bg-blue-50',
              darkBg: 'dark:bg-blue-900/20',
              textColor: 'text-blue-600 dark:text-blue-400'
            },
            {
              label: 'Avg. Per Class',
              value: '10000',
              change: '+5% vs last month',
              icon: FiTrendingUp,
              gradient: 'from-purple-600 to-indigo-600',
              lightBg: 'bg-purple-50',
              darkBg: 'dark:bg-purple-900/20',
              textColor: 'text-purple-600 dark:text-purple-400'
            },
            {
              label: 'Pending Payout',
              value: '10000',
              change: 'Processing',
              icon: FiCreditCard,
              gradient: 'from-amber-600 to-orange-600',
              lightBg: 'bg-amber-50',
              darkBg: 'dark:bg-amber-900/20',
              textColor: 'text-amber-600 dark:text-amber-400'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} p-0.5 rotate-3 group-hover:rotate-6 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-800 flex items-center justify-center">
                    <stat.icon className={`text-2xl ${stat.textColor}`} />
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${stat.lightBg} ${stat.darkBg} ${stat.textColor}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Overview</h2>
          <div className="flex items-center gap-4">
            <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
        </div>
        
        {/* Revenue Chart Placeholder */}
        <div className="h-80 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-lg">
          {/* Add your chart component here */}
        </div>
      </div>
{showWithdrawModal && (
  <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_0_50px_-12px_rgb(0,0,0,0.25)] animate-slideIn z-[9999]" style={{ margin: 'auto' }}>
      {/* Decorative Header */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-2xl" />

      {/* Close Button */}
      <button
        onClick={() => setShowWithdrawModal(false)}
        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative z-10 px-6 pt-12 pb-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiDollarSign className="text-3xl text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Withdraw Earnings</h2>
          <p className="text-gray-500 mt-1">Available Balance: ₨10,000</p>
        </div>

        <form onSubmit={handleWithdrawSubmit} className="space-y-5">
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              How much would you like to withdraw?
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₨</span>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                required
                min="100"
                max="15000"
              />
            </div>
            <p className="text-xs text-gray-500">Minimum: ₨100 • Maximum: ₨15,000</p>
          </div>

          {/* Withdrawal Reason */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Reason for withdrawal
            </label>
            <textarea
              name="reason"
              placeholder="Please provide a brief reason for your withdrawal request..."
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none resize-none"
              required
            />
          </div>

          {/* Processing Time Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select processing time
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setProcessingTime('2_days')}
                className={`px-4 py-2 rounded-lg border ${
                  processingTime === '2_days'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-emerald-500 hover:bg-emerald-50'
                } transition-all text-sm font-medium`}
              >
                2 Days
              </button>
              <button
                type="button"
                onClick={() => setProcessingTime('3_days')}
                className={`px-4 py-2 rounded-lg border ${
                  processingTime === '3_days'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-emerald-500 hover:bg-emerald-50'
                } transition-all text-sm font-medium`}
              >
                3 Days
              </button>
              <button
                type="button"
                onClick={() => setProcessingTime('5_days')}
                className={`px-4 py-2 rounded-lg border ${
                  processingTime === '5_days'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-emerald-500 hover:bg-emerald-50'
                } transition-all text-sm font-medium`}
              >
                5 Days
              </button>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Important Notice</h3>
                <p className="text-xs text-amber-700 mt-1">
                  Withdrawal requests are processed according to the selected time frame. Once submitted, the request cannot be cancelled.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowWithdrawModal(false)}
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all font-medium shadow-lg shadow-emerald-500/25"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
      {/* Recent Transactions & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Transactions */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {[
              { student: 'Hamzal hassan', amount: '10000', course: 'Machine learning', date: '2025-6-15' },
            
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <FiDollarSign className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{transaction.student}</h3>
                    <p className="text-sm text-gray-500">{transaction.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">{transaction.amount}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Revenue Analytics</h2>
          <div className="space-y-6">
            {[
              { label: 'Course Revenue', value: '10000', percentage: 68 },
              { label: 'Live Sessions', value: '0', percentage: 25 },
              { label: 'Consulting', value: '0', percentage: 7 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{item.percentage}% of total revenue</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payout History</h2>
          <button className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Transaction ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'TRX-789012', date: '2025-06-15', amount: '10000', status: 'Completed' },
        
              ].map((payout, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{payout.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{payout.date}</td>
                  <td className="px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">{payout.amount}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Need help? Contact{' '}
          <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  </main>
)}

{currentPage === 'help' && (
  <div className="flex-1 min-h-screen ml-72 bg-[#f0f2f5] dark:bg-gray-900 transition-all duration-500">
    <div className="max-w-5xl mx-auto p-6">
      {/* Enhanced Header with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-md bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl p-8 mb-6 border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <FaUser className="text-white h-6 w-6" />
              </span>
              Message Admin
            </h1>
            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              Direct communication channel with administration
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center gap-2 bg-blue-500/10 dark:bg-blue-500/20 px-4 py-2 rounded-full">
              <FaUser className="text-blue-500" />
              <span className="text-gray-700 dark:text-gray-200 font-medium">{currentUser}</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-500/10 dark:bg-purple-500/20 px-4 py-2 rounded-full">
              <FaClock className="text-purple-500" />
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                {new Date(currentDateTime).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Chat Container */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          {/* Messages Area */}
          <div className="h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
            <div className="space-y-6 p-6">
              {messagess.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isSystemMessage ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="flex items-end gap-2 max-w-[70%]">
                    {message.isSystemMessage && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <FaUser className="text-white w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-4 shadow-md ${
                        message.isSystemMessage
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      {message.file && (
                        <div className="mt-3 flex items-center gap-2 text-sm bg-black/10 dark:bg-white/10 p-2 rounded-lg">
                          <FaPaperclip className="text-blue-300" />
                          <span className="font-medium">{message.file.name}</span>
                        </div>
                      )}
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <span className="text-xs opacity-75">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                        {!message.isSystemMessage && (
                          <span className="text-blue-200">
                            <FaCheck className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center">
                      <FaUser className="text-white w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 shadow-md">
                      <div className="flex gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:200ms]" />
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:400ms]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-100 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
            <form onSubmit={handleSubmito} className="flex items-center gap-4">
              <div className="flex gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <FaPaperclip className="w-5 h-5" />
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-500 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                >
                  <FaSmile className="w-5 h-5" />
                </motion.button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUploado}
                className="hidden"
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessages}
                  onChange={(e) => setNewMessages(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-6 py-4 bg-white dark:bg-gray-900 rounded-full border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/20 transition-all outline-none text-gray-700 dark:text-gray-200"
                />
              </div>
              <motion.button
                type="submit"
                disabled={!newMessages.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-full ${
                  newMessages.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                    : 'bg-gray-200 dark:bg-gray-700'
                } text-white shadow-lg transition-all duration-200`}
              >
                <FaPaperPlane className="w-5 h-5" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
)}
  
   {currentPage === 'settings' && (
  <div className="flex-1 min-h-screen ml-72 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 p-6 transition-all duration-500">
      <motion.div 
        className="max-w-7xl mx-auto space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Ultra Modern Header */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl shadow-2xl p-10 text-white backdrop-blur-lg bg-opacity-90 relative overflow-hidden"
          variants={fadeIn}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur">
                  <FaCog className="text-3xl text-white/90 animate-spin-slow" />
                </div>
                <h1 className="text-5xl font-bold tracking-tight">Settings</h1>
              </div>
              <div className="space-y-2">
                <p className="text-white/90 text-xl font-medium">Welcome back, {currentUser}</p>
                <p className="text-white/70 text-sm flex items-center gap-2">
                  <FaClock /> Last active: {currentDateTime}
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center relative">
                  <img 
                    src={profileImage || 'http://res.cloudinary.com/duovmhekc/image/upload/v1747507583/qalmo4oc2xdzzl2qihzi.jpg'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl p-4">
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'Profile', icon: FaUser, desc: 'Personal Information' },
              { name: 'Account', icon: FaUserCog, desc: 'Account Settings' },
              { name: 'Notifications', icon: FaBell, desc: 'Manage Alerts' },
              { name: 'Email', icon: FaEnvelope, desc: 'Email Settings' },
              { name: 'Password', icon: FaLock, desc: 'Security Settings' },
              { name: 'Theme', icon: FaPalette, desc: 'Appearance' }
            ].map(({ name, icon: Icon, desc }) => (
              <button
                key={name}
                onClick={() => setActiveTab(name.toLowerCase())}
                className={`flex-1 min-w-[160px] p-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === name.toLowerCase()
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transform scale-105'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon className={`text-2xl ${activeTab === name.toLowerCase() ? 'text-white' : 'text-blue-600'}`} />
                  <span className="font-semibold">{name}</span>
                  <span className={`text-xs ${activeTab === name.toLowerCase() ? 'text-white/80' : 'text-gray-500'}`}>
                    {desc}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Profile Section */}
          {activeTab === 'profile' && (
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl p-8"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800 dark:text-white">
                <FaUser className="text-blue-600" />
                Profile Information
              </h2>
              
              {/* Profile Picture */}
              <div className="mb-12">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-500 shadow-xl group-hover:ring-blue-600 transition-all duration-300">
                      <img
                        src={profileImage || 'http://res.cloudinary.com/duovmhekc/image/upload/v1747507583/qalmo4oc2xdzzl2qihzi.jpg'}
                        alt="Profile"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <label className="absolute bottom-2 right-2 bg-blue-600 p-4 rounded-full text-white shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 cursor-pointer">
                      <FaCamera size={20} />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{currentUser}</h3>
                    <p className="text-gray-500 dark:text-gray-400">Member since 2023</p>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid gap-8 md:grid-cols-2">
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaUser className="inline mr-2 text-blue-600" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaEnvelope className="inline mr-2 text-blue-600" /> Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaPhone className="inline mr-2 text-blue-600" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaGlobe className="inline mr-2 text-blue-600" /> Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div 
                  className="space-y-3 md:col-span-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaEdit className="inline mr-2 text-blue-600" /> Bio
                  </label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    rows={4}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Account Section */}
          {activeTab === 'account' && (
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl p-8"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800 dark:text-white">
                <FaUserCog className="text-blue-600" />
                Account Settings
              </h2>
              
              <div className="grid gap-8 md:grid-cols-2">
                <motion.div 
                  className="space-y-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaUserCog className="inline mr-2 text-blue-600" /> Account Type
                  </label>
                  <select className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300">
                    <option>Personal Account</option>
                    <option>Business Account</option>
                    <option>Developer Account</option>
                  </select>
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaLanguage className="inline mr-2 text-blue-600" /> Language
                  </label>
                  <select className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                  </select>
                </motion.div>

                <motion.div 
                  className="space-y-4 md:col-span-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaGlobe className="inline mr-2 text-blue-600" /> Time Zone
                  </label>
                  <select className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                    <option>PST (Pacific Standard Time)</option>
                    <option>GMT (Greenwich Mean Time)</option>
                    <option>IST (Indian Standard Time)</option>
                  </select>
                </motion.div>

                {/* Security Settings */}
                <div className="md:col-span-2 mt-8">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FaShieldAlt className="text-blue-600 text-xl" />
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <div className="relative">
                        <input type="checkbox" className="toggle-checkbox" />
                        <div className="toggle-switch"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Section */}
          {activeTab === 'notifications' && (
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl p-8"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800 dark:text-white">
                <FaBell className="text-blue-600" />
                Notification Preferences
              </h2>
              
              <div className="space-y-6">
                {[
                  { 
                    title: 'Email Notifications',
                    desc: 'Receive notifications via email',
                    icon: FaEnvelope
                  },
                  { 
                    title: 'Push Notifications',
                    desc: 'Receive push notifications on your devices',
                    icon: FaBell
                  },
                  { 
                    title: 'SMS Notifications',
                    desc: 'Receive text messages for important updates',
                    icon: FaPhone
                  },
                  { 
                    title: 'Desktop Notifications',
                    desc: 'Show notifications on your desktop',
                    icon: FaDesktop
                  }
                ].map(({ title, desc, icon: Icon }) => (
                  <motion.div 
                    key={title} 
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Icon className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <input type="checkbox" className="toggle-checkbox" />
                      <div className="toggle-switch"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Notification Preferences */}
              <div className="mt-8 space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Notification Frequency</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <motion.div 
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="flex items-center gap-2">
                      <input type="radio" name="frequency" className="form-radio text-blue-600" />
                      <span className="text-gray-800 dark:text-white">Real-time</span>
                    </label>
                  </motion.div>
                  <motion.div 
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="flex items-center gap-2">
                      <input type="radio" name="frequency" className="form-radio text-blue-600" />
                      <span className="text-gray-800 dark:text-white">Daily Digest</span>
                    </label>
                  </motion.div>
                  <motion.div 
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="flex items-center gap-2">
                      <input type="radio" name="frequency" className="form-radio text-blue-600" />
                      <span className="text-gray-800 dark:text-white">Weekly Summary</span>
                    </label>
                  </motion.div>
                  <motion.div 
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="flex items-center gap-2">
                      <input type="radio" name="frequency" className="form-radio text-blue-600" />
                      <span className="text-gray-800 dark:text-white">Important Only</span>
                    </label>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Section */}
          {activeTab === 'email' && (
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl p-8"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800 dark:text-white">
                <FaEnvelope className="text-blue-600" />
                Email Settings
              </h2>

              <div className="space-y-8">
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaEnvelope className="inline mr-2 text-blue-600" /> Primary Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaEnvelope className="inline mr-2 text-blue-600" /> Recovery Email
                  </label>
                  <input
                    type="email"
                    placeholder="recovery@email.com"
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Email Preferences</h3>
                  <div className="grid gap-4">
                    {[
                      'Marketing Emails',
                      'Product Updates',
                      'Security Alerts',
                      'Newsletter Subscription'
                    ].map((pref) => (
                      <motion.div 
                        key={pref}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-gray-800 dark:text-white">{pref}</span>
                        <div className="relative">
                          <input type="checkbox" className="toggle-checkbox" />
                          <div className="toggle-switch"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Password Section */}
          {activeTab === 'password' && (
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl p-8"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800 dark:text-white">
                <FaLock className="text-blue-600" />
                Password Settings
              </h2>

              <div className="space-y-8">
                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaKey className="inline mr-2 text-blue-600" /> Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaKey className="inline mr-2 text-blue-600" /> New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaCheckCircle className="inline mr-2 text-blue-600" /> Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                </motion.div>

                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Password Requirements:</h3>
                  <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Minimum 8 characters</li>
                    <li>• At least one uppercase letter</li>
                    <li>• At least one number</li>
                    <li>• At least one special character</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Theme Section */}
          {activeTab === 'theme' && (
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl p-8"
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800 dark:text-white">
                <FaPalette className="text-blue-600" />
                Theme Settings
              </h2>
                <div className="space-y-8">
                {/* Theme Selection */}
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                          <FaSun className="text-2xl text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Light Mode</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Classic light theme</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="theme"
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-3">
                      <div className="grid grid-cols-3 gap-2">
                        {['#FFFFFF', '#F3F4F6', '#E5E7EB'].map((color) => (
                          <div
                            key={color}
                            className="h-8 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-900 rounded-lg">
                          <FaMoon className="text-2xl text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">Dark Mode</h3>
                          <p className="text-sm text-gray-400">Easier on the eyes</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="theme"
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <div className="grid grid-cols-3 gap-2">
                        {['#1F2937', '#374151', '#4B5563'].map((color) => (
                          <div
                            key={color}
                            className="h-8 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 backdrop-blur rounded-lg">
                          <FaDesktop className="text-2xl text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">System Default</h3>
                          <p className="text-sm text-white/80">Match your system theme</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="theme"
                        className="form-radio h-5 w-5 text-white border-white"
                        defaultChecked
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Color Customization */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Accent Color</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {[
                      { color: 'bg-blue-500', name: 'Blue' },
                      { color: 'bg-purple-500', name: 'Purple' },
                      { color: 'bg-green-500', name: 'Green' },
                      { color: 'bg-red-500', name: 'Red' },
                      { color: 'bg-yellow-500', name: 'Yellow' }
                    ].map(({ color, name }) => (
                      <motion.button
                        key={name}
                        className={`${color} w-full h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="sr-only">{name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Font Size</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="12"
                      max="24"
                      defaultValue="16"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Small</span>
                      <span>Default</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Global Save Button */}
          <motion.button
            type="submit"
            className="w-full p-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-blue-500/30"
            whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgb(59 130 246 / 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSave className="text-xl" /> Save Changes
          </motion.button>
        </div>
      </motion.div>
    </div>
)}
    
  
    </div>
      
  );
};

export default TeacherDashboard;
