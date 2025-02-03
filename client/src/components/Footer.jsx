export default function Footer() {
    return (
      <footer className="mt-10">
        {/* First Stripe */}
        <div className="bg-blue-700 text-white py-4 text-center px-4">
          <p className="text-sm">
            This site is designed, developed & hosted by <strong>National Informatics Centre</strong>, 
            Ministry of Electronics & IT (MeitY), Government of India and Content owned by 
            <strong> Department of Administrative Reforms & Public Grievances</strong>.
          </p>
        </div>
  
        {/* Second Stripe */}
        <div className="bg-gray-900 text-gray-300 py-3 text-center px-4 text-xs">
          <p>Portal is Compatible with all major Browsers like Google Chrome, Mozilla Firefox, Microsoft Edge, Safari etc.</p>
          <p>Best Viewed in 1440 x 900 resolution</p>
          <p>
            <span className="mr-2">Disclaimer</span> | 
            <span className="ml-2 mr-2">Website Policies</span> | 
            <span className="ml-2 mr-2">Web Information Manager</span> | 
            <span className="ml-2">Version 7.0.01092019.0.0</span>
          </p>
          <p>Copyright © 2025 | Last Updated On: 24-01-2025</p>
          <p>Total Visitors: <strong>4,254,451</strong> (since 19-01-2024)</p>
        </div>
      </footer>
    );
  }
  