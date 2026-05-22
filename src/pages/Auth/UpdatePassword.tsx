/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { LuKey } from "react-icons/lu";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";
import { Form } from "antd";

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [resetPassword] = useResetPasswordMutation();
  const router = useNavigate();
  const onFinish = async (values: any) => {
    const data = {
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    };

    const res = await tryCatchWrapper(
      resetPassword,
      { body: data },
      {
        toastLoadingMessage: "Updating Password...",
        toastSuccessMessage: "Password Updated Successfully!",
        toastErrorMessage: "Failed to update password. Please try again later.",
      }
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.remove("main.bonavent_forgetOtpMatchToken");
      router("/sign-in");
    }
  };

  return (
    <div>
      <Container>
        <div className="min-h-screen flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto p-6 rounded-2xl">
            {/* -------- update Password Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="mb-8">
                <div className="p-3 rounded-full bg-[#EFF7FF] w-fit mx-auto">
                  <div className="p-3 rounded-full bg-[#DAEBFF] w-fit mx-auto">
                    <LuKey className="size-8  text-secondary-color " />
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-secondary-color mb-5 text-center mt-4">
                  Set new password
                </h1>
                <p className=" sm:text-lg mb-2 text-base-color text-center">
                  Your new password must be different to previously used
                  passwords.
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm form={form} handleFinish={onFinish}>
              <ReuseInput
                inputType="password"
                name="password"
                label="Password"
                placeholder="Enter Your Password "
                rules={[{ required: true, message: "Password is required" }]}
                inputClassName="!bg-[#EFEFEF] !py-2"
              />
              <ReuseInput
                inputType="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Your Password "
                rules={[
                  { required: true, message: "Confirm Password is required" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                inputClassName="!bg-[#EFEFEF] !py-2"
              />

              <ReuseButton
                variant="secondary"
                htmlType="submit"
              // icon={allIcons.arrowRight}
              >
                Change Password
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default UpdatePassword;
