import {
  Calculator,
  Calendar,
  CreditCard,
  Folder,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import type React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getExams, type IExam } from "@/features/exams/testSlice";
import { getFolder, type IFolder } from "@/features/exams/examSlice";
import { useNavigate } from "react-router";

//Dinh nghia props 
interface SidebarLayoutProps {
  children?: React.ReactNode;
}
interface IAll {
  exams: IExam[] | null;
  folder: IFolder[] | null;
}

export function SearchInput() {
  const [searchItems, setSearchItems] = useState("");
  const [result, setResult] = useState<IAll>({ exams: [], folder: [] });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { folder } = useAppSelector((state) => state.folder)
  const { exams } = useAppSelector((state) => state.exam)
  useEffect(() => {
    dispatch(getExams())
    dispatch(getFolder())
  }, [dispatch])

  useEffect(() => {
    const filteredFolder = folder.filter((f) => f.name.toLowerCase().includes(searchItems.toLowerCase()) && f.type === 'Subject')
    const filteredExam = exams.filter((e) => e.title.toLowerCase().includes(searchItems.toLowerCase()))

    setResult({
      exams: filteredExam,
      folder: filteredFolder
    })
  }, [searchItems, exams, folder])
  return (
    <div className="">
      <Command className="relative rounded-lg border md:min-w-[450px] overflow-visible  " shouldFilter={false}>
        <CommandInput placeholder="Type a command or search..." value={searchItems} onValueChange={(val) => setSearchItems(val)} />
        {searchItems.length > 0 && (
          <div className="absolute top-[calc(110%)] bg-popover md:min-w-[450px] rounded-md border w-full " >
            {result.exams?.length === 0 && result.folder?.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

              {result.exams && result.exams.length > 0 && <CommandGroup heading="Exams">
                {result.exams.map((e) => <CommandItem key={e._id}><span onClick={() => navigate(`/test/do-test/${e.slug}`)}>{e.title}</span></CommandItem>)}
              </CommandGroup>}


              {result.folder && result.folder.length > 0 && <CommandGroup heading="Folders"> {result.folder.map((e) =>
                <CommandItem  key={e._id}> <Folder /><span className="w-full" onClick={() => { navigate(`/test/${e._id}`); setSearchItems("") }}>{e.name}</span></CommandItem>)}
              </CommandGroup>}
               
          </div>
        )}

      </Command>
    </div>
  )
}
