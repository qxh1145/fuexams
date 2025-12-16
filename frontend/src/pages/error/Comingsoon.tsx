import { Bell, House, RefreshCcwIcon } from "lucide-react"

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
    
    <Empty className="mt-[20%]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Bell />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>
          You&apos;re all caught up. New notifications will appear here.
        </EmptyDescription>
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
