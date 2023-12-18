import React, { useState } from "react";
import classnames from "classnames";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "../../components/Layouts";
import { Button, Card, Loader, Rating } from "../../components/common";
import { ArrowLeft, Profile } from "../../components/icons";
import { convertToThousands } from "../../utils/util";
import {
  UserDetailProps,
  UserDetailsItem,
  getUserDetails,
  getUserTabs,
} from "../../data/getUsersData";
import { getSingleUser } from "../../api/helper/data";
import { useQuery } from "@tanstack/react-query";
import "./_userTable.scss";

const UserTable: React.FC = () => {
  const [activeUserTab, setActiveUserTab] = useState<string>("General Details");
  const [user, setUser] = useState<any>([]);
  const { userId } = useParams<{ userId: string }>();
  const [userDetails, setUserDetails] = useState<UserDetailsItem[]>(
    getUserDetails()
  );

  const updateUserDetail = (
    header: string,
    key: string,
    value: string
  ): void => {
    setUserDetails((prevUserDetails) => {
      const updatedUserDetails = prevUserDetails.map((userDetail) => {
        if (userDetail.header === header) {
          const updatedDetails = userDetail.details.map((detail) => {
            if (detail.key === key) {
              return { ...detail, value };
            }
            return detail;
          });
          return { ...userDetail, details: updatedDetails };
        }
        return userDetail;
      });
      return updatedUserDetails;
    });
  };

  const { isLoading } = useQuery(
    ["users-details", userId],
    () => getSingleUser(userId),
    {
      onSuccess: ({ data }) => {
        setUser(data);
        updateUserDetail(
          "Personal Information",
          "full name",
          `${data?.profile?.firstName} ${data?.profile?.lastName}`
        );
        updateUserDetail(
          "Personal Information",
          "phone number",
          data?.profile?.phoneNumber
        );
        updateUserDetail(
          "Personal Information",
          "email address",
          data?.email.toLowerCase()
        );
        updateUserDetail("Personal Information", "bvn", data?.profile?.bvn);
        updateUserDetail(
          "Personal Information",
          "gender",
          data?.profile?.gender
        );
        updateUserDetail("Personal Information", "marital status", "Single"); //couldn't find data in endpoint
        updateUserDetail("Personal Information", "children", "None");
        updateUserDetail(
          "Personal Information",
          "type of residence",
          "Parent's Apartment"
        );
        updateUserDetail(
          "Education and Employment",
          "level of education",
          data?.education?.level
        );
        updateUserDetail(
          "Education and Employment",
          "employment status",
          data?.education?.employmentStatus
        );
        updateUserDetail(
          "Education and Employment",
          "sector of employment",
          data?.education?.sector
        );
        updateUserDetail(
          "Education and Employment",
          "duration of employment",
          data?.education?.duration
        );
        updateUserDetail(
          "Education and Employment",
          "official email",
          data?.education?.officeEmail
        );
        updateUserDetail(
          "Education and Employment",
          "monthly income",
          `₦${data?.education?.monthlyIncome[1]} - ₦${data?.education?.monthlyIncome[0]}`
        );
        updateUserDetail(
          "Education and Employment",
          "loan repayment",
          data?.education?.loanRepayment
        );
        updateUserDetail("Socials", "twitter", data?.socials?.twitter);
        updateUserDetail("Socials", "facebook", data?.socials?.facebook);
        updateUserDetail("Socials", "instagram", data?.socials?.instagram);
        updateUserDetail(
          "Guarantor",
          "full name",
          `${data?.guarantor?.firstName} ${data?.guarantor?.lastName}`
        );
        updateUserDetail(
          "Guarantor",
          "phone number",
          data?.guarantor?.phoneNumber
        );
        updateUserDetail("Guarantor", "address", data?.guarantor?.address);
        updateUserDetail("Guarantor", "gender", data?.guarantor?.gender);
      },
      onError: ({ response }) => {
        console.log("response", response);
      },
    }
  );

  return (
    <DashboardLayout>
      <div className="user-details">
        <Button variant="naked">
          <Link to="/customers/users" className="back-to-users">
            <ArrowLeft />
            <span>Back to Users</span>
          </Link>
        </Button>
        <div className="user-details-header">
          <h1>Users Details</h1>
          <div className="user-details-btns">
            <Button className="btn blacklist" variant="outlined">
              Blacklist User
            </Button>
            <Button className="btn activate" variant="outlined">
              Activate User
            </Button>
          </div>
        </div>
        {isLoading && (
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              color: "#545F7D",
              fontSize: "0.875rem",
              padding: "2.5rem 0",
            }}
          >
            <span>Loading</span>
            <Loader size="sm" />
          </div>
        )}
        {!isLoading && !!user && (
          <Card className="user-details-card-highlight">
            <div className="user-profile">
              <div className="user-profile-icon">
                {user?.profile?.avatar ? (
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "100%",
                    }}
                    src={user?.profile?.avatar}
                    alt={`${user?.profile?.firstName} ${user?.profile?.lastName} profile`}
                  />
                ) : (
                  <Profile />
                )}
              </div>
              <div className="user-profile-identity">
                <h2>{user?.userName}</h2>
                <span>{user?.accountNumber}</span>
              </div>
              <div className="user-profile-tier">
                <h2>User’s Tier</h2>
                <Rating
                  starredStars={
                    Number(user?.accountBalance) > 500 &&
                    Number(user?.accountBalance) < 750
                      ? 2
                      : Number(user?.accountBalance) > 750
                      ? 3
                      : 1
                  }
                />
              </div>
              <div className="user-profile-funds">
                <h2>₦{convertToThousands(user?.accountBalance)}</h2>
                <span>{user?.profile?.bvn}/Providus Bank</span>
              </div>
            </div>
            <div className="user-tabs">
              {getUserTabs()?.map((i: string) => {
                return (
                  <Button
                    key={i}
                    variant="naked"
                    className={classnames("user-tab", {
                      active: activeUserTab === i,
                    })}
                    onClick={() => setActiveUserTab(i)}
                  >
                    {i}
                  </Button>
                );
              })}
            </div>
          </Card>
        )}
        {!isLoading && !!user && (
          <Card className="user-details-card-records">
            {userDetails?.map((j: UserDetailsItem) => {
              return (
                <div key={j.header} className="record">
                  <h3>{j.header}</h3>
                  <div className="record-value-container">
                    {j.details?.map((k: UserDetailProps) => {
                      return (
                        <div className="record-value" key={k.key}>
                          <h4>{k.key}</h4>
                          <p>{k.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserTable;
