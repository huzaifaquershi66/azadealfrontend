import React from 'react'

const remaing = () => {
  return (
    <div>
       {courses.map((course, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden
                         border border-white/20 backdrop-blur-lg"
              >
                {/* Background Glow Effect */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 
                              group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-500" />
                
                {/* Course Image Container */}
                <div className="relative h-56 overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  
                  {/* Course Image */}
                  <motion.img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
      
                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-4 left-4 z-20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-medium
                                 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600
                                 shadow-lg backdrop-blur-sm border border-white/20">
                      {course.category}
                    </span>
                  </motion.div>
      
                  {/* Course Duration */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2">
                    <div className="flex items-center px-3 py-1.5 bg-black/50 rounded-full backdrop-blur-sm">
                      <FaClock className="text-white/80 mr-2 text-sm" />
                      <span className="text-white/90 text-sm">{course.duration}</span>
                    </div>
                  </div>
      
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 z-20 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg backdrop-blur-sm
                               text-indigo-600 hover:text-purple-600 transition-colors duration-300"
                    >
                      <FaBookmark className="text-lg" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg backdrop-blur-sm
                               text-red-500 hover:text-red-600 transition-colors duration-300"
                    >
                      <FaHeart className="text-lg" />
                    </motion.button>
                  </div>
                </div>
      
                {/* Course Content */}
                <div className="p-8 relative">
                  {/* Course Title */}
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 
                               group-hover:text-indigo-600 transition-colors duration-300">
                    {course.title}
                  </h4>
      
                  {/* Course Stats */}
                  <div className="flex items-center space-x-6 mb-6">
                    {/* Rating */}
                    <div className="flex items-center">
                      <div className="flex -space-x-1">
                        {[...Array(5)].map((_, index) => (
                          <FaStar 
                            key={index}
                            className={`text-lg ${index < Math.floor(course.rating) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                     <span className="ml-2 text-gray-600 dark:text-gray-400 font-medium">
                        {course.rating}
                      </span>
                    </div> 
      
                    {/* Student Count */}
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaUsers className="text-indigo-600 mr-2" />
                      <span className="font-medium">{course.students} students</span>
                    </div>
                  </div>
      
                  {/* Course Preview */}
                  <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                      {course.description}
                    </p>
                  </div>
      
                  {/* Course Features */}
                  <div className="flex items-center gap-4 mb-6">
                    {['Video Lessons', 'Assignments', '24/7 Support'].map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-full text-sm
                                 text-indigo-600 dark:text-indigo-400 font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>  
      
                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    {/* Price */}
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Course Fee</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                                     bg-clip-text text-transparent">
                        ${course.price}
                      </span>
                    </div>
      
                    {/* Enroll Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl
                               font-medium shadow-lg shadow-indigo-600/20 hover:shadow-xl
                               hover:shadow-indigo-600/40 transition-all duration-300
                               flex items-center space-x-2"
                    >
                      <FaPlayCircle className="text-lg" />
                      <span>Enroll Now</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))} 
    </div>
  )
}

export default remaing
