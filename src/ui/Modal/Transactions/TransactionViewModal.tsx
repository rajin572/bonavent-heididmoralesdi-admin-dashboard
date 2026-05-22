import { Modal } from "antd";
import { ITransactionType } from "../../../types/TransactionType";
interface TransactionViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ITransactionType | null;
}
const TransactionViewModal: React.FC<TransactionViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord);
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <h3 className="text-lg sm:text-xl lg:text-2xl  text-base-color font-bold mb-5">
        Transaction Details
      </h3>

      <div className="text-xs sm:text-sm lg:text-base  mt-3">
        <div className="flex items-center justify-between border-b border-secondary-color/20 py-1.5 font-semibold  gap-2 mb-2">
          <span className="font-semibold">Date:</span>
          <span>23/02/2023</span>
        </div>
        <div className="flex items-center justify-between border-b border-secondary-color/20 py-1.5 font-semibold  gap-2 mb-2">
          <span className="font-semibold">Transaction ID:</span>
          <span>TNX12094546</span>
        </div>
        <div className="flex items-center justify-between border-b border-secondary-color/20 py-1.5 font-semibold  gap-2 mb-2">
          <span className="font-semibold">Payment Metod:</span>
          <span>Credit Card </span>
        </div>
        <div className="flex items-center justify-between pt-2  gap-2  !text-secondary-color font-bold">
          <span className="font-semibold">Earning:</span>
          <span className="text-success-color">$100 </span>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionViewModal;
