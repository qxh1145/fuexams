import React from "react"
import type { IFolder } from "@/features/exams/examSlice.js";
import { Button } from "./ui/button";
import { FilterMajor } from "@/lib/data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Folder } from "lucide-react";
interface FolderDisplayProps extends React.ComponentProps<"div">{
  folder: IFolder// danh sach folder duoc load ve
  
}

const FolderDisplay = ({folder,className= "", ...props}: FolderDisplayProps) => {
  let mName = folder.name;
  const majorObj = FilterMajor.find((fm) => fm.value === mName)
  return (
    <div className={`items-center flex-col ${className}`} {...props}>
      <Button variant='secondary' className="w-full h-full flex items-center">
        <Folder className="shrink-0"/>
        <span className="text-center flex-1 truncate">{ majorObj ? majorObj.label : folder.name}</span>
        {/* <span>{folder.type}</span> */}
      </Button>
    </div>

  )
}

export default FolderDisplay