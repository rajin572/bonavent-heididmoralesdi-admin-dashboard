import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { IUserDataType } from "../../types/UserDataTypes";

// Define the type for the props
interface AllUserTableProps {
  data: IUserDataType[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IUserDataType) => void; // Function to handle viewing a user
  showBlockModal: (record: IUserDataType) => void; // Function to handle blocking a user
  showUnblockModal: (record: IUserDataType) => void; // Function to handle unblocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const AllUserTable: React.FC<AllUserTableProps> = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "#UID",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name", // Data key for name
      key: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender", // Data key for gender
      key: "gender",
      filters: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
        { text: "Other", value: "-" },
      ],
      onFilter: (value: string, record: { gender: string }) =>
        record.gender.includes(value),
    },
    {
      title: "Email",
      dataIndex: "email", // Data key for email
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone", // Data key for phone
      key: "phone",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth", // Data key for dateOfBirth
      key: "dateOfBirth",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IUserDataType) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          {/* Block User Tooltip */}

          <Tooltip placement="left" title="Unblock this User">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color"
              onClick={() => showUnblockModal(record)}
            >
              <CgUnblock style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          <Tooltip placement="left" title="Block this User">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color"
              onClick={() => showBlockModal(record)}
            >
              <MdBlock style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
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

export default AllUserTable;
