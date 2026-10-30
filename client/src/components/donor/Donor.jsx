import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import DonorNavbar from "./DonorNavbar";
import PageMeta from "../common/PageMeta";
const Donor = () => {
  if (localStorage.getItem("userType") !== "donor" || !localStorage.getItem("authToken")) {
    return <Navigate to="/login/donor" replace />;
  }

  return (
    <>
    <PageMeta title="Donor | RaktConnect" />

      <DonorNavbar />
      <Outlet />
    </>
  );
};

export default Donor;
