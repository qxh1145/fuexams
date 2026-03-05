import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import logo from "@/assets/logo-fue.png"
import { X } from "lucide-react"
import { useNavigate } from "react-router"
const TestHeader = () => {
  const navigate = useNavigate();


  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* <h1 className="text-base font-medium">FUE</h1> */}
        <div className="w-fit p-3"><img className="size-12 h-fit" src={logo} /></div>
        <div className="ml-auto flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger>
              <div><X size={'50'} strokeWidth={2} color="red" className="hover:cursor-pointer" /></div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div>Are you sure you want to quit, your process will lost once you quit</div>
              <AlertDialogFooter>
                <AlertDialogAction variant={"outline"}>I stay</AlertDialogAction>
                <AlertDialogAction variant={"destructive"} onClick={() => navigate(-1)}>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  )
}

export default TestHeader