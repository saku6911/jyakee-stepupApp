import { motion } from "motion/react";

function LoadingCircleSpinner() {
  return (
    <div className="flex justify-center items-center p-[40] rounded-sm will-change-transform h-screen">
      <motion.div
        className="w-20 h-20 rounded-full border-6 border-solid border-gray-300 border-t-red-800"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default LoadingCircleSpinner;
