"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import TestProcess from "@/components/taking-test"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { X } from "lucide-react"
import TestHeader from "@/components/test-header"

export function TakingTest() {

  return (
    <>
    <TestHeader/>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-3xl border ">
          <TestProcess />
        </div>
      </div>
    </>
  )
}