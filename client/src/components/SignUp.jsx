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
  });

  const stateLists = {
    "Andhra Pradesh": ["Item1", "Item2", "Item3"],
    "Arunachal Pradesh": ["ItemA", "ItemB", "ItemC"],
    "Assam": ["ItemX", "ItemY", "ItemZ"],
    "Bihar": ["Item4", "Item5", "Item6"],
    "Chhattisgarh": ["Item7", "Item8", "Item9"],
    "Goa": ["Item10", "Item11", "Item12"],
    "Gujarat": ["Item13", "Item14", "Item15"],
    "Haryana": ["Item16", "Item17", "Item18"],
    "Himachal Pradesh": ["Item19", "Item20", "Item21"],
    "Jharkhand": ["Item22", "Item23", "Item24"],
    "Karnataka": ["Item25", "Item26", "Item27"],
    "Kerala": ["Item28", "Item29", "Item30"],
    "Madhya Pradesh": ["Item31", "Item32", "Item33"],
    "Maharashtra": ["Item34", "Item35", "Item36"],
    "Manipur": ["Item37", "Item38", "Item39"],
    "Meghalaya": ["Item40", "Item41", "Item42"],
    "Mizoram": ["Item43", "Item44", "Item45"],
    "Nagaland": ["Item46", "Item47", "Item48"],
    "Odisha": ["Item49", "Item50", "Item51"],
    "Punjab": ["Item52", "Item53", "Item54"],
    "Rajasthan": ["Item55", "Item56", "Item57"],
    "Sikkim": ["Item58", "Item59", "Item60"],
    "Tamil Nadu": ["Item61", "Item62", "Item63"],
    "Telangana": ["Item64", "Item65", "Item66"],
    "Tripura": ["Item67", "Item68", "Item69"],
    "Uttar Pradesh": ["Item70", "Item71", "Item72"],
    "Uttarakhand": ["Item73", "Item74", "Item75"],
    "West Bengal": ["Item76", "Item77", "Item78"],
    "Delhi": ["Item91", "Item92", "Item93"],
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
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
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" required />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Gender *</label>
              <div className="flex space-x-4 mt-1">
                {["Male", "Female", "Transgender"].map((gender) => (
                  <label key={gender} className="flex items-center space-x-2">
                    <input type="radio" name="gender" value={gender} onChange={handleChange} className="text-indigo-500 focus:ring-indigo-400" />
                    <span>{gender}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-gray-600">Address *</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" required />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">State *</label>
              <select name="state" value={formData.state} onChange={(e) => { handleChange(e); handleStateChange(e); }} className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" required>
                {States.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">City *</label>
              <select name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" required>
                {list.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Phone *</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none" required />
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white py-3 rounded-full font-semibold shadow-md mt-6 hover:shadow-lg transition-all duration-300" onClick={handleSignup}>
            Register ➜
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
