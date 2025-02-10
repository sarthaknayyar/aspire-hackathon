import React, { useEffect, useState } from "react";
import { getRequestById, updateRequest } from "../api";
import { useParams } from "react-router-dom";

const RequestDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        getRequestById(id).then(setRequest);
    }, [id]);

    if (!request) return <p>Loading...</p>;

    return (
        <div>
            <h2>{request.title}</h2>
            <p>{request.description}</p>
            <p>Completion: {request.percentageCompletion}%</p>
            <p>Resolved: {request.resolved ? "Yes" : "No"}</p>
        </div>
    );
};

export default RequestDetails;
