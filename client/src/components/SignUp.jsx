import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    address: "",
    state: "",
    city: "",
    phone: "",
    email: "",
    password: "",
    pincode: ""
  });

  const stateLists = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Rajahmundry", "Kakinada", "Anantapur", "Nellore", "Kadapa", "Chittoor"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Roing", "Tezu", "Along", "Seppa", "Changlang"],
    "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Tezpur", "Tinsukia", "Nagaon", "Diphu", "Bongaigaon", "Sivasagar"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Begusarai", "Purnia", "Samastipur", "Ara", "Chhapra"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Jagdalpur", "Rajnandgaon", "Raigarh", "Ambikapur", "Dhamtari"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Calangute", "Bicholim", "Canacona", "Curchorem", "Sanguem"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Jamnagar", "Bhavnagar", "Anand", "Junagadh", "Bhuj"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Rohtak", "Hisar", "Yamunanagar", "Sonipat", "Panchkula"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Solan", "Mandi", "Chamba", "Bilaspur", "Hamirpur", "Una"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Palamu", "Dumka"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi", "Shivamogga", "Davanagere", "Ballari", "Tumakuru", "Udupi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha", "Palakkad", "Kollam", "Kannur", "Kottayam", "Malappuram"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Ratlam", "Rewa", "Sagar", "Satna", "Chhindwara"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai"],
    "Manipur": ["Imphal", "Bishnupur", "Thoubal", "Churachandpur", "Ukhrul", "Tamenglong", "Senapati", "Kakching", "Jiribam", "Moreh"],
    "Meghalaya": ["Shillong", "Tura", "Nongpoh", "Baghmara", "Jowai", "Williamnagar", "Resubelpara", "Mairang", "Nongstoin", "Khliehriat"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Saiha", "Mamit", "Bairabi", "Saitual"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Mon", "Wokha", "Zunheboto", "Phek", "Kiphire", "Longleng"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur", "Puri", "Balasore", "Bhadrak", "Angul", "Jeypore"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Moga", "Ferozepur"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Alwar", "Bharatpur", "Sikar", "Chittorgarh"],
    "Sikkim": ["Gangtok", "Namchi", "Mangan", "Gyalshing", "Pelling", "Rangpo", "Jorethang", "Ravangla", "Lachen", "Lachung"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Vellore", "Tirunelveli", "Erode", "Thoothukudi", "Dindigul"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Mahbubnagar", "Siddipet", "Ramagundam", "Mancherial", "Adilabad"],
    "Tripura": ["Agartala", "Udaipur", "Kailashahar", "Dharmanagar", "Ambassa", "Belonia", "Kamalpur", "Sonamura", "Khowai", "Bishalgarh"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Meerut", "Ghaziabad", "Gorakhpur", "Bareilly", "Aligarh"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Almora", "Rishikesh", "Mussoorie", "Pithoragarh", "Rudrapur", "Haldwani", "Tehri"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Kharagpur", "Bardhaman", "Midnapore", "Berhampore"],
    "Delhi": ["New Delhi", "Connaught Place", "Chandni Chowk", "Saket", "Karol Bagh", "Rohini", "Dwarka", "Lajpat Nagar", "Hauz Khas", "Janakpuri"]
  };
  

  const States = Object.keys(stateLists);
  const [selectedState, setSelectedState] = useState(States[0]);
  const [list, setList] = useState(stateLists[selectedState]);

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setList(stateLists[newState]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  async function handleSignup() {
    console.log(formData);
    const response = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      navigate("/login");
    } else if (response.status === 400) {
      setStatus("User already exists");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 bg-fill bg-center relative"
    style={{ backgroundImage: "url('/images/login-bg.jpg')" }}>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Registration / Sign-up Form
        </h2>
        <p className="text-gray-500 text-center mt-1">
          Fill in your details to create an account.
        </p>

        <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="text-sm font-semibold text-gray-600">Full Name *</label>
      <input 
        type="text" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" 
        required 
      />
    </div>
    <div>
      <label className="text-sm font-semibold text-gray-600">Password *</label>
      <input 
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" 
        required 
      />
    </div>
  </div>

  <div className="grid grid-cols-2 gap-6 mt-4">
    <div>
      <label className="text-sm font-semibold text-gray-600">Gender *</label>
      <div className="flex space-x-4 mt-1">
        {["Male", "Female", "Transgender"].map((gender) => (
          <label key={gender} className="flex items-center space-x-2">
            <input 
              type="radio" 
              name="gender" 
              value={gender} 
              onChange={handleChange} 
              className="text-indigo-500 focus:ring-indigo-400" 
            />
            <span>{gender}</span>
          </label>
        ))}
      </div>
    </div>
    <div>
      <label className="text-sm font-semibold text-gray-600">Pincode *</label>
      <input 
        type="text" 
        name="pincode" 
        value={formData.pincode} 
        onChange={handleChange} 
        className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" 
        pattern="[0-9]{6}" 
        maxLength="6"
        required 
      />
    </div>
  </div>

  <div className="mt-4">
    <label className="text-sm font-semibold text-gray-600">Address *</label>
    <input 
      type="text" 
      name="address" 
      value={formData.address} 
      onChange={handleChange} 
      className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" 
      required 
    />
  </div>

  <div className="grid grid-cols-2 gap-6 mt-4">
    <div>
      <label className="text-sm font-semibold text-gray-600">State *</label>
      <select 
        name="state" 
        value={formData.state} 
        onChange={(e) => { handleChange(e); handleStateChange(e); }} 
        className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" 
        required
      >
        {States.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="text-sm font-semibold text-gray-600">City *</label>
      <select 
        name="city" 
        value={formData.city} 
        onChange={handleChange} 
        className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" 
        required
      >
        {list.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-6 mt-4">
    <div>
      <label className="text-sm font-semibold text-gray-600">Phone *</label>
      <input 
        type="text" 
        name="phone" 
        value={formData.phone} 
        onChange={handleChange} 
        className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" 
        required 
      />
    </div>
    <div>
      <label className="text-sm font-semibold text-gray-600">Email *</label>
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" 
        required 
      />
    </div>
  </div>

  <button 
    type="submit" 
    className="w-full bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white py-3 rounded-full font-semibold shadow-md mt-6 hover:shadow-lg transition-all duration-300" 
    onClick={handleSignup}
  >
    Register ➜
  </button>
</form>

      </div>
    </div>
  );
};

export default SignupForm;
