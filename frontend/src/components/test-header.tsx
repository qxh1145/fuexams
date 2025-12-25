import { Progress } from "@/components/ui/progress"
import TestProcess from "@/components/taking-test"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { X } from "lucide-react"
import { useNavigate } from "react-router"
const TestHeader = () => {
    const navigate = useNavigate();
    
    
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <h1 className="text-base font-medium">FUE</h1>
          <div className="ml-auto flex items-center gap-2">
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div><X size={'50'} strokeWidth={1} className="hover:cursor-pointer" onClick={() => navigate(-1)}/></div>
          </div>
        </div>
      </header>
  )
}

export default TestHeader