import React from "react";
import SummaryCards from "../components/SummaryCards";
import FilterTabs from "../components/FilterTabs";
import ClientTable from "../components/ClientTable";

const Clients = () => {
  return (
    <div >
      <SummaryCards />
      <FilterTabs />
      <ClientTable />
    </div>
  );
};

export default Clients;
