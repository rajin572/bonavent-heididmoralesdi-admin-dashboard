/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { UserData } from "../../../public/data/Users";
import AllUserTable from "../../ui/Tables/UserTable";
import UserModal from "../../ui/Modal/AllUser/UserModal";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";

const AdminAllUsers = () => {
  const data: any[] = UserData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

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

  const handleBlock = (record: any) => {
    handleCancel();
    console.log(record);
  };
  const handleUnblock = (record: any) => {
    handleCancel();
    console.log(record);
  };
  return (
    <div
      className=" bg-primary-color rounded-xl p-4 min-h-[90vh]"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold mb-5">
          Users
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <AllUserTable
        data={data}
        loading={false}
        showViewModal={showViewUserModal}
        showBlockModal={showBlockModal}
        showUnblockModal={showUnblockModal}
        setPage={setPage}
        page={page}
        total={data.length}
        limit={limit}
      />
      <UserModal
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

export default AdminAllUsers;
