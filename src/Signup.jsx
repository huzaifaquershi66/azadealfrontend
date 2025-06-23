import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeacherForm from './Teacherform';
import AcademyForm from './Academyform';
import StudentForm from './Studentform';
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
const navigate = useNavigate()
  const roles = [
    {
      title: 'Teacher',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      type: 'teacher',
      description: 'Share your knowledge and expertise with students worldwide',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Academy',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      type: 'academy',
      description: 'Register your institution and manage your educational ecosystem',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Student',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      type: 'student',
      description: 'Begin your learning journey and unlock your potential',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
        <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-violet-100 to-purple-100 relative overflow-hidden font-inter">
      {/* Gorgeous animated pastel background glow */}
      <div className="absolute -inset-20 pointer-events-none z-0">
        <div className="w-full h-full rounded-[3rem] blur-3xl opacity-60 bg-gradient-to-br from-fuchsia-200 via-purple-100 to-violet-200 animate-gradient" />
      </div>
      {/* Soft grid overlay pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10 z-0"></div>
      {/* Login Button */}
      <div className="absolute top-8 right-10 z-10">
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-br from-fuchsia-700 via-purple-700 to-violet-700 cursor-pointer text-white px-8 py-3 rounded-xl shadow-xl hover:shadow-fuchsia-400/40 transition text-lg font-jakarta font-semibold tracking-wide"
        >
          Login
        </button>
      </div>
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-3xl mx-auto"
            >
              {/* Welcome */}
              <div className="text-center mb-20">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-700 via-fuchsia-600 to-violet-700 bg-clip-text text-transparent mb-6 font-jakarta tracking-tight drop-shadow-lg"
                >
                  Welcome to Azad Education
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl text-gray-700 max-w-2xl mx-auto font-inter font-medium"
                >
                  Choose your path and join our creative community of learners & educators.
                </motion.p>
              </div>
              {/* Role Cards */}
              <div className="space-y-8">
                {roles.map((role, index) => (
                  <motion.div
                    key={role.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.12 }}
                    whileHover={{ scale: 1.025, boxShadow: "0 12px 40px 0 rgba(180, 0, 200, 0.07)" }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedRole(role.type)}
                    className={`
                      group bg-white/90 rounded-3xl border border-purple-100 p-10 cursor-pointer
                      hover:border-transparent hover:ring-4 hover:ring-${role.color}-400/30
                      transition-all duration-300
                      hover:shadow-2xl hover:shadow-${role.color}-200/40
                    `}
                    style={{
                      boxShadow:
                        "0 4px 24px 0 rgba(127, 63, 152, 0.08), 0 1.5px 6px 0 rgba(150, 0, 200, 0.04)",
                    }}
                  >
                    <div className="flex items-center space-x-10">
                      <div className="flex-shrink-0">
                        <div
                          className={`
                            w-24 h-24 rounded-2xl bg-gradient-to-br ${role.gradient}
                            flex items-center justify-center text-white
                            transition-transform duration-300 transform
                            group-hover:scale-110 shadow-xl
                          `}
                        >
                          {role.icon}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-3xl font-jakarta font-bold text-gray-900 mb-2">
                          Get Started as a {role.title}
                        </h2>
                        <p className="text-lg text-gray-700 font-inter">{role.description}</p>
                      </div>
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="flex-shrink-0 self-center"
                      >
                        <div
                          className={`
                            w-14 h-14 rounded-full bg-${role.color}-50
                            flex items-center justify-center
                            text-${role.color}-600
                          `}
                        >
                          <FiChevronRight className="w-7 h-7" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/90 rounded-3xl border border-purple-100 shadow-2xl overflow-hidden">
                <div className="p-7 border-b border-purple-100 bg-gradient-to-r from-fuchsia-50 via-purple-50 to-violet-50">
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="inline-flex items-center text-base font-medium text-purple-500 hover:text-fuchsia-600 transition-colors duration-200 font-jakarta group"
                  >
                    <FiArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to selection
                  </button>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-10"
                >
                  {selectedRole === "teacher" && <TeacherForm />}
                  {selectedRole === "academy" && <AcademyForm />}
                  {selectedRole === "student" && <StudentForm />}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignupPage;
