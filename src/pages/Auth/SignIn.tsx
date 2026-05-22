/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import Cookies from "js-cookie";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const SignIn = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [login] = useLoginMutation();

  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role === "admin") {
      router("/", { replace: true });
    }
  }, [router, userExist]);

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(login, { body: values }, {
      toastLoadingMessage: "Signing In...",
      toastSuccessMessage: "Signed In Successfully!",
      toastErrorMessage: "Failed to Sign In. Please check your credentials.",
    });
    console.log(res);
    if (res?.statusCode === 200 && res?.data?.user?.role === "admin") {
      Cookies.set("main.bonavent_accessToken", res?.data?.accessToken, {
        path: "/",
        expires: 365,
        secure: false,
      });
      form.resetFields();
      router("/", { replace: true });
    } else if (res?.statusCode === 200 && res?.data?.user?.role !== "admin") {
      form.resetFields();
      toast.error("Access Denied", {
        duration: 2000,
      });
    }
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className=" min-h-screen flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto p-6 rounded-2xl">
            <img
              src={AllImages.logo}
              alt="logo"
              className="w-auto h-auto mx-auto"
            />
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-5">
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-base-color">
                  Sign in Your Account
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm form={form} handleFinish={onFinish}>
              <ReuseInput
                name="email"
                label="Email"
                placeholder="Enter Your Email"
                inputClassName="!bg-[#EFEFEF] !py-2"
              />
              <ReuseInput
                inputType="password"
                name="password"
                label="Password"
                placeholder="Enter Your Password "
                inputClassName="!bg-[#EFEFEF] !py-2"
              />
              <div className="flex justify-between items-center mt-10 mb-5">
                <Checkbox className="!text-base-color">Remember me</Checkbox>
                <Link
                  to="/forgot-password"
                  className="!text-base-color !underline font-bold"
                >
                  Forgot Password?
                </Link>
              </div>
              <ReuseButton
                variant="secondary"
                htmlType="submit"
              // icon={allIcons.arrowRight}
              >
                Sign In
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
