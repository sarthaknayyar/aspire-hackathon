import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">Grievance Portal</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            {/* <li>
              <Link to="/landingPage" className="hover:text-gray-300">Landing Page</Link>
            </li> */}
            <li>
              <Link to="/complaints" className="hover:text-gray-300">Complaints</Link>
            </li>
            <li>
              <Link to="/status" className="hover:text-gray-300">Check Status</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
