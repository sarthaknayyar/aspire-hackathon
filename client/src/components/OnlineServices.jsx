import { motion } from "framer-motion";

const OnlineServices = () => {
  return (
    <section className="py-20 px-6 md:px-20 text-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12">
      Explore Online Services
    </h2>

    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    // variants={{
    //   visible: {
    //     transition: {
    //       // duration: 1.5, // Smooth overall transition duration
    //       // ease: "easeInOut", // Natural acceleration & deceleration
    //       // staggerChildren: 0.5, // Delays each child animation
    //     },  
    //   },
    // }}
    >
      {[
        {
          title: "Submit Feedback on Resolution",
          description: "Provide feedback on how your grievance was handled and suggest improvements.",
        },
        {
          title: "Access Knowledge Base & FAQs",
          description: "Find answers to common grievances, procedures, and legal rights to resolve issues faster.",
        },
        {
          title: "Appeal a Decision",
          description: "Request a review if you are unsatisfied with the resolution provided.",
        },
        {
          title: "Government Schemes & Benefits",
          description: "Check eligibility and raise concerns regarding public welfare programs.",
        },
        {
          title: "Public Service Issues",
          description: "Report problems related to roads, water, electricity, and sanitation.",
        },
        {
          title: "Legal & Administrative Concerns",
          description: "Seek assistance for legal matters or administrative delays in services.",
        },
      ].map((item, idx) => {
        const variant =
          idx < 3
            ? {
              hidden: { opacity: 0, x: "-100vw" },
              ease: "easeInOut",
              visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
              stagger: { duration: 0.5 },
            }
            : {
              hidden: { opacity: 0, x: "100vw" },
              ease: "easeInOut  ",
              visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
              stagger: { duration: 0.5 },
            };

        return (
          <motion.div
            key={idx}
            className="relative bg-white p-8 rounded-2xl shadow-lg transition transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
            variants={variant}
          >
            {/* Subtle Glossy Overlay */}
            <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-lg transition-opacity opacity-0 hover:opacity-20"></div>

            {/* Icon Placeholder (For Future Icon Addition) */}
            <div className="mb-4 w-16 h-16 mx-auto flex items-center justify-center bg-blue-100 text-blue-500 rounded-full shadow-md">
              🛠️
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
  )
}
export default OnlineServices