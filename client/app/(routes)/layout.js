'use client'
import React, { useContext, useEffect } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import GlobalApi from "../_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "../_context/UserDetailContext";
import Style from "./page.module.css";

function Layout({ children }) {
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    if (user) {
      getUserDetails();
    }
  }, [user]);

  const getUserDetails = () => {
    GlobalApi.getUserByEmail(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        setUserDetail(resp.data);
      }
    );
  };

  // Ensure userDetail is populated before rendering children
  if (!user) {
    return (
      <div className="w-screen h-screen bg-slate-100 flex justify-center items-center text-gray-800 font-bold font-serif animate-pulse text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex">
      {user && <SideNav />}
      <div className={Style.Pages}>{children}</div>
      {/* Additional content for rightmost section of the page */}
    </div>
  );
}

export default Layout;
