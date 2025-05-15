import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud,FiBriefcase, FiBook, FiLayers, FiBookOpen, FiUsers,FiClock, FiMonitor, FiDollarSign,FiUpload, FiFile, FiCheckCircle, FiX ,FiMail,FiPhone, FiCalendar, FiMapPin,FiUser,FiHome,FiCamera,FiHash,FiGlobe,FiMap,FiFlag,FiFileText,FiAward,FiLayout,  FiTrendingUp, 
  FiTarget, 
  FiLink ,
  FiImage, 
  FiClipboard

} from 'react-icons/fi';
import Select from 'react-select';

const AcademyForm = () => {
  const currentDate = new Date('2025-02-13T06:00:08Z');
  const currentUser = 'huzaifa8883';

  const [currentStep, setCurrentStep] = useState(1);
  const [isFocused, setIsFocused] = useState(false);

  const [formData, setFormData] = useState({
    // Institution Information
    academyName: '',
    email: '',
    phone: '',
    establishmentDate: '',
    registrationNumber: '',
    taxIdentificationNumber: '',
    website: '',
    instituteLogo: null,
    description: '',
    submissionDate: currentDate.toISOString(),
    submittedBy: currentUser,
  
    // Location & Contact Details
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    branchLocations: [], // Array of branch addresses
    contactPerson: {
      name: '',
      designation: '',
      email: '',
      phone: '',
    },
  
    // Academic Information
    educationLevels: [], // Primary, Secondary, Higher Secondary, etc.
    programsOffered: [], // Different programs/courses offered
    accreditations: [], // Educational board affiliations
    mediumOfInstruction: [], // English, Urdu, etc.
    facilities: [], // Library, Labs, Sports, etc.
    academicSessions: [],  // ✅ New field added
    educationModes: [], 
    
    // Administrative Details
    staffInformation: {
      totalTeachers: '',
      totalAdminStaff: '',
      teacherQualifications: [], // Required qualifications for teachers
    },
    operatingHours: {
      weekdays: {
        start: '',
        end: '',
      },
      weekends: {
        start: '',
        end: '',
      },
    },
    
    // Financial Information
    feeStructure: [
      {
        program: '',
        duration: '',
        tuitionFee: '',
        otherCharges: '',
      }
    ],
    scholarshipPrograms: [], // Available scholarship details
    
    // Documents
    documents: {
      registrationCertificate: null,
      taxDocuments: null,
      accreditationCertificates: [],
      facilitiesPhotos: [],
      staffCredentials: [],
      auditReports: [],
    },
  
    // Additional Information
    achievements: [], // Institution achievements
    rankings: [], // Institution rankings
    partnerships: [], // Educational partnerships
    extracurricularActivities: [], // Sports, clubs, etc.
    events: [], // Annual events, competitions
    
    // Social Media & Online Presence
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
    },
  
    // Policies
    policies: {
      admissionPolicy: '',
      attendancePolicy: '',
      examinationPolicy: '',
      disciplinaryPolicy: '',
      refundPolicy: '',
    },
  
    // Statistics
    statistics: {
      totalStudents: '',
      graduationRate: '',
      employmentRate: '',
      studentTeacherRatio: '',
      classSize: '',
    },
  
    // Future Plans
    developmentPlans: {
      shortTerm: '',
      longTerm: '',
      expansionPlans: '',
      upgradeProposals: '',
    }
  });
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  const inputClasses = "mt-2 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none font-medium text-gray-700";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1";
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: '0.75rem',
      borderColor: state.isFocused ? '#8b5cf6' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(139, 92, 246, 0.2)' : 'none',
      '&:hover': {
        borderColor: '#8b5cf6',
      },
      padding: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(8px)',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#8b5cf6' 
        : state.isFocused 
          ? '#f3f4f6' 
          : 'transparent',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: state.isSelected ? '#8b5cf6' : '#f3f4f6',
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#f3f4f6',
      borderRadius: '0.5rem',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#374151',
      fontWeight: 500,
    }),
    multiValueRemove: (base) => ({
      ...base,
      '&:hover': {
        backgroundColor: '#ef4444',
        color: 'white',
      },
    }),
  };
  const timingOptions = [
    { value: 'morning', label: '🌅 Morning (8 AM - 12 PM)' },
    { value: 'afternoon', label: '☀️ Afternoon (12 PM - 4 PM)' },
    { value: 'evening', label: '🌆 Evening (4 PM - 8 PM)' },
    { value: 'night', label: '🌙 Night (8 PM - 12 AM)' },
  ];

  const modeOptions = [
    { value: 'online', label: '💻 Online' },
    { value: 'physical', label: '🏫 Physical' },
    { value: 'both', label: '🔄 Both' },
  ];
  
  const steps = [
    { id: 1, title: "Personal Info", subtitle: "Basic Details" },
    { id: 2, title: "Education", subtitle: "Academic Background" },
    { id: 3, title: "Professional", subtitle: "Work Experience" },
    { id: 4, title: "Preferences", subtitle: "Teaching Details" },
    { id: 5, title: "Documents", subtitle: "Upload Files" }
  ];
  

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
    'Computer Science', 'History', 'Geography', 'Economics', 'Arts'
  ];

  const teachingLevels = [
    'Primary (1-5)',
    'Middle (6-8)',
    'Secondary (9-10)',
    'Higher Secondary (11-12)',
    'Undergraduate',
    'Graduate'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      // Name ke andar "." hai to usko nested object ki tarah handle karna hai
      const keys = name.split(".");
      let updatedData = { ...prev };
      let nested = updatedData;
  
      for (let i = 0; i < keys.length - 1; i++) {
        nested = nested[keys[i]];
      }
      
      nested[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };
  
  

  const handleFileUpload = (e, field) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (field === 'certificates' || field === 'documents') {
        // Handle multiple files
        const fileArray = Array.from(files);
        setFormData(prev => ({
          ...prev,
          [field]: [...(prev[field] || []), ...fileArray]
        }));
      } else {
        // Handle single file
        setFormData(prev => ({
          ...prev,
          [field]: files[0]
        }));
      }
    }
  };

  const handleMultiSelect = (e, field) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      try {
        const formDataToSubmit = new FormData();
        
        // Append basic form data
        Object.keys(formData).forEach(key => {
          if (key !== 'documents' && key !== 'certificates' && 
              key !== 'cnicFront' && key !== 'cnicBack' && 
              key !== 'lastDegree' && key !== 'profilePicture') {
            formDataToSubmit.append(key, 
              Array.isArray(formData[key]) 
                ? JSON.stringify(formData[key]) 
                : formData[key]
            );
          }
        });

        // Append files
        if (formData.profilePicture) {
          formDataToSubmit.append('profilePicture', formData.profilePicture);
        }
        
        if (formData.cnicFront) {
          formDataToSubmit.append('cnicFront', formData.cnicFront);
        }
        
        if (formData.cnicBack) {
          formDataToSubmit.append('cnicBack', formData.cnicBack);
        }
        
        if (formData.lastDegree) {
          formDataToSubmit.append('lastDegree', formData.lastDegree);
        }

        // Append multiple files
        formData.certificates?.forEach((file, index) => {
          formDataToSubmit.append(`certificates[${index}]`, file);
        });

        formData.documents?.forEach((file, index) => {
          formDataToSubmit.append(`documents[${index}]`, file);
        });

        // Add submission metadata
        formDataToSubmit.append('submissionDate', currentDate.toISOString());
        formDataToSubmit.append('submittedBy', currentUser);

        // Here you would typically make an API call to submit the form
        console.log('Form Data to submit:', formDataToSubmit);
        // const response = await fetch('/api/submit-teacher-form', {
        //   method: 'POST',
        //   body: formDataToSubmit
        // });
        // const result = await response.json();
        // console.log('Submission result:', result);

        // Reset form after successful submission
        // setFormData({...initialFormState});
        // setCurrentStep(1);
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error appropriately
      }
    }
  };

  const DocumentsUploadStep = ({ handleFileUpload }) => {
    const [files, setFiles] = useState({
      registrationCertificate: null,
      taxDocuments: null,
      accreditationCertificates: [],
      facilitiesPhotos: [],
      staffCredentials: [],
      auditReports: []
    });
  
    const [dragActive, setDragActive] = useState({
      registrationCertificate: false,
      taxDocuments: false,
      accreditationCertificates: false,
      facilitiesPhotos: false,
      staffCredentials: false,
      auditReports: false
    });
  
    // ... handleDrag and handleDrop functions remain the same ...
  
    const UploadBox = ({ field, label, accept, multiple = false, description, icon: Icon }) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Icon className="text-violet-500" />
          {label}
        </label>
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 
            ${dragActive[field] ? 'border-violet-500 bg-violet-50/50' : 'border-gray-300 hover:border-violet-400'}
            ${files[field] ? 'bg-green-50/50' : 'bg-white/50'} backdrop-blur-sm`}
          onDragEnter={e => handleDrag(e, field, true)}
          onDragLeave={e => handleDrag(e, field, false)}
          onDragOver={e => handleDrag(e, field, true)}
          onDrop={e => handleDrop(e, field)}
        >
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={e => {
              setFiles(prev => ({
                ...prev,
                [field]: multiple ? Array.from(e.target.files) : e.target.files[0]
              }));
              handleFileUpload(e, field);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          
          <div className="text-center">
            <motion.div
              animate={{ scale: dragActive[field] ? 1.1 : 1 }}
              className="mx-auto"
            >
              {files[field] ? (
                <FiCheckCircle className="mx-auto h-8 w-8 text-green-500" />
              ) : (
                <FiUpload className="mx-auto h-8 w-8 text-violet-500" />
              )}
            </motion.div>
            
            <p className="mt-2 text-sm text-gray-600">
              {files[field] ? (
                multiple ? (
                  `${files[field].length} files selected`
                ) : (
                  files[field].name
                )
              ) : (
                <>
                  <span className="text-violet-600 font-medium">Click to upload</span> or drag and drop
                </>
              )}
            </p>
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          </div>
        </div>
  
        {/* File Preview section remains the same */}
      </motion.div>
    );
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-lg rounded-2xl shadow-xl space-y-8"
      >
        <div className="border-b border-gray-200 pb-6">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Institution Documents
          </motion.h3>
          <p className="mt-2 text-gray-600">Upload all required institutional documentation and certifications</p>
        </div>
  
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <UploadBox
              field="registrationCertificate"
              label="Registration Certificate"
              accept=".pdf"
              icon={FiFileText}
              description="Official registration certificate (PDF up to 10MB)"
            />
            <UploadBox
              field="taxDocuments"
              label="Tax Documents"
              accept=".pdf"
              icon={FiDollarSign}
              description="Tax registration & returns (PDF up to 10MB)"
            />
          </div>
  
          <div className="grid grid-cols-1 gap-8">
            <UploadBox
              field="accreditationCertificates"
              label="Accreditation Certificates"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              icon={FiAward}
              description="All educational board affiliations and accreditations"
            />
  
            <UploadBox
              field="facilitiesPhotos"
              label="Facility Documentation"
              accept="image/*"
              multiple
              icon={FiImage}
              description="Photos of classrooms, labs, library, etc. (JPG, PNG up to 5MB each)"
            />
  
            <UploadBox
              field="staffCredentials"
              label="Staff Credentials"
              accept=".pdf"
              multiple
              icon={FiUsers}
              description="Teaching staff qualifications and certifications (PDF up to 10MB each)"
            />
  
            <UploadBox
              field="auditReports"
              label="Audit Reports"
              accept=".pdf"
              multiple
              icon={FiClipboard}
              description="Recent financial audit reports (PDF up to 10MB each)"
            />
          </div>
        </div>
  
        {/* Hidden Fields */}
        <input type="hidden" name="submissionDate" value="2025-02-14 03:00:47" />
        <input type="hidden" name="submittedBy" value="huzaifa8883" />
      </motion.div>
    );
  };
  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Submission Info */}
      <div className="mb-4 text-sm text-gray-600">
        <p>Submission Date: {currentDate.toLocaleString()}</p>
       
      </div>

      {/* Progress Steps */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative">
        {/* Steps Container */}
        <div className="flex justify-between items-center relative z-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`
                  relative flex items-center justify-center w-12 h-12 rounded-full
                  shadow-lg transform transition-all duration-300 ease-in-out
                  ${currentStep >= step.id 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700' 
                    : 'bg-white text-gray-500 border-2 border-gray-200'}
                  ${currentStep === step.id ? 'scale-110' : ''}
                `}
              >
                {currentStep > step.id ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                ) : (
                  <span className="text-lg font-semibold">{step.id}</span>
                )}
                
                {/* Pulsing Effect for Current Step */}
                {currentStep === step.id && (
                  <div className="absolute w-full h-full rounded-full animate-ping opacity-20 bg-blue-500" />
                )}
              </motion.div>

              {/* Step Title */}
              <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className={`
                  mt-4 text-sm font-medium tracking-wide
                  ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}
                `}
              >
                {step.title}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Progress Lines */}
        <div className="absolute top-6 left-0 w-full z-0">
          <div className="h-1 flex items-center justify-between">
            {steps.map((step, index) => (
              index < steps.length - 1 && (
                <motion.div
                  key={step.id}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`
                    flex-1 h-1 mx-2 rounded
                    ${currentStep > step.id 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                      : 'bg-gray-200'}
                  `}
                />
              )
            ))}
          </div>
        </div>
      </div>
    </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        {/* Step 1 - Personal Information */}
        {currentStep === 1 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-lg rounded-2xl shadow-xl"
  >
    {/* Header Section */}
    <motion.div 
      className="mb-12 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-3">
        Institution Information
      </h3>
      <p className="text-gray-600">Tell us about your educational institution</p>
    </motion.div>

    {/* Main Form Content */}
    <div className="space-y-10">
      {/* Institution Logo Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
      >
        <div className="flex-shrink-0 relative group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-44 h-44 rounded-xl overflow-hidden ring-4 ring-violet-100 shadow-xl"
          >
            {formData.instituteLogo ? (
              <img
                src={URL.createObjectURL(formData.instituteLogo)}
                alt="Institution Logo"
                className="w-full h-full object-contain bg-white p-2"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center">
                <FiHome className="w-16 h-16 text-violet-300" />
              </div>
            )}
          </motion.div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'instituteLogo')}
            className="hidden"
            id="logo-upload"
          />
          <motion.label
            htmlFor="logo-upload"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-2 right-2 p-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg cursor-pointer"
          >
            <FiCamera className="w-5 h-5" />
          </motion.label>
        </div>

        {/* Basic Institution Details */}
        <div className="flex-grow space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="form-group">
              <label className={labelClasses}>
                <FiHome className="text-violet-500" />
                Institution Name
              </label>
              <input
                type="text"
                name="academyName"
                required
                value={formData.academyName}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="Enter institution name"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="form-group">
              <label className={labelClasses}>
                <FiHash className="text-violet-500" />
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                required
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="Official registration number"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Contact and Institution Details */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div whileHover={{ scale: 1.02 }} className="form-group">
          <label className={labelClasses}>
            <FiPhone className="text-violet-500" />
            Institution Phone
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="+1 (234) 567-8900"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="form-group">
          <label className={labelClasses}>
            <FiMail className="text-violet-500" />
            Official Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="office@institution.com"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="form-group">
          <label className={labelClasses}>
            <FiGlobe className="text-violet-500" />
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="https://www.institution.com"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="form-group">
          <label className={labelClasses}>
            <FiCalendar className="text-violet-500" />
            Establishment Date
          </label>
          <input
            type="date"
            name="establishmentDate"
            required
            value={formData.establishmentDate}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </motion.div>
      </motion.div>

      {/* Address Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div whileHover={{ scale: 1.02 }} className="form-group md:col-span-2">
          <label className={labelClasses}>
            <FiMapPin className="text-violet-500" />
            Street Address
          </label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="Enter street address"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="form-group">
          <label className={labelClasses}>
            <FiMap className="text-violet-500" />
            City
          </label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="Enter city"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="form-group">
          <label className={labelClasses}>
            <FiFlag className="text-violet-500" />
            State/Province
          </label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="Enter state/province"
          />
        </motion.div>
      </motion.div>

      {/* Institution Description */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.01 }}
        className="form-group"
      >
        <label className={labelClasses}>
          <FiFileText className="text-violet-500" />
          Institution Description
        </label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          className={`${inputClasses} resize-none`}
          placeholder="Describe your institution's mission, values, and unique offerings..."
        />
        <p className="mt-2 text-sm text-gray-500">
          Include your institution's mission statement, core values, and what makes it unique
        </p>
      </motion.div>

      {/* Hidden Fields */}
      <input type="hidden" name="submissionDate" value="2025-02-14 01:58:13" />
      <input type="hidden" name="submittedBy" value="huzaifa8883" />
    </div>
  </motion.div>
)}

        {/* Step 2 - Educational Background */}
        {currentStep === 2 && (
     <motion.div 
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     className="max-w-4xl mx-auto p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl space-y-8"
   >
     <div className="border-b border-gray-200 pb-4">
       <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
         Academic Details
       </h3>
       <p className="mt-2 text-gray-600">Please provide your institution's academic information</p>
     </div>
   
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       {/* <motion.div {...fadeInUp}>
         <label className={labelClasses}>
           <FiAward className="text-violet-500" />
           Primary Accreditation Body *
         </label>
         <input
           type="text"
           name="primaryAccreditation"
           required
           value={formData.accreditations[0] || ''}
           onChange={handleInputChange}
           className={inputClasses}
           placeholder="e.g., Higher Education Commission"
         />
       </motion.div> */}
   
       <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
         <label className={labelClasses}>
           <FiBookOpen className="text-violet-500" />
           Education System *
         </label>
         <select
           name="educationSystem"
           required
           value={formData.educationSystem}
           onChange={handleInputChange}
           className={`${inputClasses} cursor-pointer`}
         >
           <option value="">Select Education System</option>
           <option value="british">British Curriculum</option>
           <option value="american">American Curriculum</option>
           <option value="national">National Curriculum</option>
           <option value="international">International Baccalaureate</option>
           <option value="mixed">Mixed Curriculum</option>
         </select>
       </motion.div>
   
       <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
         <label className={labelClasses}>
           <FiLayers className="text-violet-500" />
           Education Levels Offered *
         </label>
         <Select
           isMulti
           name="educationLevels"
           value={formData.educationLevels.map(level => ({ value: level, label: level }))}
           onChange={(selected) => {
             handleInputChange({
               target: {
                 name: 'educationLevels',
                 value: selected.map(item => item.value)
               }
             });
           }}
           options={[
             { value: 'kindergarten', label: 'Kindergarten' },
             { value: 'primary', label: 'Primary School' },
             { value: 'middle', label: 'Middle School' },
             { value: 'secondary', label: 'Secondary School' },
             { value: 'higher_secondary', label: 'Higher Secondary' },
             { value: 'undergraduate', label: 'Undergraduate' },
             { value: 'graduate', label: 'Graduate' }
           ]}
           className="react-select-container"
           classNamePrefix="react-select"
           styles={customSelectStyles}
           placeholder="Select education levels offered"
         />
       </motion.div>
   
       <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
         <label className={labelClasses}>
           <FiUsers className="text-violet-500" />
           Student Capacity
         </label>
         <input
           type="number"
           name="studentCapacity"
           value={formData.statistics.totalCapacity}
           onChange={handleInputChange}
           className={inputClasses}
           placeholder="Total student capacity"
           min="1"
         />
       </motion.div>
   
       <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="md:col-span-2">
         <label className={labelClasses}>
           <FiBook className="text-violet-500" />
           Programs Offered *
         </label>
         <Select
           isMulti
           name="programsOffered"
           value={formData.programsOffered.map(program => ({ value: program, label: program }))}
           onChange={(selected) => {
             handleInputChange({
               target: {
                 name: 'programsOffered',
                 value: selected.map(item => item.value)
               }
             });
           }}
           options={[
             { value: 'science', label: 'Science' },
             { value: 'commerce', label: 'Commerce' },
             { value: 'arts', label: 'Arts' },
             { value: 'computing', label: 'Computing' },
             { value: 'languages', label: 'Languages' },
             { value: 'vocational', label: 'Vocational Training' }
           ]}
           className="react-select-container"
           classNamePrefix="react-select"
           styles={customSelectStyles}
           placeholder="Select programs offered"
         />
       </motion.div>
     </div>
   
     <motion.div 
       {...fadeInUp} 
       transition={{ delay: 0.5 }}
       className="mt-8"
     >
       <label className={labelClasses}>
         <FiFileText className="text-violet-500" />
         Accreditation Certificates & Licenses
       </label>
       <div className="mt-2 flex justify-center px-6 py-8 border-2 border-dashed border-violet-200 rounded-xl bg-violet-50/30 hover:bg-violet-50/50 transition-colors duration-200">
         <div className="text-center">
           <FiUploadCloud className="mx-auto h-12 w-12 text-violet-500" />
           <div className="mt-4">
             <label htmlFor="accreditations" className="cursor-pointer">
               <span className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                 Upload Documents
               </span>
               <input
                 id="accreditations"
                 name="accreditations"
                 type="file"
                 multiple
                 className="sr-only"
                 onChange={(e) => handleFileUpload(e, 'accreditationCertificates')}
                 accept=".pdf,.jpg,.jpeg,.png"
               />
             </label>
             <p className="mt-2 text-sm text-gray-500">
               or drag and drop your documents here
             </p>
           </div>
           <p className="mt-1 text-xs text-gray-400">
             Upload all relevant accreditation certificates and licenses (PDF, PNG, JPG up to 10MB each)
           </p>
         </div>
       </div>
     </motion.div>
   
     <motion.div 
       {...fadeInUp} 
       transition={{ delay: 0.6 }}
       className="space-y-4"
     >
       <label className={labelClasses}>
         <FiFlag className="text-violet-500" />
         Academic Achievements & Recognition
       </label>
       <textarea
         name="achievements"
         value={formData.achievements.join('\n')}
         onChange={(e) => handleInputChange({
           target: {
             name: 'achievements',
             value: e.target.value.split('\n')
           }
         })}
         className={`${inputClasses} resize-none`}
         rows={4}
         placeholder="List major academic achievements and recognitions (one per line)"
       />
     </motion.div>
   
     {/* Hidden Fields */}
     <input type="hidden" name="submissionDate" value="2025-02-14 02:03:12" />
     <input type="hidden" name="submittedBy" value="huzaifa8883" />
   </motion.div>
        )}

        {/* Step 3 - Professional Details */}
        {currentStep === 3 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-4xl mx-auto p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl space-y-8"
  >
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        Institutional Details
      </h3>
      <p className="mt-2 text-gray-600">Share information about your institution's facilities and staff</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Staff Information */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className={labelClasses}>
          <FiUsers className="text-violet-500" />
          Total Teaching Staff
        </label>
        <input
          type="number"
          name="staffInformation.totalTeachers"
          required
          value={formData.staffInformation.totalTeachers}
          onChange={handleInputChange}
          className={inputClasses}
          placeholder="Number of teachers"
          min="1"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className={labelClasses}>
          <FiBriefcase className="text-violet-500" />
          Administrative Staff
        </label>
        <input
          type="number"
          name="staffInformation.totalAdminStaff"
          required
          value={formData.staffInformation.totalAdminStaff}
          onChange={handleInputChange}
          className={inputClasses}
          placeholder="Number of administrative staff"
          min="1"
        />
      </motion.div>

      {/* Facilities */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="md:col-span-2"
      >
        <label className={labelClasses}>
          <FiLayout className="text-violet-500" />
          Available Facilities
        </label>
        <Select
          isMulti
          name="facilities"
          options={[
            { value: 'library', label: 'Library' },
            { value: 'computer_lab', label: 'Computer Lab' },
            { value: 'science_lab', label: 'Science Lab' },
            { value: 'sports_ground', label: 'Sports Ground' },
            { value: 'cafeteria', label: 'Cafeteria' },
            { value: 'auditorium', label: 'Auditorium' },
            { value: 'medical_room', label: 'Medical Room' },
            { value: 'transport', label: 'Transport Service' },
            { value: 'smart_classes', label: 'Smart Classrooms' },
            { value: 'wifi', label: 'Wi-Fi Campus' }
          ]}
          value={formData.facilities.map(facility => ({ value: facility, label: facility.replace('_', ' ').toUpperCase() }))}
          onChange={(selected) => setFormData({
            ...formData,
            facilities: selected ? selected.map(option => option.value) : []
          })}
          styles={customSelectStyles}
          placeholder="Select available facilities..."
        />
      </motion.div>

      {/* Operating Hours */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label className={labelClasses}>
          <FiClock className="text-violet-500" />
          Operating Hours (Weekdays)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            name="operatingHours.weekdays.start"
            value={formData.operatingHours.weekdays.start}
            onChange={handleInputChange}
            className={inputClasses}
          />
          <input
            type="time"
            name="operatingHours.weekdays.end"
            value={formData.operatingHours.weekdays.end}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label className={labelClasses}>
          <FiCalendar className="text-violet-500" />
          Operating Hours (Weekends)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            name="operatingHours.weekends.start"
            value={formData.operatingHours.weekends.start}
            onChange={handleInputChange}
            className={inputClasses}
          />
          <input
            type="time"
            name="operatingHours.weekends.end"
            value={formData.operatingHours.weekends.end}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
      </motion.div>
    </div>

    {/* Statistics */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <div>
        <label className={labelClasses}>
          <FiTrendingUp className="text-violet-500" />
          Graduation Rate (%)
        </label>
        <input
          type="number"
          name="statistics.graduationRate"
          value={formData.statistics.graduationRate}
          onChange={handleInputChange}
          className={inputClasses}
          placeholder="e.g., 95"
          min="0"
          max="100"
        />
      </div>

      <div>
        <label className={labelClasses}>
          <FiUsers className="text-violet-500" />
          Student-Teacher Ratio
        </label>
        <input
          type="text"
          name="statistics.studentTeacherRatio"
          value={formData.statistics.studentTeacherRatio}
          onChange={handleInputChange}
          className={inputClasses}
          placeholder="e.g., 20:1"
        />
      </div>

      <div>
        <label className={labelClasses}>
          <FiTarget className="text-violet-500" />
          Average Class Size
        </label>
        <input
          type="number"
          name="statistics.classSize"
          value={formData.statistics.classSize}
          onChange={handleInputChange}
          className={inputClasses}
          placeholder="e.g., 25"
          min="1"
        />
      </div>
    </motion.div>

    {/* Partnerships & Affiliations */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <label className={labelClasses}>
        <FiLink className="text-violet-500" />
        Partnerships & Affiliations
      </label>
      <textarea
        name="partnerships"
        rows={4}
        value={formData.partnerships.join('\n')}
        onChange={(e) => setFormData({
          ...formData,
          partnerships: e.target.value.split('\n').filter(p => p.trim())
        })}
        className={`${inputClasses} resize-none`}
        placeholder="List your institution's partnerships and affiliations (one per line)&#10;Example:&#10;British Council - Language Assessment Partner&#10;Microsoft - Technology Education Partner"
      />
    </motion.div>

    {/* Hidden Fields */}
    <input type="hidden" name="submissionDate" value="2025-02-14 02:26:13" />
    <input type="hidden" name="submittedBy" value="huzaifa8883" />
  </motion.div>
)}
        {/* Step 4 - Teaching Preferences */}
        {currentStep === 4 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-lg rounded-2xl shadow-xl space-y-8"
  >
    <div className="border-b border-gray-200 pb-6">
      <motion.h3 
        className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Academic Programs & Policies
      </motion.h3>
      <p className="mt-2 text-gray-600">Configure your institution's academic structure and policies</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Academic Sessions */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <FiCalendar className="text-violet-500" />
          Academic Sessions
        </label>
        <Select
          isMulti
          options={[
            { value: 'morning', label: '🌅 Morning (8 AM - 1 PM)' },
            { value: 'afternoon', label: '☀️ Afternoon (1 PM - 6 PM)' },
            { value: 'evening', label: '🌆 Evening (6 PM - 10 PM)' }
          ]}
          styles={customSelectStyles}
          value={formData.academicSessions.map(session => ({
            value: session,
            label: session === 'morning' ? '🌅 Morning (8 AM - 1 PM)' :
                   session === 'afternoon' ? '☀️ Afternoon (1 PM - 6 PM)' :
                   '🌆 Evening (6 PM - 10 PM)'
          }))}
          onChange={(selected) => {
            handleInputChange({
              target: {
                name: 'academicSessions',
                value: selected.map(item => item.value)
              }
            });
          }}
          placeholder="Select academic sessions..."
        />
      </motion.div>

      {/* Mode of Education */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <FiMonitor className="text-violet-500" />
          Mode of Education
        </label>
        <Select
          isMulti
          options={[
            { value: 'on_campus', label: '🏫 On-Campus Learning' },
            { value: 'online', label: '💻 Online Learning' },
            { value: 'hybrid', label: '🔄 Hybrid Learning' }
          ]}
          styles={customSelectStyles}
          value={formData.educationModes.map(mode => ({
            value: mode,
            label: mode === 'on_campus' ? '🏫 On-Campus Learning' :
                   mode === 'online' ? '💻 Online Learning' :
                   '🔄 Hybrid Learning'
          }))}
          onChange={(selected) => {
            handleInputChange({
              target: {
                name: 'educationModes',
                value: selected.map(item => item.value)
              }
            });
          }}
          placeholder="Select education modes..."
        />
      </motion.div>

      {/* Fee Structure */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <FiDollarSign className="text-violet-500" />
          Fee Structure
        </label>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              name="feeStructure.monthlyFee"
              value={formData.feeStructure.monthlyFee}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none"
              placeholder="Monthly Fee"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              PKR
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              name="feeStructure.admissionFee"
              value={formData.feeStructure.admissionFee}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none"
              placeholder="Admission Fee"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              PKR
            </span>
          </div>
        </div>
      </motion.div>

      {/* Scholarship Programs */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <FiAward className="text-violet-500" />
          Scholarship Programs
        </label>
        <Select
          isMulti
          options={[
            { value: 'merit', label: '🏆 Merit-based Scholarship' },
            { value: 'need', label: '🤝 Need-based Scholarship' },
            { value: 'sports', label: '⚽ Sports Scholarship' },
            { value: 'sibling', label: '👥 Sibling Discount' }
          ]}
          styles={customSelectStyles}
          value={formData.scholarshipPrograms.map(program => ({
            value: program,
            label: program === 'merit' ? '🏆 Merit-based Scholarship' :
                   program === 'need' ? '🤝 Need-based Scholarship' :
                   program === 'sports' ? '⚽ Sports Scholarship' :
                   '👥 Sibling Discount'
          }))}
          onChange={(selected) => {
            handleInputChange({
              target: {
                name: 'scholarshipPrograms',
                value: selected.map(item => item.value)
              }
            });
          }}
          placeholder="Select scholarship programs..."
        />
      </motion.div>

      {/* Academic Policies */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="md:col-span-2"
      >
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <FiFileText className="text-violet-500" />
          Academic Policies
        </label>
        <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.01]' : ''}`}>
          <textarea
            name="policies.academic"
            value={formData.policies.academic}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none resize-none"
            placeholder="Describe your institution's academic policies, including attendance requirements, examination system, promotion criteria, etc..."
            rows={4}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Include important policies regarding attendance, examinations, student conduct, and promotion criteria
        </p>
      </motion.div>
    </div>

    {/* Hidden Fields */}
    <input type="hidden" name="submissionDate" value="2025-02-14 02:49:43" />
    <input type="hidden" name="submittedBy" value="huzaifa8883" />
  </motion.div>
)}
        {/* Step 5 - Documents Upload */}
        {currentStep === 5 && (
        <DocumentsUploadStep handleFileUpload={handleFileUpload} />
      )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              currentStep === 1 ? 'ml-auto' : ''
            }`}
          >
            {currentStep === steps.length ? 'Submit' : 'Next'}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AcademyForm;