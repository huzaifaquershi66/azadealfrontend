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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-6 right-6">
        <button 
          onClick={() => navigate('/login')} 
          className="bg-gray-900 cursor-pointer text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
        >
          Login
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-16">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6"
                >
                  Welcome to Azad Education
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                  Choose your path and join our growing community of learners and educators
                </motion.p>
              </div>

              <div className="space-y-6">
                {roles.map((role, index) => (
                  <motion.div
                    key={role.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole(role.type)}
                    className={`
                      group bg-white rounded-2xl border border-gray-200 p-8
                      hover:border-transparent hover:ring-2 hover:ring-${role.color}-500/50
                      transition-all duration-300 cursor-pointer
                      hover:shadow-2xl hover:shadow-${role.color}-100/50
                    `}
                  >
                    <div className="flex items-center space-x-8">
                      <div className="flex-shrink-0">
                        <div className={`
                          w-24 h-24 rounded-2xl bg-gradient-to-br ${role.gradient}
                          flex items-center justify-center text-white
                          transition-transform duration-300 transform
                          group-hover:scale-110 shadow-lg
                        `}>
                          {role.icon}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          Get Started as a {role.title}
                        </h2>
                        <p className="text-lg text-gray-600">
                          {role.description}
                        </p>
                      </div>
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="flex-shrink-0 self-center"
                      >
                        <div className={`
                          w-12 h-12 rounded-full bg-${role.color}-50
                          flex items-center justify-center
                          text-${role.color}-600
                        `}>
                          <FiChevronRight className="w-6 h-6" />
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900
                      transition-colors duration-200 group"
                  >
                    <FiArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to selection
                  </button>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-8"
                >
                  {selectedRole === 'teacher' && <TeacherForm />}
                  {selectedRole === 'academy' && <AcademyForm />}
                  {selectedRole === 'student' && <StudentForm />}
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