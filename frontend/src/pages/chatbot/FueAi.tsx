import React from 'react'
import SidebarLayout from "@/pages/Sidebar"; 
import { AdminSidebar } from '@/components/admin-sidebar';
import ChatHistory from '@/components/chat-bot/chat-history';

const FueAi = () => {
  return (
    <SidebarLayout sidebar={<ChatHistory/>}>
      
    </SidebarLayout>
  )
}

export default FueAi