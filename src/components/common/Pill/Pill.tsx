import React from "react";
import "./_pill.scss";

export interface PillProps {
  status: StatusProps;
}

const Pill: React.FC<PillProps> = ({ status }) => {
  let statusClass = "";

  switch (status) {
    case "Active":
      statusClass = "active";
      break;
    case "Inactive":
      statusClass = "inactive";
      break;
    case "Pending":
      statusClass = "pending";
      break;
    case "Blacklisted":
      statusClass = "blacklisted";
      break;
    default:
      break;
  }
  return (
    <>
      <span className={`status-pill ${statusClass}`}>{status}</span>
    </>
  );
};

export default Pill;

export type StatusProps = "Active" | "Inactive" | "Pending" | "Blacklisted";
