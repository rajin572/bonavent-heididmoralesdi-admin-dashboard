/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaRegBell } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import { useGetNotificationQuery } from "../../redux/features/dashboard/dashboardApi";
import { formatDate } from "../../utils/dateFormet";
import { Pagination } from "antd";
import { useState } from "react";
import { FadeLoader } from "react-spinners";



const Notifications = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isFetching } = useGetNotificationQuery({ page, limit });

  const notifications: any[] = data?.data?.notification || [];
  return (
    <div className=" bg-slate-50  rounded-xl">
      <div className="flex items-center bg-secondary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <MdArrowBackIos
          className="text-xl sm:text-2xl lg:text-3xl text-primary-color cursor-pointer "
          onClick={() => window.history.back()}
        />

        <h1 className="text-3xl font-bold text-primary-color  ">
          All Notification
        </h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 ">
        {isFetching ? <div className="flex items-center justify-center h-[50vh]">
          <FadeLoader color="#3083f9" />
        </div> : notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
          >
            {/* Icon */}
            <div className="bg-[#EAECFE] p-2 rounded">
              <FaRegBell className="text-secondary-color" />
            </div>

            {/* Notification text */}
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-700">
                {notification.message}
              </span>
              <span className="text-sm text-gray-500">{formatDate(notification.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="py-10 flex items-center justify-center">
        {" "}
        <Pagination
          current={page}
          onChange={(page) => setPage(page)}
          total={data?.data?.meta?.total}
        />
      </div>
    </div>
  );
};
export default Notifications;
