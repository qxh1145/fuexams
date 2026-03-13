import { ArrowBigLeft, Calendar, Home, HomeIcon, Inbox, Search, Settings } from "lucide-react"
import { useNavigate } from "react-router"; // Thêm navigate nếu cần chuyển trang

// 👇 QUAN TRỌNG: Import từ UI component, KHÔNG import từ trang Layout
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader, // Có thể thêm header cho admin nếu muốn
  SidebarFooter
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user";
import { useAppSelector } from "@/hooks/useRedux";
import { Button } from "./ui/button";


// Nhớ viết hoa chữ cái đầu (PascalCase)
export const AdminSidebar = () => {
  const navigate = useNavigate()
  const { currentUser } = useAppSelector((state) => state.auth)
  return (
    <Sidebar>
      <SidebarHeader><h1 className="w-full text-center font-bold text-2xl">ADMIN PANEL</h1></SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="-mb-5">
          <SidebarMenuItem className="flex justify-center items-center"><Button onClick={() => navigate("/home")} variant={"ghost"} className="hover:cursor-pointer flex items-center justify-center text-red-600"><HomeIcon/>Back to homepage</Button></SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>User Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton onClick={() => navigate("/admin-dashboard/user-list")}>
                  View All User
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem >
                <SidebarMenuButton onClick={() => navigate("/admin-dashboard/modify-user")}>
                  Modify User
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Transactions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/admin-dashboard/transaction/orders-list")}>
                  Order Logs
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/admin-dashboard/transaction/income-chart")}>
                  Income Statistics
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


      <SidebarGroup>
        <SidebarGroupLabel>Exams</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>View all exams</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={currentUser}></NavUser>
      </SidebarFooter>
    </Sidebar>


  )
}