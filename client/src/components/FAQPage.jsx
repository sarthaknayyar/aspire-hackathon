import React, { useState } from "react";

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = {
    general: [
      {
        question: "What are the contact details of the Department of Administrative Reforms and Public Grievances?",
        answer:
          "The contact details for the Department of Administrative Reforms and Public Grievances can be found on their official website or through the centralized grievance portal.",
      },
      {
        question: "Where can the grievances be sent?",
        answer:
          "Grievances can be sent through the Centralized Public Grievance Redress and Monitoring System (CPGRAMS) online portal.",
      },
    ],
    submission: [
      {
        question: "How do I lodge the grievance?",
        answer:
          "You can lodge your grievance through the CPGRAMS portal by filling in the required details and attaching supporting documents, if any.",
      },
      {
        question: "What happens when I lodge the grievance?",
        answer:
          "After lodging a grievance, it is forwarded to the relevant department for resolution. You will receive updates on the status through the portal.",
      },
    ],
    tracking: [
      {
        question: "How do I track my grievance?",
        answer:
          "You can track your grievance by logging into the CPGRAMS portal and entering your grievance ID in the 'Track Grievance' section.",
      },
      {
        question: "What happens to the grievances? How are the grievances dealt with in Central Ministries/Departments?",
        answer:
          "Grievances are examined and forwarded to the concerned Ministries/Departments for resolution. Regular updates are provided on the portal.",
      },
    ],
    redressal: [
      {
        question: "After redress, can the grievance be reopened for further correspondence about it having been closed without details, etc.?",
        answer:
          "Yes, if a grievance has been closed without proper resolution or details, it can be reopened by contacting the concerned department or using the portal.",
      },
      {
        question: "What are the contact details of the Nodal Officers of Public Grievances in Ministries/Departments?",
        answer:
          "The contact details of the Nodal Officers can be found on the official website of the Department of Administrative Reforms and Public Grievances.",
      },
      {
        question: "What is the system of granting personal hearing on grievances?",
        answer:
          "A personal hearing can be granted if deemed necessary by the concerned department or officer handling the grievance.",
      },
      {
        question: "What are the types of grievances which are not taken up for redress by the Department?",
        answer:
          "Grievances related to sub-judice matters, personal disputes, RTI matters, and policy decisions are not typically taken up for redress by the Department.",
      },
    ],
    rolesAndTimeframes: [
      {
        question:
          "What is the role of the Department of Administrative Reforms and Public Grievances (DARPG) with reference to the grievances concerning Central Ministries/Departments/Organizations?",
        answer:
          "The DARPG oversees grievance redress mechanisms and ensures that grievances directed to Central Ministries/Departments are addressed promptly.",
      },
      {
        question:
          "What is the role of the Department of Administrative Reforms and Public Grievances (DARPG) with reference to the grievances concerning State Government?",
        answer:
          "For grievances concerning State Governments, the DARPG facilitates communication and ensures the grievance is forwarded to the respective State for redress.",
      },
      {
        question: "What is the time limit for redress of grievance?",
        answer:
          "The time limit for redress of grievances varies but is generally within 30 days of receipt.",
      },
    ],
    escalation: [
      {
        question:
          "What action can be taken by me in case of non-redress of my grievance within the prescribed time?",
        answer:
          "In such cases, you can escalate the grievance to higher authorities or file an appeal through the CPGRAMS portal.",
      },
      {
        question:
          "What can a citizen do if he is not satisfied with the redressal of his grievance?",
        answer:
          "If unsatisfied, a citizen can request a review or escalate the grievance to the grievance officer's supervisor or higher authorities.",
      },
    ],
  };

  const renderFAQ = (category) =>
    faqs[category].map((faq, index) => (
      <div
        key={index}
        className="mb-4 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
      >
        <button
          onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
          className={`w-full text-left text-gray-800 text-lg font-semibold flex justify-between items-center px-6 py-4 hover:bg-indigo-50 transition-colors ${
            openQuestion === index ? "bg-indigo-50" : "bg-white"
          }`}
        >
          {faq.question}
          <span
            className={`ml-4 transform transition-transform duration-300 ${
              openQuestion === index ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </button>
        <div
          style={{
            height: openQuestion === index ? "auto" : 0,
            overflow: "hidden",
          }}
          className={`px-6 bg-indigo-50 text-gray-700 text-base transition-all duration-300 ${
            openQuestion === index
              ? "py-4 opacity-100 scale-y-100"
              : "py-0 opacity-0 scale-y-0"
          } transform origin-top`}
        >
          {faq.answer}
        </div>
      </div>
    ));

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-lg text-center mb-8 max-w-2xl mx-auto">
          We’re here to help answer any questions you have about grievance
          redressal processes and policies.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(faqs).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 border-2 ${
                activeTab === category
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                  : "bg-white border-gray-300 text-gray-800 hover:bg-indigo-50"
              }`}
            >
              {category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div>{renderFAQ(activeTab)}</div>
      </div>
    </div>
  );
};

export default FAQPage;
