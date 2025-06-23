import React from "react";

const LocationSelect = ({
  selectedProvince,
  setSelectedProvince,
  selectedCity,
  setSelectedCity,
  provincesWithCities,
}) => (
  <div className="relative group">
    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-base font-jakarta">
      <svg className="w-5 h-5 text-fuchsia-500 group-focus-within:text-purple-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>Location</span>
    </label>
    <div className="space-y-3">
      {/* Province Dropdown */}
      <div className="relative">
        <select
          value={selectedProvince}
          onChange={e => {
            setSelectedProvince(e.target.value);
            setSelectedCity("");
          }}
          className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 font-inter shadow transition-all duration-200 appearance-none pr-10 focus:shadow-lg"
        >
          <option value="">Select province</option>
          {Object.keys(provincesWithCities).map(province => (
            <option key={province} value={province}>{province}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-fuchsia-100/70 rounded-full p-1 transition-all group-hover:bg-fuchsia-200">
            <svg className="w-5 h-5 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* City Dropdown */}
      {selectedProvince && (
        <div className="relative animate-fadeIn">
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 backdrop-blur-sm text-gray-900 font-inter shadow transition-all duration-200 appearance-none pr-10 focus:shadow-lg"
          >
            <option value="">Select city</option>
            {provincesWithCities[selectedProvince]?.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-fuchsia-100/70 rounded-full p-1 transition-all group-hover:bg-fuchsia-200">
              <svg className="w-5 h-5 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default LocationSelect;