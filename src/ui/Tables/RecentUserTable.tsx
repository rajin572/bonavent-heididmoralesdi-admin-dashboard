/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";

// Define the type for the props
interface RecentUserTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showBlockModal: (record: any) => void; // Function to handle blocking a user
  showUnblockModal: (record: any) => void; // Function to handle unblocking a user
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const RecentUserTable: React.FC<RecentUserTableProps> = ({
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
      render: (fullName: string, record: any) => (
        <div className="flex items-center gap-2">
          <img
            src={record?.profileImage ? serverUrl + record?.profileImage : AllImages.profile}
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
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">

          {/* Block User Tooltip */}
          {
            record.isBlocked ? <Tooltip placement="left" title="Unblock this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                onClick={() => showUnblockModal(record)}
              >
                <CgUnblock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
              : <Tooltip placement="left" title="Block this User">
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

export default RecentUserTable;
