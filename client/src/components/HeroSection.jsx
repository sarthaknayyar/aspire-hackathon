import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/images/bg4.jpg",
    "/images/bg5.jpg",
    "/images/bg6.jpg",
    "/images/bg7.jpg",
  ];

const HeroSection = () => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-115 flex items-center justify-center text-white overflow-hidden">
            {/* Background Sliding Images */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <AnimatePresence>
                    <motion.div
                        key={index}
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${images[index]})` }}
                    />
                </AnimatePresence>
            </div>

            {/* Overlay Content */}
            <div className="relative w-full h-screen flex items-center justify-center">
                {/* Translucent black overlay */}
                <div className="absolute  w-full h-screen inset-0 bg-black opacity-50"></div>

                {/* Your content */}
                <motion.div
                    initial={{ opacity: 0, y: 250 }} // Starts lower and invisible
                    animate={{ opacity: 1, y: 0 }} // Moves up and becomes visible
                    transition={{ duration: 0.8, ease: "easeOut" }} // Smooth timing
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="text-5xl font-bold">
                        Welcome to the Grievance Redressal Portal
                    </h1>
                    <p className="mt-4 text-lg">
                        A seamless and transparent platform to lodge and track your complaints.
                    </p>
                </motion.div>

            </div>

        </section>
    );
};


export default HeroSection