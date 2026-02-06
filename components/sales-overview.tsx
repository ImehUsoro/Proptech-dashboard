"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type Duration = "1 Week" | "1 Month" | "1 Year";

interface ChartData {
  month: string;
  value1: number;
  value2: number;
  value3: number;
}

const chartDataByDuration: Record<Duration, ChartData[]> = {
  "1 Week": [
    { month: "Mon", value1: 10, value2: 15, value3: 8 },
    { month: "Tue", value1: 12, value2: 18, value3: 10 },
    { month: "Wed", value1: 15, value2: 20, value3: 12 },
    { month: "Thu", value1: 18, value2: 22, value3: 15 },
    { month: "Fri", value1: 20, value2: 25, value3: 18 },
    { month: "Sat", value1: 22, value2: 28, value3: 20 },
    { month: "Sun", value1: 25, value2: 30, value3: 22 },
  ],
  "1 Month": [
    { month: "Week 1", value1: 45, value2: 50, value3: 40 },
    { month: "Week 2", value1: 50, value2: 55, value3: 45 },
    { month: "Week 3", value1: 55, value2: 60, value3: 50 },
    { month: "Week 4", value1: 60, value2: 65, value3: 55 },
  ],
  "1 Year": [
    { month: "Jan", value1: 30, value2: 35, value3: 25 },
    { month: "Feb", value1: 35, value2: 40, value3: 30 },
    { month: "Mar", value1: 40, value2: 45, value3: 35 },
    { month: "Apr", value1: 45, value2: 50, value3: 40 },
    { month: "May", value1: 50, value2: 55, value3: 45 },
    { month: "Jun", value1: 45, value2: 50, value3: 40 },
    { month: "Jul", value1: 55, value2: 60, value3: 50 },
    { month: "Aug", value1: 50, value2: 55, value3: 45 },
    { month: "Sep", value1: 48, value2: 52, value3: 43 },
    { month: "Oct", value1: 52, value2: 57, value3: 47 },
    { month: "Nov", value1: 55, value2: 60, value3: 50 },
    { month: "Dec", value1: 58, value2: 63, value3: 53 },
  ],
};

const metricsByDuration: Record<Duration, {
  totalInflow: string;
  mrr: string;
  commissionRevenue: string;
  gmv: string;
  totalInflowChange: string;
  mrrChange: string;
  commissionRevenueChange: string;
  gmvChange: string;
}> = {
  "1 Week": {
    totalInflow: "₦25,000,000.00",
    mrr: "₦10,000,000.00",
    commissionRevenue: "₦40,000,000.00",
    gmv: "₦20,000,000.00",
    totalInflowChange: "2.5%",
    mrrChange: "2.5%",
    commissionRevenueChange: "0.5%",
    gmvChange: "0.5%",
  },
  "1 Month": {
    totalInflow: "₦60,000,000.00",
    mrr: "₦25,000,000.00",
    commissionRevenue: "₦100,000,000.00",
    gmv: "₦50,000,000.00",
    totalInflowChange: "2.5%",
    mrrChange: "2.5%",
    commissionRevenueChange: "0.5%",
    gmvChange: "0.5%",
  },
  "1 Year": {
    totalInflow: "₦120,000,000.00",
    mrr: "₦50,000,000.00",
    commissionRevenue: "₦200,000,000.00",
    gmv: "-₦100,000,000.00",
    totalInflowChange: "2.5%",
    mrrChange: "2.5%",
    commissionRevenueChange: "0.5%",
    gmvChange: "0.5%",
  },
};

const getDateRange = (duration: Duration, chartView: "first" | "second"): string => {
  if (duration === "1 Year") {
    return chartView === "first" ? "Jan 2022 - Sep 2022" : "Apr 2022 - Dec 2022";
  }
  if (duration === "1 Month") {
    return "Week 1 2022 - Week 4 2022";
  }
  return "Mon 2022 - Sun 2022";
};

