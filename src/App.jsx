import React, { useState, useEffect } from "react";
import { RiSearchLine, RiNotificationLine, RiCloseLine, RiMenuLine, RiChatSmileLine,RiChatQuoteLine ,RiArrowRightLine} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher, FaChalkboard,FaBookOpen,FaLinkedin,FaTwitter,FaEnvelope ,FaCalendarAlt,FaUser} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { 
  FaGraduationCap, FaBook, FaCog, FaMedkit, FaClipboardList, FaUniversity,
  FaLaptopCode, FaPalette, FaChartLine, FaShoppingCart, FaCode, FaMobile,
  FaShieldAlt, FaRobot, FaLanguage, FaPen, FaGlobe, FaLandmark,
  FaMedal, FaUserShield, FaSchool, FaCalculator, FaChartBar, FaRocket,
  FaClock, FaMicrophone, FaCrown, FaCompass, FaQuran, FaMosque, FaMoneyBillWave,FaYoutube,FaFacebook
} from 'react-icons/fa';
import Slider from "react-slick";
import CountUp from "react-countup";
import "slick-carousel/slick/slick.css";
import {Link} from "react-router-dom"
import pakistanCities from "./pakistanCities";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  // 1. Academic Courses (School & College)
  { title: "Matric & Intermediate", description: "Science, Arts, and Commerce subjects for school & college level.", icon: <FaGraduationCap className="text-2xl text-blue-600" /> },
  { title: "O-Level & A-Level", description: "Cambridge & Federal Board curriculum studies.", icon: <FaBook className="text-2xl text-indigo-600" /> },
  { title: "Engineering Entrance Exams", description: "ECAT, NUST, PIEAS, GIKI preparation.", icon: <FaCog className="text-2xl text-gray-700" /> },
  { title: "Medical Entrance Exams", description: "MDCAT, NUMS, AKU entrance test prep.", icon: <FaMedkit className="text-2xl text-red-600" /> },
  { title: "CSS & FPSC Preparation", description: "Civil services competitive exams prep.", icon: <FaClipboardList className="text-2xl text-green-600" /> },
  { title: "Bachelors & Masters", description: "University-level education for BS, MS, MBA, and more.", icon: <FaUniversity className="text-2xl text-purple-600" /> },

  // 2. Professional & Skill-Based Courses
  { title: "Freelancing", description: "Learn to earn via Fiverr, Upwork, and others.", icon: <FaLaptopCode className="text-2xl text-blue-500" /> },
  { title: "Graphic Designing", description: "Master Photoshop, Illustrator, Canva etc.", icon: <FaPalette className="text-2xl text-pink-600" /> },
  { title: "Digital Marketing", description: "SEO, Facebook & Google Ads, SMM skills.", icon: <FaChartLine className="text-2xl text-green-500" /> },
  { title: "E-commerce", description: "Amazon, Daraz, Shopify, and dropshipping.", icon: <FaShoppingCart className="text-2xl text-orange-600" /> },
  { title: "Web Development", description: "HTML, CSS, JS, React, Laravel, WordPress.", icon: <FaCode className="text-2xl text-indigo-500" /> },
  { title: "App Development", description: "Flutter, React Native, Android & iOS.", icon: <FaMobile className="text-2xl text-blue-600" /> },
  { title: "Cyber Security", description: "Ethical hacking and online safety.", icon: <FaShieldAlt className="text-2xl text-red-500" /> },
  { title: "Data Science & AI", description: "Python, Machine Learning, AI tools.", icon: <FaRobot className="text-2xl text-purple-500" /> },

  // 3. Language & Communication Courses
  { title: "English Language", description: "IELTS, TOEFL, and spoken English training.", icon: <FaLanguage className="text-2xl text-blue-500" /> },
  { title: "Urdu & Pashto Writing", description: "Improve writing skills in native languages.", icon: <FaPen className="text-2xl text-green-600" /> },
  { title: "Foreign Languages", description: "Learn Chinese, French, German and more.", icon: <FaGlobe className="text-2xl text-teal-600" /> },

  // 4. Government & Competitive Exam Preparation
  { title: "Government Exams", description: "CSS, PMS, FPSC, PPSC, SPSC and more.", icon: <FaLandmark className="text-2xl text-gray-700" /> },
  { title: "Military Test Prep", description: "Preparation for ISSB and military tests.", icon: <FaMedal className="text-2xl text-yellow-600" /> },
  { title: "Police & Agencies Prep", description: "FIA, ASF, NAB and other agencies prep.", icon: <FaUserShield className="text-2xl text-blue-700" /> },
  { title: "University Entry Tests", description: "Entry tests for LUMS, IBA, FAST, GIKI etc.", icon: <FaSchool className="text-2xl text-purple-600" /> },

  // 5. Business & Finance
  { title: "Accounting & Finance", description: "QuickBooks, Excel, SAP, and more.", icon: <FaCalculator className="text-2xl text-green-700" /> },
  { title: "Stock & Crypto Trading", description: "Learn investment and trading strategies.", icon: <FaChartBar className="text-2xl text-blue-600" /> },
  { title: "Entrepreneurship", description: "Start your own business with confidence.", icon: <FaRocket className="text-2xl text-orange-600" /> },

  // 6. Personal Development
  { title: "Time Management", description: "Boost productivity and manage time wisely.", icon: <FaClock className="text-2xl text-indigo-600" /> },
  { title: "Public Speaking", description: "Master communication and speaking skills.", icon: <FaMicrophone className="text-2xl text-red-600" /> },
  { title: "Leadership", description: "Lead teams and develop leadership qualities.", icon: <FaCrown className="text-2xl text-yellow-600" /> },
  { title: "Career Counseling", description: "Job interview and career development guide.", icon: <FaCompass className="text-2xl text-blue-500" /> },

  // 7. Islamic & Religious Studies
  { title: "Quran & Tajweed", description: "Learn proper recitation and understanding of the Quran.", icon: <FaQuran className="text-2xl text-green-600" /> },
  { title: "Islamic Finance", description: "Learn Sharia-compliant banking and finance.", icon: <FaMoneyBillWave className="text-2xl text-green-700" /> }
];

