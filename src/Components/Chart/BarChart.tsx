/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

// Define the structure of each data point in the chart
interface ChartData {
  month: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ChartData; uv: number }[];
}

const Bar_Chart = ({ overviewData }: any) => {


  const chartData: ChartData[] = useMemo(() => {
    return [
      { month: "Jan", value: overviewData?.jan },
      { month: "Feb", value: overviewData?.feb },
      { month: "Mar", value: overviewData?.mar },
      { month: "Apr", value: overviewData?.apr },
      { month: "May", value: overviewData?.may },
      { month: "Jun", value: overviewData?.jun },
      { month: "Jul", value: overviewData?.jul },
      { month: "Aug", value: overviewData?.aug },
      { month: "Sep", value: overviewData?.sep },
      { month: "Oct", value: overviewData?.oct },
      { month: "Nov", value: overviewData?.nov },
      { month: "Dec", value: overviewData?.dec },
    ];
  }, [overviewData]);

  // Custom tooltip to display the information
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-2 rounded-md border border-gray-300">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.month}
          </p>
          <p className="text-xs text-gray-600">
            Total Income:{" "}
            <span className="font-semibold">${payload[0].payload.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tick style for X and Y axes
  const tickStyle = { fill: "#000", fontSize: 12 };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={30} // Adjust the gap between bars if necessary
        >
          <RechartsTooltip content={<CustomTooltip />} />
          <XAxis dataKey="month" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tick={{ ...tickStyle }}
            axisLine={{
              stroke: "#0861C500", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />

          <Bar
            dataKey="value"
            fill="url(#incomeGradient)" // Bar color
            barSize={20} // Width of each bar
            radius={[10, 10, 10, 10]} // Rounded corners for bars
          />

          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6078EA" />
              <stop offset="100%" stopColor="#6078EA " />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;
