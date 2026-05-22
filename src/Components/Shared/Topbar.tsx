/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarsOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { FaBell, FaRegBell } from "react-icons/fa6";
import { useGetNotificationQuery } from "../../redux/features/dashboard/dashboardApi";
import { formatDate } from "../../utils/dateFormet";
import { FadeLoader } from "react-spinners";
import { useState } from "react";

const Topbar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useGetNotificationQuery({ page: 1, limit: 6 }, {
    skip: !open,
    refetchOnMountOrArgChange: open,
  });

  const notifications: any[] = data?.data?.notification || [];

  const handleMenuClick = () => {
    setCollapsed(false);
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
      onClick={handleMenuClick}
    >
      {isFetching ? <div className="flex min-w-[280px] items-center justify-center h-[20vh]">
        <FadeLoader color="#3083f9" /> </div> : notifications.map((notification) => (
          <div className="test-start" key={notification?._id}>
            <div className="flex items-center gap-2">
              <div className="bg-[#EAECFE] p-2 rounded">
                <FaRegBell className="text-secondary-color" />
              </div>
              <div className="flex flex-col items-start">
                <p>{notification?.message}</p>
                <p className="text-gray-400">{formatDate(notification?.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      <Link
        to={`/admin/notifications`}
        className="w-2/3 mx-auto !bg-secondary-color !text-primary-color rounded-xl h-8 py-1"
      >
        See More
      </Link>
    </div>
  );
  return (
    <div className="py-2  flex justify-between gap-0 items-center">
      <div className="flex items-center gap-2 text-base-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-primary-color"
        />
      </div>
      <div className="flex items-center justify-center  gap-5">
        <Dropdown
          onOpenChange={(open: boolean) => {
            setOpen(open);
          }}
          overlay={notificationMenu}
          trigger={["hover"]}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <FaBell className="text-2xl text-secondary-color" />
        </Dropdown>
      </div>
    </div>
  );
};
export default Topbar;
