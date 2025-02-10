import React from "react";
import RevenueChart from "../components/RevenueChart";
import LocationMap from "../components/LocationMap";

const Quotes = () => {
  return <div>
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RevenueChart />
        <LocationMap />
      </div>
  </div>;
};

export default Quotes;
