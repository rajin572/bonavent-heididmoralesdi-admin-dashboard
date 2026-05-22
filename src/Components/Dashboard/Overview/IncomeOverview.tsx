import { useState } from "react";
import Bar_Chart from "../../Chart/BarChart";
import YearOption from "../../../utils/YearOption";
import { useGetEarningOverviewQuery } from "../../../redux/features/dashboard/dashboardApi";

const IncomeOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data } = useGetEarningOverviewQuery({ year }, {
    refetchOnMountOrArgChange: true,
  });

  const overviewData = data?.data?.income;
  return (
    <div
      className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg flex flex-col border-2 border-secondary-color"
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="flex justify-between items-center text-base-color my-5">
        <p className="text-lg sm:text-xl lg:text-2xl  text-base-color font-bold ">
          Earning Overview
        </p>
        <div className="flex items-center gap-2">
          <div>
            <YearOption currentYear={currentYear} setThisYear={setYear} />
          </div>
        </div>
      </div>
      <div>
        <Bar_Chart overviewData={overviewData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
