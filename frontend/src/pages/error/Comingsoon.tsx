import { Bell, House, RefreshCcwIcon } from "lucide-react"
import underdev from "@/assets/underdevelop.png"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { useNavigate } from "react-router"


export function Comingsoon() {
    const navigate = useNavigate()
  return (
    
    <Empty className="flex h-screen w-screen items-center">
      <EmptyHeader>
        <EmptyMedia className="" variant="default">
          <img className="" src={underdev} alt="" />
        </EmptyMedia>
        <EmptyTitle>This feature is under development. Stay tuned! </EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" onClick={() =>navigate('/home')}>
          <House />
          Back to home page
        </Button>
      </EmptyContent>
    </Empty>
  )
}
