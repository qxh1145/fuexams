import { DataTable } from '@/components/ui/transaction/data-table'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { columns } from '@/components/ui/transaction/collumns'
import React, { useEffect } from 'react'
import { getAllPayment, getPayment } from '@/features/payment/paymentSlice'
import Sidebar from '../Sidebar'
import SidebarLayout from "@/pages/Sidebar";
import { AdminSidebar } from '@/components/admin-sidebar'
import TransactionTable from './TransactionTable'


const test = () => {
  const dispactch = useAppDispatch();

  const {transaction} = useAppSelector((state) => state.transaction)

  useEffect(() => {
    dispactch(getAllPayment())  
  }, [dispactch])

  console.log(transaction)
  return (

    <SidebarLayout sidebar={AdminSidebar}><TransactionTable></TransactionTable></SidebarLayout>
  )
}

export default test