"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button" // 1. Nhớ import Button

export function TakingTest() {
  const [progress, setProgress] = React.useState(13)

  // 2. Hàm xử lý khi bấm nút
  const handleIncrease = () => {
    setProgress((prevProgress) => {
      // Nếu đã 100% rồi thì không tăng nữa, trả về 100
      if (prevProgress >= 100) return 100;
      
      // Tăng thêm 10%, nhưng dùng Math.min để đảm bảo không vượt quá 100
      return Math.min(prevProgress + 10, 100);
    });
  }

  // 3. Hàm reset về 0 (để test cho tiện)
  const handleReset = () => {
    setProgress(0);
  }

  return (
    // <div className="flex flex-col gap-5 w-[60%]">
    //   {/* Thanh Progress hiển thị giá trị hiện tại */}
    //   <Progress value={progress} className="w-full" />
      
    //   <div className="flex gap-2">
    //     <Button onClick={handleIncrease}>
    //       Tăng 10% ({progress}%)
    //     </Button>

    //     <Button variant="outline" onClick={handleReset}>
    //       Reset
    //     </Button>
    //   </div>
    // </div>

    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm border ">
        hello
      </div>
    </div>
  )
}