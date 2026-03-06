import React from 'react'
import SidebarLayout from "@/pages/Sidebar"; 
import { AdminSidebar } from '@/components/admin-sidebar';
import ChatHistory from '@/components/chat-bot/chat-history';
import { ChartArea } from 'lucide-react';
import ChatArea from '@/components/chat-bot/chat-area';

const FueAi = () => {
  return (
    <SidebarLayout sidebar={<ChatHistory />}>
      <ChatArea />
    </SidebarLayout>
  )
}

export default FueAi