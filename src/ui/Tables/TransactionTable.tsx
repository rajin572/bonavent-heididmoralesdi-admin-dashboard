/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { formatDate } from "../../utils/dateFormet";

// Define the type for the props
interface TransactionTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Serial ID",
      dataIndex: "serialId",
      key: "serialId",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Host Name",
      dataIndex: ["tripId", "hostId", "fullName"],
      key: "hostName",
    },
    {
      title: "Host Email",
      dataIndex: ["tripId", "hostId", "email"],
      key: "hostEmail",
    },
    {
      title: "Guest Name",
      dataIndex: ["tripId", "guestId", "fullName"],
      key: "guestName",
    },
    {
      title: "Guest Email",
      dataIndex: ["tripId", "guestId", "email"],
      key: "guestEmail",
    },
    {
      title: "Trip Status",
      dataIndex: ["tripId", "tripStatus"],
      key: "tripStatus",
      render: (value: string) => <span className="capitalize">{value}</span>,
    },
    {
      title: "Total Amount ($)",
      dataIndex: "amount",
      key: "amount",
      render: (value: number) => `$${value?.toFixed(2)}`,
    },
    {
      title: "Commission Earning ($)",
      dataIndex: ["tripId", "adminAmount"],
      key: "adminAmount",
      render: (value: number) => `$${value?.toFixed(2) || "0.00"}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => formatDate(value),
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

export default TransactionTable;
