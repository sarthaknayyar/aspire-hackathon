import React, { useEffect, useState } from "react";
import { getRequestsByDepartment } from "../api";
import { Link } from "react-router-dom";

const DepartmentDashboard = ({ user }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        getRequestsByDepartment(user.department).then(setRequests);
    }, [user.department]);

    return (
        <div>
            <h2>{user.department} Department</h2>
            <ul>
                {requests.map(req => (
                    <li key={req._id}>
                        <Link to={`/request/${req._id}`}>{req.title} ({req.percentageCompletion}%)</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentDashboard;
