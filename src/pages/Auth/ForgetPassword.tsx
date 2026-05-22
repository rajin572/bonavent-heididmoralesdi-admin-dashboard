/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuKey } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { Form } from "antd";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [forgetPassword] = useForgetPasswordMutation();

  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role === "admin") {
      router("/", { replace: true });
    }
  }, [router, userExist]);

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      forgetPassword,
      { body: values },
      {
        toastLoadingMessage: "Processing...",
        toastSuccessMessage: "OTP sent to your email!",
        toastErrorMessage: "Failed to send OTP. Please try again later.",
      },
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.set("main.bonavent_forgetToken", res.data.forgetToken, {
        path: "/",
        expires: 1,
      });
      Cookies.set("main.bonavent_forgetEmail", JSON.stringify(values.email), {
        path: "/",
        expires: 1,
      });
      router("/forgot-password/otp-verify");
    }
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center ">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto p-6 rounded-2xl">
            <div className="mb-8">
              <div className="p-3 rounded-full bg-[#EFF7FF] w-fit mx-auto">
                <div className="p-3 rounded-full bg-[#DAEBFF] w-fit mx-auto">
                  <LuKey className="size-8  text-secondary-color " />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-secondary-color mb-5 text-center mt-4">
                Forgot Password
              </h1>
              <p className=" sm:text-lg mb-2 text-base-color text-center">
                No worries, we’ll send you reset instructions.
              </p>
            </div>

            <ReusableForm form={form} handleFinish={onFinish}>
              <ReuseInput
                name="email"
                label="Email"
                placeholder="Enter Your Email"
                inputClassName="!bg-[#EFEFEF] !py-2"
              />
              <ReuseButton
                variant="secondary"
                htmlType="submit"
              // icon={allIcons.arrowRight}
              >
                Sign In
              </ReuseButton>
            </ReusableForm>

            <div className="text-base-color w-fit mx-auto mt-10">
              <Link
                to="/sign-in"
                className="flex justify-center items-center  gap-2 "
              >
                <FaArrowLeftLong className="size-4 " />
                <span>Back to log in</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ForgotPassword;
