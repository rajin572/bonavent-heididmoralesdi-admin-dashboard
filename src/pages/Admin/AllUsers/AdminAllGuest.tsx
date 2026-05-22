/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../../ui/Form/ReuseSearchInput";
import BlockModal from "../../../ui/Modal/BlockModal";
import UnblockModal from "../../../ui/Modal/UnblockModal";
import AdminAllGuestTable from "../../../ui/Tables/AdminUser/AdminAllGuestTable";
import { useBlockUnblockUserMutation, useGetGuestQuery } from "../../../redux/features/users/usersApi";
import { IGuest } from "../../../types/user.type";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const AdminAllGuest = () => {
  const [blockUnblockUser] = useBlockUnblockUserMutation();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const { data, isFetching } = useGetGuestQuery({
    page,
    limit,
    searchTerm: searchText,
  },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(data)

  const allGuestsData: IGuest[] = data?.data?.result;
  const allGuestsMetaData = data?.data?.meta;

  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);


  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (record: IGuest) => {
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
  const handleUnblock = async (record: IGuest) => {
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
          All Guest
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
        <AdminAllGuestTable
          data={allGuestsData}
          loading={isFetching}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={allGuestsMetaData?.total}
          limit={limit}
        />
      </div>

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

export default AdminAllGuest;
