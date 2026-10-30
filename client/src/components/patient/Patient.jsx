import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PatientNavbar from "./PatientNavbar";
import PageMeta from "../common/PageMeta";
const Patient = () => {
  return (
    <>
    <PageMeta title="Patient | RaktConnect" />

      <PatientNavbar />
      <Outlet />
    </>
  );
};

export default Patient;
