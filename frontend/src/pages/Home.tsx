import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import Sidebar from "./SideBar";
const Home = () => {
  // const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <>

      {/*header */}
      {/*navmenu logo search create-newset avata */}
      {/*header **/}
    <Sidebar />

    </>
  );
};

export default Home;
