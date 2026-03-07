import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavUser } from "../nav-user";
import { useAppSelector } from "@/hooks/useRedux";
import { useNavigate } from "react-router";
import logo from "@/assets/logo-fue.png"

const ChatHistory = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <Sidebar>
       <SidebarHeader>
        {/*Logo app */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-20 md:p-0">
              <div className='flex justify-start gap-5'>
                <div className="flex aspect-square size-15 rounded-lg p-3 ">
                  {/* <HandFist className="size-4" /> */}
                  <img className='h-full w-full object-contain' src={logo}/>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight" onClick={() => navigate("/home")}>
                  <span className="truncate font-medium">FUExams</span>
                  <span className="truncate text-xs">{(currentUser?.role)?.toUpperCase()}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>Chat history</SidebarContent>

      <SidebarFooter>
        <NavUser user={currentUser}/>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatHistory;
