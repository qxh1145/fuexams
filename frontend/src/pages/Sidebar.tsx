import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ArrowUpRightIcon, icons, Plus, Search } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getExams, type IExam } from "@/features/exams/testSlice";
import { getFolder, type IFolder } from "@/features/exams/examSlice";
import { SearchInput } from "@/components/search-input";

//Dinh nghia props 
interface SidebarLayoutProps {
  children?: React.ReactNode;
}
interface IAll {
  exams: IExam[] | null;
  folder: IFolder[] | null;
}



export default function Sidebar({ children }: SidebarLayoutProps) {

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="from-muted/50 to-background h-full bg-gradient-to-b from-30%" >
        <header className="bg-background sticky top-0 flex shrink-0 items-center border-b p-4  ">
          <div className="grid grid-cols-3 w-full">
            <SidebarTrigger size="icon-lg" className="-ml-1" />
            {/* <Input className="" /> */}
            <SearchInput/>
            <Button
              className="justify-self-end rounded-4xl"
              size="icon-lg"
            >
              <Plus />
            </Button>
          </div>
        </header>


        <div className="flex flex-col gap-4">
          {children}
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}
