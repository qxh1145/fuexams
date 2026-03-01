import { DataTable } from '@/components/ui/transaction/data-table'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { columns } from '@/components/ui/transaction/collumns'
import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import SidebarLayout from "@/pages/Sidebar";
import { AdminSidebar } from '@/components/admin-sidebar'
import { getAllTransactions } from '@/features/payment/transactionSlice'


const TransactionTable = () => {
  const dispactch = useAppDispatch();

  const { transaction } = useAppSelector((state) => state.transaction)
  console.log("transaction: " ,transaction);
  useEffect(() => {
    dispactch(getAllTransactions())
  }, [dispactch])

  console.log(transaction)
  return (

    <SidebarLayout sidebar={<AdminSidebar />}>
      <div className='p-10'>
        <DataTable columns={columns} data={transaction}  />
      </div>
    </SidebarLayout>
  )
}

export default TransactionTable