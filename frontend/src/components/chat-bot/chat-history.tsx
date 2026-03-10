import React, { useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavUser } from "../nav-user";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useNavigate } from "react-router";
import logo from "@/assets/logo-fue.png"
import { getChatHistory, getChatHistoryById } from "@/features/ai/aiSlice";

import { History } from "lucide-react";
const ChatHistory = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { chatSidebarList } = useAppSelector((state) => state.ai)

  useEffect(() => {
    dispatch(getChatHistory())
  }, [dispatch])
  console.log("Chat history: ", chatSidebarList);

  const handleSwitchChat = (_id: string) => {
   navigate(`/fue-ai/${_id}`);
  }

  return (

    <Sidebar>
      <SidebarHeader>
        {/*Logo app */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-20 md:p-0">
              <div className='flex justify-start gap-5'>
                <div className="flex aspect-square size-15 rounded-lg p-3 ">
                  <img className='h-full w-full object-contain' src={logo} />
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

      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarGroupLabel className="flex gap-1"><History /> <span>Previous Chat</span></SidebarGroupLabel>
            {chatSidebarList?.map((ch) => (
              <div onClick={() => handleSwitchChat(ch._id)} key={ch._id} className="hover:cursor-pointer w-full p-1 rounded-2xl text-sm pl-5 hover:bg-blue-100" >{ch.title}</div>
            )
            )}
          </SidebarMenu>

        </SidebarGroupContent>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatHistory;
