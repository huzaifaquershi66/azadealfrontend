import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiMail, FiPhone, FiCalendar, FiBook, 
  FiUsers, FiMapPin, FiCamera, FiCheck, FiLock 
} from 'react-icons/fi';
import OtpInput from 'react-otp-input';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    currentGrade: '',
    parentName: '',
    parentPhone: '',
    address: '',
    profilePicture: null,
    submissionDate: '2025-02-14 03:09:38',
    submittedBy: 'huzaifa8883'
  });

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [verificationStep, setVerificationStep] = useState('phone'); // 'phone' or 'email'

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOtpModal(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
    }
  };

  const grades = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12'
  ];

  const inputClasses = "mt-1 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200";
  const labelClasses = "flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2";

  const OtpVerificationModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Verification Required
        </h3>
        <p className="text-gray-600 mb-6">
          Please enter the verification code sent to your {verificationStep === 'phone' ? 'phone' : 'email'}
        </p>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="w-4"></span>}
          renderInput={(props) => (
            <input
              {...props}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          )}
        />

        <div className="mt-6 space-y-4">
          <button
            onClick={() => {
              if (verificationStep === 'phone') {
                setVerificationStep('email');
                setOtp('');
              } else {
                // Handle successful verification
                setShowOtpModal(false);
              }
            }}
            className="w-full py-3 px-4 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
          >
            Verify Code
          </button>
          <button
            onClick={() => setShowOtpModal(false)}
            className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Didn't receive the code? {" "}
          <button className="text-violet-600 font-semibold hover:text-violet-700">
            Resend
          </button>
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-8 bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Student Registration
          </motion.h2>
          <p className="mt-2 text-gray-600">Join our academic community</p>
        </div>

        {/* Profile Picture Upload */}
        <div className="flex justify-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-violet-100 shadow-xl">
              {formData.profilePicture ? (
                <img
                  src={URL.createObjectURL(formData.profilePicture)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center">
                  <FiUser className="w-16 h-16 text-violet-300" />
                </div>
              )}
            </div>
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 p-2 bg-violet-600 text-white rounded-full shadow-lg cursor-pointer hover:bg-violet-700 transition-colors"
            >
              <FiCamera className="w-5 h-5" />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </motion.div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Basic Information */}
          <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
            <label className={labelClasses}>
              <FiUser className="text-violet-500" />
              Full Name
            </label>
            <input
              type="text"
              required
              className={inputClasses}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
            <label className={labelClasses}>
              <FiCalendar className="text-violet-500" />
              Date of Birth
            </label>
            <input
              type="date"
              required
              className={inputClasses}
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
          </motion.div>

          {/* Contact Information */}
          <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
            <label className={labelClasses}>
              <FiMail className="text-violet-500" />
              Email
            </label>
            <input
              type="email"
              required
              className={inputClasses}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
            <label className={labelClasses}>
              <FiPhone className="text-violet-500" />
              Phone Number
            </label>
            <input
              type="tel"
              required
              className={inputClasses}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (234) 567-8900"
            />
          </motion.div>

          {/* Academic Information */}
          <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
            <label className={labelClasses}>
              <FiBook className="text-violet-500" />
              Current Grade
            </label>
            <select
              required
              className={`${inputClasses} cursor-pointer`}
              value={formData.currentGrade}
              onChange={(e) => setFormData({ ...formData, currentGrade: e.target.value })}
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Parent Information */}
          <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
            <label className={labelClasses}>
              <FiUsers className="text-violet-500" />
              Parent/Guardian Name
            </label>
            <input
              type="text"
              required
              className={inputClasses}
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              placeholder="Enter parent/guardian name"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
            <label className={labelClasses}>
              <FiPhone className="text-violet-500" />
              Parent/Guardian Phone
            </label>
            <input
              type="tel"
              required
              className={inputClasses}
              value={formData.parentPhone}
              onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
              placeholder="+1 (234) 567-8900"
            />
          </motion.div>
        </div>

        {/* Address */}
        <motion.div whileHover={{ scale: 1.01 }} className="space-y-4">
          <label className={labelClasses}>
            <FiMapPin className="text-violet-500" />
            Residential Address
          </label>
          <textarea
            required
            rows={3}
            className={`${inputClasses} resize-none`}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter your complete residential address"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-violet-500/20 transition-all duration-200"
        >
          Register as Student
        </motion.button>
      </form>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {showOtpModal && <OtpVerificationModal />}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentForm;