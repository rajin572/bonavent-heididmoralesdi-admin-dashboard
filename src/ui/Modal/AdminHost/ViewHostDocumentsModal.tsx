/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { FaRegEye } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";

interface ViewHostDocumentsModalProps<T> {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
}

const ViewHostDocumentsModal: React.FC<ViewHostDocumentsModalProps<any>> = ({
  isViewModalVisible,
  handleCancel,
}) => {
  //   const [blockUser] = useBlockUserMutation();

  return (
    <Modal
      // title="Confirm Delete"
      open={isViewModalVisible}
      onCancel={handleCancel}
      cancelText="Cancel"
      centered
      // styles.body={{ textAlign: "center" }}
      footer={false}
    >
      <p className="text-lg sm:text-xl lg:text-2xl  text-base-color font-bold ">
        All Documents
      </p>
      <div className="flex flex-col gap-2 mt-8">
        {Array(5)
          .fill(0)
          .map((_: any, index: number) => (
            <div
              key={index}
              className="w-full py-1.5 px-3 !bg-[#EFF7FF] border rounded-lg !border-secondary-color  !text-secondary-color text-xs lg:text-sm cursor-pointer flex items-center justify-between gap-5"
            >
              <p className="text-sm sm:text-base lg:text-lg text-base-color">
                Document 1
              </p>
              <div className="flex items-center gap-5">
                <FaRegEye
                  className="text-base sm:text-lg lg:text-xl cursor-pointer text-secondary-color"
                  onClick={() => {}}
                />
                <MdFileDownload
                  className="text-base sm:text-lg lg:text-xl cursor-pointer text-secondary-color"
                  onClick={() => {}}
                />
              </div>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default ViewHostDocumentsModal;
