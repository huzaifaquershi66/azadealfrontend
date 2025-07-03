import React, { useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { FiUser, FiPhone, FiMapPin, FiBook, FiLock } from "react-icons/fi";
import { MdOutlineLocationCity } from "react-icons/md";
import academy from "./assets/academy.png"; // Adjust the import path as necessary
// Dummy data for province/city
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
const Academyform = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    province: "",
    city: "",
    about: "",
    password: "",
    confirmPassword: "",
  });

  const cities = formData.province ? provincesWithCities[formData.province] || [] : [];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === "province" ? { city: "" } : {}),
    }));
  };

  return (
   <div className="min-h-screen flex items-center justify-center  font-sans p-4">
      <div className="flex flex-row rounded-[2.5rem] shadow-2xl border border-gray-100 bg-white max-w-[1500px] w-full mx-2 min-h-[900px]">
        {/* LEFT: Info & Branding */}
       
       <div className="flex flex-col justify-center items-center w-[48%] px-0 py-0 min-h-full">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 via-blue-50 to-fuchsia-50 flex flex-col justify-center items-center rounded-l-[2.5rem]">
            <div className="flex items-center gap-4 mb-8 mt-4">
              <FaGraduationCap className="text-7xl text-fuchsia-700 drop-shadow" />
              <span className="text-5xl font-extrabold font-jakarta text-blue-900 tracking-tight drop-shadow-lg">
                Azad Education
              </span>
            </div>
            <h1 className="text-3xl font-bold font-jakarta text-blue-700 mb-8 text-center tracking-tight">
              Taleem Har Ghar Tak
            </h1>
            <div className="w-full flex justify-center">
              <img
                src={academy}
                alt="Education Visual"
                className="w-[400px] h-[460px] max-w-full rounded-3xl   object-cover"
                 style={{ minHeight: 380, maxHeight: 500, background: "transparent" }}
              />
            </div>
            <div className="text-2xl text-center text-blue-900 font-semibold mt-10 font-inter px-6">
              Academy, Teachers, Students<br />ab aik click par!
            </div>
          </div>
        </div>

        {/* RIGHT: Teacher Signup Form */}
          <div className="flex flex-col justify-center items-center w-[52%] px-24 py-16 bg-white min-h-full">
  <div className="w-full max-w-[600px]">
    <h2 className="text-4xl font-extrabold font-jakarta text-center bg-gradient-to-r from-blue-700 to-fuchsia-600 bg-clip-text text-transparent mb-14 tracking-tight drop-shadow-md">
      Register your Academy
    </h2>
    <form className="space-y-7">
      {/* Name */}
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          <FiUser />
        </span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 bg-white placeholder-gray-400 text-gray-700 font-inter shadow text-lg transition-all"
          placeholder="Full Name"
          required
        />
      </div>
      {/* Contact */}
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          <FiPhone />
        </span>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 bg-white placeholder-gray-400 text-gray-700 font-inter shadow text-lg transition-all"
          placeholder="Contact Number"
          required
        />
      </div>
      {/* Password */}
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          <FiLock />
        </span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 bg-white placeholder-gray-400 text-gray-700 font-inter shadow text-lg transition-all"
          placeholder="Create password"
          required
        />
      </div>
      {/* Confirm Password */}
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          <FiLock />
        </span>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 bg-white placeholder-gray-400 text-gray-700 font-inter shadow text-lg transition-all"
          placeholder="Confirm password"
          required
        />
      </div>
      {/* Province */}
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          <FiMapPin />
        </span>
        <select
          name="province"
          value={formData.province}
          onChange={handleChange}
          className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 bg-white text-gray-700 font-inter shadow text-lg transition-all"
          required
        >
          <option value="">Select Province</option>
          {Object.keys(provincesWithCities).map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>
      </div>
      {/* City */}
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          <MdOutlineLocationCity />
        </span>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 bg-white text-gray-700 font-inter shadow text-lg transition-all"
          required
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      {/* About Yourself */}
      <div className="relative">
        <span className="absolute left-5 top-6 text-gray-400 text-xl">
          <FiBook />
        </span>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 bg-white placeholder-gray-400 text-gray-700 font-inter shadow text-lg transition-all resize-none"
          rows={4}
          placeholder="Write about yourself (teaching experience, interests, etc.)"
          required
        />
      </div>
      {/* Submit */}
      <button
        type="submit"
        className="w-full py-4 mt-2 bg-[#072153] hover:bg-[#05153a] text-white font-jakarta font-semibold rounded-2xl shadow-xl hover:shadow-blue-400/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-2xl"
      >
        Register
      </button>
      {/* Terms and Conditions */}
      <div className="flex items-center justify-center mt-3">
  <input
    type="checkbox"
    id="terms"
    name="terms"
    required
    className="accent-[#072153] w-4 h-4 rounded border-gray-300 focus:ring-[#072153] focus:ring-2"
  />
  <label htmlFor="terms" className="ml-2 text-gray-500 text-sm select-none">
    I agree to <span className="font-semibold text-[#072153]">Azad Education</span> terms and conditions
  </label>
</div>
    </form>
    <p className="text-center text-gray-700 mt-12 font-inter text-lg">
      Already have an account?{" "}
      <a
        href="/login"
        className="text-fuchsia-600 hover:text-fuchsia-700 font-semibold hover:underline"
      >
        Login
      </a>
    </p>
  </div>
</div>
      </div>
    </div>
  );
};

export default Academyform;
