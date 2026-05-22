import Area_Chart from "../../Chart/AreaChart";
import YearOption from "../../../utils/YearOption";
import { useState } from "react";
import { ConfigProvider, Select } from "antd";
import { useGetUserOverviewQuery } from "../../../redux/features/dashboard/dashboardApi";

const UserOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [userType, setUserType] = useState("host");

  const { data } = useGetUserOverviewQuery({ year, userType }, {
    refetchOnMountOrArgChange: true,
  });

  const overviewData = data?.data?.data

  return (
    <div
      className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg border-2 border-secondary-color"
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="flex justify-between items-center text-base-color my-5">
        <p className="text-lg sm:text-xl lg:text-2xl  text-base-color font-bold ">
          User Overview
        </p>
        <div className="flex items-center gap-2">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  colorTextQuaternary: "#F9FAFB",
                  fontSize: 14,
                  borderRadius: 10,
                  colorBorder: "#6078EA",
                  colorText: "#2c2c2c",
                  colorIcon: "#2c2c2c",
                  colorBgContainer: "rgba(0,0,0,0)",
                  colorBgElevated: "#FFFFFF",
                  selectorBg: "#6078EA",
                  colorTextPlaceholder: "#F9FAFB",
                },
              },
            }}
          >
            <Select value={userType} onChange={(value) => setUserType(value)} placeholder="Select User" style={{ width: 150 }}>
              <Select.Option value="host">Host</Select.Option>
              <Select.Option value="guest">Guest</Select.Option>
            </Select>
          </ConfigProvider>
          <div>
            <YearOption currentYear={currentYear} setThisYear={setYear} />
          </div>
        </div>
      </div>
      <div>

        <Area_Chart overviewData={overviewData} />
      </div>
    </div>
  );
};

export default UserOverview;
