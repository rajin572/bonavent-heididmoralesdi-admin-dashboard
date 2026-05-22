import { IoWarningOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { LuMessageSquare } from "react-icons/lu";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";
import { IReport } from "../../types/ReviewType";
import { getImageUrl } from "../../helpers/config/envConfig";
import { formatDate } from "../../utils/dateFormet";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useUpdateReportStatusMutation } from "../../redux/features/report/reportApi";

const ReportCard = ({ data }: { data: IReport }) => {
  const [updateReportStatus] = useUpdateReportStatusMutation();
  const serverUrl = getImageUrl();

  const handleStatus = async (record: IReport) => {
    console.log(record)
    await tryCatchWrapper(
      updateReportStatus,
      {
        params: record?._id,
        body: { status: record?.status === "New" ? "Reviewing" : record?.status === "Reviewing" ? "Resolving" : "Resolved" },
      },
      {
        toastLoadingMessage: "Unblocking...",
        toastSuccessMessage: "User Unblocked Successfully",
        toastErrorMessage: "Failed to Unblock User",
      }
    )
  };

  return (
    <div
      className="p-6 bg-primary-color rounded-lg mt-5"
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="flex justify-between ">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <img
              src={data?.reporter?.profileImage ? serverUrl + data?.reporter?.profileImage : AllImages.profile}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-xl sm:text-lg lg:text-xl font-semibold text-base-color capitalize mb-0.5">
                {data?.reporter?.fullName}
              </h1>
              <p className="text-[10px] lg:text-xs w-fit px-2 py-0.5 rounded-full bg-[#BFC5FD] text-[#1D2939]">
                {data?.reporter?.role}
              </p>
            </div>
          </div>
          <IoWarningOutline className="text-xl text-warning-color" />
          <div className="flex items-center gap-2">
            <img
              src={data?.reportedUser?.profileImage ? serverUrl + data?.reportedUser?.profileImage : AllImages.profile}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-xl sm:text-lg lg:text-xl font-semibold text-base-color capitalize">
                {data?.reportedUser?.fullName}
              </h1>
              <p className="text-[10px] lg:text-xs w-fit px-2 py-0.5 rounded-full bg-[#BFC5FD] text-[#1D2939]">
                {data?.reportedUser?.role}
              </p>
            </div>
          </div>
        </div>
        <span>
          <p
            className={`text-xs sm:text-sm lg:text-base bg-secondary-color text-primary-color py-0.5 px-2 rounded-full ${data?.status === "New"
              ? "bg-secondary-color"
              : data?.status === "Reviewing"
                ? "bg-warning-color"
                : "bg-success-color"
              }`}
          >
            {data?.status}
          </p>
        </span>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <div className="flex items-center gap-1">
          <BsClock className="text-sm sm:text-base lg:text-lg text-secondary-color" />
          <span className="text-xs sm:text-sm lg:text-base text-base-color">
            {formatDate(data?.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LuMessageSquare className="text-sm sm:text-base lg:text-lg text-secondary-color" />
          <span className="text-xs sm:text-sm lg:text-base text-base-color">
            {data?.reason}
          </span>
        </div>
      </div>
      <p className="text-xs sm:text-sm lg:text-base text-base-color mt-5">
        {data?.reasonText}
      </p>
      <div className="my-5 w-full h-[2px] bg-[#98A2B3] rounded-full"></div>
      <ReuseButton
        onClick={() => data?.status === "Resolving" ? {} : handleStatus(data)}
        variant="secondary"
        className={`!w-fit ${data?.status === "Resolving"
          ? "!bg-[#ACACAC] !border-[#ACACAC] !cursor-not-allowed"
          : "!bg-secondary-color"
          }`}
      >
        {data?.status === "New"
          ? "Start Review"
          : data?.status === "Reviewing"
            ? "Mark Resolved"
            : "Resolved"}
      </ReuseButton>
    </div>
  );
};

export default ReportCard;
