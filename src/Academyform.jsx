import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud,FiBriefcase, FiBook, FiLayers, FiBookOpen, FiUsers,FiClock, FiMonitor, FiDollarSign,FiUpload, FiFile, FiCheckCircle, FiX ,FiMail,FiPhone, FiCalendar, FiMapPin,FiUser,FiHome,FiCamera,FiHash,FiGlobe,FiMap,FiFlag,FiFileText,FiAward,FiLayout,  FiTrendingUp, 
  FiTarget, 
  FiLink ,
  FiImage, 
  FiClipboard

} from 'react-icons/fi';
import Select from 'react-select';
import LocationSelect from "./LocationSelect";

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
const AcademyForm = () => {
  const currentDate = new Date('2025-02-13T06:00:08Z');
  const currentUser = 'huzaifa8883';
const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
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
    { id: 1, title: "Personal Info & Education", subtitle: "Basic Details" },
    // { id: 2, title: "Education", subtitle: "Academic Background" },
    { id: 3, title: "Professional & Preferences", subtitle: "Work Experience" },
    // { id: 4, title: "Preferences", subtitle: "Teaching Details" },
    // { id: 5, title: "Documents", subtitle: "Upload Files" }
  ];
  

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
    'Computer Science', 'History', 'Geography', 'Economics', 'Arts'
  ];
 const facilityOptions = [
    { value: "library", label: "Library" },
    { value: "computer_lab", label: "Computer Lab" },
    { value: "science_lab", label: "Science Lab" },
    { value: "sports_ground", label: "Sports Ground" },
    { value: "cafeteria", label: "Cafeteria" },
    { value: "auditorium", label: "Auditorium" },
    { value: "medical_room", label: "Medical Room" },
    { value: "transport", label: "Transport Service" },
    { value: "smart_classes", label: "Smart Classrooms" },
    { value: "wifi", label: "Wi-Fi Campus" },
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

const UploadBox = ({
  field,
  label,
  accept,
  multiple = false,
  description,
  icon: Icon,
  dragActive,
  files,
  handleDrag,
  handleDrop,
  handleFileUpload,
  setFiles,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="relative group"
  >
    <label className="flex items-center gap-2 text-base font-jakarta font-semibold text-gray-700 mb-2 transition-all">
      <Icon className="text-violet-500" />
      {label}
    </label>
    <div
      className={`
        relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200
        ${dragActive[field] ? "border-fuchsia-500 bg-fuchsia-50/50" : "border-purple-200 hover:border-fuchsia-400"}
        ${files[field] ? "bg-green-50/50" : "bg-white/60"} backdrop-blur-lg
      `}
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
            <FiFileText className="mx-auto h-9 w-9 text-green-500" />
          ) : (
            <FiUpload className="mx-auto h-9 w-9 text-fuchsia-500" />
          )}
        </motion.div>
        <p className="mt-4 text-base font-inter text-gray-700">
          {files[field] ? (
            multiple ? (
              `${files[field].length} files selected`
            ) : (
              files[field].name
            )
          ) : (
            <>
              <span className="text-fuchsia-700 font-jakarta font-semibold">Click to upload</span> or drag and drop
            </>
          )}
        </p>
        <p className="mt-1 text-xs text-gray-500 font-inter">{description}</p>
      </div>
    </div>
    {/* File Preview Section: Show thumbnail/preview if image */}
    {files[field] && !multiple && files[field].type?.startsWith("image/") && (
      <div className="mt-4 flex justify-center">
        <img
          src={URL.createObjectURL(files[field])}
          alt={label}
          className="w-40 h-40 rounded-xl object-cover border-4 border-fuchsia-100 shadow-lg"
        />
      </div>
    )}
  </motion.div>
);

