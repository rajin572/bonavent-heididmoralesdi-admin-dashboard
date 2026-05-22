/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReportCard from "../../ui/Card/ReportCard";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import { Pagination } from "antd";
import { useGetReportQuery } from "../../redux/features/report/reportApi";
import Loading from "../../ui/Loading";
import { IReport } from "../../types/ReviewType";

const AdminAllReport = () => {

  const [page, setPage] = useState(1);
  const limit = 12;
  const [searchText, setSearchText] = useState("");


  const [filters, setFilters] = useState({
    status: "",
    role: "",
    reported: "",
    reason: "",
  });


  const handleChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };



  const { data, isFetching } = useGetReportQuery({
    page,
    limit,
    searchTerm: searchText,
    role: filters.role,
    status: filters.status,
    reason: filters.reason,
  });

  console.log(data)
  const reportsData: IReport[] = data?.data?.data;
  const reportMetaData = data?.data?.meta;

  //   const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-color font-integralcf capitalize">
          Report
        </h1>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        {/* All Statuses */}
        <ReuseSelect
          name="status"
          placeholder="All Statuses"
          options={[
            { label: "All Statuses", value: "" },
            { label: "New", value: "New" },
            { label: "Reviewing", value: "Reviewing" },
            { label: "Resolving", value: "Resolving" },
          ]}
          value={filters.status}
          onChange={(val) => handleChange("status", val)}
          selectClassName="!w-[250px]"
          allowClear
        />

        {/* All roles */}
        <ReuseSelect
          name="role"
          placeholder="All Reporters"
          options={[
            { label: "All Reporters", value: "" },
            { label: "Guest", value: "guest" },
            { label: "Host", value: "host" },
          ]}
          value={filters.role}
          onChange={(val) => handleChange("role", val)}
          selectClassName="!w-[250px]"
          allowClear
        />

        {/* All Reported */}
        {/* <ReuseSelect
          name="reported"
          placeholder="All Reported"
          options={[
            { label: "All Reported", value: "" },
            { label: "Guest", value: "guest" },
            { label: "Host", value: "host" },
          ]}
          value={filters.reported}
          onChange={(val) => handleChange("reported", val)}
          selectClassName="!w-[250px]"
          allowClear
        /> */}

        {/* All Reasons */}
        <ReuseSelect
          name="reason"
          placeholder="All Reasons"
          options={[
            { label: "All Reasons", value: "" },

            {
              label: "Inappropriate or offensive content",
              value: "Inappropriate or offensive content",
            },
            {
              label: "Misleading or suspicious information",
              value: "Misleading or suspicious information",
            },
            { label: "Spam or promotional content", value: "Spam or promotional content" },
            { label: "Other", value: "Other" },
          ]}
          value={filters.reason}
          onChange={(val) => handleChange("reason", val)}
          selectClassName="!w-[250px]"
          allowClear
        />
      </div>
      <div className="flex flex-col gap-5">
        {isFetching ?
          <div className="flex items-center justify-center min-h-[70vh]">
            <Loading />
          </div> : reportsData?.map((item: IReport) => {
            return <ReportCard data={item} />;
          })}
      </div>
      <div className="flex justify-center items-center my-10">
        <Pagination
          current={page}
          pageSize={limit}
          onChange={(page) => setPage(page)}
          total={reportMetaData?.total}
          showTotal={(total) => (
            <span className="!text-base-color">Total {total} reports</span>
          )}
          showSizeChanger={false}
          responsive
        />
      </div>
    </div>
  );
};

export default AdminAllReport;
