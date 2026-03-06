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
    <div className={`max-w-30 flex flex-col items-center hover:cursor-pointer ${className}`} {...props}>
        <Folder color="#72C8F8" size={50} fill="#72C8F8" />
        <span className="text-center flex-1 truncate">{ majorObj ? majorObj.label : folder.name}</span>
        {/* <span>{folder.type}</span> */}
    </div>

  )
}

export default FolderDisplay