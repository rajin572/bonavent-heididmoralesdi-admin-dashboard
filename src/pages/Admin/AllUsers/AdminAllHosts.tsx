/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../../ui/Form/ReuseSearchInput";
import BlockModal from "../../../ui/Modal/BlockModal";
import UnblockModal from "../../../ui/Modal/UnblockModal";
import AdminAllHostsTable from "../../../ui/Tables/AdminUser/AdminAllHostsTable";
import ViewHostDetailModal from "../../../ui/Modal/AllUser/ViewHostDetailModal";
import { useBlockUnblockUserMutation, useGetHostQuery } from "../../../redux/features/users/usersApi";
import { IHost } from "../../../types/user.type";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const AdminAllHosts = () => {
  const [blockUnblockUser] = useBlockUnblockUserMutation();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 10;

  const { data, isFetching } = useGetHostQuery({
    page,
    limit,
    searchTerm: searchText,
  },
    {
      refetchOnMountOrArgChange: true,
    }
  );


  const allHostsData: IHost[] = data?.data?.result;
  const allHostsMetaData = data?.data?.meta;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (record: IHost) => {
    const res = await tryCatchWrapper(
      blockUnblockUser,
      {
        params: record?._id,
      },
      {
        toastLoadingMessage: "Blocking...",
        toastSuccessMessage: "User Blocked Successfully",
        toastErrorMessage: "Failed to Block User",
      }
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (record: any) => {
    const res = await tryCatchWrapper(
      blockUnblockUser,
      {
        params: record?._id,
      },
      {
        toastLoadingMessage: "Unblocking...",
        toastSuccessMessage: "User Unblocked Successfully",
        toastErrorMessage: "Failed to Unblock User",
      }
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-color   capitalize">
          All Hosts
        </h1>
        <div className="h-fit">
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
        <AdminAllHostsTable
          data={allHostsData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={allHostsMetaData?.total}
          limit={limit}
        />
      </div>
      <ViewHostDetailModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
        description=" Are You Sure You want to Block This User ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This User ?"
      />
    </div>
  );
};

export default AdminAllHosts;
