/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import BlockModal from "../../../ui/Modal/BlockModal";
import UnblockModal from "../../../ui/Modal/UnblockModal";
import RecentUserTable from "../../../ui/Tables/RecentUserTable";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useBlockUnblockUserMutation } from "../../../redux/features/users/usersApi";

const RecentUser = ({ recentUser, isFetching }: any) => {
  const [blockUnblockUser] = useBlockUnblockUserMutation();
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

  const handleBlock = async (record: any) => {
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
    <div className="mt-10  rounded-xl">
      <div className="flex justify-between items-center mx-0 py-2">
        <p className="text-lg sm:text-xl lg:text-2xl  text-base-color font-bold ">
          Recent Users
        </p>
      </div>

      <div
        className=" bg-primary-color border-2 border-secondary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <RecentUserTable
          data={recentUser}
          loading={isFetching}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={() => { }}
          page={1}
          total={recentUser?.length}
          limit={6}
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

export default RecentUser;
