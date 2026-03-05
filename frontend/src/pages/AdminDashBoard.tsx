import React from 'react';
// 1. Import cái khung Layout (đã chứa SidebarProvider bên trong)
import SidebarLayout from "@/pages/Sidebar"; 
// 2. Import cái menu Admin
import { AdminSidebar } from '@/components/admin-sidebar';
import AdminContent from '@/components/ui/admin-content';

const AdminDashBoard = () => {
  return (

    <SidebarLayout sidebar={<AdminSidebar />}>
      
      
    </SidebarLayout>
  );
};

export default AdminDashBoard;