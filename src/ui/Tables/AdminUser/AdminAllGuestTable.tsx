import React from "react";
import { Rate, Space, Tooltip } from "antd";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../../utils/ReuseTable";
import { AllImages } from "../../../../public/images/AllImages";
import { IGuest } from "../../../types/user.type";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { formatDate } from "../../../utils/dateFormet";

// Define the type for the props
interface AdminAllGuestTableProps {
  data: IGuest[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showBlockModal: (record: IGuest) => void; // Function to handle blocking a user
  showUnblockModal: (record: IGuest) => void; // Function to handle unblocking a user
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminAllGuestTable: React.FC<AdminAllGuestTableProps> = ({
  data,
  loading,
  showBlockModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const serverUrl = getImageUrl();
  const columns = [
    {
      title: "Serial ID",
      dataIndex: "serialId",
      key: "serialId",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName: string, record: IGuest) => (
        <div className="flex items-center gap-2">
          <img
            src={record.profileImage ? serverUrl + record.profileImage : AllImages.profile}
            className="w-8 h-8 object-cover rounded-full"
            alt=""
          />
          <span className="capitalize">{fullName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Type",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <span className="capitalize">{role}</span>,
    },
    // {
    //   title: "Car Listings",
    //   dataIndex: "carListings",
    //   key: "carListings",
    // },
    {
      title: "Car Booked",
      dataIndex: "totalTrip",
      key: "totalTrip",
    },

    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="flex items-center gap-2">
          <Rate
            allowHalf
            value={rating}
            disabled
            className="!text-secondary-color"
          />
          <div className="flex items-center">
            <span className="">{rating}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{formatDate(createdAt)}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IGuest) => (
        <Space size="middle">


          {/* Block User Tooltip */}
          {
            record.isBlocked ? (<Tooltip placement="left" title="Unblock this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                onClick={() => showUnblockModal(record)}
              >
                <CgUnblock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>) : <Tooltip placement="left" title="Block this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                onClick={() => showBlockModal(record)}
              >
                <MdBlock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          }



        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"email"}
    />
  );
};

export default AdminAllGuestTable;
