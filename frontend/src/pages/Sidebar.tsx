import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ArrowUpRightIcon, icons, Plus } from "lucide-react";

export default function Sidebar() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center border-b p-4">
          <div className="grid grid-cols-3 w-full">
            <SidebarTrigger size="icon-lg" className="-ml-1" />
            <Input className="" />
            <Button
              className="justify-self-end rounded-4xl"
              size="icon-lg"
            >
              <Plus />
            </Button>
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
