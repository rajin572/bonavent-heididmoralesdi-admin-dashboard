import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Radio,
  Typography,
} from "antd";
import { useEffect, useState } from "react";

const UpdateSubscriptionModal = ({
  isUpdateModalOpen,
  handleCancelUpdateModal,
  currentRecord,
}) => {
  //   const [UpdateSubscription] = useUpdateSubscriptionMutation();
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const [featureList, setFeatureList] = useState([]); // Initial feature
  const [activeKey, setActiveKey] = useState([0]); // Track the active panel

  useEffect(() => {
    form.setFieldsValue({
      name: currentRecord?.name || "",
      price: currentRecord?.price || "",
      duration: parseInt(currentRecord?.duration) || "",
    });

    if (currentRecord?.features) {
      setFeatureList(currentRecord.features.map((feature) => ({ feature })));
    }
  }, [currentRecord, form]);

  const handleAddQus = () => {
    const newfeatureList = [...featureList, { feature: "" }]; // Add new feature
    setFeatureList(newfeatureList);
    setActiveKey([newfeatureList.length - 1]); // Set the new panel as active
  };

  const handleFeatureChange = (index, value) => {
    const newfeatureList = [...featureList];
    newfeatureList[index].feature = value;
    setFeatureList(newfeatureList);
    // console.log("Updated Feature:", newfeatureList[index].feature); // Log the updated feature
  };
  const handleRemoveFeature = (index) => {
    const newFeatureList = featureList.filter((_, i) => i !== index);
    setFeatureList(newFeatureList);

    // Adjust active key if the removed feature was the active one
    if (index === activeKey[0]) {
      setActiveKey([newFeatureList.length - 1]);
    }
  };
  const handleSave = async () => {
    const values = await form.validateFields();
    console.log(values);
    // const toastId = toast.loading("Adding subscription...");

    // try {
    //   const values = await form.validateFields(); // ✅ Await form validation

    //   // Format the feature list
    //   const formattedFeatures = featureList.map((item) => item.feature);

    //   // Create a new subscription object
    //   const newSubscription = {
    //     name: values.name,
    //     price: parseInt(values.price),
    //     duration: parseInt(values.duration),
    //     features: formattedFeatures,
    //   };

    //   console.log("New Subscription:", newSubscription); // ✅ Now it won't be undefined

    //   const res = await UpdateSubscription({
    //     data: newSubscription,
    //     id: currentRecord?._id,
    //   }).unwrap();
    //   console.log(res);

    //   if (res.success) {
    //     toast.success(res.message, {
    //       id: toastId,
    //       duration: 2000,
    //     });
    //     form.resetFields();
    //     handleCancelUpdateModal();
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Failed to add subscription", {
    //     id: toastId,
    //     duration: 2000,
    //   });
    // }
  };

  return (
    <Modal
      open={isUpdateModalOpen}
      onCancel={() => handleCancelUpdateModal()}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          facilities: ["Boost voucher to popular"],
        }}
        className="p-4 mt-5"
      >
        <Typography.Title level={5}>Plan Name</Typography.Title>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input the plan name!" }]}
          style={{ fontWeight: "500" }}
        >
          <Input
            placeholder="Enter plan name"
            className="font-medium h-12  !text-base-color  placeholder:text-gray-700 border "
          />
        </Form.Item>

        <Typography.Title level={5}>Plan Price</Typography.Title>
        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please input the plan price!" }]}
          style={{ fontWeight: "500" }}
        >
          <Input
            placeholder="Enter plan price"
            type="number"
            className="font-medium h-12  !text-base-color  placeholder:text-gray-700 border "
          />
        </Form.Item>

        <Typography.Title level={5}>Features</Typography.Title>
        <Form.Item name="features" style={{ fontWeight: "500" }}>
          <ConfigProvider
            theme={{
              components: {
                Collapse: {
                  colorTextHeading: "#222222",

                  colorText: "#222222",
                  borderRadiusLG: 0,
                  headerPadding: "5px 10px",
                  contentBg: "rgb(255,255,255)",
                  headerBg: "rgb(255,255,255)",
                },
              },
            }}
          >
            <Collapse
              accordion
              activeKey={activeKey}
              onChange={setActiveKey}
              className="bg-primary-color mb-5"
            >
              {featureList.map((faq, index) => (
                <Panel
                  header={`Feature ${index + 1}`}
                  key={index}
                  className="!text-base-color bg-primary-color flex flex-col gap-1"
                  extra={
                    featureList.length > 1 && (
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        Remove
                      </button>
                    )
                  }
                >
                  <div className="flex flex-col gap-3">
                    <Input
                      value={faq.feature} // Display the current feature value
                      placeholder="Type your feature"
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className="h-10  border  !text-base-color placeholder:text-gray-600"
                    />
                  </div>
                </Panel>
              ))}
            </Collapse>
          </ConfigProvider>
          <Button
            block
            onClick={handleAddQus}
            style={{
              padding: "1px",
              fontSize: "16px",
              fontWeight: "500",
              color: "#222222",
              background: "transparent",
              height: "40px",
              border: "1px solid #999999",
            }}
          >
            <PlusOutlined />
            Add More Features
          </Button>
        </Form.Item>

        <Typography.Title level={5}>Timeline</Typography.Title>
        <Form.Item
          name="duration"
          style={{ fontWeight: "500" }}
          rules={[{ required: true, message: "Please select a timeline!" }]}
        >
          <Radio.Group className="font-normal w-full flex flex-col">
            <Radio value={30}>
              {" "}
              <span className="font-normal text-base-color">30 Days</span>{" "}
            </Radio>
            <Radio value={90}>
              {" "}
              <span className="font-normal text-base-color">90 Days</span>{" "}
            </Radio>
            <Radio value={180}>
              {" "}
              <span className="font-normal text-base-color">180 Days</span>{" "}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            onClick={handleSave}
            className="w-full h-12 !bg-secondary-color border !border-secondary-color !text-white text-base sm:text-lg font-bold"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSubscriptionModal;