const teachers = [
  { name: "John Doe", subject: "Mathematics", image: "https://media.istockphoto.com/id/1336324740/photo/having-fun-at-a-garden-party.jpg?s=612x612&w=0&k=20&c=r5iNGwCyH-6ENsCVz7FuyDEJ-Pnokaz-af84Qa28-6E=" },
  { name: "Jane Smith", subject: "Science", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4D8S678Eknda5bH9rwRovirTWlrvH8AD0g&s" },
  { name: "Alice Johnson", subject: "Literature", image: "https://directenglish.com.sa/wp-content/uploads/2017/03/random-person.jpg" },
  { name: "Michael Brown", subject: "History", image: "https://img.freepik.com/free-photo/cheerful-guy-enjoying-outdoor-coffee-break_1262-20005.jpg" },
  { name: "Emily Davis", subject: "Art", image: "https://img.freepik.com/free-photo/handsome-man-home_144627-9257.jpg" },
  { name: "Daniel Wilson", subject: "Physics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS56tW1Fj5O0RGgRDgrnaEpeabb4rCfNYr7cBEcvqE2CksaVQ0tTsrbG295m1XH0HCzVjg&usqp=CAU" },
];

// Placeholder components
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Notification = ({ message, type }) => (
  <div className={`fixed top-4 right-4 p-4 rounded-lg ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
    {message}
  </div>
);

const Tooltip = () => <div></div>;

// Updated Section Components
const PromotionBanner = ({ setShowLoginModal }) => (
  <section className="py-20 fonting bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Section Heading */}
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in-up">
      Unlock Exclusive Learning Opportunities
    </h2>

    {/* Section Subheading */}
    <p className="text-lg md:text-2xl mb-8 text-gray-300 animate-fade-in-up delay-100">
      Sign up today and get access to premium courses and resources.
    </p>

    {/* Sign Up Button */}
    <motion.button
      onClick={() => setShowLoginModal(true)}
      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-lg md:text-xl font-bold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Sign Up Now
    </motion.button>
  </div>
</section>
);

const StatsSection = () => (
  <section className="py-20 fonting bg-gradient-to-br from-gray-800 to-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
        Our Impact
      </h2>
      <p className="text-xl text-gray-300 animate-fade-in-up delay-100">
        Transforming lives through education and innovation
      </p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        { number: 100000, label: "Students Enrolled", icon: FaUserGraduate },
        { number: 5000, label: "Expert Teachers", icon: FaChalkboardTeacher },
        { number: 10000, label: "Classes Conducted", icon: FaChalkboard },
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10, scale: 1.03 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="relative bg-gray-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
        >
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

          {/* Stat Icon */}
          <stat.icon className="text-yellow-500 text-6xl mb-6 mx-auto" />

          {/* Stat Number */}
          <CountUp
            end={stat.number}
            duration={2.5}
            separator=","
            className="text-5xl font-bold text-yellow-500"
          />

          {/* Stat Label */}
          <p className="text-xl text-gray-300 mt-4">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
);

const SelectArrow = () => (
  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
    <div className="bg-blue-500/10 rounded-full p-1 transition-all duration-200 group-hover:bg-blue-500/20">
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);
const CategorySection = () => (
  <section className="py-24 bg-gradient-to-br from-purple-50/90 via-white to-indigo-50/90 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Enhanced Section Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="text-sm font-bold text-purple-600 tracking-wider uppercase mb-4 block">
          Educational Categories
        </span>
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-800 
          bg-clip-text text-transparent mb-6 leading-tight">
          Explore Categories
        </h2>
        <p className="text-xl text-gray-600/90 max-w-2xl mx-auto font-medium">
          Discover a wide range of topics to enhance your skills and knowledge
        </p>
      </motion.div>

      {/* Enhanced Categories Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
  {categories.map((category, index) => (
    <motion.div
      key={index}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className="group relative"
    >
      {/* Card Container with Glass Effect */}
      <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl
        shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] 
        hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.15)]
        transition-all duration-500 overflow-hidden
        border border-purple-100/50">
        
        {/* Gradient Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-indigo-600/5 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-pink-500/5 
          rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110"></div>
        
        {/* Category Icon with Enhanced Animation */}
        <div className="relative mb-12 inline-block scale-125">
          <div className="absolute inset-0 bg-purple-600/10 rounded-2xl blur-2xl group-hover:blur-3xl 
            transition-all duration-500 scale-75 group-hover:scale-110"></div>
          <div className="relative transform group-hover:scale-110 group-hover:rotate-3 
            transition-transform duration-500" style={{ fontSize: "12rem" }}>
            {category.icon}
          </div>
        </div>

        {/* Category Content */}
        <div className="relative">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-900 to-indigo-800 
            bg-clip-text text-transparent mb-4 group-hover:translate-x-1 transition-transform duration-300">
            {category.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed group-hover:translate-x-1 
            transition-transform duration-300">
            {category.description}
          </p>

          {/* Hover Arrow */}
          <div className="mt-6 flex items-center text-purple-600 font-semibold opacity-0 
            group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 
            transition-all duration-300">
            Explore More
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>
    </div>

    {/* Add CSS for Background Pattern */}
    <style jsx>{`
      .bg-grid-pattern {
        background-image: 
          linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
        background-size: 4rem 4rem;
      }
    `}</style>
  </section>
);


// const TeachersSection = () => (
//   <section className="py-20 fonting bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       {/* Section Heading */}
//       <div className="text-center mb-16">
//         <h2 className="text-5xl font-extrabold text-indigo-900 mb-4">Meet Our Teachers</h2>
//         <p className="text-xl text-gray-600">Passionate educators dedicated to your child's success</p>
//       </div>

//       {/* Teachers Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//         {featuredTeachers.map((teacher, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ y: -10, scale: 1.02 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center relative overflow-hidden"
//           >
//             {/* Gradient Border */}
//             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500"></div>

//             {/* Teacher Image */}
//             <img 
//               src={teacher.profilePicture} 
//               alt={teacher.fullName} 
//               className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-purple-100 object-cover"
//             />

//             {/* Teacher Name */}
//             <h3 className="text-2xl font-bold text-indigo-900 mb-2">{teacher.fullName}</h3>

//             {/* Teacher Subject */}
//             <p className="text-lg text-blue-600 font-medium mb-4">{teacher.subject}</p>

//             {/* Optional: Teacher Description */}
//             <p className="text-gray-600 text-sm leading-relaxed">
//               {teacher.description || "Passionate about inspiring young minds and fostering creativity."}
//             </p>

//             {/* Social Links (Optional) */}
//             <div className="mt-6 flex justify-center space-x-4">
//               <a href={teacher.social?.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
//                 <FaLinkedin className="w-6 h-6" />
//               </a>
//               <a href={teacher.social?.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
//                 <FaTwitter className="w-6 h-6" />
//               </a>
//               <a href={teacher.social?.email} className="text-gray-400 hover:text-red-500 transition-colors">
//                 <FaEnvelope className="w-6 h-6" />
//               </a>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   </section>
// );



const ParentResources = () => (
<section className="py-20 fonting bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-extrabold text-purple-900 mb-4 animate-fade-in-up">
        Parent Resources
      </h2>
      <p className="text-xl text-gray-600 animate-fade-in-up delay-100">
        Empowering parents with tools and knowledge for their child's success
      </p>
    </div>

    {/* Resources Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {[
        { title: "How to Support Your Child's Learning", link: "#", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRiYn0Vs9yBPyJosLjMwDfmJD6UUoQtPU6aQ&s" },
        { title: "Tips for Effective Online Learning", link: "#", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwPEL_TtKr4dCMc-4RDBkHXJHmMZ4cb_o5rw&s" },
        { title: "Understanding Your Child's Progress", link: "#", image: "https://c4.wallpaperflare.com/wallpaper/1018/272/852/children-school-desk-laptop-wallpaper-preview.jpg" },
        { title: "Creating a Positive Learning Environment", link: "#", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnClDQ4KO3PtnkDuZSfxUNsJBtrkBACkJmMg&s" },
        { title: "Balancing Screen Time and Play", link: "#", image: "https://www.shutterstock.com/image-photo/kid-reading-book-child-school-600nw-2477317791.jpg" },
        { title: "Engaging Educational Activities", link: "#", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8IG6O0ggBLzqQs_ih1sz3CYVpvoS8IDX2SA&s" },
      ].map((resource, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10, scale: 1.03 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
        >
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

          {/* Resource Image */}
          <div className="relative overflow-hidden rounded-t-3xl">
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Resource Title */}
          <h3 className="relative text-2xl font-bold text-purple-900 mb-4 mt-6">
            {resource.title}
          </h3>

          {/* Learn More Link */}
          <a
            href={resource.link}
            className="relative inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold text-lg transition-colors duration-300"
          >
            Learn More
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      ))}
    </div>
  </div>
</section>

);

const Footer = () => (
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

);

const FeaturedCourseCard = ({ course }) => (
  <motion.div
  whileHover={{ scale: 1.05 }}
  className="bg-white p-8 fonting rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
>
  {/* Course Image */}
  <motion.div
    className="relative overflow-hidden rounded-t-3xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
  </motion.div>

  {/* Course Title */}
  <div className="flex items-center mt-6 mb-4">
    <FaBookOpen className="text-indigo-500 text-3xl mr-3" />
    <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
  </div>

  {/* Course Description */}
  <p className="text-gray-700 mb-6 leading-relaxed">{course.description}</p>

  {/* Course Details */}
  <div className="text-gray-600 mb-6 space-y-2">
    <p className="flex items-center">
      <FaClock className="text-indigo-500 mr-2" />
      <strong>Duration:</strong> {course.duration}
    </p>
    <p className="flex items-center">
      <FaUser className="text-indigo-500 mr-2" />
      <strong>Instructor:</strong> {course.instructor}
    </p>
  </div>

  {/* Enroll Button */}
  <motion.button
    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
    whileHover={{ scale: 1.05 }}
  >
    Enroll Now
  </motion.button>
</motion.div>
);
const provincesWithCities = {
  Punjab: [
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Multan",
    "Sargodha",
    "Bahawalpur",
    "Sialkot",
    "Sheikhupura",
    "Rahim Yar Khan",
    "Jhang",
    "Sahiwal",
    "Gujrat",
    "Okara",
    "Dera Ghazi Khan",
    "Muzaffargarh",
    "Kasur",
    "Chiniot",
    "Toba Tek Singh",
    "Bahawalnagar",
    "Vehari",
    "Mianwali",
    "Lodhran",
    "Khanewal",
    "Bhakkar",
    "Layyah",
    "Narowal",
    "Pakpattan",
    "Khushab",
    "Hafizabad",
    "Mandi Bahauddin",
    "Jhelum",
    "Attock",
    "Nankana Sahib",
    "Chakwal",
    "Rajana",
    "Kamoke",
    "Daska",
    "Sambrial",
    "Shorkot",
    "Jaranwala",
    "Shujabad",
    "Kabirwala",
    "Kot Addu",
    "Kahror Pakka",
    "Fort Abbas",
    "Arifwala",
    "Burewala",
    "Dipalpur",
    "Mailsi",
    "Jalalpur Jattan",
    "Kamalia",
    "Pattoki",
    "Raiwind",
    "Chichawatni",
    "Pir Mahal",
    "Ahmedpur East",
    "Jampur",
    "Rajanpur",
    "Taunsa",
    "Kotli Loharan",
    "Kharian",
    "Muridke",
    "Wazirabad",
    "Lalamusa",
    "Tandlianwala",
    "Hasilpur",
    "Haroonabad",
    "Ferozewala",
    "Kot Radha Kishan",
    "Kot Momin",
    "Dinga",
    "Dina",
    "Gojra",
    "Jauharabad",
    "Jatoi",
    "Kundian",
    "Lalian",
    "Mamu Kanjan",
    "Minchinabad",
    "Pind Dadan Khan",
    "Pindi Bhattian",
    "Renala Khurd",
    "Sarai Alamgir",
    "Shahkot",
    "Shahpur",
    "Sillanwali",
    "Talagang",
    "Yazman",
    "Zafarwal"
  ],
  Sindh: [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Nawabshah",
    "Mirpur Khas",
    "Jacobabad",
    "Shikarpur",
    "Khairpur",
    "Dadu",
    "Thatta",
    "Umerkot",
    "Ghotki",
    "Tando Allahyar",
    "Tando Adam",
    "Tando Muhammad Khan",
    "Matiari",
    "Jamshoro",
    "Kashmore",
    "Kandhkot",
    "Kotri",
    "Badin",
    "Sanghar",
    "Naushahro Feroze",
    "Qambar Shahdadkot",
    "Sujawal",
    "Tharparkar",
    "Mithi",
    "Islamkot",
    "Chachro",
    "Diplo",
    "Mirpur Mathelo",
    "Rohri",
    "Pano Aqil",
    "Mehrabpur",
    "Hala",
    "Sehwan",
    "Ratodero",
    "Gambat",
    "Garhi Yasin",
    "Kandiaro",
    "Bulri Shah Karim",
    "Daur",
    "Dokri",
    "Digri",
    "Samaro",
    "Keti Bandar",
    "Jungshahi"
  ],
  KPK: [
    "Peshawar",
    "Mardan",
    "Mingora",
    "Kohat",
    "Abbottabad",
    "Dera Ismail Khan",
    "Swabi",
    "Mansehra",
    "Nowshera",
    "Charsadda",
    "Bannu",
    "Haripur",
    "Chitral",
    "Batkhela",
    "Dir",
    "Timergara",
    "Tank",
    "Hangu",
    "Buner",
    "Shangla",
    "Lakki Marwat",
    "Karak",
    "Upper Dir",
    "Lower Dir",
    "Swat",
    "Malakand",
    "Kurram",
    "Orakzai",
    "South Waziristan",
    "North Waziristan",
    "Torghar",
    "Kolai-Palas",
    "Lower Kohistan",
    "Upper Kohistan",
    "Battagram",
    "Shangla",
    "Tangi",
    "Zaida",
    "Akora Khattak",
    "Alpuri",
    "Ayubia",
    "Banda Daud Shah",
    "Barikot",
    "Birote",
    "Chakdara",
    "Daggar",
    "Dargai",
    "Doaba",
    "Drosh",
    "Kulachi",
    "Lachi",
    "Matta",
    "Pabbi",
    "Parachinar",
    "Shabqadar",
    "Shangla",
    "Topi",
    "Utmanzai"
  ],
  Balochistan: [
    "Quetta",
    "Turbat",
    "Khuzdar",
    "Hub",
    "Panjgur",
    "Chaman",
    "Gwadar",
    "Sibi",
    "Zhob",
    "Loralai",
    "Dera Murad Jamali",
    "Dera Allah Yar",
    "Kalat",
    "Mastung",
    "Nushki",
    "Kharan",
    "Washuk",
    "Awaran",
    "Killa Abdullah",
    "Killa Saifullah",
    "Barkhan",
    "Musakhel",
    "Ziarat",
    "Pishin",
    "Qila Saifullah",
    "Qila Abdullah",
    "Lasbela",
    "Awaran",
    "Bolan",
    "Chagai",
    "Duki",
    "Harnai",
    "Jafarabad",
    "Jhal Magsi",
    "Kachhi",
    "Kech",
    "Lehri",
    "Sherani",
    "Sohbatpur",
    "Surab",
    "Toba Kakri",
    "Usta Muhammad",
    "Zhob",
    "Ziarat"
  ],
  GilgitBaltistan: [
    "Gilgit",
    "Skardu",
    "Hunza",
    "Diamer",
    "Ghanche",
    "Ghizer",
    "Astore",
    "Shigar",
    "Nagar",
    "Khaplu",
    "Dambudas",
    "Tolti",
    "Eidghah",
    "Juglot",
    "Danyor",
    "Karimabad",
    "Aliabad",
    "Chilas",
    "Ishkoman",
    "Gupis",
    "Yasin",
    "Gojal",
    "Sost",
    "Passu",
    "Kharmang",
    "Roundu"
  ],
  AJK: [
    "Muzaffarabad",
    "Mirpur",
    "Kotli",
    "Bhimber",
    "Rawalakot",
    "Bagh",
    "Neelum",
    "Haveli",
    "Sudhnoti",
    "Hattian Bala",
    "Pallandri",
    "Athmuqam",
    "Forward Kahuta",
    "Fatehpur Thakiala",
    "Garhi Dupatta",
    "Hajira",
    "Dadyal",
    "Dhirkot",
    "Chakswari",
    "Charhoi",
    "Chikkar",
    "Samahni",
    "Sehnsa",
    "Khuiratta",
    "Nakyal"
  ],
  Islamabad: [
    "Islamabad"
  ]
};


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [showSearch, setShowSearch] = useState(false);
     const [featuredTeachers, setFeaturedTeachers] = useState([]);
        const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const navigate = useNavigate();
    const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

const SearchClassesForm = ({
  selectedSubject,
  setSelectedSubject,
  selectedAge,
  setSelectedAge,
  selectedTime,
  setSelectedTime,
  selectedProvince,
  setSelectedProvince,
  selectedCity,
  setSelectedCity,
  enhancedSubjects,
  provincesWithCities
}) => {
  // Define onSearch function here
  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log({
      subject: selectedSubject,
      age: selectedAge,
      time: selectedTime,
      province: selectedProvince,
      city: selectedCity
    });
  };
}
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Common styles
  const selectClassName = `
    w-full p-4 rounded-xl text-gray-700 border-2 border-gray-200 
    bg-white/95 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
    focus:border-blue-500 hover:border-blue-400 transition-all 
    appearance-none shadow-sm group-hover:shadow-lg 
    group-hover:bg-blue-50/50
  `;

  const labelClassName = `
    flex items-center text-sm font-medium text-gray-700 mb-2 ml-1
  `;
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
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    if (province && provincesWithCities[province]) {
      setSelectedProvince(province);
      setShowCities(true); // Show cities only if valid province
    } else {
      setShowCities(false);
    }
    setSelectedCity("");
  };
const enhancedSubjects = [
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

  

  // Enhanced Navbar Component
  const EnhancedNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
 


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
const TeachersSection = () => {
  return (
    <section className="py-20 fonting bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-indigo-900 mb-4">Meet Our Teachers</h2>
          <p className="text-xl text-gray-600">Passionate educators dedicated to your child's success</p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {featuredTeachers.map((teacher, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center relative overflow-hidden"
            >
              {/* Gradient Border */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500"></div>

              {/* Teacher Image */}
              <img 
                src={teacher.profilePicture} 
                alt={teacher.fullName} 
                className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-purple-100 object-cover"
              />

              {/* Teacher Name */}
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">{teacher.fullName}</h3>

              {/* Teacher Subject */}
              <p className="text-lg text-blue-600 font-medium mb-4">{teacher.specialization}</p>

              {/* Optional: Teacher Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {teacher.bio || "Passionate about inspiring young minds and fostering creativity."}
              </p>

              {/* Social Links */}
              <div className="mt-6 flex justify-center space-x-4">
                <a href={teacher.social?.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href={teacher.social?.facebook} className="text-gray-400 hover:text-blue-600 transition-colors">
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a href={teacher.social?.youtube} className="text-gray-400 hover:text-red-600 transition-colors">
                  <FaYoutube className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



  // Enhanced Hero Section Component
  const EnhancedHeroSection = () => (
    <div className="py-20 relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://www.eui.eu/Content-Types-Assets/Web-Unit/Conferring-ceremony-2023.xa86ef5cb.jpg?crop=1920,1080,0,153')" }}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
    
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 py-8">
  {/* Main Heading with enhanced styling */}
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl"
  >
    Transform Your Child's Future Through{" "}
    <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
      Interactive Learning
    </span>
  </motion.h1>

  {/* Subheading with improved visibility */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-blue-100 max-w-3xl mx-auto"
  >
    Join thousands of students worldwide in live online classes taught by expert instructors
  </motion.p>

  {/* Search Box with enhanced design */}
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto border border-white/20"
>
<div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    {/* Subject Select */}
    <div className="relative group">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2 ml-1">
        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Subject
      </label>
      <div className="relative">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full p-4 rounded-xl text-gray-700 border-2 border-gray-200 bg-white/95
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                   hover:border-blue-400 transition-all appearance-none shadow-sm
                   group-hover:shadow-lg group-hover:bg-blue-50/50"
        >
          <option value="" className="text-gray-500">Choose a subject</option>
          {Array.isArray(enhancedSubjects) && enhancedSubjects.map((subject) => (
            <option key={subject.name} value={subject.name} className="text-gray-700">
              {subject.name}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-blue-500/10 rounded-full p-1 transition-all duration-200 group-hover:bg-blue-500/20">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Age Group Select */}
    <div className="relative group">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2 ml-1">
        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Age Group
      </label>
      <div className="relative">
        <select
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="w-full p-4 rounded-xl text-gray-700 border-2 border-gray-200 bg-white/95
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                   hover:border-blue-400 transition-all appearance-none shadow-sm
                   group-hover:shadow-lg group-hover:bg-blue-50/50"
        >
          <option value="" className="text-gray-500">Select age range</option>
          {[
            { value: "4-6", label: "4-6 years (Primary)" },
            { value: "7-9", label: "7-9 years (Elementary)" },
            { value: "10-12", label: "10-12 years (Middle)" },
            { value: "13-15", label: "13-15 years (High School)" },
            { value: "16+", label: "16+ years (Advanced)" }
          ].map((age) => (
            <option key={age.value} value={age.value}>{age.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-blue-500/10 rounded-full p-1 transition-all duration-200 group-hover:bg-blue-500/20">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Time Select - Newly Added */}
    <div className="relative group">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2 ml-1">
        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Time
      </label>
      <div className="relative">
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full p-4 rounded-xl text-gray-700 border-2 border-gray-200 bg-white/95
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                   hover:border-blue-400 transition-all appearance-none shadow-sm
                   group-hover:shadow-lg group-hover:bg-blue-50/50"
        >
          <option value="">Select time of day</option>
          {[
            { value: "morning", label: "Morning (6 AM - 12 PM)" },
            { value: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
            { value: "evening", label: "Evening (4 PM - 8 PM)" },
            { value: "night", label: "Night (8 PM - 12 AM)" }
          ].map((time) => (
            <option key={time.value} value={time.value}>
              {time.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-blue-500/10 rounded-full p-1 transition-all duration-200 group-hover:bg-blue-500/20">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Location Selection */}
    <div className="relative group">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2 ml-1">
        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Location
      </label>
      <div className="space-y-3">
        <div className="relative">
          <select
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedCity("");
            }}
            className="w-full p-4 rounded-xl text-gray-700 border-2 border-gray-200 bg-white/95
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                     hover:border-blue-400 transition-all appearance-none shadow-sm
                     group-hover:shadow-lg group-hover:bg-blue-50/50"
          >
            <option value="">Select province</option>
            {Object.keys(provincesWithCities).map((province) => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-blue-500/10 rounded-full p-1 transition-all duration-200 group-hover:bg-blue-500/20">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {selectedProvince && (
          <div className="relative animate-fadeIn">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-4 rounded-xl text-gray-700 border-2 border-gray-200 bg-white/95
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                       hover:border-blue-400 transition-all appearance-none shadow-sm
                       group-hover:shadow-lg group-hover:bg-blue-50/50"
            >
              <option value="">Select city</option>
              {provincesWithCities[selectedProvince]?.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-blue-500/10 rounded-full p-1 transition-all duration-200 group-hover:bg-blue-500/20">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Search Button */}
    <div className="relative group flex items-end">
      <button 
        className="w-full p-4 rounded-xl text-white font-medium
                   bg-gradient-to-r from-blue-500 to-indigo-600
                   hover:from-blue-600 hover:to-indigo-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50
                   transition-all duration-300 transform hover:scale-[1.02]
                   shadow-lg hover:shadow-xl active:scale-[0.98]
                   flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search Classes</span>
        
        {/* Animated particles on hover */}
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
        </div>
      </button>
    </div>
  </div>
</div>
</motion.div>

  {/* Stats with enhanced design */}
  <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
    {[
      { number: 5000, label: "Students", icon: "👨‍🎓" },
      { number: 1000, label: "Teachers", icon: "👩‍🏫" },
      { number: 10000, label: "Classes", icon: "📚" },
      { number: 240, label: "Cities", icon: "🌍" },
    ].map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 + index * 0.2, ease: "easeOut" }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
          <div className="text-4xl mb-2">{stat.icon}</div>
          <CountUp
            end={stat.number}
            duration={2.5}
            separator=","
            className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
          />
          <p className="text-lg font-medium text-blue-100">{stat.label}</p>
        </div>
      </motion.div>
    ))}
  </div>
</div>
    </div>
  );


  // Featured Classes Component
  const FeaturedClasses = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

//     return (
//      <section className="py-16 bg-gray-50 fonting">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Featured Classes</h2>
    
//     {Array.isArray(enhancedSubjects) && 
//      enhancedSubjects.length > 0 && 
//      enhancedSubjects[0].trendingCourses ? (
//       <Slider {...settings}>
//         {enhancedSubjects[0].trendingCourses.map((course) => (
//           <div key={course.id} className="px-3">
//             <FeaturedCourseCard course={course} />
//           </div>
//         ))}
//       </Slider>
//     ) : (
//       <p className="text-center text-gray-500">Loading featured classes...</p>
//     )}
//   </div>
// </section>

//     );
  };

  // Testimonials Section Component
  const testimonials = [
    {
      text: "The personalized learning approach has made a remarkable difference in my child's academic performance. The progress tracking tools are invaluable!",
      author: "Sarah Johnson",
      role: "Parent of 2",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5
    },
    {
      text: "Exceptional platform! The interactive lessons keep my kids engaged, and the progress reports help me understand their learning journey better.",
      author: "Michael Chen",
      role: "Parent of 3",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5
    },
    {
      text: "The quality of education and support is outstanding. My children have shown significant improvement in their critical thinking skills.",
      author: "Emma Thompson",
      role: "Parent & Educator",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5
    },
    {
      text: "What sets this platform apart is the comprehensive curriculum and the excellent support system. It's been a game-changer for our family!",
      author: "David Wilson",
      role: "Single Parent",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 5
    },
    {
      text: "The flexibility of online learning combined with quality content has made education enjoyable for my kids. Highly recommended!",
      author: "Lisa Martinez",
      role: "Working Parent",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 5
    },
    {
      text: "I'm impressed by how engaging the lessons are. My children actually look forward to their study time now!",
      author: "James Anderson",
      role: "Parent of 2",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      rating: 5
    }
  ];
 
  // Call to Action Component
  

  return (
    <div className="bg-gray-50 min-h-screen">
      {isLoading && <LoadingSpinner />}
      <AnimatePresence>
        {showNotification && <Notification message="Success! Your action was completed." type="success" />}
      </AnimatePresence>

      <EnhancedNavbar />
      <EnhancedHeroSection />
      <PromotionBanner setShowLoginModal={setShowLoginModal} />
      <StatsSection />
      <CategorySection />
      <FeaturedClasses />
      <TeachersSection />
      {/* <UpcomingWebinars /> */}
      <ParentResources />
      
      <Footer />
      <Tooltip id="tooltip" />
    </div>
  );
}

export default App;