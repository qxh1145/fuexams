"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import Sidebar from "../Sidebar";
import SidebarLayout from "@/pages/Sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getAllTransactions } from "@/features/payment/transactionSlice";
import { useDispatch } from "react-redux";

export const description = "An interactive bar chart";


const chartConfig = {
  views: {
    label: "Income",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-5))",
  }
} satisfies ChartConfig;

export function IncomeChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("income");

 
  const dispatch = useAppDispatch();
  const { transaction } = useAppSelector((state) => state.transaction);

  React.useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);


  //format theo form cua rechart
  const chartData = React.useMemo(() => {
    if(!transaction || transaction.length === 0) return []

    const groupData = transaction.reduce((acc: any, curr: any) => {
        if(curr.status != "Paid") return acc;

        const dateStr = new Date(curr.paymentDate).toISOString().split('T')[0];

        if(!acc[dateStr]) {
            acc[dateStr] = {date: dateStr, income: 0};
        }

        acc[dateStr].income += curr.amount;

        return acc;
  }, {})

  //bien object da gom thanh mang vaf sap xep theo thu tu tang dan
  return Object.values(groupData).sort((a: any, b: any) => 
     new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}, [transaction]);

// console.log(chartData)

const total = React.useMemo(
  //() => () nghia la mot ham khong nhan tham so nao o ngoac dau tien,
  //  return ngay lap tuc ket qua o trong ngoac tron phia sau
  () => ({
    income: chartData.reduce((acc: any, curr: any) => acc + curr.income, 0),
  }), [chartData]
)


  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <div className="p-5">
        <Card className="py-0">
          <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
              <CardTitle>Bar Chart - Interactive</CardTitle>
              <CardDescription>
                Showing total visitors for the last 3 months
              </CardDescription>
            </div>
            <div className="flex">
              {["income"].map((key) => {
                const chart = key as keyof typeof chartConfig;
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {chartConfig[chart].label}
                    </span>
                    <span className="text-lg leading-none font-bold sm:text-3xl">
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Bar
                  dataKey={activeChart}
                  fill={`var(--color-${activeChart})`}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
