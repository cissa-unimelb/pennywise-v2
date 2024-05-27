import { useUserStore } from "../../stores/user";
import Box from "@mui/material/Box";
import UploadBox from "../../components/UploadBox/";
import { uploadFile } from "../../services/upload";
import { useState } from "react";
export default function Dashboard() {
  const { value } = useUserStore();
  console.log(value);
  const [uploadProgress] = useState(0);
  const onUploadFile = (file: any) => {
    uploadFile(file, value.token)
      .then(onCompleteUploadFile);
  };
  const onCompleteUploadFile = (url: string) => {
    alert("successfully uploaded the doc. URL:" + url);
  };
  return (
    <>
      <div className="App-master-container">
        <Box className="App-dashboard-container">
          <UploadBox
            progress={uploadProgress}
            onUploadFile={onUploadFile}
            token={value.token}
          />
        </Box>
      </div>
    </>
  );
}
