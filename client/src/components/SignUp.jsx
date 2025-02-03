import { ClipboardType } from "lucide-react";
import React, { useState } from "react";

import { useNavigate } from "react-router";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    address: "",
    // locality: "",
    state: "",
    // country: "India",
    // city: "",
    // pincode: "",
    phone: "",
    // phone: "",
    email: "",
    // password: "",
    city: "",   
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
    "Andaman and Nicobar Islands": ["Item79", "Item80", "Item81"],
    "Chandigarh": ["Item82", "Item83", "Item84"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Item85", "Item86", "Item87"],
    "Lakshadweep": ["Item88", "Item89", "Item90"],
    "Delhi": ["Item91", "Item92", "Item93"],
    "Puducherry": ["Item94", "Item95", "Item96"],
    "Ladakh": ["Item97", "Item98", "Item99"],
    "Jammu and Kashmir": ["Item100", "Item101", "Item102"]
  };

  const States  = Object.keys(stateLists);
  const[selectedState, setSelectedState] = useState(States[0]);
  const [list,setList] = useState(stateLists[selectedState]);

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setList(stateLists[newState]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  async function handleSignup(){
    const response = await fetch('http://localhost:5000/user/signup',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
    });
    if(response.status === 200){
        const data = await response.json();
        console.log(data);
        navigate('/login');
    }
    else if(response.status === 400){
        console.log('User not found');
        setStatus('User not found');
    }
  }


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Registration/Sign-up Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Gender *</label>
            <div className="flex space-x-4">
              <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
              <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
              <label><input type="radio" name="gender" value="Transgender" onChange={handleChange} /> Transgender</label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4">
          <div>
            <label className="block font-semibold">Address *</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-semibold">State/Union Territory *</label>
            <select name="state" value={formData.state} onChange={(e) => { handleChange(e); handleStateChange(e); }} className="w-full p-2 border rounded" required>
              <option value="">--Select a state--</option>
              {States.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">City *</label>
            <select name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">--Select a state first--</option>
              {list.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* <div>
            <label className="block font-semibold">Pincode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2 border rounded" />
          </div> */}
          <div>
            <label className="block font-semibold">Phone number *</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-semibold">E-mail address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        {/* <div className="grid grid-cols-2 gap-4 mt-4"> */}
          {/* <div>
            <label className="block font-semibold">Phone number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
          </div> */}
        {/* </div> */}

        <div className="mt-4">
          <label className="block font-semibold">Password *</label>
          <input type="text" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <button type="submit" className="mt-6 px-6 py-2 bg-purple-700 text-white rounded shadow" onClick={handleSignup} >Submit</button>
      </form>
    </div>
  );
};

export default SignupForm;
