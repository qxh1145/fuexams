import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";

import Sidebar from "./Sidebar";
import { getFolder } from "@/features/exams/examSlice";
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import NoSelected from '@/assets/Gemini_Generated_Image_rl5wzhrl5wzhrl5w.png'
import HomePage from "./HomePage";

const Home = () => {
  const dispatch = useAppDispatch();

  const { folder, isLoading } = useAppSelector((state) => state.folder)
  const { currentUser } = useAppSelector((state) => state.auth);

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



      {currentUser ? (
      //   <div className="pt-5 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-blend-darken *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      //   <Card className="@container/card">
      //     <CardHeader>
      //       <CardTitle className=" text-center text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
      //         Tạo đề thi custom
      //       </CardTitle>
      //     </CardHeader>

      //   </Card>

      //   <Card className="@container/card">
      //     <CardHeader>
      //       <CardTitle className=" text-center text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
      //         Chuyển text thành đề thi
      //       </CardTitle>
      //     </CardHeader>
      //   </Card>

      //   <Card className="@container/card">
      //     <CardHeader>
      //       <CardTitle className=" text-center text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
      //         Quiz
      //       </CardTitle>
      //     </CardHeader>
      //   </Card>
      // </div>

      <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <img src={NoSelected}/>
        </EmptyMedia>
        <EmptyTitle>Chưa mục nào được chọn</EmptyTitle>
        <EmptyDescription>
          Hãy chọn các ngành học phù hợp với bạn hoặc các công cụ hỗ trợ ở phần sidebar bên trái.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          {/* <RefreshCcwIcon /> */}
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
      ) :
        (<HomePage />)}
    </Sidebar>


  );
};

export default Home;  
