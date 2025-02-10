import React from "react";

const mockClients = [
  { name: "Roy G Bhiv", business: "Manson Restaurant", coverage: "GL", expiration: "23/04/22", premium: "$850.20", status: "Active" },
  { name: "Mason Stefi", business: "Zechesovich Brockaiva", coverage: "GL", expiration: "23/04/22", premium: "$850.20", status: "Drafts" },
  { name: "Narayanamoorthy", business: "Dindugal Thalappakatti", coverage: "WC", expiration: "23/04/22", premium: "$850.20", status: "Expired" },
  { name: "Uday Gupta", business: "Axis Indian Hotel", coverage: "PL", expiration: "23/04/22", premium: "$150.35", status: "Expiring in 7 days" },
];

const ClientTable = () => {
  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="py-3 px-4 text-left">Client</th>
          <th className="py-3 px-4 text-left">Business Name</th>
          <th className="py-3 px-4 text-left">Coverages</th>
          <th className="py-3 px-4 text-left">Expiration</th>
          <th className="py-3 px-4 text-left">Premium</th>
          <th className="py-3 px-4 text-left">Status</th>
          <th className="py-3 px-4 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {mockClients.map((client, index) => (
          <tr key={index} className="border-b">
            <td className="py-3 px-4">{client.name}</td>
            <td className="py-3 px-4">{client.business}</td>
            <td className="py-3 px-4">{client.coverage}</td>
            <td className="py-3 px-4">{client.expiration}</td>
            <td className="py-3 px-4">{client.premium}</td>
            <td className="py-3 px-4">{client.status}</td>
            <td className="py-3 px-4">
              <button className="bg-green-600 text-white px-4 py-1 rounded">
                {client.status === "Drafts" ? "Resume" : "View"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
