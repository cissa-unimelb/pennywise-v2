import {UserContext} from "../../stores/user";
import Box from "@mui/material/Box";
import UploadBox from "../../components/UploadBox/";
import { uploadFile } from "../../services/upload";
import {useContext, useState} from "react";
export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [uploadProgress] = useState(0);
  const onUploadFile = (file: any) => {
    uploadFile(file, user.token as string)
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
            token={user.token as string}
          />
        </Box>
      </div>
    </>
  );
}
