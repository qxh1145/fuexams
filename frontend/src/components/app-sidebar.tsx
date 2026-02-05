"use client";
import FueNegativeBoxLogo from '@/components/ui/FueNegativeBoxLogo'
import * as React from "react";
import {
  Archive,
  ArchiveX,
  BookCheck,
  BookDown,
  Command,
  File,
  HandFist,
  Inbox,
  Send,
  Shield,
  Sparkles,
  Trash2,
} from "lucide-react";

import GradientText from '@/components/GradientText'


import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import { getFolder } from "@/features/exams/examSlice";
import { FilterMajor } from "@/lib/data";
import { useNavigate, useSearchParams } from "react-router";
import { fetchUserProfile } from '@/features/auth/authSlice';
import { ROLES } from '@/constants/roles';

// This is sample data


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  // folders: IFolder[];
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  // const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  // const [mails, setMails] = React.useState(data.mails);
  // const { setOpen } = useSidebar();
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const { folder, isLoading } = useAppSelector((state) => state.folder)

  React.useEffect(() => {
    dispatch(getFolder())
    // dispatch(fetchUserProfile())
  }, [dispatch])

  const [searchParams] = useSearchParams();

  const isSuccess = searchParams.get("code") === "00"
  const orderCode = searchParams.get("orderCode")

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(fetchUserProfile())
    }
  }, [isSuccess, orderCode])

  React.useEffect(() => {
    if (isSuccess) {
      const token = localStorage.getItem("accessToken");
      console.log("🔍 KIỂM TRA LÚC VỀ TỪ PAYOS:");
      console.log("- Current URL:", window.location.href);
      console.log("- Token trong Storage:", token ? "Vẫn còn" : "MẤT TIÊU RỒI!");

      if (!token) {
        alert("Chết cha! Token bị mất rồi nên mới bị Logout!");
      }
    }
  }, [isSuccess]);





  console.log('hello', currentUser)


  const filteredFolder = (filter: String) => {
    switch (filter) {
      case 'Major': {
        return folder.filter(f => f.type === 'Major')
      }
      case 'Semester': return folder.filter(f => f.type === 'Semester')
      case 'Term': return folder.filter(f => f.type === 'Term')
      case 'Subject': return folder.filter(f => f.type === 'Subject')
      default: {
        return folder
      }
    }
  }




  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-col"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}

      <SidebarHeader>
        {/*Logo app */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <HandFist className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight" onClick={() => navigate("/home")}>
                  <span className="truncate font-medium">FUExams</span>
                  <span className="truncate text-xs">{(currentUser?.role)?.toUpperCase()}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {/*Đề thi */}
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Đề Thi">
                  <BookCheck />
                  <span>
                    <a>Đề Thi Các Ngành</a>
                  </span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {/* {folders.map((f) => (<SidebarMenuSubButton className="pl-8">{f.name}</SidebarMenuSubButton>))} */}
                  {filteredFolder('Major').map((f) => (<SidebarMenuSubItem><SidebarMenuSubButton onClick={() => navigate(`/${f.name.toLowerCase()}`)} className="pl-8">{FilterMajor?.find((fm) => fm.value === f.name)?.label}</SidebarMenuSubButton></SidebarMenuSubItem>))}
                </SidebarMenuSub>
              </SidebarMenuItem>


              {/*CHuyển file txt, quizlet document thành flash card  */}
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="AI" onClick={() => navigate("/fue-ai")}>
                  <Sparkles />
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={3}
                    showBorder={false}
                  >
                    FUExams A.I
                  </GradientText>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/subjects-src")} tooltip={"Tổng hợp source các môn"}>
                  <Archive /> Tổng hợp source các môn
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem >
                <SidebarMenuButton tooltip={"Tải đề từ FUO"}>
                  <BookDown /> Tải đề từ FUO
                </SidebarMenuButton>
              </SidebarMenuItem>

              {currentUser?.role === "admin" && 
              <SidebarMenuItem >
                <SidebarMenuButton onClick={() => navigate("/admin-dashboard")} tooltip={"Admin Dashboard"}>
                  <Shield /> Admin Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
