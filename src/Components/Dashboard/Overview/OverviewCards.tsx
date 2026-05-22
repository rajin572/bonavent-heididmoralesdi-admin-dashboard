/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllImages } from "../../../../public/images/AllImages";

const OverviewCards = ({ statsData, isFetching }: any) => {

  const countData = [
    {
      id: 1,
      background: "#ffffff",
      name: "Total Users",
      icon: AllImages.users,
      count: isFetching ? "--" : statsData?.totalHost + statsData?.totalGuest,
    },

    {
      id: 3,
      background: "#ffffff",
      name: "Total Hosts ",
      icon: AllImages.host,
      count: isFetching ? "--" : statsData?.totalHost,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Total Guests",
      icon: AllImages.guest,
      count: isFetching ? "--" : statsData?.totalGuest,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Total Car Listings",
      icon: AllImages.listing,
      count: isFetching ? "--" : statsData?.totalVehicle,
    },
    {
      id: 5,
      background: "#ffffff",
      name: "Total Earnings",
      icon: AllImages.earning,
      count: isFetching ? "--" : `$${statsData?.totalEarning}`,
    },
  ];
  return (
    <div className="flex flex-row flex-wrap gap-1 lg:gap-3 mb-5 ">
      {/* Company  */}
      {countData.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-4 rounded-xl w-full my-2 lg:my-0 flex-1 border-2 border-secondary-color p-6`}
          style={{
            backgroundColor: item.background,
            boxShadow: "0px 0px 3px 0.5px #00000010",
          }}
        >
          <img src={item.icon} alt="" className="w-auto h-12" />
          <div className="!w-full">
            <p className="text-sm sm:text-base lg:text-lg  font-semibold mb-1  tracking-tight w-full text-nowrap">
              {item.name}
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl  font-bold capitalize">
              {item.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
