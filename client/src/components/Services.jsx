import { motion } from "framer-motion";

const Services = () => {
  return (
    <section className="bg-blue-800 text-white py-20 px-6 md:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-extrabold">
            Our Services
          </h2>
          <p className="text-lg mt-4 text-blue-200">
            We are committed to resolving your complaints efficiently.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[
            { title: "File Complaints", description: "Submit grievances in minutes." },
            { title: "Track Status", description: "Monitor complaint progress." },
            { title: "Get Support", description: "Connect with officials." },
            { title: "Report Issues", description: "Raise public concerns effectively." },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-8 bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-base text-blue-100">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
  )
}
export default Services