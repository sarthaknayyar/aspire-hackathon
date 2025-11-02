import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRef } from "react";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [user, setUser] = useState(null);


  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  function scheduleClose(ms = 150) {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), ms);
  }
  function cancelClose() {
    clearTimeout(closeTimer.current);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://aspire-hackathon.onrender.com/user/userInfo",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setUser(data);
        } else if (response.status === 401) {
          console.warn("Token expired. Logging out...");
          logout();
          navigate("/login");
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn, navigate, logout]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "FAQs", path: "/faqs" },
    { name: "Submit Complaints", path: "/complaints" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className=" text-white px-8 py-4 flex justify-between items-center shadow-md"
     style={{ backgroundColor: "#83a2d4" }}>
      <Link to={"/"} className="text-2xl font-bold">JansunwAI</Link>

      <nav className="relative">
        <ul className="flex space-x-6 relative">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative cursor-pointer px-4 py-2 transition group"
              onClick={() => setActive(item.name)}
            >
              {/* Capsule Effect (Stays when active) */}
              <span
                className={`absolute inset-0 bg-white rounded-full transition-all duration-300 ease-in-out 
                  ${
                    active === item.name
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
              ></span>
              {/* Menu Item Text */}
              <Link to={item.path}>
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    active === item.name ? "text-blue-900" : "group-hover:text-blue-900"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {isLoggedIn ? (
           <div
           ref={ref}
           className="relative inline-block text-left"
           tabIndex={0}
           onFocus={() => { cancelClose(); setOpen(true); }}
           onBlur={() => scheduleClose(0)}
         >
           <button
             onClick={() => setOpen(o => !o)}
             onMouseEnter={() => { cancelClose(); setOpen(true); }}
             onMouseLeave={() => scheduleClose(150)}
             aria-expanded={open}
             className="bg-white text-blue-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
           >
             {user ? user.email : "user"}
           </button>
     
           {/*
             Keep the dropdown DOM-wise inside the wrapper so pointer events count as "inside".
             Attach mouse enter/leave on the dropdown too so moving into it cancels the close timer.
           */}
           {open && (
             <div
               onMouseEnter={() => cancelClose()}
               onMouseLeave={() => scheduleClose(150)}
               className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
               style={{ WebkitTapHighlightColor: "transparent" }}
             >
               <ul className="py-1">
                 <li>
                   <button
                     onClick={() => { setOpen(false); navigate("/homepage"); }}
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                   >
                     Dashboard
                   </button>
                 </li>
                 <li>
                   <button
                     onClick={() => { setOpen(false); logout(); navigate("/"); }}
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                   >
                     Logout
                   </button>
                 </li>
               </ul>
             </div>
           )}
         </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;