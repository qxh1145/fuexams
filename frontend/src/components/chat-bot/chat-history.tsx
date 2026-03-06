import Sidebar from "@/pages/Sidebar";
import React from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import { NavUser } from "../nav-user";
import { useAppSelector } from "@/hooks/useRedux";

const ChatHistory = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <Sidebar>
      <SidebarHeader>Chat header</SidebarHeader>

      <SidebarContent>Chat history</SidebarContent>

      <SidebarFooter>
        <NavUser user={currentUser}/>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatHistory;
