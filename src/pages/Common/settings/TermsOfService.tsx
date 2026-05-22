import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import ReuseButton from "../../../ui/Button/ReuseButton";

const TermsOfService = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleOnSave = () => {
    console.log("Saved PP");
  };

  return (
    <div className=" min-h-[90vh]  rounded-xl">
      <h1 className="text-3xl font-bold text-base-color   my-5">
        Terms & Conditions
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
export default TermsOfService;
