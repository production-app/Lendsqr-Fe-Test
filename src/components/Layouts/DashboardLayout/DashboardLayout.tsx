import { useState } from "react";
import { DashboardHeader, SidebarNav } from "../../global";
import "./_dashboardLayout.scss";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="dashboard-layout">
      <DashboardHeader menuClick={() => setShowNav(!showNav)} />
      <div className="dashboard-layout-wrapper">
        <SidebarNav show={showNav} />
        <div className="dashboard-layout-content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
