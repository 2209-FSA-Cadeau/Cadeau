"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const [value, setValue] = useState("");
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
      setUpdated(false);
    setTimeout(() => {
      console.log("send to back end", `${value}`);
      setUpdated(true);
    }, 2000);
  }, [value]);

  return (
    <div>
      {!updated ? "Saving..." : null}
      <ReactQuill value={value} onChange={setValue} />
    </div>
  );
};

export default Editor;
