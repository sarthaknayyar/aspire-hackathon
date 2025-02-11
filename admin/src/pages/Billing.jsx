import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import GoalsChart from "../components/GoalsChart";
import DevicesChart from "../components/DevicesChart";

const Billing = () => {
  return <div>
    <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DevicesChart />
        <GoalsChart />
      </div>

  </div>;
};

export default Billing;
