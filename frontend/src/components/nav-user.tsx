"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";
import { logout } from "@/features/auth/authSlice";
import { ROLES } from "@/constants/roles";
import GradientText from "./GradientText";
import { Badge } from "./ui/badge";

interface UserProbs {
  username: string;
  email: string;
}

interface NavUserProbs {
  user: UserProbs | null
}

export function NavUser({ user }: NavUserProbs) {
  const { isMobile } = useSidebar();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage alt={user?.username} />
                <AvatarFallback className="rounded-lg">{user?.username.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {currentUser?.role === ROLES.PREMIUM || currentUser?.role === ROLES.ADMIN ?
                    (
                      <div className="flex"><GradientText
                        colors={["#5227FF", "#FF9FFC", "#B19EEF", "#761414", "#ff0a0a", "#510606"]}
                        animationSpeed={5}
                        className="custom-class"
                      >
                        <span className="truncate font-medium">{user?.username}</span>
                      </GradientText>
                      </div>
                    ) : <span className="truncate font-medium">{user?.username}</span>}

                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>

              {/* <ChevronsUpDown className="ml-auto size-4" /> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={user?.username} />
                  <AvatarFallback className="rounded-lg">{user?.username.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.username}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut color="#ff0000" />
              <p>Log out</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
