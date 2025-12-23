import React, { use, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import FolderDisplay from "@/components/folder-display";
import { getFolder } from "@/features/exams/examSlice";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const Home = () => {
  const dispatch = useAppDispatch();

  const { folder, isLoading } = useAppSelector((state) => state.folder)

  useEffect(() => {
    dispatch(getFolder())
  }, [dispatch])

  console.log('hello', folder)


  const filteredFolder = (filter: String) => {
    switch (filter) {
      case 'Major': {
        return folder.filter(f => f.type === 'Major')
      }
      case 'Semester': return folder.filter(f => f.type === 'Semester')
      case 'Term': return folder.filter(f => f.type === 'Term')
      case 'Subject': return folder.filter(f => f.type === 'Subject')
      default: {
        return folder
      }
    }
  }

  return (

    <Sidebar >
      {/* <div >
        <h3 className="pl-6 pt-6">Các ngành học </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-7">
        {filteredFolder('Major').map((f) => (
          <FolderDisplay className="border flex  " key={f._id} folder={f} />
        ))}
      </div>

      <div >
        <h3 className="pl-6 pt-6">Đề Thi Các Kì </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-7">
        {filteredFolder('Semester').map((f) => (
          <FolderDisplay className="border flex  " key={f._id} folder={f} />
        ))}
      </div>
      <div >
        <h3 className="pl-6 pt-6">Subjects </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-7">
        {filteredFolder('Subject').map((f) => (
          <FolderDisplay className="border flex  " key={f._id} folder={f} />
        ))}
      </div> */}
       <div className="pt-5 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-blend-darken *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className=" text-center text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Tạo đề thi custom
          </CardTitle>
        </CardHeader>
        
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardTitle className=" text-center text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Chuyển text thành đề thi
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardTitle className=" text-center text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Quiz
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
    </Sidebar>


  );
};

export default Home;  
