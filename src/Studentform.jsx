import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LocationSelect from "./LocationSelect";

import { 
  FiUser, FiMail, FiPhone, FiCalendar, FiBook, 
  FiUsers, FiMapPin, FiCamera, FiCheck, FiLock 
} from 'react-icons/fi';
import OtpInput from 'react-otp-input';
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
const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
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
  <form
    onSubmit={handleSubmit}
    className="space-y-10 p-8 bg-white/85 rounded-3xl shadow-xl border border-purple-100/60 backdrop-blur-lg relative z-10"
  >
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-600 bg-clip-text text-transparent font-jakarta tracking-tight drop-shadow-lg"
      >
        Student Registration
      </motion.h2>
      <p className="mt-2 text-gray-700 text-xl font-medium font-inter drop-shadow-sm">
        Join our academic community
      </p>
    </div>

    {/* Profile Picture Upload */}
    <div className="flex justify-center mb-10">
      <motion.div whileHover={{ scale: 1.07 }} className="relative">
        <div className="w-36 h-36 rounded-full overflow-hidden ring-8 ring-violet-200/90 shadow-2xl bg-gradient-animated">
          {formData.profilePicture ? (
            <img
              src={URL.createObjectURL(formData.profilePicture)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-50 via-fuchsia-50 to-violet-200 flex items-center justify-center">
              <FiUser className="w-16 h-16 text-purple-300" />
            </div>
          )}
        </div>
        <label
          htmlFor="profile-upload"
          className="absolute bottom-3 right-3 p-4 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-violet-600 text-white rounded-full shadow-xl cursor-pointer transition-all duration-200 hover:shadow-fuchsia-300/70 border-4 border-white"
        >
          <FiCamera className="w-6 h-6" />
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Student Basic Information */}
      <motion.div whileHover={{ scale: 1.03 }} className="space-y-4">
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
          <FiUser className="text-violet-500" />
          Full Name
        </label>
        <input
          type="text"
          required
          className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Enter your full name"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} className="space-y-4">
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
          <FiCalendar className="text-violet-500" />
          Date of Birth
        </label>
        <input
          type="date"
          required
          className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />
      </motion.div>

      {/* Contact Information */}
      <motion.div whileHover={{ scale: 1.03 }} className="space-y-4">
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
          <FiMail className="text-violet-500" />
          Email
        </label>
        <input
          type="email"
          required
          className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} className="space-y-4">
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
          <FiPhone className="text-violet-500" />
          Phone Number
        </label>
        <input
          type="tel"
          required
          className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+92 300 1234567"
        />
      </motion.div>

      {/* Academic Information */}
      <motion.div whileHover={{ scale: 1.03 }} className="space-y-4">
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
          <FiBook className="text-violet-500" />
          Current Grade
        </label>
        <select
          required
          className={`w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg cursor-pointer`}
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
      <motion.div whileHover={{ scale: 1.03 }} className="space-y-4">
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
          <FiUsers className="text-violet-500" />
          Parent/Guardian Name
        </label>
        <input
          type="text"
          required
          className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
          value={formData.parentName}
          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
          placeholder="Enter parent/guardian name"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} className="space-y-4">
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
          <FiPhone className="text-violet-500" />
          Parent/Guardian Phone
        </label>
        <input
          type="tel"
          required
          className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 focus:shadow-lg"
          value={formData.parentPhone}
          onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
          placeholder="+92 300 1234567"
        />
      </motion.div>
    </div>
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
    <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta transition-all">
        <FiMapPin className="text-violet-500" />
        Residential Address
      </label>
      <textarea
        required
        rows={3}
        className={`w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 font-inter shadow transition-all duration-200 resize-none focus:shadow-lg`}
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
      className="w-full py-4 px-6 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-violet-700 text-white rounded-xl font-jakarta font-semibold shadow-lg hover:shadow-fuchsia-300/20 transition-all duration-200 text-xl"
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
