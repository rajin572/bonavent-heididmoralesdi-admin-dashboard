/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import TransactionTable from "../../ui/Tables/TransactionTable";
import { useGetEarningQuery } from "../../redux/features/earning/earningApi";

const AdminAllTransaction = () => {

  const [page, setPage] = useState(1);
  const limit = 12;
  const [searchText, setSearchText] = useState("");


  const { data, isFetching } = useGetEarningQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  console.log(data)

  const transactionsData: any[] = data?.data?.result;
  const transactionMetaData = data?.data?.meta;


  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-color   capitalize">
          Earning
        </h1>
        <div className="h-fit hidden">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}

          />
        </div>
      </div>
      <div
        className=" bg-primary-color border-2 border-secondary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <TransactionTable
          data={transactionsData}
          loading={isFetching}
          setPage={setPage}
          page={page}
          total={transactionMetaData?.total}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default AdminAllTransaction;
