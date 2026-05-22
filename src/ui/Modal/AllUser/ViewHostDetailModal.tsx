import { Modal, Rate } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { IHost } from "../../../types/user.type";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { formatDate } from "../../../utils/dateFormet";
interface ViewHostDetailModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IHost;
}
const ViewHostDetailModal: React.FC<ViewHostDetailModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const serverUrl = getImageUrl();
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-2">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color">
            Host Details
          </h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={currentRecord?.profileImage ? serverUrl + currentRecord?.profileImage : AllImages.profile}
              alt={currentRecord?.fullName}
              className="w-32 h-32 object-cover rounded"
            />
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-secondary-color">
              {currentRecord?.fullName}
            </h2>
          </div>

          <div className="my-5">
            <div className="text-xs sm:text-sm lg:text-base  mt-3">
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">User Type:</span>
                <span>Host</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">Car Listing:</span>
                <span>{currentRecord?.totalVehicle}</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                <span className="font-semibold">Car Booked: </span>
                <span className="">{currentRecord?.totalTrip}</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">Rating:</span>
                <span>
                  <div className="flex items-center gap-2">
                    <Rate
                      allowHalf
                      value={currentRecord?.averageRating}
                      disabled
                      className="!text-secondary-color"
                    />
                    <div className="flex items-center">
                      <span className="">{currentRecord?.averageRating}</span>
                    </div>
                  </div>
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">Joining Date:</span>
                <span>{formatDate(currentRecord?.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewHostDetailModal;
