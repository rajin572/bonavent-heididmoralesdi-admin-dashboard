import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import ReuseButton from "../../../ui/Button/ReuseButton";
import { useAddDocumentsMutation, useGetDocumentsQuery } from "../../../redux/features/staticContent/staticContentApi";
import { toast } from "sonner";
import Loading from "../../../ui/Loading";

const CancelationPolicy = () => {
  const { data, isFetching } = useGetDocumentsQuery({ fields: "cancellation" });
  const [updateStaticContent] = useAddDocumentsMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data) {
      setContent(data?.data?.cancellation || "");
    }
  }, [data]);

  const handleOnSave = async () => {
    const toastId = toast.loading("Updating help support...");

    const data = {
      cancellation: content,
    };
    try {
      const res = await updateStaticContent(data).unwrap();
      toast.success(res?.message, { id: toastId, duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update privacy policy", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div className=" min-h-[90vh]  rounded-xl">
      <h1 className="text-3xl font-bold text-secondary-color   my-5">
        Cancelation Policy
      </h1>
      <div className=" flex justify-center items-center mb-5">
        <div className="w-[100%]">
          <div className=" mb-5">
            <JoditEditor
              ref={editor}
              value={content}
              config={{ height: 600, theme: "light", readonly: false }}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <ReuseButton onClick={handleOnSave} variant="secondary">
            Save
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};
export default CancelationPolicy;
