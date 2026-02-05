import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ArrowUpRightIcon, icons, Plus, ScrollText, Search } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getExams, type IExam } from "@/features/exams/testSlice";
import { getFolder, type IFolder } from "@/features/exams/examSlice";
import { SearchInput } from "@/components/search-input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { useNavigate } from "react-router";

//Dinh nghia props 
interface SidebarLayoutProps {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
}
interface IAll {
  exams: IExam[] | null;
  folder: IFolder[] | null;
}



export default function Sidebar({ children, sidebar }: SidebarLayoutProps) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const sidebarComponent = sidebar || <AppSidebar/>
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      {sidebarComponent}
      <SidebarInset className="from-muted/50 to-background h-full bg-gradient-to-b from-30%" >
        <header className="bg-background sticky top-0 flex shrink-0 items-center border-b p-4  ">
          <div className="grid grid-cols-3 w-full">
            <SidebarTrigger size="icon-lg" className="-ml-1" />
            {/* <Input className="" /> */}
            <SearchInput />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="justify-self-end rounded-4xl"
                  size="icon-lg"
                  role="combobox"
                  aria-expanded={open}
                >
                  <Plus />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem onSelect={() => navigate("/create-exams")}><ScrollText />Tạo đề thi</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover >
          </div>
        </header>


        <div className="flex flex-col gap-4">
          {children}
        </div>

      </SidebarInset>
    </SidebarProvider >
  );
}