const DocumentsUploadStep = ({
  handleFileUpload,
  setFiles,
  files,
  dragActive,
  handleDrag,
  handleDrop,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="max-w-4xl mx-auto p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-purple-200/[.25] shadow-2xl relative overflow-hidden font-inter"
    style={{
      boxShadow: "0 8px 40px 0 rgba(127, 63, 152, 0.18)",
    }}
  >
    {/* Animated Gradient Overlay */}
    <div className="absolute inset-0 pointer-events-none z-0 animate-gradient bg-gradient-to-br from-violet-200 via-purple-100 to-fuchsia-200 opacity-80"></div>
    {/* Header Section */}
    <motion.div
      className="mb-16 text-center relative z-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-600 bg-clip-text text-transparent mb-3 font-jakarta tracking-tight drop-shadow-lg">
        Documents Upload
      </h3>
      <p className="text-gray-700 text-xl font-medium font-inter drop-shadow-sm">
        Upload your registration certificate front and back images
      </p>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 z-10 relative">
      <UploadBox
        field="registrationFront"
        label="Registration Certificate - Front"
        accept="image/*"
        icon={FiFileText}
        description="Upload the FRONT side of your registration certificate (PNG/JPG)"
        dragActive={dragActive||{}}
        files={files || {}}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
        setFiles={setFiles}
        handleFileUpload={handleFileUpload}
      />
    <UploadBox
  field="registrationBack"
  label="Registration Certificate - Back"
  accept="image/*"
  icon={FiFileText}
  description="Upload the BACK side of your registration certificate (PNG/JPG)"
  dragActive={dragActive || {}}   // default empty object
  files={files || {}}             // default empty object
  handleDrag={handleDrag}
  handleDrop={handleDrop}
  setFiles={setFiles}
  handleFileUpload={handleFileUpload}
/>
    </div>
  </motion.div>
);
  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Submission Info */}
      <div className="mb-4 text-sm text-gray-600">
        <p>Submission Date: {currentDate.toLocaleString()}</p>
       
      </div>

      {/* Progress Steps */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="w-full max-w-4xl mx-auto px-4 py-12 relative font-inter"
  >
    {/* Background Gradient Glow */}
    <div className="absolute -inset-8 z-0 pointer-events-none">
      <div className="h-full w-full rounded-[2.5rem] blur-2xl opacity-70 bg-gradient-to-br from-violet-200 via-purple-100 to-fuchsia-200 animate-gradient"></div>
    </div>
    {/* Steps Container */}
    <div className="flex justify-between items-center relative z-10">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center group">
          {/* Step Circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.12 }}
            className={`
              relative flex items-center justify-center w-14 h-14 rounded-full
              shadow-2xl border-4
              transition-all duration-300 ease-in-out
              ${
                currentStep > step.id
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white border-fuchsia-200"
                  : currentStep === step.id
                  ? "bg-gradient-to-br from-purple-700 via-fuchsia-600 to-violet-600 text-white border-fuchsia-400 scale-110 shadow-fuchsia-200"
                  : "bg-white text-violet-400 border-purple-100"
              }
            `}
            style={{
              boxShadow:
                currentStep === step.id
                  ? "0 0 0 6px rgba(236, 72, 153, 0.18), 0 8px 30px 0 rgba(127, 63, 152, 0.21)"
                  : "0 8px 40px 0 rgba(127, 63, 152, 0.08)",
            }}
          >
            {currentStep > step.id ? (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-7 h-7"
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
              <span className="text-xl font-bold font-jakarta">{step.id}</span>
            )}

            {/* Pulsing Effect for Current Step */}
            {currentStep === step.id && (
              <div className="absolute w-full h-full rounded-full animate-ping opacity-30 bg-fuchsia-400" />
            )}
          </motion.div>
          {/* Step Title */}
          <motion.span
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.14 + 0.25 }}
            className={`
              mt-5 text-base font-semibold tracking-wide transition-colors duration-200 font-jakarta
              ${
                currentStep > step.id
                  ? "text-fuchsia-700"
                  : currentStep === step.id
                  ? "text-purple-700 drop-shadow"
                  : "text-gray-400 group-hover:text-fuchsia-400"
              }
            `}
          >
            {step.title}
          </motion.span>
        </div>
      ))}
    </div>
    {/* Progress Lines */}
    <div className="absolute top-[34px] left-0 w-full z-0 px-6">
      <div className="h-2 flex items-center justify-between">
        {steps.map(
          (step, index) =>
            index < steps.length - 1 && (
              <motion.div
                key={step.id}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: index * 0.12 + 0.18 }}
                className={`
                  flex-1 h-2 mx-2 rounded-full
                  ${
                    currentStep > step.id
                      ? "bg-gradient-to-r from-fuchsia-500 via-purple-400 to-violet-400 shadow-md"
                      : "bg-purple-100"
                  }
                `}
              />
            )
        )}
      </div>
    </div>
  </motion.div>

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
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="max-w-4xl mx-auto p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-purple-200/[.25] shadow-2xl relative overflow-hidden font-inter"
    style={{
      boxShadow: "0 8px 40px 0 rgba(127, 63, 152, 0.18)",
    }}
  >
    {/* Animated Gradient Overlay */}
    <div className="absolute inset-0 pointer-events-none z-0 animate-gradient bg-gradient-to-br from-violet-200 via-purple-100 to-fuchsia-200 opacity-80"></div>
    {/* Header Section */}
    <motion.div
      className="mb-16 text-center relative z-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-600 bg-clip-text text-transparent mb-3 font-jakarta tracking-tight drop-shadow-lg">
        Institution Information
      </h3>
      <p className="text-gray-700 text-xl font-medium font-inter drop-shadow-sm">
        Tell us about your educational institution
      </p>
    </motion.div>

    {/* Main Form Content */}
    <div className="space-y-14 relative z-10">
      {/* Institution Logo Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row items-center gap-10 p-8 bg-white/85 rounded-3xl shadow-xl border border-purple-100/60 backdrop-blur-lg"
      >
        <div className="flex-shrink-0 relative group">
          <motion.div
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 280 }}
            className="w-52 h-52 rounded-full overflow-hidden ring-8 ring-violet-200/90 shadow-2xl bg-gradient-animated"
          >
            {formData.instituteLogo ? (
              <img
                src={URL.createObjectURL(formData.instituteLogo)}
                alt="Institution Logo"
                className="w-full h-full object-contain bg-white p-2"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-50 via-fuchsia-50 to-violet-200 flex items-center justify-center">
                <FiHome className="w-24 h-24 text-purple-300" />
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
            whileHover={{ scale: 1.16 }}
            whileTap={{ scale: 0.98 }}
            className="absolute bottom-2 right-2 p-4 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-violet-600 text-white rounded-full shadow-xl cursor-pointer transition-all duration-200 hover:shadow-fuchsia-300/70 border-4 border-white"
          >
            <FiCamera className="w-7 h-7" />
          </motion.label>
        </div>

        {/* Basic Institution Details */}
        <div className="flex-grow space-y-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiHome className="text-violet-500" />
                Institution Name
              </label>
              <input
                type="text"
                name="academyName"
                required
                value={formData.academyName}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                placeholder="Enter institution name"
              />
            </motion.div>
            {/* <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiHash className="text-violet-500" />
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                required
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                placeholder="Official registration number"
              />
            </motion.div> */}
          </div>
        </div>
      </motion.div>

      {/* Contact and Institution Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <motion.div whileHover={{ scale: 1.03 }} className="form-group">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
            <FiPhone className="text-violet-500" />
            Institution Phone
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
            placeholder="+1 (234) 567-8900"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="form-group">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
            <FiMail className="text-violet-500" />
            Official Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
            placeholder="office@institution.com"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="form-group">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
            <FiGlobe className="text-violet-500" />
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
            placeholder="https://www.institution.com"
          />
        </motion.div>

        {/* <motion.div whileHover={{ scale: 1.03 }} className="form-group">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
            <FiCalendar className="text-violet-500" />
            Establishment Date
          </label>
          <input
            type="date"
            name="establishmentDate"
            required
            value={formData.establishmentDate}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
          />
        </motion.div> */}
      </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} className="form-group">
                      <LocationSelect
             selectedProvince={selectedProvince}
             setSelectedProvince={setSelectedProvince}
             selectedCity={selectedCity}
             setSelectedCity={setSelectedCity}
             provincesWithCities={provincesWithCities}
           />
                   </motion.div>
      {/* Address Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <motion.div whileHover={{ scale: 1.03 }} className="form-group md:col-span-2">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
            <FiMapPin className="text-violet-500" />
            Street Address
          </label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
            placeholder="Enter street address"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="form-group">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
            <FiMap className="text-violet-500" />
            City
          </label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
            placeholder="Enter city"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="form-group">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
            <FiFlag className="text-violet-500" />
            State/Province
          </label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
            placeholder="Enter state/province"
          />
        </motion.div>
      </motion.div> */}

      {/* Institution Description */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        whileHover={{ scale: 1.02 }}
        className="form-group relative"
      >
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
          <FiFileText className="text-violet-500" />
          Institution Description
        </label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 resize-none focus:shadow-lg"
          placeholder="Describe your institution's mission, values, and unique offerings..."
        />
        <p className="mt-2 text-sm text-gray-500">
          Include your institution's mission statement, core values, and what makes it unique
        </p>
      </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} className="relative group">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
              <FiLayers className="text-violet-500" />
              Education Levels Offered <span className="text-fuchsia-600">*</span>
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
      
          <motion.div whileHover={{ scale: 1.03 }} className="relative group">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
              <FiBook className="text-violet-500" />
              Programs Offered <span className="text-fuchsia-600">*</span>
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

      {/* Hidden Fields */}
      <input type="hidden" name="submissionDate" value="2025-02-14 01:58:13" />
      <input type="hidden" name="submittedBy" value="huzaifa8883" />
    </div>
  </motion.div>
)}
        {/* Step 2 - Educational Background */}

        {/* Step 3 - Professional Details */}
   {currentStep === 2 && (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-4xl mx-auto p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-purple-200/[.25] shadow-2xl relative overflow-hidden font-inter"
      style={{
        boxShadow: "0 8px 40px 0 rgba(127, 63, 152, 0.18)",
      }}
    >
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 animate-gradient bg-gradient-to-br from-violet-200 via-purple-100 to-fuchsia-200 opacity-80"></div>
      {/* Header Section */}
      <motion.div
        className="mb-16 text-center relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-600 bg-clip-text text-transparent mb-3 font-jakarta tracking-tight drop-shadow-lg">
          Institutional Details
        </h3>
        <p className="text-gray-700 text-xl font-medium font-inter drop-shadow-sm">
          Share information about your institution&apos;s facilities and staff
        </p>
      </motion.div>

      <div className="space-y-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-white/85 rounded-3xl shadow-xl border border-purple-100/60 backdrop-blur-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Staff Information */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiUsers className="text-violet-500" />
                Total Teaching Staff
              </label>
              <input
                type="number"
                name="staffInformation.totalTeachers"
                required
                value={formData.staffInformation.totalTeachers}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                placeholder="Number of teachers"
                min="1"
              />
            </motion.div>

            {/* Facilities */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group md:col-span-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiLayout className="text-violet-500" />
                Available Facilities
              </label>
              <Select
                isMulti
                name="facilities"
                options={facilityOptions}
                value={formData.facilities.map((facility) => {
                  const found = facilityOptions.find((o) => o.value === facility);
                  return found || { value: facility, label: facility };
                })}
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    facilities: selected ? selected.map((option) => option.value) : [],
                  })
                }
                styles={customSelectStyles}
                placeholder="Select available facilities..."
              />
            </motion.div>

            {/* Operating Hours (Weekdays) */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiClock className="text-violet-500" />
                Operating Hours (Weekdays)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  name="operatingHours.weekdays.start"
                  value={formData.operatingHours.weekdays.start}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                />
                <input
                  type="time"
                  name="operatingHours.weekdays.end"
                  value={formData.operatingHours.weekdays.end}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                />
              </div>
            </motion.div>

            {/* Operating Hours (Weekends) */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiCalendar className="text-violet-500" />
                Operating Hours (Weekends)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  name="operatingHours.weekends.start"
                  value={formData.operatingHours.weekends.start}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                />
                <input
                  type="time"
                  name="operatingHours.weekends.end"
                  value={formData.operatingHours.weekends.end}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                />
              </div>
            </motion.div>

            {/* Mode of Education */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiMonitor className="text-violet-500" />
                Mode of Education
              </label>
              <Select
                isMulti
                options={modeOptions}
                styles={customSelectStyles}
                value={formData.educationModes.map((mode) => {
                  const found = modeOptions.find((o) => o.value === mode);
                  return (
                    found || {
                      value: mode,
                      label: mode === "hybrid" ? "🔄 Hybrid Learning" : mode,
                    }
                  );
                })}
                onChange={(selected) => {
                  handleInputChange({
                    target: {
                      name: "educationModes",
                      value: selected ? selected.map((item) => item.value) : [],
                    },
                  });
                }}
                placeholder="Select education modes..."
              />
            </motion.div>

            {/* Fee Structure */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
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
                    className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                    placeholder="Monthly Fee"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
                    PKR
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="feeStructure.admissionFee"
                    value={formData.feeStructure.admissionFee}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                    placeholder="Admission Fee"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
                    PKR
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Documents upload step */}
            <div className="md:col-span-2">
              {DocumentsUploadStep && <DocumentsUploadStep handleFileUpload={handleFileUpload} />}
            </div>
          </div>
        </motion.div>
      </div>
      {/* Hidden Fields */}
      <input type="hidden" name="submissionDate" value="2025-02-14 02:26:13" />
      <input type="hidden" name="submittedBy" value="huzaifa8883" />
    </motion.div>
)}
        {/* Step 4 - Teaching Preferences */}
 
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
