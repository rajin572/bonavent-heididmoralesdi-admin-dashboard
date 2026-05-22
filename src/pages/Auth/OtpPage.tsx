"use client";
import { Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReuseButton from "../../ui/Button/ReuseButton";
import { LuMailCheck } from "react-icons/lu";
import { useForgetOtpVerifyMutation, useResendForgetOTPMutation } from "../../redux/features/auth/authApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";

const OTPVerify = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [otp, setOtp] = useState("");

  const forgottenEmail = JSON.parse(Cookies.get("main.bonavent_forgetEmail") || "null");

  const [otpMatch] = useForgetOtpVerifyMutation();
  const [resendOtp] = useResendForgetOTPMutation();

  const handleOTPSubmit = async () => {
    if (otp.length === 4) {
      const res = await tryCatchWrapper(
        otpMatch,
        { body: { otp: otp } },
        {
          toastLoadingMessage: "Verifying OTP...",
          toastSuccessMessage: "OTP Matched!",
          toastErrorMessage: "Failed to verify OTP. Please try again later.",
        },
      );
      if (res?.statusCode === 200) {
        form.resetFields();
        Cookies.remove("main.bonavent_forgetToken");
        Cookies.remove("main.bonavent_forgetEmail");
        Cookies.set("main.bonavent_forgetOtpMatchToken", res.data, {
          path: "/",
          expires: 1,
        });

        setOtp("");
        router("/update-password");
      }
    }
  };

  const handleResendOtp = async () => {
    await tryCatchWrapper(resendOtp, {}, {
      toastLoadingMessage: "Resending OTP...",
      toastSuccessMessage: "OTP Resent Successfully!",
      toastErrorMessage: "Failed to resend OTP. Please try again later.",
    });
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center text-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto  p-6 rounded-2xl">
            <div className="mb-8">
              <div className="p-3 rounded-full bg-[#EFF7FF] w-fit mx-auto">
                <div className="p-3 rounded-full bg-[#DAEBFF] w-fit mx-auto">
                  <LuMailCheck className="size-8  text-secondary-color " />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-secondary-color mb-5 text-center mt-4">
                Check your email
              </h1>
              <p className="text-lg sm:text-xl mb-2 text-base-color">
                We sent a verification link to your contact email {forgottenEmail}.
              </p>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[30px] h-[45px] md:!w-[60px] md:!h-[50px] lg:!h-[80px] text-[20px] sm:text-[30px] !bg-primary-color border !border-secondary-color
                      rounded-lg mr-[10px] sm:mr-[20px] !text-base-color outline-secondary-color  focus:ring-secondary-color"
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                onClick={handleOTPSubmit}
              >
                Verify OTP
              </ReuseButton>
            </Form>
            <div className="flex justify-center gap-2 py-1 mt-5">
              <p>Didn’t receive code?</p>
              <p onClick={handleResendOtp} className="!text-secondary-color !underline font-semibold cursor-pointer">
                Click to resend
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default OTPVerify;