export default function SalesOverview() {
  const [duration, setDuration] = useState<Duration>("1 Year");
  const [chartView, setChartView] = useState<"first" | "second">("first");
  const [prevDuration, setPrevDuration] = useState<Duration | null>(null);

  const handleDurationChange = (newDuration: Duration) => {
    if (newDuration !== duration) {
      setPrevDuration(duration);
      setDuration(newDuration);
      if (newDuration === "1 Year") {
        setChartView("first");
      }
      setTimeout(() => setPrevDuration(null), 300);
    }
  };

  const allData = chartDataByDuration[duration];
  let currentData = allData;
  let canScrollLeft = false;
  let canScrollRight = false;

  if (duration === "1 Year") {
    const firstHalf = allData.slice(0, 9);
    const secondHalf = allData.slice(3, 12);
    currentData = chartView === "first" ? firstHalf : secondHalf;
    canScrollLeft = chartView === "second";
    canScrollRight = chartView === "first";
  }

  const metrics = metricsByDuration[duration];

  const chartConfig = {
    value1: {
      label: "Value 1",
      color: "#4545FE",
    },
    value2: {
      label: "Value 2",
      color: "#12B76A",
    },
    value3: {
      label: "Value 3",
      color: "#F04438",
    },
  };

  const durationOptions: Duration[] = ["1 Week", "1 Month", "1 Year"];
  const prevActiveIndex = prevDuration ? durationOptions.indexOf(prevDuration) : null;

  return (
    <div className="bg-white border border-grey-1 rounded-2xl flex flex-col overflow-hidden h-full">
      <div className="pt-6 px-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-black-3 mb-1">Sales Overview</h2>
          <p className="text-xs font-normal text-black-4">
            Showing overview {getDateRange(duration, chartView)}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <button className="border border-grey-2 bg-white text-black-3 font-medium text-[12px] px-4 py-2 rounded-full whitespace-nowrap">
            View Transactions
          </button>
          <div className="flex items-center gap-4 relative mt-4 mb-3">
            {durationOptions.map((dur, index) => {
              const isActive = duration === dur;
              const swipeDirection = prevActiveIndex !== null && isActive
                ? (index > prevActiveIndex ? "right" : "left")
                : null;

              return (
                <button
                  key={dur}
                  onClick={() => handleDurationChange(dur)}
                  className={`text-[14px] px-3 py-1 rounded-lg transition-all relative ${
                    isActive
                      ? "bg-white-1 font-semibold text-black-2"
                      : "font-normal text-black-2"
                  }`}
                >
                  {isActive && prevActiveIndex !== null && swipeDirection ? (
                    <motion.span
                      key={`active-${dur}-${prevActiveIndex}`}
                      initial={{ x: swipeDirection === "right" ? 20 : -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="inline-block"
                    >
                      {dur}
                    </motion.span>
                  ) : (
                    dur
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-grey-1 w-full"></div>
      <div className="p-4 md:p-6 flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <div className="flex-1 relative min-h-0 min-w-0">
          <div className="flex items-center gap-2 h-full w-full">
            {duration === "1 Year" && (
              <button
                onClick={() => setChartView("first")}
                disabled={!canScrollLeft}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                  canScrollLeft
                    ? "border-grey-2 cursor-pointer hover:bg-grey-3"
                    : "border-grey-1 cursor-not-allowed opacity-50"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <div className="flex-1 h-full min-h-0 w-full min-w-0">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#3D3D3D" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#3D3D3D" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value1" fill="#4545FE" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="value2" fill="#12B76A" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="value3" fill="#F04438" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            {duration === "1 Year" && (
              <button
                onClick={() => setChartView("second")}
                disabled={!canScrollRight}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                  canScrollRight
                    ? "border-grey-2 cursor-pointer hover:bg-grey-3"
                    : "border-grey-1 cursor-not-allowed opacity-50"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 min-w-[380px]">
          <div className="bg-white border border-grey-1 rounded-lg w-full h-[74px] p-3 flex flex-col justify-between">
            <p className="text-[19px] font-semibold text-blue-1 leading-tight wrap-break-word">{metrics.totalInflow}</p>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-normal text-black-2">Total Inflow</p>
              <div className="flex items-center gap-1">
                <div className="w-[14px] h-[14px] rounded-full bg-green-2 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 1L4 7M4 1L1 4M4 1L7 4" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] font-normal text-green-2">{metrics.totalInflowChange}</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-grey-1 rounded-lg w-full h-[74px] p-3 flex flex-col justify-between">
            <p className="text-[19px] font-semibold text-green-2 leading-tight wrap-break-word">{metrics.mrr}</p>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-normal text-black-2">MRR</p>
              <div className="flex items-center gap-1">
                <div className="w-[14px] h-[14px] rounded-full bg-green-2 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 1L4 7M4 1L1 4M4 1L7 4" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] font-normal text-green-2">{metrics.mrrChange}</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-grey-1 rounded-lg w-full h-[74px] p-3 flex flex-col justify-between">
            <p className="text-[19px] font-semibold text-green-3 leading-tight wrap-break-word">{metrics.commissionRevenue}</p>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-normal text-black-2">Commission Revenue</p>
              <div className="flex items-center gap-1">
                <div className="w-[14px] h-[14px] rounded-full bg-red-1 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 7L4 1M4 7L1 4M4 7L7 4" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] font-normal text-red-1">{metrics.commissionRevenueChange}</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-grey-1 rounded-lg w-full h-[74px] p-3 flex flex-col justify-between">
            <p className="text-[19px] font-semibold text-red-1 leading-tight wrap-break-word">{metrics.gmv}</p>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-normal text-black-2">GMV</p>
              <div className="flex items-center gap-1">
                <div className="w-[14px] h-[14px] rounded-full bg-red-1 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 7L4 1M4 7L1 4M4 7L7 4" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] font-normal text-red-1">{metrics.gmvChange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
