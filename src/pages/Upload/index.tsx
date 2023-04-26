import { useUserStore } from "../../stores/user";
import Box from "@mui/material/Box";
import UploadBox from "../../components/UploadBox/";
import { uploadFile } from "../../utils/upload";
import { GOOGLE_DRIVE_FOLDER_ID } from "../../constants/API";
import { useState } from "react";
export default function Dashboard() {
  const { value } = useUserStore();
  const [uploadProgress, setUploadProgress] = useState(0);
  const onUploadFile = (file: any) => {
    uploadFile(file, value.token).then(onCompleteUploadFile);
  };
  const onCompleteUploadFile = (url: string) => {
    alert("successfully uploaded the doc. URL:" + url);
  };
  const onUpdateProgress = (percentage: number) => {
    setUploadProgress(percentage);
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
