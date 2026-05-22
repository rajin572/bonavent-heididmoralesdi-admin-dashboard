import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { IUserDataType } from "../../../types/UserDataTypes";
interface UserModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IUserDataType | null;
}
const UserModal: React.FC<UserModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[450px]"
    >
      <div className="p-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-base-color text-center">
            User Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            See all details about {currentRecord?.name}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.profile}
              alt={currentRecord?.name}
              className="w-14 h-14 object-cover rounded"
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.name}
            </h2>
          </div>

          <div className="mt-5">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              Personal Information
            </h2>
            <div className="text-lg  mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">User Name: </span>
                <span className="">{currentRecord?.name}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Phone:</span>
                <span>{currentRecord?.phone}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Location:</span>
                <span>{currentRecord?.location}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Joining Date:</span>
                <span>01/01/2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
