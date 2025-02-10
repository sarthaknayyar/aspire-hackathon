export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl p-8">
        {/* Left Section: Contact Information */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            Contact us through email, phone, or fill out the form below to submit your grievance. Our team will address your concerns promptly.
          </p>
          <div>
            <p className="text-lg text-gray-800 font-semibold">
              Email:
              <a href="mailto:grievances@uttarpradeshgovt.com" className="text-blue-600">
                grievances@uttarpradeshgovt.com
              </a>
            </p>

            <p className="text-lg text-gray-800 font-semibold">
              Phone: <span className="text-blue-600">+1 800-123-4567</span>
            </p>
          </div>
          <a
            href="./faq"
            className="text-blue-600 font-medium underline hover:text-blue-700"
          >
            FAQ's
          </a>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Support Hours
              </h2>
              <p className="text-gray-600">
                Monday to Friday, 9 AM to 6 PM
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Feedback & Suggestions
              </h2>
              <p className="text-gray-600">
                We value your feedback and continuously improve based on your suggestions.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Media Inquiries</h2>
              <p className="text-lg text-gray-800 font-semibold">
                Email:
                <a href="mailto: mediasupport@uttarpradeshgovt.com" className="text-blue-600">
                  mediasupport@uttarpradeshgovt.com
                </a>
              </p>

            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="grid grid-cols-3 gap-4">
              <select
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="+62">+62</option>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
              </select>
              <input
                type="text"
                placeholder="Phone Number"
                className="col-span-2 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <textarea
              placeholder="How can we help?"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
            >
              Submit
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            By contacting us, you agree to our{" "}
            <a href="#" className="text-blue-600 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
