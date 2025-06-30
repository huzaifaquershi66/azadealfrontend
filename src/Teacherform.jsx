import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiCreditCard,FiBriefcase, FiBook,FiEye,FiEyeOff, FiLayers, FiBookOpen, FiUsers,FiClock, FiMonitor, FiDollarSign,FiUpload, FiFile, FiCheckCircle, FiX ,FiMail,FiPhone, FiCalendar, FiMapPin,FiUser} from 'react-icons/fi';
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
const TeacherForm = () => {
  const currentDate = new Date('2025-02-13T06:00:08Z');
  const currentUser = 'huzaifa8883';

  const [currentStep, setCurrentStep] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
       
  const [showconfirmpassword, setShowconfirmpassword] = useState(false);
const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);  // 🔹 Loading state added

  const [formSubmitted, setFormSubmitted] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);
   
  const toggleconfirmpassword = () => setShowconfirmpassword(prev => !prev);

  const [formData, setFormData] = useState({
    // Personal Information
    username:'',
    fullName: '',
    email: '',
    password:'',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    profilePicture: null,
     selectedProvince,
  setSelectedProvince,
  selectedCity,
  setSelectedCity,
  provincesWithCities,
    bio: '',
    submissionDate: currentDate.toISOString(),
    submittedBy: currentUser,

    // Educational Background
    qualification: '',
    university: '',
    graduationYear: '',
    specialization: '',
    certificates: [],
    
    // Professional Information
    experience: '',
    subjects: [],
    teachingLevel: [],
    previousInstitutions: [],
    references: [],
    
    // Teaching Preferences
    availableTimings: [],
    preferredMode: '', // Online, Physical, Both
    expectedSalary: '',
    teachingMethodology: '',
    
    // Documents
   
    cnicFront: null,
    cnicBack: null,
    lastDegree: null,
    
    // Additional Information
    languages: [],
    skills: [],
    achievements: []
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
    { id: 1, title: 'Personal Information & Educational Background' },
    
    { id: 3, title: 'Professional Details & Teaching Preferences' },
    // { id: 4, title: 'Teaching Preferences' },
    // { id: 5, title: 'Documents Upload' }
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (file, field) => {
    if (!file || !(file instanceof File)) {
      console.error(`Invalid file for field ${field}:`, file);
      return;
    }
  
    setFormData(prev => ({
      ...prev,
      [field]: file, // ✅ Only store if it's a valid file
    }));
  };
  
  
  // };
  

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
            setLoading(true);  // 🔹 Start loading when form submission starts
  
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
            formData.certificates?.forEach((file, index) => {
                formDataToSubmit.append(`certificates[${index}]`, file);
            });
            formData.documents?.forEach((file, index) => {
                formDataToSubmit.append(`documents[${index}]`, file);
            });
  
            if (formData.cnicFront) {
                formDataToSubmit.append('cnicFront', formData.cnicFront);
            }
            if (formData.cnicBack) {
                formDataToSubmit.append('cnicBack', formData.cnicBack);
            }
            if (formData.lastDegree) {
                formDataToSubmit.append('lastDegree', formData.lastDegree);
            }
  
            // Submit the form to the backend API
            const response = await fetch('https://casback-production.up.railway.app/users/register', {
                method: 'POST',
                body: formDataToSubmit,
            });
            const result = await response.json();
            console.log('Submission result:', result);
  
            setFormSubmitted(true); // 🔹 Mark form as submitted
  
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);  // 🔹 Stop loading whether success or error
        }
    }
  };
  
  
  
  
  const DocumentsUploadStep = ({ handleFileUpload }) => {
    const [files, setFiles] = useState({
        cnicFront: null,
        cnicBack: null,
        lastDegree: null
    });

    const [previews, setPreviews] = useState({
        cnicFront: null,
        cnicBack: null,
        lastDegree: null
    });

    // Generate Preview URLs when files change
    useEffect(() => {
        const newPreviews = {};

        Object.keys(files).forEach((key) => {
            if (files[key] instanceof File) {
                newPreviews[key] = URL.createObjectURL(files[key]);
            }
        });

        setPreviews({ ...newPreviews }); // ✅ Fix: React ko batane ke liye new object spread kara

        return () => {
            Object.values(newPreviews).forEach((url) => {
                if (url) URL.revokeObjectURL(url);
            });
        };
    }, [files]);

    const UploadBox = ({ field, label, accept }) => (
        <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 relative">
                <input
                    type="file"
                    accept={accept}
                    onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        if (selectedFile) {
                            setFiles((prev) => ({
                                ...prev,
                                [field]: selectedFile
                            }));
                            handleFileUpload(selectedFile, field);
                        }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="text-center">
                    {files[field] ? (
                        <FiCheckCircle className="mx-auto h-8 w-8 text-green-500" />
                    ) : (
                        <FiUpload className="mx-auto h-8 w-8 text-violet-500" />
                    )}
                    <p className="mt-2 text-sm text-gray-600">
                        {files[field] ? files[field].name : (
                            <>
                                <span className="text-violet-600 font-medium">Click to upload</span> or drag and drop
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Show Either Preview or File Name */}
            {files[field] && (
                <div className="mt-2 flex items-center space-x-4">
                    {previews[field] ? (
                        <img
                            src={previews[field]}
                            alt="Preview"
                            className="w-24 h-24 rounded-md shadow-md object-cover"
                            onError={(e) => console.error("Image Load Error:", e)}
                        />
                    ) : (
                        <p className="text-xs text-gray-500 break-all">{files[field].name}</p>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <UploadBox field="cnicFront" label="CNIC Front" accept="image/*" />
            <UploadBox field="cnicBack" label="CNIC Back" accept="image/*" />
            <UploadBox field="lastDegree" label="Last Degree" accept="image/*" />
        </div>
    );
};

  
  // File Upload Handler

  
    
   
  

  
  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Submission Info */}
      <div className="mb-4 text-sm text-gray-600">
        <p>Submission Date: {currentDate.toLocaleString()}</p>
       
      </div>

      {formSubmitted && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-green-600">Form Submitted Successfully!</h2>
      <p className="text-gray-600 mt-2">You can now proceed to login.</p>
      <button 
        onClick={() => window.location.href = "/login"} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Login
      </button>
    </div>
  </div>
)}


      {/* Progress Steps */}
   {!formSubmitted && (
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
)}


      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        {/* Step 1 - Personal Information */}
        {
      currentStep === 1 && (
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
        <motion.div
          className="mb-16 text-center relative z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-600 bg-clip-text text-transparent mb-3 font-jakarta tracking-tight drop-shadow-lg">
            Personal Information and Educational Background
          </h3>
          <p className="text-gray-700 text-xl font-medium font-inter drop-shadow-sm">
            Tell us about yourself and make your profile <span className="text-fuchsia-700 font-semibold">stand out</span>
          </p>
        </motion.div>

        <div className="space-y-14 relative z-10">
          {/* Profile Picture Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col md:flex-row items-center gap-10 p-8 bg-white/85 rounded-3xl shadow-xl border border-purple-100/60 backdrop-blur-lg"
          >
            <div className="flex-shrink-0 relative group avatar-gradient-ring">
              <motion.div
                whileHover={{ scale: 1.07 }}
                transition={{ type: "spring", stiffness: 280 }}
                className="w-52 h-52 rounded-full overflow-hidden ring-8 ring-violet-200/90 shadow-2xl bg-gradient-animated"
              >
                {formData.profilePicture instanceof File ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Profile"
                    className="w-full h-full object-cover transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-50 via-fuchsia-50 to-violet-200 flex items-center justify-center">
                    <FiUser className="w-24 h-24 text-purple-300" />
                  </div>
                )}
              </motion.div>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) handleFileUpload(file, "profilePicture");
                }}
                className="hidden"
                id="profile-upload"
              />
              <motion.label
                htmlFor="profile-upload"
                whileHover={{ scale: 1.16 }}
                whileTap={{ scale: 0.98 }}
                className="absolute bottom-2 right-2 p-4 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-violet-600 text-white rounded-full shadow-xl cursor-pointer transition-all duration-200 hover:shadow-fuchsia-300/70 border-4 border-white"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </motion.label>
            </div>

            {/* Main Form */}
            <div className="flex-grow space-y-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <motion.div whileHover={{ scale: 1.03 }} className="relative group">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                    <FiUser className="text-purple-500" />
                    <span className="transition-all group-focus-within:text-fuchsia-700">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                    placeholder="Enter your full name"
                    autoComplete="off"
                  />
                </motion.div>
                {/* Username */}
                <motion.div whileHover={{ scale: 1.03 }} className="relative group">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                    <FiUser className="text-violet-500" />
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                    placeholder="Enter your Username"
                    autoComplete="off"
                  />
                </motion.div>
                {/* Email */}
                <motion.div whileHover={{ scale: 1.03 }} className="relative group">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                    <FiMail className="text-fuchsia-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                    placeholder="your@email.com"
                    autoComplete="off"
                  />
                </motion.div>
                {/* Password */}
                <motion.div whileHover={{ scale: 1.03 }} className="relative group">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                    <FiUser className="text-purple-500" />
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg pr-12"
                    placeholder="Enter your password"
                    autoComplete="off"
                  />
                  <div
                    onClick={togglePassword}
                    className="absolute right-4 top-11 cursor-pointer text-gray-400 group-hover:text-fuchsia-500 transition-colors"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} className="relative group">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                    <FiUser className="text-purple-500" />
                    Confirm Password
                  </label>
                  <input
                    type={showconfirmpassword ? "text" : "confirm password"}
                    name="confirmpassword"
                    required
                    value={formData.confirmpassword}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg pr-12"
                    placeholder="Enter your password"
                    autoComplete="off"
                  />
                  <div
                    onClick={toggleconfirmpassword}
                    className="absolute right-4 top-11 cursor-pointer text-gray-400 group-hover:text-fuchsia-500 transition-colors"
                  >
                    {showconfirmpassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </motion.div>
          {/* Contact and Personal Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Phone Number */}
            <motion.div whileHover={{ scale: 1.03 }} className="form-group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiPhone className="text-purple-500" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                placeholder="+92 300 1234567"
                autoComplete="off"
              />
            </motion.div>
            {/* Date of Birth */}
            <motion.div whileHover={{ scale: 1.03 }} className="form-group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiCalendar className="text-fuchsia-500" />
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
              />
            </motion.div>
            {/* Gender */}
            <motion.div whileHover={{ scale: 1.03 }} className="form-group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiUser className="text-violet-500" />
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg appearance-none cursor-pointer"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
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
            {/* Address */}
            <motion.div whileHover={{ scale: 1.03 }} className="form-group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiMapPin className="text-purple-500" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                placeholder="Enter your address"
                autoComplete="off"
              />
            </motion.div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.02 }}
            className="form-group relative"
          >
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
              <FiBook className="text-fuchsia-500" />
              Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 resize-none focus:shadow-lg"
              placeholder="Tell us about your teaching experience, interests, and what makes you unique..."
            />
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Share your teaching philosophy and what makes you stand out as an educator
            </p>
          </motion.div>
           <motion.div whileHover={{ scale: 1.03 }} className="relative group">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
              Highest Qualification <span className="text-fuchsia-600">*</span>
            </label>
            <input
              type="text"
              name="qualification"
              required
              value={formData.qualification}
              onChange={handleInputChange}
              className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
              placeholder="e.g., Bachelor's in Computer Science"
              autoComplete="off"
            />
          </motion.div>
          {/* University/Institution */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative group">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
              University/Institution <span className="text-fuchsia-600">*</span>
            </label>
            <input
              type="text"
              name="university"
              required
              value={formData.university}
              onChange={handleInputChange}
              className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
              placeholder="e.g., Stanford University"
              autoComplete="off"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} className="relative group">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
              placeholder="e.g., Artificial Intelligence"
              autoComplete="off"
            />
          </motion.div>
           <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="form-group relative"
      >
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
          Certificates & Achievements
        </label>
        <div className="mt-2 flex justify-center px-6 py-8 border-2 border-dashed border-violet-200 rounded-xl bg-violet-50/30 hover:bg-violet-50/50 transition-colors duration-200">
          <div className="text-center">
            <FiUploadCloud className="mx-auto h-12 w-12 text-violet-500" />
            <div className="mt-4">
              <label htmlFor="certificates" className="cursor-pointer">
                <span className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                  Choose Files
                </span>
                <input
                  id="certificates"
                  name="certificates"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={e => handleFileUpload(e, 'certificates')}
                />
              </label>
              <p className="mt-2 text-sm text-gray-500">
                or drag and drop your files here
              </p>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Supported formats: PNG, JPG, PDF (Max 10MB each)
            </p>
          </div>
        </div>
      </motion.div>
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
      <motion.div
        className="mb-16 text-center relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-600 bg-clip-text text-transparent mb-3 font-jakarta tracking-tight drop-shadow-lg">
          Professional Details & Teaching Preferences
        </h3>
        <p className="text-gray-700 text-xl font-medium font-inter drop-shadow-sm">
          Share your professional experience and expertise
        </p>
      </motion.div>

      <div className="space-y-14 relative z-10">
        {/* Main Professional Details */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-white/85 rounded-3xl shadow-xl border border-purple-100/60 backdrop-blur-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Years of Experience */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiBriefcase className="text-violet-500" />
                Years of Experience
              </label>
              <input
                type="number"
                name="experience"
                required
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                placeholder="Enter years of experience"
                min="0"
                max="50"
              />
            </motion.div>
            {/* Subjects */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiBook className="text-violet-500" />
                Subjects
              </label>
              <Select
                isMulti
                name="subjects"
                options={subjects.map((subject) => ({ value: subject, label: subject }))}
                value={formData.subjects.map((subject) => ({ value: subject, label: subject }))}
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    subjects: selected ? selected.map((option) => option.value) : [],
                  })
                }
                styles={customSelectStyles}
                placeholder="Select subjects..."
              />
            </motion.div>
            {/* Teaching Levels */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiLayers className="text-violet-500" />
                Teaching Levels
              </label>
              <Select
                isMulti
                name="teachingLevel"
                options={teachingLevels.map((level) => ({ value: level, label: level }))}
                value={formData.teachingLevel.map((level) => ({ value: level, label: level }))}
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    teachingLevel: selected ? selected.map((option) => option.value) : [],
                  })
                }
                styles={customSelectStyles}
                placeholder="Select teaching levels..."
              />
            </motion.div>
            {/* Previous Institutions */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiBookOpen className="text-violet-500" />
                Previous Institutions
              </label>
              <input
                type="text"
                name="previousInstitutions"
                value={formData.previousInstitutions.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    previousInstitutions: e.target.value.split(",").map((item) => item.trim()),
                  })
                }
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                placeholder="Enter institutions separated by commas"
              />
            </motion.div>
            {/* Available Timings */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2 font-jakarta transition-all">
                <FiClock className="text-violet-500" />
                Available Timings
              </label>
              <Select
                isMulti
                options={timingOptions}
                styles={customSelectStyles}
                value={timingOptions.filter((option) =>
                  formData.availableTimings.includes(option.value)
                )}
                onChange={(selected) => {
                  handleInputChange({
                    target: {
                      name: "availableTimings",
                      value: selected ? selected.map((item) => item.value) : [],
                    },
                  });
                }}
                placeholder="Select available times..."
              />
            </motion.div>
            {/* Preferred Mode */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2 font-jakarta transition-all">
                <FiMonitor className="text-violet-500" />
                Preferred Mode
              </label>
              <Select
                isMulti
                options={modeOptions}
                styles={customSelectStyles}
                value={modeOptions.filter((option) =>
                  formData.preferredMode.includes(option.value)
                )}
                onChange={(selected) => {
                  handleInputChange({
                    target: {
                      name: "preferredMode",
                      value: selected ? selected.map((item) => item.value) : [],
                    },
                  });
                }}
                placeholder="Select teaching mode..."
              />
            </motion.div>
            {/* Expected Salary */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group">
              <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2 font-jakarta transition-all">
                <FiDollarSign className="text-violet-500" />
                Expected Salary (PKR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                  placeholder="Enter amount in PKR"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
                  PKR
                </span>
              </div>
            </motion.div>
          </div>

          {/* Uploads and CNIC */}
          <div className="mt-14 space-y-14">
            {/* Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { key: "cnicFront", label: "CNIC Front" },
                { key: "cnicBack", label: "CNIC Back" },
                { key: "lastDegree", label: "Last Degree" },
              ].map(({ key, label }) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.03 }}
                  className="relative group flex flex-col items-center bg-white/80 rounded-2xl shadow-xl border border-purple-100/60 p-6"
                >
                  <span className="text-lg md:text-xl font-semibold text-gray-700 font-jakarta mb-4">
                    {label}
                  </span>
                  {/* Preview Area */}
                  <div className="w-44 h-44 rounded-xl overflow-hidden ring-8 ring-violet-200/80 bg-gradient-to-br from-purple-50 to-fuchsia-50 shadow-2xl flex items-center justify-center mb-4">
                    {formData[key] instanceof File ? (
                      <img
                        src={URL.createObjectURL(formData[key])}
                        alt={label}
                        className="w-full h-full object-cover transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiUser className="w-16 h-16 text-violet-300" />
                      </div>
                    )}
                  </div>
                  {/* Upload Button */}
                  <div className="relative w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) handleFileUpload(file, key);
                      }}
                      className="hidden"
                      id={`${key}-upload`}
                    />
                    <motion.label
                      htmlFor={`${key}-upload`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex justify-center items-center px-5 py-3 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-violet-600 text-white rounded-xl shadow-lg cursor-pointer font-jakarta transition-all duration-200 hover:shadow-fuchsia-300/70 border-2 border-white"
                    >
                      <FiUploadCloud className="mr-2 w-5 h-5" />
                      Upload {label}
                    </motion.label>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CNIC Number Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center mt-10"
            >
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
                <FiCreditCard className="text-violet-500" />
                CNIC Number
              </label>
              <input
                type="text"
                name="cnicNumber"
                value={formData.cnicNumber}
                maxLength={15}
                onChange={handleInputChange}
                className="w-80 px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter text-lg shadow transition-all duration-200 focus:shadow-lg text-center"
                placeholder="Enter your CNIC number"
                autoComplete="off"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
)}

        {/* Step 4 - Teaching Preferences */}
     {currentStep === 4 && (
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
    <motion.div
      className="mb-16 text-center relative z-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-600 bg-clip-text text-transparent mb-3 font-jakarta tracking-tight drop-shadow-lg">
        Teaching Preferences
      </h3>
      <p className="text-gray-700 text-xl font-medium font-inter drop-shadow-sm">
        Configure your teaching schedule and preferences
      </p>
    </motion.div>
    <div className="space-y-14 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-white/85 rounded-3xl shadow-xl border border-purple-100/60 backdrop-blur-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Available Timings */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative group">
            <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2 font-jakarta transition-all">
              <FiClock className="text-violet-500" />
              Available Timings
            </label>
            <Select
              isMulti
              options={timingOptions}
              styles={customSelectStyles}
              value={timingOptions.filter(option =>
                formData.availableTimings.includes(option.value)
              )}
              onChange={(selected) => {
                handleInputChange({
                  target: {
                    name: 'availableTimings',
                    value: selected ? selected.map(item => item.value) : []
                  }
                });
              }}
              placeholder="Select available times..."
            />
          </motion.div>
          {/* Preferred Mode */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative group">
            <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2 font-jakarta transition-all">
              <FiMonitor className="text-violet-500" />
              Preferred Mode
            </label>
            <Select
              isMulti
              options={modeOptions}
              styles={customSelectStyles}
              value={modeOptions.filter(option =>
                formData.preferredMode.includes(option.value)
              )}
              onChange={(selected) => {
                handleInputChange({
                  target: {
                    name: 'preferredMode',
                    value: selected ? selected.map(item => item.value) : []
                  }
                });
              }}
              placeholder="Select teaching mode..."
            />
          </motion.div>
          {/* Expected Salary */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative group">
            <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2 font-jakarta transition-all">
              <FiDollarSign className="text-violet-500" />
              Expected Salary (PKR)
            </label>
            <div className="relative">
              <input
                type="number"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
                placeholder="Enter amount in PKR"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
                PKR
              </span>
            </div>
          </motion.div>
          {/* Teaching Methodology */}
          {/* <motion.div whileHover={{ scale: 1.03 }} className="relative group md:col-span-2">
            <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2 font-jakarta transition-all">
              <FiBookOpen className="text-violet-500" />
              Teaching Methodology
            </label>
            <div className="relative transition-all duration-300">
              <textarea
                name="teachingMethodology"
                value={formData.teachingMethodology}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 resize-none focus:shadow-lg"
                placeholder="Describe your teaching approach, methods, and techniques you use to ensure effective learning..."
                rows={4}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Tip: Include your teaching philosophy, assessment methods, and how you handle different learning styles
            </p>
          </motion.div> */}
        </div>
      </motion.div>
    </div>
  </motion.div>
)}

        {/* Step 5 - Documents Upload */}
{!formSubmitted && currentStep === 5 && (
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
    <motion.div
      className="mb-16 text-center relative z-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-600 bg-clip-text text-transparent mb-3 font-jakarta tracking-tight drop-shadow-lg">
        Document Uploads
      </h3>
      <p className="text-gray-700 text-xl font-medium font-inter drop-shadow-sm">
        Please upload your identification and last degree <span className="text-fuchsia-700 font-semibold">securely</span>
      </p>
    </motion.div>
    <div className="space-y-14 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { key: 'cnicFront', label: 'CNIC Front' },
          { key: 'cnicBack', label: 'CNIC Back' },
          { key: 'lastDegree', label: 'Last Degree' }
        ].map(({ key, label }) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.03 }}
            className="relative group flex flex-col items-center bg-white/80 rounded-2xl shadow-xl border border-purple-100/60 p-6"
          >
            <span className="text-lg md:text-xl font-semibold text-gray-700 font-jakarta mb-4">
              {label}
            </span>
            {/* Preview Area */}
            <div className="w-44 h-44 rounded-xl overflow-hidden ring-8 ring-violet-200/80 bg-gradient-to-br from-purple-50 to-fuchsia-50 shadow-2xl flex items-center justify-center mb-4">
              {formData[key] instanceof File ? (
                <img
                  src={URL.createObjectURL(formData[key])}
                  alt={label}
                  className="w-full h-full object-cover transition duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiUser className="w-16 h-16 text-violet-300" />
                </div>
              )}
            </div>
            {/* Upload Button */}
            <div className="relative w-full">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleFileUpload(file, key);
                  }
                }}
                className="hidden"
                id={`${key}-upload`}
              />
              <motion.label
                htmlFor={`${key}-upload`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.96 }}
                className="flex justify-center items-center px-5 py-3 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-violet-600 text-white rounded-xl shadow-lg cursor-pointer font-jakarta transition-all duration-200 hover:shadow-fuchsia-300/70 border-2 border-white"
              >
                <FiUploadCloud className="mr-2 w-5 h-5" />
                Upload {label}
              </motion.label>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CNIC Number Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center mt-10"
      >
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
          <FiCreditCard className="text-violet-500" />
          CNIC Number
        </label>
        <input
          type="text"
          name="cnicNumber"
          value={formData.cnicNumber}
          maxLength={15}
          onChange={handleInputChange}
          className="w-80 px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter text-lg shadow transition-all duration-200 focus:shadow-lg text-center"
          placeholder="Enter your CNIC number"
          autoComplete="off"
        />
      </motion.div>
    </div>
  </motion.div>
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
  disabled={loading} // 🔹 Form submit होते ही बटन disable हो जाएगा
  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    ${currentStep === 1 ? 'ml-auto' : ''}`}
>
  {loading ? (
    <>
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
        ></path>
      </svg>
      Submitting...
    </>
  ) : (
    currentStep === steps.length ? 'Submit' : 'Next'
  )}
</button>

        </div>
       

      </motion.form>
    




    </div>
    

  );
};

export default TeacherForm;
