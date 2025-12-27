
import TestProcess from "@/components/taking-test"

import TestHeader from "@/components/test-header"

export function TakingTest() {

  return (
    <div className="fixed w-full">
    <TestHeader/>
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="w-full max-w-4xl ">
          <TestProcess />
        </div>
      </div>
    </div>
  )
}