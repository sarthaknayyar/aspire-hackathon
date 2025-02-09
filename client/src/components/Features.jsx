const Features = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20 px-6 md:px-20">
        <h3 className="text-4xl font-extrabold text-gray-800 mb-16 antialiased text-center">
          A Platform for Efficient Grievance Redressal 
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 shadow-lg rounded-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src="/images/bg8.png"
              alt="Easy Complaint Registration"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Easy Complaint Registration
            </h3>
            <p className="text-gray-600">
              Submit grievances effortlessly through our user-friendly platform.
            </p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src="/images/bg9.png"
              alt="Track Your Complaint"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Track Your Complaint
            </h3>
            <p className="text-gray-600">
              Stay updated on the progress of your grievance in real time.
            </p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src="/images/bg10.png"
              alt="Fast & Transparent Resolution"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Fast & Transparent Resolution
            </h3>
            <p className="text-gray-600">
              Our system ensures quick resolution and complete transparency.
            </p>
          </div>
        </div>
      </section>
  )
}
export default Features