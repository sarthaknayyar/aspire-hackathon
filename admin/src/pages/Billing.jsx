import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import MetricsCards from "../components/MetricsCards";
import GoalsChart from "../components/GoalsChart";
import LocationMap from "../components/LocationMap";
import DevicesChart from "../components/DevicesChart";
import RevenueChart from "../components/RevenueChart";

const Billing = () => {
  return <div>
    <DashboardHeader />
      <MetricsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DevicesChart />
        <GoalsChart />
      </div>
     
  </div>;
};

export default Billing;
