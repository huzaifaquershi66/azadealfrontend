export const animationControls = {
    heroText: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        duration: 1
      }
    },
    heroSubtext: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: {
        type: "spring",
        damping: 7,
        stiffness: 100,
        delay: 0.2,
        duration: 1
      }
    },
    heroButtons: {
      initial: { opacity: 0, y: 25 },
      animate: { opacity: 1, y: 0 },
      transition: {
        type: "spring",
        damping: 7,
        stiffness: 100,
        delay: 0.4,
        duration: 1
      }
    }
  };