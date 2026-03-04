import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
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

const items = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Users", url: "/admin/users", icon: Inbox },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

// Nhớ viết hoa chữ cái đầu (PascalCase)
export const AdminSidebar = () => {
  const navigate = useNavigate()
  const { currentUser } = useAppSelector((state) => state.auth)
  return (
    // <Sidebar collapsible="icon"> {/* Thêm collapsible nếu muốn co giãn */}
    //   <SidebarHeader className="p-4 font-bold text-xl">
    //     <SidebarMenu>
    //       <SidebarMenuItem>
    //         <SidebarMenuButton>
    //           Admin Panel
    //         </SidebarMenuButton>
    //       </SidebarMenuItem>
    //     </SidebarMenu>
    //   </SidebarHeader>

    //   <SidebarContent>
    //     <SidebarGroup>
    //       <SidebarGroupLabel>Content Management</SidebarGroupLabel>
    //       <SidebarGroupContent>
    //         <SidebarMenu>

    //           <SidebarMenuItem>
    //             <SidebarMenuButton>

    //             </SidebarMenuButton>
    //           </SidebarMenuItem>


    //         </SidebarMenu>
    //       </SidebarGroupContent>

    //       <SidebarGroupContent>
    //         <SidebarMenu>
    //           <SidebarMenuItem>
    //             <SidebarMenuButton>
    //               Exam Management
    //             </SidebarMenuButton>
    //           </SidebarMenuItem>

    //           <SidebarMenuItem>
    //             <SidebarMenuButton onClick={() => navigate("/admin-dashboard/user-list")}>
    //               View All User
    //             </SidebarMenuButton>
    //           </SidebarMenuItem>
    //         </SidebarMenu>
    //       </SidebarGroupContent>
    //     </SidebarGroup>
    //   </SidebarContent>

    //   <SidebarFooter>
    //     <NavUser user={currentUser} />
    //   </SidebarFooter>
    // </Sidebar>


    <Sidebar>
      <SidebarHeader><h1 className="w-full text-center font-bold text-2xl">ADMIN PANEL</h1></SidebarHeader>
      <SidebarContent>

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

      </SidebarContent>

      <SidebarFooter>
        <NavUser user={currentUser}></NavUser>
      </SidebarFooter>
    </Sidebar>


  )
}