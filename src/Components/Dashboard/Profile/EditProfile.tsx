/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import ReuseButton from "../../../ui/Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import Loading from "../../../ui/Loading";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../../redux/features/profile/profileApi";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { AllImages } from "../../../../public/images/AllImages";

const EditProfile = () => {
  const [form] = Form.useForm();
  const imageApiUrl = getImageUrl();
  const { data, isFetching } = useGetProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation({});

  const profileData = data?.data;
  console.log(data)

  const profileImage = imageApiUrl + profileData?.profileImage;

  const [imageUrl, setImageUrl] = useState(AllImages?.users);

  useEffect(() => {
    if (profileImage?.length > 0) {

      setImageUrl(profileImage);
    } else {
      setImageUrl(AllImages?.users);
    }
  }, [profileImage]);

  const handleImageUpload = (info: any) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    if (values?.image?.file?.originFileObj) {
      formData.append("image", values?.image?.file?.originFileObj);
    }
    const data = {
      fullName: values?.fullName,
      phone: values?.contactNumber,
    };
    formData.append("data", JSON.stringify(data));
    await tryCatchWrapper(
      updateProfile,
      { body: formData },
      {
        toastLoadingMessage: "Updating Profile...",
        toastSuccessMessage: "Profile Updated Successfully!",
        toastErrorMessage: "Failed to update profile. Please try again later.",
      },
    );
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-base-color   my-5 mb-16">
        Edit Profile
      </h1>
      <div className=" lg:w-[70%] mx-auto">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="bg-transparent py-10 text-base-color w-full "
        >
          <div className="mt-5 flex flex-col justify-start items-start gap-x-4">
            <div className=" relative">
              <img
                className="h-40 w-40 relative rounded-full border border-secondary-color/10 object-contain"
                src={imageUrl}
                alt=""
              />
              <Form.Item name="image">
                <Upload
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  listType="text"
                  itemRender={(_originNode, file, _fileList, actions) => (
                    <div className="flex items-center gap-1 max-w-[160px]">
                      <span className="text-sm text-gray-500 truncate">
                        {file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name}
                      </span>
                      <button
                        type="button"
                        onClick={actions.remove}
                        className="text-red-400 hover:text-red-600 text-xs flex-shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  className="absolute -top-10 !right-3 text-end"
                >
                  <Button
                    style={{
                      zIndex: 1,
                    }}
                    className=" !py-2 !px-1.5 w-fit h-fit !rounded-full shadow !text-secondary-color !border-secondary-color !bg-[#EFEFEF]"
                  >
                    <IoCameraOutline
                      className="w-5 h-5 !text-secondary-color"
                      style={{ color: "#19363D" }}
                    />
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <p className="text-5xl font-semibold -mt-5">{profileData?.fullName}</p>
          </div>

          <div className=" text-white mt-5">
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              initialValue={profileData?.email}
              name="email"
              className="text-white "
            >
              <Input
                suffix={<MdOutlineEdit />}
                type="email"
                placeholder="Enter your email"
                className="!py-1.5 !px-3 !text-lg !bg-primary-color border !border-input-color !text-base-color rounded-lg"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              User Name
            </Typography.Title>
            <Form.Item
              initialValue={profileData?.fullName}
              name="userName"
              className="text-white"
            >
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Name"
                className="!py-1.5 !px-3 !text-lg !bg-primary-color border !border-input-color !text-base-color rounded-lg"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Contact number
            </Typography.Title>
            <Form.Item
              initialValue={profileData?.phone}
              name="contactNumber"
              className="text-white"
            >
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Contact number"
                className="!py-1.5 !px-3 !text-lg !bg-primary-color border !border-input-color !text-base-color rounded-lg"
              />
            </Form.Item>
            <Form.Item>
              <ReuseButton variant="secondary" htmlType="submit">
                Save & Change
              </ReuseButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default EditProfile;
